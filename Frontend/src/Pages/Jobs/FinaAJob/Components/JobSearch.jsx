import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const JobSearch = () => {
  return (
    <div className="shadow-2xl my-24 mx-12 rounded-xl">
      <form>
        <div className="flex flex-wrap items-center justify-center gap-10 py-14 w-full max-w-[85vw] mx-auto rounded-2xl">
          <div className="flex items-center justify-between border border-gray-400 py-2 px-1 w-[15rem] rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Job Title or Keyword"
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />

            <CiSearch className="text-gray-600 text-lg mr-2" />
          </div>
          <div className="flex items-center justify-between border border-gray-400 py-2 px-1 w-[15rem] rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Location"
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <IoLocationOutline className="text-gray-600 text-lg mr-2" />
          </div>
          <div className="flex items-center justify-between border border-gray-400 py-2 px-1 w-[15rem] rounded-xl">
            <select className="border-none text-gray-700 text-sm font-semibold">
              <option value="Category">Category</option>
              <option value="Category">Category</option>
              <option value="Category">Category</option>
              <option value="Category">Category</option>
              <option value="Category">Category</option>
            </select>
            <FaChevronDown className="text-gray-600 text-sm mr-2" />
          </div>
          <div className="flex items-center gap-4 bg-red-600 text-white py-3.5 w-[15rem] justify-center rounded-xl">
            <button className="font-semibold">FIND A JOB</button>
            <CiSearch className="text-lg" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;
