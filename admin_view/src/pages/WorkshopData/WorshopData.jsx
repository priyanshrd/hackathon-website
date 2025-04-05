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

  const exportToExcel = () => {
    try {
      // Sort workshops alphabetically by name
      const sortedWorkshops = [...workshops].sort((a, b) => {
        const nameA = a.name?.toLowerCase() || '';
        const nameB = b.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      });

      // Prepare worksheet data
      const worksheetData = sortedWorkshops.map(workshop => {
        const isRV = isRVCEStudent(workshop);
        const usn = isRV ? getUSN(workshop) : "N/A";
        
        return {
          "Name": workshop.name || "N/A",
          "Email": workshop.email || "N/A",
          "USN": usn,
          "RVCE Student": isRV ? "Yes" : "No",
          "Phone": workshop.phoneNumber || "N/A",
          "Transaction ID": workshop.transactionId || "N/A",
          "Payment Proof": workshop.image ? "Yes" : "No",
          "College": workshop.college || "N/A"
        };
      });

      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Workshop Registrations");
      
      // Generate Excel file and download
      XLSX.writeFile(workbook, "workshop_registrations.xlsx", {
        compression: true
      });
    } catch (err) {
      console.error("Error generating Excel file:", err);
      alert("Failed to generate Excel file");
    }
  };

  const isRVCEStudent = (workshop) => {
    return (
      workshop.email?.endsWith("@rvce.edu.in") ||
      workshop.usn || // Check if USN field exists
      workshop.college?.toLowerCase()?.includes("rv college of engineering") ||
      workshop.college?.toLowerCase()?.includes("rvce")
    );
  };

  const getUSN = (workshop) => {
    // First try the USN field if it exists
    if (workshop.usn) return workshop.usn.toUpperCase();
    
    // Otherwise extract from RVCE email
    if (workshop.email?.endsWith("@rvce.edu.in")) {
      return workshop.email.split("@")[0].toUpperCase();
    }
    
    return "N/A";
  };


  const exportToCSV = () => {
    try {
      // Sort workshops alphabetically by name
      const sortedWorkshops = [...workshops].sort((a, b) => {
        const nameA = a.name?.toLowerCase() || '';
        const nameB = b.name?.toLowerCase() || '';
        return nameA.localeCompare(nameB);
      });

      // Prepare CSV content
      let csvContent = "Name,USN,RVCE Student,Attendance,Phone\n";
      
      sortedWorkshops.forEach(workshop => {
        const isRV = isRVCEStudent(workshop);
        const usn = isRV ? getUSN(workshop) : "N/A";
        
        csvContent += `"${workshop.name || 'N/A'}","${usn}","${isRV ? 'Yes' : 'No'}","",workshop.phoneNumber}"`
      });

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "workshop_attendance.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error generating CSV:", err);
      alert("Failed to generate CSV file");
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
              onClick={exportToCSV}
              disabled={workshops.length === 0}
            >
              Export Attendance CSV
            </button>
            <button 
              className="export-button excel" 
              onClick={exportToExcel}
              disabled={workshops.length === 0}
            >
              Export to Excel
            </button>
            <button className="home-button" onClick={() => navigate("/")}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>RVCE</th> {/* New column for RVCE marker */}
              <th>USN</th> {/* New column for USN */}
              <th>Phone</th>
              <th>Transaction ID</th>
              <th>Payment Proof</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkshops.map((workshop) => {
              const isRV = isRVCEStudent(workshop);
              const usn = isRV ? getUSN(workshop) : null;
              
              return (
                <tr key={workshop._id || workshop.transactionId}>
                  <td className="name">{workshop.name || "N/A"}</td>
                  <td className="email">{workshop.email || "N/A"}</td>
                  <td className="rvce-marker">
                    {isRV ? "✅" : "❌"}
                  </td>
                  <td className="usn">
                    {usn || "N/A"}
                  </td>
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
              );
            })}
          </tbody>
        </table>
      </div>
      

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