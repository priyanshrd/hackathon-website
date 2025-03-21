import React, { useEffect, useRef, useState } from 'react';

const Timeline = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const timelineEvents = [
    {
      title: "Register for the Hackathon",
      date: "March 24 - April 6, 2025",
      description: "Register for the Hackathon (includes the workshop) or just the Workshop and gear up to build your own scalable, entrepreneurial success story."
    },
    {
      title: "Online Prototype Submission (Round 1)",
      date: "April 7 - April 9, 2025",
      description: "Submit your problem statement aligned with the provided tracks. Teams will be evaluated based on innovation, feasibility, and scalability. Shortlisted teams move to Round 2."
    },
    {
      title: "Build & Refine Your Solution (Round 2)",
      date: "April 11 - April 12, 2025",
      description: "Work overnight in a high-energy innovation space. Dinner will be provided for all participants."
    },
    {
      title: "The Pitch (Final Round)",
      date: "April 12, 2025",
      description: "Present to a panel of judges & investors. Evaluations based on technical execution, business viability & innovation. Results announced via email & website the same day!"
    }
  ];

  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className={`py-20 px-4 bg-black ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative">
          Hackathon Timeline
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
        </h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 w-1 h-full bg-[#38AAC9]"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className="relative pl-16"
                style={{ 
                  animation: `fade-in-up 0.8s ${0.2 + index * 0.2}s both`,
                  opacity: 0
                }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 top-0 w-8 h-8 bg-[#E4CD15] rounded-full transform -translate-x-1/2 z-10"></div>
                
                {/* Timeline Content */}
                <div className="p-6 bg-[#38AAC9]/10 rounded-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-[#38AAC9]/30 border-l-4 border-[#38AAC9]">
                  <div className="text-[#E4CD15] font-bold mb-2">{event.date}</div>
                  <h3 className="text-xl font-bold mb-2 text-[#38AAC9]">{event.title}</h3>
                  <p className="text-white">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
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
    </section>
  );
};

export default Timeline;