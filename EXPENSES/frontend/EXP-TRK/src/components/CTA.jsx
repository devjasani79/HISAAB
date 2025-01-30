import React, { useState, useEffect, useRef } from 'react';

const CTA = () => {
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

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen flex flex-col justify-center items-center text-white"
    >
      {/* Background Image */}
      <div 
        className="absolute h-50% inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/cta-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <div className={`space-y-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100px]'
        }`}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            Take Control of Your Finances Today
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mx-auto">
            Manage your expenses, set budgets, and visualize spending habits with our user-friendly financial management platform.
          </p>

          <div className={`mt-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <a
              href="" 
              className="bg-electric-blue border-0 bg-blue-400 text-black py-4 px-12 rounded-full text-lg sm:text-xl hover:bg-electric-blue-dark transition inline-block"
            >
              Start Tracking Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;