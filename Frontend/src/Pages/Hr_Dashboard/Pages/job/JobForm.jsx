import React, { useState } from 'react';

const JobForm = ({ job, onSave }) => {
  
  const [title, setTitle] = useState(job ? job.title : '');
  const [department, setDepartment] = useState(job ? job.department : '');
  const [location, setLocation] = useState(job ? job.location : '');
  const [status, setStatus] = useState(job ? job.status : false);
  const [description, setDescription] = useState(job ? job.description : '');
  const [jobType, setJobType] = useState(job ? job.jobType : '');
  const [skills, setSkills] = useState(job ? job.skills.join(', ') : ''); // Use comma-separated input
  const [experience, setExperience] = useState(job ? job.experience : '');

  console.log('Job prop:', job); //  to see the job data


  const handleSave = async () => {
    if (!job || !job._id) {
      console.error("Job ID is missing!");
      alert("Job ID is missing!");
      return;
    }
  
    const updatedJob = {
      title,
      department,
      location,
      status,
      description,
      jobType,
      skills: skills.split(',').map((skill) => skill.trim()),
      experience,
    };

    
  
    try {
      const response = await fetch(`http://localhost:8080/api/jobs/${job._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedJob),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Job updated successfully!');
        onSave(result.data); // Pass updated job to parent component
      } else {
        alert(`Error updating job: ${result.message}`);
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Error updating job.');
    }
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
          placeholder="Enter location"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value === 'true')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="false">Open</option>
          <option value="true">Closed</option>
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

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
        <input
          type="text"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter job type"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Skills</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter skills, separated by commas"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Experience</label>
        <input
          type="text"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter experience requirements"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default JobForm;
