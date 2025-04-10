import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <button onClick={() => navigate("/workshop-admin")}>
          Workshop Entries
        </button>
        <button onClick={() => navigate("/team-admin")}>
          Hackathon + Workshop Entries
        </button>
        <button onClick={() => navigate("/judging-panel")}>Judging Panel</button>
      </div>
    </div>
  );
}

export default App;
