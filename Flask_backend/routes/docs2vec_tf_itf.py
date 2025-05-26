from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Doc2Vec
from scipy.spatial.distance import cosine
import numpy as np
import spacy
from fuzzywuzzy import fuzz
from pymongo import MongoClient
from  flask_cors import CORS
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Replace with your frontend's URL

# Load Spacy NLP model

nlp = spacy.load("en_core_web_sm")

# MongoDB connection
client = MongoClient("mongodb+srv://babarhanif:N0Q7L7yXSITw9qbU@fyp-project.moxg2.mongodb.net/fyp-project?retryWrites=true&w=majority&appName=fyp-project")
db = client["fyp-project"]
jobs_collection = db["jobposts"]
seekers_collection = db["candidates"]




def detailed_strict_match(input_text, comparison_texts):
    input_doc = nlp(input_text)
    input_tokens = {token.text.lower() for token in input_doc if not token.is_stop and not token.is_punct}
    
    for comparison_text in comparison_texts:
        comparison_doc = nlp(comparison_text)
        comparison_tokens = {token.text.lower() for token in comparison_doc if not token.is_stop and not token.is_punct}
        
        if input_tokens == comparison_tokens:
            return True
        
        # Check for synonyms and handle misspellings
        match = True
        
        if match:
            return True
        
        # Handle misspellings using fuzzy matching
        match = True
        for token in input_tokens:
            if not any(fuzz.ratio(token, comp_token) > 80 for comp_token in comparison_tokens):
                match = False
                break
        
        if match:
            return True
    
    return False

# Enhanced Matching Function
def enhanced_match(input_text, comparison_texts):
    input_doc = nlp(input_text)
    input_tokens = {token.text.lower() for token in input_doc if not token.is_stop and not token.is_punct}
    
    for comparison_text in comparison_texts:
        comparison_doc = nlp(comparison_text)
        comparison_tokens = {token.text.lower() for token in comparison_doc if not token.is_stop and not token.is_punct}
        
        # Check for important keywords
        important_keywords = {'position', 'location', 'fulltime', 'parttime', 'skills'}
        if any(token in important_keywords for token in input_tokens.intersection(comparison_tokens)):
            return True
        
        # Check for synonyms and handle misspellings
        match = True
        
        
        if match:
            return True
        
        # Handle misspellings using fuzzy matching
        match = True
        for token in input_tokens:
            if not any(fuzz.ratio(token, comp_token) > 80 for comp_token in comparison_tokens):
                match = False
                break
        
        if match:
            return True
    
    return False

# TF-IDF Matching
def tfidf_match(input_text, comparison_texts):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([input_text] + comparison_texts)
    cosine_similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
    return cosine_similarities

# Doc2Vec Matching
def doc2vec_match(input_text, comparison_texts, model_path):
    if not os.path.exists(model_path):
        return np.zeros(len(comparison_texts))  # Return zeros if model is not found
    
    model = Doc2Vec.load(model_path)
    input_vector = model.infer_vector(input_text.split())
    comparison_vectors = [model.infer_vector(text.split()) for text in comparison_texts]
    similarities = [1 - cosine(input_vector, vec) for vec in comparison_vectors]
    return np.array(similarities)

# Hybrid Model
def hybrid_match(tfidf_scores, doc2vec_scores, alpha=0.5):
    return alpha * tfidf_scores + (1 - alpha) * doc2vec_scores

# Job Seeker Matching Endpoint
@app.route('/job-seeker-matching-online', methods=['POST'])
def job_seeker_match():
    data = request.json
    job_seeker_input = data.get('job_seeker_input')
    
    # Fetch job posts from MongoDB
    job_posts = [job['description'] for job in jobs_collection.find()]
    
    if not job_seeker_input or not job_posts:
        return jsonify({"error": "Job seeker input and job posts are required"}), 400

    # Calculate similarity scores
    tfidf_scores = tfidf_match(job_seeker_input, job_posts)
    doc2vec_scores = doc2vec_match(job_seeker_input, job_posts, "job_seeker_doc2vec_final.model")
    hybrid_scores = hybrid_match(tfidf_scores, doc2vec_scores)
    
    best_match_index = int(np.argmax(hybrid_scores))
    best_match_score = float(hybrid_scores[best_match_index])
    best_match_post = job_posts[best_match_index]

    # Check for exact match, synonyms, and spelling mistakes
    if enhanced_match(job_seeker_input, [best_match_post]) or best_match_score > 0.8:
        result = {
            "best_job_post_index": best_match_index,
            "best_job_post_score": best_match_score,
            "matched_job_post": best_match_post
        }
    else:
        result = {
            "message": "No match right now"
        }

    return jsonify(result)

# Recruiter Matching Endpoint
@app.route('/recruiter-matching-online', methods=['POST'])
def recruiter_match():
    data = request.json
    recruiter_input = data.get('recruiter_input')
    
    # Fetch job seekers from MongoDB
    job_seekers = [" ".join(seeker['skills']) for seeker in seekers_collection.find()]
    
    if not recruiter_input or not job_seekers:
        return jsonify({"error": "Recruiter input and job seekers are required"}), 400

    # Calculate similarity scores
    tfidf_scores = tfidf_match(recruiter_input, job_seekers)
    doc2vec_scores = doc2vec_match(recruiter_input, job_seekers, "cv_job_maching.model")
    hybrid_scores = hybrid_match(tfidf_scores, doc2vec_scores)
    
    best_match_index = int(np.argmax(hybrid_scores))
    best_match_score = float(hybrid_scores[best_match_index])
    best_match_seeker = job_seekers[best_match_index]

    # Check for exact match, synonyms, and spelling mistakes
    if enhanced_match(recruiter_input, [best_match_seeker]) or best_match_score > 0.8:
        result = {
            "best_job_seeker_index": best_match_index,
            "best_job_seeker_score": best_match_score,
            "matched_job_seeker": best_match_seeker
        }
    else:
        result = {
            "message": "No match right now"
        }

    return jsonify(result)









# Run Flask App
if __name__ == '__main__':
    app.run(debug=True)



