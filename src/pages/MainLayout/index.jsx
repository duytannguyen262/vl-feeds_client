import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";
import EligiblePosts from "./components/EligiblePosts";
import FollowedPosts from "./components/FollowedPosts";
import Home from "./components/Home";
import UsersManagement from "./components/UsersManagement";

import "./mainLayout.scss";
const MainLayout = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <TopBar />
      <div className="wrapper">
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/following" element={<FollowedPosts />} />
            <Route path="/eligible-posts" element={<EligiblePosts />} />
            <Route path="/users" element={<UsersManagement />} />
          </Routes>
          {user && <Sidebar />}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
