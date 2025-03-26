import React from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  // Color palette (same as your original)
  const colors = {
    blue: "#38AAC9",
    yellow: "#E4CD15",
    dark: "#0a0a0a",
    darkGray: "#1a1a1a",
    mediumGray: "#2a2a2a",
    lightGray: "#3a3a3a",
    textLight: "#ffffff",
    textGray: "#cccccc",
  };

  return (
    <div 
      className="fixed inset-0"
      style={{
        top: '64px', // Adjust this value to match your navbar height
        height: 'calc(100vh - 64px)', // Subtract navbar height
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-full w-full flex items-center justify-center bg-[#0a0a0a]"
      >
        <motion.div
          className="w-full max-w-2xl mx-4 bg-[#1a1a1a] rounded-xl shadow-lg p-6 sm:p-8 border border-[#3a3a3a]"
          style={{ maxHeight: '90vh' }}
        >
          {/* Animated header */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.h1
              style={{ color: colors.blue }}
              className="text-2xl sm:text-3xl font-bold mb-2"
            >
              Hackathon Leaderboard
            </motion.h1>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-[#38AAC9] to-[#E4CD15] rounded-full"></div>
          </motion.div>

          {/* Main content with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            {/* Podium Animation */}
            <div className="flex justify-center items-end mb-8 h-48">
              {/* 2nd Place */}
              <motion.div
                className="w-24 bg-[#38AAC9]/30 border-t-2 border-[#38AAC9] flex flex-col items-center mx-2"
                style={{ height: '60%' }}
                initial={{ height: 0 }}
                animate={{ height: '60%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="text-4xl font-bold mt-2" style={{ color: colors.yellow }}>2</div>
              </motion.div>
              
              {/* 1st Place */}
              <motion.div
                className="w-28 bg-[#E4CD15]/30 border-t-2 border-[#E4CD15] flex flex-col items-center mx-2"
                style={{ height: '100%' }}
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="text-4xl font-bold mt-2" style={{ color: colors.blue }}>1</div>
              </motion.div>
              
              {/* 3rd Place */}
              <motion.div
                className="w-20 bg-[#38AAC9]/30 border-t-2 border-[#38AAC9] flex flex-col items-center mx-2"
                style={{ height: '40%' }}
                initial={{ height: 0 }}
                animate={{ height: '40%' }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-4xl font-bold mt-2" style={{ color: colors.yellow }}>3</div>
              </motion.div>
            </div>

            <motion.h2
              style={{ color: colors.yellow }}
              className="text-xl sm:text-2xl font-bold mb-4"
            >
              Leaderboard Goes Live Soon!
            </motion.h2>

            <motion.p
              className="text-white text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Live results will be available on
            </motion.p>

            <motion.div
              className="inline-block bg-[#2a2a2a] px-6 py-3 rounded-lg mb-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-2xl font-bold" style={{ color: colors.blue }}>
                April 12th, 10 AM
              </p>
            </motion.div>

            <motion.p
              className="text-[#cccccc]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Check back to see the top performing teams!
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;