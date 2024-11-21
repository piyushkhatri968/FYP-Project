import React from "react";

const JobTypeSelector = ({ value, onChange }) => {
  const jobTypes = ["Full-Time", "Part-Time", "Remote", "Contract"];

  return (
    <div>
      <label htmlFor="jobType" className="block font-medium text-gray-700 mb-2">
        Job Type
      </label>
      <select
        id="jobType"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Job Type</option>
        {jobTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobTypeSelector;
