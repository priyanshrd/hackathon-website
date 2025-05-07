import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./FeedbackResponses.css";

const FeedbackResponses = () => {
  const backend_url = "http://localhost:5000"; // Replace with your backend URL
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("detailed"); // 'detailed' or 'summary'
  const [filterRating, setFilterRating] = useState("all"); // 'all', 'positive', 'neutral', 'negative'
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const navigate = useNavigate();

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${backend_url}/api/feedback`, {
          params: {
            sortBy: sortConfig.key,
            sortOrder: sortConfig.direction
          }
        });
        
        if (response.data && response.data.feedback) {
          const processedFeedback = response.data.feedback.map(item => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleString(),
            isSelected: false,
            overallSentiment: determineSentiment(item.overallRating)
          }));
          
          setFeedbackList(processedFeedback);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(`Failed to load feedback data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [backend_url, sortConfig]);

  // Filter and sort feedback
  useEffect(() => {
    const filtered = feedbackList.filter((feedback) => {
      // Search filter
      const matchesSearch = 
        (feedback.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (feedback.quickFeedback?.toLowerCase() || "").includes(searchTerm.toLowerCase());
      
      // Rating filter
      const matchesRating = 
        filterRating === "all" || 
        (filterRating === "positive" && feedback.overallRating >= 3) ||
        (filterRating === "neutral" && feedback.overallRating === 2) ||
        (filterRating === "negative" && feedback.overallRating <= 1);
      
      return matchesSearch && matchesRating;
    });

    setFilteredFeedback(filtered);
  }, [feedbackList, searchTerm, filterRating]);

  const determineSentiment = (rating) => {
    if (rating >= 3) return "positive";
    if (rating === 2) return "neutral";
    return "negative";
  };

  const toggleFeedbackSelection = (id) => {
    setFeedbackList(prev => 
      prev.map(item => 
        item._id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const deleteSelectedFeedback = async () => {
    try {
      const selectedIds = feedbackList
        .filter(item => item.isSelected)
        .map(item => item._id);
      
      if (selectedIds.length === 0) {
        alert("No feedback selected for deletion");
        return;
      }

      if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} feedback entries?`)) {
        return;
      }

      const response = await axios.delete(`${backend_url}/api/feedback`, {
        data: { ids: selectedIds }
      });

      if (response.data.success) {
        setFeedbackList(prev => prev.filter(item => !item.isSelected));
        alert("Selected feedback deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback");
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Email", "Overall Rating", "Quick Feedback", 
      "Pre-Hack Workshop", "Ideation Round", "Hackathon", 
      "Final Pitch", "Mentoring Quality", "Organizer Support",
      "Venue Quality", "Judging Fairness", "Continue Support",
      "Submitted At"
    ];

    const data = filteredFeedback.map(item => [
      item.email,
      item.overallRating,
      `"${item.quickFeedback || ''}"`,
      item.eventRatings?.preHackWorkshop || 0,
      item.eventRatings?.ideationRound || 0,
      item.eventRatings?.hackathon || 0,
      item.eventRatings?.finalPitch || 0,
      item.mentoringQuality || 0,
      item.organizerSupport || 0,
      item.venueQuality || 0,
      item.judgingFairness || 0,
      item.continueSupport ? "Yes" : "No",
      item.createdAt
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `feedback_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.click();
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };


  const getRatingEmoji = (rating) => {
    switch(rating) {
      case 3: return "👍";
      case 2: return "😐";
      case 1: return "👎";
      case 0: return "🚫";
      default: return "";
    }
  };

  if (isLoading) {
    return <div className="loading">Loading feedback data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="feedback-admin-container">
      <div className="feedback-admin-header">
        <h1>Hackathon Feedback Responses</h1>
        <div className="feedback-admin-controls">
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="rating-filter"
          >
            <option value="all">All Ratings</option>
            <option value="positive">Positive (3+)</option>
            <option value="neutral">Neutral (2)</option>
            <option value="negative">Negative (0-1)</option>
          </select>
          
          <button 
            className="toggle-view-button"
            onClick={() => setViewMode(viewMode === "detailed" ? "summary" : "detailed")}
          >
            {viewMode === "detailed" ? "Switch to Summary View" : "Switch to Detailed View"}
          </button>
          
          <button 
            className="export-button"
            onClick={exportToCSV}
          >
            Export to CSV
          </button>
          
          <button 
            className="delete-button"
            onClick={deleteSelectedFeedback}
          >
            Delete Selected
          </button>
          
          <button 
            className="home-button"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>

      {filteredFeedback.length === 0 ? (
        <div className="no-results">
          {feedbackList.length === 0
            ? "No feedback submitted yet."
            : "No feedback matches your search criteria."}
        </div>
      ) : viewMode === "detailed" ? (
        <div className="feedback-table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFeedbackList(prev => 
                        prev.map(item => ({ ...item, isSelected: isChecked }))
                      );
                    }}
                  />
                </th>
                <th onClick={() => requestSort("email")}>
                  Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => requestSort("overallRating")}>
                  Overall {sortConfig.key === "overallRating" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>Quick Feedback</th>
                <th>Event Ratings</th>
                <th>Other Ratings</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedback.map((feedback) => (
                <tr key={feedback._id} className={`sentiment-${feedback.overallSentiment}`}>
                  <td>
                    <input
                      type="checkbox"
                      checked={feedback.isSelected || false}
                      onChange={() => toggleFeedbackSelection(feedback._id)}
                    />
                  </td>
                  <td className="email-cell">{feedback.email}</td>
                  <td className="overall-rating-cell">
                    <span className="rating-badge">
                      {feedback.overallRating} {getRatingEmoji(feedback.overallRating)}
                    </span>
                  </td>
                  <td className="quick-feedback-cell">
                    {feedback.quickFeedback || "N/A"}
                  </td>
                  <td className="event-ratings-cell">
                    <div className="event-rating">
                      <span>Workshop: </span>
                      {feedback.eventRatings?.preHackWorkshop ?? "N/A"}
                    </div>
                    <div className="event-rating">
                      <span>Ideation: </span>
                      {feedback.eventRatings?.ideationRound ?? "N/A"}
                    </div>
                    <div className="event-rating">
                      <span>Hackathon: </span>
                      {feedback.eventRatings?.hackathon ?? "N/A"}
                    </div>
                    <div className="event-rating">
                      <span>Final Pitch: </span>
                      {feedback.eventRatings?.finalPitch ?? "N/A"}
                    </div>
                  </td>
                  <td className="other-ratings-cell">
                    <div className="other-rating">
                      <span>Mentoring: </span>
                      {feedback.mentoringQuality ?? "N/A"}
                    </div>
                    <div className="other-rating">
                      <span>Organizers: </span>
                      {feedback.organizerSupport ?? "N/A"}
                    </div>
                    <div className="other-rating">
                      <span>Venue: </span>
                      {feedback.venueQuality ?? "N/A"}
                    </div>
                    <div className="other-rating">
                      <span>Judging: </span>
                      {feedback.judgingFairness ?? "N/A"}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="feedback-summary-view">
          <div className="summary-stats">
            <div className="stat-card">
              <h3>Total Responses</h3>
              <p>{feedbackList.length}</p>
            </div>
            <div className="stat-card positive">
              <h3>Positive Ratings</h3>
              <p>{feedbackList.filter(f => f.overallRating >= 3).length}</p>
            </div>
            <div className="stat-card neutral">
              <h3>Neutral Ratings</h3>
              <p>{feedbackList.filter(f => f.overallRating === 2).length}</p>
            </div>
            <div className="stat-card negative">
              <h3>Negative Ratings</h3>
              <p>{feedbackList.filter(f => f.overallRating <= 1).length}</p>
            </div>
          </div>

          <div className="rating-distribution">
            <h2>Rating Distribution</h2>
            <div className="distribution-bars">
              {[3, 2, 1, 0].map((rating) => {
                const count = feedbackList.filter(f => f.overallRating === rating).length;
                const percentage = feedbackList.length > 0 
                  ? Math.round((count / feedbackList.length) * 100) 
                  : 0;
                
                return (
                  <div key={rating} className="distribution-bar">
                    <div className="bar-label">
                      <span>{getRatingEmoji(rating)} {rating} </span>
                      <span>({count})</span>
                    </div>
                    <div className="bar-container">
                      <div 
                        className={`bar ${rating >= 3 ? 'positive' : rating === 2 ? 'neutral' : 'negative'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="percentage">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="common-feedback">
            <h2>Common Feedback Themes</h2>
            {filteredFeedback
              .filter(f => f.quickFeedback)
              .slice(0, 5)
              .map((feedback, index) => (
                <div key={index} className="feedback-item">
                  <div className="feedback-rating">
                    {getRatingEmoji(feedback.overallRating)}
                  </div>
                  <div className="feedback-text">
                    {feedback.quickFeedback}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackResponses;