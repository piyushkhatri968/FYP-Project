# import os
# import tempfile
# import fitz  # PyMuPDF
# import requests
# from flask import Blueprint, request, jsonify

# resume_bp = Blueprint('resume_analyser', __name__)

# # -------------------------------------------------------------
# # DEBUGGING & DIAGNOSTICS
# # -------------------------------------------------------------
# # To troubleshoot 404 errors against Gemini API:
# # 1. Verify the API endpoint URL is correct and matches the docs.
# #    - Log the URL before calling.
# # 2. Check the API key and project permissions in Google Cloud Console.
# #    - Ensure 'Generative Language API' is enabled for the project tied to the key.
# # 3. Inspect the full HTTP response for clues.
# #    - Log status_code and response.text.
# # 4. Test with curl/Postman separately:
# #    curl -X POST "<endpoint>?key=YOUR_KEY" -H "Content-Type:application/json" -d '{...}'
# # -------------------------------------------------------------

# def read_pdf(file_path: str) -> str:
#     """Extract all text from the PDF at file_path."""
#     txt = ""
#     doc = fitz.open(file_path)
#     for page in doc:
#         txt += page.get_text()
#     return txt

# # Using Google Gemini API (v1 endpoint) with detailed logging

# def call_gemini_api(prompt: str) -> str:
#     """
#     Send the prompt to Google Gemini API and return the AI's reply.
#     Includes debug logging of URL, status, and response body for investigation.
#     Requires GEMINI_API_KEY in environment.
#     """
#     api_key = os.getenv("GEMINI_API_KEY")
#     if not api_key:
#         raise RuntimeError("GEMINI_API_KEY not set in environment")

#     # Construct the request URL
#     url = (
#        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
#         f"?key={api_key}"
#     )
#     # DEBUG: print URL for verification
#     print(f"[DEBUG] Calling Gemini endpoint: {url}")

#     headers = {"Content-Type": "application/json"}
#     body = {
#         "prompt": {"text": prompt},
#         "temperature": 0.7,
#         "maxOutputTokens": 512
#     }

#     response = requests.post(url, headers=headers, json=body)
#     # DEBUG: log status code and body
#     print(f"[DEBUG] Gemini response status: {response.status_code}")
#     print(f"[DEBUG] Gemini response text: {response.text}")

#     # Raise exception for non-200 to catch errors
#     response.raise_for_status()
#     data = response.json()

#     # Extract content from response (adjust fields as per actual API)
#     if 'candidates' in data:
#         # Gemini v1 sometimes returns 'candidates' list
#         return data['candidates'][0].get('content') or data['candidates'][0].get('output', '')
#     # fallback for alternative field
#     return data.get('output', '')

# @resume_bp.route('/analyze-resume', methods=['POST'])
# def analyze_resume():
#     """
#     POST /api/analyze-resume
#     Expects form-data with key 'resume' (a PDF file).
#     Returns JSON { "analysis": "<AI feedback>" }.
#     """
#     if 'resume' not in request.files:
#         return jsonify({"error": "No resume file uploaded"}), 400

#     uploaded = request.files['resume']

#     # Use tempfile to avoid OS-specific paths
#     with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
#         tmp_path = tmp.name
#         uploaded.save(tmp_path)

#     try:
#         # Extract text
#         text = read_pdf(tmp_path)

#         # Build prompt
#         prompt = f"""
# You are a professional resume reviewer. Analyze this resume text:
# - Look for professional appearance
# - Check formatting neatness
# - Identify spelling and grammar issues
# - Confirm presence of skills, education, experience
# - Note measurable achievements (with numbers)

# Then give 3 concrete improvement suggestions:
# 1. Skills to add
# 2. Formatting tip
# 3. Career advice

# Resume:
# {text}
# """
#         # Call the LLM with diagnostics
#         analysis = call_gemini_api(prompt)
#     except Exception as e:
#         # Return error details
#         return jsonify({"error": str(e)}), 500
#     finally:
#         # Clean up the temporary file
#         try:
#             os.remove(tmp_path)
#         except OSError:
#             pass

#     return jsonify({"analysis": analysis}), 200
import os
import tempfile
import fitz  # PyMuPDF
import requests
import json
import re
from flask import Blueprint, request, jsonify

resume_bp = Blueprint('resume_analyser', __name__)

def read_pdf(file_path: str) -> str:
    """Extract all text from the PDF at file_path."""
    txt = ""
    doc = fitz.open(file_path)
    for page in doc:
        txt += page.get_text()
    return txt

