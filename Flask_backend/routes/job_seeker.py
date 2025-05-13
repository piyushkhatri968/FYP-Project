




# from flask import Blueprint, request, jsonify, current_app
# from database import jobs_collection
# from utils.text_processing import normalize_text, normalize_skills, encode_text
# from bson import ObjectId
# import faiss
# import re
# from fuzzywuzzy import fuzz

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

# def fuzzy_location_match(location_q, job_location):
#     """Check if locations match with minor spelling errors."""
#     if not location_q or not job_location:
#         return False
#     return fuzz.ratio(location_q.lower(), job_location.lower()) > 60

# @job_seeker_blueprint.route('/job-seeker-match', methods=['POST'])
# def job_seeker_match():
#     data = request.json
#     inp = data.get('job_seeker_input', {})
#     if not inp:
#         return jsonify({"error": "Job seeker input is required"}), 400

#     # Normalize inputs
#     title_q    = normalize_text(inp.get('title', ''))
#     skills_q   = normalize_skills(inp.get('skills', []))
#     location_q = normalize_text(inp.get('location', ''))
#     jobtype_q  = inp.get('jobType', '').lower()
#     exp_q      = inp.get('experience', '')

#     # Build MongoDB query for non-title filters
#     query = {}
#     if location_q:
#         query["location"] = {"$regex": location_q, "$options": "i"}
#     if jobtype_q:
#         query["jobType"] = {"$regex": f"^{jobtype_q}$", "$options": "i"}
#     if skills_q:
#         query["skills"] = {"$in": [re.compile(skill, re.IGNORECASE) for skill in skills_q]}
#     if exp_q:
#         exp_vals = extract_experience(exp_q)
#         if exp_vals:
#             query["experience"] = {
#                 "$regex": f"({'|'.join(map(str, exp_vals))})",
#                 "$options": "i"
#             }

#     # 1️⃣ Exact-title fast path (sorted by newest first)
#     if title_q:
#         exact_query = {"title": {"$regex": f"^{title_q}$", "$options": "i"}, **query}
#         exact_matches = list(
#             jobs_collection
#                 .find(exact_query)
#                 .sort("createdAt", -1)
#         )
#         if exact_matches:
#             matched_jobs = [{
#                 '_id':        str(job['_id']),
#                 'title':      job['title'],
#                 'location':   job.get('location'),
#                 'skills':     job.get('skills'),
#                 'jobType':    job.get('jobType'),
#                 'description':job.get('description'),
#                 'experience': job.get('experience', 'Not specified')
#             } for job in exact_matches]
#             return jsonify({"message": "Matches found", "matched_jobs": matched_jobs})


#     # 🧯 Fallback when only filters like location/experience/jobType are provided





#     # 2️⃣ FAISS fallback: separate title vs. skill hits
#     title_ids = []
#     if title_q:
#         t_idx = current_app.config['TITLE_INDEX']
#         t_ids = current_app.config['TITLE_IDS']
#         qvec = encode_text(title_q)
#         faiss.normalize_L2(qvec.reshape(1, -1))
#         D, I = t_idx.search(qvec.reshape(1, -1), 50)
#         for rank, score in enumerate(D[0]):
#             idx = I[0][rank]
#             if score > 0.65:
#                 title_ids.append(ObjectId(t_ids[idx]))

#     skill_ids = []
#     if skills_q:
#         s_idx = current_app.config['SKILL_INDEX']
#         s_ids = current_app.config['SKILL_IDS']
#         s_str = " ".join(sorted(skills_q))
#         svec = encode_text(s_str)
#         faiss.normalize_L2(svec.reshape(1, -1))
#         D2, I2 = s_idx.search(svec.reshape(1, -1), 50)
#         for rank, score in enumerate(D2[0]):
#             idx = I2[0][rank]
#             if score > 0.4:
#                 skill_ids.append(ObjectId(s_ids[idx]))

#     # Deduplicate and ensure title hits come first
#     title_ids = list(dict.fromkeys(title_ids))
#     skill_ids = [i for i in dict.fromkeys(skill_ids) if i not in title_ids]

#     # 3️⃣ Fetch in two batches, each sorted by newest
#     recent_title_jobs = []
#     if title_ids:
#         recent_title_jobs = list(
#             jobs_collection
#                 .find({"_id": {"$in": title_ids}})
#                 .sort("createdAt", -1)
#         )

#     recent_skill_jobs = []
#     if skill_ids:
#         recent_skill_jobs = list(
#             jobs_collection
#                 .find({"_id": {"$in": skill_ids}})
#                 .sort("createdAt", -1)
#         )

#     # 4️⃣ Merge and post-filter by location
#     combined = recent_title_jobs + recent_skill_jobs
#     matched_jobs = []
#     for job in combined:
#         job_location = job.get('location', '')
#         if location_q and not fuzzy_location_match(location_q, job_location):
#             continue
#         matched_jobs.append({
#             '_id':        str(job['_id']),
#             'title':      job['title'],
#             'location':   job_location,
#             'skills':     job.get('skills'),
#             'jobType':    job.get('jobType'),
#             'description':job.get('description'),
#             'experience': job.get('experience', 'Not specified')
#         })

