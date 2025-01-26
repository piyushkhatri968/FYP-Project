import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBookmark, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import moment from "moment";
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";

const JobList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [favorites, setFavorites] = useState([]); // Local state for favorites
  const [loading, setLoading] = useState(false);

  // Fetch jobs and favorites when component loads
  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true);
        // Fetch jobs for the current user
        const jobResponse = await axios.get(
          `http://localhost:8080/api/jobs/getJobPostsRecommendation?userId=${currentUser.candidateDetails}`
        );
        setJobs(jobResponse.data.data);
        // Fetch the user's favorites from the backend
        const favoriteResponse = await axios.get(
          `http://localhost:8080/api/candidate/getFavorites?userId=${currentUser.candidateDetails}`
        );
        setFavorites(favoriteResponse.data.favorites);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getJobs();
  }, [currentUser.candidateDetails]);

  // Toggle favorite functionality as before
  const toggleFavorite = async (jobId) => {
    try {
      const userId = currentUser.candidateDetails;

      // Send request to the backend to toggle favorite status
      await axios.post(
        "http://localhost:8080/api/candidate/toggleFavoriteJob",
        {
          userId,
          jobId,
        }
      );

      // Update the local favorites state based on the backend response
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(jobId)) {
          return prevFavorites.filter((id) => id !== jobId);
        } else {
          return [...prevFavorites, jobId];
        }
      });
    } catch (error) {
      console.error(error);
      alert("Failed to update favorites");
    }
  };

  // Handle applying for a job
  const handleApply = async (jobId) => {
    try {
      const userId = currentUser.candidateDetails;
      await axios.post(
        "http://localhost:8080/api/application/candidate/applyJob",
        {
          userId,
          jobId,
        }
      );

      // Remove the applied job from the jobs list
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      alert("Job application submitted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to apply for the job.");
    }
  };

  return (
    <div className="p-6 min-h-screen shadow-2xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6">Jobs That Match Your Profile</h1>
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
                <button onClick={() => toggleFavorite(job._id)}>
                  <FaBookmark
                    className={`text-2xl cursor-pointer ${
                      favorites && favorites.includes(job._id)
                        ? "text-blue-400"
                        : "text-gray-400"
                    }`}
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
                <div className="flex gap-4">
                  <button
                    onClick={() => handleApply(job._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-semibold">
              No suggested jobs available at the moment.
            </p>
            <p>Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
