# from flask import Blueprint, request, jsonify, current_app
# from database import candidates_collection, users_collection
# from utils.text_processing import normalize_text, normalize_skills, encode_text
# from bson import ObjectId
# import re
# import faiss

# recruiter_blueprint = Blueprint('recruiter', __name__)

# def extract_numeric_experience(exp):
#     """Extracts numeric values from an experience string."""
#     return [int(n) for n in re.findall(r'\d+', exp)] if exp else []

# def skills_match_percentage(input_skills, candidate_skills):
#     """Calculate percentage of input skills that match candidate skills."""
#     if not input_skills:
#         return 100  # If no skills provided, assume full match
#     input_lower = [s.lower() for s in input_skills]
#     cand_lower = [s.lower() for s in candidate_skills]
#     match_count = sum(1 for s in input_lower if s in cand_lower)
#     return (match_count / len(input_skills)) * 100

# @recruiter_blueprint.route('/recruiter-search', methods=['POST'])
# def recruiter_search():
#     data = request.json
#     inp = data.get('recruiter_input', {})
#     if not any(inp.values()):
#         return jsonify({"error": "At least one field must be provided"}), 400

#     # Normalize inputs
#     pos_q = normalize_text(inp.get('position', ''))
#     skills_q = normalize_skills(inp.get('skills', []))
#     location = inp.get('location', '')
#     if isinstance(location, dict):
#         loc_text = location.get('city', '') or location.get('country', '')
#     else:
#         loc_text = location
#     loc_q = normalize_text(loc_text)
#     exp_q = inp.get('experience', '')

#     # Stage 1: Build base filters (location & experience)
#     base_filters = {}
#     if loc_q:
#         base_filters["$or"] = [
#             {"location.city": {"$regex": loc_q, "$options": "i"}},
#             {"location.country": {"$regex": loc_q, "$options": "i"}}
#         ]
#     if exp_q:
#         vals = extract_numeric_experience(exp_q)
#         if vals:
#             base_filters["experience"] = {
#                 "$regex": f"({'|'.join(map(str, vals))})",
#                 "$options": "i"
#             }

#     # Stage 2: Position-first logic
#     if pos_q:
#         # 2a. Exact position match
#         exact_q = {"position": {"$regex": f"^{pos_q}$", "$options": "i"}, **base_filters}
#         exact = list(candidates_collection.find(exact_q))
#         if exact:
#             return jsonify({
#                 "message": "Matches found",
#                 "matched_candidates": _format_candidates(exact)
#             })

#         # 2b. Partial substring position match
#         partial_q = {"position": {"$regex": pos_q, "$options": "i"}, **base_filters}
#         partial = list(candidates_collection.find(partial_q))
#         if partial:
#             return jsonify({
#                 "message": "Matches found",
#                 "matched_candidates": _format_candidates(partial)
#             })

#         # 2c. FAISS position search fallback
#         pos_ids = []
#         t_idx = current_app.config['TITLE_INDEX']
#         t_ids = current_app.config['TITLE_IDS']
#         qvec = encode_text(pos_q)
#         faiss.normalize_L2(qvec.reshape(1, -1))
#         D, I = t_idx.search(qvec.reshape(1, -1), 20)
#         for rank, score in enumerate(D[0]):
#             idx = I[0][rank]
#             if 0 <= idx < len(t_ids) and score > 0.65:
#                 pos_ids.append(ObjectId(t_ids[idx]))
#         if pos_ids:
#             base_filters["_id"] = {"$in": list(set(pos_ids))}
#             return jsonify({
#                 "message": "Matches found",
#                 "matched_candidates": _format_candidates(list(candidates_collection.find(base_filters)))
#             })

#     # Stage 3: Skills fallback if no position results or pos_q empty
#     skill_ids = []
#     if skills_q:
#         # FAISS skill search
#         s_idx = current_app.config['SKILL_INDEX']
#         s_ids = current_app.config['SKILL_IDS']
#         s_str = " ".join(sorted(skills_q))
#         svec = encode_text(s_str)
#         faiss.normalize_L2(svec.reshape(1, -1))
#         D2, I2 = s_idx.search(svec.reshape(1, -1), 20)
#         for rank, score in enumerate(D2[0]):
#             idx = I2[0][rank]
#             if 0 <= idx < len(s_ids) and score > 0.4:
#                 skill_ids.append(ObjectId(s_ids[idx]))
    
#     if skill_ids:
#         base_filters["_id"] = {"$in": list(set(skill_ids))}

#     # Final fetch & post-process
#     candidates = list(candidates_collection.find(base_filters))
#     filtered = [c for c in candidates if not skills_q or skills_match_percentage(skills_q, c.get('skills', [])) >= 10]
#     return jsonify({
#         "message": "Matches found" if filtered else "No matches found",
#         "matched_candidates": _format_candidates(filtered)
#     })


# def _format_candidates(cands):
#     """Helper to format candidate docs with user info."""
#     results = []
#     for c in cands:
#         ui = {}
#         uid = c.get('userId')
#         if uid:
#             u = users_collection.find_one({"_id": ObjectId(uid)})
#             if u:
#                 ui = {
#                     "userId": str(u['_id']),
#                     "name": u.get('name'),
#                     "email": u.get('email'),
#                     "username": u.get('username'),
#                     "profilePicture": u.get('profilePicture'),
#                     "userType": u.get('userType')
#                 }
#         results.append({
#             'candidateId': str(c['_id']),
#             'userInfo': ui,
#             'position': c.get('position'),
#             'location': c.get('location'),
#             'skills': c.get('skills', []),
#             'experience': c.get('experience', '')
#         })
#     return results







