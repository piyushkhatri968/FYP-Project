import React from "react";
import { useNavigate } from "react-router-dom";

const HrPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gray-100">
     
      {/* Main Content */}
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
              className="bg-blue-500 text-white p-4 rounded shadow-lg hover:bg-blue-600 flex items-center justify-center"
              onClick={() => navigate("/job-notification")}
            >
              Post a Job
            </button>
            <button
              className="bg-green-500 text-white p-4 rounded shadow-lg hover:bg-green-600 flex items-center justify-center"
              onClick={() => navigate("/manage-jobs")}
            >
              Manage Jobs
            </button>
            <button
              className="bg-purple-500 text-white p-4 rounded shadow-lg hover:bg-purple-600 flex items-center justify-center"
              onClick={() => navigate("/candidate-profiles")}
            >
              View Applications
            </button>
          </div>
        </section>

        {/* Analytics Section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-2">Active Jobs</h3>
              <p className="text-3xl font-bold text-blue-500">12</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-2">Applications Received</h3>
              <p className="text-3xl font-bold text-green-500">345</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-bold mb-2">Hires This Month</h3>
              <p className="text-3xl font-bold text-purple-500">7</p>
            </div>
          </div>
        </section>

       {/* Tasks Overview */}
<section>
  <h2 className="text-xl font-bold mb-4">Tasks Overview</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Task Card 1 */}
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 flex items-center space-x-4">
      <div className="text-blue-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">Review Applications</h3>
        <p className="text-sm text-gray-500">"Software Engineer"</p>
      </div>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        onClick={() => navigate("/view-applications")}
      >
        Review
      </button>
    </div>

    {/* Task Card 2 */}
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 flex items-center space-x-4">
      <div className="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 7H7v6h6V7z" />
          <path
            fillRule="evenodd"
            d="M5 4a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5zm0 2h10v8H5V6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">Schedule Interviews</h3>
        <p className="text-sm text-gray-500">"Product Manager"</p>
      </div>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        onClick={() => navigate("/view-applications")}
      >
        Schedule
      </button>
    </div>
  </div>
</section>

{/* Recent Activity */}
<section>
  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
    {/* Activity Item 1 */}
    <div className="flex items-start space-x-3">
      <div className="bg-blue-500 p-2 rounded-full text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v10H5V5z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium text-gray-800">You posted a new job:</span> "UI/UX Designer"
        </p>
        <p className="text-xs text-gray-400">5 minutes ago</p>
      </div>
    </div>

    {/* Activity Item 2 */}
    <div className="flex items-start space-x-3">
      <div className="bg-green-500 p-2 rounded-full text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 4a1 1 0 00-1 1v3H5a1 1 0 000 2h2v3a1 1 0 002 0v-3h2a1 1 0 000-2H9V5a1 1 0 00-1-1z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium text-gray-800">20 new applications</span> were received for "Software Engineer"
        </p>
        <p className="text-xs text-gray-400">10 minutes ago</p>
      </div>
    </div>

    {/* Activity Item 3 */}
    <div className="flex items-start space-x-3">
      <div className="bg-purple-500 p-2 rounded-full text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 3a1 1 0 00-.707.293l-5 5a1 1 0 001.414 1.414L10 5.414l4.293 4.293a1 1 0 001.414-1.414l-5-5A1 1 0 0010 3z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium text-gray-800">You hired a candidate</span> for "Backend Developer"
        </p>
        <p className="text-xs text-gray-400">1 hour ago</p>
      </div>
    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default HrPage;
