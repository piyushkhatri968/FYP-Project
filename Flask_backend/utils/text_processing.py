from sentence_transformers import SentenceTransformer, util

# Load Sentence-BERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

def normalize_text(text):
    return text.lower().strip()

def normalize_skills(skills):
    return sorted([normalize_text(skill) for skill in skills])

def title_similarity(title1, title2):
    """Calculates similarity between two job titles using Sentence-BERT."""
    embedding1 = model.encode(title1, convert_to_tensor=True)
    embedding2 = model.encode(title2, convert_to_tensor=True)
    return util.pytorch_cos_sim(embedding1, embedding2)[0][0].item()

def skill_similarity(recruiter_skills, candidate_skills):
    """Calculates similarity between skill sets and returns a score."""
    if not recruiter_skills or not candidate_skills:
        return 0  # No match if one of the lists is empty

    recruiter_embedding = model.encode(recruiter_skills, convert_to_tensor=True)
    candidate_embedding = model.encode(candidate_skills, convert_to_tensor=True)

    similarity_matrix = util.pytorch_cos_sim(recruiter_embedding, candidate_embedding)
    max_similarities = similarity_matrix.max(dim=1).values  # Get max match per recruiter skill

    return max_similarities.mean().item()  # Return average similarity score
