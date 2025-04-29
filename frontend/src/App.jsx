// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Timeline from "./pages/Timeline";
import FeedbackForm from "./pages/ComingSoon.jsx";
import Stepper from "./components/stepperform.jsx";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard.jsx"
// import RegisterPage from "./pages/Registration";
import Workshop from "./pages/Workshop.jsx";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <AnimatedNavbar />
        <div className="pt-16">
          <Routes>
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/hackathon" element={<Stepper />} />
            {/* <Route path="/idea" element={<SubmitIdea />} /> */}
            <Route path="/idea" element={<FeedbackForm />} />

            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
