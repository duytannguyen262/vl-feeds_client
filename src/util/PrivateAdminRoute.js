import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateAdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user.role === "admin" ? children : <Navigate to="/auth/login" />;
};

export default PrivateAdminRoute;
