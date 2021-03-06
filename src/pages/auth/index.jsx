import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";

import authBanner from "../../assets/authBanner.jpg";
import backIcon from "../../assets/icons/angle-left-white.svg";
import vlfeedsLogo from "../../assets/logo.png";
import vluLogo from "../../assets/vluLogo.png";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import "./styles.scss";

const AuthPage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    user !== null && navigate("/");
  }, [user, navigate]);

  return (
    <div
      style={{ position: "relative" }}
      className="background-main d-flex justify-content-center
      align-items-center"
    >
      <div className="backToHomeBtn">
        <Button
          sx={{ padding: "10px", color: "white", borderRadius: "15px" }}
          onClick={() => navigate("/")}
        >
          <div className="backToHomeBtn_img">
            <img src={backIcon} alt="" />
          </div>
          <div className="backToHomeBtn_logo">
            <img src={vlfeedsLogo} alt="" />
          </div>
        </Button>
      </div>
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
