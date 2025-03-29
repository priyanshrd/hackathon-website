import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import WorkshopData from "./pages/WorkshopData/WorshopData";
import TeamsData from "./pages/TeamsData/TeamsData";
import AdminManualRegistration from "./pages/AdminManualRegistration/AdminManualRegistration.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workshop-admin" element={<WorkshopData />} />
        <Route path="/team-admin" element={<TeamsData />} />
        <Route path="/manual-reg" element={<AdminManualRegistration />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
