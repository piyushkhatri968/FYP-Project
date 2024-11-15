// JobDetails.js
import React from 'react';

const JobDetails = ({ job, onEdit, onAnalytics, onCandidates }) => {
 
    const jobs = {
        id: 1,
        title: 'Software Engineer',
        department: 'IT',
        location: 'New York',
        status: true, // true = Open, false = Closed
        description: 'This is a detailed job description...',
        requirements: [
          'Bachelors degree in Computer Science',
          '2+ years of experience with JavaScript',
          'Knowledge of React and Node.js'
        ],
      };
  if (!jobs) return null; // Return null if no job is selected
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{jobs.title}</h3>
      
      <div className="text-gray-600 mb-6">
        <p><strong>Department:</strong> {jobs.department}</p>
        <p><strong>Location:</strong> {jobs.location}</p>
        <p><strong>Status:</strong> {jobs.status ? 'Open' : 'Closed'}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Job Description</h4>
        <p className="text-gray-700">{jobs.description}</p>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Requirements</h4>
        <ul className="list-disc pl-5 text-gray-700">
          {jobs.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(job)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit Job
        </button>
        <button
          onClick={() => onAnalytics(job)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          View Analytics
        </button>
        <button
          onClick={() => onCandidates(job)}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          View Candidates
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
