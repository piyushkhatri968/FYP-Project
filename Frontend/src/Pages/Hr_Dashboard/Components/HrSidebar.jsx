// src/components/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[250px] bg-[#061742]  text-white h-screen p-6">
      <ul className="space-y-4">
        <li className="hover:bg-[red] p-2 rounded">
          <Link
            to="/manage-jobs"
            className={`font-semibold ${
              location.pathname === "/manage-jobs" ? "text-red-600" : ""
            }`}
          >
            Manage Job Listings
          </Link>
        </li>
        <li className="hover:bg-[red] p-2 rounded">
          <Link
            to="/application-tracking"
            className={`font-semibold ${
              location.pathname === "/application-tracking" ? "text-red-600" : ""
            }`}
          >
            Application Tracking
          </Link>
        </li>
        <li className="hover:bg-[red] p-2 rounded">
          <Link
            to="/candidate-profiles"
            className={`font-semibold ${
              location.pathname === "/candidate-profiles" ? "text-red-600" : ""
            }`}
          >
            Candidate Profiles
          </Link>
        </li>
        <li className="hover:bg-[red] p-2 rounded">
          <Link
            to="/job-analytics"
            className={`font-semibold ${
              location.pathname === "/job-analytics" ? "text-red-600" : ""
            }`}
          >
            Analytics
          </Link>
        </li>

        <li className="hover:bg-[red] p-2 rounded">
          <Link
            to="/shortlisted-candidates"
            className={`font-semibold ${
              location.pathname === "/shortlisted-candidates" ? "text-red-600" : ""
            }`}
          >
            Shortlisted Candidates
          </Link>
        </li>
        <li className="hover:bg-[red] p-2 rounded">
          <Link
            to="/account-settings"
            className={`font-semibold ${
              location.pathname === "/account-settings" ? "text-red-600" : ""
            }`}
          >
            Account Settings
          </Link>
        </li>
        <li className="hover:bg-[red] p-2 rounded">
          <Link
            to="/notification-settings"
            className={`font-semibold ${
              location.pathname === "/notification-settings" ? "text-red-600" : ""
            }`}
          >
            Notification Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
