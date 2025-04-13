import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const JobSearch = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return alert("Please enter a job title or skill to search.");
    }

    const safeTitle = encodeURIComponent(trimmedTitle);
    navigate(`/jobSearch/${safeTitle}`);
  };

  return (
    <div className="shadow-2xl my-24 mx-4 md:mx-12 rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-6 py-8 sm:py-14 w-full max-w-[90vw] mx-auto rounded-2xl px-8 flex-col lg:flex-row">
          {/* Job Title / Skill */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Job Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <FaSearch className="text-gray-600 text-lg mr-2" />
          </div>

          <button
            type="submit"
            className="flex items-center gap-4 bg-red-600 text-white py-3 w-full justify-center rounded-xl"
          >
            <p className="font-semibold">FIND A JOB</p>
            <CiSearch className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;
