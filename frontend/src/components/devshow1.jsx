import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Simple SVG icons instead of Lucide
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const DeveloperShowcase1 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const developers = [
    {
      name: "Priyansh R D",
      role: "Web Team Lead",
      github: "https://github.com/priyanshrd",
      linkedin: "#",
      imgSrc: "./pgit.png",
    },
    {
      name: "Tharunkrishna M",
      role: "UI/UX Developer",
      github: "https://github.com/Tharun151425",
      linkedin: "#",
      imgSrc: "./tgit.jpeg",
    },
    {
      name: "Vishal K Bhat",
      role: "Backend Developer",
      github: "https://github.com/VishalBhat07",
      linkedin: "#",
      imgSrc: "./vgit.jpeg",
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5">
        {Array(144).fill().map((_, i) => (
          <div key={i} className="border border-[#38AAC9]/20"></div>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] text-center"
        >
          <span className="relative inline-block">
            Website Developers
            <motion.span 
              className="absolute left-0 -bottom-2 w-full h-0.5 bg-[#38AAC9]"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {developers.map((dev, index) => (
            <motion.div
              key={dev.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              style={{
                transform: mousePosition.x && mousePosition.y 
                  ? `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) / 50}deg) rotateY(${-(mousePosition.x - window.innerWidth / 2) / 50}deg)`
                  : 'none'
              }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-6 rounded-xl border border-[#38AAC9]/20 shadow-lg"
            >
              {/* Developer image with ring animation */}
              <div className="flex justify-center mb-4 relative">
                <motion.div 
                  className="w-28 h-28 rounded-full p-1 bg-gradient-to-r from-[#38AAC9] to-[#E4CD15]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0a0a0a]">
                    <img 
                      src={dev.imgSrc} 
                      alt={dev.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${dev.name}&background=38AAC9&color=fff`;
                      }}
                    />
                  </div>
                </motion.div>
              </div>
              
              {/* Content area */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1">{dev.name}</h3>
                <p className="text-[#38AAC9] mb-4 flex items-center justify-center">
                  <CodeIcon /> <span className="ml-1">{dev.role}</span>
                </p>
                
                {/* Social links */}
                <div className="flex justify-center space-x-4">
                  <motion.a 
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: '#E4CD15' }}
                    className="text-white hover:text-[#E4CD15] transition-colors"
                  >
                    <GitHubIcon />
                  </motion.a>
                  <motion.a 
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: '#38AAC9' }}
                    className="text-white hover:text-[#38AAC9] transition-colors"
                  >
                    <LinkedinIcon />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeveloperShowcase1;