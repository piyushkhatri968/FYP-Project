import React from "react";
import { FaUsers, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const JobRecruitment = () => {
  return (
    <div className="max-w-[85vw] mx-auto my-10">
      {/* Responsive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Card */}
        <div className="bg-[#FD1616] rounded-lg h-[11rem] px-6 flex items-center gap-4">
          <div>
            <FaUsers className="text-5xl text-red-700 bg-white p-2 rounded-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Looking For a Job</h1>
            <p className="text-base my-2 text-white">
              Your next role could be with one of these top leading
              organizations
            </p>
            <Link to="find-job" className="text-white underline hover:text-[#010C29] hover:text-[17px] transition-all duration-500">
              Apply Now &raquo;
            </Link>
          </div>
        </div>

        {/* Second Card */}
        <div className="bg-[#010C29] rounded-lg h-[11rem] px-6 flex items-center gap-4">
          <div>
            <FaClipboardList className="text-5xl text-blue-900 bg-white p-2 rounded-full" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Are You Recruiting?
            </h2>
            <p className="text-base my-2 text-white">
              Your next role could be with one of these top leading
              organizations
            </p>
            <Link className="text-white underline hover:text-[#FD1616] hover:text-[17px] transition-all duration-500">
              Apply Now &raquo;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRecruitment;
