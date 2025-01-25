import React, { useState } from "react";
import axios from "axios";

const InterviewScheduling = ({ candidate, closeModal,addInterview }) => {
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [interviewMode, setInterviewMode] = useState(""); // In-person or Virtual
  const [location, setLocation] = useState(""); // Location for in-person
  const [interviewers, setInterviewers] = useState(""); // Comma-separated list of interviewers
  const [jobComments, setJobComments] = useState(""); // Optional comments
  const [candidateConfirmation, setCandidateConfirmation] = useState(false); // Confirmation checkbox
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScheduleInterview = async () => {
    if (!interviewDate || !interviewTime || !interviewType || !interviewMode || !candidateConfirmation) {
      setError("Please fill in all required fields and confirm the interview.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/application/candidate/interview-schedule", {
        userId: candidate?.userId?.userId,
        interviewDate,
        interviewTime,
        interviewType,
        interviewMode,
        location: interviewMode === "In-person" ? location : null,
        interviewers: interviewers.split(",").map((interviewer) => interviewer.trim()),
        jobComments,
        candidateConfirmation,
      });

      // addInterview({
      //   name: candidate.userId?.userId?.name || "Unknown Candidate",
      //   date: new Date(interviewDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      //   time: interviewTime,
      // });
      // console.log("id",candidate?.userId?._id)

      alert("Interview scheduled successfully!");

      closeModal();
    } catch (err) {
      console.error("Error scheduling interview:", err);
      setError("There was an error scheduling the interview.");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h4 className="text-lg font-semibold mb-2">Schedule Interview</h4>
        
        <p className="text-sm mb-4">For Candidate: {candidate.userId?.userId?.name}</p>
             
        <div className="space-y-3">
          
          {/* Interview Date */}
          <div>
            <label className="block text-sm font-medium">Interview Date</label>
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>

          {/* Interview Time */}
          <div>
            <label className="block text-sm font-medium">Interview Time</label>
            <input
              type="time"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>

          {/* Interview Type */}
          <div>
            <label className="block text-sm font-medium">Interview Type</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Select Interview Type</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Managerial">Managerial</option>
            </select>
          </div>

          {/* Interview Mode */}
          <div>
            <label className="block text-sm font-medium">Interview Mode</label>
            <select
              value={interviewMode}
              onChange={(e) => setInterviewMode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">Select Mode</option>
              <option value="In-person">In-person</option>
              <option value="Virtual">Virtual</option>
            </select>
          </div>

          {/* Location (only if in-person) */}
          {interviewMode === "In-person" && (
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Interview Location"
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
          )}

          {/* Interviewers */}
          <div>
            <label className="block text-sm font-medium">Interviewers</label>
            <input
              type="text"
              value={interviewers}
              onChange={(e) => setInterviewers(e.target.value)}
              placeholder="Comma separated list of interviewers"
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>

          {/* Job-related Comments */}
          <div>
            <label className="block text-sm font-medium">Comments</label>
            <textarea
              value={jobComments}
              onChange={(e) => setJobComments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Any additional comments"
            />
          </div>

          {/* Candidate Confirmation */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={candidateConfirmation}
              onChange={() => setCandidateConfirmation(!candidateConfirmation)}
              className="mr-2"
            />
            <label className="text-sm">I confirm my availability for the interview.</label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={closeModal}
            className="px-3 py-2 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleScheduleInterview}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduling;
