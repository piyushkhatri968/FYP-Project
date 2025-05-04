import React from "react";

const JobListings = ({ jobs, onSelect, onEdit, onCreate, onCandidates }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold">Job Listings</h3>
       
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Job Title</th>
              <th className="py-2 px-4 text-left">Department</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="py-2 px-4">{job.title}</td>
                <td className="py-2 px-4">{job.department}</td>
                <td className="py-2 px-4">{job.location}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onSelect(job)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(job)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onCandidates(job)}
                      className="bg-purple-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Candidates
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden flex flex-col gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border rounded-lg p-4 shadow-sm">
            <div className="mb-2">
              <p className="font-semibold">Job Title:</p>
              <p>{job.title}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Department:</p>
              <p>{job.department}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Location:</p>
              <p>{job.location}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => onSelect(job)}
                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
              >
                View
              </button>
              <button
                onClick={() => onEdit(job)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onCandidates(job)}
                className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
              >
                Candidates
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback Message */}
      {(!jobs || jobs.length === 0) && (
        <p className="text-gray-500">No job listings available. Please create a new job.</p>
      )}
    </div>
  );
};

export default JobListings;
