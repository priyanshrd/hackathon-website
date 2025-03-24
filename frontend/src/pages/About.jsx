import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addSectionRef = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };

  const downloadBrochure = () => {
    // Replace with actual brochure PDF URL
    const pdfUrl = "/TechTankRVCE_Brochure.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "TechTankRVCE_Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const judges = [
    {
      name: "Siddhant Goswami",
      title: "100xEngineers+",
      image: "/7.png",
    },
    {
      name: "Arshdeep Singh",
      title: "EDock",
      image: "/8.png",
    },
    {
      name: "Shivaram K R",
      title: "Hue Learn",
      image: "/9.png",
    },
    {
      name: "Sriharsha Donthi",
      title: "Oracle",
      image: "/10.png",
    },
    {
      name: "Raghu Sarangajan",
      title: "Cubyts",
      image: "/11.png",
    },
    {
      name: "Kartik Sirigeri",
      title: "OpenText",
      image: "/12.png",
    },
];
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header / Hero Section */}
      <header className="h-screen flex flex-col justify-center items-center text-center px-4">
        <div
          className="mb-12 animate-fadeIn"
          style={{ animation: "scale-in 1s forwards" }}
        >
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center bg-[#1a1a1a] border-4 border-[#38AAC9] shadow-xl hover:shadow-[#38AAC9]/100 hover:shadow-xl shadow-[#E4CD15]/60 transition-all duration-500 ease-in-out">
            <span>
              <img
                src="/tech_TANK.jpeg"
                alt="Logo"
                className="w-48 h-48 sm:h-8 md:h-16 object-cover object-center"
              />
            </span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6 text-[#E4CD15]"
            style={{ animation: "fade-in-up 1s 0.3s both" }}
          >
            Build. Pitch. Win.
          </h1>
          <p
            className="text-xl md:text-2xl mb-6 text-[#38AAC9]"
            style={{ animation: "fade-in-up 1s 0.6s both" }}
          >
            Where Innovation Meets Entrepreneurship
          </p>
          <p
            className="mb-10 text-lg"
            style={{ animation: "fade-in-up 1s 0.9s both" }}
          >
            Tech Tank is a Shark Tank-inspired hackathon organized by ACM RVCE 
            Student Chapter and GDG RVCE. It's a unique platform where technology 
            meets business, challenging participants to develop scalable, 
            investor-ready solutions.
          </p>
          <button
            onClick={downloadBrochure}
            className="inline-block px-8 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1"
            style={{ animation: "fade-in-up 1s 1.2s both" }}
          >
            Download Brochure
          </button>
        </div>
      </header>

      <main>
        {/* Who Can Participate Section */}
        <section
          id="who-can-participate"
          ref={addSectionRef("who-can-participate")}
          className={`py-20 px-4 ${
            isVisible["who-can-participate"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
              Who Can Participate?
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Students
                </h3>
                <p>Undergraduate and postgraduate students from any discipline</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Teams
                </h3>
                <p>Teams of 2-4 members with complementary skills</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Individuals
                </h3>
                <p>Solo participants can join for the workshop</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#38AAC9]/10 border-l-4 border-[#38AAC9] rounded-r-lg">
              <p className="text-lg">
                Whether you're a coder, designer, or business enthusiast, Tech Tank 
                provides the perfect platform to showcase your skills and turn ideas 
                into reality!
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          ref={addSectionRef("about")}
          className={`py-20 px-4 ${
            isVisible["about"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#E4CD15] inline-block relative">
              About Tech Tank
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <p className="text-lg mb-6">
              Tech Tank is a unique hackathon that combines technology development 
              with business pitching. Unlike traditional hackathons, we emphasize 
              creating solutions that are not just technically sound but also 
              commercially viable and investor-ready.
            </p>

            <p className="text-lg">
              Organized by ACM RVCE Student Chapter in collaboration with GDG RVCE, 
              this event bridges the gap between technical skills and entrepreneurial 
              thinking, preparing participants for real-world challenges in the 
              tech industry.
            </p>
          </div>
        </section>

        {/* Timeline Section
        <section 
          id="timeline" 
          ref={addSectionRef('timeline')}
          className={`py-20 px-4 ${isVisible['timeline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
              Event Timeline
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>
            
            <div className="relative">
              {/* Timeline Line
              <div className="absolute left-0 md:left-1/2 w-1 h-full bg-[#38AAC9] -ml-0.5 md:-ml-0.5"></div>

              {/* Timeline Items 
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Workshop 
                <div className="md:col-start-2 relative mb-16 md:pl-12">
                  <div className="absolute top-0 -left-4 md:-left-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">April 7, 2024 | 2 PM - 5 PM</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Workshop</h3>
                    <p>IEM Auditorium, RVCE</p>
                  </div>
                </div>

                {/* Round 1 
                <div className="md:col-start-1 md:text-right relative mb-16 md:pr-12">
                  <div className="absolute top-0 -right-4 md:-right-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">April 7, 5 PM - April 9, 5 PM</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Round 1 (Online)</h3>
                    <p>Initial proposal submission</p>
                  </div>
                </div>

                {/* Round 
                <div className="md:col-start-2 relative mb-16 md:pl-12">
                  <div className="absolute top-0 -left-4 md:-left-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">April 11, 8 PM - April 12, 8 AM</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Round 2 (Offline)</h3>
                    <p>Design Thinking Huddle</p>
                  </div>
                </div>
                <div className="md:col-start-1 md:text-right relative mb-16 md:pr-12">
                  <div className="absolute top-0 -right-4 md:-right-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">April 12, 11 AM onwards</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Final Pitches</h3>
                    <p>Presentation to judges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> 
*/}

        {/* Judges Section */}
<section
  id="judges"
  ref={addSectionRef("judges")}
  className={`py-20 px-4 ${
    isVisible["judges"]
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  } transition-all duration-1000 ease-out`}
>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
      Meet Your Judges
      <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Judge 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300 flex flex-col items-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
          <img
            src="/7.png"
            alt="Siddhant Goswami"
            className="w-full h-full object-cover"
          />
          <a 
            href="https://www.linkedin.com/in/siddhant-goswami-6444b0146/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg className="w-8 h-8 text-[#38AAC9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <h3 className="text-xl font-bold text-center text-[#E4CD15]">
          Siddhant Goswami
        </h3>
        <p className="text-center text-[#38AAC9] mb-2">Founder & CEO</p>
        <p className="text-center text-white">100xEngineers+</p>
      </motion.div>

      {/* Judge 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300 flex flex-col items-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
          <img
            src="/8.png"
            alt="Arshdeep Singh"
            className="w-full h-full object-cover"
          />
          <a 
            href="https://www.linkedin.com/in/065rsh/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg className="w-8 h-8 text-[#38AAC9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <h3 className="text-xl font-bold text-center text-[#E4CD15]">
          Arshdeep Singh
        </h3>
        <p className="text-center text-[#38AAC9] mb-2">Founder</p>
        <p className="text-center text-white">EDock</p>
      </motion.div>

      {/* Judge 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300 flex flex-col items-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
          <img
            src="/9.png"
            alt="Shivaram K R"
            className="w-full h-full object-cover"
          />
          <a 
            href="https://www.linkedin.com/in/shivaramkrs/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg className="w-8 h-8 text-[#38AAC9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <h3 className="text-xl font-bold text-center text-[#E4CD15]">
          Shivaram K R
        </h3>
        <p className="text-center text-[#38AAC9] mb-2">Founder</p>
        <p className="text-center text-white">Hue Learn</p>
      </motion.div>

      {/* Judge 4 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300 flex flex-col items-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
          <img
            src="/10.png"
            alt="Sriharsha Donthi"
            className="w-full h-full object-cover"
          />
          <a 
            href="https://www.linkedin.com/in/sriharshadonthi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg className="w-8 h-8 text-[#38AAC9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <h3 className="text-xl font-bold text-center text-[#E4CD15]">
          Sriharsha Donthi
        </h3>
        <p className="text-center text-[#38AAC9] mb-2">Senior Engineer</p>
        <p className="text-center text-white">Oracle</p>
      </motion.div>

      {/* Judge 5 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300 flex flex-col items-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
          <img
            src="/11.png"
            alt="Raghu Sarangarajan"
            className="w-full h-full object-cover"
          />
          <a 
            href="https://www.linkedin.com/in/raghusarangarajan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg className="w-8 h-8 text-[#38AAC9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <h3 className="text-xl font-bold text-center text-[#E4CD15]">
          Raghu Sarangarajan
        </h3>
        <p className="text-center text-[#38AAC9] mb-2">Founder & CEO</p>
        <p className="text-center text-white">Cubyts</p>
      </motion.div>

      {/* Judge 6 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300 flex flex-col items-center"
      >
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9] relative group">
          <img
            src="/12.png"
            alt="Kartik Sirigeri"
            className="w-full h-full object-cover"
          />
          <a 
            href="https://www.linkedin.com/in/kartik-sirigeri-5b433816/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg className="w-8 h-8 text-[#38AAC9]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        <h3 className="text-xl font-bold text-center text-[#E4CD15]">
          Kartik Sirigeri
        </h3>
        <p className="text-center text-[#38AAC9] mb-2">Senior Consultant</p>
        <p className="text-center text-white">OpenText</p>
      </motion.div>
    </div>
  </div>
</section>

        {/* Workshop Section */}
        <section
          id="workshop"
          ref={addSectionRef("workshop")}
          className={`py-20 px-4 ${
            isVisible["workshop"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#E4CD15] inline-block relative">
              Pre-Hackathon Workshop
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="p-8 bg-[#38AAC9]/10 border-l-4 border-[#38AAC9] rounded-r-lg">
              <h3 className="text-2xl font-bold mb-6 text-[#E4CD15]">
                "Building Scalable Tech" by E-Dock
              </h3>

              <p className="mb-6">
                This exclusive workshop will prepare you for the hackathon by covering:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>Principles of scalable technology solutions</p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>Business models for tech products</p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>Effective pitching techniques</p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>Design thinking for problem-solving</p>
                </li>
              </ul>

              <p className="mt-6 font-bold text-[#E4CD15]">
                Date: April 7, 2024 | Time: 2 PM - 5 PM | Venue: IEM Auditorium, RVCE
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Section */}
        <section
          id="why-join"
          ref={addSectionRef("why-join")}
          className={`py-20 px-4 ${
            isVisible["why-join"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#E4CD15] inline-block relative">
              Why Participate?
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Cash Prizes
                </h3>
                <p>Win exciting cash prizes for top teams</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Certificates
                </h3>
                <p>Earn participation certificates with ACM and GDG logos</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Activity Points
                </h3>
                <p>Eligible for 5 activity points (RVCE students)</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Networking
                </h3>
                <p>Connect with industry experts and like-minded peers</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Skill Development
                </h3>
                <p>Enhance technical, business, and presentation skills</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Startup Potential
                </h3>
                <p>Opportunity to turn your idea into a real business</p>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section
          id="register"
          ref={addSectionRef("register")}
          className={`py-20 px-4 ${
            isVisible["register"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
              Registration Details
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#38AAC9]/10 p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold mb-2 text-[#38AAC9]">
                  Hackathon Team
                </h3>
                <p className="mb-4">Team of 2-4 members</p>
                <div className="text-3xl font-bold mb-6 text-[#E4CD15]">
                  ₹399 per team
                </div>
                <p className="mb-6">Includes workshop access for all team members</p>
                <a
                  onClick={() => {
                    navigate("/hackathon");
                  }}
                  className="inline-block px-6 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300"
                >
                  Register Team
                </a>
              </div>

              <div className="bg-[#38AAC9]/10 p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold mb-2 text-[#38AAC9]">
                  Workshop Only
                </h3>
                <p className="mb-4">Individual participation</p>
                <div className="text-3xl font-bold mb-6 text-[#E4CD15]">
                  ₹99 per student
                </div>
                <p className="mb-6">For those who want to attend only the workshop</p>
                <a
                  onClick={() => {
                    navigate("/workshop");
                  }}
                  className="inline-block px-6 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300"
                >
                  Register for Workshop
                </a>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#E4CD15]/10 border-l-4 border-[#E4CD15] rounded-r-lg">
              <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                Important Notes:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-[#38AAC9] text-xl mr-2">•</span>
                  <p>Participants must bring their own laptops</p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#38AAC9] text-xl mr-2">•</span>
                  <p>Teams must stay on campus during the offline rounds</p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#38AAC9] text-xl mr-2">•</span>
                  <p>Registration closes on April 5, 2024</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-[#38AAC9]/30 text-center mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <p>© 2025 Tech Tank | ACM RVCE Student Chapter & GDG RVCE</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default About;
