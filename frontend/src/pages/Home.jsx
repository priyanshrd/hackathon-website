{/* Scroll Down Arrow - Enhanced */}
<motion.div
  animate={{
    y: [0, 15, 0],
  }}
  transition={{
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute bottom-12 cursor-pointer group"
  onClick={scrollToRegistration}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-14 w-14"
    fill="none"
    viewBox="0 0 24 24"
  >
    {/* Gradient Circle Background */}
    <defs>
      <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38AAC9" />
        <stop offset="100%" stopColor="#E4CD15" />
      </linearGradient>
    </defs>
    
    {/* Animated Circle */}
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      stroke="url(#arrowGradient)"
      strokeWidth="2"
      fill="transparent"
      initial={{ pathLength: 0 }}
      animate={{ 
        pathLength: 1,
        rotate: 360
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    
    {/* Arrow */}
    <motion.path
      stroke="url(#arrowGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 14l-7 7m0 0l-7-7m7 7V3"
      initial={{ opacity: 0.7 }}
      animate={{ 
        opacity: [0.7, 1, 0.7],
        y: [0, -3, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  </svg>
  
  {/* Glow Effect */}
  <motion.div 
    className="absolute inset-0 rounded-full bg-[#38AAC9] opacity-0 group-hover:opacity-20 blur-md -z-10"
    initial={{ scale: 0.8 }}
    animate={{
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
</motion.div>