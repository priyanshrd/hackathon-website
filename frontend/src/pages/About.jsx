// src/pages/About.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const About = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Placeholder panelist data (replace with actual images and details)
  const panelists = [
    {
      name: "John Doe",
      role: "Industry Expert",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      link: "#", // Replace with actual link
    },
    {
      name: "Jane Smith",
      role: "Investor",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      link: "#", // Replace with actual link
    },
    {
      name: "Alice Johnson",
      role: "Tech Entrepreneur",
      image: "https://via.placeholder.com/150", // Replace with actual image URL
      link: "#", // Replace with actual link
    },
  ];

  return (
    <div className="bg-black min-h-[100vh] p-8 pt-20">
      {/* Title with Framer Motion */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-cyan-400 mb-12 text-center"
      >
        About Tech Tank
      </motion.h1>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900 p-8 rounded-xl shadow-2xl border-l-4 border-cyan-400 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/about")} // Redirect to same page
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-4 hover:text-yellow-400 transition-all duration-300">
            Welcome to Tech Tank
          </h2>
          <p className="text-gray-300 text-lg">
            Tech Tank is a Shark Tank-inspired hackathon conducted by ACM RVCE Student Chapter and GDG (Google Developer Groups) RVCE. In today's tech-driven world, it’s not just about building great products—it’s about making them market-ready. This event bridges the gap between technology and business by encouraging participants to develop scalable, investor-ready B2B and B2C solutions. Compete, innovate, and pitch your way to success!
          </p>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900 p-8 rounded-xl shadow-2xl border-l-4 border-yellow-400 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/timeline")} // Redirect to Timeline page
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 hover:text-cyan-400 transition-all duration-300">
            Hackathon Timeline
          </h2>
          <ul className="text-gray-300 text-lg space-y-4">
            <li>
              <strong>Workshop:</strong> 7th April, 2 PM - 5 PM, IEM Auditorium
            </li>
            <li>
              <strong>Round 1 (Online):</strong> 7th April, 5 PM - 9th April, 5 PM
            </li>
            <li>
              <strong>Round 2 (Offline):</strong> 11th April, 8 PM - 12th April, 8 AM, Design Thinking Huddle
            </li>
            <li>
              <strong>Final Pitches & Evaluation:</strong> 12th April, 11 AM onwards
            </li>
          </ul>
        </motion.div>

        {/* Pre-Hackathon Workshop Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-900 p-8 rounded-xl shadow-2xl border-l-4 border-cyan-400 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/workshop")} // Redirect to workshop registration
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-4 hover:text-yellow-400 transition-all duration-300">
            Pre-Hackathon Workshop
          </h2>
          <p className="text-gray-300 text-lg mb-4">
            Great ideas are just the beginning. Scalability is what makes them legendary. To prepare you for the hackathon, we’re hosting an exclusive workshop on <strong>Building Scalable Tech</strong> by E-Dock. This session will help you:
          </p>
          <ul className="text-gray-300 text-lg list-disc list-inside space-y-2">
            <li>Understand how to scale your solutions for real-world applications.</li>
            <li>Learn key business strategies that make a product investor-ready.</li>
            <li>Master the fundamentals of tech-driven entrepreneurship.</li>
          </ul>
        </motion.div>

        {/* Why You Can’t Miss Tech Tank Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900 p-8 rounded-xl shadow-2xl border-l-4 border-yellow-400 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/")} // Redirect to Home page
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-4 hover:text-cyan-400 transition-all duration-300">
            Why You Can’t Miss Tech Tank
          </h2>
          <ul className="text-gray-300 text-lg list-disc list-inside space-y-2">
            <li>Gain <strong>5 Activity Points</strong>.</li>
            <li>Learn from the best—gain hands-on experience from industry experts.</li>
            <li>Think beyond coding—develop business models & pitch ideas.</li>
            <li>Win prizes & recognition—compete for cash prizes and awards.</li>
            <li>Networking—meet like-minded innovators.</li>
          </ul>
        </motion.div>

        {/* Registration & Fees Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-900 p-8 rounded-xl shadow-2xl border-l-4 border-cyan-400 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
          onClick={() => navigate("/hackathon")} // Redirect to hackathon registration page
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-4 hover:text-yellow-400 transition-all duration-300">
            Registration & Fees
          </h2>
          <ul className="text-gray-300 text-lg list-disc list-inside space-y-2">
            <li><strong>Hackathon (Team of 2-3):</strong> ₹500/team</li>
            <li><strong>Solo Workshop:</strong> ₹200/student</li>
          </ul>
        </motion.div>

        {/* Panelists Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-900 p-8 rounded-xl shadow-2xl border-l-4 border-yellow-400"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
            Meet Our Panelists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {panelists.map((panelist, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-gray-800 p-6 rounded-lg shadow-lg text-center cursor-pointer"
                onClick={() => window.open(panelist.link, "_blank")} // Open panelist link in new tab
              >
                <img
                  src={panelist.image}
                  alt={panelist.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  {panelist.name}
                </h3>
                <p className="text-gray-300">{panelist.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;