import React from "react";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./Components/Protected Routes/PrivateRoute";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/ContactPage";
import BlogPage from "./Pages/Blogs/BlogPage";
import FindAJob from "./Pages/Jobs/FinaAJob/FindAJob";
import Home from "./Pages/Home/HomePage";
import SignIn from "./Pages/Authentication/SignIn";
import SignUp from "./Pages/Authentication/SignUp";
import Employee_Dashboard from "./Pages/Employee_Dashboard/Employee_Dashboard";
import OrangeButton from "./Components/OrangeButton";
import Resume from "./Components/Resume";
import HrRoutes from "./Pages/Hr_Dashboard/Routes/HrRoutes";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <ConditionalWrapper>
        <OrangeButton />
        <ScrollToTop />
        <Routes>
          {/* Private User routee */}
          <Route element={<PrivateRoute />}>
            <Route
              path="/dashboard/employee"
              element={<Employee_Dashboard />}
            />
          </Route>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/find-job" element={<FindAJob />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFoundPage />} />


          {HrRoutes}
        </Routes>
      </ConditionalWrapper>
    </BrowserRouter>
  );
};

// Conditional Wrapper Component
const ConditionalWrapper = ({ children }) => {
  const location = useLocation();
  const isHRRoute = location.pathname.startsWith("/hr");

  return (
    <div>
      {/* Conditionally render Navbar and Footer */}
      {!isHRRoute && <Navbar />}
      {children}
      {!isHRRoute && <Footer />}
    </div>
  );
};

export default App;
