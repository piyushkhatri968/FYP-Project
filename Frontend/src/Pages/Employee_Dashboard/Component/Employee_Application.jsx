import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaBookmark,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import moment from "moment";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";

const Employee_Application = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/candidate/appliedJobs/${currentUser.candidateDetails}`
        );
        setJobs(response.data.data);
        setLoading(false);
        // Fetch the application status for each job after getting the list of jobs
        response.data.data.forEach((job) => {
          getApplicationStatus(job._id); // Fetch status for each job
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getJobs();
  }, [currentUser.candidateDetails]);

  // Fetch application status for a specific jobId
  const getApplicationStatus = async (jobId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/application/candidate/jobStatus?userId=${currentUser.candidateDetails}&jobId=${jobId}`
      );
      setApplicationStatus((prevStatus) => ({
        ...prevStatus,
        [jobId]: response.data.data.status, // Store the status for each job
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Jobs Application Tracking</h1>
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner size="xl" color="warning" />
          </div>
        ) : jobs.length > 0 ? (
          jobs.map((job, index) => {
            const status = applicationStatus[job._id];
            const statusStyle = {
              Applied: "bg-gray-400 text-yellow-700 shadow-lg shadow-gray-400",
              Shortlisted:
                "bg-green-100 text-green-700 shadow-lg shadow-green-400",
              Rejected: "bg-red-100 text-red-700 shadow-lg shadow-red-400",
            };

            const statusIcon = {
              Applied: <FaBookmark className="text-yellow-500 text-lg" />,
              Shortlisted: <FaCheckCircle className="text-green-500 text-lg" />,
              Rejected: <FaTimesCircle className="text-red-500 text-lg" />,
            };

            return (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg border-2 hover:shadow-lg transition-shadow ${statusStyle[status]}`}
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
                        {job?.postedBy.name} •{" "}
                        <FaMapMarkerAlt className="inline text-red-500" />{" "}
                        {job.location} •{" "}
                        <FaClock className="inline text-yellow-500" />{" "}
                        {moment(job.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
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
                </div>

                {/* Application Status Section */}
                <div className="mt-4 flex items-center gap-2 justify-center">
                  <p> {statusIcon[status]}</p>
                  <p className="mt-2 text-gray-600">
                    Status: <span className="font-semibold">{status}</span>
                  </p>
                </div>
              </div>
            );
          })
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

export default Employee_Application;
