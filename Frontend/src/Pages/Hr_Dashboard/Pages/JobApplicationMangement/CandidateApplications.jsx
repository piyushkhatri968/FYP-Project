import React from "react";
import { FaUser, FaCheck, FaTimes } from "react-icons/fa";

const CandidateApplications = ({ candidates, onUpdateStatus }) => {
  const handleShortlist = (id) => {
    onUpdateStatus(id, "Shortlisted");
    alert("Candidate has been shortlisted!");
  };

  const handleReject = (id) => {
    onUpdateStatus(id, "Rejected");
    alert("Candidate has been rejected.");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold mb-6">All Candidate Applications</h3>

      <div className="space-y-4">
        {candidates
          .filter((candidate) => candidate.status === "Applied")
          .map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center justify-between p-4 bg-white rounded shadow-md"
            >
              <div className="flex items-center gap-4">
                <FaUser className="text-blue-500 text-2xl" />
                <div>
                  <h4 className="font-bold">{candidate.name}</h4>
                  <p className="text-gray-600">Position: {candidate.position}</p>
                  <p className="text-gray-600">Experience: {candidate.experience} years</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShortlist(candidate.id)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  <FaCheck className="inline mr-1" /> Shortlist
                </button>
                <button
                  onClick={() => handleReject(candidate.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <FaTimes className="inline mr-1" /> Reject
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CandidateApplications;
