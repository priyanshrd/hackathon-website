import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WorkshopData.css"; // Import the CSS file

const WorkshopData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const backend_url = "http://localhost:8080";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          backend_url + "/api/registration/screenshots"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load workshop entries");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="admin-container">
      <h1>Workshop Registrations</h1>

      <button className="home-button" onClick={() => navigate("/")}>
        Return to Home
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Transaction ID</th>
                <th>Payment Screenshot</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.transactionId}</td>
                  <td>
                    {user.image ? (
                      <img
                        src={`data:image/png;base64,${user.image}`}
                        alt="Transaction Screenshot"
                        className="screenshot"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WorkshopData;
