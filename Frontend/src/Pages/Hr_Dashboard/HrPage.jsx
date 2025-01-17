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
  const [analytics, setAnalytics] = useState({
    applicationsReceived: 0,
    shortlisted: 0,
    hired: 0,
  });

  // Separate loading and error states for analytics and interviews
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [errorAnalytics, setErrorAnalytics] = useState(null);
  const [loadingInterviews, setLoadingInterviews] = useState(true);
  const [errorInterviews, setErrorInterviews] = useState(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/application/candidate/analytics"
        );
        setAnalytics(response.data);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setErrorAnalytics("Failed to load analytics data.");
      } finally {
        setLoadingAnalytics(false);
      }
    };

    fetchAnalytics();
  }, []);

  // Fetch interview schedule data
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/application/candidate/get-interview-schedule"
        );
        setInterviews(response.data);
      } catch (err) {
        console.error("Error fetching interview schedule:", err);
        setErrorInterviews("Failed to load interview schedule.");
      } finally {
        setLoadingInterviews(false);
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Analytics Overview
          </h2>
          {loadingAnalytics ? (
            <p className="text-gray-500">Loading analytics...</p>
          ) : errorAnalytics ? (
            <p className="text-red-500">{errorAnalytics}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-bold mb-2">Applications Received</h3>
                <p className="text-3xl font-extrabold text-blue-500">
                  {analytics.applicationsReceived}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-bold mb-2">Shortlisted</h3>
                <p className="text-3xl font-extrabold text-green-500">
                  {analytics.shortlisted}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-bold mb-2">Hired</h3>
                <p className="text-3xl font-extrabold text-purple-500">
                  {analytics.hired}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Interview Scheduling */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Interview Scheduling
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Upcoming Interviews</h3>
            {loadingInterviews ? (
              <p className="text-gray-500">Loading interviews...</p>
            ) : errorInterviews ? (
              <p className="text-red-500">{errorInterviews}</p>
            ) : interviews.length === 0 ? (
              <p className="text-gray-500">No scheduled interviews.</p>
            ) : (
              <ul className="space-y-4">
                {interviews.map((interview) => (
                  <li key={interview._id} className="flex items-center gap-4">
                    <FaCalendarCheck size={24} className="text-gray-500" />
                    <span className="text-gray-700">
                      {interview.interviewers && interview.interviewers.length > 0
                        ? `${interview.interviewers.join(", ")} - `
                        : "N/A - "}
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
        </section>
      </main>
    </div>
  );
};

export default HrPage;
