import os
import sys
import json
import faiss
import numpy as np
from bson import ObjectId
from utils.text_processing import normalize_skills, normalize_text, get_model
from database import jobs_collection, candidates_collection

# File paths for indexes and ID mappings
TITLE_INDEX_PATH = "title.index"
SKILL_INDEX_PATH = "skill.index"
TITLE_IDS_PATH = "title_ids.json"
SKILL_IDS_PATH = "skill_ids.json"

# Initialize indexes and IDs at module level
title_idx, skill_idx, title_ids, skill_ids = None, None, None, None

def build_indexes():
    """Build FAISS indexes for titles and skills from jobs and candidates."""
    print("Building FAISS indexes from scratch...")
    jobs = list(jobs_collection.find({}, {"_id": 1, "title": 1, "skills": 1}))
    candidates = list(candidates_collection.find({}, {"_id": 1, "position": 1, "skills": 1}))

    # Prepare texts and IDs
    title_texts = [normalize_text(j.get("title", "")) for j in jobs] + \
                  [normalize_text(c.get("position", "")) for c in candidates]
    title_ids_list = [str(j["_id"]) for j in jobs] + [str(c["_id"]) for c in candidates]

    skill_texts = [" ".join(sorted(normalize_skills(j.get("skills", [])))) for j in jobs] + \
                  [" ".join(sorted(normalize_skills(c.get("skills", [])))) for c in candidates]
    skill_ids_list = [str(j["_id"]) for j in jobs] + [str(c["_id"]) for c in candidates]

    title_data = [(t, tid) for t, tid in zip(title_texts, title_ids_list) if t]
    skill_data = [(s, sid) for s, sid in zip(skill_texts, skill_ids_list) if s]

    # Encode
    title_emb = np.stack([get_model().encode(t, convert_to_tensor=False) for t, _ in title_data]).astype('float32')
    skill_emb = np.stack([get_model().encode(s, convert_to_tensor=False) for s, _ in skill_data]).astype('float32')

    faiss.normalize_L2(title_emb)
    faiss.normalize_L2(skill_emb)

    d = title_emb.shape[1]
    title_index = faiss.IndexFlatIP(d)
    skill_index = faiss.IndexFlatIP(d)
    title_index.add(title_emb)
    skill_index.add(skill_emb)

    # Save to disk
    faiss.write_index(title_index, TITLE_INDEX_PATH)
    faiss.write_index(skill_index, SKILL_INDEX_PATH)
    with open(TITLE_IDS_PATH, 'w') as f:
        json.dump([tid for _, tid in title_data], f)
    with open(SKILL_IDS_PATH, 'w') as f:
        json.dump([sid for _, sid in skill_data], f)

    print("Indexes built and saved.")
    return title_index, skill_index, [tid for _, tid in title_data], [sid for _, sid in skill_data]


def load_indexes():
    """Load FAISS indexes and ID mappings from files."""
    try:
        print("Loading FAISS indexes from disk...")
        title_index = faiss.read_index(TITLE_INDEX_PATH)
        skill_index = faiss.read_index(SKILL_INDEX_PATH)
        with open(TITLE_IDS_PATH) as f:
            title_ids_list = json.load(f)
        with open(SKILL_IDS_PATH) as f:
            skill_ids_list = json.load(f)
        print("Indexes loaded successfully.")
        return title_index, skill_index, title_ids_list, skill_ids_list
    except Exception as e:
        print(f"Error loading indexes: {e}. Rebuilding indexes.")
        return build_indexes()

# Initialize at module level
if os.path.exists(TITLE_INDEX_PATH) and os.path.exists(SKILL_INDEX_PATH) and \
   os.path.exists(TITLE_IDS_PATH) and os.path.exists(SKILL_IDS_PATH):
    title_idx, skill_idx, title_ids, skill_ids = load_indexes()
else:
    title_idx, skill_idx, title_ids, skill_ids = build_indexes()


