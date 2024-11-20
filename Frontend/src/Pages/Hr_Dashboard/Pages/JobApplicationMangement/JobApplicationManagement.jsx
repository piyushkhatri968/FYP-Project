import React, { useState } from "react";
import CandidateApplications from "./CandidateApplications";
import ShortlistCandidates from "./ShortlistCandidates";

const JobApplicationManagement = () => {
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Alice Johnson", position: "Frontend Developer", experience: 3, status: "Applied" },
    { id: 2, name: "Bob Smith", position: "Backend Developer", experience: 1, status: "Applied" },
    { id: 3, name: "Carol Danvers", position: "Data Scientist", experience: 0, status: "Applied" },
    { id: 4, name: "David Brown", position: "Frontend Developer", experience: 2, status: "Applied" },
  ]);

  const updateCandidateStatus = (id, newStatus) => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate
      )
    );
  };

  return (
    <div>
      <CandidateApplications candidates={candidates} onUpdateStatus={updateCandidateStatus} />
      <ShortlistCandidates candidates={candidates} />
    </div>
  );
};

export default JobApplicationManagement;
