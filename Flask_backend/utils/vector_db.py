import os
import json
import faiss
import numpy as np
from utils.text_processing import model, normalize_skills, normalize_text
from database import jobs_collection, candidates_collection

# File paths for indexes and ID mappings
TITLE_INDEX_PATH = "title.index"
SKILL_INDEX_PATH = "skill.index"
TITLE_IDS_PATH = "title_ids.json"
SKILL_IDS_PATH = "skill_ids.json"

def build_indexes():
    """Build FAISS indexes for titles and skills from jobs and candidates."""
    # Fetch jobs and candidates
    jobs = list(jobs_collection.find({}, {"_id": 1, "title": 1, "skills": 1}))
    candidates = list(candidates_collection.find({}, {"_id": 1, "position": 1, "skills": 1}))

    # Prepare titles/positions
    title_texts = [normalize_text(j.get("title", "")) for j in jobs] + \
                  [normalize_text(c.get("position", "")) for c in candidates]
    title_ids = [str(j["_id"]) for j in jobs] + [str(c["_id"]) for c in candidates]

    # Prepare skills (combine into sorted string for consistency)
    skill_texts = [" ".join(sorted(normalize_skills(j.get("skills", [])))) for j in jobs] + \
                  [" ".join(sorted(normalize_skills(c.get("skills", [])))) for c in candidates]
    skill_ids = [str(j["_id"]) for j in jobs] + [str(c["_id"]) for c in candidates]

    # Filter out empty entries
    title_data = [(t, tid) for t, tid in zip(title_texts, title_ids) if t]
    skill_data = [(s, sid) for s, sid in zip(skill_texts, skill_ids) if s]

    # Compute embeddings
    title_emb = np.stack([model.encode(t, convert_to_tensor=False) for t, _ in title_data]).astype('float32')
    skill_emb = np.stack([model.encode(s, convert_to_tensor=False) for s, _ in skill_data]).astype('float32')

    # Normalize for cosine similarity
    faiss.normalize_L2(title_emb)
    faiss.normalize_L2(skill_emb)

    # Build FAISS indexes
    d = title_emb.shape[1]
    title_index = faiss.IndexFlatIP(d)
    skill_index = faiss.IndexFlatIP(d)
    title_index.add(title_emb)
    skill_index.add(skill_emb)

    # Save indexes and ID mappings
    faiss.write_index(title_index, TITLE_INDEX_PATH)
    faiss.write_index(skill_index, SKILL_INDEX_PATH)
    with open(TITLE_IDS_PATH, 'w') as f:
        json.dump([tid for _, tid in title_data], f)
    with open(SKILL_IDS_PATH, 'w') as f:
        json.dump([sid for _, sid in skill_data], f)

    return title_index, skill_index, [tid for _, tid in title_data], [sid for _, sid in skill_data]

def load_indexes():
    """Load FAISS indexes and ID mappings from files."""
    try:
        title_index = faiss.read_index(TITLE_INDEX_PATH)
        skill_index = faiss.read_index(SKILL_INDEX_PATH)
        with open(TITLE_IDS_PATH) as f:
            title_ids = json.load(f)
        with open(SKILL_IDS_PATH) as f:
            skill_ids = json.load(f)
        return title_index, skill_index, title_ids, skill_ids
    except Exception as e:
        print(f"Error loading indexes: {e}. Rebuilding indexes.")
        return build_indexes()

# Initialize on import: build or load existing
try:
    if os.path.exists(TITLE_INDEX_PATH) and os.path.exists(SKILL_INDEX_PATH) and \
       os.path.exists(TITLE_IDS_PATH) and os.path.exists(SKILL_IDS_PATH):
        title_idx, skill_idx, title_ids, skill_ids = load_indexes()
    else:
        title_idx, skill_idx, title_ids, skill_ids = build_indexes()
except Exception as e:
    print(f"Initialization failed: {e}. Building new indexes.")
    title_idx, skill_idx, title_ids, skill_ids = build_indexes()