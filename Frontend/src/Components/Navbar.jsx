import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SignOut from "../Pages/Authentication/SignOut";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobilenav, setMobilenav] = useState(false);
  const [jobsDropdown, setJobsDropdown] = useState(false);

  const location = useLocation();

  const handleProfileModal = () => {
    setOpenProfileModal(!openProfileModal);
  };

  // NAVBAR SMOOTH SCROLL

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleMobileNav = () => {
    setMobilenav(!mobilenav);
    setJobsDropdown(false);
  };

  const handleJobsDropdown = () => {
    setJobsDropdown(!jobsDropdown);
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav
        className={`desktop-nav px-4 sm:px-8 fixed top-0 md:px-12 lg:px-20 bg-[#010C29] text-white navbar-container ${
          showNavbar ? "visible" : "hidden"
        }`}
      >
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <div>
          <ul className="flex gap-10">
            {/* ABOUT */}
            <li>
              <Link
                to="/about"
                className={`font-semibold hover:text-red-600 ${
                  location.pathname === "/about" ? "text-red-600" : ""
                }`}
              >
                About
              </Link>
            </li>
            {/* JOBS */}
            <li className="navbar-group font-semibold flex items-center gap-2 cursor-pointer relative hover:text-red-600">
              <span>Jobs</span>
              <span>
                <IoIosArrowDown className="text-md" />
              </span>
              {/* Dropdown menu */}
              <ul className="navbar-group-part absolute w-[15rem] mt-3 -left-4 top-full z-10 bg-[#061742] text-white shadow-lg hidden">
                {/* FIND A JOB */}
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
            {/* CONTACT US  */}
            <li>
              <Link
                to="/contact"
                className={`font-semibold hover:text-red-600 ${
                  location.pathname === "/contact" ? "text-red-600" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              {/* <Link
                to="/hr/dashboard"
                className={`font-semibold ${
                  location.pathname === "/hr-home" ? "text-red-600" : ""
                }`}
              >
                HR-Dashboard
              </Link> */}
            </li>
          </ul>
        </div>
        {currentUser ? (
          <div className="relative">
            <div onClick={handleProfileModal} className="w-11 h-11">
              <img
                draggable="false"
                src={currentUser.profilePicture}
                alt="user profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div>
              {openProfileModal && (
                <div className="absolute top-14 -left-20 bg-[#374151] w-[12.5vw] text-center border-t-2 rounded-lg">
                  <p>{currentUser && currentUser.name}</p>
                  <p>{currentUser && currentUser.email}</p>
                  <hr className="my-2" />
                  <Link
                    onClick={() => setOpenProfileModal(false)}
                    to={
                      currentUser.userType === "recruiter"
                        ? "/hr/dashboard"
                        : currentUser.userType === "employee"
                        ? "dashboard/employee?tab=dashboard"
                        : currentUser.userType === "admin"
                        ? "dashboard/admin"
                        : null
                    }
                  >
                    Profile
                  </Link>

                  <hr className="my-2" />
                  <div onClick={() => setOpenProfileModal(false)}>
                    <SignOut />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link
              to="/signup"
              className="font-semibold hover:text-[#ce2f2f] transition-all duration-500"
            >
              Sign Up
            </Link>
            <Link
              to="signin"
              className="font-semibold bg-[#ce2f2f] py-2 px-4 rounded-md hover:text-black hover:bg-white transition-all duration-500"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>

      {/* MOBILE NAVBAR */}

      <div className="mobile-nav hidden fixed z-40 top-0 w-full h-16 justify-between px-4 items-center bg-[#010C29] text-white">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <div className="dropdown relative">
          <span onClick={handleMobileNav}>
            {mobilenav ? (
              <IoCloseSharp className="text-3xl" />
            ) : (
              <GiHamburgerMenu className="text-3xl" />
            )}
          </span>
          {/* DROPDOWN MENU */}
          <div
            className={`dropdown-menu absolute z-30 top-11 -right-4 w-[100vw] h-[51vh] bg-white text-gray-500 overflow-y-auto hide-scrollbar ${
              mobilenav ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col justify-center gap-[15px] mt-4">
              <li
                className="flex items-center justify-between px-8"
                onClick={() => setMobilenav(!mobilenav)}
              >
                <span>
                  <Link to="/">Home</Link>
                </span>
                <span>
                  <FaPlus />
                </span>
              </li>
              <hr />
              <li
                className="flex items-center justify-between px-8"
                onClick={() => setMobilenav(!mobilenav)}
              >
                <span>
                  <Link to="/about">About</Link>
                </span>
                <span>
                  <FaPlus />
                </span>
              </li>
              <hr />
              {/* Jobs with nested dropdown */}
              <li className="relative flex flex-col px-8">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={handleJobsDropdown}
                >
                  <span>Jobs</span>
                  <span>{jobsDropdown ? <FaMinus /> : <FaPlus />}</span>
                </div>
                <div
                  className={`flex flex-col px-4 ml-4 mt-4 gap-4 ${
                    jobsDropdown ? "block" : "hidden"
                  }`}
                >
                  <hr />
                  <Link
                    to="/find-job"
                    className="text-sm"
                    onClick={() => setMobilenav(!mobilenav)}
                  >
                    Find A Job
                  </Link>
                  <hr />
                  <Link
                    to="/post-job"
                    className="text-sm"
                    onClick={() => setMobilenav(!mobilenav)}
                  >
                    Post A Job
                  </Link>
                </div>
              </li>
              <hr />
              <li className="flex items-center justify-between px-8">
                <span>
                  <Link to="/contact" onClick={() => setMobilenav(!mobilenav)}>
                    Contact Us
                  </Link>
                </span>
                <span>
                  <FaPlus />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
