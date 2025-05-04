import React from 'react';

const JobDetails = ({ job, onEdit, onAnalytics, onCandidates, onTracking, onDelete }) => {
  if (!job) return null;

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full">
      <h3 className="text-xl sm:text-2xl font-bold mb-4">{job.title}</h3>

      <div className="text-gray-600 mb-6 space-y-2 text-sm sm:text-base">
        <p><strong>Department:</strong> {job.department}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Status:</strong> {job.status ? 'Closed' : 'Open'}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg sm:text-xl font-semibold mb-2">Job Description</h4>
        <p className="text-gray-700 text-sm sm:text-base">{job.description || "No description available."}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-lg sm:text-xl font-semibold mb-2">Job Details</h4>
        <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base space-y-1">
          <li><strong>Job Type:</strong> {job.jobType || "Not specified"}</li>
          <li><strong>Skills:</strong> {job.skills && job.skills.length > 0 ? job.skills.join(", ") : "Not specified"}</li>
          <li><strong>Experience:</strong> {job.experience || "Not specified"}</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        <button
          onClick={() => onEdit(job)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm sm:text-base"
        >
          Edit Job
        </button>

        <button
          onClick={() => onCandidates(job)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 text-sm sm:text-base"
        >
          View Candidates
        </button>

        <button
          onClick={onTracking}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
        >
          View Application Tracking
        </button>

        <button
          onClick={() => onDelete(job._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm sm:text-base"
        >
          Delete Job
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
