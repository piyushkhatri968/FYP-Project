import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaClipboardList, FaUserCheck, FaUsers, FaCalendarAlt, FaChartLine, FaTasks } from "react-icons/fa";

const HrPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Welcome, HR Manager!</h1>
          <div className="flex items-center gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              onClick={() => navigate("/profile-settings")}
            >
              Profile Settings
            </button>
          </div>
        </header>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              className="bg-blue-500 text-white p-4 rounded shadow-lg hover:bg-blue-600 flex flex-col items-center"
              onClick={() => navigate("/job-notification")}
            >
              <FaBriefcase size={24} className="mb-2" />
              Post a Job
            </button>
            <button
              className="bg-green-500 text-white p-4 rounded shadow-lg hover:bg-green-600 flex flex-col items-center"
              onClick={() => navigate("/manage-jobs")}
            >
              <FaClipboardList size={24} className="mb-2" />
              Manage Jobs
            </button>
            <button
              className="bg-purple-500 text-white p-4 rounded shadow-lg hover:bg-purple-600 flex flex-col items-center"
              onClick={() => navigate("/candidate-profiles")}
            >
              <FaUserCheck size={24} className="mb-2" />
              View Applications
            </button>
          </div>
        </section>

        {/* Analytics Overview */}
        <section>
          <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-2">Active Jobs</h3>
              <p className="text-3xl font-bold text-blue-500">12</p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-2">Applications Received</h3>
              <p className="text-3xl font-bold text-green-500">345</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-2">Hires This Month</h3>
              <p className="text-3xl font-bold text-purple-500">7</p>
            </div>
          </div>
        </section>

        {/* Employee Directory */}
        <section>
          <h2 className="text-xl font-bold mb-4">Employee Directory</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 mb-2">Quick access to employee details and contacts.</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              onClick={() => navigate("/employee-directory")}
            >
              View Directory
            </button>
          </div>
        </section>

        {/* Upcoming Events/Deadlines */}
        <section>
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Quarterly HR Meeting</h3>
              <p className="text-gray-500">Date: 20th November, 2024</p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-2">Deadline: Employee Surveys</h3>
              <p className="text-gray-500">Due: 25th November, 2024</p>
            </div>
          </div>
        </section>

        {/* Performance Insights */}
        <section>
          <h2 className="text-xl font-bold mb-4">Performance Insights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-2">Hiring Goals</h3>
              <p className="text-gray-600">85% of monthly hiring target achieved</p>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-lg font-bold mb-2">Team Productivity</h3>
              <p className="text-gray-600">Collaborations on 10+ active projects</p>
            </div>
          </div>
        </section>

        {/* Team Collaboration */}
        <section>
          <h2 className="text-xl font-bold mb-4">Team Collaboration</h2>
          <div className="bg-white p-6 rounded shadow-md">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Assign and collaborate on HR-related tasks.</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                onClick={() => navigate("/collaboration-tools")}
              >
                Collaborate
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HrPage;
