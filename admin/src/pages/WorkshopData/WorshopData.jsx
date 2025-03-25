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
        console.log(`Making request to: ${backend_url}/api/registration/screenshots`);
        
        const response = await axios.get(`${backend_url}/api/registration/screenshots`);
        console.log("API Response:", response);
        
        if (response.data) {
          console.log("Received workshop data:", response.data);
          // Handle both array and object with users property
          const workshopData = Array.isArray(response.data) 
            ? response.data 
            : (response.data.users || []);
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

  const filteredWorkshops = workshops.filter(workshop => {
    if (!workshop) return false;
    
    return (
      (workshop.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (workshop.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (workshop.phoneNumber?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (workshop.transactionId?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );
  });

  const handleStatusChange = async (workshop, status) => {
    console.log(`Changing status for workshop registration ${workshop._id} to ${status}`);
    
    const statusMessages = {
      accept: {
        subject: "Workshop Registration Confirmed",
        message: `Dear ${workshop.name},<br><br>Your registration for the workshop has been <b>approved</b>. See you at the event!<br><br>Best regards,<br>Workshop Team`
      },
      reject: {
        subject: "Workshop Registration Rejected",
        message: `Dear ${workshop.name},<br><br>Unfortunately, your registration for the workshop has been <b>rejected</b>. Please contact support for details.<br><br>Best regards,<br>Workshop Team`
      },
      pending: {
        subject: "Workshop Registration Update",
        message: `Dear ${workshop.name},<br><br>Your workshop registration is currently under review. We'll notify you soon.<br><br>Best regards,<br>Workshop Team`
      }
    };

    try {
      console.log("Sending status email to:", workshop.email);
      const response = await axios.post(
        `${backend_url}/api/registration/send-email`,
        {
          email: workshop.email,
          subject: statusMessages[status].subject,
          message: statusMessages[status].message,
          registrationId: workshop._id
        }
      );
      console.log("Email API response:", response.data);

      if (response.data?.success) {
        console.log(`Status updated successfully to ${status}`);
        alert(`Status updated to ${status.toUpperCase()} and email sent successfully`);
        setWorkshops(prevWorkshops => 
          prevWorkshops.map(w => 
            w._id === workshop._id ? { ...w, status } : w
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
            {workshops.length === 0 ? "No workshop registrations yet." : "No registrations match your search."}
          </p>
          <p className="debug-info">
            Debug Info: Loaded {workshops.length} workshop registrations from API
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
                <th>Registration Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkshops.map((workshop) => (
                <tr key={workshop._id || workshop.transactionId}>
                  <td className="name">{workshop.name || "N/A"}</td>
                  <td className="email">{workshop.email || "N/A"}</td>
                  <td className="phone">{workshop.phoneNumber || "N/A"}</td>
                  <td className="transaction-id">{workshop.transactionId || "N/A"}</td>
                  <td className="screenshot-cell">
                    {workshop.image ? (
                      <img
                        src={`data:image/png;base64,${workshop.image}`}
                        alt="Payment Screenshot"
                        className="screenshot-thumbnail"
                        onClick={() => {
                          console.log("Clicked on screenshot for:", workshop.name);
                          setSelectedImage(workshop.image);
                        }}
                        title="Click to enlarge"
                      />
                    ) : (
                      "No Screenshot"
                    )}
                  </td>
                  <td className="registration-date">
                    {formatDate(workshop.registrationDate || workshop.createdAt)}
                  </td>
                  <td className="status-cell">
                    <span className={`status-badge ${workshop.status || 'pending'}`}>
                      {workshop.status?.toUpperCase() || 'PENDING'}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button
                      className="accept-button"
                      onClick={() => {
                        console.log("Accept button clicked for:", workshop.name);
                        handleStatusChange(workshop, "accept");
                      }}
                      title="Approve this registration"
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => {
                        console.log("Reject button clicked for:", workshop.name);
                        handleStatusChange(workshop, "reject");
                      }}
                      title="Reject this registration"
                    >
                      Reject
                    </button>
                    <button
                      className="pending-button"
                      onClick={() => {
                        console.log("Pending button clicked for:", workshop.name);
                        handleStatusChange(workshop, "pending");
                      }}
                      title="Mark as pending"
                    >
                      Pending
                    </button>
                  </td>
                </tr>
              ))}
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
                link.download = 'workshop-payment-proof.png';
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

export default WorkshopData;