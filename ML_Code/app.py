from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import Doc2Vec
from scipy.spatial.distance import cosine
import numpy as np
from fuzzywuzzy import fuzz
import spacy
from nltk.corpus import wordnet

# Initialize Flask app
app = Flask(__name__)

# Load Spacy NLP model
nlp = spacy.load("en_core_web_sm")

# Helper Functions
def get_synonyms(word):
    synonyms = set()
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonyms.add(lemma.name())
    return synonyms

def detailed_strict_match(input_text, comparison_texts):
    input_doc = nlp(input_text)
    input_tokens = {token.text.lower() for token in input_doc if not token.is_stop and not token.is_punct}
    
    for comparison_text in comparison_texts:
        comparison_doc = nlp(comparison_text)
        comparison_tokens = {token.text.lower() for token in comparison_doc if not token.is_stop and not token.is_punct}
        
        if input_tokens == comparison_tokens:
            return True
        
        match = True
        for token in input_tokens:
            if token not in comparison_tokens and not get_synonyms(token).intersection(comparison_tokens):
                match = False
                break
        
        if match:
            return True
        
        match = True
        for token in input_tokens:
            if not any(fuzz.ratio(token, comp_token) > 80 for comp_token in comparison_tokens):
                match = False
                break
        
        if match:
            return True
    
    return False

def tfidf_match(input_text, comparison_texts):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([input_text] + comparison_texts)
    cosine_similarities = cosine_similarity(vectors[0:1], vectors[1:]).flatten()
    return cosine_similarities

def doc2vec_match(input_text, comparison_texts, model_path):
    model = Doc2Vec.load(model_path)
    input_vector = model.infer_vector(input_text.split())
    comparison_vectors = [model.infer_vector(text.split()) for text in comparison_texts]
    similarities = [1 - cosine(input_vector, vec) for vec in comparison_vectors]
    return np.array(similarities)

def hybrid_match(tfidf_scores, doc2vec_scores, alpha=0.5):
    return alpha * tfidf_scores + (1 - alpha) * doc2vec_scores

# API Endpoint for Job Seeker Matching
@app.route('/job-seeker-match', methods=['POST'])
def job_seeker_match():
    data = request.json
    job_seeker_input = data.get('job_seeker_input')
    job_posts = data.get('job_posts')
    model_path = "job_seeker_doc2vec_final.model"
    
    tfidf_scores = tfidf_match(job_seeker_input, job_posts)
    doc2vec_scores = doc2vec_match(job_seeker_input, job_posts, model_path)
    hybrid_scores = hybrid_match(tfidf_scores, doc2vec_scores)
    
    best_match_index = np.argmax(hybrid_scores)
    result = {
        "best_job_post_index": best_match_index,
        "best_job_post_score": hybrid_scores[best_match_index]
    }
    return jsonify(result)

# API Endpoint for Recruiter Matching
@app.route('/recruiter-match', methods=['POST'])
def recruiter_match():
    data = request.json
    recruiter_input = data.get('recruiter_input')
    job_seekers = data.get('job_seekers')
    model_path = "cv_job_maching.model"
    
    tfidf_scores = tfidf_match(recruiter_input, job_seekers)
    doc2vec_scores = doc2vec_match(recruiter_input, job_seekers, model_path)
    hybrid_scores = hybrid_match(tfidf_scores, doc2vec_scores)
    
    best_match_index = np.argmax(hybrid_scores)
    result = {
        "best_job_seeker_index": best_match_index,
        "best_job_seeker_score": hybrid_scores[best_match_index]
    }
    return jsonify(result)

# Run Flask App
if __name__ == '__main__':
    app.run(debug=True)
