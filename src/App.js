import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./util/AnimatedRoutes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
