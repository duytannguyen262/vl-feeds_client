import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import AuthPage from "../pages/auth";
import MainLayout from "../pages/MainLayout";
import UserInfo from "../pages/UserInfo";
import PrivateUserRoute from "./PrivateUserRoute";
import SingleUser from "../pages/SingleUser";
import ConfirmUser from "../pages/ConfirmUser";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/user/confirm/:token" element={<ConfirmUser />} />
        <Route path="/user/*" element={<PrivateUserRoute />}>
          <Route path="profile" element={<UserInfo />} />
        </Route>
        <Route path="auth/*" element={<AuthPage />} />
        <Route path="user/:userId" element={<SingleUser />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
