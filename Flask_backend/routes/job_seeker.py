from flask import Blueprint, request, jsonify
from database import jobs_collection, users_collection, recruiters_collection
from utils.text_processing import normalize_text, normalize_skills, title_similarity
import re
from bson import ObjectId
from datetime import datetime

job_seeker_blueprint = Blueprint('job_seeker', __name__)

def extract_experience(exp_str):
    """Extracts experience as a list of possible years from various input formats."""
    if not exp_str:
        return []

    numbers = list(map(int, re.findall(r'\d+', exp_str)))

    if len(numbers) == 1:
        return numbers  # Single number like "3" or "5 years"
    elif len(numbers) == 2:
        return list(range(numbers[0], numbers[1] + 1))  # Range like "3-5"
    return []

def experience_match(seeker_exp, job_exp):
    """Checks if seeker's experience falls within the job's required experience range."""
    seeker_exp_vals = extract_experience(seeker_exp)
    job_exp_vals = extract_experience(job_exp)

    if not seeker_exp_vals or not job_exp_vals:
        return False  # No experience data available

    # Seeker should match at least one year from job experience range
    return any(exp in job_exp_vals for exp in seeker_exp_vals)

def flexible_match(job_seeker_input, job):
    """Checks if a job post matches the job seeker's criteria."""
    if "title" in job_seeker_input:
        if title_similarity(job_seeker_input["title"], job["title"]) < 0.5:
            return False
    if "location" in job_seeker_input and normalize_text(job_seeker_input["location"]) not in normalize_text(job["location"]):
        return False
    if "jobType" in job_seeker_input and job_seeker_input["jobType"].lower() != job["jobType"].lower():
        return False
    if "skills" in job_seeker_input and not set(job_seeker_input["skills"]).issubset(set(job["skills"])):
        return False

    # Ensure seeker's experience correctly matches the job
    if "experience" in job_seeker_input:
        if not experience_match(job_seeker_input["experience"], job.get("experience", "")):
            return False

    return True

@job_seeker_blueprint.route('/job-seeker-match', methods=['POST'])
def job_seeker_match():
    """Handles job seeker match requests and returns matched job posts."""
    data = request.json
    job_seeker_input = data.get('job_seeker_input')

    if not job_seeker_input:
        return jsonify({"error": "Job seeker input is required"}), 400

    # Normalize input data
    if "title" in job_seeker_input:
        job_seeker_input["title"] = normalize_text(job_seeker_input["title"])
    if "location" in job_seeker_input:
        job_seeker_input["location"] = normalize_text(job_seeker_input["location"])
    if "skills" in job_seeker_input:
        job_seeker_input["skills"] = normalize_skills(job_seeker_input["skills"])

    job_posts = list(jobs_collection.find())

       
    matched_jobs = [
    {
      "_id": str(job["_id"]),
        "title": job["title"],
        "location": job["location"],
        "skills": job["skills"],
        "jobType": job["jobType"],
        "description": job["description"],
        "experience": job.get("experience", "Not specified"),
        "postedBy": str(job["postedBy"]) if "postedBy" in job else None,
        "createdAt": job["createdAt"].isoformat() if "createdAt" in job else None,
        "updatedAt": job["updatedAt"].isoformat() if "updatedAt" in job else None
    }
    for job in job_posts if flexible_match(job_seeker_input, job)
    ]
    

    # If no jobs match, return a "No match found" message
    if not matched_jobs:
        return jsonify({"message": "No match found"})

    return jsonify({"message": "Matches found", "matched_jobs": matched_jobs})




# from database import jobs_collection, users_collection, recruiters_collection  # make sure these are imported