def call_gemini_api(prompt: str) -> str:
    """
    Send the prompt to Google Gemini API and return the AI's reply.
    Requires GEMINI_API_KEY in environment.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set in environment")

    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent"
    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.1,  # Very low temperature for precise responses
            "maxOutputTokens": 800
        }
    }

    response = requests.post(url, headers=headers, json=body, params={"key": api_key})
    response.raise_for_status()
    data = response.json()

    if "candidates" in data and data["candidates"]:
        for candidate in data["candidates"]:
            if "content" in candidate and "parts" in candidate["content"]:
                for part in candidate["content"]["parts"]:
                    if "text" in part:
                        return part["text"]
    return ""

def clean_experience(exp_str: str) -> str:
    """Clean and validate experience field"""
    if not exp_str:
        return ""
    
    # Extract first number found
    match = re.search(r'\d+', exp_str)
    if match:
        return match.group(0)
    return ""

@resume_bp.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    """
    POST /api/analyze-resume
    Expects form-data with key 'resume' (a PDF file).
    Returns JSON with extracted resume data in specific format.
    """
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    uploaded = request.files['resume']

    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp_path = tmp.name
        uploaded.save(tmp_path)

    try:
        # Extract text
        text = read_pdf(tmp_path)

        # Build structured extraction prompt
        prompt = f"""
        Analyze this resume text and extract information strictly following these rules:

        OUTPUT FORMAT (ONLY RETURN THIS JSON STRUCTURE):
        {{
            "name": "Full name from header",
            "email": "Primary contact email",
            "position": "Current/most recent job title",
            "phone": "Primary phone number",
            "age": "Calculated age if birth date found, else empty",
            "location": "Current city/country",
            "experience": "Years of experience in current position (number only)",
            "skills": ["list", "of", "technical", "skills"]
        }}

        EXTRACTION RULES:
        1. NAME:
           - Look at resume header
           - Use full name format (First Last)
           - Exclude titles like 'Mr.', 'Dr.'

        2. EMAIL:
           - Extract first valid email found
           - Must match standard email format

        3. POSITION:
           - Current or most recent job title
           - Standardize capitalization (e.g., 'Software Engineer' not 'SOFTWARE ENGINEER')
           - Exclude company names

        4. PHONE:
           - First valid phone number found
           - Format as digits only (no spaces/dashes)

        5. AGE:
           - Calculate only if birth year is explicitly mentioned
           - Formula: (Current year - birth year)
           - If uncertain, leave empty

        6. LOCATION:
           - Current city/country from contact info
           - Not work location or address

        7. EXPERIENCE:
           - Years in current/most recent position only
           - Must be a whole number (e.g., '3' not '3.5')
           - Calculate from work history if needed
           - If multiple positions, use current one only

        8. SKILLS:
           - Only technical/hard skills
           - Look for 'Skills' section or similar
           - Standardize naming (e.g., 'JavaScript' not 'JS')
           - Exclude soft skills like 'Teamwork'
           - Minimum 3 skills, maximum 15

        STRICT INSTRUCTIONS:
        - Return ONLY the JSON object
        - No explanations or additional text
        - Empty strings for missing data
        - Empty array if no skills found
        - All fields must be included

        RESUME TEXT:
        {text}
        """

        # Call the LLM
        response_text = call_gemini_api(prompt)
        
        # Clean the response
        try:
            # Extract JSON portion
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            json_str = response_text[json_start:json_end]
            
            # Parse and validate
            extracted_data = json.loads(json_str)
            
            # Required fields with defaults
            required_fields = {
                "name": "",
                "email": "",
                "position": "",
                "phone": "",
                "age": "",
                "location": "",
                "experience": "",
                "skills": []
            }
            
            # Validate and clean each field
            for field in required_fields:
                if field not in extracted_data:
                    extracted_data[field] = required_fields[field]
                
                # Special cleaning for certain fields
                if field == "skills":
                    if not isinstance(extracted_data[field], list):
                        extracted_data[field] = []
                    # Remove empty skills and deduplicate
                    extracted_data[field] = list(set(
                        skill.strip() for skill in extracted_data[field] 
                        if skill and isinstance(skill, str)
                    ))[:15]  # Limit to 15 skills
                
                elif field == "experience":
                    extracted_data[field] = clean_experience(str(extracted_data[field]))
                
                elif field == "phone":
                    if extracted_data[field]:
                        # Keep only digits
                        extracted_data[field] = re.sub(r'\D', '', str(extracted_data[field]))
            
            return jsonify(extracted_data), 200
            
        except json.JSONDecodeError as e:
            return jsonify({
                "error": "Failed to parse response",
                "details": str(e),
                "raw_response": response_text
            }), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        try:
            os.remove(tmp_path)
        except OSError:
            pass