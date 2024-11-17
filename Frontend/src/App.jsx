import React from "react";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/ContactPage";
import BlogPage from "./Pages/Blogs/BlogPage";
import FindAJob from "./Pages/Jobs/FinaAJob/FindAJob";
import HRPage from "./Pages/Hr_Dashboard/HrPage";
import MainLayout from "./Components/MainLayout";
import HRLayout from "./Pages/Hr_Dashboard/Components/HrLayout";
import Home from "./Pages/Home/HomePage";
import SignIn from "./Pages/Authentication/SignIn";
import SignUp from "./Pages/Authentication/SignUp";
import JobsPage from "./Pages/Hr_Dashboard/Pages/job/JobsPage";
// import JobPostPage from "./Pages/Hr_Dashboard/Pages/JobPost/JobPostPage";
import ApplicationTracking from "./Pages/Hr_Dashboard/Pages/job/ApplicationTracking";
import CandidateApplications from "./Pages/Hr_Dashboard/Pages/job/CandidateApplications";
import ShortListCandidates from "./Pages/Hr_Dashboard/Pages/job/ShortListCandidates";
import JobAnalytics from "./Pages/Hr_Dashboard/Pages/job/JobAnalytics";
import AccountSetting from "./Pages/Hr_Dashboard/Pages/job/AccountSetting";
import NotificationSettings from "./Pages/Hr_Dashboard/Pages/job/NotificationSettings";
import JobNotification from "./Pages/Hr_Dashboard/Pages/JobNotification/JobNotification";
import Employee_Dashboard from "./Pages/Employee_Dashboard/Employee_Dashboard";
import Admin_Dashboard from "./Pages/Admin_Dashboard/Admin_Dashboard";
// import PostJobNotification from "./Pages/Hr_Dashboard/Pages/job/PostJobNotification";

const App = () => {
  return (
    <div className="fade-in">
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* MainLayout Routes */}
          <Route element={<MainLayout />}>
            {/* <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route> */}
            <Route path="/" element={<Home />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="find-job" element={<FindAJob />} />
            <Route path="dashboard/employee" element={<Employee_Dashboard />} />
            <Route path="dashboard/admin" element={<Admin_Dashboard />} />
          </Route>

          {/* HRLayout Route */}
          <Route element={<HRLayout />}>
            <Route path="hr-home" element={<HRPage />} />
            <Route path="/manage-jobs" element={<JobsPage />} />
            <Route
              path="/application-tracking"
              element={<ApplicationTracking />}
            />
            <Route
              path="/shortlisted-candidates"
              element={<ShortListCandidates />}
            />
            <Route
              path="/candidate-profiles"
              element={<CandidateApplications />}
            />
            <Route path="/job-analytics" element={<JobAnalytics />} />
            <Route path="/account-settings" element={<AccountSetting />} />
            <Route
              path="/notification-settings"
              element={<NotificationSettings />}
            />
            <Route path="/job-notification" element={<JobNotification />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
