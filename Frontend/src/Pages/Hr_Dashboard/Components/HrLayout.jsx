// src/components/HRLayout.js
import React from "react";
import HRNavbar from "./HrNavbar";
import HRSidebar from "./HrSidebar";
import { Outlet } from "react-router-dom";

const HRLayout = () => {
  return (
    <div className="flex">
      <HRSidebar />
      <div className="flex-1">
        <HRNavbar />
        <main>
          <Outlet /> {/* Renders the nested route */}
        </main>
      </div>
    </div>
  );
};

export default HRLayout;
