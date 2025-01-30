import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaClock, FaShieldAlt } from 'react-icons/fa';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FaHeart className="w-12 h-12 text-electric-blue" />,
      title: "User-Centric Design",
      text: "Intuitive experience built with love"
    },
    {
      icon: <FaClock className="w-12 h-12 text-electric-blue" />,
      title: "24/7 Access",
      text: "Always available, anywhere"
    },
    {
      icon: <FaShieldAlt className="w-12 h-12 text-electric-blue" />,
      title: "Bank Security",
      text: "Military-grade encryption"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Title Section - Single Line Layout */}
        <div className={`flex flex-col md:flex-row items-center justify-between mb-12 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-50px]'
        }`}>
          <div className="md:flex-1 mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Why Choose Us?
            </h2>
            <p className="text-gray-300 text-lg">
              Revolutionizing finance management
            </p>
          </div>
          <button className="bg-electric-blue text-black py-3 px-8 rounded-full hover:bg-electric-blue-dark transition">
            Explore Features
          </button>
        </div>

        {/* Features - Flex Layout */}
        <div className={`flex flex-col md:flex-row justify-center gap-8 transition-all duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex-1 flex flex-col items-center text-center p-6"
              style={{ 
                transition: `transform 0.5s ease ${index * 100}ms, opacity 0.5s ease ${index * 100}ms`,
                transform: isVisible ? 'none' : 'translateY(50px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;