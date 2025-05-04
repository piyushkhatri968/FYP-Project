import React, { useState } from "react";
import HRSidebar from "./HRSidebar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import HRNavbar from "./HrNavbar.jsx";

const HRLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      {/* Navbar at the top */}
      <HRNavbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Sidebar and main content */}
      <div className="flex pt-0">
        <HRSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />
        </main>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default HRLayout;
