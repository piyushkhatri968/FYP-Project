import React from "react";
import { Link } from "react-router-dom";

const AdminDash = ({ totalUsers }) => {
  console.log(totalUsers);
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
  return (
    <div
      className="w-full mt-6 flex flex-col rounded-md overflow-hidden bg-[#414141] p-4"
      style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div
          className="w-full rounded-md overflow-hidden bg-[#515151] font-semibold text-lg items-center p-4 flex justify-between"
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)" }}
        >
          <span>Users</span>
          <span className="text-2xl">{totalUser}</span>
        </div>
        <div
          className="w-full rounded-md overflow-hidden bg-[#515151] font-semibold text-lg items-center p-4 flex justify-between"
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)" }}
        >
          <span>Admins</span>
          <span className="text-2xl">{totalAdmins}</span>
        </div>
        <div
          className="w-full rounded-md overflow-hidden bg-[#515151] font-semibold text-lg items-center p-4 flex justify-between"
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)" }}
        >
          <span>Employees</span>
          <span className="text-2xl">{totalEmployees}</span>
        </div>
        <div
          className="w-full rounded-md overflow-hidden bg-[#515151] font-semibold text-lg items-center p-4 flex justify-between"
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)" }}
        >
          <span>Recruiters</span>
          <span className="text-2xl">{totalRecruiters}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
