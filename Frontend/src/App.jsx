import React, { useEffect, useState } from "react";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import Public_Job_Search from "./Pages/Public_Job_Search/Public_Job_Search";
import Admin_Dashboard from "./Pages/Admin_Dashboard/Admin_Dashboard";
import PrivateRouteAdmin from "./Components/Protected Routes/PrivateRouteAdmin";
import ApplyForJob from "./Pages/ApplyForJob";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signoutsuccess } from "./Redux/User/UserSlice";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isUserAvailable, setIsUserAvailable] = useState(true);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    if (!currentUser?._id) return;

    try {
      const { status } = await axios.get(
        `http://localhost:8080/api/auth/getMe/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );

      if (status === 200) {
        setIsUserAvailable(true);
      }
    } catch (error) {
      if (error.response?.data?.message === "User not exist.") {
        setIsUserAvailable(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/signout", {
        withCredentials: true,
      });
    } catch {}
    dispatch(signoutsuccess());
    setIsUserAvailable(true);
    Navigate("/");
  };

  // Initial and interval-based user status check
  useEffect(() => {
    fetchUser();
    const interval = setInterval(fetchUser, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [currentUser]);

  if (!isUserAvailable) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
        <div className="text-center max-w-lg p-6 rounded-lg bg-[#1f1f1f] shadow-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-4">
            ⚠️ Account is no longer available
          </h2>
          <p className="mb-6">
            It looks like your account has been deleted or is no longer
            accessible.
          </p>
          <button
            onClick={handleLogout}
            className="bg-[#00b79e] hover:bg-[#00806E] text-white font-bold py-2 px-4 rounded transition"
          >
            Register Again
          </button>
        </div>
      </div>
    );
  }

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
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/dashboard/admin" element={<Admin_Dashboard />} />
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
          <Route
            path="/jobSearch/:title?/:location?"
            element={<Public_Job_Search />}
          />
          <Route path="/jobs/:id" element={<ApplyForJob />} />
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
