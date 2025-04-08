import React from "react";
import { motion } from "framer-motion";

const ComingSoon = () => {
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
              Idea Submissions
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
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { repeat: Infinity, duration: 2 },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={colors.yellow}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
            </div>

            <motion.h2
              style={{ color: colors.yellow }}
              className="text-xl sm:text-2xl font-bold mb-4"
            >
              Make your submissions by 9th April, 10 AM!
            </motion.h2>

            <motion.p
              className="text-red-500 text-lg mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Avoid AI generated content.
            </motion.p>

            <motion.div
              className="inline-block bg-[#2a2a2a] px-6 py-3 rounded-lg mb-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <a href="https://forms.gle/tnnBgV8kk4y6sQG17" className="text-2xl font-bold" style={{ color: colors.blue }}>
              Click Here to Submit
              </a>
            </motion.div>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;