import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const Reviews = () => {
  const reviews = [
    {
      name: "Manav Dave",
      role: "Stock Market Broker",
      text: "This platform transformed how I manage business finances. The budgeting tools are exceptional!",
      avatar: "/manav.jpeg"
    },
    {
      name: "Chinmay Mahashabde",
      role: "Financial Analyst",
      text: "The most intuitive expense tracker I've used. Real-time notifications are a game-changer.",
      avatar: "/chinmay.jpeg"
    },
    {
      name: "Varad Nimbalker",
      role: "DOP",
      text: "Simplified my financial management completely. Love the clean interface!",
      avatar: "/varad.jpeg"
    },
    {
      name: "Varun Sagle",
      role: "Startup Founder",
      text: "Essential tool for any entrepreneur. The reporting features saved us countless hours.",
      avatar: "/varun.jpeg"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
    id='Reviews' className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Happy Clients</h2>
        
        {/* Carousel Container */}
        <div className="relative overflow-hidden h-[400px]">
          <div className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {reviews.map((review, index) => (
              <div key={index} className="min-w-full px-4 flex flex-col items-center">
                <div className="max-w-3xl text-center">
                  <FaQuoteLeft className="text-electric-blue text-2xl mb-4 mx-auto" />
                  <p className="text-xl mb-6">{review.text}</p>
                  <FaQuoteRight className="text-electric-blue text-2xl mt-4 mx-auto" />
                </div>
                
                {/* Client Info */}
                <div className="mt-8 flex flex-col items-center">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-20 h-20 rounded-full mb-4 border-2 border-electric-blue"
                  />
                  <h3 className="text-xl font-semibold">{review.name}</h3>
                  <p className="text-gray-400">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex ? 'bg-electric-blue' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
