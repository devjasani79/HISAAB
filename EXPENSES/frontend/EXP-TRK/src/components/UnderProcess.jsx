import React, { useState, useEffect } from 'react';
import { FaTools, FaRoad, FaArrowLeft } from 'react-icons/fa';
// import React from 'react';
const UnderProcess = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className={`max-w-2xl text-center transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100px]'
      }`}>
        {/* Animated Construction Icon */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-electric-blue rounded-full opacity-20 animate-ping"></div>
          <FaTools className="w-24 h-24 text-electric-blue mx-auto mb-6" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaRoad className="text-electric-blue" />
          Under Construction
          <FaRoad className="text-electric-blue" />
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Exciting things are brewing! Our team is working hard to bring you 
          an amazing experience. Check back soon!
        </p>

        {/* Progress Visualization */}
        <div className="w-full bg-gray-800 rounded-full h-4 mb-8">
          <div 
            className="bg-electric-blue h-4 rounded-full animate-progress"
            style={{ width: '75%' }}
          ></div>
        </div>

        <div className="space-y-4">
          <a 
            href="/"
            className="inline-flex items-center gap-2 bg-electric-blue text-black px-8 py-3 rounded-full 
            hover:bg-electric-blue-dark transition-colors"
          >
            <FaArrowLeft />
            Return Home
          </a>
          
          <p className="text-gray-400 text-sm mt-4">
            Want to contribute?{' '}
            <a 
              href="https://github.com/your-repo" 
              className="text-electric-blue hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit our GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderProcess;