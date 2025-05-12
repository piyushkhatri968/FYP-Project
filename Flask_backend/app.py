# from flask import Flask, request, jsonify
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from gensim.models import Doc2Vec
# from scipy.spatial.distance import cosine
# import numpy as np
# import spacy
# from fuzzywuzzy import fuzz
# from pymongo import MongoClient
# from  flask_cors import CORS
# import os

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Replace with your frontend's URL

# # Load Spacy NLP model

# nlp = spacy.load("en_core_web_sm")

# # MongoDB connection
# client = MongoClient("mongodb+srv://babarhanif:N0Q7L7yXSITw9qbU@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project")
# db = client["fyp-project"]
# jobs_collection = db["jobposts"]
# seekers_collection = db["candidates"]

# Helper Functions
# def get_synonyms(word):
#     from nltk.corpus import wordnet
#     synonyms = set()
#     for syn in wordnet.synsets(word):
#         for lemma in syn.lemmas():
#             synonyms.add(lemma.name())
#     return synonyms

# def detailed_strict_match(input_text, comparison_texts):
#     input_doc = nlp(input_text)
#     input_tokens = {token.text.lower() for token in input_doc if not token.is_stop and not token.is_punct}
    
#     for comparison_text in comparison_texts:
#         comparison_doc = nlp(comparison_text)
#         comparison_tokens = {token.text.lower() for token in comparison_doc if not token.is_stop and not token.is_punct}
        
#         if input_tokens == comparison_tokens:
#             return True
        
#         # Check for synonyms and handle misspellings
#         match = True
#         for token in input_tokens:
#             if token not in comparison_tokens and not get_synonyms(token).intersection(comparison_tokens):
#                 match = False
#                 break
        
#         if match:
#             return True
        
#         # Handle misspellings using fuzzy matching
#         match = True
#         for token in input_tokens:
#             if not any(fuzz.ratio(token, comp_token) > 80 for comp_token in comparison_tokens):
#                 match = False
#                 break
        
#         if match:
#             return True
    
#     return False

# # Enhanced Matching Function
# def enhanced_match(input_text, comparison_texts):
#     input_doc = nlp(input_text)
#     input_tokens = {token.text.lower() for token in input_doc if not token.is_stop and not token.is_punct}
    
#     for comparison_text in comparison_texts:
#         comparison_doc = nlp(comparison_text)
#         comparison_tokens = {token.text.lower() for token in comparison_doc if not token.is_stop and not token.is_punct}
        
#         # Check for important keywords
#         important_keywords = {'position', 'location', 'fulltime', 'parttime', 'skills'}
#         if any(token in important_keywords for token in input_tokens.intersection(comparison_tokens)):
#             return True
        
#         # Check for synonyms and handle misspellings
#         match = True
#         for token in input_tokens:
#             if token not in comparison_tokens and not get_synonyms(token).intersection(comparison_tokens):
#                 match = False
#                 break
        
#         if match:
#             return True
        
#         # Handle misspellings using fuzzy matching
#         match = True
#         for token in input_tokens:
#             if not any(fuzz.ratio(token, comp_token) > 80 for comp_token in comparison_tokens):
#                 match = False
#                 break
        
#         if match:
#             return True
    
#     return False

# # TF-IDF Matching
# def tfidf_match(input_text, comparison_texts):
#     vectorizer = TfidfVectorizer()
#     vectors = vectorizer.fit_transform([input_text] + comparison_texts)
#     cosine_similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
#     return cosine_similarities

# # Doc2Vec Matching
# def doc2vec_match(input_text, comparison_texts, model_path):
#     if not os.path.exists(model_path):
#         return np.zeros(len(comparison_texts))  # Return zeros if model is not found
    
#     model = Doc2Vec.load(model_path)
#     input_vector = model.infer_vector(input_text.split())
#     comparison_vectors = [model.infer_vector(text.split()) for text in comparison_texts]
#     similarities = [1 - cosine(input_vector, vec) for vec in comparison_vectors]
#     return np.array(similarities)

# # Hybrid Model
# def hybrid_match(tfidf_scores, doc2vec_scores, alpha=0.5):
#     return alpha * tfidf_scores + (1 - alpha) * doc2vec_scores

# # Job Seeker Matching Endpoint
# @app.route('/job-seeker-match', methods=['POST'])
# def job_seeker_match():
#     data = request.json
#     job_seeker_input = data.get('job_seeker_input')
    
