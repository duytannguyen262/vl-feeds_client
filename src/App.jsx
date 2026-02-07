import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./util/AnimatedRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ToastContainer />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
