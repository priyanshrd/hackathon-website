// src/pages/Timeline.js
import React from 'react';

const Timeline = () => {
  const events = [
    {
      day: 'Day 1: Kickoff',
      time: '10:00 AM - Opening Ceremony',
      description: 'Welcome and team formation.',
    },
    {
      day: 'Day 2: Hacking',
      time: '9:00 AM - Coding Begins',
      description: 'Start building your projects.',
    },
    {
      day: 'Day 3: Presentations',
      time: '2:00 PM - Project Demos',
      description: 'Showcase your work to the judges.',
    },
  ];

  return (
    <div className="bg-black min-h-[100vh] p-8  pt-20">
      <h1 className="text-4xl font-bold text-green-500 mb-8 text-center animate-fade-in">
        Timeline
      </h1>
      <div className="space-y-8 max-w-2xl mx-auto">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 animate-fade-in-up"
          >
            <h2 className="text-2xl font-semibold text-green-500">{event.day}</h2>
            <p className="text-green-300 mt-2">{event.time}</p>
            <p className="text-green-200 mt-2">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;