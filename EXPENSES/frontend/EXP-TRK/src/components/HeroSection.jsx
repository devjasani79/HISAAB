import React, { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  // Trigger animation immediately on component mount
  useEffect(() => {
    setIsTextVisible(true);
  }, []); // Empty dependency array runs only once on mount

  return (
    <section
     id="HeroSection"
      className="relative h-screen flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: "url('/hero-image.png')", // Ensure correct image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

      {/* Content (Text) with Slide-in Animation */}
      <div
        className={`relative z-20 text-center px-6 transform transition-all duration-1000 ease-out ${
          isTextVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-[100px]'
        }`}
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Revolutionizing Financial Management
        </h1>
        <p className=" text-xl sm:text-sm mb-8 max-w-3xl mx-auto">
        Experience a modern, user-friendly platform at EXP-TRK for tracking expenses, setting budgets, receiving alerts, and visualizing spending habits through interactive charts.
        </p>
        <a
          href="#get-started"
          className="bg-blue-900  text-white py-3 px-6 border-b-0 text-lg sm:text-xl hover:bg-blue-600 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;