import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import WorkshopData from "./pages/WorkshopData/WorshopData";
import TeamsData from "./pages/TeamsData/TeamsData";
import JudgingPanel from "./pages/JudgingPanel/JudgingPanel.jsx";
import FeedbackResponses from "./pages/FeedbackResponses/FeedbackResponses.jsx";
import SentimentAnalysis from "./pages/SentimentAnalysis/SentimentAnalysis.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workshop-admin" element={<WorkshopData />} />
        <Route path="/team-admin" element={<TeamsData />} />
        <Route path="/techtankRV98nd3oij24-12-34-juddqx10394999qjfuh9828dccn839ooil" element={<JudgingPanel />} />
        <Route path="/feedback-respones" element={<FeedbackResponses />} />
        <Route path="/sentiment-analysis" element={<SentimentAnalysis />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
