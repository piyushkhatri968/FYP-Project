import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const HRNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#010C29] text-white">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-20 h-[5rem]">
        {/* Logo */}
        <div className="logo">
          <Link to="/hr/dashboard" className="text-xl font-bold">
            Logo
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className="text-2xl md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Navbar Links for Larger Screens */}
        <ul className="hidden md:flex gap-10 items-center">
          <li className="hover:bg-[#070e1f] px-4 py-2 rounded">
            <Link to="/hr/dashboard" className="font-semibold">
              Dashboard
            </Link>
          </li>
         
          <li className="hover:bg-[#070e1f] px-4 py-2 rounded">
            <Link to="/hr/account-settings" className="font-semibold">
              Profile Settings
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-semibold bg-[#ce2f2f] py-2 px-4 rounded-md hover:bg-[#b82828]"
            >
              Sign up / Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <ul className="flex flex-col gap-4 bg-[#010C29] px-4 py-6 md:hidden">
          <li className="hover:bg-[#070e1f] px-4 py-2 rounded">
            <Link to="/hr/dashboard" className="font-semibold">
              Dashboard
            </Link>
          </li>
          <li className="hover:bg-[#070e1f] px-4 py-2 rounded">
            <Link to="/hr/dashboard" className="font-semibold">
             Logo
            </Link>
          </li>
          <li className="hover:bg-[#070e1f] px-4 py-2 rounded">
            <Link to="/hr/account-settings" className="font-semibold">
              Profile Settings
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="font-semibold bg-[#ce2f2f] py-2 px-4 rounded-md hover:bg-[#b82828]"
            >
              Sign up / Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default HRNavbar;
