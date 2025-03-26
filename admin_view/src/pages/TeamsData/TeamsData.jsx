import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TeamsData.css";

const TeamsData = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [teams, setTeams] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        // Add includeScreenshots=true parameter
        const response = await axios.get(
          `${backend_url}/api/registration/teams?includeScreenshots=true`
        );

        if (response.data && response.data.teams) {
          const processedTeams = response.data.teams.map((team) => {
            // Ensure screenshot is properly formatted
            const screenshot = team.screenshot
              ? team.screenshot.startsWith("data:image")
                ? team.screenshot
                : `data:image/png;base64,${team.screenshot}`
              : null;

            return {
              ...team,
              screenshot,
            };
          });

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

  // Calculate total number of participants
  const totalParticipants = teams.reduce((total, team) => {
    return total + (team.members?.length || 0);
  }, 0);

  const filteredTeams = teams.filter((team) => {
    if (!team) return false;

    return (
      (team.teamName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      team.members?.some(
        (member) =>
          (member?.name?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (member?.email?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          )
      ) ||
      (team.transactionId?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
    );
  });

  if (isLoading) {
    return <div className="loading">Loading team data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Hackathon Team Registrations</h1>
        <div className="registration-count">
          Total Teams: {teams.length} | 
          Showing: {filteredTeams.length} | 
          Total Participants: {totalParticipants}
        </div>
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="home-button" onClick={() => navigate("/")}>
            Return to Home
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
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Team Leader</th>
                <th>Members</th>
                <th>Transaction</th>
                <th>Payment Proof</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => {
                const leader = team.members?.find(
                  (member) => member?.isTeamLead
                );
                const otherMembers =
                  team.members?.filter((member) => !member?.isTeamLead) || [];

                return (
                  <tr key={team._id}>
                    <td className="team-name">
                      <strong>{team.teamName}</strong>
                      {team.isRVCEStudent && (
                        <span className="rvce-tag">RVCE</span>
                      )}
                    </td>
                    <td className="leader-info">
                      {leader ? (
                        <>
                          <div>
                            <strong>{leader.name}</strong>
                          </div>
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
                              <div>
                                <strong>{member.name}</strong>
                              </div>
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
                          onClick={() => setSelectedImage(team.screenshot)}
                          onError={(e) => {
                            console.error(
                              "Image failed to load:",
                              team.screenshot
                            );
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        "No Screenshot"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close-button"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Enlarged Payment Screenshot"
              className="enlarged-screenshot"
              onError={(e) => {
                console.error("Failed to load enlarged image");
                e.target.style.display = "none";
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsData;