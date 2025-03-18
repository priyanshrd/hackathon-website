// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-green-500 hover:text-green-300 transition duration-300">
          Tech Tank 2025
        </Link>
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-green-500 focus:outline-none lg:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link to="/" className="text-green-500 hover:text-green-300 transition duration-300">Home</Link>
          <Link to="/timeline" className="text-green-500 hover:text-green-300 transition duration-300">Timeline</Link>
          <Link to="/submit" className="text-green-500 hover:text-green-300 transition duration-300">Submit Idea</Link>
          <Link to="/about" className="text-green-500 hover:text-green-300 transition duration-300">About</Link>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-900">
          <Link to="/" className="block p-4 text-green-500 hover:bg-gray-800">Home</Link>
          <Link to="/timeline" className="block p-4 text-green-500 hover:bg-gray-800">Timeline</Link>
          <Link to="/submit" className="block p-4 text-green-500 hover:bg-gray-800">Submit Idea</Link>
          <Link to="/about" className="block p-4 text-green-500 hover:bg-gray-800">About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;