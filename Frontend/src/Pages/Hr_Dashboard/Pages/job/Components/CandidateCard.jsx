
import React from "react";

const CandidateCard = ({ candidate }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition-all">
      <h3 className="text-xl font-semibold">{candidate.name}</h3>
      <p className="text-sm text-gray-600">{candidate.profession}</p>
      <div className="mt-2">
        <span className="text-sm font-medium">Skills:</span>
        <ul className="flex flex-wrap gap-2 mt-1">
          {candidate.skills.map((skill, i) => (
            <li key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-2 text-sm">Experience: {candidate.experience} years</p>
      <p className="text-sm">Match Score: <span className="font-semibold">{candidate.matchScore}%</span></p>

      <a href={candidate.resumeLink} target="_blank" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
        View Resume
      </a>
    </div>
  );
};

export default CandidateCard;
