# from sentence_transformers import SentenceTransformer, util

# # Load Sentence-BERT model
# model = SentenceTransformer('all-mpnet-base-v2')

# def normalize_text(text):
#     return text.lower().strip()

# def normalize_skills(skills):
#     return sorted([normalize_text(skill) for skill in skills])

# def title_similarity(title1, title2):
#     """Calculates similarity between two job titles using Sentence-BERT."""
#     embedding1 = model.encode(title1, convert_to_tensor=True)
#     embedding2 = model.encode(title2, convert_to_tensor=True)
#     return util.pytorch_cos_sim(embedding1, embedding2)[0][0].item()

# def skill_similarity(recruiter_skills, candidate_skills):
#     """Calculates similarity between skill sets and returns a score."""
#     if not recruiter_skills or not candidate_skills:
#         return 0  # No match if one of the lists is empty

#     recruiter_embedding = model.encode(recruiter_skills, convert_to_tensor=True)
#     candidate_embedding = model.encode(candidate_skills, convert_to_tensor=True)

#     similarity_matrix = util.pytorch_cos_sim(recruiter_embedding, candidate_embedding)
#     max_similarities = similarity_matrix.max(dim=1).values  # Get max match per recruiter skill

#     return max_similarities.mean().item()  # Return average similarity score








from sentence_transformers import SentenceTransformer, util


# Load MPNet model
model = SentenceTransformer('all-mpnet-base-v2')

def normalize_text(text):
    """Make text lowercase and remove extra spaces."""
    return text.lower().strip()
        
def normalize_skills(skills):
    """Normalize a list of skills."""
    return sorted([normalize_text(skill) for skill in skills])

def title_similarity(query_title, candidate_titles):
    """
    If exact match of query_title found among candidate_titles, return 1.0.
    Else use MPNet to calculate semantic similarity.
    """
    query_normalized = normalize_text(query_title)
    candidate_normalized_titles = [normalize_text(title) for title in candidate_titles]
    
    # Step 1: Exact match check
    if query_normalized in candidate_normalized_titles:
        return 1.0  # Exact match found, return directly
    
    # Step 2: Semantic similarity using MPNet
    query_vec = model.encode(query_title, convert_to_tensor=True)
    candidate_vecs = model.encode(candidate_titles, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(query_vec, candidate_vecs)[0]
    
    best_similarity = similarities.max().item()
    return best_similarity

def skill_similarity(recruiter_skills, candidate_skills):
    """
    Calculates average maximum similarity between recruiter and candidate skills.
    """
    if not recruiter_skills or not candidate_skills:
        return 0.0

    recruiter_embedding = model.encode(recruiter_skills, convert_to_tensor=True)
    candidate_embedding = model.encode(candidate_skills, convert_to_tensor=True)

    similarity_matrix = util.pytorch_cos_sim(recruiter_embedding, candidate_embedding)
    max_similarities = similarity_matrix.max(dim=1).values  # Max match for each recruiter skill

    return max_similarities.mean().item()
