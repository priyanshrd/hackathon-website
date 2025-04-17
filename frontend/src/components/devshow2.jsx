import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple SVG icons
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const CpuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

const DeveloperShowcase2 = () => {
  const [activeCard, setActiveCard] = useState(null);
  
  const developers = [
    {
      id: 1,
      name: "Priyansh R D",
      role: "Web Team Lead",
      github: "https://github.com/priyanshrd",
      linkedin: "#",
      imgSrc: "./pgit.png",
      icon: <TerminalIcon />
    },
    {
      id: 2,
      name: "Tharunkrishna M",
      role: "UI/UX Developer",
      github: "https://github.com/Tharun151425",
      linkedin: "#",
      imgSrc: "./tgit.jpeg",
      icon: <ZapIcon />
    },
    {
      id: 3,
      name: "Vishal K Bhat",
      role: "Backend Developer",
      github: "https://github.com/VishalBhat07",
      linkedin: "#",
      imgSrc: "./vgit.jpeg",
      icon: <CodeIcon />
    },
  ];

  // Tech circuit background nodes
  const nodes = Array(15).fill().map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2
  }));

  return (
    <section className="py-16 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Tech circuit background */}
      <div className="absolute inset-0 opacity-20">
        {nodes.map(node => (
          <motion.div
            key={node.id}
            className="absolute rounded-full bg-[#38AAC9]"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center justify-center mb-12"
        >
          {/* <CpuIcon className="text-[#E4CD15] mr-2" /> */}
          {/* <h2 className="text-3xl font-bold text-[#E4CD15] inline-block">
             Website Developers
          </h2> */}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developers.map((dev) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: dev.id * 0.15 }}
              viewport={{ once: true }}
              onHoverStart={() => setActiveCard(dev.id)}
              onHoverEnd={() => setActiveCard(null)}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden border-l-2 border-[#38AAC9] shadow-lg relative group"
            >
              {/* Tech lines animation in background */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <motion.div 
                  className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#E4CD15] to-transparent w-full" 
                  style={{ top: '30%' }}
                  animate={{ left: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#38AAC9] to-transparent w-full" 
                  style={{ top: '70%' }}
                  animate={{ left: ['100%', '-100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#38AAC9] mr-4">
                    <img 
                      src={dev.imgSrc} 
                      alt={dev.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${dev.name}&background=38AAC9&color=fff`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{dev.name}</h3>
                    <p className="text-[#38AAC9] flex items-center text-sm">
                      {dev.icon} <span className="ml-1">{dev.role}</span>
                    </p>
                  </div>
                </div>

                {/* Extended info that shows on hover
                <AnimatePresence>
                  {activeCard === dev.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {dev.skills.map(skill => (
                            <span 
                              key={skill} 
                              className="px-2 py-1 text-xs bg-[#2a2a2a] text-[#E4CD15] rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence> */}

                {/* Social links - always visible */}
                <div className="flex mt-4 space-x-3">
                  <motion.a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, color: '#E4CD15' }}
                    className="bg-[#2a2a2a] text-white p-2 rounded-md hover:text-[#E4CD15] transition-colors"
                  >
                    <GitHubIcon />
                  </motion.a>
                  <motion.a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, color: '#38AAC9' }}
                    className="bg-[#2a2a2a] text-white p-2 rounded-md hover:text-[#38AAC9] transition-colors"
                  >
                    <LinkedinIcon />
                  </motion.a>
                </div>
              </div>

              {/* Animated corner accent */}
              <motion.div 
                className="absolute top-0 right-0 w-12 h-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-0 right-0 w-0 h-0 border-t-12 border-r-12 border-t-[#E4CD15] border-r-transparent" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperShowcase2;