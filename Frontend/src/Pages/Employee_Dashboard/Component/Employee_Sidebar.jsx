import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <div className="w-96 bg-white shadow-2xl rounded-xl p-6 md:ml-12">
      {/* Profile Section */}
      <div className="text-center">
        <img
          src={currentUser.profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h3 className="text-xl md:text-2xl font-bold mt-4">{currentUser.name}</h3>
        <p className="text-gray-500">Web Developer</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              to="/dashboard/employee?tab=profile"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=profile"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-user"></i>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=resume"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=resume"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-file"></i>
              My Resume
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=appliedjobs"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=appliedjobs"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-briefcase"></i>
              Applied Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=messages"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=messages"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-envelope"></i>
              Messages
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=saved-jobs"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=saved-jobs"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-heart"></i>
              Saved Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=change-password"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=change-password"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-lock"></i>
              Change Password
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=delete-account"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=delete-account"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-trash"></i>
              Delete Account
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=logout"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=logout"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-4 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
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

export default Sidebar;
