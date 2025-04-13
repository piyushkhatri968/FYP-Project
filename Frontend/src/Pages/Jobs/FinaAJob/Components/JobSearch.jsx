import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import { Spinner } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdLaptopChromebook } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const JobSearch = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
  
    const { title, location } = formData;
  
    // Send empty string if no value is entered
    const safeTitle = encodeURIComponent(title.trim() || "");
    const safeLocation = encodeURIComponent(location.trim() || "");
  
    // Always navigate, even if values are empty
    navigate(`/jobSearch/${safeTitle}/${safeLocation}`);
  };
  

  return (
    <div className="shadow-2xl my-24 mx-4 md:mx-12 rounded-xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-6 py-8 sm:py-14 w-full max-w-[90vw] mx-auto rounded-2xl px-8 flex-col lg:flex-row">
          {/* Job Title */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Job Title"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <FaSearch className="text-gray-600 text-lg mr-2" />
          </div>
          {/* Job Skills */}
          {/* <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={formData.skills}
            onChange={handleFormChange}
            className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
          />
          <MdLaptopChromebook className="text-gray-600 text-lg mr-2" />
        </div> */}
          {/* Job Location */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={formData.location}
              onChange={handleFormChange}
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <FaLocationDot className="text-gray-600 text-lg mr-2" />
          </div>
          <button
            type="submit"
            className="flex items-center gap-4 bg-red-600 text-white py-3 w-full justify-center rounded-xl"
          >
            <p type="submit" className="font-semibold">
              FIND A JOB
            </p>
            <CiSearch className="text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;
