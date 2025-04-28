import React from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { RiUserCommunityFill } from "react-icons/ri";

const AdminDash = ({ totalUsers, jobs }) => {
  const totalUser = totalUsers?.length;
  const totalEmployees = totalUsers?.filter(
    (user) => user.userType === "employee"
  ).length;
  const totalRecruiters = totalUsers?.filter(
    (user) => user.userType === "recruiter"
  ).length;
  const totalAdmins = totalUsers?.filter(
    (user) => user.userType === "Admin"
  ).length;
  const totalJobs = jobs;
  return (
    <div className="mx-auto p-3 px-12 w-full shadow-lg rounded-xl">
      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform">
            <div className="flex flex-col items-center">
              <FaUsers size={32} className="mb-3" />
              <span className="font-semibold text-xl">Users</span>
            </div>
            <div className="text-3xl font-semibold">{totalUser}</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform">
            <div className="flex flex-col items-center">
              <FaUserTie size={32} className="mb-3" />
              <span className="font-semibold text-xl">Employees</span>
            </div>
            <div className="text-3xl font-semibold">{totalEmployees}</div>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-purple-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform">
            <div className="flex flex-col items-center">
              <RiUserCommunityFill size={32} className="mb-3" />
              <span className="font-semibold text-xl">Recruiters</span>
            </div>
            <div className="text-3xl font-semibold">{totalRecruiters}</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform">
            <div className="flex flex-col items-center">
              <GrUserAdmin size={32} className="mb-3" />
              <span className="font-semibold text-xl">Admins</span>
            </div>
            <div className="text-3xl font-semibold">{totalAdmins}</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-6 rounded-lg shadow-md hover:shadow-lg flex items-center justify-between transition transform">
            <div className="flex flex-col items-center">
              <FaClipboardList size={32} className="mb-3" />
              <span className="font-semibold text-xl">Jobs Posted</span>
            </div>
            <div className="text-3xl font-semibold">{totalJobs}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDash;
