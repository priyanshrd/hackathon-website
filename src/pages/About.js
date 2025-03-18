// src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="bg-black min-h-screen p-8 flex items-center justify-center">
      <div className="bg-gray-900 p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 max-w-2xl text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-green-500 mb-4">About</h1>
        <p className="text-green-300 text-lg">
          Hackathon 2023 is a collaborative event hosted by ACM and GDG. Join us for an exciting weekend of coding, learning, and innovation!
        </p>
      </div>
    </div>
  );
};

export default About;