import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminManualRegistration.css';

const AdminManualRegistration = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [registrations, setRegistrations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    transactionId: '',
    eventType: 'workshop', // 'workshop' or 'hackathon'
    teamName: '', // For hackathon
    status: 'pending'
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${backend_url}/api/admin/registrations`);
      setRegistrations(response.data);
    } catch (err) {
      setError('Failed to fetch registrations');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      if (editingId) {
        // Update existing registration
        await axios.put(`${backend_url}/api/admin/registrations/${editingId}`, formData);
      } else {
        // Create new registration
        await axios.post(`${backend_url}/api/admin/registrations`, formData);
      }
      
      fetchRegistrations();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (registration) => {
    setFormData({
      name: registration.name,
      email: registration.email,
      phoneNumber: registration.phoneNumber,
      transactionId: registration.transactionId,
      eventType: registration.eventType,
      teamName: registration.teamName || '',
      status: registration.status
    });
    setEditingId(registration._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    
    try {
      setIsLoading(true);
      await axios.delete(`${backend_url}/api/admin/registrations/${id}`);
      fetchRegistrations();
    } catch (err) {
      setError('Failed to delete registration');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      transactionId: '',
      eventType: 'workshop',
      teamName: '',
      status: 'pending'
    });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="admin-manual-registration">
      <h1>Manual Registration Management</h1>
      
      <div className="form-container">
        <h2>{editingId ? 'Edit Registration' : 'Add New Registration'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Type:</label>
            <select 
              name="eventType" 
              value={formData.eventType}
              onChange={handleInputChange}
              required
            >
              <option value="workshop">Workshop</option>
              <option value="hackathon">Hackathon</option>
            </select>
          </div>

          {formData.eventType === 'hackathon' && (
            <div className="form-group">
              <label>Team Name:</label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Transaction ID:</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Status:</label>
            <select 
              name="status" 
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Processing...' : (editingId ? 'Update' : 'Add')}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} disabled={isLoading}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="registrations-list">
        <h2>Existing Registrations</h2>
        
        {isLoading && registrations.length === 0 ? (
          <p>Loading registrations...</p>
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
              {registrations.map(reg => (
                <tr key={reg._id}>
                  <td>{reg.eventType === 'hackathon' ? `Hackathon (${reg.teamName})` : 'Workshop'}</td>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.phoneNumber}</td>
                  <td>{reg.transactionId}</td>
                  <td>
                    <span className={`status-badge ${reg.status}`}>
                      {reg.status}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(reg)}>Edit</button>
                    <button onClick={() => handleDelete(reg._id)}>Delete</button>
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