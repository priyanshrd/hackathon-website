// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import SubmitIdea from "./pages/SubmitIdea";
import Stepper from "./components/stepperform.jsx";
import About from "./pages/About";
// import RegisterPage from "./pages/Registration";
import Workshop from './pages/Workshop.jsx'
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <AnimatedNavbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/hackathon" element={<Stepper />} />
            <Route path="/idea" element={<SubmitIdea />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
