

# from flask import Blueprint, request, jsonify, current_app
# from database import candidates_collection, users_collection
# from utils.text_processing import normalize_text, normalize_skills, model
# from bson import ObjectId
# import numpy as np
# import faiss
# import re

# recruiter_blueprint = Blueprint('recruiter', __name__)

# def extract_numeric_experience(exp):
#     """Extracts numeric values from an experience string."""
#     return [int(n) for n in re.findall(r'\d+', exp)] if exp else []

# @recruiter_blueprint.route('/recruiter-search', methods=['POST'])
# def recruiter_search():
#     data = request.json
#     inp = data.get('recruiter_input', {})
#     if not any(inp.values()):
#         return jsonify({"error": "At least one field must be provided"}), 400

#     # Normalize inputs
#     pos_q = normalize_text(inp.get('position', ''))
#     skills_q = normalize_skills(inp.get('skills', []))
#     location_q = normalize_text(inp.get('location', ''))
#     exp_q = inp.get('experience', '')

#     # Build MongoDB query
#     query = {}
#     if location_q:
#         query["$or"] = [
#             {"location.city": {"$regex": location_q, "$options": "i"}},
#             {"location.country": {"$regex": location_q, "$options": "i"}}
#         ]


#     candidate_ids = []

#     if pos_q:
#         # Exact matches for position
#         exact_matches = list(candidates_collection.find({"position": {"$regex": f"^{pos_q}$", "$options": "i"}}, {"_id": 1}))
#         candidate_ids.extend([ObjectId(m["_id"]) for m in exact_matches])

#         # Partial matches: query is substring of position
#         partial_matches = list(candidates_collection.find({"position": {"$regex": pos_q, "$options": "i"}}, {"_id": 1}))
#         candidate_ids.extend([ObjectId(m["_id"]) for m in partial_matches if ObjectId(m["_id"]) not in candidate_ids])

#     # FAISS position search with lower threshold
#     if pos_q:
#         t_idx = current_app.config['TITLE_INDEX']
#         t_ids = current_app.config['TITLE_IDS']
#         qvec = model.encode(pos_q, convert_to_tensor=False).astype('float32')
#         faiss.normalize_L2(qvec.reshape(1, -1))
#         D, I = t_idx.search(qvec.reshape(1, -1), 50)
#         faiss_ids = [ObjectId(t_ids[i]) for i in I[0] if D[0][list(I[0]).index(i)] > 0.4]  # Very low threshold
#         candidate_ids.extend([fid for fid in faiss_ids if fid not in candidate_ids])

#     # FAISS skill search
#     if skills_q:
#         s_idx = current_app.config['SKILL_INDEX']
#         s_ids = current_app.config['SKILL_IDS']
#         s_str = " ".join(sorted(skills_q))
#         svec = model.encode(s_str, convert_to_tensor=False).astype('float32')
#         faiss.normalize_L2(svec.reshape(1, -1))
#         D2, I2 = s_idx.search(svec.reshape(1, -1), 50)
#         skill_ids = [ObjectId(s_ids[i]) for i in I2[0] if D2[0][list(I2[0]).index(i)] > 0.4]
#         candidate_ids.extend([sid for sid in skill_ids if sid not in candidate_ids])

#     # Remove duplicates
#     candidate_ids = list(set(candidate_ids))

#     # Add candidate IDs to query
#     if candidate_ids:
#         query["_id"] = {"$in": candidate_ids}

#     # Fetch candidates
#     candidates = list(candidates_collection.find(query))

#     # Apply experience filter
#     matched = []
#     for c in candidates:
#         if exp_q:
#             candidate_exp = extract_numeric_experience(c.get("experience", ""))
#             exp_range = extract_numeric_experience(exp_q)
#             if not candidate_exp:
#                 continue
#             if len(exp_range) == 1 and candidate_exp[0] != exp_range[0]:
#                 continue
#             elif len(exp_range) == 2 and not (exp_range[0] <= candidate_exp[0] <= exp_range[1]):
#                 continue
#         # Populate user info
#         user_info = {}
#         user_id = c.get("userId")
#         if user_id:
#             try:
#                 user = users_collection.find_one({"_id": ObjectId(user_id)})
#                 if user:
#                     user_info = {
#                         "userId": str(user.get("_id")),
#                         "name": user.get("name"),
#                         "email": user.get("email"),
#                         "username": user.get("username"),
#                         "profilePicture": user.get("profilePicture"),
#                         "userType": user.get("userType")
#                     }
#             except Exception as e:
#                 print(f"Error fetching user: {e}")
#         matched.append({
#             'candidateId': str(c['_id']),
#             'userInfo': user_info,
#             'position': c.get('position'),
#             'location': c.get('location'),
#             'skills': c.get('skills'),
#             'experience': c.get('experience', '')
#         })

#     return jsonify({"message": "Matches found" if matched else "No matches found", "matched_candidates": matched})


from flask import Blueprint, request, jsonify, current_app
from database import candidates_collection, users_collection
from utils.text_processing import normalize_text, normalize_skills, model
from bson import ObjectId
import numpy as np
import faiss
import re

recruiter_blueprint = Blueprint('recruiter', __name__)

def extract_numeric_experience(exp):
    """Extracts numeric values from an experience string."""
    return [int(n) for n in re.findall(r'\d+', exp)] if exp else []

@recruiter_blueprint.route('/recruiter-search', methods=['POST'])
def recruiter_search():
    data = request.json
    inp = data.get('recruiter_input', {})
    if not any(inp.values()):
        return jsonify({"error": "At least one field must be provided"}), 400

    # Normalize inputs
    pos_q = normalize_text(inp.get('position', ''))
    skills_q = normalize_skills(inp.get('skills', []))
    location_q = normalize_text(inp.get('location', ''))
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

    # FAISS position search with lower threshold
    if pos_q:
        t_idx = current_app.config['TITLE_INDEX']
        t_ids = current_app.config['TITLE_IDS']
        qvec = model.encode(pos_q, convert_to_tensor=False).astype('float32')
        faiss.normalize_L2(qvec.reshape(1, -1))
        D, I = t_idx.search(qvec.reshape(1, -1), 50)
        faiss_ids = [ObjectId(t_ids[i]) for i in I[0] if D[0][list(I[0]).index(i)] > 0.8]
        candidate_ids.extend([fid for fid in faiss_ids if fid not in candidate_ids])

    # FAISS skill search
    if skills_q:
        s_idx = current_app.config['SKILL_INDEX']
        s_ids = current_app.config['SKILL_IDS']
        s_str = " ".join(sorted(skills_q))
        svec = model.encode(s_str, convert_to_tensor=False).astype('float32')
        faiss.normalize_L2(svec.reshape(1, -1))
        D2, I2 = s_idx.search(svec.reshape(1, -1), 50)
        skill_ids = [ObjectId(s_ids[i]) for i in I2[0] if D2[0][list(I2[0]).index(i)] > 0.8]
        candidate_ids.extend([sid for sid in skill_ids if sid not in candidate_ids])

    # Remove duplicates
    candidate_ids = list(set(candidate_ids))

    # Add candidate IDs to query
    if candidate_ids:
        query["_id"] = {"$in": candidate_ids}

    # Fetch candidates
    candidates = list(candidates_collection.find(query))

    # Post-processing (minimal)
    matched = []
    for c in candidates:
        # Populate user info
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
            'skills': c.get('skills'),
            'experience': c.get('experience', '')
        })

    return jsonify({"message": "Matches found" if matched else "No matches found", "matched_candidates": matched})