import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TeamsData.css";

const TeamsData = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [teams, setTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("registrations"); // 'registrations' or 'selection'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${backend_url}/api/registration/teams?includeScreenshots=true`
        );

        if (response.data && response.data.teams) {
          const processedTeams = response.data.teams.map((team) => ({
            ...team,
            screenshot: team.screenshot
              ? team.screenshot.startsWith("data:image")
                ? team.screenshot
                : `data:image/png;base64,${team.screenshot}`
              : null,
            score: team.score || 0,
            isSelected: team.isSelected || false,
          }));

          setTeams(processedTeams);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError(`Failed to load team data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [backend_url]);

  const filteredTeams = teams.filter((team) => {
    if (!team) return false;
    return (
      (team.teamName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (team._id?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  });

  const toggleTeamSelection = async (teamId) => {
    try {
      const teamToUpdate = teams.find(team => team._id === teamId);
      const newSelectionStatus = !teamToUpdate.isSelected;
      
      const response = await axios.patch(
        `${backend_url}/api/registration/teams/${teamId}`,
        { isSelected: newSelectionStatus }
      );

      if (response.data.success) {
        setTeams(prevTeams =>
          prevTeams.map(team =>
            team._id === teamId ? { ...team, isSelected: newSelectionStatus } : team
          )
        );
      }
    } catch (error) {
      console.error("Error updating selection status:", error);
      alert("Failed to update selection status");
    }
  };

  if (isLoading) {
    return <div className="loading">Loading team data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>
          {viewMode === "registrations" 
            ? "Hackathon Team Registrations" 
            : "Select Teams for Judging"}
        </h1>
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button 
            className="toggle-view-button"
            onClick={() => setViewMode(viewMode === "registrations" ? "selection" : "registrations")}
          >
            {viewMode === "registrations" ? "Switch to Selection View" : "Switch to Full View"}
          </button>
          <button className="home-button" onClick={() => navigate("/")}>
            Return to Home
          </button>
          <button 
            className="judging-button"
            onClick={() => navigate("/judging")}
          >
            Go to Judging Panel
          </button>
        </div>
      </div>

      {filteredTeams.length === 0 ? (
        <div>
          <p className="no-results">
            {teams.length === 0
              ? "No teams registered yet."
              : "No teams match your search."}
          </p>
        </div>
      ) : viewMode === "registrations" ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Team Leader</th>
                <th>Members</th>
                <th>Transaction</th>
                <th>Payment Proof</th>
                <th>Status</th>
                <th>Selected</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team, index) => {
                const leader = team.members?.find(member => member?.isTeamLead);
                const otherMembers = team.members?.filter(member => !member?.isTeamLead) || [];

                return (
                  <tr key={team._id}>
                    <td className="serial-number">{index + 1}</td>
                    <td className="team-name">
                      <strong>{team.teamName}</strong>
                      {team.isRVCEStudent && <span className="rvce-tag">RVCE</span>}
                    </td>
                    <td className="leader-info">
                      {leader ? (
                        <>
                          <div><strong>{leader.name}</strong></div>
                          <div>{leader.email}</div>
                          <div>{leader.phoneNumber}</div>
                          {leader.usn && <div>USN: {leader.usn}</div>}
                        </>
                      ) : (
                        "No Team Lead"
                      )}
                    </td>
                    <td className="member-list">
                      {otherMembers.length > 0 ? (
                        <ul>
                          {otherMembers.map((member) => (
                            <li key={member.email}>
                              <div><strong>{member.name}</strong></div>
                              <div>{member.email}</div>
                              <div>{member.phoneNumber}</div>
                              {member.usn && <div>USN: {member.usn}</div>}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No Other Members"
                      )}
                    </td>
                    <td className="transaction-id">{team.transactionId}</td>
                    <td className="screenshot-cell">
                      {team.screenshot ? (
                        <img
                          src={team.screenshot}
                          alt="Payment Screenshot"
                          className="screenshot"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        "No Screenshot"
                      )}
                    </td>
                    <td className="status-cell">
                      <span className={`status-badge ${team.status || "pending"}`}>
                        {team.status?.toUpperCase() || "PENDING"}
                      </span>
                    </td>
                    <td className="selection-cell">
                      <input
                        type="checkbox"
                        checked={team.isSelected || false}
                        onChange={() => toggleTeamSelection(team._id)}
                      />
                    </td>
                    <td className="action-buttons">
                      <button
                        className="accept-button"
                        onClick={() => handleStatusChange(team, "accept")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => handleStatusChange(team, "reject")}
                      >
                        Reject & Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="selection-view">
          <h2>Select Teams for Judging</h2>
          <div className="team-cards">
            {filteredTeams.map((team) => (
              <div key={team._id} className={`team-card ${team.isSelected ? "selected" : ""}`}>
                <h3>{team.teamName}</h3>
                <p>Team ID: {team._id}</p>
                <div className="selection-status">
                  <span>Selected: {team.isSelected ? "Yes" : "No"}</span>
                  <button
                    onClick={() => toggleTeamSelection(team._id)}
                    className={team.isSelected ? "deselect-button" : "select-button"}
                  >
                    {team.isSelected ? "Deselect" : "Select"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsData;