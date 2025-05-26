import os
import tempfile
import fitz  # PyMuPDF
import json
import requests
from flask import Blueprint, request, jsonify

resume_bp = Blueprint('resume_analyser', __name__)

def extract_text_from_pdf(file_path: str) -> str:
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def query_local_llm(prompt: str) -> str:
    """
    Query Mistral 7B running on Ollama (http://localhost:11434).
    """
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(url, json=payload)
    response.raise_for_status()

    data = response.json()
    return data["response"]

@resume_bp.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files:
        return jsonify({"error": "No resume uploaded"}), 400

    resume_file = request.files['resume']

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        resume_path = tmp.name
        resume_file.save(resume_path)

    try:
        resume_text = extract_text_from_pdf(resume_path)

        prompt = f"""
        Extract structured resume data from the text below. Respond in JSON format like:
        {{
            "basic_info": {{
                "name": "",
                "email": "",
                "phone": "",
                "location": ""
            }},
            "professional_info": {{
                "position": "",
                "experience": "",
                "skills": []
            }},
            "evaluation": {{
                "pros": [],
                "cons": [],
                "suggestions": []
            }}
        }}

        Resume Text:
        {resume_text}
        """

        llm_response = query_local_llm(prompt)

        # Try to extract JSON from response
        start = llm_response.find('{')
        end = llm_response.rfind('}') + 1
        json_data = json.loads(llm_response[start:end])

        return jsonify(json_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        os.remove(resume_path)
