import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRouteAdmin = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.userType === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRouteAdmin;
