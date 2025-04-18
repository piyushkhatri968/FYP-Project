import React from "react";
import { FaGear } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { useSelector } from "react-redux";
import { IoMdPerson } from "react-icons/io";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    <div
      className="w-full mt-6 flex flex-col justify-between rounded-md overflow-hidden bg-[#414141] gap-12"
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
    >
      <div>
        <Link
          to="/dashboard/admin?tab=adminDash"
          className={`hover:bg-[#515151] w-full px-4 py-2 font-medium text-lg transition-all duration-200 flex items-center gap-2 ${
            location.pathname === "/profile" &&
            location.search === "?tab=adminDash"
              ? "text-[#00B79E]"
              : null
          }`}
        >
          <span className="bg-[#515151] p-2 rounded-full">
            <MdDashboard />
          </span>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/dashboard/admin?tab=allEmployees"
          className={`hover:bg-[#515151] w-full px-4 py-2 font-medium text-lg transition-all duration-200 flex items-center gap-2 ${
            location.pathname === "/profile" &&
            location.search === "?tab=allEmployees"
              ? "text-[#00B79E]"
              : null
          }`}
        >
          <span className="bg-[#515151] p-2 rounded-full">
            <IoMdPerson />
          </span>
          <span>Employees</span>
        </Link>
        <Link
          to="/dashboard/admin?tab=allRecruiter"
          className={`hover:bg-[#515151] w-full px-4 py-2 font-medium text-lg transition-all duration-200 flex items-center gap-2 ${
            location.pathname === "/profile" &&
            location.search === "?tab=allRecruiter"
              ? "text-[#00B79E]"
              : null
          }`}
        >
          <span className="bg-[#515151] p-2 rounded-full">
            <IoMdPerson />
          </span>
          <span>Recruiters</span>
        </Link>
        <Link
          to="/dashboard/admin?tab=alladmins"
          className={`hover:bg-[#515151] w-full px-4 py-2 font-medium text-lg transition-all duration-200 flex items-center gap-2 ${
            location.pathname === "/profile" &&
            location.search === "?tab=alladmins"
              ? "text-[#00B79E]"
              : null
          }`}
        >
          <span className="bg-[#515151] p-2 rounded-full">
            <IoMdPerson />
          </span>
          <span>Admins</span>
        </Link>
        <Link
          to="/dashboard/admin?tab=addNewAdmin"
          className={`hover:bg-[#515151] w-full px-4 py-2 font-medium text-lg transition-all duration-200 flex items-center gap-2 ${
            location.pathname === "/profile" &&
            location.search === "?tab=addNewAdmin"
              ? "text-[#00B79E]"
              : null
          }`}
        >
          <span className="bg-[#515151] p-2 rounded-full">
            <GrUserAdmin />
          </span>
          <span>Add New Admin</span>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="pl-4 py-2 text-2xl font-medium">
            {currentUser?.username}
          </h1>
          <p className="bg-[#303030] py-1 px-2 rounded-full text-[11px]">
            Admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
