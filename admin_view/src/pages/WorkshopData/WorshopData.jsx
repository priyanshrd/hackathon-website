import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WorkshopData.css";

const WorkshopData = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [workshops, setWorkshops] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Component mounted, fetching workshop registrations...");
    const fetchWorkshops = async () => {
      try {
        setIsLoading(true);
        console.log(
          `Making request to: ${backend_url}/api/registration/screenshots`
        );

        const response = await axios.get(
          `${backend_url}/api/registration/screenshots`
        );
        console.log("API Response:", response);

        if (response.data) {
          console.log("Received workshop data:", response.data);
          // Handle both array and object with users property
          const workshopData = Array.isArray(response.data)
            ? response.data
            : response.data.users || [];
          setWorkshops(workshopData);
          setError(null);
        } else {
          console.warn("No workshop data received from API");
          setWorkshops([]);
        }
      } catch (err) {
        console.error("Error fetching workshops:", err);
        console.error("Error details:", err.response?.data || err.message);
        setError(`Failed to load workshop data: ${err.message}`);
        setWorkshops([]);
      } finally {
        setIsLoading(false);
        console.log("Finished loading workshops");
      }
    };

    fetchWorkshops();
  }, [backend_url]);

  const filteredWorkshops = workshops.filter((workshop) => {
    if (!workshop) return false;

    return (
      (workshop.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (workshop.email?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (workshop.phoneNumber?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (workshop.transactionId?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
    );
  });

  

    
  console.log("Current workshops state:", workshops);
  console.log("Filtered workshops:", filteredWorkshops);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  if (isLoading) {
    console.log("Rendering loading state");
    return <div className="loading">Loading workshop registrations...</div>;
  }

  if (error) {
    console.log("Rendering error state");
    return <div className="error">Error: {error}</div>;
  }

  console.log("Rendering main component");
  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Workshop Registrations</h1>
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search registrations..."
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

      {filteredWorkshops.length === 0 ? (
        <div>
          <p className="no-results">
            {workshops.length === 0
              ? "No workshop registrations yet."
              : "No registrations match your search."}
          </p>
          <p className="debug-info">
            Debug Info: Loaded {workshops.length} workshop registrations from
            API
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Transaction ID</th>
                <th>Payment Proof</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkshops.map((workshop) => (
                <tr key={workshop._id || workshop.transactionId}>
                  <td className="name">{workshop.name || "N/A"}</td>
                  <td className="email">{workshop.email || "N/A"}</td>
                  <td className="phone">{workshop.phoneNumber || "N/A"}</td>
                  <td className="transaction-id">
                    {workshop.transactionId || "N/A"}
                  </td>
                  <td className="screenshot-cell">
                    {workshop.image ? (
                      <img
                        src={`data:image/png;base64,${workshop.image}`}
                        alt="Payment Screenshot"
                        className="screenshot-thumbnail"
                        onClick={() => {
                          console.log(
                            "Clicked on screenshot for:",
                            workshop.name
                          );
                          setSelectedImage(workshop.image);
                        }}
                        title="Click to enlarge"
                      />
                    ) : (
                      "No Screenshot"
                    )}
                  </td>
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedImage && (
        <div
          className="modal"
          onClick={() => {
            console.log("Closing image modal");
            setSelectedImage(null);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close-button"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </span>
            <img
              src={`data:image/png;base64,${selectedImage}`}
              alt="Enlarged Payment Screenshot"
              className="enlarged-screenshot"
            />
            <div className="image-actions">
              <button
                onClick={() => {
                  console.log("Printing screenshot");
                  window.print();
                }}
              >
                Print
              </button>
              <button
                onClick={() => {
                  console.log("Downloading screenshot");
                  const link = document.createElement("a");
                  link.href = `data:image/png;base64,${selectedImage}`;
                  link.download = "workshop-payment-proof.png";
                  link.click();
                }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopData;
