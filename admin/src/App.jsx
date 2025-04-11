import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

// Generate complex route paths
const ROUTES = {
  WORKSHOP_ADMIN: `workshop-${crypto.randomUUID().split('-')[0]}-admin-${Date.now().toString(36)}`,
  TEAM_ADMIN: `team-${crypto.randomUUID().split('-')[1]}-portal-${Math.random().toString(36).substring(2, 8)}`,
  JUDGING_PANEL: `judging-${crypto.randomUUID().split('-')[2]}-console-${Math.random().toString(36).substring(2, 10)}`
};

// Store them in localStorage so they persist
localStorage.setItem('adminRoutes', JSON.stringify(ROUTES));

function App() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be hashed and compared with a stored hash
    if (password === "yourSecurePassword") {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleNavigation = (path) => {
    if (isAuthenticated) {
      navigate(`/${path}`);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuthenticated");
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="landing-container">
        <h1>Admin Dashboard</h1>
        <div className="auth-container">
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              autoComplete="off"
            />
            <button type="submit">Submit</button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-container">
      <h1>Admin Dashboard</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="button-container">
        <button onClick={() => handleNavigation(ROUTES.WORKSHOP_ADMIN)}>
          Workshop Entries
        </button>
        <button onClick={() => handleNavigation(ROUTES.TEAM_ADMIN)}>
          Hackathon + Workshop Entries
        </button>
        <button onClick={() => handleNavigation(ROUTES.JUDGING_PANEL)}>
          Judging Panel
        </button>
      </div>
    </div>
  );
}

export default App;