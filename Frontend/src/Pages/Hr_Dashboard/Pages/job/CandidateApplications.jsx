// CandidateProfiles.js
import React from 'react';

const  CandidateApplications = ({ candidate, onViewProfile, onShortlist }) => {
    const candidates = [
        {
          id: 1,
          name: 'Alice Johnson',
          position: 'Frontend Developer',
          experience: 3,
          isShortlisted: true,
        },
        // {
        //   id: 2,
        //   name: 'Bob Smith',
        //   position: 'Backend Developer',
        //   experience: 5,
        //   isShortlisted: false,
        // },
        {
          id: 3,
          name: 'Carol Danvers',
          position: 'Data Scientist',
          experience: 2,
          isShortlisted: false,
        },
      ];
      
  if (candidates.length === 0) {
    return <p className="text-gray-500">No candidates have applied for this position yet.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Candidate Profiles</h3>
      
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-gray-100 p-4 rounded shadow flex items-center justify-between ">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{candidate.name}</h4>
              <p className="text-gray-600">Position: {candidate.position}</p>
              <p className="text-gray-600">Experience: {candidate.experience} years</p>
              <p className={`text-sm font-semibold ${candidate.isShortlisted ? 'text-green-600' : 'text-gray-500'}`}>
                Status: {candidate.isShortlisted ? 'Shortlisted' : 'Applied'}
              </p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => onViewProfile(candidate)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Profile
              </button>
              <button
                onClick={() => onShortlist(candidate)}
                className={`px-5 py-2 rounded ${
                  candidate.isShortlisted ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                {candidate.isShortlisted ? 'Shortlisted' : 'Shortlist'}
              </button>

            </div>

            <div>
      {/* <h3 className="text-2xl font-bold mb-4">All Candidate Applications</h3> */}
      {/* <button
        onClick={onViewShortlisted}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6"
      >
        View Shortlisted Candidates
      </button> */}
      
      {/* Render candidate list */}
    </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateApplications;
