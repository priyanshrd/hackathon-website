// src/pages/SubmitIdea.js
import React, { useState } from 'react';

const SubmitIdea = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    idea: '',
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // TODO: Send form data to the backend
  };

  return (
    <div className="bg-black min-h-[calc(100vh-4rem)] p-8">
      <h1 className="text-4xl font-bold text-green-500 mb-8 text-center animate-fade-in">
        Submit Your Idea
      </h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 px-4">
        <div>
          <label className="block text-lg text-green-500 mb-2">Team Name</label>
          <input
            type="text"
            value={formData.teamName}
            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            className="w-full p-3 bg-gray-900 text-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-green-500 mb-2">Idea Description</label>
          <textarea
            value={formData.idea}
            onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
            className="w-full p-3 bg-gray-900 text-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-lg text-green-500 mb-2">Upload File (PDF only)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            className="w-full p-3 bg-gray-900 text-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 hover:scale-105 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmitIdea;