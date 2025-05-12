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
from flask import Blueprint, request, jsonify

resume_bp = Blueprint('resume_analyser', __name__)

def read_pdf(file_path: str) -> str:
    """Extract all text from the PDF at file_path."""
    txt = ""
    doc = fitz.open(file_path)
    for page in doc:
        txt += page.get_text()
    return txt

# Using Google Gemini Pro API
def call_gemini_api(prompt: str) -> str:
    """
    Send the prompt to Google Gemini API and return the AI's reply.
    Requires GEMINI_API_KEY in environment.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY not set in environment")

    # Update to use Gemini 2.0 Flash model
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 512
        }
    }

    response = requests.post(url, headers=headers, json=body, params={"key": api_key})
    response.raise_for_status()
    data = response.json()

    # Extract content from Gemini response
    if "candidates" in data and data["candidates"]:
        for candidate in data["candidates"]:
            if "content" in candidate and "parts" in candidate["content"]:
                for part in candidate["content"]["parts"]:
                    if "text" in part:
                        return part["text"]
    return ""

@resume_bp.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    """
    POST /api/analyze-resume
    Expects form-data with key 'resume' (a PDF file).
    Returns JSON { "analysis": "<AI feedback>" }.
    """
    if 'resume' not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    uploaded = request.files['resume']

    # Use tempfile to avoid OS-specific paths
    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp_path = tmp.name
        uploaded.save(tmp_path)

    try:
        # Extract text
        text = read_pdf(tmp_path)

        # Build prompt
        prompt = f"""
        You are a professional resume reviewer. Analyze this resume text:
        - Look for professional appearance
        - Check formatting neatness
        - Identify spelling and grammar issues
        - Confirm presence of skills, education, experience
        - Note measurable achievements (with numbers)

        Then give 3 concrete improvement suggestions:
        1. Skills to add
        2. Formatting tip
        3. Career advice

        Resume:
        {text}
    """
        # Call the LLM
        analysis = call_gemini_api(prompt)
    except Exception as e:
        # Return error details
        return jsonify({"error": str(e)}), 500
    finally:
        # Clean up the temporary file
        try:
            os.remove(tmp_path)
        except OSError:
            pass

    return jsonify({"analysis": analysis}), 200