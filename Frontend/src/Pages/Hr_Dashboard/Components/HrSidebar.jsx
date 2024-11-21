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
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 text-white text-2xl z-20 bg-[#010C29] p-2 rounded-md"
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#061742] text-white w-[250px] shadow-lg p-6 z-10 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:h-auto md:flex md:w-[250px]`}
      >
        <div className="mb-9">
          <h1 className="text-3xl font-bold text-start text-white mb-4">
            HR Portal
          </h1>
          <ul className="space-y-4">
            {[
              { name: "Dashboard", path: "/hr-home" },
              { name: "Post a Job", path: "/job-notification" },
              { name: "Manage Jobs", path: "/manage-jobs" },
              { name: "View Applications", path: "/candidate-profiles" },
              { name: "Application Tracking", path: "/application-tracking" },
              { name: "Shortlist Candidates", path: "/shortlisted-candidates" },
              { name: "Job Analytics", path: "/job-analytics" },
              { name: "Notification Settings", path: "/notification-settings" },
              { name: "Announcements", path: "/employment-announcements" },
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
                <Link to={item.path} className="block font-semibold">
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full font-bold transition duration-300">
          Logout
        </button> */}
      </aside>
    </>
  );
};

export default HrSidebar;
