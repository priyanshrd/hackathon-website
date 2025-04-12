import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const JudgingPanel = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [scores, setScores] = useState({
    technicalExecution: 0,
    solutionValue: 0,
    innovation: 0,
    designQuality: 0,
    scalability: 0
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
      title: "1. Technical Execution",
      description: "Quality of implementation, code robustness, and technical sophistication"
    },
    solutionValue: {
      title: "2. Market Readiness & Business Viability",
      description: "Can the solution be deployed in real-world scenarios? Does it have a clear business model and sustainability strategy?"
    },
    innovation: {
      title: "3. Innovation & Creativity",
      description: "Originality of the solution and novel approach to solving the problem"
    },
    designQuality: {
      title: "4. Design (System Architecture & UX/UI)",
      description: "System architecture, UX/UI, and technical design decisions"
    },
    scalability: {
      title: "5. Scalability & Maintainability",
      description: "Potential for growth and ease of future development/maintenance"
    }
  };

  // Score rating descriptions
  const ratingDescriptions = [
    { min: 1, max: 3, label: "Needs Work", color: "#ff4444" },
    { min: 4, max: 6, label: "Average", color: "#ffbb33" },
    { min: 7, max: 8, label: "Good", color: "#00C851" },
    { min: 9, max: 10, label: "Excellent", color: "#007E33" }
  ];

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:5000/api/teams');
        
        // Ensure we always have an array, even if response.data is null/undefined
        const teamsData = Array.isArray(response?.data) ? response.data : [];
        
        setTeams(teamsData);
        
        if (teamsData.length > 0) {
          setSelectedTeam(teamsData[0]._id);
          setScores(teamsData[0].score || {
            technicalExecution: 0,
            solutionValue: 0,
            innovation: 0,
            designQuality: 0,
            scalability: 0
          });
          setComments(teamsData[0].comments || '');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        setTeams([]); // Ensure teams is always an array
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
            score: scores,
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
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000'
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '4px solid #38AAC9',
          borderTopColor: 'transparent'
        }}
      />
    </div>
  );

  if (!Array.isArray(teams) || teams.length === 0) return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h2 style={{ 
        fontSize: '2rem',
        color: '#E4CD15',
        marginBottom: '1rem'
      }}>No teams available</h2>
      <p style={{ 
        fontSize: '1.2rem',
        marginBottom: '2rem',
        color: '#aaa'
      }}>Please check back later or contact the organizer.</p>
      <button 
        onClick={() => navigate(-1)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#38AAC9',
          color: '#fff',
          border: 'none',
          borderRadius: '30px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
      fontFamily: 'sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(to right, #38AAC9, #38AAC9)',
        padding: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#fff',
              margin: 0
            }}>TechTank Judging Panel</h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <button 
                onClick={() => setShowGradingSystem(!showGradingSystem)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#E4CD15',
                  color: '#000',
                  border: 'none',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {showGradingSystem ? 'Hide' : 'Show'} Grading Scale
              </button>
              
              <div style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '30px',
                fontWeight: 'bold'
              }}>
                Total Score: <span style={{ color: '#E4CD15' }}>{calculateTotal()}/50</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGradingSystem && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            maxWidth: '1200px',
            margin: '1rem auto',
            padding: '1.5rem',
            backgroundColor: '#1a1a1a',
            borderRadius: '10px',
            borderLeft: '4px solid #E4CD15'
          }}
        >
          <h3 style={{
            color: '#E4CD15',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Grading System
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left'
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #38AAC9' }}>
                  <th style={{ padding: '0.75rem', color: '#38AAC9' }}>Score</th>
                  <th style={{ padding: '0.75rem', color: '#38AAC9' }}>Grade</th>
                  <th style={{ padding: '0.75rem', color: '#38AAC9' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {gradingSystem.map((grade) => (
                  <tr key={grade.score} style={{ borderBottom: '1px solid #333' }}>
                    <td style={{ padding: '0.75rem' }}>{grade.score}</td>
                    <td style={{ padding: '0.75rem' }}>{grade.label}</td>
                    <td style={{ padding: '0.75rem', color: '#aaa' }}>{grade.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Team Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '10px',
              padding: '1.5rem',
              borderLeft: '4px solid #38AAC9'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              color: '#E4CD15',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Select Team
            </h2>
            <select 
  value={selectedTeam}
  onChange={(e) => {
    const team = Array.isArray(teams) ? teams.find(t => t._id === e.target.value) : null;
    if (team) {
      setSelectedTeam(team._id);
      setScores(team.score || {
        technicalExecution: 0,
        solutionValue: 0,
        innovation: 0,
        designQuality: 0,
        scalability: 0
      });
      setComments(team.comments || '');
    }
  }}
  style={{
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #38AAC9',
    borderRadius: '5px',
    fontSize: '1rem'
  }}
>
  {Array.isArray(teams) && teams.map(team => (
    <option key={team._id} value={team._id}>
      {team.teamName} ({Object.values(team.score || {}).reduce((a, b) => a + b, 0) || 0}/50)
    </option>
  ))}
</select>
          </motion.div>

          {/* Scoring Guidelines */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '10px',
              padding: '1.5rem',
              borderLeft: '4px solid #E4CD15',
              gridColumn: 'span 2'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              color: '#38AAC9',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Scoring Guidelines
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}>
              {Object.entries(evaluationCriteria).map(([key, criterion]) => (
                <div key={key} style={{
                  backgroundColor: '#333',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <h4 style={{
                    color: '#E4CD15',
                    marginBottom: '0.5rem',
                    fontSize: '1.1rem'
                  }}>{criterion.title}</h4>
                  <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{criterion.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Evaluation Criteria */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '10px',
              padding: '1.5rem',
              borderLeft: '4px solid #38AAC9',
              gridColumn: 'span 2'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              color: '#E4CD15',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Evaluation Criteria
            </h2>
            
            {Object.entries(evaluationCriteria).map(([key, criterion]) => {
              const rating = getRatingDescription(scores[key]);
              return (
                <div key={key} style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid #333'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      color: '#38AAC9',
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {criterion.title}
                      <span style={{
                        position: 'relative',
                        cursor: 'pointer'
                      }}>
                        <span style={{ fontSize: '1rem' }}>ℹ️</span>
                        <span style={{
                          position: 'absolute',
                          bottom: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: '#333',
                          color: '#fff',
                          padding: '0.5rem',
                          borderRadius: '5px',
                          fontSize: '0.8rem',
                          width: '200px',
                          display: 'none',
                          zIndex: 10
                        }}>{criterion.description}</span>
                      </span>
                    </h3>
                    <div style={{
                      backgroundColor: rating.color,
                      color: '#000',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '20px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem'
                    }}>
                      {scores[key]} - {rating.label}
                    </div>
                  </div>
                  
                  <div style={{
                    marginBottom: '0.5rem'
                  }}>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores[key]}
                      onChange={(e) => handleScoreChange(key, e.target.value)}
                      style={{
                        width: '100%',
                        height: '8px',
                        borderRadius: '4px',
                        background: '#333',
                        outline: 'none',
                        WebkitAppearance: 'none'
                      }}
                      step="1"
                    />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      color: '#aaa',
                      marginTop: '0.5rem'
                    }}>
                      <span>1 (Unacceptable)</span>
                      <span>10 (Perfect)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Score Summary & Feedback */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '10px',
              padding: '1.5rem',
              borderLeft: '4px solid #E4CD15'
            }}
          >
            <h2 style={{
              fontSize: '1.5rem',
              color: '#38AAC9',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              Evaluation Summary
            </h2>
            
            {/* Score Breakdown */}
            <div style={{
              backgroundColor: '#333',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              {Object.entries(scores).map(([key, value]) => {
                const title = evaluationCriteria[key]?.title || key.replace(/([A-Z])/g, ' $1');
                return (
                  <div key={key} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ color: '#aaa' }}>{title}</span>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{value}/10</span>
                  </div>
                );
              })}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem',
                paddingTop: '0.5rem',
                borderTop: '1px solid #555'
              }}>
                <span style={{ color: '#E4CD15', fontWeight: 'bold' }}>Total Score</span>
                <span style={{ color: '#E4CD15', fontWeight: 'bold' }}>{calculateTotal()}/50</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{
              height: '10px',
              backgroundColor: '#333',
              borderRadius: '5px',
              marginBottom: '1.5rem',
              overflow: 'hidden'
            }}>
              <div 
                style={{ 
                  height: '100%',
                  backgroundColor: '#38AAC9',
                  width: `${(calculateTotal()/50)*100}%`,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>
            
            
            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#38AAC9',
                color: '#fff',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Save Evaluation
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JudgingPanel;