#     # Fetch job posts from MongoDB
#     job_posts = [job['description'] for job in jobs_collection.find()]
    
#     if not job_seeker_input or not job_posts:
#         return jsonify({"error": "Job seeker input and job posts are required"}), 400

#     # Calculate similarity scores
#     tfidf_scores = tfidf_match(job_seeker_input, job_posts)
#     doc2vec_scores = doc2vec_match(job_seeker_input, job_posts, "job_seeker_doc2vec_final.model")
#     hybrid_scores = hybrid_match(tfidf_scores, doc2vec_scores)
    
#     best_match_index = int(np.argmax(hybrid_scores))
#     best_match_score = float(hybrid_scores[best_match_index])
#     best_match_post = job_posts[best_match_index]

#     # Check for exact match, synonyms, and spelling mistakes
#     if enhanced_match(job_seeker_input, [best_match_post]) or best_match_score > 0.8:
#         result = {
#             "best_job_post_index": best_match_index,
#             "best_job_post_score": best_match_score,
#             "matched_job_post": best_match_post
#         }
#     else:
#         result = {
#             "message": "No match right now"
#         }

#     return jsonify(result)

# # Recruiter Matching Endpoint
# @app.route('/recruiter-match', methods=['POST'])
# def recruiter_match():
#     data = request.json
#     recruiter_input = data.get('recruiter_input')
    
#     # Fetch job seekers from MongoDB
#     job_seekers = [" ".join(seeker['skills']) for seeker in seekers_collection.find()]
    
#     if not recruiter_input or not job_seekers:
#         return jsonify({"error": "Recruiter input and job seekers are required"}), 400

#     # Calculate similarity scores
#     tfidf_scores = tfidf_match(recruiter_input, job_seekers)
#     doc2vec_scores = doc2vec_match(recruiter_input, job_seekers, "cv_job_maching.model")
#     hybrid_scores = hybrid_match(tfidf_scores, doc2vec_scores)
    
#     best_match_index = int(np.argmax(hybrid_scores))
#     best_match_score = float(hybrid_scores[best_match_index])
#     best_match_seeker = job_seekers[best_match_index]

#     # Check for exact match, synonyms, and spelling mistakes
#     if enhanced_match(recruiter_input, [best_match_seeker]) or best_match_score > 0.8:
#         result = {
#             "best_job_seeker_index": best_match_index,
#             "best_job_seeker_score": best_match_score,
#             "matched_job_seeker": best_match_seeker
#         }
#     else:
#         result = {
#             "message": "No match right now"
#         }

#     return jsonify(result)









# # Run Flask App
# if __name__ == '__main__':
#     app.run(debug=True)




#  ======================================================single input search by Job seeker using spacy======================







# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import spacy  # NLP library

# app = Flask(__name__)

# # MongoDB connection
# client = MongoClient("mongodb+srv://babarhanif:N0Q7L7yXSITw9qbU@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project")
# db = client["fyp-project"]
# jobs_collection = db["jobposts"]

# # Load NLP model
# nlp = spacy.load("en_core_web_md")

# # Helper functions
# def normalize_text(text):
#     """Normalize text by converting to lowercase and stripping extra spaces."""
#     return text.lower().strip()

# def normalize_skills(skills):
#     """Normalize and sort skills for accurate comparison."""
#     return sorted([normalize_text(skill) for skill in skills])

# def title_similarity(title1, title2):
#     """Calculate similarity between two titles using NLP."""
#     doc1 = nlp(title1)
#     doc2 = nlp(title2)
#     return doc1.similarity(doc2)

# def flexible_match(job_seeker_input, job):
#     """Match job seeker input with a job posting based on provided fields."""
#     # Match title if provided
#     if "title" in job_seeker_input:
#         if title_similarity(job_seeker_input["title"], job["title"]) < 0.5:
#             return False

#     # Match location if provided
#     if "location" in job_seeker_input:
#         if normalize_text(job_seeker_input["location"]) not in normalize_text(job["location"]):
#             return False

#     # Match job type if provided
#     if "jobType" in job_seeker_input:
#         if job_seeker_input["jobType"].lower() != job["jobType"].lower():
#             return False

#     # Match skills if provided (subset check)
#     if "skills" in job_seeker_input:
#         seeker_skills = set(job_seeker_input["skills"])
#         job_skills = set(job["skills"])
#         if not seeker_skills.issubset(job_skills):
#             return False

#     # Match experience if provided
#     if "experience" in job_seeker_input:
#         try:
#             required_experience = list(map(int, job["experience"].split("-")))
#             input_experience = int(job_seeker_input["experience"])
#             if input_experience < required_experience[0] or input_experience > required_experience[1]:
#                 return False
#         except ValueError:
#             pass  # Ignore if experience format is inconsistent

#     return True

# @app.route('/job-seeker-match', methods=['POST'])
# def job_seeker_match():
#     """API route to match job seeker input with job postings."""
#     data = request.json
#     job_seeker_input = data.get('job_seeker_input')

#     # Validate input
#     if not job_seeker_input:
#         return jsonify({"error": "Job seeker input is required"}), 400

#     # Normalize input data
#     if "title" in job_seeker_input:
#         job_seeker_input["title"] = normalize_text(job_seeker_input["title"])
#     if "location" in job_seeker_input:
#         job_seeker_input["location"] = normalize_text(job_seeker_input["location"])
#     if "skills" in job_seeker_input:
#         job_seeker_input["skills"] = normalize_skills(job_seeker_input["skills"])

#     # Fetch job posts from MongoDB
#     job_posts = list(jobs_collection.find())
#     if not job_posts:
#         return jsonify({"error": "No job posts found in the database"}), 404

#     # Filter job postings based on input
#     matched_jobs = []
#     for job in job_posts:
#         # Normalize job fields
#         job["title"] = normalize_text(job["title"])
#         job["location"] = normalize_text(job["location"])
#         job["skills"] = normalize_skills(job["skills"])

#         # Match fields dynamically
#         if flexible_match(job_seeker_input, job):
#             matched_jobs.append({
#                 "title": job["title"],
#                 "department": job["department"],
#                 "location": job["location"],
#                 "description": job["description"],
#                 "experience": job["experience"],
#                 "skills": job["skills"],
#                 "jobType": job["jobType"],
#                 "postedBy": str(job["postedBy"]),
#                 "createdAt": str(job["createdAt"]),
#                 "updatedAt": str(job["updatedAt"])
#             })

#     if not matched_jobs:
#         return jsonify({"message": "No match found"})

#     return jsonify({"message": "Matches found", "matched_jobs": matched_jobs})

# # Run the server
# if __name__ == '__main__':
#     app.run(debug=True)




















# #  ======================================================single input search by Job seeker======================



# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# from sentence_transformers import SentenceTransformer, util  # Sentence-BERT
# # import numpy as np
# from  flask_cors import CORS

# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Replace with your frontend's URL
# # MongoDB connection
# client = MongoClient("mongodb+srv://babarhanif:N0Q7L7yXSITw9qbU@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project")
# db = client["fyp-project"]
# jobs_collection = db["jobposts"]

# # Load Sentence-BERT model
# model = SentenceTransformer('all-MiniLM-L6-v2')

# # Helper functions
# def normalize_text(text):
#     """Normalize text by converting to lowercase and stripping extra spaces."""
#     return text.lower().strip()

# def normalize_skills(skills):
#     """Normalize and sort skills for accurate comparison."""
#     return sorted([normalize_text(skill) for skill in skills])

# def title_similarity(title1, title2):
#     """Calculate similarity between two titles using Sentence-BERT."""
#     # Encode titles into embeddings
#     embedding1 = model.encode(title1, convert_to_tensor=True)
#     embedding2 = model.encode(title2, convert_to_tensor=True)
    
#     # Compute cosine similarity
#     similarity = util.pytorch_cos_sim(embedding1, embedding2)[0][0].item()
#     return similarity

# def flexible_match(job_seeker_input, job):
#     """Match job seeker input with a job posting based on provided fields."""
#     # Match title if provided
#     if "title" in job_seeker_input:
#         if title_similarity(job_seeker_input["title"], job["title"]) < 0.5:
#             return False

#     # Match location if provided
#     if "location" in job_seeker_input:
#         if normalize_text(job_seeker_input["location"]) not in normalize_text(job["location"]):
#             return False

#     # Match job type if provided
#     if "jobType" in job_seeker_input:
#         if job_seeker_input["jobType"].lower() != job["jobType"].lower():
#             return False

#     # Match skills if provided (subset check)
#     if "skills" in job_seeker_input:
#         seeker_skills = set(job_seeker_input["skills"])
#         job_skills = set(job["skills"])
#         if not seeker_skills.issubset(job_skills):
#             return False

