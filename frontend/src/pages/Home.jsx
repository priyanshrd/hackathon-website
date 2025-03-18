// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div className="bg-black min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-green-500 mb-4 animate-fade-in">
          Tech Tank 2025
        </h1>
        <p className="text-lg md:text-xl text-green-300 mb-8 animate-fade-in">
          Join the biggest hackathon hosted by ACM and GDG!
        </p>
        <button
          className="bg-green-500 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 hover:scale-105 transition duration-300 animate-bounce"
        >
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Home;