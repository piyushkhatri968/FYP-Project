import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openProfileModal, setProfileOpenModal] = useState(false);
  const location = useLocation();

  const handleProfileModal = () => {
    setProfileOpenModal(!openProfileModal);
  };

  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 bg-[#010C29] text-white h-[5rem] fixed z-20 w-full">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div>
        <ul className="flex gap-10">
          <li>
            <Link
              to="/about"
              className={`font-semibold ${
                location.pathname === "/about" ? "text-red-600" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li className=" navbar-group font-semibold flex items-center gap-2 cursor-pointer relative">
            <span>Jobs</span>
            <span>
              <IoIosArrowDown className="text-md" />
            </span>
            {/* Dropdown menu */}
            <ul className="navbar-group-part absolute w-[15rem] mt-3 -left-4 top-full z-10 bg-[#061742] text-white shadow-lg hidden">
              <li>
                <Link
                  to="/find-job"
                  className={`text-sm block px-4 py-2 font-normal text-white hover:bg-[#657294] border-b border-dashed border-gray-600 ${
                    location.pathname === "/find-job" ? "bg-[#657294]" : ""
                  }`}
                >
                  Find A Job
                </Link>
              </li>
              <li>
                <Link
                  to="/post-job"
                  className="text-sm block px-4 py-2 font-normal text-white hover:bg-[#657294]"
                >
                  Post A Job
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/contact"
              className={`font-semibold ${
                location.pathname === "/contact" ? "text-red-600" : ""
              }`}
            >
              Contact Us
            </Link>
          </li>
          <li>
          <Link
              to="/hr"
              className={`font-semibold ${
                location.pathname === "/hr" ? "text-red-600" : ""
              }`}
            >
              HR-Dashboard
            </Link>
          </li>
        </ul>
      </div>
      {currentUser ? (
        <div>
          <img
            src={currentUser.profilePicture}
            alt="user profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link to="/signup" className="font-semibold">
            Sign Up
          </Link>
          <Link
            to="signin"
            className="font-semibold bg-[#ce2f2f] py-2 px-4 rounded-md"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
