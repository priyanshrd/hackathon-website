import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminManualRegistration.css";

const AdminManualRegistration = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    transactionId: "",
    eventType: "workshop",
    teamName: "",
    status: "pending",
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${backend_url}/api/admin/registrations`
      );
      setRegistrations(response.data);
    } catch (err) {
      setError("Failed to fetch registrations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await axios.put(
          `${backend_url}/api/admin/registrations/${editingId}`,
          formData
        );
      } else {
        await axios.post(`${backend_url}/api/admin/registrations`, formData);
      }
      fetchRegistrations();
      resetForm();
    } catch (err) {
      setError("Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (registration) => {
    setFormData({ ...registration, teamName: registration.teamName || "" });
    setEditingId(registration._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    setIsLoading(true);
    try {
      await axios.delete(`${backend_url}/api/admin/registrations/${id}`);
      fetchRegistrations();
    } catch (err) {
      setError("Failed to delete");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      transactionId: "",
      eventType: "workshop",
      teamName: "",
      status: "pending",
    });
    setEditingId(null);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{editingId ? "Edit Registration" : "Add New Registration"}</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleInputChange}
          >
            <option value="workshop">Workshop</option>
            <option value="hackathon">Hackathon</option>
          </select>

          {formData.eventType === "hackathon" && (
            <input
              type="text"
              name="teamName"
              placeholder="Team Name"
              value={formData.teamName}
              onChange={handleInputChange}
            />
          )}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="transactionId"
            placeholder="Transaction ID"
            value={formData.transactionId}
            onChange={handleInputChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>

          {error && <p className="error">{error}</p>}

          <div className="btn-group">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Existing Registrations</h2>
        {isLoading && registrations.length === 0 ? (
          <p>Loading...</p>
        ) : registrations.length === 0 ? (
          <p>No registrations found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Transaction ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr key={reg._id}>
                  <td>
                    {reg.eventType === "hackathon"
                      ? `Hackathon (${reg.teamName})`
                      : "Workshop"}
                  </td>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phoneNumber}</td>
                  <td>{reg.transactionId}</td>
                  <td>{reg.status}</td>
                  <td>
                    <button onClick={() => handleEdit(reg)}>Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(reg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminManualRegistration;
