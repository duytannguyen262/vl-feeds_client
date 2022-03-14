import React from "react";
import { Route, Routes } from "react-router-dom";

import LeftSideBar from "../../components/LeftSideBar";
import RightUserInfo from "../../components/RightUserInfo";
import TopBar from "../../components/TopBar";
import Home from "./components/Home";

const MainLayout = () => {
  return (
    <>
      <TopBar />
      <div className="wrapper">
        <LeftSideBar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
        <RightUserInfo />
      </div>
    </>
  );
};

export default MainLayout;
