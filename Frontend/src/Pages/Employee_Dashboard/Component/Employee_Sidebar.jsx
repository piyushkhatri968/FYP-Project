import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Employee_Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="w-96 bg-white shadow-lg rounded-xl p-6 px-12">
      {/* Profile Section */}
      <div className="text-center">
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h3 className="text-xl font-bold mt-4">John Smith</h3>
        <p className="text-gray-500">Web Developer</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard/employee?tab=profile"
              className="flex items-center gap-3 px-4 py-2 text-red-600 bg-red-100 rounded-lg font-semibold"
            >
              <i className="fas fa-user"></i>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/resume"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-file"></i>
              My Resume
            </Link>
          </li>
          <li>
            <Link
              to="/applied-jobs"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-briefcase"></i>
              Applied Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/messages"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-envelope"></i>
              Messages
            </Link>
          </li>
          <li>
            <Link
              to="/saved-jobs"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-heart"></i>
              Saved Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/change-password"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-lock"></i>
              Change Password
            </Link>
          </li>
          <li>
            <Link
              to="/delete-account"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-trash"></i>
              Delete Account
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-sign-out-alt"></i>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Employee_Sidebar;
