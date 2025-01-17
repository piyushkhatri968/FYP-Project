import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBriefcase,
  FaClipboardList,
  FaUserCheck,
  FaCalendarCheck,
} from "react-icons/fa";

const HrPage = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/application/candidate/get-interview-schedule"
        );
        setInterviews(response.data);
        console.log(response.data)
      } catch (err) {
        console.error("Error fetching interview schedule:", err);
        setError("Failed to load interview schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-50 to-gray-200">
      <main className="flex-1 p-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome, HR Manager!
          </h1>
          <button
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition"
            onClick={() => navigate("/hr/account-settings")}
          >
            Profile Settings
          </button>
        </header>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center transition transform hover:scale-105"
              onClick={() => navigate("/hr/job-notification")}
            >
              <FaBriefcase size={32} className="mb-3" />
              <span className="font-semibold">Post a Job</span>
            </button>
            <button
              className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center transition transform hover:scale-105"
              onClick={() => navigate("/hr/manage-jobs")}
            >
              <FaClipboardList size={32} className="mb-3" />
              <span className="font-semibold">Manage Jobs</span>
            </button>
            <button
              className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-lg shadow-md flex flex-col items-center transition transform hover:scale-105"
              onClick={() => navigate("/hr/candidate-profiles")}
            >
              <FaUserCheck size={32} className="mb-3" />
              <span className="font-semibold">View Applications</span>
            </button>
          </div>
        </section>


        {/* Analytics Overview */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Active Jobs</h3>
              <p className="text-3xl font-extrabold text-blue-500">12</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Applications Received</h3>
              <p className="text-3xl font-extrabold text-green-500">345</p>
              <div className="mt-3 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Hires This Month</h3>
              <p className="text-3xl font-extrabold text-purple-500">7</p>
            </div>
          </div>
        </section>
        


        {/* Interview Scheduling */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Interview Scheduling
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Upcoming Interviews</h3>
              {loading ? (
                <p className="text-gray-500">Loading interviews...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : interviews.length === 0 ? (
                <p className="text-gray-500">No scheduled interviews.</p>
              ) : (
                <ul className="space-y-4">
                  {interviews.map((interview) => (
                    <li key={interview._id} className="flex items-center gap-4">
                      <FaCalendarCheck size={24} className="text-gray-500" />
                      <span className="text-gray-700">
                        {interview?.candidateId?.userId?.name || "N/A"} -{" "}
                        {new Date(interview.interviewDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                        ({interview.interviewTime})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">Schedule New Interview</h3>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition"
                onClick={() => navigate("/hr/schedule-interview")}
              >
                Add Interview
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};



export default HrPage;    