from flask import Blueprint, request, jsonify, current_app
from database import candidates_collection, users_collection
from utils.text_processing import normalize_text, normalize_skills, encode_text
from bson import ObjectId
import re
import faiss

recruiter_blueprint = Blueprint('recruiter', __name__)

def extract_numeric_experience(exp):
    """Extracts numeric values from an experience string."""
    return [int(n) for n in re.findall(r'\d+', exp)] if exp else []

def skills_match_percentage(input_skills, candidate_skills):
    """Calculate percentage of input skills that match candidate skills."""
    if not input_skills:
        return 100
    input_lower = [s.lower() for s in input_skills]
    cand_lower = [s.lower() for s in candidate_skills]
    match_count = sum(1 for s in input_lower if s in cand_lower)
    return (match_count / len(input_skills)) * 100

@recruiter_blueprint.route('/recruiter-search', methods=['POST'])
def recruiter_search():
    data = request.json
    inp = data.get('recruiter_input', {})
    if not any(inp.values()):
        return jsonify({"error": "At least one field must be provided"}), 400

    # Normalize inputs
    pos_q = normalize_text(inp.get('position', ''))
    skills_q = normalize_skills(inp.get('skills', []))
    location = inp.get('location', '')
    if isinstance(location, dict):
        loc_text = location.get('city', '') or location.get('country', '')
    else:
        loc_text = location
    loc_q = normalize_text(loc_text)
    exp_q = inp.get('experience', '')

    # Stage 1: Build base filters (location & experience)
    base_filters = {}
    if loc_q:
        base_filters["$or"] = [
            {"location.city": {"$regex": loc_q, "$options": "i"}},
            {"location.country": {"$regex": loc_q, "$options": "i"}}
        ]
    if exp_q:
        vals = extract_numeric_experience(exp_q)
        if vals:
            base_filters["experience"] = {
                "$regex": f"({'|'.join(map(str, vals))})",
                "$options": "i"
            }

    # Position-first logic
    # 1️⃣ Exact position match
    if pos_q:
        exact_q = {"position": {"$regex": f"^{pos_q}$", "$options": "i"}, **base_filters}
        exact = list(
            candidates_collection
                .find(exact_q)
                .sort("createdAt", -1)   # newest first
        )
        if exact:
            return jsonify({
                "message": "Matches found",
                "matched_candidates": _format_candidates(exact)
            })

        # 2️⃣ Partial substring match
        partial_q = {"position": {"$regex": pos_q, "$options": "i"}, **base_filters}
        partial = list(
            candidates_collection
                .find(partial_q)
                .sort("createdAt", -1)   # newest first
        )
        if partial:
            return jsonify({
                "message": "Matches found",
                "matched_candidates": _format_candidates(partial)
            })

        # 3️⃣ FAISS fallback
        pos_ids = []
        t_idx = current_app.config['TITLE_INDEX']
        t_ids = current_app.config['TITLE_IDS']
        qvec = encode_text(pos_q)
        faiss.normalize_L2(qvec.reshape(1, -1))
        D, I = t_idx.search(qvec.reshape(1, -1), 20)
        for rank, score in enumerate(D[0]):
            idx = I[0][rank]
            if 0 <= idx < len(t_ids) and score > 0.65:
                pos_ids.append(ObjectId(t_ids[idx]))
        if pos_ids:
            results = list(
                candidates_collection
                    .find({**base_filters, '_id': {'$in': list(set(pos_ids))}})
                    .sort("createdAt", -1)   # newest first
            )
            return jsonify({
                "message": "Matches found",
                "matched_candidates": _format_candidates(results)
            })

    # Skills fallback or no position provided
    skill_ids = []
    if skills_q:
        s_idx = current_app.config['SKILL_INDEX']
        s_ids = current_app.config['SKILL_IDS']
        s_str = " ".join(sorted(skills_q))
        svec = encode_text(s_str)
        faiss.normalize_L2(svec.reshape(1, -1))
        D2, I2 = s_idx.search(svec.reshape(1, -1), 20)
        for rank, score in enumerate(D2[0]):
            idx = I2[0][rank]
            if 0 <= idx < len(s_ids) and score > 0.4:
                skill_ids.append(ObjectId(s_ids[idx]))
    if skill_ids:
        candidates = list(
            candidates_collection
                .find({**base_filters, '_id': {'$in': list(set(skill_ids))}})
                .sort("createdAt", -1)   # newest first
        )
    else:
        candidates = list(
            candidates_collection
                .find(base_filters)
                .sort("createdAt", -1)   # newest first
        )

    # Post-filter by skill percentage
    filtered = [c for c in candidates if not skills_q or skills_match_percentage(skills_q, c.get('skills', [])) >= 10]
    return jsonify({
        "message": "Matches found" if filtered else "No matches found",
        "matched_candidates": _format_candidates(filtered)
    })

def _format_candidates(cands):
    """Helper to format candidate docs with user info."""
    results = []
    for c in cands:
        ui = {}
        uid = c.get('userId')
        if uid:
            u = users_collection.find_one({"_id": ObjectId(uid)})
            if u:
                ui = {
                    "userId": str(u['_id']),
                    "name": u.get('name'),
                    "email": u.get('email'),
                    "username": u.get('username'),
                    "profilePicture": u.get('profilePicture'),
                    "userType": u.get('userType')
                }
        results.append({
            'candidateId': str(c['_id']),
            'userInfo': ui,
            'position': c.get('position'),
            'location': c.get('location'),
            'skills': c.get('skills', []),
            'experience': c.get('experience', '')
        })
    return results
