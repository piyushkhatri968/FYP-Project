
import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Your Flask server URL

export const getMatchedCandidates = async (recruiterInput) => {
  const response = await axios.post(`${API_BASE_URL}/recruiter-search`, {
    recruiter_input: recruiterInput,
  });
  return response.data;
};
