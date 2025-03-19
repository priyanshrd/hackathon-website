// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import SubmitIdea from "./pages/SubmitIdea";
import Stepper from "./components/stepperform.jsx";
import About from "./pages/About";
import RegisterPage from "./pages/Registration";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <AnimatedNavbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/submit" element={<SubmitIdea />} />
            <Route path="/about" element={<Stepper />} />
            {/* <Route path="/about" element={<Stepper />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
