import React from 'react'

import { FaBriefcase, FaFileAlt, FaUsers, FaClipboardCheck } from "react-icons/fa";
function Stats() {
  const stats = [
    { icon: <FaFileAlt />, value: "1225", label: "Job Posted" },
    { icon: <FaClipboardCheck />, value: "145", label: "Job Filled" },
    { icon: <FaBriefcase />, value: "170", label: "Company" },
    { icon: <FaUsers />, value: "125", label: "Members" },
  ];

  return (
    <div className="bg-[#0a1128] py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-red-600 text-5xl mb-4">{stat.icon}</div>
            <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            <p className="text-white text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;