// JobListings.js
import React from 'react';

const JobListings = ({ onSelect, onEdit, onCreate, onAnalytics, onCandidates }) => {
  const jobs = [
    // Dummy job data
    { id: 1, title: 'Software Engineer', department: 'IT', location: 'New York' },
    { id: 2, title: 'Product Manager', department: 'Product', location: 'San Francisco' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Job Listings</h3>
        <button
          onClick={onCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create New Job
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Job Title</th>
            <th className="py-2">Department</th>
            <th className="py-2">Location</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="py-2">{job.title}</td>
              <td className="py-2">{job.department}</td>
              <td className="py-2">{job.location}</td>
              <td className="py-2 flex space-x-2">
                <button
                  onClick={() => onSelect(job)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(job)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onAnalytics(job)}
                  className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
                >
                  Analytics
                </button>
                <button
                  onClick={() => onCandidates(job)}
                  className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                >
                  Candidates
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobListings;
