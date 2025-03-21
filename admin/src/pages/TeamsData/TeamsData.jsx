import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TeamsData.css";

const TeamsData = () => {
  const [teams, setTeams] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/registration/teams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleStatusChange = async (team, status) => {
    const leader = team.members.find((member) => member.isTeamLead);
    if (!leader) {
      alert("No team leader found for this team.");
      return;
    }

    let subject, message;
    if (status === "accept") {
      subject = "Hackathon Registration Confirmed";
      message = `Dear ${leader.name},<br><br>Your team's registration for the hackathon has been <b>approved</b>. See you at the event!<br><br>Best regards,<br>Tech Tank Team`;
    } else {
      subject = "Hackathon Registration Rejected";
      message = `Dear ${leader.name},<br><br>Unfortunately, your team's registration for the hackathon has been <b>rejected</b>. Please contact support for further details.<br><br>Best regards,<br>Hackathon Team`;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/registration/send-email",
        {
          email: leader.email,
          subject,
          message,
        }
      );

      if (response.data.success) {
        alert(`Email sent successfully: ${status.toUpperCase()}ED`);
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email. Please try again.");
    }
  };

  return (
    <div className="admin-container">
      <h1>Hackathon Team Registrations</h1>

      <button className="home-button" onClick={() => navigate("/")}>
        Return to Home
      </button>

      {teams.length === 0 ? (
        <p className="error">No teams registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Team Leader</th>
              <th>Other Members</th>
              <th>Transaction ID</th>
              <th>Screenshot</th>
              <th>Status</th> {/* New Column */}
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => {
              const leader = team.members.find((member) => member.isTeamLead);
              const otherMembers = team.members.filter(
                (member) => !member.isTeamLead
              );

              return (
                <tr key={team.transactionId}>
                  <td>{team.teamName}</td>
                  <td>
                    {leader ? (
                      <div>
                        <strong>Name: {leader.name}</strong> <br />
                        Email: {leader.email} <br />
                        Phone: {leader.phoneNumber || "N/A"}
                      </div>
                    ) : (
                      "No Team Lead"
                    )}
                  </td>
                  <td>
                    <ul>
                      {otherMembers.length > 0 ? (
                        otherMembers.map((member) => (
                          <li key={member.email}>{member.name}</li>
                        ))
                      ) : (
                        <li>No Other Members</li>
                      )}
                    </ul>
                  </td>
                  <td>{team.transactionId}</td>
                  <td>
                    {team.screenshot ? (
                      <img
                        src={`data:image/png;base64,${team.screenshot}`}
                        alt="Payment Screenshot"
                        className="screenshot"
                        onClick={() => setSelectedImage(team.screenshot)}
                      />
                    ) : (
                      "No Screenshot"
                    )}
                  </td>
                  <td>
                    <button
                      className="accept-button"
                      onClick={() => handleStatusChange(team, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleStatusChange(team, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Enlarged Screenshot"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsData;
