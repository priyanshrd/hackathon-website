import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import WorkshopData from "./pages/WorkshopData/WorshopData.jsx";
import TeamsData from "./pages/TeamsData/TeamsData.jsx";
import JudgingPanel from "./pages/JudgingPanel/JudgingPanel.jsx";

// Get the generated routes from localStorage or generate new ones if they don't exist
const getRoutes = () => {
  const storedRoutes = localStorage.getItem('adminRoutes');
  if (storedRoutes) {
    return JSON.parse(storedRoutes);
  }

  // Generate new complex routes if none exist
  const newRoutes = {
    WORKSHOP_ADMIN: `workshop-${crypto.randomUUID().split('-')[0]}-admin-${Date.now().toString(36)}`,
    TEAM_ADMIN: `team-${crypto.randomUUID().split('-')[1]}-portal-${Math.random().toString(36).substring(2, 8)}`,
    JUDGING_PANEL: `judging-${crypto.randomUUID().split('-')[2]}-console-${Math.random().toString(36).substring(2, 10)}`
  };

  localStorage.setItem('adminRoutes', JSON.stringify(newRoutes));
  return newRoutes;
};

const routes = getRoutes();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path={`/${routes.WORKSHOP_ADMIN}`} element={<WorkshopData />} />
        <Route path={`/${routes.TEAM_ADMIN}`} element={<TeamsData />} />
        <Route path={`/${routes.JUDGING_PANEL}`} element={<JudgingPanel />} />
        {/* Fallback route for incorrect paths */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  </React.StrictMode>
);