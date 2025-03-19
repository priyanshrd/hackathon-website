import React from "react";
import rv_logo from "../../public/rvce.png";
import acm_logo from "../../public/acm.png";
import gdg_logo from "../../public/gdg.png";

// Add this to your CSS file or styled-components
const gridStyles = `
  .title-container {
    position: relative;
    z-index: 10;
  }
  .grid-behind-title {
    position: absolute;
    width: 120%;
    height: 300%;
    top: -100%;
    left: -10%;
    background-size: 40px 40px;
    background-image:
      linear-gradient(to right, rgba(171, 180, 185, 0.4) 2px, transparent 2px),
      linear-gradient(to bottom, rgba(160, 180, 180, 0.4) 2px, transparent 2px);
    transform: perspective(500px) rotateX(60deg);
    z-index: 1;
  }
`;

const Home = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gridStyles }} />
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4 relative">
        {/* LOGOS (Larger & Well-Spaced) */}
        <div className="flex justify-center items-center space-x-16 mb-12">
          <img
            src={rv_logo}
            alt="RVCE"
            className="h-28 w-28 md:h-36 md:w-36 lg:h-44 lg:w-44 object-contain"
          />
          <img
            src={acm_logo}
            alt="ACM RVCE"
            className="h-28 w-28 md:h-36 md:w-36 lg:h-44 lg:w-44 object-contain"
          />
          <img
            src={gdg_logo}
            alt="Google Developer Group"
            className="h-28 w-28 md:h-36 md:w-36 lg:h-44 lg:w-44 object-contain"
          />
        </div>
        <div className="title-container relative">
          <div className="grid-behind-title"></div>
          <h1 className="text-7xl md:text-8xl font-extrabold text-cyan-400 tracking-wide drop-shadow-lg relative z-10">
            tech <span className="text-yellow-400">TANK</span>
          </h1>
        </div>
        <p className="mt-4 text-lg md:text-xl text-gray-300 italic">
          A Shark Tank Inspired
        </p>
        <p className="text-2xl font-semibold mt-1">12-Hour Hackathon</p>
        <a
          href="#register"
          className="mt-6 bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-lg text-lg font-semibold uppercase tracking-wider transition-transform transform hover:scale-105 shadow-md"
        >
          Register Now
        </a>
      </div>
    </>
  );
};

export default Home;