def insert_into_vector_db(document, collection_name):
    print(f"[insert] Called for {collection_name} _id={document.get('_id')}")
    # Skip if no meaningful data to generate vector
    text = None
    if collection_name == "jobposts" and document.get("title"):
        text = normalize_text(document.get("title", ""))
    elif collection_name == "candidates" and document.get("position"):
        text = normalize_text(document.get("position", ""))
    if not text and document.get("skills"):
        text = " ".join(normalize_skills(document.get("skills", [])))
    
    if not text:
        print(f"[insert] No data to generate vector for document {document.get('_id')}")
        return

    vec = get_model().encode(text).astype('float32')
    vector_np = vec.reshape(1, -1)
    faiss.normalize_L2(vector_np)
    
    global title_idx, skill_idx, title_ids, skill_ids
    if collection_name == "jobposts" and document.get("title"):
        title_idx.add(vector_np)
        title_ids.append(str(document.get("_id")))
        faiss.write_index(title_idx, TITLE_INDEX_PATH)
        with open(TITLE_IDS_PATH, 'w') as f:
            json.dump(title_ids, f)
    elif collection_name == "candidates" and document.get("position"):
        title_idx.add(vector_np)
        title_ids.append(str(document.get("_id")))
        faiss.write_index(title_idx, TITLE_INDEX_PATH)
        with open(TITLE_IDS_PATH, 'w') as f:
            json.dump(title_ids, f)
    
    if document.get("skills"):
        skill_idx.add(vector_np)
        skill_ids.append(str(document.get("_id")))
        faiss.write_index(skill_idx, SKILL_INDEX_PATH)
        with open(SKILL_IDS_PATH, 'w') as f:
            json.dump(skill_ids, f)
    
    print(f"[insert] Added document {document.get('_id')} to FAISS")


def update_vector_db(document_id, updated_fields, collection_name):
    # ——— 1. Early exit if no FAISS‑related field changed ———
    relevant = set(updated_fields) & {"title", "position", "skills"}
    if not relevant:
        print(f"[update] No FAISS fields in {updated_fields}, skipping.")
        return

    print(f"[update] Called for {collection_name} _id={document_id}, fields={updated_fields}")
    global title_idx, skill_idx, title_ids, skill_ids
    doc_id_str = str(document_id)

    # ——— 2. Remove old vectors if they exist ———
    if doc_id_str in title_ids:
        print(f"[update] Removing old title vector for {doc_id_str}")
        title_ids.remove(doc_id_str)
        title_idx = faiss.IndexFlatIP(title_idx.d)
        if title_ids:
            vectors = []
            for tid in title_ids:
                doc = jobs_collection.find_one({"_id": ObjectId(tid)}) or \
                      candidates_collection.find_one({"_id": ObjectId(tid)})
                if doc and (doc.get("title") or doc.get("position")):
                    text = normalize_text(doc.get("title") or doc.get("position"))
                    vectors.append(get_model().encode(text).astype('float32'))
            arr = np.stack(vectors) if vectors else None
            if arr is not None:
                faiss.normalize_L2(arr)
                title_idx.add(arr)
        faiss.write_index(title_idx, TITLE_INDEX_PATH)
        with open(TITLE_IDS_PATH, 'w') as f:
            json.dump(title_ids, f)

    if doc_id_str in skill_ids:
        print(f"[update] Removing old skill vector for {doc_id_str}")
        skill_ids.remove(doc_id_str)
        skill_idx = faiss.IndexFlatIP(skill_idx.d)
        if skill_ids:
            vectors = []
            for sid in skill_ids:
                doc = jobs_collection.find_one({"_id": ObjectId(sid)}) or \
                      candidates_collection.find_one({"_id": ObjectId(sid)})
                if doc and doc.get("skills"):
                    text = " ".join(sorted(normalize_skills(doc.get("skills", []))))
                    vectors.append(get_model().encode(text).astype('float32'))
            arr = np.stack(vectors) if vectors else None
            if arr is not None:
                faiss.normalize_L2(arr)
                skill_idx.add(arr)
        faiss.write_index(skill_idx, SKILL_INDEX_PATH)
        with open(SKILL_IDS_PATH, 'w') as f:
            json.dump(skill_ids, f)

    # ——— 3. Re‑insert the updated document’s vector ———
    print(f"[update] Inserting new vector for {doc_id_str}")
    doc = jobs_collection.find_one({"_id": ObjectId(document_id)}) or \
          candidates_collection.find_one({"_id": ObjectId(document_id)})
    if doc:
        insert_into_vector_db(doc, collection_name)

    print(f"[update] Completed update for {document_id}")

def delete_from_vector_db(document_id, collection_name):
    print(f"[delete] Called for {collection_name} _id={document_id}")
    global title_idx, skill_idx, title_ids, skill_ids
    doc_id_str = str(document_id)

    # Remove from title index
    if doc_id_str in title_ids:
        print(f"[delete] Removing title vector for {doc_id_str}")
        title_ids.remove(doc_id_str)
        title_idx = faiss.IndexFlatIP(title_idx.d)
        if title_ids:
            vectors = []
            for tid in title_ids:
                doc = jobs_collection.find_one({"_id": ObjectId(tid)}) or candidates_collection.find_one({"_id": ObjectId(tid)})
                if doc and (doc.get("title") or doc.get("position")):
                    text = normalize_text(doc.get("title") or doc.get("position"))
                    vectors.append(get_model().encode(text).astype('float32'))
            if vectors:
                arr = np.stack(vectors)
                faiss.normalize_L2(arr)
                title_idx.add(arr)
        faiss.write_index(title_idx, TITLE_INDEX_PATH)
        with open(TITLE_IDS_PATH, 'w') as f:
            json.dump(title_ids, f)

    # Remove from skill index
    if doc_id_str in skill_ids:
        print(f"[delete] Removing skill vector for {doc_id_str}")
        skill_ids.remove(doc_id_str)
        skill_idx = faiss.IndexFlatIP(skill_idx.d)
        if skill_ids:
            vectors = []
            for sid in skill_ids:
                doc = jobs_collection.find_one({"_id": ObjectId(sid)}) or candidates_collection.find_one({"_id": ObjectId(sid)})
                if doc and doc.get("skills"):
                    text = " ".join(sorted(normalize_skills(doc.get("skills", []))))
                    vectors.append(get_model().encode(text).astype('float32'))
            if vectors:
                arr = np.stack(vectors)
                faiss.normalize_L2(arr)
                skill_idx.add(arr)
        faiss.write_index(skill_idx, SKILL_INDEX_PATH)
        with open(SKILL_IDS_PATH, 'w') as f:
            json.dump(skill_ids, f)

    print(f"[delete] Completed deletion for {document_id}")
















# import os
# import json
# import faiss
# import numpy as np
# import threading
# from bson import ObjectId
# from utils.text_processing import normalize_skills, normalize_text, get_model
# from database import jobs_collection, candidates_collection

# # File paths for indexes and ID mappings
# TITLE_INDEX_PATH = "title.index"
# SKILL_INDEX_PATH = "skill.index"
# TITLE_IDS_PATH = "title_ids.json"
# SKILL_IDS_PATH = "skill_ids.json"

# # HNSW + IDMap parameters
# HNSW_M = 32  # number of neighbors for HNSW graph

# # In-memory state
# title_idx = None
# skill_idx = None
# # string ID lists for persistence
# title_ids = []
# skill_ids = []

# # Utility to map string ObjectId to int64 key
# def _to_int_id(str_id: str) -> np.int64:
#     try:
#         # interpret hex string, mask to signed 63-bit
#         val = int(str_id, 16) & 0x7FFFFFFFFFFFFFFF
#     except ValueError:
#         # fallback to Python hash
#         val = hash(str_id) & 0x7FFFFFFFFFFFFFFF
#     return np.int64(val)

