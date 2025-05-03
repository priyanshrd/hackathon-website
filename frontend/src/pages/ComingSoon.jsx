import React, { useState, useEffect, useCallback, useReducer, memo } from 'react';

// Form reducer function
function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'UPDATE_EVENT_RATING':
      return { 
        ...state, 
        eventRatings: {
          ...state.eventRatings,
          [action.event]: action.value
        }
      };
    default:
      return state;
  }
}

// Unified Rating Button Component
const RatingButton = memo(({ value, currentValue, onChange, emoji, label }) => {
  const isActive = currentValue === value;
  const isNotAttended = value === 0;

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={() => onChange(value)}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          text-xl transition-all duration-200 mx-1
          ${isActive ? 
            isNotAttended ? 
              'bg-gray-600 text-white' : 
              'bg-[#38AAC9] text-white' : 
            'bg-[#2a2a2a] text-[#ccc] hover:bg-[#333]'
          }
          hover:scale-110 hover:shadow-lg
        `}
      >
        {emoji || value}
      </button>
      
      {/* Hover tooltip */}
      <div className="
        absolute bottom-full left-1/2 transform -translate-x-1/2
        bg-[#333] text-white text-xs px-2 py-1 rounded
        opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none whitespace-nowrap mb-2
      ">
        {label || (value === 0 ? 'Not Attended' : ['Poor', 'Average', 'Good', 'Loved It'][value - 1])}
        <div className="absolute top-full left-1/2 w-2 h-2 bg-[#333] transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
      </div>
    </div>
  );
});

// Initial state
const initialState = {
  email: '',
  overallRating: 0,
  eventRatings: {
    preHackWorkshop: 0,
    ideationRound: 0,
    hackathon: 0,
    finalPitch: 0
  },
  mentoringQuality: 0,
  organizerSupport: 0,
  venueQuality: 0,
  judgingFairness: 0,
  quickFeedback: '',
  continueSupport: true,
};

const FeedbackForm = () => {
  const [error, setError] = useState('');
  const [formData, dispatch] = useReducer(formReducer, initialState);
  const [currentView, setCurrentView] = useState('info');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handlers
  const handleEmailChange = useCallback((e) => {
    dispatch({ type: 'UPDATE_FIELD', field: 'email', value: e.target.value });
  }, []);

  const handleQuickFeedbackChange = useCallback((e) => {
    dispatch({ type: 'UPDATE_FIELD', field: 'quickFeedback', value: e.target.value });
  }, []);

  const handleContinueSupportChange = useCallback((e) => {
    dispatch({ type: 'UPDATE_FIELD', field: 'continueSupport', value: e.target.checked });
  }, []);

  const handleRatingChange = useCallback((name, value) => {
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  }, []);

  const handleEventRatingChange = useCallback((event, value) => {
    dispatch({ type: 'UPDATE_EVENT_RATING', event, value });
  }, []);

  const backend_url = 'https://techtank-backend.vercel.app';

  const navigateView = useCallback((view) => {
    setIsNavigating(true);
    setTimeout(() => {
      setCurrentView(view);
      setIsNavigating(false);
    }, 100);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setError('');
    setSubmitSuccess(false);
  
    try {
      if (!formData.email) {
        throw new Error('Email is required');
      }
  
      const response = await fetch(`${backend_url}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit feedback');
      }
  
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'An error occurred while submitting');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, backend_url]);

  const renderSubmitButton = () => (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`bg-[#E4CD15] text-black font-bold py-2 px-6 rounded-full ml-auto ${
        !isSubmitting && 'hover:bg-[#ffd700]'
      } transition-colors`}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" 
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting...
        </span>
      ) : (
        'Submit Feedback'
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className={`max-w-2xl mx-auto ${isMobile ? '' : 'backdrop-blur-md'} bg-[#1a1a1a]/80 rounded-2xl p-4 md:p-6 border border-[#2a2a2a]`}>
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#E4CD15]">
            Tech Tank Feedback
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#38AAC9] to-[#E4CD15] mx-auto rounded-full my-2"></div>
          <p className="text-gray-300 text-sm md:text-base">
            Help us improve future events and stand a chance to win vouchers 🎁
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="h-2 bg-[#2a2a2a] rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-[#38AAC9] to-[#E4CD15] rounded-full"
              style={{ width: currentView === 'info' ? '33%' : currentView === 'events' ? '66%' : '100%' }}
            />
          </div>
        </div>

        {currentView === 'info' && (
          <div className="mb-6">
            <div className="mb-4 p-3 bg-[#242424] rounded-lg border border-[#38AAC9]/30">
              <p className="text-sm text-gray-300">Your feedback is anonymous. 
                Email is only used to verify participation and analyse feedback.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-[#38AAC9] mb-2">
                  Registered Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className="w-full p-3 bg-[#2a2a2a] text-white rounded-lg border border-[#333] focus:outline-none focus:ring-1 focus:ring-[#38AAC9]"
                  placeholder="your@registered.email"
                  required
                />
              </div>
            </div>

            <div className="bg-[#242424] p-4 rounded-lg mb-6">
              <h3 className="text-lg text-[#38AAC9] font-bold mb-4">
                Overall, how would you rate Tech Tank 2025?
              </h3>
              <div className="flex justify-center space-x-3">
                {[1, 2, 3, 4].map((num) => (
                  <RatingButton
                    key={num}
                    value={num}
                    currentValue={formData.overallRating}
                    onChange={(val) => handleRatingChange('overallRating', val)}
                    emoji={['🚫','👎', '😐', '👍', '💖'][num]}
                    label={['Not Rated', 'Poor', 'Average', 'Good', 'Loved It'][num]}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigateView('events')}
                disabled={isNavigating}
                className="bg-[#38AAC9] text-white font-medium py-2 px-6 rounded-full disabled:opacity-50"
              >
                {isNavigating ? 'Loading...' : 'Next →'}
              </button>
            </div>
          </div>
        )}

        {currentView === 'events' && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#E4CD15] mb-6">Event Feedback</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'preHackWorkshop', label: 'Pre-Hack Workshop' },
                { name: 'ideationRound', label: 'Ideation Round' },
                { name: 'hackathon', label: 'Hackathon' },
                { name: 'finalPitch', label: 'Final Pitch' },
                { name: 'mentoringQuality', label: 'Quality of Mentoring' },
                { name: 'organizerSupport', label: 'Organizer Support' },
                { name: 'venueQuality', label: 'Venue Facilities' },
                { name: 'judgingFairness', label: 'Judging Fairness' }
              ].map((section) => (
                <div key={section.name} className="bg-[#242424] p-4 rounded-lg">
                  <h3 className="text-gray-200 mb-3">{section.label}</h3>
                  <div className="flex justify-center space-x-3">
                    {[0, 1, 2, 3, 4].map((num) => (
                      <RatingButton
                        key={num}
                        value={num}
                        currentValue={section.name in formData.eventRatings ? 
                          formData.eventRatings[section.name] : 
                          formData[section.name]}
                        onChange={(val) => section.name in formData.eventRatings ? 
                          handleEventRatingChange(section.name, val) : 
                          handleRatingChange(section.name, val)}
                        emoji={['🚫', '👎', '😐', '👍', '💖'][num]}
                        label={['Not Attended', 'Poor', 'Average', 'Good', 'Loved It'][num]}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <label className="block text-[#38AAC9] mb-2">
                One thing we should definitely keep doing? (Optional)
              </label>
              <input
                type="text"
                value={formData.quickFeedback}
                onChange={handleQuickFeedbackChange}
                className="w-full p-3 bg-[#2a2a2a] text-white rounded-lg border border-[#333] focus:outline-none focus:ring-1 focus:ring-[#38AAC9]"
                placeholder="The mentors were super helpful!"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigateView('info')}
                className="bg-[#2a2a2a] text-[#38AAC9] font-medium py-2 px-6 rounded-full border border-[#333] hover:bg-[#333]"
              >
                ← Back
              </button>
              
              <button
                type="button"
                onClick={() => navigateView('final')}
                disabled={isNavigating}
                className="bg-[#38AAC9] text-white font-medium py-2 px-6 rounded-full ml-auto disabled:opacity-50"
              >
                {isNavigating ? 'Loading...' : 'Next →'}
              </button>
            </div>
          </div>
        )}

        {currentView === 'final' && (
          <form onSubmit={handleSubmit} className="mb-6">
            <h2 className="text-xl font-bold text-[#E4CD15] mb-6">Final Steps</h2>
            
            <div className="space-y-4 mb-8">
              <label className="flex items-center space-x-4 p-3 bg-[#242424] rounded-lg">
                <input
                  type="checkbox"
                  checked={formData.continueSupport}
                  onChange={handleContinueSupportChange}
                  className="h-5 w-5 rounded text-[#38AAC9]"
                />
                <span className="text-gray-200">
                  I'd like to receive project support from GDG/ACM
                </span>
              </label>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigateView('events')}
                className="bg-[#2a2a2a] text-[#38AAC9] font-medium py-2 px-6 rounded-full border border-[#333] hover:bg-[#333]"
              >
                ← Back
              </button>
              
              {renderSubmitButton()}
            </div>

            {error && (
              <div className="bg-red-900 text-white p-3 rounded-lg mb-4 text-center mt-4">
                {error}
              </div>
            )}
          </form>
        )}
      </div>

      {submitSuccess && (
        <div className="fixed inset-0 bg-[#0a0a0a]/95 flex items-center justify-center z-50">
          <div className="text-center p-6 bg-[#1a1a1a] rounded-xl max-w-xs">
            <div className="w-16 h-16 bg-[#E4CD15] rounded-full flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h3 className="text-lg font-bold text-[#E4CD15] mb-2">
              Thank You!
            </h3>
            <p className="text-gray-300">
              Your feedback has been submitted!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;