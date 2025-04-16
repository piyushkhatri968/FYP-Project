import React from 'react'
import FilterBar from './Components/FilterBar';
import CandidateCard from './Components/CandidateCard';
import candidates from './dummyCandidates';

function MatchedCandidates() {
    return (
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">Matched Candidates</h2>
          <FilterBar />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      );
}

export default MatchedCandidates