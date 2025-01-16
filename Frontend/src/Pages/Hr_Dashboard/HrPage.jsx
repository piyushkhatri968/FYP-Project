import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaClipboardList,
  FaUserCheck,
  FaRegClock,
  FaRegCalendarAlt,
  FaBell,
  FaTasks,
  FaRegListAlt,
  FaBullhorn,
  FaCalendarCheck,
} from "react-icons/fa";

const HrPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-gray-50 to-gray-200">
      <main className="flex-1 p-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome, HR Manager!
          </h1>
          <div className="flex items-center gap-4">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition"
              onClick={() => navigate("/hr/account-settings")}
            >
              Profile Settings
            </button>
          </div>
        </header>

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center transition transform hover:scale-105"
              onClick={() => navigate("/hr/job-notification")}
            >
              <FaBriefcase size={32} className="mb-3" />
              <span className="font-semibold">Post a Job</span>
            </button>
            <button
              className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center transition transform hover:scale-105"
              onClick={() => navigate("/hr/manage-jobs")}
            >
              <FaClipboardList size={32} className="mb-3" />
              <span className="font-semibold">Manage Jobs</span>
            </button>
            <button
              className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex flex-col items-center transition transform hover:scale-105"
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
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Upcoming Interviews</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <FaCalendarCheck size={24} className="text-gray-500" />
                  <span className="text-gray-700">
                    Pawan kumar - 20th Nov, 2024 (10:00 AM)
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <FaCalendarCheck size={24} className="text-gray-500" />
                  <span className="text-gray-700">
                    Piyush - 22nd Nov, 2024 (2:00 PM)
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Schedule New Interview</h3>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition"
                onClick={() => navigate("/hr/schedule-interview")}
              >
                Add Interview
              </button>
            </div>
          </div>
        </section>

        {/* Other Features */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee Announcements</h2>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <FaBullhorn size={24} className="text-gray-500" />
                <span className="text-gray-700">
                  Company holiday announced for 24th Dec, 2024.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <FaBullhorn size={24} className="text-gray-500" />
                <span className="text-gray-700">
                  Policy update: Remote work guidelines revised.
                </span>
              </li>
            </ul>
            
          </div>
        </section>

        {/* Tasks to Review */}
        {/* <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks to Review</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
              <FaTasks size={32} className="text-blue-500 mb-3" />
              <h3 className="text-lg font-bold mb-2">Candidate Feedback</h3>
              <p className="text-gray-600">3 pending candidate feedback forms.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
              <FaRegListAlt size={32} className="text-green-500 mb-3" />
              <h3 className="text-lg font-bold mb-2">Onboarding Documents</h3>
              <p className="text-gray-600">5 documents awaiting review.</p>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
};

export default HrPage;
