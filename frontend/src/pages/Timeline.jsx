// src/pages/Timeline.js
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Timeline = () => {
  const events = [
    {
      day: "Workshop: Building Scalable Tech",
      time: "7th April, 11:00 AM",
      description:
        "Join our workshop on Building Scalable Tech for B2B & B2C Products/Services with industry experts to master impactful solutions!",
    },
    {
      day: "Round 1: Online Ideation",
      time: "7th April - 9th April",
      description:
        "Teams will submit a problem statement aligned with the provided tracks on the website. Selected teams will advance to Round 2.",
    },
    {
      day: "Round 2: Offline Hackathon",
      time: "11th April, 8:00 PM - 12th April, 8:00 AM",
      description:
        "Participants will collaborate, network with industry experts and peers, and showcase their skills. Dinner will be provided for all attendees.",
    },
    {
      day: "Evaluation & Results",
      time: "12th April, 10:00 AM",
      description:
        "Judging will begin at 10 AM on April 12th, with participants evaluated based on predefined criteria and their pitches. Results will be announced via email and on the website the same day.",
    },
  ];

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const cyanScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]); // Cyan bar (top to bottom)
  const yellowScaleY = useTransform(scrollYProgress, [0, 1], [1, 0]); // Yellow bar (bottom to top)

  return (
    <div className="bg-black min-h-[100vh] p-8 pt-20 overflow-hidden">
      {/* Title with Framer Motion */}
    <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-cyan-400 mb-12 text-center"
      >
        Timeline
      </motion.h1> 

      

      {/* Timeline Events */}
      <div className="space-y-12 max-w-2xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gray-900 p-8 rounded-xl shadow-2xl border-l-4 border-cyan-400"
            >
              <h2 className="text-2xl font-bold text-cyan-400">{event.day}</h2>
              <p className="text-yellow-400 mt-2 font-medium">{event.time}</p>
              <p className="text-gray-300 mt-4">{event.description}</p>
            </motion.div>

            {/* Timeline Dot */}
            <div className="absolute top-6 -left-3 w-6 h-6 bg-cyan-400 rounded-full border-4 border-black" />
          </motion.div>
        ))}
      </div>

      {/* Cyan Progress Bar on the Left (Top to Bottom) */}
      <motion.div
        style={{ scaleY: cyanScaleY }}
        className="fixed top-0 left-0 w-1 h-full bg-cyan-400 origin-top"
      />

      {/* Yellow Progress Bar on the Right (Bottom to Top) */}
      <motion.div
        style={{ scaleY: yellowScaleY }}
        className="fixed bottom-0 right-0 w-1 h-full bg-yellow-400 origin-bottom"
      />
    </div>
  );
};

export default Timeline;