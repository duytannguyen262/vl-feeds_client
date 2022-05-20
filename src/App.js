import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./util/AnimatedRoutes";

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
