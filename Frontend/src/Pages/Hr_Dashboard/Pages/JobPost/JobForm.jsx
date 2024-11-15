// JobForm.js
import React, { useState } from 'react';
import FormField from './FormField';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    employment: 'Full-time',
    salary: '',
    deadline: '',
    requirements: '',
    responsibilities: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto sm:p-10 lg:p-12">
        <FormField label="Job Title" id="title" name="title" value={formData.title} onChange={handleChange} />
        <FormField label="Job Description" id="description" name="description" value={formData.description} onChange={handleChange} isTextArea />
        <FormField label="Location" id="location" name="location" value={formData.location} onChange={handleChange} />

        <div className="mb-6">
          <label htmlFor="employment" className="block text-gray-700 text-base font-medium mb-2">Employment Type</label>
          <select
            id="employment"
            name="employment"
            value={formData.employment}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </select>
        </div>

        <FormField label="Salary Range" id="salary" name="salary" value={formData.salary} onChange={handleChange} />
        <FormField label="Application Deadline" id="deadline" name="deadline" type="date" value={formData.deadline} onChange={handleChange} />
        <FormField label="Requirements" id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} isTextArea />
        <FormField label="Responsibilities" id="responsibilities" name="responsibilities" value={formData.responsibilities} onChange={handleChange} isTextArea />

        <div className="flex justify-end mt-8">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
