import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import moment from "moment";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Employee_Applied_Jobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/candidate/appliedJobs/${currentUser.candidateDetails}`
        );
        setJobs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getJobs();
  }, [currentUser.candidateDetails]);

  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Jobs You Applied</h1>
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner size="xl" color="warning" />
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border-2 hover:shadow-lg transition-shadow"
            >
              {/* Header Section */}
              <div className="flex justify-between items-center mb-4">
                {/* Logo and Title Section */}
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 w-28 h-20 rounded-md flex justify-center items-center">
                    <img
                      src={
                        job.company_logo ||
                        "https://c8.alamy.com/comp/2AH6RFF/real-estate-company-logo-design-template-blue-house-and-building-concept-construction-architecture-element-apartment-condo-rouded-window-shape-2AH6RFF.jpg"
                      }
                      alt=""
                      className="w-24 h-16 rounded-md object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p className="text-gray-500 text-sm flex gap-2 items-center">
                      {job.postedBy ? job.postedBy.name : "Unknown Recruiter"} •{" "}
                      <FaMapMarkerAlt className="inline text-red-500" />{" "}
                      {job.location} •{" "}
                      <FaClock className="inline text-yellow-500" />{" "}
                      {moment(job.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
                {/* Save Job Icon */}
                <button>
                  <FaBookmark
                    className={`text-2xl cursor-pointer text-gray-400`}
                  />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{job.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Footer Section */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2 justify-center items-center flex-wrap">
                  <p className="text-gray-500 text-sm">{job.jobType}</p>•{" "}
                  <p className="text-gray-500 text-sm">
                    {job.experience} years of experience
                  </p>
                </div>
                <Link
                  to="/dashboard/employee?tab=trackapplication"
                  className="bg-green-600 text-white px-3 py-1 rounded-lg font-semibold"
                >
                  Track Status
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-semibold">
              You haven't applied for any jobs yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee_Applied_Jobs;
