import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import { Spinner } from "flowbite-react";

const JobSearch = () => {
  const [keyword, setKeyword] = useState("");
  // const [location, setLocation] = useState("");
  // const [category, setCategory] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault();
    setloading(false)
    setError(null);
    setResults(null)

    // Combine all inputs into one query for the backend
    const query = `${keyword}`.trim();

    if (!query) {
      setError("Please enter at least one search criterion.");
      return;
    }

    try {
      setloading(true)
      // Send request to backend
      const response = await axios.post("http://localhost:5000/job-seeker-match", {
        job_seeker_input: query,
      });

      // Set the results from the response
      if (response.data.message === "No match right now") {
        setError("No jobs found")
      }
      setResults(response.data);
      console.log(results)
      setloading(false)
    } catch (err) {
      setloading(false)
      setError(err.response?.data?.error || "Something went wrong while fetching jobs.");
      setResults(null)
    }
  };

  return (
    <div className="shadow-2xl my-24 mx-4 md:mx-12 rounded-xl">
      <form onSubmit={handleSearch}>
        <div className="flex items-center justify-center gap-6 py-8 sm:py-14 w-full max-w-[90vw] mx-auto rounded-2xl px-8 flex-col lg:flex-row">
          {/* Job Title or Keyword Input */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Job Title or Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <CiSearch className="text-gray-600 text-lg mr-2" />
          </div>

          {/* Location Input */}
          {/* <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full  rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <IoLocationOutline className="text-gray-600 text-lg mr-2" />
          </div> */}

          {/* Category Select */}
          {/* <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full  rounded-xl">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-none text-gray-500 text-sm font-semibold w-full"
            >
              <option value="">Category</option>
              <option value="Technology" className="text-gray-700 font-semibold">
                Technology
              </option>
              <option value="Healthcare" className="text-gray-700 font-semibold">
                Healthcare
              </option>
              <option value="Construction" className="text-gray-700 font-semibold">
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
              <option value="Hospitality" className="text-gray-700 font-semibold">
                Hospitality
              </option>
            </select>
          </div> */}

          {/* Find a Job Button */}
          <div className="flex items-center gap-4 bg-red-600 text-white py-3 w-full justify-center rounded-xl">
            {loading ? (<div><Spinner size="sm" /> Loading...</div>) : (<>
              <button type="submit" className="font-semibold">
                FIND A JOB
              </button>
              <CiSearch className="text-lg" /></>)}
          </div>
        </div>
      </form>

      {/* Display Results */}
      {results &&
        <div className="mt-6 mx-4 p-6 bg-green-100 border border-green-400 rounded-md">
          <h3 className="text-lg font-semibold text-green-800">Best Match</h3>
          <p className="mt-2 text-gray-800">{results.matched_job_post}</p>
          <p className="text-gray-600 mt-1">
            <strong>Match Score:</strong> {results.best_job_post_score?.toFixed(2)}
          </p>
        </div>
      }

      {/* Display Error */}
      {error && (
        <div className="mt-6 mx-4 p-6 bg-red-100 border border-red-400 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};

export default JobSearch;
