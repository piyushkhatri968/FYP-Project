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
         Analyze this resume and return ONLY a JSON object with the following structure:

        {{
            "basic_info": {{
                "name": "Properly formatted name (Title Case)",
                "email": "Primary contact email",
                "phone": "Digits only phone number",
                "location": "Properly formatted location"
            }},
            "professional_info": {{
                "position": "Standardized position title",
                "experience": "Whole number years only",
                "skills": [
                    "Separated skills (no combined entries)",
                    "Standardized formatting",
                    "Only from Skills section"
                ]
            }},
            "evaluation": {{
                "pros": [
                    "Encouraging strength statements",
                    "Focus on technical capabilities",
                    "Highlight relevant achievements"
                ],
                "cons": [
                    "Constructive improvement areas",
                    "Specific skill gaps to address",
                    "Presented as opportunities"
                ],
                "suggestions": [
                    "Actionable recommendations",
                    "Specific skills to develop",
                    "Project ideas to consider",
                    "Ways to showcase work better"
                ]
            }}
        }}

        STRICT PROCESSING RULES:
        1. Name and Location:
        - Convert to Title Case (e.g. "Piyush Khatri")
        - Remove extra spaces and ALL CAPS

        2. Position Title:
        - Standardize formatting (e.g. "Mern Stack Developer")
        - Remove special characters and ALL CAPS

        3. Skills:
        - Split combined entries (e.g. "HTML/CSS" → "HTML", "CSS")
        - Remove skill levels or percentages
        - Standardize naming (e.g. "React.js" not "REACT JS")

        4. Experience:
        - Must be whole number only
        - Round down if necessary
        - "0" for less than 1 year

        5. Evaluation Tone:
        - Pros: 3 maximum, focus on technical strengths
        - Cons: 3 maximum, specific to technical gaps
        - Suggestions: 5 maximum, highly actionable

        6. Formatting:
        - No duplicate fields
        - No empty fields (use empty strings)
        - No combined skill entries

        RESUME TEXT:
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
