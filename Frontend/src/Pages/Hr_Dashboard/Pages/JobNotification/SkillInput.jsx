import React, { useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

const SkillInput = ({ skills, onAdd, onRemove }) => {
  const [skill, setSkill] = useState("");

  const handleAddSkill = () => {
    if (skill.trim()) {
      onAdd(skill.trim());
      setSkill("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div>
      <label htmlFor="skills" className="block font-medium text-gray-700 mb-2">
        Required Skills
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          id="skills"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill and press Enter"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <FaPlus />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-gray-700 border border-gray-300"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove(skill)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillInput;