#     # Match experience if provided
#     if "experience" in job_seeker_input:
#         try:
#             required_experience = list(map(int, job["experience"].split("-")))
#             input_experience = int(job_seeker_input["experience"])
#             if input_experience < required_experience[0] or input_experience > required_experience[1]:
#                 return False
#         except ValueError:
#             pass  # Ignore if experience format is inconsistent

#     return True

# @app.route('/job-seeker-match', methods=['POST'])
# def job_seeker_match():
#     """API route to match job seeker input with job postings."""
#     data = request.json
#     job_seeker_input = data.get('job_seeker_input')

#     # Validate input
#     if not job_seeker_input:
#         return jsonify({"error": "Job seeker input is required"}), 400

#     # Normalize input data
#     if "title" in job_seeker_input:
#         job_seeker_input["title"] = normalize_text(job_seeker_input["title"])
#     if "location" in job_seeker_input:
#         job_seeker_input["location"] = normalize_text(job_seeker_input["location"])
#     if "skills" in job_seeker_input:
#         job_seeker_input["skills"] = normalize_skills(job_seeker_input["skills"])

#     # Fetch job posts from MongoDB
#     job_posts = list(jobs_collection.find())
#     if not job_posts:
#         return jsonify({"error": "No job posts found in the database"}), 404

#     # Filter job postings based on input
#     matched_jobs = []
#     for job in job_posts:
#         # Normalize job fields
#         job["title"] = normalize_text(job["title"])
#         job["location"] = normalize_text(job["location"])
#         job["skills"] = normalize_skills(job["skills"])

#         # Match fields dynamically
#         if flexible_match(job_seeker_input, job):
#             matched_jobs.append({
#                 "title": job["title"],
#                 "department": job["department"],
#                 "location": job["location"],
#                 "description": job["description"],
#                 "experience": job["experience"],
#                 "skills": job["skills"],
#                 "jobType": job["jobType"],
#                 "postedBy": str(job["postedBy"]),
#                 "createdAt": str(job["createdAt"]),
#                 "updatedAt": str(job["updatedAt"])
#             })

#     if not matched_jobs:
#         return jsonify({"message": "No match found"})

#     return jsonify({"message": "Matches found", "matched_jobs": matched_jobs})

# # Run the server
# if __name__ == '__main__':
#     app.run(debug=True)

# # ======================================================single input search by Job seeker======================











# ======================================================single input search by Recruiter======================



# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# from sentence_transformers import SentenceTransformer, util
# from jsonschema import validate, ValidationError
# import re

# from  flask_cors import CORS
 
# app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Replace with your frontend's URL

# # MongoDB connection (REPLACE WITH YOUR ACTUAL CONNECTION STRING)
# client = MongoClient("mongodb+srv://babarhanif:N0Q7L7yXSITw9qbU@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project")
# db = client["fyp-project"]
# candidates_collection = db["candidates"]

# # Load Sentence-BERT model for skill matching
# model = SentenceTransformer('all-MiniLM-L6-v2')

# # Helper functions 
# def normalize_text(text):
#     if isinstance(text, (int, float)):
#         text = str(text)
#     return text.lower().strip()

# def normalize_skills(skills):
#     return sorted([normalize_text(skill) for skill in skills])

# def extract_numeric_experience(exp):
#     numbers = re.findall(r'\d+', exp)
#     return [int(n) for n in numbers] if numbers else []

# @app.route('/recruiter-search', methods=['POST'])
# def recruiter_search():
#     data = request.json
#     recruiter_input = data.get('recruiter_input', {})

#     if not any(recruiter_input.values()):
#         return jsonify({"error": "At least one field must be provided"}), 400

#     # Schema validation
#     recruiter_schema = {
#         "type": "object",
#         "properties": {
#             "skills": {"type": "array", "items": {"type": "string"}},
#             "location": {"type": "object", "properties": {
#                 "city": {"type": "string"},
#                 "country": {"type": "string"},
#                 "province": {"type": "string"}
#             }},
#             "experience": {"type": "string"},
#             "position": {"type": "string"}
#         },
#         "required": []
#     }

#     try:
#         validate(instance=recruiter_input, schema=recruiter_schema)
#     except ValidationError as e:
#         return jsonify({"error": "Invalid input", "details": e.message}), 400

#     if "skills" in recruiter_input:
#         recruiter_input["skills"] = normalize_skills(recruiter_input["skills"])
#     if "location" in recruiter_input:
#         for key in recruiter_input["location"]:
#             recruiter_input["location"][key] = normalize_text(recruiter_input["location"][key])
#     if "position" in recruiter_input:
#         recruiter_input["position"] = normalize_text(recruiter_input["position"])
#     if "experience" in recruiter_input:
#         recruiter_input["experience"] = normalize_text(recruiter_input["experience"])

#     query = {}
#     if "location" in recruiter_input:
#         for key, value in recruiter_input["location"].items():
#             query[f"location.{key}"] = {"$regex": value, "$options": "i"}
#     if "position" in recruiter_input:
#         query["position"] = {"$regex": recruiter_input["position"], "$options": "i"}

#     try:
#         candidates = list(candidates_collection.find(query))
#     except Exception as e:
#         return jsonify({"error": "Database error", "details": str(e)}), 500

#     matched_candidates = []
#     for candidate in candidates:
#         candidate["skills"] = normalize_skills(candidate.get("skills", []))
#         candidate["position"] = normalize_text(candidate.get("position", ""))
#         candidate["experience"] = normalize_text(candidate.get("experience", ""))
#         if "location" in candidate:
#             for key in candidate["location"]:
#                 candidate["location"][key] = normalize_text(candidate["location"][key])

#         recruiter_exp = recruiter_input.get("experience", "")
#         recruiter_exp_numbers = extract_numeric_experience(recruiter_exp)
#         candidate_exp_numbers = extract_numeric_experience(candidate["experience"])
#         if recruiter_exp and recruiter_exp_numbers:
#             if not any(num in candidate_exp_numbers for num in recruiter_exp_numbers):
#                 continue

#         if "skills" in recruiter_input and recruiter_input["skills"]:
#             recruiter_skills_text = " ".join(recruiter_input["skills"])
#             candidate_skills_text = " ".join(candidate["skills"])
#             if recruiter_skills_text and candidate_skills_text:
#                 recruiter_embedding = model.encode(recruiter_skills_text, convert_to_tensor=True)
#                 candidate_embedding = model.encode(candidate_skills_text, convert_to_tensor=True)
#                 similarity_score = util.pytorch_cos_sim(recruiter_embedding, candidate_embedding).item()
#                 if similarity_score < 0.7:
#                     continue
#             else:
#                 continue

#         # Position Matching using Sentence-BERT
#         if "position" in recruiter_input and recruiter_input["position"]:
#             recruiter_position_embedding = model.encode(recruiter_input["position"], convert_to_tensor=True)
#             candidate_position_embedding = model.encode(candidate["position"], convert_to_tensor=True)
#             position_similarity = util.pytorch_cos_sim(recruiter_position_embedding, candidate_position_embedding).item()
#             if position_similarity < 0.7:
#                 continue

#         matched_candidates.append({
#             "_id": str(candidate["_id"]),
#             "userId": str(candidate.get("userId")),
#             "skills": candidate.get("skills"),
#             "location": candidate.get("location"),
#             "experience": candidate.get("experience"),
#             "position": candidate.get("position"),
#         })

#     if not matched_candidates:
#         return jsonify({"message": "No match found"})

#     return jsonify({"message": "Matches found", "matched_candidates": matched_candidates})

# if __name__ == '__main__':
#     app.run(debug=True)








# ======================================================single input search by Recruiter======================













# ================================================New File structure==========================================

from flask import Flask
from flask_cors import CORS
from routes.job_seeker import job_seeker_blueprint
from routes.recruiter import recruiter_blueprint
from routes.resume_analyser import resume_bp
from utils.vector_db import title_idx, skill_idx, title_ids, skill_ids
from listener import listen_to_changes
from dotenv import load_dotenv
load_dotenv()   # this reads the .env file and sets environment variables

import threading

# from utils.vector_db import vector_db_blueprint   

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Expose indexes via app.config
app.config['TITLE_INDEX'] = title_idx
app.config['SKILL_INDEX'] = skill_idx
app.config['TITLE_IDS'] = title_ids
app.config['SKILL_IDS'] = skill_ids

# Register blueprints
app.register_blueprint(job_seeker_blueprint)
app.register_blueprint(recruiter_blueprint)
app.register_blueprint(resume_bp,            url_prefix='/api') 
# app.register_blueprint(vector_db_blueprint)

# if __name__ == '__main__':
#     listener_thread = threading.Thread(target=listen_to_changes, daemon=True)
#     listener_thread.start()
#     app.run(debug=True, use_reloader=False)        

if __name__ == '__main__':
    # start watching both collections in background threads
    listen_to_changes()

    # now launch Flask (no reloader so only one copy of the listener runs)
    app.run(debug=True, use_reloader=False)
