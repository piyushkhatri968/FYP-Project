import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // For animations

const HrSidebar = () => {
  const location = useLocation();

  // Animation settings for the menu items
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <aside className="w-[250px] bg-[#061742] text-white h-screen flex flex-col justify-between p-6 shadow-lg overflow-y-auto sticky top-0">
      {/* Sidebar Header */}
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
            // { name: "Account Setting", path: "/account-settings" },
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

      {/* Logout Button */}
      <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-full font-bold transition duration-300">
        Logout
      </button>
    </aside>
  );
};

export default HrSidebar;
