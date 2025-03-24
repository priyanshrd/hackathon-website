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
      title: "Opentext",
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
                <p>Teams of 2-3 members with complementary skills</p>
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
              {judges.map((judge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible["judges"] ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1a1a1a] p-6 rounded-lg border border-[#38AAC9]/30 hover:border-[#E4CD15] transition-all duration-300"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#38AAC9]">
                    <img
                      src={judge.image}
                      alt={judge.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center text-[#E4CD15]">
                    {judge.name}
                  </h3>
                  <p className="text-center text-[#38AAC9]">{judge.title}</p>
                </motion.div>
              ))}
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
                <p className="mb-4">Team of 2-3 members</p>
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
