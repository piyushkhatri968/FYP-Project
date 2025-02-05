import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import defaultImage from "../../../assets/Images/Avatar.png"

const Sidebar = ({ userData }) => {
  const location = useLocation();
  return (
    <div className="md:w-96 bg-white shadow-lg mx-auto rounded-xl p-6">
      {/* Profile Section */}
      <div className="text-center mx-auto">
        <img
          draggable="false"
          src={userData.profilePicture || defaultImage}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[lightgray]"
        />
        <h3 className="text-xl md:text-2xl font-bold mt-4">{userData.name}</h3>
        <p className="text-gray-500">{userData.candidateDetails?.position || ""}</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              to="/dashboard/employee?tab=dashboard"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=dashboard"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-user"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=profile"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=profile"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-user"></i>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/resume"
              className={`flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-file"></i>
              My Resume
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=appliedjobs"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=appliedjobs"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-briefcase"></i>
              Applied Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=trackapplication"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=trackapplication"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-briefcase"></i>
              Application Tracking
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=suggestedjobs"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=suggestedjobs"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-7 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <FaLightbulb className="text-xl" />
              Suggested Jobs
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=messages"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=messages"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-envelope"></i>
              Messages
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/employee?tab=saved-jobs"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=saved-jobs"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-heart"></i>
              Saved Jobs
            </Link>
          </li>
          {/* <li>
            <Link
              to="/dashboard/employee?tab=change-password"
              className={`${
                location.pathname === "/dashboard/employee" &&
                location.search === "?tab=change-password"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
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
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
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
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <i className="fas fa-sign-out-alt"></i>
              Log Out
            </Link>
          </li> */}
          <li>
            <Link
              to="/dashboard/employee?tab=account-settings"
              className={`${location.pathname === "/dashboard/employee" &&
                  location.search === "?tab=account-settings"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
                } flex items-center gap-3 px-7 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <IoIosSettings className="text-xl" />
              Account Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
