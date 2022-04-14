import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthPage from "./pages/auth";
import MainLayout from "./pages/MainLayout";
import UserInfo from "./pages/UserInfo";
import PrivateUserRoute from "./util/PrivateUserRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
        <Route path="/*" element={<PrivateUserRoute />}>
          <Route path="profile" element={<UserInfo />} />
        </Route>
        <Route path="auth/*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
