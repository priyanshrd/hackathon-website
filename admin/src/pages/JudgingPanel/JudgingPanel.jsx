import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JudgingPanel.css';

const JudgingPanel = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [scores, setScores] = useState({
    technicalExecution: 5,
    solutionValue: 5,
    innovation: 5,
    designQuality: 5,
    scalability: 5
  });

  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showGradingSystem, setShowGradingSystem] = useState(false);
  const navigate = useNavigate();

  // Enhanced Grading System Explanation
  const gradingSystem = [
    { score: 10, label: "Perfect", description: "Flawless execution, exceeds all expectations" },
    { score: 9, label: "Excellent", description: "Outstanding with minor room for improvement" },
    { score: 8, label: "Very Good", description: "Strong solution with few weaknesses" },
    { score: 7, label: "Good", description: "Solid implementation meets expectations" },
    { score: 6, label: "Above Average", description: "Better than average with some strengths" },
    { score: 5, label: "Average", description: "Meets basic requirements" },
    { score: 4, label: "Below Average", description: "Somewhat lacking but has potential" },
    { score: 3, label: "Poor", description: "Significant shortcomings" },
    { score: 2, label: "Very Poor", description: "Major flaws in execution" },
    { score: 1, label: "Unacceptable", description: "Fails to meet basic requirements" }
  ];

  // Updated Evaluation Criteria with detailed descriptions
  const evaluationCriteria = {
    technicalExecution: {
      title: "Technical Execution",
      description: "Quality of implementation, code robustness, and technical sophistication"
    },
    solutionValue: {
      title: "Solution Value Proposition",
      description: "Combines business viability with user impact - market need and potential adoption"
    },
    innovation: {
      title: "Innovation & Creativity",
      description: "Originality of the solution and novel approach to solving the problem"
    },
    designQuality: {
      title: "Design Quality",
      description: "System architecture, UX/UI, and technical design decisions"
    },
    scalability: {
      title: "Scalability & Maintainability",
      description: "Potential for growth and ease of future development/maintenance"
    }
  };
  // Score rating descriptions
  const ratingDescriptions = [
    { min: 1, max: 3, label: "Needs Work", color: "red-rating" },
    { min: 4, max: 6, label: "Average", color: "yellow-rating" },
    { min: 7, max: 8, label: "Good", color: "lime-rating" },
    { min: 9, max: 10, label: "Excellent", color: "green-rating" }
  ];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/teams');
        setTeams(response.data);
        if (response.data.length > 0) {
          setSelectedTeam(response.data[0]._id);
          if (response.data[0].score) {
            setScores(response.data[0].score);
          }
          setComments(response.data[0].comments || '');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeams();
  }, []);

  const handleScoreChange = (criteria, value) => {
    setScores(prev => ({
      ...prev,
      [criteria]: parseInt(value)
    }));
  };

  const calculateTotal = () => {
    return Object.values(scores).reduce((sum, score) => sum + score, 0);
  };

  const getRatingDescription = (score) => {
    const rating = ratingDescriptions.find(r => score >= r.min && score <= r.max);
    return rating ? { label: rating.label, color: rating.color } : { label: "", color: "" };
  };

  const handleSave = async () => {
    if (!selectedTeam) return;
  
    try {
      const totalScore = calculateTotal();
      
      const response = await axios.patch(
        `http://localhost:5000/api/teams/${selectedTeam}`,
        {
          scores: scores,
          comments: comments
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.status === 200) {
        alert('Evaluation saved successfully!');
        setTeams(teams.map(team => 
          team._id === selectedTeam ? { 
            ...team, 
            score: totalScore,
            comments 
          } : team
        ));
      }
    } catch (error) {
      console.error('Error saving evaluation:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Failed to save evaluation'}`);
      } else {
        alert('Network error - please check your connection');
      }
    }
  };

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );

  if (teams.length === 0) return (
    <div className="empty-state">
      <h2 className="empty-title">No teams available</h2>
      <p className="empty-text">Please check back later or contact the organizer.</p>
      <button 
        onClick={() => navigate(-1)}
        className="empty-button"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div className="judging-container">
      {/* Header */}
      <div className="judging-header">
        <div className="header-content">
          <h1 className="header-title">TechTank Judging Panel</h1>
          <div className="grading-system-toggle">
            <button 
              onClick={() => setShowGradingSystem(!showGradingSystem)}
              className="toggle-button"
            >
              {showGradingSystem ? 'Hide' : 'Show'} Grading Scale
            </button>
          </div>
          <div className="header-score">
            Total Score: <span>{calculateTotal()}/50</span>
          </div>
        </div>
      </div>

      {showGradingSystem && (
        <div className="grading-system-modal">
          <h3>Grading System</h3>
          <table>
            <thead>
              <tr>
                <th>Score</th>
                <th>Grade</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {gradingSystem.map((grade) => (
                <tr key={grade.score}>
                  <td>{grade.score}</td>
                  <td>{grade.label}</td>
                  <td>{grade.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <div className="grid-container">
          {/* Team Selection */}
          <div className="card">
            <h2 className="card-title">Select Team</h2>
            <select 
              value={selectedTeam}
              onChange={(e) => {
                const team = teams.find(t => t._id === e.target.value);
                setSelectedTeam(team._id);
                setScores(team.score || {
                  functionality: 5,
                  technicalDepth: 5,
                  solutionDesign: 5,
                  businessViability: 5,
                  innovation: 5,
                  impact: 5
                });
                setComments(team.comments || '');
              }}
              className="team-select"
            >
              {teams.map(team => (
                <option key={team._id} value={team._id}>
                  {team.teamName} ({team.score || 0}/50)
                </option>
              ))}
            </select>
          </div>

          {/* Scoring Guidelines */}
          <div className="card lg-colspan-2">
            <h2 className="card-title">Scoring Guidelines</h2>
            <div className="criteria-descriptions">
              {Object.entries(evaluationCriteria).map(([key, criterion]) => (
                <div key={key} className="criterion">
                  <h4>{criterion.title}</h4>
                  <p>{criterion.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Criteria */}
          <div className="card lg-colspan-2">
            <h2 className="card-title">Evaluation Criteria</h2>
            
            {Object.entries(evaluationCriteria).map(([key, criterion]) => {
              const rating = getRatingDescription(scores[key]);
              return (
                <div key={key} className="criteria-item">
                  <div className="criteria-header">
                    <h3 className="criteria-title">{criterion.title}</h3>
                    <div className="criteria-tooltip">
                      <span className="tooltip-icon">ℹ️</span>
                      <span className="tooltip-text">{criterion.description}</span>
                    </div>
                    <div className={`criteria-rating ${rating.color}`}>
                      {scores[key]} - {rating.label}
                    </div>
                  </div>
                  
                  <div className="slider-container">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores[key]}
                      onChange={(e) => handleScoreChange(key, e.target.value)}
                      className="slider"
                      step="1"
                    />
                    <div className="slider-labels">
                      <span>1 (Unacceptable)</span>
                      <span>10 (Perfect)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Score Summary & Feedback */}
          <div className="card">
            <h2 className="card-title">Evaluation Summary</h2>
            
            {/* Score Breakdown */}
            <div className="score-summary">
              {Object.entries(scores).map(([key, value]) => (
                <div key={key} className="score-item">
                  <span className="score-label">{evaluationCriteria[key].title}</span>
                  <span className="score-value">{value}/10</span>
                </div>
              ))}
              <div className="score-total">
                <span>Total Score </span>
                <span>{calculateTotal()}/50</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(calculateTotal()/50)*100}%` }}
              ></div>
            </div>
            
          
            
            {/* Save Button */}
            <button
              onClick={handleSave}
              className="save-button"
            >
              Save Evaluation
            </button>
            
            <p id="save-feedback" className="save-feedback"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgingPanel;