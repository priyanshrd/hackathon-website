import React, { useEffect, useRef, useState } from "react";
import logo from "../../public/tech_TANK.jpeg";
import { useNavigate } from "react-router-dom";

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
                src={logo}
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
            This is your chance to turn your tech ideas into real-world
            businesses!
          </p>
          <p
            className="mb-10 text-lg"
            style={{ animation: "fade-in-up 1s 0.9s both" }}
          >
            Welcome to Tech Tank, the ultimate fusion of technology, business,
            and entrepreneurship! This is not just another hackathon—it's a
            startup battlefield where coders, innovators, and business minds
            come together to build scalable, investor-ready solutions.
          </p>
          <a
            onClick={() => {
              navigate("/hackathon");
            }}
            className="inline-block px-8 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1"
            style={{ animation: "fade-in-up 1s 1.2s both" }}
          >
            Register Now
          </a>
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
              Who Can Survive the Tank?
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  The Innovators
                </h3>
                <p>Developers who dream big and build bigger.</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  The Strategists
                </h3>
                <p>Business minds who can turn tech into profit.</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  The Pitch Masters
                </h3>
                <p>Storytellers who can sell an idea in 30 seconds.</p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-[#38AAC9]/10 border-l-4 border-[#38AAC9] rounded-r-lg">
              <p className="text-lg">
                Tech Tank is where tech meets entrepreneurship. This is your
                chance to create, compete, and captivate investors!
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
              Tech Tank is a Shark Tank-inspired hackathon conducted by ACM RVCE
              Student Chapter and GDG (Google Developer Groups) RVCE. In today's
              tech-driven world, it's not just about building great
              products—it's about making them market-ready.
            </p>

            <p className="text-lg">
              This event bridges the gap between technology and business by
              encouraging participants to develop scalable, investor-ready B2B
              and B2C solutions. Compete, innovate, and pitch your way to
              success!
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        {/* <section 
          id="timeline" 
          ref={addSectionRef('timeline')}
          className={`py-20 px-4 ${isVisible['timeline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
              Hackathon Timeline
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>
            
            <div className="relative"> */}
        {/* Timeline Line */}
        {/* <div className="absolute left-0 md:left-1/2 w-1 h-full bg-[#38AAC9] -ml-0.5 md:-ml-0.5"></div> */}

        {/* Timeline Items */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
        {/* Workshop */}
        {/* <div className="md:col-start-2 relative mb-16 md:pl-12">
                  <div className="absolute top-0 -left-4 md:-left-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">7th April, 2 PM - 5 PM</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Workshop</h3>
                    <p>IEM Auditorium</p>
                  </div>
                </div> */}

        {/* Round 1 */}
        {/* <div className="md:col-start-1 md:text-right relative mb-16 md:pr-12">
                  <div className="absolute top-0 -right-4 md:-right-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">7th April, 5 PM - 9th April, 5 PM</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Round 1 (Online)</h3>
                    <p>Submit your initial proposal online</p>
                  </div>
                </div> */}

        {/* Round 2 */}
        {/* <div className="md:col-start-2 relative mb-16 md:pl-12">
                  <div className="absolute top-0 -left-4 md:-left-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">11th April, 8 PM - 12th April, 8 AM</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Round 2 (Offline)</h3>
                    <p>Design Thinking Huddle</p>
                  </div>
                </div> */}

        {/* Final Pitches */}
        {/* <div className="md:col-start-1 md:text-right relative mb-16 md:pr-12">
                  <div className="absolute top-0 -right-4 md:-right-4 w-8 h-8 bg-[#E4CD15] rounded-full"></div>
                  <div className="p-6 bg-[#38AAC9]/10 rounded-lg">
                    <div className="text-[#E4CD15] font-bold mb-2">12th April, 11 AM onwards</div>
                    <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">Final Pitches & Evaluation</h3>
                    <p>Present your solution to the judges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
                Great ideas are just the beginning. Scalability is what makes
                them legendary.
              </h3>

              <p className="mb-6">
                To prepare you for the hackathon, we're hosting an exclusive
                workshop on Building Scalable Tech by E-Dock. This session will
                help you:
              </p>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>
                    Understand how to scale your solutions for real-world
                    applications.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>
                    Learn key business strategies that make a product
                    investor-ready.
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>
                    Master the fundamentals of tech-driven entrepreneurship.
                  </p>
                </li>
              </ul>

              <p className="mt-6">
                Whether you're a solo innovator or part of a team, this workshop
                will give you a competitive edge before the hackathon even
                begins!
              </p>
            </div>
          </div>
        </section>

        {/* Guidelines Section */}
        <section
          id="guidelines"
          ref={addSectionRef("guidelines")}
          className={`py-20 px-4 ${
            isVisible["guidelines"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-[#E4CD15] inline-block relative">
              Guidelines
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="p-6 bg-[#38AAC9]/10 border-l-4 border-[#38AAC9] rounded-r-lg">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>Each participant is required to bring their own laptop.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-[#E4CD15] text-2xl mr-2">•</span>
                  <p>
                    Participants are required to stay on campus for the entire
                    duration of the hackathon.
                  </p>
                </li>
              </ul>
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
              Why You Can't Miss Tech Tank
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Gain 5 Activity Points
                </h3>
                <p>Add valuable activity points to your academic record.</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Learn from the Best
                </h3>
                <p>Gain hands-on experience from industry experts.</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Think Beyond Coding
                </h3>
                <p>Develop business models & pitch ideas.</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Win Prizes & Recognition
                </h3>
                <p>Compete for cash prizes and awards.</p>
              </div>

              <div className="bg-[#E4CD15]/10 p-6 rounded-lg border-l-4 border-[#E4CD15] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#E4CD15]/20">
                <h3 className="text-xl font-bold mb-4 text-[#38AAC9]">
                  Networking
                </h3>
                <p>Meet like-minded innovators.</p>
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
              Registration & Fees
              <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#38AAC9]/10 p-8 rounded-lg text-center transform transition-all duration-300 hover:scale-105">
                <h3 className="text-2xl font-bold mb-2 text-[#38AAC9]">
                  Hackathon Team
                </h3>
                <p className="mb-6">Team of 2-3</p>
                <div className="text-3xl font-bold mb-8 text-[#E4CD15]">
                  ₹500/team
                </div>
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
                  Solo Workshop
                </h3>
                <p className="mb-6">Individual participants</p>
                <div className="text-3xl font-bold mb-8 text-[#E4CD15]">
                  ₹200/student
                </div>
                <a
                  onClick={() => {
                    navigate("/workshop");
                  }}
                  className="inline-block px-6 py-3 bg-[#38AAC9] hover:bg-[#E4CD15] hover:text-black font-bold rounded-full transition-all duration-300"
                >
                  Register Solo
                </a>
              </div>
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
