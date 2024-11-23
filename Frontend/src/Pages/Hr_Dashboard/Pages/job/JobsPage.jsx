import React, { useEffect, useState } from "react";
import JobListings from "./JobListings";
import JobDetails from "./JobDetails";
import JobForm from "./JobForm";
import JobAnalytics from "./JobAnalytics";
import CandidateApplications from "./CandidateApplications";
import ShortListCandidates from "./ShortListCandidates";
import ApplicationTracking from "./ApplicationTracking";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]); // Store jobs from backend
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingAnalytics, setIsViewingAnalytics] = useState(false);
  const [isViewingCandidates, setIsViewingCandidates] = useState(false);
  const [isViewingTracking, setIsViewingTracking] = useState(false); // New state for tracking view
  const [showShortlisted, setShowShortlisted] = useState(false); // State for shortlisted view

  // Fetch job data from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/jobs/getJobPosts"); // API endpoint
        const data = await response.json();
        console.log("Fetched jobs data:", data); // Log response for debugging
        // console.log("Fetched jobs data:", data.success);
        if (data.success) {
         
          setJobs(data.data); // Save fetched jobs to state
        } else {
          console.error("Failed to fetch jobs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);


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

  console.log("Jobs state in JobsPage:", jobs);


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Job Management</h2>
      

      {!selectedJob &&
        !isEditing &&
        !isViewingAnalytics &&
        !isViewingCandidates &&
        !isViewingTracking && (
          <JobListings
            jobs={jobs} // Pass fetched jobs to JobListings
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
          candidates={[]} // Placeholder; fetch actual candidates here
          onViewShortlisted={handleViewShortlisted}
        />
      )}

      {showShortlisted && (
        <ShortListCandidates
          candidates={[]} // Placeholder; fetch actual shortlisted candidates here
          onViewProfile={(candidate) => console.log("Viewing", candidate)}
          onHire={handleHire}
        />
      )}

      {isViewingTracking && (
        <ApplicationTracking applications={[]} /> // Placeholder
      )}
    </div>
  );
};

export default JobsPage;
