import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

import authBanner from "../../assets/authBanner.jpg";
import vluLogo from "../../assets/vluLogo.png";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import "./styles.scss";

const AuthPage = () => {
  return (
    <div className="background-main d-flex justify-content-center align-items-center">
      <div className="auth-form_container">
        <div className="auth-form_picture--container">
          <img src={authBanner} alt="" />
          <img src={vluLogo} alt="" />
        </div>
        <div className="auth-form_inner--container">
          <div className="auth-routes">
            <NavLink to="login" className="auth-routes_link">
              Đăng nhập
            </NavLink>
            <NavLink to="register" className="auth-routes_link">
              Đăng kí
            </NavLink>
          </div>
          <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
