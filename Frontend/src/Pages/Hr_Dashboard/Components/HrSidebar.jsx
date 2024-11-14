// src/components/HRSidebar.js
import React from "react";
import { Link } from "react-router-dom";

const HRSidebar = () => {
  return (
    <aside className="w-[250px] bg-[#061742] text-white h-screen p-6">
      <ul className="space-y-4">
        <li className="font-semibold text-lg">
          <Link to="/hr/manage-jobs">Manage Job Listings</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/hr/application-tracking">Application Tracking</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/hr/candidate-profiles">Candidate Profiles</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/hr/shortlisted-candidates">Shortlisted Candidates</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/hr/account-settings">Account Settings</Link>
        </li>
        <li className="font-semibold text-lg">
          <Link to="/hr/notification-settings">Notification Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default HRSidebar;
