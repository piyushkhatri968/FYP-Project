// src/components/HRNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const HRNavbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 bg-[#010C29] text-white h-[5rem]">
      <div className="logo">
        <Link to="/hr/dashboard" className="text-xl font-bold">Logo</Link>
      </div>
      <div>
        <ul className="flex gap-10 items-center">
          <li className="hover:bg-[#070e1f] px-4 py-2 rounded">
            <Link to="/hr-home" className="font-semibold">Dashboard</Link>
          </li>
          {/* <li className="font-semibold flex items-center gap-2 cursor-pointer relative group hover:bg-[#070e1f] px-4 py-2 rounded">
            <span>Jobs</span>
            <IoIosArrowDown className="text-md" />
            <ul className="absolute w-[12rem] mt-3 left-0 top-full z-10 bg-[#061742] text-white shadow-lg hidden group-hover:block">
              <li>
                <Link to="/hr/post-job" className="text-sm block px-4 py-2 font-normal hover:bg-[#657294]">Post a Job</Link>
              </li>
              <li>
                <Link to="/hr/view-jobs" className="text-sm block px-4 py-2 font-normal hover:bg-[#657294]">View All Jobs</Link>
              </li>
            </ul>
          </li> */}
          <li className="hover:bg-[#070e1f] px-4 py-2 rounded">
            <Link to="/account-settings" className="font-semibold">Profile Settings</Link>
          </li>
          <li>
            <Link to="/" className="font-semibold bg-[#ce2f2f] py-2 px-4 rounded-md hover:bg-[#b82828]">Sign up / Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HRNavbar;
