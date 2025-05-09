import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

const HrSidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <>
   
    {!isSidebarOpen && (
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 text-white text-2xl z-40 bg-[#010C29] p-2 rounded-md"
      >
        <HiMenu />
      </button>
    )}
  
    {/* Sidebar */}
    <aside
      className={`fixed top-0 left-0 h-full bg-[#061742] text-white w-[250px] shadow-lg p-6 z-30 transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:static md:h-auto md:flex md:w-[250px]`}
    >
      <div className="mb-9 relative">
       
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-0 right-0 text-white text-2xl z-40 bg-[#010C29] p-2 rounded-md"
        >
          <HiX />
        </button>
  
        {/* Sidebar Title */}
        <h1 className="text-3xl font-bold text-start text-white mb-4 mt-0 md:mt-0">
          HR Portal
        </h1>
  
        {/* Sidebar Links */}
        <ul className="space-y-4">
          {[
            { name: "Dashboard", path: "/hr/dashboard" },
            { name: "Post a Job", path: "/hr/job-notification" },
            { name: "Manage Jobs", path: "/hr/manage-jobs" },
            { name: "View Applications", path: "/hr/candidate-profiles" },
            { name: "Application Tracking", path: "/hr/application-tracking" },
            { name: "Shortlist Candidates", path: "/hr/shortlisted-candidates" },
            { name: "Notification Settings", path: "/hr/notification-settings" },
          ].map((item, index) => (
            <motion.li
              key={item.path}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              className={`p-3 rounded-lg hover:bg-red-500 ${
                location.pathname === item.path ? "bg-red-600" : ""
              }`}
            >
              <Link
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="block font-semibold"
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </aside>
  </>
  );
};

export default HrSidebar;
