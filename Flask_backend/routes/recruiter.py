from flask import Blueprint, request, jsonify, current_app
from database import candidates_collection, users_collection
from utils.text_processing import normalize_text, normalize_skills, encode_text
from bson import ObjectId
import numpy as np
import faiss
import re

recruiter_blueprint = Blueprint('recruiter', __name__)

def extract_numeric_experience(exp):
    """Extracts numeric values from an experience string."""
    return [int(n) for n in re.findall(r'\d+', exp)] if exp else []

def skills_match_percentage(input_skills, candidate_skills):
    """Calculate percentage of input skills that match candidate skills."""
    if not input_skills:
        return 100  # If no skills provided, assume full match
    input_skills_lower = [s.lower() for s in input_skills]
    candidate_skills_lower = [s.lower() for s in candidate_skills]
    matching_skills = sum(1 for skill in input_skills_lower if skill in candidate_skills_lower)
    return (matching_skills / len(input_skills)) * 100

@recruiter_blueprint.route('/recruiter-search', methods=['POST'])
def recruiter_search():
    data = request.json
    inp = data.get('recruiter_input', {})
    if not any(inp.values()):
        return jsonify({"error": "At least one field must be provided"}), 400

    # Normalize inputs
    pos_q = normalize_text(inp.get('position', ''))
    skills_q = normalize_skills(inp.get('skills', []))
    # location_q = normalize_text(inp.get('location', ''))
    location = inp.get('location', '')
    if isinstance(location, dict):
        location_text = location.get('city', '') or location.get('country', '')
    else:
        location_text = location
    location_q = normalize_text(location_text)

    exp_q = inp.get('experience', '')

    # Build MongoDB query
    query = {}
    if location_q:
        query["$or"] = [
            {"location.city": {"$regex": location_q, "$options": "i"}},
            {"location.country": {"$regex": location_q, "$options": "i"}}
        ]
    if skills_q:
        query["skills"] = {"$in": [re.compile(skill, re.IGNORECASE) for skill in skills_q]}
    if exp_q:
        exp_vals = extract_numeric_experience(exp_q)
        if exp_vals:
            query["experience"] = {
                "$regex": f"({'|'.join(map(str, exp_vals))})",
                "$options": "i"
            }

    candidate_ids = []

    if pos_q:
        # Exact matches for position
        exact_matches = list(candidates_collection.find({"position": {"$regex": f"^{pos_q}$", "$options": "i"}, **query}, {"_id": 1}))
        candidate_ids.extend([ObjectId(m["_id"]) for m in exact_matches])

        # Partial matches: query is substring of position
        partial_matches = list(candidates_collection.find({"position": {"$regex": pos_q, "$options": "i"}, **query}, {"_id": 1}))
        candidate_ids.extend([ObjectId(m["_id"]) for m in partial_matches if ObjectId(m["_id"]) not in candidate_ids])

    # FAISS position search
    if pos_q:
        t_idx = current_app.config['TITLE_INDEX']
        t_ids = current_app.config['TITLE_IDS']
        qvec = encode_text(pos_q)
        faiss.normalize_L2(qvec.reshape(1, -1))
        D, I = t_idx.search(qvec.reshape(1, -1), 20)
        faiss_ids = [ObjectId(t_ids[i]) for i in I[0] if D[0][list(I[0]).index(i)] > 0.65]
        candidate_ids.extend([fid for fid in faiss_ids if fid not in candidate_ids])

    # FAISS skill search
    if skills_q:
        s_idx = current_app.config['SKILL_INDEX']
        s_ids = current_app.config['SKILL_IDS']
        s_str = " ".join(sorted(skills_q))
        svec = encode_text(s_str)
        faiss.normalize_L2(svec.reshape(1, -1))
        D2, I2 = s_idx.search(svec.reshape(1, -1), 20)
        skill_ids = [ObjectId(s_ids[i]) for i in I2[0] if D2[0][list(I2[0]).index(i)] > 0.9]
        candidate_ids.extend([sid for sid in skill_ids if sid not in candidate_ids])

    # Remove duplicates
    candidate_ids = list(set(candidate_ids))

    # Add candidate IDs to query
    if candidate_ids:
        query["_id"] = {"$in": candidate_ids}

    # Fetch candidates
    candidates = list(candidates_collection.find(query))

    # Post-processing
    matched = []
    for c in candidates:
        candidate_skills = c.get("skills", [])
        if not skills_q or skills_match_percentage(skills_q, candidate_skills) >= 10:  # At least 70% skills match
            user_info = {}
            user_id = c.get("userId")
            if user_id:
                try:
                    user = users_collection.find_one({"_id": ObjectId(user_id)})
                    if user:
                        user_info = {
                            "userId": str(user.get("_id")),
                            "name": user.get("name"),
                            "email": user.get("email"),
                            "username": user.get("username"),
                            "profilePicture": user.get("profilePicture"),
                            "userType": user.get("userType")
                        }
                except Exception as e:
                    print(f"Error fetching user: {e}")
            matched.append({
                'candidateId': str(c['_id']),
                'userInfo': user_info,
                'position': c.get('position'),
                'location': c.get('location'),
                'skills': candidate_skills,
                'experience': c.get('experience', '')
            })

    return jsonify({"message": "Matches found" if matched else "No matches found", "matched_candidates": matched})

























