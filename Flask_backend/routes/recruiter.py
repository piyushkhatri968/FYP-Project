from flask import Blueprint, request, jsonify
from database import candidates_collection
from utils.text_processing import normalize_text, normalize_skills, title_similarity, skill_similarity
import re

recruiter_blueprint = Blueprint('recruiter', __name__)

def extract_numeric_experience(exp):
    """Extracts numeric values from an experience string."""
    return [int(n) for n in re.findall(r'\d+', exp)] if exp else []

@recruiter_blueprint.route('/recruiter-search', methods=['POST'])
def recruiter_search():
    data = request.json
    recruiter_input = data.get('recruiter_input', {})

    if not any(recruiter_input.values()):
        return jsonify({"error": "At least one field must be provided"}), 400

    # Normalize input
    if "skills" in recruiter_input:
        recruiter_input["skills"] = normalize_skills(recruiter_input["skills"])
    if "location" in recruiter_input:
        recruiter_input["location"] = {k: normalize_text(str(v)) for k, v in recruiter_input["location"].items()}  # Convert zipCode to string
    if "position" in recruiter_input:
        recruiter_input["position"] = normalize_text(recruiter_input["position"])
    if "experience" in recruiter_input:
        recruiter_input["experience"] = extract_numeric_experience(recruiter_input["experience"])

    # Build query
    query = {}

    # Location filter
    if "location" in recruiter_input:
        for key, value in recruiter_input["location"].items():
            query[f"location.{key}"] = {"$regex": value, "$options": "i"}

    # Fetch all candidates first
    candidates = list(candidates_collection.find(query))

    matched_candidates = []
    for candidate in candidates:
        # Position similarity check
        if "position" in recruiter_input:
            candidate_position = normalize_text(candidate.get("position", ""))
            similarity_score = title_similarity(recruiter_input["position"], candidate_position)
            if similarity_score < 0.7:  # Threshold for similarity
                continue  # Skip non-matching positions

        
        # Experience filtering
        if "experience" in recruiter_input:
            candidate_exp = extract_numeric_experience(candidate.get("experience", ""))

            # If recruiter provided a range (e.g., "3-5")
            experience_range = re.findall(r'\d+', str(recruiter_input["experience"]))
            
            if not candidate_exp:  # Exclude candidates with missing experience
                continue  

            if len(experience_range) == 1:  # If only one number is given (e.g., "3")
                if candidate_exp[0] != int(experience_range[0]):  # Ensure exact match
                    continue  

            elif len(experience_range) == 2:  # If a range is given (e.g., "3-5")
                min_exp, max_exp = map(int, experience_range)
                if not (min_exp <= candidate_exp[0] <= max_exp):  # Ensure within range
                    continue  


        # Skills filtering with similarity
        if "skills" in recruiter_input:
            candidate_skills = normalize_skills(candidate.get("skills", []))
            skill_match_score = skill_similarity(recruiter_input["skills"], candidate_skills)
            if skill_match_score < 0.7:  # Require at least 70% skill similarity
                continue  # Skip if skills don't match well

        # Add to results if all filters pass
        matched_candidates.append({
            "name": candidate.get("name"),
            "position": candidate.get("position"),
            "location": candidate.get("location"),
            "experience": candidate.get("experience"),
            "skills": candidate.get("skills")
        })

    return jsonify({"message": "Matches found", "matched_candidates": matched_candidates}) if matched_candidates else jsonify({"message": "No match found"})
