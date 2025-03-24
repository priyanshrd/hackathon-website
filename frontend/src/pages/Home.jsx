import React from "react";
import rv_logo from "../../public/rvce.png";
import acm_logo from "../../public/acm.png";
import gdg_logo from "../../public/gdg.png";
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

const Home = () => {
  const navigate = useNavigate();
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

        {/* Registration Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md px-4 sm:px-0">
          {/* Hackathon Button with Pulse Effect */}
          <button
            onClick={() => navigate("/hackathon")}
            className="registration-button py-3 px-6 rounded-full bg-yellow-400 text-black font-bold hover:bg-cyan-500 focus:outline-none w-full sm:w-auto relative overflow-hidden transform transition-all duration-300 hover:scale-105 pulse-effect"
          >
            <span className="relative z-10">
              HACKATHON <br /> (WORKSHOP INCLUDED)
            </span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-cyan-500 opacity-0 hover:opacity-30 transition-opacity duration-300"
              style={{ borderRadius: "9999px" }}
            ></span>
          </button>

          {/* Workshop Only Button - Simple and Less Attractive */}
          <button
            onClick={() => navigate("/workshop")}
            className="registration-button py-3 px-6 rounded-full bg-transparent text-white border-2 border-white hover:border-yellow-400 hover:text-yellow-400 focus:outline-none w-full sm:w-auto transition-all duration-300"
          >
            WORKSHOP ONLY
          </button>
        </div>

        {/* Call to Action */}
        <p className="mt-6 text-base sm:text-lg text-[#cccccc]">
          Register now to secure your spot!
        </p>
      </div>
    </>
  );
};

export default Home;