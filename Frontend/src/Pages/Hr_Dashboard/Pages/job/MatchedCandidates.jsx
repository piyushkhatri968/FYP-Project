import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaUserTie, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const MatchedCandidatesPage = () => {
  const location = useLocation();
  // const matchedCandidates = location.state?.matchedCan || [];

  const { matchedCandidates = [], jobId } = location.state || {};
  
  console.log("For Job ID:", jobId);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log("For Job ID:", jobId);

  const handleInvite = async (candidateId) => {
    console.log("Current user", currentUser); // Debugging line

    const recruiterId =currentUser?._id || "" // Replace with actual HR/recruiter ID

    // const jobId = jobId; // Replace with actual Job ID

    console.log("Sending invite with:", { candidateId, jobId, recruiterId });


    try {
      const response = await fetch("http://localhost:8080/api/hr/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidateId, jobId, recruiterId }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        alert("Invite sent successfully!");
      } else {
        alert(data.message || "Failed to send invite");
      }
    } catch (err) {
      console.error("Error sending invite:",err);
      alert("Something went wrong!");
    }
  };

  if (matchedCandidates.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No matched candidates found.
        <br />
        <br />
        <Link
          to={"/hr/dashboard"}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"
        >
          Go to Dashboard
        </Link>
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Matched Candidates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchedCandidates.map((candidate, index) => {
          console.log("Candidate object:", candidate);
          const {   candidateId,userInfo, position, experience, location, skills, _id } = candidate;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-4">
                <img
                  src={userInfo.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{userInfo.name}</h2>
                  <p className="text-sm text-gray-500">@{userInfo.username}</p>
                  <div className="flex items-center gap-1 text-blue-600 text-sm mt-1">
                    <FaEnvelope /> <span>{userInfo.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-gray-700 space-y-2 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <FaUserTie className="text-blue-500" />
                  <span>
                    <strong>Position:</strong> {position}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" />
                  <span>
                    <strong>Experience:</strong> {experience} years
                  </span>
                </div>
                {location ? (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <span>
                      <strong>Location:</strong> {location.city}, {location.province},{" "}
                      {location.country}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaMapMarkerAlt className="text-blue-300" />
                    <span>
                      <strong>Location:</strong> Not specified
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <FaCode className="text-blue-500" />
                  <span className="font-semibold">Skills:</span>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleInvite(candidateId)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Invite to Job
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchedCandidatesPage;
