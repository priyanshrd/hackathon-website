import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JudgingPanel.css";

const JudgingPanel = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [scores, setScores] = useState({
    implementation: 0,
    technicalDepth: 0,
    userExperience: 0,
    marketReadiness: 0,
    innovation: 0,
    impact: 0,
    pitch: 0,
    roadmap: 0,
  });
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSelectedTeams = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backend_url}/api/registration/teams?isSelected=true`);
        
        if (response.data && response.data.teams) {
          setTeams(response.data.teams);
          if (response.data.teams.length > 0) {
            setSelectedTeam(response.data.teams[0]._id);
            // Load existing scores if available
            const initialTeam = response.data.teams[0];
            if (initialTeam.score) {
              setScores(initialTeam.score);
            }
            if (initialTeam.comments) {
              setComments(initialTeam.comments);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching selected teams:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelectedTeams();
  }, [backend_url]);

  const handleScoreChange = (category, value) => {
    const numValue = Math.min(10, Math.max(0, Number(value))); // Ensure score is between 0-10
    setScores(prev => ({
      ...prev,
      [category]: numValue
    }));
  };

  const calculateTotal = () => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  const saveScores = async () => {
    if (!selectedTeam) return;

    try {
      const response = await axios.patch(
        `${backend_url}/api/registration/teams/${selectedTeam}`,
        {
          score: scores,
          comments: comments,
        }
      );

      if (response.data.success) {
        alert("Scores saved successfully!");
        // Update local state
        setTeams(prevTeams =>
          prevTeams.map(team =>
            team._id === selectedTeam
              ? { ...team, score: scores, comments }
              : team
          )
        );
      }
    } catch (error) {
      console.error("Error saving scores:", error);
      alert("Failed to save scores");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading selected teams...</div>;
  }

  if (teams.length === 0) {
    return (
      <div className="no-teams">
        <h2>No teams selected for judging</h2>
        <p>Please go back and select teams first.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="judging-container">
      <div className="judging-header">
        <h1>Hackathon Judging Panel</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Teams
        </button>
      </div>

      <div className="judging-content">
        <div className="team-selector">
          <h2>Select Team</h2>
          <select
            value={selectedTeam || ""}
            onChange={(e) => {
              const teamId = e.target.value;
              setSelectedTeam(teamId);
              // Load the selected team's scores
              const team = teams.find(t => t._id === teamId);
              if (team && team.score) {
                setScores(team.score);
              } else {
                setScores({
                  implementation: 0,
                  technicalDepth: 0,
                  userExperience: 0,
                  marketReadiness: 0,
                  innovation: 0,
                  impact: 0,
                  pitch: 0,
                  roadmap: 0,
                });
              }
              if (team && team.comments) {
                setComments(team.comments);
              } else {
                setComments("");
              }
            }}
          >
            {teams.map(team => (
              <option key={team._id} value={team._id}>
                {team.teamName} (ID: {team._id})
              </option>
            ))}
          </select>
        </div>

        <div className="scoring-section">
          <h2>Scoring Rubrics</h2>
          <p>Score each category from 0 to 10 points</p>

          <div className="rubric-categories">
            <div className="rubric-item">
              <label>Implementation & Functionality</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.implementation}
                onChange={(e) => handleScoreChange("implementation", e.target.value)}
              />
              <p>Is the solution fully functional, with a working prototype demonstrating key features?</p>
            </div>

            <div className="rubric-item">
              <label>Technical Depth & Robustness</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.technicalDepth}
                onChange={(e) => handleScoreChange("technicalDepth", e.target.value)}
              />
              <p>How well is the technology implemented? Is it scalable, optimized, and secure?</p>
            </div>

            <div className="rubric-item">
              <label>User Experience & Design</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.userExperience}
                onChange={(e) => handleScoreChange("userExperience", e.target.value)}
              />
              <p>Is the solution user-friendly, intuitive, and well-designed for its target audience?</p>
            </div>

            <div className="rubric-item">
              <label>Market Readiness & Business Viability</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.marketReadiness}
                onChange={(e) => handleScoreChange("marketReadiness", e.target.value)}
              />
              <p>Can the solution be deployed in real-world scenarios? Does it have a clear business model?</p>
            </div>

            <div className="rubric-item">
              <label>Innovation & Competitive Edge</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.innovation}
                onChange={(e) => handleScoreChange("innovation", e.target.value)}
              />
              <p>How unique and disruptive is the solution compared to existing alternatives?</p>
            </div>

            <div className="rubric-item">
              <label>Impact & Societal Benefit</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.impact}
                onChange={(e) => handleScoreChange("impact", e.target.value)}
              />
              <p>Does the solution address a real-world challenge effectively? Can it create positive impact?</p>
            </div>

            <div className="rubric-item">
              <label>Pitch & Presentation Quality</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.pitch}
                onChange={(e) => handleScoreChange("pitch", e.target.value)}
              />
              <p>Is the idea communicated convincingly, with strong storytelling and clear demos?</p>
            </div>

            <div className="rubric-item">
              <label>Future Roadmap & Scalability</label>
              <input
                type="number"
                min="0"
                max="10"
                value={scores.roadmap}
                onChange={(e) => handleScoreChange("roadmap", e.target.value)}
              />
              <p>Can the solution evolve with additional features or funding? What's the long-term vision?</p>
            </div>
          </div>

          <div className="total-score">
            <h3>Total Score: {calculateTotal()} / 80</h3>
          </div>

          <div className="comments-section">
            <label>Additional Comments</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter any additional feedback for the team..."
            />
          </div>

          <button className="save-button" onClick={saveScores}>
            Save Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default JudgingPanel;