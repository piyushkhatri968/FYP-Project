# from flask import Blueprint, request, jsonify, current_app
# from database import jobs_collection
# from utils.text_processing import normalize_text, normalize_skills, model
# from bson import ObjectId
# import numpy as np
# import faiss
# import re

# job_seeker_blueprint = Blueprint('job_seeker', __name__)

# def extract_experience(exp_str):
#     """Extracts experience as a list of possible years from various input formats."""
#     if not exp_str:
#         return []
#     numbers = list(map(int, re.findall(r'\d+', exp_str)))
#     if len(numbers) == 1:
#         return numbers
#     elif len(numbers) == 2:
#         return list(range(numbers[0], numbers[1] + 1))
#     return []

# def experience_match(seeker_exp, job_exp):
#     """Checks if seeker's experience falls within the job's required experience range."""
#     seeker_exp_vals = extract_experience(seeker_exp)
#     job_exp_vals = extract_experience(job_exp)
#     if not seeker_exp_vals or not job_exp_vals:
#         return False
#     return any(exp in job_exp_vals for exp in seeker_exp_vals)

# @job_seeker_blueprint.route('/job-seeker-match', methods=['POST'])
# def job_seeker_match():
#     data = request.json
#     inp = data.get('job_seeker_input', {})
#     if not inp:
#         return jsonify({"error": "Job seeker input is required"}), 400

#     # Normalize inputs
#     title_q = normalize_text(inp.get('title', ''))
#     skills_q = normalize_skills(inp.get('skills', []))
#     location_q = normalize_text(inp.get('location', ''))
#     jobtype_q = inp.get('jobType', '').lower()
#     exp_q = inp.get('experience', '')

#     # Build MongoDB query
#     query = {}
#     if location_q:
#         query["location"] = {"$regex": location_q, "$options": "i"}
#     if jobtype_q:
#         query["jobType"] = {"$regex": f"^{jobtype_q}$", "$options": "i"}

#     candidate_ids = []

#     if title_q:
#         # Exact match for title
#         exact_matches = list(jobs_collection.find({"title": {"$regex": f"^{title_q}$", "$options": "i"}}, {"_id": 1}))
#         candidate_ids.extend([ObjectId(m["_id"]) for m in exact_matches])

#         # Partial match: query is substring of title
#         partial_matches = list(jobs_collection.find({"title": {"$regex": title_q, "$options": "i"}}, {"_id": 1}))
#         candidate_ids.extend([ObjectId(m["_id"]) for m in partial_matches if ObjectId(m["_id"]) not in candidate_ids])

#     # FAISS title search with lower threshold
#     if title_q:
#         t_idx = current_app.config['TITLE_INDEX']
#         t_ids = current_app.config['TITLE_IDS']
#         qvec = model.encode(title_q, convert_to_tensor=False).astype('float32')
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
#     else:
#         # If no candidates from FAISS or matches, still apply other filters
#         pass

#     # Fetch jobs
#     jobs = list(jobs_collection.find(query))

#     # Apply experience filter
#     matched = []
#     for job in jobs:
#         if exp_q and not experience_match(exp_q, job.get('experience', '')):
#             continue
#         matched.append({
#             '_id': str(job['_id']),
#             'title': job['title'],
#             'location': job.get('location'),
#             'skills': job.get('skills'),
#             'jobType': job.get('jobType'),
#             'description': job.get('description'),
#             'experience': job.get('experience', 'Not specified')
#         })

#     return jsonify({"message": "Matches found" if matched else "No matches found", "matched_jobs": matched})










from flask import Blueprint, request, jsonify, current_app
from database import jobs_collection
from utils.text_processing import normalize_text, normalize_skills, model
from bson import ObjectId
import numpy as np
import faiss
import re

job_seeker_blueprint = Blueprint('job_seeker', __name__)

def extract_experience(exp_str):
    """Extracts experience as a list of possible years from various input formats."""
    if not exp_str:
        return []
    numbers = list(map(int, re.findall(r'\d+', exp_str)))
    if len(numbers) == 1:
        return numbers
    elif len(numbers) == 2:
        return list(range(numbers[0], numbers[1] + 1))
    return []

@job_seeker_blueprint.route('/job-seeker-match', methods=['POST'])
def job_seeker_match():
    data = request.json
    inp = data.get('job_seeker_input', {})
    if not inp:
        return jsonify({"error": "Job seeker input is required"}), 400

    # Normalize inputs
    title_q = normalize_text(inp.get('title', ''))
    skills_q = normalize_skills(inp.get('skills', []))
    location_q = normalize_text(inp.get('location', ''))
    jobtype_q = inp.get('jobType', '').lower()
    exp_q = inp.get('experience', '')

    # Build MongoDB query
    query = {}
    if location_q:
        query["location"] = {"$regex": location_q, "$options": "i"}
    if jobtype_q:
        query["jobType"] = {"$regex": f"^{jobtype_q}$", "$options": "i"}
    if skills_q:
        query["skills"] = {"$in": [re.compile(skill, re.IGNORECASE) for skill in skills_q]}
    if exp_q:
        exp_vals = extract_experience(exp_q)
        if exp_vals:
            query["experience"] = {
                "$regex": f"({'|'.join(map(str, exp_vals))})",
                "$options": "i"
            }

    candidate_ids = []

    if title_q:
        # Exact match for title
        exact_matches = list(jobs_collection.find({"title": {"$regex": f"^{title_q}$", "$options": "i"}, **query}, {"_id": 1}))
        candidate_ids.extend([ObjectId(m["_id"]) for m in exact_matches])

        # Partial match: query is substring of title
        partial_matches = list(jobs_collection.find({"title": {"$regex": title_q, "$options": "i"}, **query}, {"_id": 1}))
        candidate_ids.extend([ObjectId(m["_id"]) for m in partial_matches if ObjectId(m["_id"]) not in candidate_ids])

    # FAISS title search with lower threshold
    if title_q:
        t_idx = current_app.config['TITLE_INDEX']
        t_ids = current_app.config['TITLE_IDS']
        qvec = model.encode(title_q, convert_to_tensor=False).astype('float32')
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
    else:
        # If no candidates from FAISS or matches, still apply other filters
        pass

    # Fetch jobs
    jobs = list(jobs_collection.find(query))

    # Post-processing (minimal, as most filtering is in MongoDB)
    matched = []
    for job in jobs:
        matched.append({
            '_id': str(job['_id']),
            'title': job['title'],
            'location': job.get('location'),
            'skills': job.get('skills'),
            'jobType': job.get('jobType'),
            'description': job.get('description'),
            'experience': job.get('experience', 'Not specified')
        })

    return jsonify({"message": "Matches found" if matched else "No matches found", "matched_jobs": matched})