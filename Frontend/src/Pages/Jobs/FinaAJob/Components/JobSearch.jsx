import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const JobSearch = () => {
  return (
    <div className="shadow-2xl my-24 mx-4 md:mx-12 rounded-xl">
      <form>
        <div className="flex items-center justify-center gap-6 py-8 sm:py-14 w-full max-w-[90vw] mx-auto rounded-2xl px-8 flex-col lg:flex-row">
          {/* Job Title or Keyword Input */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Job Title or Keyword"
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <CiSearch className="text-gray-600 text-lg mr-2" />
          </div>

          {/* Location Input */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full  rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Location"
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <IoLocationOutline className="text-gray-600 text-lg mr-2" />
          </div>

          {/* Category Select */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full  rounded-xl">
            <select className="border-none text-gray-500 text-sm font-semibold w-full">
              <option value="Category">Category</option>
              <option
                value="Technology"
                className="text-gray-700 font-semibold"
              >
                Technology
              </option>
              <option
                value="Healthcare"
                className="text-gray-700 font-semibold"
              >
                Healthcare
              </option>
              <option
                value="Construction"
                className="text-gray-700 font-semibold"
              >
                Construction
              </option>
              <option value="Education" className="text-gray-700 font-semibold">
                Education
              </option>
              <option value="Marketing" className="text-gray-700 font-semibold">
                Marketing
              </option>
              <option value="Finance" className="text-gray-700 font-semibold">
                Finance
              </option>
              <option
                value="Hospitality"
                className="text-gray-700 font-semibold"
              >
                Hospitality
              </option>
            </select>
          </div>

          {/* Find a Job Button */}
          <div className="flex items-center gap-4 bg-red-600 text-white py-3 w-full justify-center rounded-xl">
            <button className="font-semibold">FIND A JOB</button>
            <CiSearch className="text-lg" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;
