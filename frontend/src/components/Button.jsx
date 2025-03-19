import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = "font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white px-6 py-3 focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 