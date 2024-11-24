import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaCheckCircle } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";

const Employee_DetailDash = () => {
  const [totalJobs, setTotalJobs] = useState();
  const [loading, setLoading] = useState(false);

  // fetching total jobs
  useEffect(() => {
    setLoading(false);
    const getJobs = async () => {
      try {
        setLoading(true);
        const jobs = await axios.get(
          "http://localhost:8080/api/jobs/getJobPosts"
        );
        setTotalJobs(jobs.data.data.length);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getJobs();
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
            to="/dashboard/employee?tab=suggestedjobs"
            className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <FaClipboardList size={32} className="mb-3" />
              <span className="font-semibold text-xl">Applied Jobs</span>
            </div>
            <div className="text-3xl font-semibold">0</div>
          </Link>
          <Link
            to="/dashboard/employee?tab=suggestedjobs"
            className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform hover:scale-105"
          >
            <div className="flex flex-col items-center">
              <FaCheckCircle size={32} className="mb-3" />
              <span className="font-semibold text-xl">Short Listed</span>
            </div>
            <div className="text-3xl font-semibold">0</div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Employee_DetailDash;
