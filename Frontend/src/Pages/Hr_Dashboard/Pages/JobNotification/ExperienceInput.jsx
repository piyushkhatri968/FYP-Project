import React from "react";

const ExperienceInput = ({ value, onChange }) => {
  const experienceOptions = [
    { label: "Fresh Graduate", value: "0-1" },
    { label: "1-2 Years", value: "1-2" },
    { label: "2-3 Years", value: "2-3" },
    { label: "3-5 Years", value: "3-5" },
    { label: "5+ Years", value: "5+" },
  ];

  return (
    <div>
      <label htmlFor="experience" className="block font-medium text-gray-700 mb-2">
        Experience Level
      </label>
      <select
        id="experience"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Experience Level</option>
        {experienceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExperienceInput;
