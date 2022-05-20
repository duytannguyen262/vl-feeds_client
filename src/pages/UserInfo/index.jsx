import React from "react";
import TopBar from "../../components/TopBar";
import UpdateUserForm from "./components/UpdateUserForm";
import { motion } from "framer-motion";
const UserInfo = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <TopBar />
      <div className="wrapper">
        <UpdateUserForm />
      </div>
    </motion.div>
  );
};

export default UserInfo;
