// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedNavbar from "./components/AnimatedNavbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import SubmitIdea from "./pages/SubmitIdea";
import About from "./pages/About";
import RegistrationModal from "./components/RegistrationModal";

const App = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <AnimatedNavbar setIsRegistrationOpen={setIsRegistrationOpen} />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home setIsRegistrationOpen={setIsRegistrationOpen} />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/submit" element={<SubmitIdea />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <RegistrationModal
          isOpen={isRegistrationOpen}
          onClose={() => setIsRegistrationOpen(false)}
        />
      </div>
    </Router>
  );
};

export default App;