import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthPage from "./pages/auth";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainLayout />} />
        <Route exact path="auth/*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
