// src/components/FloatingNavbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// CSS variables - you can adjust these as needed
const colors = {
  primary: '#072ac8',     // Dark blue
  secondary: '#1e96fc',   // Medium blue
  tertiary: '#a2d6f9',    // Light blue
  accent: '#fcf300',      // Bright yellow
  accentAlt: '#ffc600',   // Golden yellow
  textLight: '#ffffff',   // White text
  dark: '#0a0a0a',        // Almost black
  darkBlue: '#041a57',    // Very dark blue
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorPosition, setIndicatorPosition] = useState({ left: 0, width: 0 });
  const navRefs = useRef({});
  const location = useLocation();
  
  // Define navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Submit Idea', path: '/submit' },
    { name: 'About', path: '/about' },
  ];

  // Update indicator position when route changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    
    if (activeItem && navRefs.current[activeItem.path]) {
      const activeElement = navRefs.current[activeItem.path];
      const { offsetLeft, offsetWidth } = activeElement;
      setIndicatorPosition({ left: offsetLeft, width: offsetWidth });
    }
  }, [location.pathname]);

  const handleHover = (path) => {
    if (navRefs.current[path]) {
      const element = navRefs.current[path];
      const { offsetLeft, offsetWidth } = element;
      setIndicatorPosition({ left: offsetLeft, width: offsetWidth });
    }
  };

  const handleHoverEnd = () => {
    const currentPath = location.pathname;
    const activeItem = navItems.find(item => item.path === currentPath);
    
    if (activeItem && navRefs.current[activeItem.path]) {
      const activeElement = navRefs.current[activeItem.path];
      const { offsetLeft, offsetWidth } = activeElement;
      setIndicatorPosition({ left: offsetLeft, width: offsetWidth });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 p-4">
      <nav className="mx-auto max-w-6xl bg-[#072ac8]/90 backdrop-blur-md rounded-2xl shadow-lg shadow-[#1e96fc]/20">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-extrabold text-white flex items-center"
          >
            <span className="mr-2 text-[#fcf300]">&lt;</span>
            <span>Tech Tank</span>
            <span className="ml-2 text-[#fcf300]">/&gt;</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 h-full relative">
            {/* Indicator */}
            <motion.div
              className="absolute bottom-0 h-1 bg-[#fcf300] rounded-full"
              initial={false}
              animate={{
                left: indicatorPosition.left,
                width: indicatorPosition.width,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                ref={(el) => (navRefs.current[item.path] = el)}
                onMouseEnter={() => handleHover(item.path)}
                onMouseLeave={handleHoverEnd}
                className={`px-6 py-1 text-lg font-medium transition-colors duration-300 h-full flex items-center ${
                  location.pathname === item.path 
                    ? 'text-[#fcf300]' 
                    : 'text-white hover:text-[#fcf300]'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Link 
              to="/register" 
              className="ml-4 px-6 py-2 bg-[#fcf300] text-[#072ac8] font-bold rounded-full 
              hover:bg-[#ffc600] hover:shadow-lg hover:shadow-[#fcf300]/30 transition-all duration-300
              transform hover:scale-105"
            >
              Register Now
            </Link>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none"
            aria-label="Menu"
          >
            <div className="w-8 h-6 flex flex-col justify-between">
              <motion.span 
                className="w-full h-0.5 bg-[#fcf300] block rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 10 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-[#fcf300] block rounded-full"
                animate={{
                  opacity: isOpen ? 0 : 1,
                  x: isOpen ? -20 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-[#fcf300] block rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -10 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="lg:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex flex-col p-4 border-t border-[#1e96fc]/30">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`py-4 px-4 text-lg font-medium ${
                  location.pathname === item.path 
                    ? 'text-[#fcf300] bg-[#072ac8]/50 rounded-lg' 
                    : 'text-white hover:bg-[#1e96fc]/20 hover:text-[#fcf300] rounded-lg transition-colors duration-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 py-4 flex justify-center">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-[#fcf300] text-[#072ac8] font-bold rounded-full 
                hover:bg-[#ffc600] hover:shadow-lg hover:shadow-[#fcf300]/30 transition-all duration-300 w-full text-center"
              >
                Register Now
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </div>
  );
};

export default Navbar;