#     return jsonify({
#         "message":      "Matches found" if matched_jobs else "No matches found",
#         "matched_jobs": matched_jobs
#     })


























from flask import Blueprint, request, jsonify, current_app
from database import jobs_collection
from utils.text_processing import normalize_text, normalize_skills, encode_text
from bson import ObjectId
import faiss
import re
from fuzzywuzzy import fuzz

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

def fuzzy_location_match(location_q, job_location):
    """Check if locations match with minor spelling errors."""
    if not location_q or not job_location:
        return False
    return fuzz.ratio(location_q.lower(), job_location.lower()) > 60

@job_seeker_blueprint.route('/job-seeker-match', methods=['POST'])
def job_seeker_match():
    data = request.json
    inp = data.get('job_seeker_input', {})
    if not inp:
        return jsonify({"error": "Job seeker input is required"}), 400

    # Normalize inputs
    title_q    = normalize_text(inp.get('title', ''))
    skills_q   = normalize_skills(inp.get('skills', []))
    location_q = normalize_text(inp.get('location', ''))
    jobtype_q  = inp.get('jobType', '').lower()
    exp_q      = inp.get('experience', '')

    # Build MongoDB query for non-title filters
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

    # 1️⃣ Exact-title fast path (sorted by newest first)
    if title_q:
        exact_query = {"title": {"$regex": f"^{title_q}$", "$options": "i"}, **query}
        exact_matches = list(
            jobs_collection
                .find(exact_query)
                .sort("createdAt", -1)
        )
        if exact_matches:
            matched_jobs = [{
                '_id':        str(job['_id']),
                'title':      job['title'],
                'location':   job.get('location'),
                'skills':     job.get('skills'),
                'jobType':    job.get('jobType'),
                'description':job.get('description'),
                'experience': job.get('experience', 'Not specified')
            } for job in exact_matches]
            return jsonify({"message": "Matches found", "matched_jobs": matched_jobs})


    # 🧯 Fallback when only filters like location/experience/jobType are provided

    if not title_q and not skills_q and query:
        filter_only_matches = list(
            jobs_collection
                .find(query)
                .sort("createdAt", -1)
        )
        if filter_only_matches:
            matched_jobs = [{
                '_id':        str(job['_id']),
                'title':      job['title'],
                'location':   job.get('location'),
                'skills':     job.get('skills'),
                'jobType':    job.get('jobType'),
                'description':job.get('description'),
                'experience': job.get('experience', 'Not specified')
            } for job in filter_only_matches]
            return jsonify({"message": "Matches found", "matched_jobs": matched_jobs})



    # 2️⃣ FAISS fallback: separate title vs. skill hits
    title_ids = []
    if title_q:
        t_idx = current_app.config['TITLE_INDEX']
        t_ids = current_app.config['TITLE_IDS']
        qvec = encode_text(title_q)
        faiss.normalize_L2(qvec.reshape(1, -1))
        D, I = t_idx.search(qvec.reshape(1, -1), 50)
        for rank, score in enumerate(D[0]):
            idx = I[0][rank]
            if score > 0.65:
                title_ids.append(ObjectId(t_ids[idx]))

    skill_ids = []
    if skills_q:
        s_idx = current_app.config['SKILL_INDEX']
        s_ids = current_app.config['SKILL_IDS']
        s_str = " ".join(sorted(skills_q))
        svec = encode_text(s_str)
        faiss.normalize_L2(svec.reshape(1, -1))
        D2, I2 = s_idx.search(svec.reshape(1, -1), 50)
        for rank, score in enumerate(D2[0]):
            idx = I2[0][rank]
            if score > 0.4:
                skill_ids.append(ObjectId(s_ids[idx]))

    # Deduplicate and ensure title hits come first
    title_ids = list(dict.fromkeys(title_ids))
    skill_ids = [i for i in dict.fromkeys(skill_ids) if i not in title_ids]

    # 3️⃣ Fetch in two batches, each sorted by newest
    recent_title_jobs = []
    if title_ids:
        recent_title_jobs = list(
            jobs_collection
                .find({"_id": {"$in": title_ids}})
                .sort("createdAt", -1)
        )

    recent_skill_jobs = []
    if skill_ids:
        recent_skill_jobs = list(
            jobs_collection
                .find({"_id": {"$in": skill_ids}})
                .sort("createdAt", -1)
        )

    # 4️⃣ Merge and post-filter by location
    combined = recent_title_jobs + recent_skill_jobs
    matched_jobs = []
    for job in combined:
        job_location = job.get('location', '')
        if location_q and not fuzzy_location_match(location_q, job_location):
            continue
        matched_jobs.append({
            '_id':        str(job['_id']),
            'title':      job['title'],
            'location':   job_location,
            'skills':     job.get('skills'),
            'jobType':    job.get('jobType'),
            'description':job.get('description'),
            'experience': job.get('experience', 'Not specified')
        })

    return jsonify({
        "message":      "Matches found" if matched_jobs else "No matches found",
        "matched_jobs": matched_jobs
    })





















