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
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");
  const navigate = useNavigate();

  // Google Sheets configuration
  const SPREADSHEET_ID = "1La5uLL9KruXV2i4owgiWKiI6VCtRH69pZpCAFEY2RmI";
  const SHEET_NAME = "WorkshopRegistrations";
  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

  useEffect(() => {
    console.log("Component mounted, fetching workshop registrations...");
    fetchWorkshops();
  }, [backend_url]);

  const fetchWorkshops = async () => {
    try {
      setIsLoading(true);
      console.log(`Making request to: ${backend_url}/api/registration/screenshots`);

      const response = await axios.get(
        `${backend_url}/api/registration/screenshots`
      );
      console.log("API Response:", response);

      if (response.data) {
        console.log("Received workshop data:", response.data);
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

  const exportToGoogleSheets = async () => {
    try {
      setIsExporting(true);
      setExportStatus("Preparing data for export...");

      // Prepare the data in the format expected by Google Sheets API
      const headers = ["Name", "Email", "Phone", "Transaction ID", "Payment Proof"];
      const values = workshops.map(workshop => [
        workshop.name || "N/A",
        workshop.email || "N/A",
        workshop.phoneNumber || "N/A",
        workshop.transactionId || "N/A",
        workshop.image ? "Yes" : "No"
      ]);

      const dataToExport = [headers, ...values];

      // First, clear the existing sheet data
      setExportStatus("Clearing existing data...");
      const clearResponse = await axios.post(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:Z1000:clear`,
        {},
        {
          params: {
            key: API_KEY
          }
        }
      );

      console.log("Clear response:", clearResponse);

      // Then, write the new data
      setExportStatus("Uploading new data...");
      const updateResponse = await axios.post(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A1:append`,
        {
          values: dataToExport,
          majorDimension: "ROWS"
        },
        {
          params: {
            valueInputOption: "RAW",
            key: API_KEY
          }
        }
      );

      console.log("Update response:", updateResponse);
      setExportStatus("Data successfully exported to Google Sheets!");
      
      // Refresh the data after export
      await fetchWorkshops();
    } catch (err) {
      console.error("Error exporting to Google Sheets:", err);
      setExportStatus(`Export failed: ${err.message}`);
    } finally {
      setIsExporting(false);
      // Clear status after 5 seconds
      setTimeout(() => setExportStatus(""), 5000);
    }
  };

  const filteredWorkshops = workshops.filter((workshop) => {
    if (!workshop) return false;
    return (
      (workshop.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (workshop.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (workshop.phoneNumber?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (workshop.transactionId?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );
  });

  if (isLoading) {
    return <div className="loading">Loading workshop registrations...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Workshop Registrations</h1>
        <div className="registration-count">
          Total Registrations: {workshops.length} | 
          Showing: {filteredWorkshops.length}
        </div>
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="button-group">
            <button 
              className="export-button" 
              onClick={exportToGoogleSheets}
              disabled={isExporting || workshops.length === 0}
            >
              {isExporting ? "Exporting..." : "Export to Google Sheets"}
            </button>
            <button className="home-button" onClick={() => navigate("/")}>
              Return to Home
            </button>
          </div>
        </div>
        {exportStatus && <div className="export-status">{exportStatus}</div>}
      </div>

      {filteredWorkshops.length === 0 ? (
        <div>
          <p className="no-results">
            {workshops.length === 0
              ? "No workshop registrations yet."
              : "No registrations match your search."}
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
                        onClick={() => setSelectedImage(workshop.image)}
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
          onClick={() => setSelectedImage(null)}
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
              <button onClick={() => window.print()}>
                Print
              </button>
              <button
                onClick={() => {
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