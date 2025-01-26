import React, { useState } from "react";
import axios from "axios";
import emailjs from "emailjs-com";

const InterviewScheduling = ({ candidate, closeModal, addInterview }) => {
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewType, setInterviewType] = useState("");
  const [interviewMode, setInterviewMode] = useState("");
  const [location, setLocation] = useState("");
  const [interviewers, setInterviewers] = useState("");
  const [jobComments, setJobComments] = useState("");
  const [candidateConfirmation, setCandidateConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // EmailJS Configuration (replace with your actual IDs)
  const SERVICE_ID = "service_i93fjbn";
  const TEMPLATE_ID = "template_gdu1dt5";
  const PUBLIC_KEY = "sg64VtTyStBeiRWML";

  const handleScheduleInterview = async () => {
    if (
      !interviewDate ||
      !interviewTime ||
      !interviewType ||
      !interviewMode ||
      !candidateConfirmation
    ) {
      setError("Please fill in all required fields and confirm the interview.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save interview schedule to the backend
      await axios.post(
        "http://localhost:8080/api/application/candidate/interview-schedule",
        {
          userId: candidate.userId?.userId,
          interviewDate,
          interviewTime,
          interviewType,
          interviewMode,
          location: interviewMode === "In-person" ? location : null,
          interviewers: interviewers
            .split(",")
            .map((interviewer) => interviewer.trim()),
          jobComments,
          candidateConfirmation,
        }
      );

      // Send email to the candidate using EmailJS
      const emailData = {
        user_email: candidate.userId?.userId?.email, // Candidate's email
        user_name: candidate.userId?.userId?.name, // Candidate's name
        user_position: candidate.userId?.position,
        interview_date: interviewDate,
        interview_time: interviewTime,
        interview_type: interviewType,
        interview_mode: interviewMode,
        location: interviewMode === "In-person" ? location : "N/A",
        interviewers: interviewers,
        comments: jobComments,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailData, PUBLIC_KEY);

      // Optionally update UI with new interview
      // if (addInterview) {
      //   addInterview({
      //     name: candidate.userId?.userId?.name || "Unknown Candidate",
      //     date: new Date(interviewDate).toLocaleDateString("en-US", {
      //       month: "short",
      //       day: "numeric",
      //       year: "numeric",
      //     }),
      //     time: interviewTime,
      //   });
      // }

      alert("Interview scheduled successfully! Email notification sent.");
      closeModal();
    } catch (err) {
      console.error("Error scheduling interview or sending email:", err);
      setError(
        "There was an error scheduling the interview or sending the email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h4 className="text-lg font-semibold mb-2">Schedule Interview</h4>
        <p className="text-sm mb-4">
          For Candidate: {candidate.userId?.userId?.name}
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Interview Date</label>
            <input
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Interview Time</label>
            <input
              type="time"
              value={interviewTime}
              onChange={(e) => setInterviewTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium">Comments</label>
            <textarea
              value={jobComments}
              onChange={(e) => setJobComments(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Any additional comments"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={candidateConfirmation}
              onChange={() => setCandidateConfirmation(!candidateConfirmation)}
              className="mr-2"
            />
            <label className="text-sm">
              I confirm my availability for the interview.
            </label>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

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
