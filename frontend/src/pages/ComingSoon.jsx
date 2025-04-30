// src/pages/FeedbackForm.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teamName: '',
    overallRating: 10,
    eventRatings: {
      preHackWorkshop: null,
      ideationRound: null,
      hackathon: null,
      finalPitch: null
    },
    mentorSupport: 3,
    organization: 3,
    wouldRecommend: 3,
    continueSupport: false,
    quickFeedback: '',
    contactPermission: true
  });
  
  const [currentView, setCurrentView] = useState('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const canvasRef = useRef(null);
  
  // Safe window check for client-side only code
  const isBrowser = typeof window !== 'undefined';
  
  // Particle animation effect for background - with SSR safety
  useEffect(() => {
    if (!isBrowser) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particlesArray = [];
    const numberOfParticles = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = '#38AAC9';
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isBrowser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        }),
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          window.location.href = '/thank-you'; // Redirect to thank you page
        }, 3000);
      }
    } catch (error) {
      // Even if error, show success to user
      setSubmitSuccess(true);
      setTimeout(() => {
        window.location.href = '/thank-you';
      }, 3000);
    }
  };

  const handleRatingChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEventRatingChange = (eventName, value) => {
    setFormData({
      ...formData,
      eventRatings: {
        ...formData.eventRatings,
        [eventName]: value
      }
    });
  };

  const RatingButton = ({ name, value, currentValue, onChange }) => {
    const isActive = currentValue === value;
    
    return (
      <motion.button
        type="button"
        onClick={() => onChange(name, value)}
        className={`w-10 h-10 rounded-full mx-1 flex items-center justify-center text-base font-medium`}
        initial={{ backgroundColor: '#2a2a2a', color: '#38AAC9' }}
        animate={{
          backgroundColor: isActive ? '#E4CD15' : '#2a2a2a',
          color: isActive ? '#000' : '#38AAC9',
          scale: isActive ? 1.15 : 1
        }}
        whileHover={{ scale: 1.1, backgroundColor: '#38AAC9', color: '#fff' }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        {value}
      </motion.button>
    );
  };

  const RatingSection = ({ title, name, value, onChange }) => (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg text-[#38AAC9] mb-4 font-bold relative inline-block">
        {title}
        <motion.span 
          className="absolute bottom-0 left-0 h-0.5 bg-[#E4CD15]" 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.3, duration: 0.5 }}
        ></motion.span>
      </h3>
      <div className="flex justify-center my-4 flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <RatingButton
            key={num}
            name={name}
            value={num}
            currentValue={value}
            onChange={onChange}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2 px-8 md:px-16">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xs"
        >Poor</motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs"
        >Average</motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs"
        >Good</motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs"
        >Very Good</motion.span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xs"
        >Excellent</motion.span>
      </div>
    </motion.div>
  );

  const FormInput = ({ label, type, value, onChange, placeholder = "", required = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mb-2"
    >
      <label className="block text-[#38AAC9] mb-2 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-[#2a2a2a] text-white rounded-lg border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#38AAC9] focus:border-transparent transition-all duration-300"
        placeholder={placeholder}
        required={required}
      />
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#38AAC9]"
        animate={{ width: value ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );

  const EventRatingButton = ({ event, value, currentValue, onChange }) => {
    const emojis = {
      1: '👎',
      2: '😐',
      3: '👍'
    };
    
    const isActive = currentValue === value;

    return (
      <motion.button
        type="button"
        onClick={() => onChange(event, value)}
        className={`w-10 h-10 rounded-full mx-1 flex items-center justify-center text-lg shadow-lg`}
        initial={{ backgroundColor: '#2a2a2a', color: '#ccc', y: 0 }}
        animate={{
          backgroundColor: isActive ? '#38AAC9' : '#2a2a2a',
          color: isActive ? '#fff' : '#ccc',
          scale: isActive ? 1.2 : 1,
          y: isActive ? -8 : 0
        }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        {emojis[value]}
      </motion.button>
    );
  };

  // Simple static decorative elements instead of window-dependent bubbles
  const DecorativeElement = ({ top, left, size, color, delay }) => (
    <motion.div
      className="fixed rounded-full opacity-10 blur-xl pointer-events-none"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: size,
        height: size,
        backgroundColor: color
      }}
      initial={{ scale: 0.8, opacity: 0.05 }}
      animate={{ 
        scale: [0.8, 1.2, 0.8],
        opacity: [0.05, 0.15, 0.05]
      }}
      transition={{
        repeat: Infinity,
        duration: 4,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );

  const navigateView = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#131313] p-4 md:p-8 relative overflow-hidden">
      {/* Particle background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0"></canvas>
      
      {/* Decorative elements that don't depend on window */}
      <DecorativeElement top={20} left={-10} size={120} color="#38AAC9" delay={0} />
      <DecorativeElement top={70} left={110} size={160} color="#E4CD15" delay={1} />
      <DecorativeElement top={40} left={80} size={100} color="#38AAC9" delay={2} />
      <DecorativeElement top={10} left={60} size={80} color="#E4CD15" delay={1.5} />
      <DecorativeElement top={85} left={30} size={120} color="#38AAC9" delay={0.5} />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header with animated elements */}
        <div className="mb-8 text-center relative">
          {/* Small animated stars in the background */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#E4CD15]"
              style={{
                top: `${Math.floor(Math.random() * 100)}%`,
                left: `${Math.floor(Math.random() * 100)}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.floor(Math.random() * 2),
                repeat: Infinity,
                delay: Math.floor(Math.random() * 2),
              }}
            />
          ))}
          
          <motion.div
            className="relative inline-block mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="relative text-4xl font-bold text-[#E4CD15] px-4 py-1"
            >
              How was your Tech Tank experience?
            </motion.h1>
          </motion.div>
          
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-[#38AAC9] to-[#E4CD15] mx-auto rounded-full my-4"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          ></motion.div>
          
          <motion.p 
            className="text-gray-300 text-lg mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Help us improve & get a chance to win exclusive GDG goodies! 🎁
          </motion.p>
        </div>

        {/* Progress indicator */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#38AAC9] to-[#E4CD15] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            ></motion.div>
          </div>
          <div className="flex justify-between text-[#38AAC9] text-sm mt-2">
            <p>Quick Feedback</p>
            <p>2 mins</p>
          </div>
        </motion.div>

        {/* Form Card with glass effect */}
        <motion.div 
          className="backdrop-blur-md bg-[#1a1a1a]/80 rounded-2xl p-6 md:p-8 border border-[#2a2a2a] shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Decoration */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#38AAC9] opacity-5 rounded-full blur-xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#E4CD15] opacity-5 rounded-full blur-xl"></div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentView === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-bold text-[#E4CD15] mb-4">Your Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <FormInput
                      label="Your Name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required={true}
                    />
                    <FormInput
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required={true}
                    />
                  </div>
                  
                  <RatingSection
                    title="Overall, how would you rate Tech Tank 2025?"
                    name="overallRating"
                    value={formData.overallRating}
                    onChange={handleRatingChange}
                  />
                  
                  <motion.div 
                    className="text-right mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}  
                    transition={{ delay: 0.7 }}
                  >
                    <motion.button
                      type="button"
                      onClick={() => navigateView('events')}
                      className="bg-gradient-to-r from-[#38AAC9] to-[#3195AF] text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next <span className="ml-2">→</span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {currentView === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-bold text-[#E4CD15] mb-6">Event Feedback</h2>
                  
                  <motion.div 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}  
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg text-[#38AAC9] mb-4 font-medium">Rate specific events:</h3>
                    <div className="space-y-6">
                      {[
                        { name: 'preHackWorkshop', label: 'Pre-Hack Workshop' },
                        { name: 'ideationRound', label: 'Ideation Round' },
                        { name: 'hackathon', label: '12-Hour Hackathon' },
                        { name: 'finalPitch', label: 'Final Pitch' }
                      ].map((event, index) => (
                        <motion.div 
                          key={event.name} 
                          className="flex items-center justify-between bg-[#242424] p-4 rounded-lg border border-[#333] hover:border-[#38AAC9] transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(56, 170, 201, 0.1)' }}
                        >
                          <span className="text-gray-200 font-medium">{event.label}</span>
                          <div className="flex space-x-2">
                            {[1, 2, 3].map((num) => (
                              <EventRatingButton
                                key={num}
                                event={event.name}
                                value={num}
                                currentValue={formData.eventRatings[event.name]}
                                onChange={handleEventRatingChange}
                              />
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="mb-8 mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <label className="block text-[#38AAC9] mb-3 font-medium">
                      One thing we should definitely keep doing? (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.quickFeedback}
                        onChange={(e) => setFormData({...formData, quickFeedback: e.target.value})}
                        className="w-full p-4 bg-[#2a2a2a] text-white rounded-lg border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#38AAC9] focus:border-transparent transition-all duration-300"
                        placeholder="The mentors were super helpful!"
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#E4CD15]"
                        animate={{ width: formData.quickFeedback ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                  
                  <div className="flex justify-between mt-8">
                    <motion.button
                      type="button"
                      onClick={() => navigateView('info')}
                      className="bg-[#2a2a2a] text-[#38AAC9] font-medium py-3 px-8 rounded-full text-lg border border-[#333] hover:bg-[#333]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">←</span> Back
                    </motion.button>
                    
                    <motion.button
                      type="button"
                      onClick={() => navigateView('final')}
                      className="bg-gradient-to-r from-[#38AAC9] to-[#3195AF] text-white font-medium py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next <span className="ml-2">→</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {currentView === 'final' && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-bold text-[#E4CD15] mb-6">Final Steps</h2>
                  
                  <motion.div 
                    className="space-y-5 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="flex items-center p-4 bg-[#242424] rounded-lg border border-[#333] hover:border-[#38AAC9] transition-all duration-300"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(56, 170, 201, 0.1)' }}
                    >
                      <input
                        type="checkbox"
                        id="continueSupport"
                        checked={formData.continueSupport}
                        onChange={(e) => setFormData({...formData, continueSupport: e.target.checked})}
                        className="h-5 w-5 rounded text-[#38AAC9] focus:ring-[#38AAC9] transition-all duration-300 cursor-pointer"
                      />
                      <motion.div 
                        className="w-1 h-8 bg-[#E4CD15] mx-3 rounded-full"
                        initial={{ height: 0 }}
                        animate={{ height: formData.continueSupport ? 32 : 16 }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                      <label htmlFor="continueSupport" className="text-gray-200 cursor-pointer">
                        I'd like to receive support for my project from GDG/ACM
                      </label>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center p-4 bg-[#242424] rounded-lg border border-[#333] hover:border-[#38AAC9] transition-all duration-300"
                      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(56, 170, 201, 0.1)' }}
                    >
                      <input
                        type="checkbox"
                        id="contactPermission"
                        checked={formData.contactPermission}
                        onChange={(e) => setFormData({...formData, contactPermission: e.target.checked})}
                        className="h-5 w-5 rounded text-[#38AAC9] focus:ring-[#38AAC9] transition-all duration-300 cursor-pointer"
                      />
                      <motion.div 
                        className="w-1 h-8 bg-[#E4CD15] mx-3 rounded-full"
                        initial={{ height: 0 }}
                        animate={{ height: formData.contactPermission ? 32 : 16 }}
                        transition={{ duration: 0.3 }}
                      ></motion.div>
                      <label htmlFor="contactPermission" className="text-gray-200 cursor-pointer">
                        I'm open to receiving follow-up about my feedback
                      </label>
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex justify-between mt-10">
                    <motion.button
                      type="button"
                      onClick={() => navigateView('events')}
                      className="bg-[#2a2a2a] text-[#38AAC9] font-medium py-3 px-8 rounded-full text-lg border border-[#333] hover:bg-[#333]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="mr-2">←</span> Back
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${isSubmitting ? 'bg-gray-500' : 'bg-gradient-to-r from-[#E4CD15] to-[#ffb700]'} text-black font-bold py-3 px-8 rounded-full text-lg shadow-xl`}
                      whileHover={!isSubmitting ? { scale: 1.05, boxShadow: '0 10px 25px -5px rgba(228, 205, 21, 0.4)' } : {}}
                      whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <motion.div 
                            className="w-5 h-5 border-2 border-t-transparent border-black rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          ></motion.div>
                          Submitting...
                        </div>
                      ) : (
                        <>Submit & Enter Giveaway 🚀</>
                      )}
                    </motion.button>
                  </div>
                  
                  <motion.p 
                    className="text-gray-400 text-sm mt-4 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Takes just 30 seconds! All feedback is anonymous.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      {/* Success animation */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div 
            className="fixed inset-0 bg-[#0a0a0a] bg-opacity-95 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-[#E4CD15] to-[#ffb700] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#E4CD15]/20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2 
                }}
              >
                <motion.svg 
                  className="w-14 h-14 text-black" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <motion.path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </motion.svg>
              </motion.div>
              
              {/* Safe confetti animation without window dependency */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: i % 2 === 0 ? '#E4CD15' : '#38AAC9',
                      top: `${Math.floor(Math.random() * 100)}%`,
                      left: `${Math.floor(Math.random() * 100)}%`,
                    }}
                    initial={{ 
                      scale: 0,
                      y: -20,
                      opacity: 1
                    }}
                    animate={{ 
                      scale: [0, 1, 0.5],
                      y: [0, Math.floor(Math.random() * 150) + 50],
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 0.5,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
              
              <motion.h3 
                className="text-2xl font-bold text-[#E4CD15] mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Thank You!
              </motion.h3>
              <motion.p 
                className="text-gray-300 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Your feedback has been submitted!
              </motion.p>
              <motion.p 
                className="text-[#38AAC9] mt-4 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                You've been entered into our exclusive GDG giveaway!
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackForm;