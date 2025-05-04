
# from sentence_transformers import SentenceTransformer, util


# # Load MPNet model
# model = SentenceTransformer('all-mpnet-base-v2')

# def normalize_text(text):
#     """Make text lowercase and remove extra spaces."""
#     return text.lower().strip()
        
# def normalize_skills(skills):
#     """Normalize a list of skills."""
#     return sorted([normalize_text(skill) for skill in skills])

# def title_similarity(query_title, candidate_titles):
#     """
#     If exact match of query_title found among candidate_titles, return 1.0.
#     Else use MPNet to calculate semantic similarity.
#     """
#     query_normalized = normalize_text(query_title)
#     candidate_normalized_titles = [normalize_text(title) for title in candidate_titles]
    
#     # Step 1: Exact match check
#     if query_normalized in candidate_normalized_titles:
#         return 1.0  # Exact match found, return directly
    
#     # Step 2: Semantic similarity using MPNet
#     query_vec = model.encode(query_title, convert_to_tensor=True)
#     candidate_vecs = model.encode(candidate_titles, convert_to_tensor=True)
#     similarities = util.pytorch_cos_sim(query_vec, candidate_vecs)[0]
    
#     best_similarity = similarities.max().item()
#     return best_similarity

# def skill_similarity(recruiter_skills, candidate_skills):
#     """
#     Calculates average maximum similarity between recruiter and candidate skills.
#     """
#     if not recruiter_skills or not candidate_skills:
#         return 0.0

#     recruiter_embedding = model.encode(recruiter_skills, convert_to_tensor=True)
#     candidate_embedding = model.encode(candidate_skills, convert_to_tensor=True)
    
#     similarity_matrix = util.pytorch_cos_sim(recruiter_embedding, candidate_embedding)
#     max_similarities = similarity_matrix.max(dim=1).values  # Max match for each recruiter skill

#     return max_similarities.mean().item()



from sentence_transformers import SentenceTransformer
from functools import lru_cache

# Model will be loaded lazily
model = None

def get_model():
    """Load model lazily on first use."""
    global model
    if model is None:
        model = SentenceTransformer('all-MiniLM-L6-v2')
    return model

@lru_cache(maxsize=1000)
def encode_text(text):
    """Encode text with caching to avoid repeated computations."""
    return get_model().encode(text, convert_to_tensor=False).astype('float32')

def normalize_text(text):
    """Make text lowercase and remove extra spaces."""
    return text.lower().strip()

def normalize_skills(skills):
    """Normalize a list of skills."""
    return sorted([normalize_text(skill) for skill in skills])