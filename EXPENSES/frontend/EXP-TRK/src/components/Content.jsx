import React, { useState, useEffect, useRef } from 'react';

const Content = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
          {/* Image Container - Slides from left */}
          <div className={`w-full md:w-1/2 transition-all duration-700 ease-out ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-[100px]'
          }`}>
            <img 
              src="public/Content.JPG" 
              alt="Financial Management"
              className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* Text Content - Slides from right */}
          <div className={`w-full md:w-1/2 transition-all duration-700 ease-out delay-300 ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-[100px]'
          }`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className={`inline-block transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}>
                Innovative Financial Management Solution
              </span>
            </h2>
            
            <div className={`space-y-4 transition-all duration-500 delay-300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
              <p className="text-gray-300 text-lg">
                At our core, we redefine financial tracking with a modern, user-friendly platform. 
                Seamlessly blending simplicity and efficiency, we aid professionals, students, and 
                small business owners in managing expenses effortlessly.
              </p>
              <p className="text-gray-300 text-lg">
                Our intuitive interface offers a stress-free experience, empowering users to set budgets, 
                receive alerts, and visualize spending habits through interactive charts. With a clean, 
                minimalist design and soft, professional colors, we bring financial management to life.
              </p>
              <p className="text-gray-300 text-lg">
                Welcome to a world of effective budget tracking and seamless notifications at your fingertips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;