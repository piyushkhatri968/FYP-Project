import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HrSidebar from "../HRSidebar";

import JobsPage from "../../Pages/job/JobsPage";
import ApplicationTracking from "../../Pages/job/ApplicationTracking";
import ShortlistCandidates from "../../Pages/job/ShortListCandidates";
import CandidateApplications from "../../Pages/job/CandidateApplications";
import JobAnalytics from "../../Pages/job/JobAnalytics";
import AccountSetting from "../../Pages/job/AccountSetting";
import NotificationSettings from "../../Pages/job/NotificationSettings";
import JobNotification from "../../Pages/JobNotification/JobNotification";
import InterviewScheduling from "../../Pages/job/InterviewScheduling";
import EmployeeAnnouncement from "../../Pages/job/EmployeeAnnouncement";
import HRNavbar from "../HRNavbar";
import Footer from "../Footer";
import HrPage from './../../HrPage';

const Hrdashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");

  
    
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search || location.pathname])
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <HRNavbar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row gap-8 my-16 md:mt-8 px-4">
        {/* Sidebar */}
        <div className="w-80 md:w-96">
          <HrSidebar />
        </div>

        {/* Main Content Based on 'tab' */}
        <div className="flex-1">
          {tab === "dashboard" && <HrPage />}
          {tab === "manage-jobs" && <JobsPage />}
          {tab === "application-tracking" && <ApplicationTracking />}
          {tab === "shortlisted-candidates" && <ShortlistCandidates />}
          {tab === "candidate-profiles" && <CandidateApplications />}
          {tab === "job-analytics" && <JobAnalytics />}
          {tab === "account-settings" && <AccountSetting />}
          {tab === "notification-settings" && <NotificationSettings />}
          {tab === "job-notification" && <JobNotification />}
          {tab === "schedule-interview" && <InterviewScheduling />}
          {tab === "employment-announcements" && <EmployeeAnnouncement />}
          {/* Fallback for invalid tab */}
          {!tab && <div className="text-center text-gray-500">Please select a valid tab from the sidebar.</div>}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Hrdashboard;
