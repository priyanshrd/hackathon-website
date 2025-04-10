import React from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
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

  const teamNames = [
    "404 Founders",
    "AGENTS",
    "AI4TW",
    "Aris",
    "BETEGEUSE",
    "BigO(4)",
    "ByteForge",
    "But by bit",
    "Dark Lumos",
    "DarkClaws",
    "DevPuff Squad",
    "EcoAgriWave",
    "FLYER DOPE",
    "Fourmula1",
    "HackFinity",
    "HackNovas",
    "Hactivators",
    "HalfByte Crew",
    "Idk",
    "Imaginears",
    "Infinite Loopers",
    "Innovestars",
    "Koi Pond",
    "Musk's Melons",
    "No idea",
    "Parachute",
    "Phoenix",
    "RestOfUs",
    "SAHA",
    "SILICON AGE BARONS",
    "Sasta Schrodingers",
    "SYNTAX SYNDICATE",
    "TARS",
    "TECHIES",
    "Team Mavericks",
    "Team Overclocked",
    "The Algorythmics",
    "VectorX",
    "Web_builder",
    "YOLO",
    "Zephyr",
    "oNe-O-oNe"
  ];

  // Function to determine team styling based on rank
  const getTeamStyle = (index) => {
    switch(index) {
      case 0: // 1st place
        return {
          bg: "bg-gradient-to-r from-[#E4CD15]/10 to-[#E4CD15]/5",
          border: "border-[#E4CD15]/50",
          text: "text-[#E4CD15]",
          scoreBg: "bg-[#E4CD15]/20"
        };
      case 1: // 2nd place
        return {
          bg: "bg-gradient-to-r from-[#38AAC9]/10 to-[#38AAC9]/5", 
          border: "border-[#38AAC9]/50",
          text: "text-[#38AAC9]",
          scoreBg: "bg-[#38AAC9]/20"
        };
      case 2: // 3rd place
        return {
          bg: "bg-gradient-to-r from-[#38AAC9]/10 to-[#38AAC9]/5",
          border: "border-[#38AAC9]/50",
          text: "text-[#38AAC9]",
          scoreBg: "bg-[#38AAC9]/20"
        };
      default:
        return {
          bg: "bg-[#2a2a2a]",
          border: "border-[#38AAC9]/10",
          text: "text-white",
          scoreBg: "bg-[#1a1a1a]"
        };
    }
  };

  return (
    <div 
      className="fixed inset-0"
      style={{
        top: '64px',
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-full w-full flex flex-col items-center bg-[#0a0a0a] pt-8 pb-4"
      >
        <motion.div
          className="w-full max-w-3xl mx-4 bg-[#1a1a1a] rounded-xl shadow-lg p-6 sm:p-8 border border-[#3a3a3a] flex flex-col"
          style={{ 
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <motion.h1 style={{ color: colors.blue }} className="text-3xl sm:text-4xl font-bold mb-2">
              Selections for Round 2
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 w-32 mx-auto bg-gradient-to-r from-[#38AAC9] to-[#E4CD15] rounded-full"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl mt-4 font-medium"
              style={{ color: colors.yellow }}
            >
              Congratulations to all the selected teams!
            </motion.p>
          </motion.div>

          {/* Top 3 Podium */}
          <div className="flex justify-center mb-8 h-24">
            {/* 2nd Place */}
            <motion.div 
              className="w-24 flex flex-col items-center mx-2 justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className={`w-full p-3 rounded-t-lg ${getTeamStyle(1).bg} ${getTeamStyle(1).border} border-b-0`}>
                <div className="text-center font-bold" style={{ color: colors.blue }}>02</div>
              </div>
              <div className={`w-full p-2 text-center ${getTeamStyle(1).scoreBg} rounded-b-lg`}>
                <span className="font-mono">0</span>
              </div>
            </motion.div>
            
            {/* 1st Place */}
            <motion.div 
              className="w-28 flex flex-col items-center mx-2 justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`w-full p-3 rounded-t-lg ${getTeamStyle(0).bg} ${getTeamStyle(0).border} border-b-0`}>
                <div className="text-center font-bold" style={{ color: colors.yellow }}>01</div>
              </div>
              <div className={`w-full p-2 text-center ${getTeamStyle(0).scoreBg} rounded-b-lg`}>
                <span className="font-mono">0</span>
              </div>
            </motion.div>
            
            {/* 3rd Place */}
            <motion.div 
              className="w-20 flex flex-col items-center mx-2 justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className={`w-full p-3 rounded-t-lg ${getTeamStyle(2).bg} ${getTeamStyle(2).border} border-b-0`}>
                <div className="text-center font-bold" style={{ color: colors.blue }}>03</div>
              </div>
              <div className={`w-full p-2 text-center ${getTeamStyle(2).scoreBg} rounded-b-lg`}>
                <span className="font-mono">0</span>
              </div>
            </motion.div>
          </div>

          {/* Scrollable Teams List */}
          <div 
            className="flex-1 overflow-y-auto pr-2" 
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: `${colors.blue} transparent`
            }}
          >
            <div className="space-y-2">
              {teamNames.map((team, index) => {
                const style = getTeamStyle(index);
                return (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: 0.8 + (index * 0.03)
                    }}
                    className={`p-3 rounded-lg ${style.bg} ${style.border} transition-all duration-300 group flex justify-between items-center`}
                    whileHover={{ scale: index < 3 ? 1 : 1.02 }}
                  >
                    <div className="flex items-center">
                      <span className={`text-lg font-mono mr-4 w-8 text-right ${index < 3 ? 'font-bold' : ''} ${style.text}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={`text-lg ${style.text} ${index < 3 ? 'font-bold' : 'font-medium'}`}>
                        {team}
                      </span>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${style.scoreBg} font-mono`}>
                      0
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            className="text-center mt-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#38AAC9] to-transparent mb-4"></div>
            <p className="text-sm text-[#38AAC9]">
              Scores will be updated live during the event.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;