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

const App = () => {
  return (
    <div className="fade-in">
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* MainLayout Routes */}
          <Route element={<MainLayout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="find-job" element={<FindAJob />} />
          </Route>

          {/* HRLayout Route */}
          <Route element={<HRLayout />}>
            <Route path="hr" element={<HRPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
