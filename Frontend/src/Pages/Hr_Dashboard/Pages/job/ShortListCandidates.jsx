// ShortlistedCandidates.js
import React from 'react';

const ShortListCandidates = ({ candidate, onViewProfile, onHire }) => {
    const candidates = [
        {
          id: 1,
          name: 'Alice Johnson',
          position: 'Frontend Developer',
          experience: 3,
          isShortlisted: true,
        },
        {
          id: 2,
          name: 'Carol Danvers',
          position: 'Data Scientist',
          experience: 2,
          isShortlisted: true,
        },
      ];
      
  const shortlisted = candidates.filter((candidate) => candidate.isShortlisted);

  if (shortlisted.length === 0) {
    return <p className="text-gray-500">No candidates have been shortlisted for this position yet.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Shortlisted Candidates</h3>
      
      <div className="space-y-4">
        {shortlisted.map((candidate) => (
          <div key={candidate.id} className="bg-green-100 p-4 rounded shadow flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{candidate.name}</h4>
              <p className="text-gray-600">Position: {candidate.position}</p>
              <p className="text-gray-600">Experience: {candidate.experience} years</p>
              <p className="text-green-600 text-sm font-semibold">Status: Shortlisted</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onViewProfile(candidate)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Profile
              </button>
              <button
                onClick={() => onHire(candidate)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortListCandidates;