# from flask import Blueprint, request, jsonify, current_app
# from database import candidates_collection, users_collection
# from utils.text_processing import normalize_text, normalize_skills, encode_text
# from bson import ObjectId
# import numpy as np
# import faiss
# import re

# recruiter_blueprint = Blueprint('recruiter', __name__)

# def extract_numeric_experience(exp):
#     """Extracts numeric values from an experience string."""
#     return [int(n) for n in re.findall(r'\d+', exp)] if exp else []

# def skills_match_percentage(input_skills, candidate_skills):
#     """Calculate percentage of input skills that match candidate skills."""
#     if not input_skills:
#         return 100  # If no skills provided, assume full match
#     input_skills_lower = [s.lower() for s in input_skills]
#     candidate_skills_lower = [s.lower() for s in candidate_skills]
#     matching_skills = sum(1 for skill in input_skills_lower if skill in candidate_skills_lower)
#     return (matching_skills / len(input_skills)) * 100

# @recruiter_blueprint.route('/recruiter-search', methods=['POST'])    
# def recruiter_search():
#     data = request.json
#     inp = data.get('recruiter_input', {})
#     if not any(inp.values()):
#         return jsonify({"error": "At least one field must be provided"}), 400

#     # Normalize inputs
#     pos_q = normalize_text(inp.get('position', ''))
#     skills_q = normalize_skills(inp.get('skills', []))
#     # location_q = normalize_text(inp.get('location', ''))
#     location = inp.get('location', '')
#     if isinstance(location, dict):
#         location_text = location.get('city', '') or location.get('country', '')
#     else:
#         location_text = location
#     location_q = normalize_text(location_text)

#     exp_q = inp.get('experience', '')

#     # Build MongoDB query
#     query = {}
#     if location_q:
#         query["$or"] = [
#             {"location.city": {"$regex": location_q, "$options": "i"}},
#             {"location.country": {"$regex": location_q, "$options": "i"}}
#         ]
#     if skills_q:
#         query["skills"] = {"$in": [re.compile(skill, re.IGNORECASE) for skill in skills_q]}
#     if exp_q:
#         exp_vals = extract_numeric_experience(exp_q)
#         if exp_vals:
#             query["experience"] = {
#                 "$regex": f"({'|'.join(map(str, exp_vals))})",
#                 "$options": "i"
#             }

#     candidate_ids = []

#     if pos_q:
#         # Exact matches for position
#         exact_matches = list(candidates_collection.find({"position": {"$regex": f"^{pos_q}$", "$options": "i"}, **query}, {"_id": 1}))
#         candidate_ids.extend([ObjectId(m["_id"]) for m in exact_matches])

