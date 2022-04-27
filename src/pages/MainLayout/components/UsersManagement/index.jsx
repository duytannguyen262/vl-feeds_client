import React from "react";
import UsersTable from "./components/usersTable/UserTable";

const UserManagement = () => {
  return (
    <div className="page-content" style={{ padding: "0 20px" }}>
      <UsersTable />
    </div>
  );
};

export default UserManagement;
