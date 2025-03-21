import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkshopScreenshots = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/registration/screenshots"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch screenshots.");
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h2>Workshop Transaction Screenshots</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {users.map((user, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Transaction ID:</strong> {user.transactionId}
            </p>
            {user.image ? (
              <img
                src={`data:image/png;base64,${user.image}`}
                alt="Transaction Screenshot"
                style={{ width: "200px", height: "auto", borderRadius: "5px" }}
              />
            ) : (
              <p style={{ color: "gray" }}>No Screenshot Uploaded</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopScreenshots;
