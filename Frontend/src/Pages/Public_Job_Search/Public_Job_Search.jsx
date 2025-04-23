import React, { useEffect, useState } from "react";
import { CiClock1, CiFilter, CiLocationOn, CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import companyImage from "../../assets/Images/Jobs/CompanyImg.png";
import moment from "moment";

const Public_Job_Search = () => {
  const { title, location } = useParams();

  const [searchTitle, setSearchTitle] = useState(title || "");
  const [searchLocation, setSearchLocation] = useState(
    location === "none" ? "" : location || ""
  );
  const [jobResults, setJobResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (titleInput, locationInput) => {
    const jobSeekerInput = {};
    if (titleInput?.trim()) jobSeekerInput.title = titleInput.trim();
    if (locationInput?.trim()) jobSeekerInput.location = locationInput.trim();

    try {
      if (loading) return;
      setLoading(true);
      const response = await fetch("http://localhost:5000/job-seeker-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          job_seeker_input: jobSeekerInput,
        }),
      });

      const data = await response.json();
      setJobResults(data.matched_jobs || []);
      console.log("Job results:", data.matched_jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title) {
      const cleanLocation = location === "none" ? "" : location;
      fetchJobs(title, cleanLocation);
    }
  }, [title, location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchJobs(searchTitle, searchLocation);
  };

  return (
    <div className="w-full min-h-screen">
      {/* Filters */}
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center gap-6 py-8 sm:py-14 w-full max-w-[90vw] mx-auto rounded-2xl px-8 flex-col lg:flex-row">
          {/* Job Title */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Job Title"
              name="title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <FaSearch className="text-gray-600 text-lg mr-2" />
          </div>

          {/* Job Location */}
          <div className="flex items-center justify-between border border-gray-400 py-2 px-3 w-full rounded-xl focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Location (optional)"
              name="location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="border-none text-sm w-full text-gray-700 placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-gray-50"
            />
            <FaLocationDot className="text-gray-600 text-lg mr-2" />
          </div>

          <button
            type="submit"
            className="flex items-center gap-4 bg-red-600 text-white py-3 w-full justify-center rounded-xl"
          >
            <p className="font-semibold">
              {loading ? <Spinner size="sm" /> : "FIND A JOB"}
            </p>
            <CiSearch className="text-lg" />
          </button>
        </div>
      </form>

      {/* Results */}
      <div>
        {loading ? (
          <div className="w-full text-center py-8">
            <Spinner size="md" />
          </div>
        ) : jobResults.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No jobs found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-4 sm:mx-12 text-center md:text-left mb-6 ">
            {jobResults.map((job, index) => (
              <Link
                to={`/jobs/${job._id}`}
                key={index}
                className="flex items-center justify-between bg-[#FDE7E7] p-6 gap-6 md:gap-0 flex-col md:flex-row hover:rounded-md hover:scale-105 transition-all duration-200"
              >
                {/* Company Image */}
                <div className="md:w-[6rem] md:h-[5rem] w-full h-[3.8rem] bg-white flex items-center justify-center rounded-md border border-dashed border-gray-300">
                  <img
                    src={companyImage}
                    alt="Company Logo"
                    className="w-10 h-10"
                    draggable="false"
                  />
                </div>

                {/* Job Details */}
                <div className="flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-1 pl-8 gap-1">
                  <h2 className="text-lg font-bold">{job.title}</h2>
                  {/* <p className="text-sm">
                    Via <span className="text-red-500">{job.companyName}</span>
                  </p> */}
                  <div className="text-gray-500 flex items-center space-x-1 mt-1">
                    <CiLocationOn className="text-gray-600 text-lg" />
                    <span>{job.location}</span>
                  </div>
                  {/* <div className="text-gray-500 flex items-center space-x-1">
                    <CiFilter className="text-gray-600 text-lg" />
                    <span>{job.skills.join(", ")}</span>
                  </div> */}
                </div>

                {/* Right Side */}
                <div className="flex flex-col justify-center items-center gap-2 md:gap-4">
                  <div className="text-red-600 bg-white py-2 px-8 border rounded-xl text-sm">
                    {job.jobType}
                  </div>
                  <div className="flex justify-center items-center gap-2 text-gray-500">
                    <CiClock1 />
                    <span>{moment(job.createdAt).fromNow()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Public_Job_Search;
