import React from "react";
import { useLocation } from "react-router-dom";
import { FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaUserTie, FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { color } from "framer-motion";


const MatchedCandidatesPage = () => {
  const location = useLocation();
  const matchedCandidates = location.state?.matchedCandidates || [];

  console.log("Received:", matchedCandidates);

  console.log("Matched Candidates from location state:", location.state);


  if (matchedCandidates.length === 0) {
    <div>

    </div>
    
    return <p className="text-center text-gray-500">No matched candidates found.  <br /> <br />
    <Link 
    to={"/hr/dashboard"} 
      className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-red-700 transition"

    
    >Go to Dashobard</Link></p>;
    
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Matched Candidates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matchedCandidates.map((candidate, index) => {
          const { userInfo, position, experience, location, skills } = candidate;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 max-w-2xl mx-auto">
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
                  <span><strong>Position:</strong> {position}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" />
                  <span><strong>Experience:</strong> {experience} years</span>
                </div>
                {location ? (
  <div className="flex items-center gap-2">
    <FaMapMarkerAlt className="text-blue-500" />
    <span>
      <strong>Location:</strong> {location.city}, {location.province}, {location.country}
    </span>
  </div>
) : (
  <div className="flex items-center gap-2 text-gray-400">
    <FaMapMarkerAlt className="text-blue-300" />
    <span><strong>Location:</strong> Not specified</span>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchedCandidatesPage;
