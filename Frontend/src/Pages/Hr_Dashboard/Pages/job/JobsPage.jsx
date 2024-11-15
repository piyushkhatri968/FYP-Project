// JobsPage.js
import React, { useState } from "react";
import JobListings from "./JobListings";
import JobDetails from "./JobDetails";
import JobForm from "./JobForm";
import JobAnalytics from "./JobAnalytics";
import CandidateApplications from "./CandidateApplications";
import ShortListCandidates from "./ShortListCandidates";
import ApplicationTracking from "./ApplicationTracking";

const JobsPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingAnalytics, setIsViewingAnalytics] = useState(false);
  const [isViewingCandidates, setIsViewingCandidates] = useState(false);
  const [isViewingTracking, setIsViewingTracking] = useState(false); // New state for tracking view
  const [showShortlisted, setShowShortlisted] = useState(false); // State for shortlisted view

  // Sample candidates data (in a real app, this would be fetched from a server or API)
  const candidatesList = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Frontend Developer",
      experience: 3,
      isShortlisted: true,
      stage: "applied",
    },
    {
      id: 2,
      name: "Bob Smith",
      position: "Backend Developer",
      experience: 5,
      isShortlisted: false,
      stage: "interviewed",
    },
    {
      id: 3,
      name: "Carol Danvers",
      position: "Data Scientist",
      experience: 2,
      isShortlisted: true,
      stage: "shortlisted",
    },
    {
      id: 4,
      name: "David Brown",
      position: "UI Designer",
      experience: 4,
      isShortlisted: false,
      stage: "hired",
    },
  ];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setIsEditing(false);
    setIsViewingAnalytics(false);
    setIsViewingCandidates(false);
    setIsViewingTracking(false);
    setShowShortlisted(false); // Reset shortlisted view when selecting a new job
  };

  const handleJobEdit = (job) => {
    setSelectedJob(job);
    setIsEditing(true);
  };

  const handleJobAnalytics = (job) => {
    setSelectedJob(job);
    setIsViewingAnalytics(true);
  };

  const handleJobCandidates = (job) => {
    setSelectedJob(job);
    setIsViewingCandidates(true);
    setIsViewingTracking(false);
    setShowShortlisted(false); // Reset shortlisted view when switching to all candidates
  };

  const handleJobCreate = () => {
    setSelectedJob(null);
    setIsEditing(true);
  };

  const handleViewShortlisted = () => {
    setShowShortlisted(true);
    setIsViewingCandidates(true);
  };

  const handleHire = (candidate) => {
    console.log("Hiring candidate:", candidate);
    // Implement further hiring logic as needed
  };

  const handleViewTracking = () => {
    setIsViewingTracking(true);
    setIsViewingCandidates(false);
    setShowShortlisted(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Job Management</h2>

      {!selectedJob &&
        !isEditing &&
        !isViewingAnalytics &&
        !isViewingCandidates &&
        !isViewingTracking && (
          <JobListings
            onSelect={handleJobSelect}
            onEdit={handleJobEdit}
            onCreate={handleJobCreate}
            onAnalytics={handleJobAnalytics}
            onCandidates={handleJobCandidates}
          />
        )}

      {selectedJob &&
        !isEditing &&
        !isViewingAnalytics &&
        !isViewingCandidates &&
        !isViewingTracking && (
          <JobDetails
            job={selectedJob}
            onEdit={handleJobEdit}
            onAnalytics={() => handleJobAnalytics(selectedJob)}
            onCandidates={() => handleJobCandidates(selectedJob)}
            onTracking={handleViewTracking} // Pass the handler to view tracking
          />
        )}

      {isViewingAnalytics && <JobAnalytics job={selectedJob} />}

      {isEditing && (
        <JobForm
          job={selectedJob}
          onSave={() => {
            setSelectedJob(null);
            setIsEditing(false);
          }}
        />
      )}

      {isViewingCandidates && !showShortlisted && (
        <CandidateApplications
          job={selectedJob}
          candidates={candidatesList}
          onViewShortlisted={handleViewShortlisted}
        />
      )}

      {showShortlisted && (
        <ShortListCandidates
          candidates={candidatesList}
          onViewProfile={(candidate) => console.log("Viewing", candidate)}
          onHire={handleHire}
        />
      )}

      {isViewingTracking && (
        <ApplicationTracking applications={candidatesList} />
      )}
    </div>
  );
};

export default JobsPage;
