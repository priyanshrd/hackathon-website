import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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
      title: "Pre-Hack Workshop",
      date: "April 7, 2025 (9:00 AM - 2 PM)",
      description: () => (
        <>
          Learn how to 'Build Scalable Tech Products/Services for B2B & B2C' in our workshop led by industry experts from EDock.
          <br />
          Venue: IEM Auditorium, RVCE.
        </>
      ),
      highlight: true
    },
    {
      title: "Online Ideation Round 1 Submission",
      date: "April 7 (5 PM) - April 9 (10 AM), 2025",
      description: () => (
        <>
          Submit your idea on the <a href='https://www.techtankrvce.com/idea' className="text-[#38AAC9] hover:underline">Submit Idea</a> page.
          
          A Canva template will be provided for your submission.
          <br/>
          <span className="text-[#E4CD15] font-medium">
            Exceptional ideas will have the opportunity to connect with professional mentors!
          </span>
        </>
      ),
    },
    {
      title: "Round 1 Results Announcement",
      date: "April 10, 2025 (10 AM)",
      description: "Shortlisted teams will move to Round 2 (Offline Hackathon)"
    },
    {
      title: "12-Hour Hackathon (Round 2)",
      date: "April 11 (8 PM) - April 12 (8 AM), 2025",
      description: () => (
        <>
          Tech Tankers build their projects overnight. 
          <br/>
          Venue: Design Thinking Huddle (DTH), RVCE.      
        </>
      ),
    },
    {
      title: "Final Pitch to Investors & Judges",
      date: "April 12, 2025 (10 AM - 2 PM)",
      description: () => (
        <>
          Present your project to investors and mentors from industry.
          <br/>
          <span >Leaderboard will be live during this event</span>
        </>
      )
    },
    {
      title: "Final Results Announcement",
      date: "April 12, 2025 (2 PM)",
      description: () => (
        <>
          Winners will be declared on the <a href="/leaderboard" className="text-[#E4CD15] font-medium">Leaderboard!</a>
        </>
      )
    }
  ];

  return (
    <section 
      id="timeline" 
      ref={sectionRef}
      className={`py-20 px-4 bg-black ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-16 text-[#E4CD15] inline-block relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Event Timeline
          <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#38AAC9] -mb-2"></span>
        </motion.h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 w-1 h-full bg-[#38AAC9]"></div>
          
          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={index} 
                className="relative pl-16"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-4 top-0 w-8 h-8 ${event.highlight ? 'bg-[#E4CD15]' : 'bg-[#38AAC9]'} rounded-full transform -translate-x-1/2 z-10`}></div>
                
                {/* Timeline Content */}
                <motion.div
                  className={`p-6 ${event.highlight ? 'bg-[#E4CD15]/10 border-[#E4CD15]' : 'bg-[#38AAC9]/10 border-[#38AAC9]'} rounded-lg border-l-4`}
                  whileHover={{ 
                    y: -5,
                    boxShadow: event.highlight ? "0 10px 25px -5px rgba(228, 205, 21, 0.1)" : "0 10px 25px -5px rgba(56, 170, 201, 0.1)"
                  }}
                >
                  <div className={`${event.highlight ? 'text-[#38AAC9]' : 'text-[#E4CD15]'} font-bold mb-2`}>{event.date}</div>
                  <h3 className={`text-xl font-bold mb-2 ${event.highlight ? 'text-[#E4CD15]' : 'text-[#38AAC9]'}`}>{event.title}</h3>
                  <p className="text-white">
                    {typeof event.description === 'function' ? event.description() : event.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;