import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Check if already authenticated on component mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("adminAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Replace 'yourSecurePassword' with your actual password
    if (password === "acmGDGxtechtank2o25") {
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
      navigate(path);
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
        <button onClick={() => handleNavigation("/workshop-admin")}>
          Workshop Entries
        </button>
        <button onClick={() => handleNavigation("/team-admin")}>
          Hackathon + Workshop Entries
        </button>
        <button onClick={() => handleNavigation("/feedback-respones")}>
          Feedback Responses
        </button>
        <button onClick={() => handleNavigation("/sentiment-analysis")}>
          Sentiment Analysis
        </button>
        {/* <button onClick={() => handleNavigation("/techtankRV98nd3oij24-12-34-juddqx10394999qjfuh9828dccn839ooil")}>
          Judging Panel
        </button> */}
      </div>
    </div>
  );
}

export default App;