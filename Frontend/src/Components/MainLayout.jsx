// src/components/MainLayout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Renders the nested routes */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
