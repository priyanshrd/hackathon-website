// src/pages/Home.js
import React, { useState } from 'react';
import RegistrationModal from '../components/RegistrationModal';

const Home = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to Tech Tanks 2025</h1>
      
      <button
        onClick={() => setIsRegistrationOpen(true)}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg 
          shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        Register Now
      </button>

      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </div>
  );
};

export default Home;