# # Factory for HNSW+IDMap index
# def make_index(d: int):
#     hnsw = faiss.IndexHNSWFlat(d, HNSW_M)
#     return faiss.IndexIDMap(hnsw)

# # --- Persistence function defined early so build_indexes can use it if needed ---
# def _flush_to_disk():
#     # Persist indexes and ID lists
#     faiss.write_index(title_idx, TITLE_INDEX_PATH)
#     faiss.write_index(skill_idx, SKILL_INDEX_PATH)
#     with open(TITLE_IDS_PATH, 'w') as f:
#         json.dump(title_ids, f)
#     with open(SKILL_IDS_PATH, 'w') as f:
#         json.dump(skill_ids, f)
#     # Schedule next flush without passing daemon in constructor
#     timer = threading.Timer(60.0, _flush_to_disk)
#     timer.daemon = True
#     timer.start()


# def build_indexes():
#     """Build FAISS HNSW+IDMap indexes from jobs and candidates."""
#     print("Building FAISS HNSW+IDMap indexes from scratch...")
#     # Fetch data
#     jobs = list(jobs_collection.find({}, {"_id": 1, "title": 1, "skills": 1}))
#     candidates = list(candidates_collection.find({}, {"_id": 1, "position": 1, "skills": 1}))

#     # Prepare texts and IDs
#     title_data = []
#     for doc in jobs:
#         txt = normalize_text(doc.get("title", ""))
#         if txt:
#             title_data.append((txt, str(doc["_id"])) )
#     for doc in candidates:
#         txt = normalize_text(doc.get("position", ""))
#         if txt:
#             title_data.append((txt, str(doc["_id"])) )

#     skill_data = []
#     for doc in jobs + candidates:
#         skills = doc.get("skills", [])
#         txt = " ".join(sorted(normalize_skills(skills)))
#         if txt:
#             skill_data.append((txt, str(doc["_id"])) )

#     # Encode vectors
#     title_emb = np.stack([get_model().encode(t, convert_to_tensor=False) for t, _ in title_data]).astype('float32')
#     skill_emb = np.stack([get_model().encode(s, convert_to_tensor=False) for s, _ in skill_data]).astype('float32')
#     faiss.normalize_L2(title_emb)
#     faiss.normalize_L2(skill_emb)

#     # Build indexes
#     d = title_emb.shape[1]
#     ti = make_index(d)
#     si = make_index(d)

#     # Convert string IDs to int64
#     title_int_ids = np.array([_to_int_id(tid) for _, tid in title_data], dtype='int64')
#     skill_int_ids = np.array([_to_int_id(sid) for _, sid in skill_data], dtype='int64')

#     # Add with ids
#     ti.add_with_ids(title_emb, title_int_ids)
#     si.add_with_ids(skill_emb, skill_int_ids)

#     # Persist state
#     global title_idx, skill_idx, title_ids, skill_ids
#     title_idx, skill_idx = ti, si
#     title_ids = [tid for _, tid in title_data]
#     skill_ids = [sid for _, sid in skill_data]
#     # Initial flush
#     _flush_to_disk()

#     print("Indexes built and saved.")
#     return title_idx, skill_idx, title_ids, skill_ids


# def load_indexes():
#     """Load FAISS indexes and ID mappings from disk."""
#     try:
#         print("Loading FAISS indexes from disk...")
#         ti = faiss.read_index(TITLE_INDEX_PATH)
#         si = faiss.read_index(SKILL_INDEX_PATH)
#         with open(TITLE_IDS_PATH) as f:
#             tids = json.load(f)
#         with open(SKILL_IDS_PATH) as f:
#             sids = json.load(f)
#         print("Indexes loaded successfully.")
#         global title_idx, skill_idx, title_ids, skill_ids
#         title_idx, skill_idx = ti, si
#         title_ids, skill_ids = tids, sids
#         return ti, si, tids, sids
#     except Exception as e:
#         print(f"Error loading indexes: {e}. Rebuilding indexes.")
#         return build_indexes()

