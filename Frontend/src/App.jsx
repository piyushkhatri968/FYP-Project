import React from "react";
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import PrivateRoute from "./Components/PrivateRoute";
import SignUp from "./Pages/SignUp";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar";
import AboutPage from "./Pages/About/AboutPage";
import ContactPage from "./Pages/Contact/ContactPage";
import JobsPage from "./Pages/Jobs/JobsPage";
import BlogPage from "./Pages/Blogs/BlogPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route> 

         <Route path="about"  element={<AboutPage/>}   />
         <Route path="/contact"  element={<ContactPage/>} />
         <Route path="/jobs" element={<JobsPage/>}  />
         <Route path="/blog" element={<BlogPage/>}  />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
