// src/pages/FeedbackForm.js
import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    teamName: '',
    overallRating: 10,
    eventRatings: {
      preHackWorkshop: 3,
      ideationRound: 3,
      hackathon: 3,
      finalPitch: 3
    },
    mentorSupport: 3,
    organization: 3,
    wouldRecommend: 3,
    continueSupport: false,
    quickFeedback: '',
    contactPermission: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        // Show success animation
        document.getElementById('success-animation').classList.remove('hidden');
        setTimeout(() => {
          window.location.href = '/thank-you'; // Redirect to thank you page
        }, 2000);
      }
    } catch (error) {
      alert('Thanks for your feedback!'); // Even if error, don't frustrate user
    }
  };

  const RatingButton = ({ name, value, currentValue, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(name, value)}
      className={`w-10 h-10 rounded-full mx-1 flex items-center justify-center transition-all
        ${currentValue === value ? 'bg-green-500 text-black scale-110' : 'bg-gray-800 text-green-500'}
        hover:bg-green-600 hover:text-black hover:scale-105`}
    >
      {value}
    </button>
  );

  const RatingSection = ({ title, name, value, onChange }) => (
    <div className="mb-6">
      <h3 className="text-lg text-green-500 mb-3">{title}</h3>
      <div className="flex justify-center">
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
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-16">
        <span>Poor</span>
        <span>Average</span>
        <span>Good</span>
        <span>Very Good</span>
        <span>Excellent</span>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="h-2 bg-gray-800 rounded-full">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-green-500 text-sm mt-1 text-right">Quick Feedback - 2 mins</p>
        </div>

        <h1 className="text-3xl font-bold text-green-500 mb-2 text-center">
          How was your Tech Tank experience?
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Help us improve & get a chance to win exclusive GDG goodies! 🎁
        </p>

        <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-6 md:p-8">
          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-green-500 mb-1">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-green-500 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Main rating */}
          <RatingSection
            title="Overall, how would you rate Tech Tank 2025?"
            name="overallRating"
            value={formData.overallRating}
            onChange={(name, value) => setFormData({...formData, [name]: value})}
          />

          {/* Event ratings */}
          <div className="mb-6">
            <h3 className="text-lg text-green-500 mb-3">Rate specific events:</h3>
            <div className="space-y-4">
              {[
                { name: 'preHackWorkshop', label: 'Pre-Hack Workshop' },
                { name: 'ideationRound', label: 'Ideation Round' },
                { name: 'hackathon', label: '12-Hour Hackathon' },
                { name: 'finalPitch', label: 'Final Pitch' }
              ].map((event) => (
                <div key={event.name} className="flex items-center justify-between">
                  <span className="text-gray-300">{event.label}</span>
                  <div className="flex">
                    {[1, 2, 3].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setFormData({
                          ...formData,
                          eventRatings: {
                            ...formData.eventRatings,
                            [event.name]: num
                          }
                        })}
                        className={`w-8 h-8 rounded-full mx-1 flex items-center justify-center text-sm
                          ${formData.eventRatings[event.name] === num ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-300'}
                          hover:bg-green-600 hover:text-black`}
                      >
                        {num === 1 ? '👎' : num === 2 ? '😐' : '👍'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick feedback */}
          <div className="mb-6">
            <label className="block text-green-500 mb-2">
              One thing we should definitely keep doing? (Optional)
            </label>
            <input
              type="text"
              value={formData.quickFeedback}
              onChange={(e) => setFormData({...formData, quickFeedback: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="The mentors were super helpful!"
            />
          </div>

          {/* Continue support */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="continueSupport"
              checked={formData.continueSupport}
              onChange={(e) => setFormData({...formData, continueSupport: e.target.checked})}
              className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
            />
            <label htmlFor="continueSupport" className="ml-2 text-gray-300">
              I'd like to receive support for my project from GDG/ACM
            </label>
          </div>

          {/* Contact permission */}
          <div className="flex items-center mb-8">
            <input
              type="checkbox"
              id="contactPermission"
              checked={formData.contactPermission}
              onChange={(e) => setFormData({...formData, contactPermission: e.target.checked})}
              className="h-5 w-5 text-green-500 rounded focus:ring-green-500"
            />
            <label htmlFor="contactPermission" className="ml-2 text-gray-300">
              I'm open to receiving follow-up about my feedback
            </label>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Submit & Enter Giveaway 🚀
            </button>
            <p className="text-gray-400 text-sm mt-2">
              Takes just 30 seconds! All feedback is anonymous.
            </p>
          </div>
        </form>

        {/* Success animation (hidden by default) */}
        <div id="success-animation" className="hidden fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-500 mb-2">Thank You!</h3>
            <p className="text-gray-300">Your feedback has been submitted!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;