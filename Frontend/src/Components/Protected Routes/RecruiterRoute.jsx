import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const RecruiterRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  return currentUser && currentUser.userType === "recruiter" 
    ? <Outlet /> 
    : <Navigate to="/" />;
};

export default RecruiterRoute;
