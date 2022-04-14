import React from "react";
import TopBar from "../../components/TopBar";
import UpdateUserForm from "./components/UpdateUserForm";

const UserInfo = () => {
  return (
    <div>
      <TopBar />
      <div className="wrapper">
        <UpdateUserForm />
      </div>
    </div>
  );
};

export default UserInfo;
