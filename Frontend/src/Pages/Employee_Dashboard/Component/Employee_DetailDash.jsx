import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaCheckCircle } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Employee_DetailDash = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [savedJobs, setSavedJobs] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  // fetching total jobs
  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobs = await axios.get(
          `http://localhost:8080/api/jobs/getJobPostsRecommendation?userId=${currentUser.candidateDetails}`
        );
        setTotalJobs(jobs.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();

    const getAppliedJobs = async () => {
      try {
        const appliedJobs = await axios.get(
          `http://localhost:8080/api/candidate/appliedJobs/${currentUser.candidateDetails}`
        );
        setAppliedJobs(appliedJobs.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getAppliedJobs();

    const getSavedJobs = async () => {
      try {
        const savedJobs = await axios.get(
          `http://localhost:8080/api/candidate/savedJobs/${currentUser.candidateDetails}`
        );
        setSavedJobs(savedJobs.data.data.favorites.length);
      } catch (error) {
        console.log(error);
      }
    };
    getSavedJobs();
  }, []);
  return (
    <div className="mx-auto p-3 px-12 w-full shadow-lg rounded-xl">
      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/dashboard/employee?tab=suggestedjobs"
            className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <FaBriefcase size={32} className="mb-3" />
              <span className="font-semibold text-xl">Browse Jobs</span>
            </div>
            <div className="text-3xl font-semibold">{totalJobs}</div>
          </Link>
          <Link
            to="/dashboard/employee?tab=saved-jobs"
            className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <FaClipboardList size={32} className="mb-3" />
              <span className="font-semibold text-xl">Saved Jobs</span>
            </div>
            <div className="text-3xl font-semibold">{savedJobs}</div>
          </Link>
          <Link
            to="/dashboard/employee?tab=appliedjobs"
            className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <FaCheckCircle size={32} className="mb-3" />
              <span className="font-semibold text-xl">Applied Jobs</span>
            </div>
            <div className="text-3xl font-semibold">{appliedJobs}</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Employee_DetailDash;
