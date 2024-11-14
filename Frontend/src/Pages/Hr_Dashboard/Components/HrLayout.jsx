// src/components/HRLayout.js
import React from "react";
import HRNavbar from "./HRNavbar";
import HRSidebar from "./HRSidebar";
import { Outlet } from "react-router-dom";

const HRLayout = () => {
  return (
    <div>
      {/* Navbar at the top */}
      <HRNavbar />

      {/* Sidebar and main content */}
      <div className="flex pt-[0rem]"> {/* Offset by navbar height */}
        <HRSidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet /> {/* Renders the nested route */}
        </main>
      </div>
    </div>
  );
};

export default HRLayout;
