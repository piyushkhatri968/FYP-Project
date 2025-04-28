import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { FaBookmark, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import moment from "moment";

const Employee_saved_jobs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/candidate/savedJobs/${currentUser.candidateDetails}`
        );
        setFavorites(response.data.data.favorites);
        console.log(response.data.data.favorites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite jobs:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // Handle applying for a job
  const handleApply = async (jobId) => {
    try {
      const userId = currentUser.candidateDetails;
      const response = await axios.post(
        "http://localhost:8080/api/application/candidate/applyJob",
        {
          userId,
          jobId,
        }
      );

      alert(response.data.message || "Job application submitted successfully.");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Your Saved Jobs</h1>
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner size="xl" color="warning" />
          </div>
        ) : favorites.length > 0 ? (
          favorites.map((job, index) => (
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
                      alt="Company Logo"
                      className="w-24 h-16 rounded-md object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {job.title || "Job Title"}
                    </h2>
                    <p className="text-gray-500 text-sm flex gap-2 items-center">
                      {job.postedBy ? job.postedBy.name : "Unknown Recruiter"} •{" "}
                      <FaMapMarkerAlt className="inline text-red-500" />{" "}
                      {job.location || "Location"} •{" "}
                      <FaClock className="inline text-yellow-500" />{" "}
                      {job.createdAt ? moment(job.createdAt).fromNow() : "Date"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {job.description || "No description available."}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills && job.skills.length > 0 ? (
                  job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm">
                    No skills listed
                  </span>
                )}
              </div>

              {/* Footer Section */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2 justify-center items-center flex-wrap">
                  <p className="text-gray-500 text-sm">
                    {job.jobType || "Job Type"}
                  </p>
                  •{" "}
                  <p className="text-gray-500 text-sm">
                    {job.experience || "N/A"} years of experience
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    onClick={() => handleApply(job._id)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-semibold">No saved jobs found.</p>
            <p>Please save jobs to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employee_saved_jobs;
