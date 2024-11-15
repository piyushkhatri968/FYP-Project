// JobForm.js
import React, { useState } from 'react';

const JobForm = ({ job, onSave }) => {
  const [title, setTitle] = useState(job ? job.title : '');
  const [department, setDepartment] = useState(job ? job.department : '');
  const [location, setLocation] = useState(job ? job.location : '');
  const [status, setStatus] = useState(job ? job.status : true);
  const [description, setDescription] = useState(job ? job.description : '');
  const [requirements, setRequirements] = useState(job ? job.requirements.join('\n') : '');

  const handleSave = () => {
    const updatedJob = {
      ...job,
      title,
      department,
      location,
      status,
      description,
      requirements: requirements.split('\n').filter((req) => req),
    };
    onSave(updatedJob);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-6">{job ? 'Edit Job' : 'Create New Job'}</h3>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter job title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter department"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter job location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value === 'true')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="true">Open</option>
          <option value="false">Closed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Job Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter job description"
          rows="4"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Requirements</label>
        <textarea
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="List requirements, one per line"
          rows="4"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {job ? 'Save Changes' : 'Create Job'}
      </button>
    </div>
  );
};

export default JobForm;
