import React from "react";
import { Route } from "react-router-dom";

// Import all the required HR pages and layouts
import HRLayout from "../Components/HrLayout";
import HrPage from "../HrPage";
import JobsPage from "../Pages/job/JobsPage";
import ApplicationTracking from "../Pages/job/ApplicationTracking";
import ShortlistCandidates from "../Pages/job/ShortListCandidates";
import CandidateApplications from "../Pages/job/CandidateApplications";
import JobAnalytics from "../Pages/job/JobAnalytics";
import AccountSetting from "../Pages/job/AccountSetting";
import NotificationSettings from "../Pages/job/NotificationSettings";
import JobNotification from "../Pages/JobNotification/JobNotification";
// import InterviewScheduling from "../Pages/job/InterviewScheduling";
import EmployeeAnnouncement from "../Pages/job/EmployeeAnnouncement";
import InterviewScheduling from "../Pages/job/InterviewScheduling";
import Profile from "../Pages/job/Profile";


// HR-specific routes
const HrRoutes = (
   <Route element={<HRLayout />}>
      <Route path="/hr/dashboard" element={<HrPage />} />
      <Route path="/hr/manage-jobs" element={<JobsPage />} />
      <Route path="/hr/application-tracking" element={<ApplicationTracking />} />
      <Route path="/hr/shortlisted-candidates" element={<ShortlistCandidates />} />
      <Route path="/hr/candidate-profiles" element={<CandidateApplications />} />
      <Route path="/hr/job-analytics" element={<JobAnalytics />} />
      <Route path="/hr/account-settings" element={<AccountSetting />} />
      <Route path="/hr/notification-settings" element={<NotificationSettings />} />
      <Route path="/hr/job-notification" element={<JobNotification />} />
      <Route path="/hr/schedule-interview" element={<InterviewScheduling/>} />
      <Route path="/hr/employment-announcements" element={<EmployeeAnnouncement />} />
      <Route path="/hr/profile" element={<Profile/>} />
   </Route>
);


export default HrRoutes;
