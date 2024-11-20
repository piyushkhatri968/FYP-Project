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
import InterviewScheduling from "../Pages/job/InterviewScheduling";
import EmployeeAnnouncement from "../Pages/job/EmployeeAnnouncement";


// HR-specific routes
const HrRoutes = (
   <Route element={<HRLayout />}>
      <Route path="hr-home" element={<HrPage />} />
      <Route path="/manage-jobs" element={<JobsPage />} />
      <Route path="/application-tracking" element={<ApplicationTracking />} />
      <Route path="/shortlisted-candidates" element={<ShortlistCandidates />} />
      <Route path="/candidate-profiles" element={<CandidateApplications />} />
      <Route path="/job-analytics" element={<JobAnalytics />} />
      <Route path="/account-settings" element={<AccountSetting />} />
      <Route path="/notification-settings" element={<NotificationSettings />} />
      <Route path="/job-notification" element={<JobNotification />} />
      <Route path="/schedule-interview" element={<InterviewScheduling />} />
      <Route path="/employment-announcements" element={<EmployeeAnnouncement />} />
   </Route>
);

export default HrRoutes;
