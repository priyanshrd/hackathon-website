// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import SubmitIdea from "./pages/SubmitIdea";
import About from "./pages/About";
import SubmissionBoard from "./pages/submissionBoard";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/submit" element={<SubmitIdea />} />
          <Route path="/about" element={<About />} />
          <Route path="/submission-board" element={<SubmissionBoard />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
