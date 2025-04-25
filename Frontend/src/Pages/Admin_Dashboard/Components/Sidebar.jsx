import React from "react";
import { FaGear, FaUserPlus, FaUserTie } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { useSelector } from "react-redux";
import { IoIosSettings, IoMdPerson } from "react-icons/io";
import defaultImage from "../../../assets/Images/Avatar.png";
import { LiaUserTagSolid } from "react-icons/lia";

const Sidebar = ({ userData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <div className="md:w-96 bg-white shadow-lg mx-auto rounded-xl p-6">
      {/* Profile Section */}
      <div className="text-center mx-auto">
        <img
          draggable="false"
          src={userData?.profilePicture || defaultImage}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[lightgray]"
        />
        <h3 className="text-xl md:text-2xl font-bold mt-4 text-black">
          {userData?.name}
        </h3>
        <p className="text-gray-500">{userData?.userType || "Admin"}</p>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <ul>
          <li>
            <Link
              to="/dashboard/admin?tab=adminDash"
              className={`${
                location.pathname === "/dashboard/admin" &&
                location.search === "?tab=adminDash"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <span className="p-2 rounded-full">
                <MdDashboard size={20} />
              </span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin?tab=allEmployees"
              className={`${
                location.pathname === "/dashboard/admin" &&
                location.search === "?tab=allEmployees"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <span className="p-2 rounded-full">
                <FaUserTie size={20}/>
              </span>
              <span>Employees</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin?tab=allRecruiter"
              className={`${
                location.pathname === "/dashboard/admin" &&
                location.search === "?tab=allRecruiter"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <span className="p-2 rounded-full">
                <LiaUserTagSolid size={20}/>
              </span>
              <span>Recruiters</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin?tab=alladmins"
              className={`${
                location.pathname === "/dashboard/admin" &&
                location.search === "?tab=alladmins"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <span className="p-2 rounded-full">
                <GrUserAdmin size={20}/>
              </span>
              <span>Admins</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/admin?tab=addNewAdmin"
              className={`${
                location.pathname === "/dashboard/admin" &&
                location.search === "?tab=addNewAdmin"
                  ? "text-white bg-[#FD1616] font-bold"
                  : null
              } flex items-center gap-3 px-8 py-3 text-gray-600 border-t-2 border-dashed border-gray-100 hover:text-white hover:bg-[#FD1616] transition-all duration-300`}
            >
              <span className="p-2 rounded-full">
                <FaUserPlus size={20}/>
              </span>
              <span>Add New Admin</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