# # Initialize indexes on import
# if os.path.exists(TITLE_INDEX_PATH) and os.path.exists(SKILL_INDEX_PATH) and \
#    os.path.exists(TITLE_IDS_PATH) and os.path.exists(SKILL_IDS_PATH):
#     title_idx, skill_idx, title_ids, skill_ids = load_indexes()
# else:
#     title_idx, skill_idx, title_ids, skill_ids = build_indexes()


# def insert_into_vector_db(document, collection_name):
#     print(f"[insert] Called for {collection_name} _id={document.get('_id')}")
#     text = None
#     if collection_name == "jobposts" and document.get("title"):
#         text = normalize_text(document.get("title", ""))
#     elif collection_name == "candidates" and document.get("position"):
#         text = normalize_text(document.get("position", ""))
#     if not text and document.get("skills"):
#         text = " ".join(normalize_skills(document.get("skills", [])))

#     if not text:
#         print(f"[insert] No data to vectorize for {document.get('_id')}")
#         return

#     # encode and normalize
#     vec = get_model().encode(text).astype('float32')
#     faiss.normalize_L2(vec.reshape(1, -1))

#     # ID mapping
#     sid = str(document.get("_id"))
#     iid = _to_int_id(sid)

#     global title_idx, skill_idx, title_ids, skill_ids
#     if collection_name == "jobposts" and document.get("title"):
#         title_idx.add_with_ids(vec.reshape(1, -1), np.array([iid], dtype='int64'))
#         title_ids.append(sid)
#     elif collection_name == "candidates" and document.get("position"):
#         title_idx.add_with_ids(vec.reshape(1, -1), np.array([iid], dtype='int64'))
#         title_ids.append(sid)

#     if document.get("skills"):
#         skill_idx.add_with_ids(vec.reshape(1, -1), np.array([iid], dtype='int64'))
#         skill_ids.append(sid)

#     print(f"[insert] Added {sid} to HNSW+IDMap")


# def update_vector_db(document_id, updated_fields, collection_name):
#     # early exit if nothing relevant changed
#     relevant = set(updated_fields) & {"title", "position", "skills"}
#     if not relevant:
#         print(f"[update] No FAISS fields in {updated_fields}, skipping.")
#         return

#     sid = str(document_id)
#     iid = _to_int_id(sid)
#     id_arr = np.array([iid], dtype='int64')

#     print(f"[update] Replacing vector for {sid}, fields={updated_fields}")
#     global title_idx, skill_idx, title_ids, skill_ids

#     # remove old
#     if sid in title_ids:
#         title_idx.remove_ids(id_arr)
#         title_ids.remove(sid)
#     if sid in skill_ids:
#         skill_idx.remove_ids(id_arr)
#         skill_ids.remove(sid)

#     # insert fresh
#     doc = jobs_collection.find_one({"_id": ObjectId(sid)}) or candidates_collection.find_one({"_id": ObjectId(sid)})
#     if doc:
#         insert_into_vector_db(doc, collection_name)
#     print(f"[update] Completed replace for {sid}")


# def delete_from_vector_db(document_id, collection_name):
#     sid = str(document_id)
#     iid = _to_int_id(sid)
#     id_arr = np.array([iid], dtype='int64')
#     print(f"[delete] Removing {sid} from HNSW+IDMap")

#     global title_idx, skill_idx, title_ids, skill_ids
#     if sid in title_ids:
#         title_idx.remove_ids(id_arr)
#         title_ids.remove(sid)
#     if sid in skill_ids:
#         skill_idx.remove_ids(id_arr)
#         skill_ids.remove(sid)

#     print(f"[delete] Removed {sid}")

# # Start periodic persistence after full definition
# _flush_to_disk()
