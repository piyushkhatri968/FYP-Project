import React from "react";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/ContactPage";
import BlogPage from "./Pages/Blogs/BlogPage";
import FindAJob from "./Pages/Jobs/FinaAJob/FindAJob";

import MainLayout from "./Components/MainLayout";

import Home from "./Pages/Home/HomePage";
import SignIn from "./Pages/Authentication/SignIn";
import SignUp from "./Pages/Authentication/SignUp";


import Employee_Dashboard from "./Pages/Employee_Dashboard/Employee_Dashboard";
import Admin_Dashboard from "./Pages/Admin_Dashboard/Admin_Dashboard";

import OrangeButton from "./Components/OrangeButton";
import Resume from "./Components/Resume";
import HrRoutes from "./Pages/Hr_Dashboard/Routes/HrRoutes";


const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <BrowserRouter>
        <OrangeButton />
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
            <Route path="resume" element={<Resume />} />
            
          
          </Route>
          <Route>
          {HrRoutes}
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
