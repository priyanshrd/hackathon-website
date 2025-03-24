import React, { useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";


// Responsive Grid Styling
const gridStyles = `
  .title-container {
    position: relative;
    z-index: 10;
  }
  .grid-behind-title {
    position: absolute;
    width: 180%;
    height: 450%;
    top: -170%;
    left: -38%;
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(171, 180, 185, 0.4) 2px, transparent 2px),
      linear-gradient(to bottom, rgba(160, 180, 180, 0.4) 2px, transparent 2px);
    transform: perspective(500px) rotateX(60deg);
    z-index: 1; /* Grid stays behind the logo */
  }
  .registration-button {
    transition: all 0.3s ease;
  }
  .registration-button:hover {
    transform: translateY(-3px);
  }
  .premium-button {
    background: linear-gradient(135deg, #00b4db, #0083b0);
    border: none;
    position: relative;
    overflow: hidden;
  }
  .premium-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: all 0.5s ease;
  }
  .premium-button:hover::before {
    left: 100%;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const registrationRef = useRef(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const variants = {
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring",
        damping: 10,
        stiffness: 50,
        duration: 0.8
      } 
    },
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100 }
  };
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gridStyles }} />

      <div className="flex flex-col items-center justify-center bg-black text-white text-center px-4 relative"
           style={{ height: "calc(100vh - 4rem)" }}> {/* Adjust 4rem to match your navbar height */}
        {/* LOGOS - Larger and More Responsive */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-14">
          <img
            src="/rvce.png"
            alt="RVCE"
            className="h-16 w-auto sm:h-20 md:h-28 lg:h-32 object-contain" // Adjusted h-16 for mobile
          />
          <img
            src="/acm.png"
            alt="ACM RVCE"
            className="h-16 w-auto sm:h-20 md:h-28 lg:h-32 object-contain" // Adjusted h-16 for mobile
          />
          <img
            src="/gdg.png"
            alt="Google Developer Group"
            className="h-16 w-auto sm:h-20 md:h-28 lg:h-32 object-contain" // Adjusted h-16 for mobile
          />
        </div>

        {/* Title Section */}
        <div className="title-container relative">
          <div className="grid-behind-title"></div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wide drop-shadow-lg relative z-10">
            <span className="text-cyan-400">tech</span>
            <span className="text-yellow-400 relative">
              TAN
              <span className="bite-effect">K</span>
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-300 italic">
          A Shark Tank Inspired
        </p>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold mt-1 mb-8">
          12-Hour Hackathon
        </p>

        {/* Scroll Down Arrow with Animated Color Bars */}
<motion.div 
  className="absolute bottom-12 flex flex-col items-center cursor-pointer"
  onClick={scrollToRegistration}
>
  {/* Animated Color Bars */}
  <div className="flex items-center justify-center gap-4 w-full mb-2">
    <motion.div
      className="h-1 w-16 rounded-full"
      style={{ backgroundColor: "#38AAC9" }}
      initial={{ scaleX: 0.5, originX: 1 }}
      animate={{
        scaleX: [0.5, 1.5, 0.5],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="h-1 w-16 rounded-full"
      style={{ backgroundColor: "#E4CD15" }}
      initial={{ scaleX: 0.5, originX: 0 }}
      animate={{
        scaleX: [0.5, 1.5, 0.5],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }}
    />
  </div>

  {/* Simple White Arrow */}
  <motion.div
    animate={{
      y: [0, 8, 0],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </motion.div>
</motion.div>
      </div>

      {/* Registration Section */}
      <section
        ref={registrationRef}
        className="py-20 px-4 relative  flex items-center"
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          className="max-w-6xl mx-auto w-full"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.2 }
            }}
          >
            REGISTER NOW
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-[#38AAC9]/10 p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-105 border border-[#38AAC9]/30"
              initial="hiddenLeft"
              animate="visible"
              variants={variants}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-2 text-[#38AAC9]">Overnight Hackathon</h3>
              <p className="mb-4">Team of 2-4 members</p>
              <div className="text-3xl font-bold mb-6 text-[#E4CD15]">₹399</div>
              <p className="mb-6">Includes free workshop for all team members</p>
              <button
                onClick={() => navigate("/hackathon")}
                className="inline-block px-6 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300"
              >
                Register Team
              </button>
            </motion.div>

            <motion.div 
              className="bg-[#38AAC9]/10 p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-105 border border-[#38AAC9]/30"
              initial="hiddenRight"
              animate="visible"
              variants={variants}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-2 text-[#38AAC9]">Workshop</h3>
              <p className="mb-4">Individual participation</p>
              <div className="text-3xl font-bold mb-6 text-[#E4CD15]">₹99</div>
              <p className="mb-6">Single Entry for the workshop</p>
              <button
                onClick={() => navigate("/workshop")}
                className="inline-block px-6 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300"
              >
                Register for Workshop
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Register;