#         # Partial matches: query is substring of position
#         partial_matches = list(candidates_collection.find({"position": {"$regex": pos_q, "$options": "i"}, **query}, {"_id": 1}))
#         candidate_ids.extend([ObjectId(m["_id"]) for m in partial_matches if ObjectId(m["_id"]) not in candidate_ids])

#     # FAISS position search
#     if pos_q:
#         t_idx = current_app.config['TITLE_INDEX']
#         t_ids = current_app.config['TITLE_IDS']
#         qvec = encode_text(pos_q)
#         faiss.normalize_L2(qvec.reshape(1, -1))
#         D, I = t_idx.search(qvec.reshape(1, -1), 20)

#         print(f"[FAISS pos] returned {len(I[0])} positions, title_ids length: {len(t_ids)}")
#         faiss_ids = []
#         for rank, score in enumerate(D[0]):
#             vec_pos = I[0][rank]
#             # skip missing slots (FAISS returns -1) or out‑of‑range
#             if vec_pos < 0 or vec_pos >= len(t_ids):
#                 print(f"[FAISS pos] skipping vec_pos={vec_pos}")
#                 continue
#             if score > 0.65:
#                 faiss_ids.append(ObjectId(t_ids[vec_pos]))
#         for fid in faiss_ids:
#             if fid not in candidate_ids:
#                 candidate_ids.append(fid)

#     # FAISS skill search
#     if skills_q:
#         s_idx = current_app.config['SKILL_INDEX']
#         s_ids = current_app.config['SKILL_IDS']
#         s_str = " ".join(sorted(skills_q))
#         svec = encode_text(s_str)
#         faiss.normalize_L2(svec.reshape(1, -1))
#         D2, I2 = s_idx.search(svec.reshape(1, -1), 20)

#         print(f"[FAISS skill] returned {len(I2[0])} positions, skill_ids length: {len(s_ids)}")
#         skill_hits = []
#         for rank, score in enumerate(D2[0]):
#             vec_pos = I2[0][rank]
#             if vec_pos < 0 or vec_pos >= len(s_ids):
#                 print(f"[FAISS skill] skipping vec_pos={vec_pos}")
#                 continue
#             if score > 0.9:
#                 skill_hits.append(ObjectId(s_ids[vec_pos]))
#         for sid in skill_hits:
#             if sid not in candidate_ids:
#                 candidate_ids.append(sid)


#     # Remove duplicates
#     candidate_ids = list(set(candidate_ids))

#     # Add candidate IDs to query
#     if candidate_ids:
#         query["_id"] = {"$in": candidate_ids}

#     # Fetch candidates
#     candidates = list(candidates_collection.find(query))

#     # Post-processing
#     matched = []
#     for c in candidates:
#         candidate_skills = c.get("skills", [])
#         if not skills_q or skills_match_percentage(skills_q, candidate_skills) >= 10:  # At least 70% skills match
#             user_info = {}
#             user_id = c.get("userId")
#             if user_id:
#                 try:
#                     user = users_collection.find_one({"_id": ObjectId(user_id)})
#                     if user:
#                         user_info = {
#                             "userId": str(user.get("_id")),
#                             "name": user.get("name"),
#                             "email": user.get("email"),
#                             "username": user.get("username"),
#                             "profilePicture": user.get("profilePicture"),
#                             "userType": user.get("userType")
#                         }
#                 except Exception as e:
#                     print(f"Error fetching user: {e}")
#             matched.append({
#                 'candidateId': str(c['_id']),
#                 'userInfo': user_info,
#                 'position': c.get('position'),
#                 'location': c.get('location'),
#                 'skills': candidate_skills,
#                 'experience': c.get('experience', '')
#             })

#     return jsonify({"message": "Matches found" if matched else "No matches found", "matched_candidates": matched})

























