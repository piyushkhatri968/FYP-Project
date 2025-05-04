import React from "react";
import { Link } from "react-router-dom";

const HRNavbar = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-[#010C29] text-white h-[5rem] flex items-center px-4 sm:px-8 md:px-12 lg:px-20">
      
      {/* DESKTOP LOGO on the LEFT */}
      <div className="hidden md:block">
        <Link to="/" className="text-xl font-bold">
          Logo
        </Link>
      </div>

      {/* RIGHT SIDE: on mobile shows Logo + Profile + Logout; on desktop just Profile + Logout */}
      <div className="flex items-center ml-auto gap-4">
        {/* mobile-only Logo */}
        <Link to="/" className="text-xl font-bold md:hidden">
          Logo
        </Link>

        <Link
          to="/hr/profile"
          className="font-semibold hover:bg-[#070e1f] px-3 py-2 rounded"
        >
          Profile
        </Link>
        <Link
          to="/"
          className="font-semibold bg-[#ce2f2f] py-2 px-4 rounded-md hover:bg-[#b82828]"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default HRNavbar;
