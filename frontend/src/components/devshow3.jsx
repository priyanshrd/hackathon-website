import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

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
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const DeveloperShowcase3 = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // For cyberpunk style terminal typing effect
  const [currentText, setCurrentText] = useState("TEAM.INIT()");
  const terminalTexts = ["LOADING DEVS...", "ACCESS GRANTED", "TEAM.INIT()"];
  
  const developers = [
    {
      id: "dev1",
      name: "Priyansh R D",
      role: "Web Team Lead",
      github: "https://github.com/priyanshrd",
      linkedin: "#",
      imgSrc: "./pgit.png",
      color: "#E4CD15"
    },
    {
      id: "dev2",
      name: "Tharunkrishna M",
      role: "UI/UX Developer",
      github: "https://github.com/Tharun151425",
      linkedin: "#",
      imgSrc: "./tgit.jpeg",
      color: "#E4CD15"
    },
    {
      id: "dev3",
      name: "Vishal K Bhat",
      role: "Backend Developer",
      github: "https://github.com/VishalBhat07",
      linkedin: "#",
      imgSrc: "./vgit.jpeg",
      color: "#38AAC9"
    }
  ];
  
  // Terminal typing effect
  useState(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrentText(terminalTexts[index]);
      index = (index + 1) % terminalTexts.length;
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-[#0a0a0a] relative">
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{
          backgroundImage: 'linear-gradient(#38AAC922 1px, transparent 1px), linear-gradient(90deg, #38AAC922 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Terminal-style header */}
        <div className="mb-12">
          <motion.div 
            className="bg-[#1a1a1a] border border-[#38AAC9] rounded-md p-3 max-w-lg mx-auto shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-[#E4CD15] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#38AAC9] mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-[#2a2a2a]"></div>
              <div className="ml-auto text-xs text-[#cccccc]">coreview.sh</div>
            </div>
            <div className="font-mono text-sm md:text-base">
              <span className="text-[#38AAC9]">root@system</span>
              <span className="text-[#cccccc]">:</span>
              <span className="text-[#E4CD15]">~</span>
              <span className="text-[#cccccc]">$ </span>
              <motion.span 
                className="text-white"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {currentText}<span className="animate-pulse">_</span>
              </motion.span>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {developers.map((dev, index) => {
            // Create unique refs for each card to handle tilt effect
            const cardRef = useRef(null);
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const rotateX = useTransform(y, [-100, 100], [30, -30]);
            const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouseMove(event) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    }
  
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setHoveredCard(null);
  }

  return (
    <motion.div
      key={dev.id}
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHoveredCard(dev.id)}
      className="bg-[#1a1a1a] border border-transparent hover:border-[#38AAC9] rounded-lg p-6 shadow-xl relative overflow-hidden group"
    >
      {/* Glowing effect when hovered */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#38AAC922] to-transparent opacity-0 group-hover:opacity-100"
        animate={{ 
          opacity: hoveredCard === dev.id ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Circuit-like lines in background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path 
            d={`M0,${50 + index * 10} Q${50 + index * 20},0 ${100 + index * 30},${70 + index * 5} T300,150`} 
            stroke={dev.color}
            strokeWidth="2"
            fill="none"
          />
          <path 
            d={`M${index * 30},${150 + index * 10} Q${250 - index * 20},${200 + index * 10} ${300 - index * 30},${250 - index * 15}`} 
            stroke={dev.color}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
      
      {/* Profile Image */}
      <div className="flex justify-center" style={{ transform: "translateZ(20px)" }}>
        <motion.div 
          className={`w-24 h-24 rounded-full p-1 bg-gradient-to-r from-[#38AAC9] to-[${dev.color}]`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0a]">
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
      
      {/* Dev Info */}
      <div className="mt-4 text-center" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold text-white mb-1 font-mono">{dev.name}</h3>
        <div className="flex items-center justify-center text-[#38AAC9] mb-4 text-sm">
          {dev.role === "Web Team Lead" && <TerminalIcon />}
          {dev.role === "Backend Developer" && <CodeIcon />}
          {dev.role === "UI/UX Designer" && <LayoutIcon />}
          <span className="ml-1">{dev.role}</span>
        </div>
        
        {/* Cyberpunk-style skill bar */}
        <div className="mb-4 bg-[#2a2a2a] h-2 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full rounded-full`}
            style={{ backgroundColor: dev.color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${70 + index * 10}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
            viewport={{ once: true }}
          />
        </div>
        
        {/* Social links */}
        <div className="flex justify-center space-x-6">
          <motion.a 
            href={dev.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.2, 
              color: dev.color,
              y: -5
            }}
            className="text-white hover:text-[#E4CD15] transition-all p-2"
            style={{ transform: "translateZ(40px)" }}
          >
            <GitHubIcon />
          </motion.a>
          <motion.a 
            href={dev.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.2, 
              color: "#38AAC9",
              y: -5
            }}
            className="text-white hover:text-[#38AAC9] transition-all p-2"
            style={{ transform: "translateZ(40px)" }}
          >
            <LinkedinIcon />
          </motion.a>
        </div>
      </div>
      
      {/* Cyberpunk badge */}
      <div 
        className="absolute top-4 right-4 font-mono text-xs text-[#cccccc] bg-[#2a2a2a] px-2 py-1 rounded"
        style={{ transform: "translateZ(20px)" }}
      >
        id_{index + 1}
      </div>
    </motion.div>
  );
})}
</div>

{/* Animated highlight line */}
<motion.div 
className="h-px bg-gradient-to-r from-transparent via-[#38AAC9] to-transparent my-12"
initial={{ scaleX: 0, opacity: 0 }}
whileInView={{ scaleX: 1, opacity: 1 }}
transition={{ duration: 1.5 }}
viewport={{ once: true }}
/>

{/* Terminal footer */}
<motion.div 
className="font-mono text-center text-sm text-[#cccccc]"
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
transition={{ delay: 0.8 }}
viewport={{ once: true }}
>
<span className="text-[#E4CD15]">dev@team</span>:<span className="text-[#38AAC9]">~</span>$ Process completed with code 0
</motion.div>
</div>
</section>
);
};

export default DeveloperShowcase3;