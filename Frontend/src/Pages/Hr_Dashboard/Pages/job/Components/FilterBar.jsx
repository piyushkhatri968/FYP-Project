// Components/FilterBar.jsx
import React from "react";

const FilterBar = () => {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-gray-100 p-4 rounded-lg">
      <input
        type="text"
        placeholder="Search by skill..."
        className="px-4 py-2 border rounded w-full md:w-auto"
      />
      <select className="px-4 py-2 border rounded">
        <option value="">Experience Level</option>
        <option value="0-1">0-1 years</option>
        <option value="2-4">2-4 years</option>
        <option value="5+">5+ years</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
