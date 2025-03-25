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
    console.log("Component mounted, fetching teams...");
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        console.log(`Making request to: ${backend_url}/api/registration/teams`);
        
        const response = await axios.get(`${backend_url}/api/registration/teams`);
        console.log("API Response:", response);
        
        if (response.data && response.data.teams) {
          console.log("Received teams data:", response.data.teams);
          setTeams(response.data.teams);
          setError(null);
        } else {
          console.warn("No teams data received from API");
          setTeams([]);
        }
      } catch (err) {
        console.error("Error fetching teams:", err);
        console.error("Error details:", err.response?.data || err.message);
        setError(`Failed to load team data: ${err.message}`);
        setTeams([]);
      } finally {
        setIsLoading(false);
        console.log("Finished loading teams");
      }
    };

    fetchTeams();
  }, [backend_url]);

  const filteredTeams = teams.filter(team => {
    if (!team) return false;
    
    return (
      (team.teamName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (team.members?.some(member => 
        (member?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (member?.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )) ||
      (team.transactionId?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  });

  const handleStatusChange = async (team, status) => {
    console.log(`Changing status for team ${team._id} to ${status}`);
    
    const leader = team.members?.find((member) => member?.isTeamLead);
    if (!leader) {
      console.error("No team leader found for team:", team);
      alert("No team leader found for this team.");
      return;
    }

    const statusMessages = {
      accept: {
        subject: "Hackathon Registration Confirmed",
        message: `Dear ${leader.name},<br><br>Your team "${team.teamName}" has been <b>approved</b> for the hackathon. See you at the event!<br><br>Best regards,<br>Tech Tank Team`
      },
      reject: {
        subject: "Hackathon Registration Rejected",
        message: `Dear ${leader.name},<br><br>Unfortunately, your team "${team.teamName}" has been <b>rejected</b>. Please contact support for details.<br><br>Best regards,<br>Tech Tank Team`
      },
      pending: {
        subject: "Hackathon Registration Update",
        message: `Dear ${leader.name},<br><br>Your team "${team.teamName}" is currently under review. We'll notify you soon.<br><br>Best regards,<br>Tech Tank Team`
      }
    };

    try {
      console.log("Sending status email to:", leader.email);
      const response = await axios.post(
        `${backend_url}/api/registration/send-email`,
        {
          email: leader.email,
          subject: statusMessages[status].subject,
          message: statusMessages[status].message,
          teamId: team._id
        }
      );
      console.log("Email API response:", response.data);

      if (response.data?.success) {
        console.log(`Status updated successfully to ${status}`);
        alert(`Status updated to ${status.toUpperCase()} and email sent successfully`);
        setTeams(prevTeams => 
          prevTeams.map(t => 
            t._id === team._id ? { ...t, status } : t
          )
        );
      } else {
        console.warn("Email API returned unsuccessful response");
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      console.error("Error details:", error.response?.data || error.message);
      alert("Error updating status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      console.warn("No date string provided");
      return "N/A";
    }
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (err) {
      console.error("Error formatting date:", err);
      return "Invalid Date";
    }
  };

  console.log("Current teams state:", teams);
  console.log("Filtered teams:", filteredTeams);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  if (isLoading) {
    console.log("Rendering loading state");
    return <div className="loading">Loading team data...</div>;
  }

  if (error) {
    console.log("Rendering error state");
    return <div className="error">Error: {error}</div>;
  }

  console.log("Rendering main component");
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Hackathon Team Registrations</h1>
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => {
              console.log("Search term changed:", e.target.value);
              setSearchTerm(e.target.value);
            }}
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
            {teams.length === 0 ? "No teams registered yet." : "No teams match your search."}
          </p>
          <p className="debug-info">
            Debug Info: Loaded {teams.length} teams from API
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
                <th>Registration Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => {
                const leader = team.members?.find((member) => member?.isTeamLead);
                const otherMembers = team.members?.filter(
                  (member) => !member?.isTeamLead
                ) || [];

                return (
                  <tr key={team._id}>
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
                    <td className="transaction-id">
                      {team.transactionId}
                    </td>
                    <td className="screenshot-cell">
                      {team.screenshot ? (
                        <img
                          src={`data:image/png;base64,${team.screenshot}`}
                          alt="Payment Screenshot"
                          className="screenshot-thumbnail"
                          onClick={() => {
                            console.log("Clicked on screenshot for team:", team.teamName);
                            setSelectedImage(team.screenshot);
                          }}
                          title="Click to enlarge"
                        />
                      ) : (
                        "No Screenshot"
                      )}
                    </td>
                    <td className="registration-date">
                      {formatDate(team.registrationDate)}
                    </td>
                    <td className="status-cell">
                      <span className={`status-badge ${team.status || 'pending'}`}>
                        {team.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button
                        className="accept-button"
                        onClick={() => {
                          console.log("Accept button clicked for team:", team.teamName);
                          handleStatusChange(team, "accept");
                        }}
                        title="Approve this team"
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => {
                          console.log("Reject button clicked for team:", team.teamName);
                          handleStatusChange(team, "reject");
                        }}
                        title="Reject this team"
                      >
                        Reject
                      </button>
                      <button
                        className="pending-button"
                        onClick={() => {
                          console.log("Pending button clicked for team:", team.teamName);
                          handleStatusChange(team, "pending");
                        }}
                        title="Mark as pending"
                      >
                        Pending
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedImage && (
        <div className="modal" onClick={() => {
          console.log("Closing image modal");
          setSelectedImage(null);
        }}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-button" onClick={() => setSelectedImage(null)}>
              &times;
            </span>
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Enlarged Payment Screenshot"
              className="enlarged-screenshot"
            />
            <div className="image-actions">
              <button onClick={() => {
                console.log("Printing screenshot");
                window.print();
              }}>
                Print
              </button>
              <button onClick={() => {
                console.log("Downloading screenshot");
                const link = document.createElement('a');
                link.href = `data:image/png;base64,${selectedImage}`;
                link.download = 'payment-proof.png';
                link.click();
              }}>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsData;