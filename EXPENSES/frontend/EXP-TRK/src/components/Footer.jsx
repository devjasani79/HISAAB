import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-white py-12 overflow-hidden"
    >
      <div className={`container mx-auto px-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[100px]'
        }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">ExpenseTracker</h2>
            <p className="text-gray-400">
              Empowering financial freedom through intuitive management
            </p>
          </div>


          {/* Contribute Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contribute</h3>
            <a
              href="https://github.com/devjasani79/EXPENSES.github.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-blue-400 transition"
            >
              <FaGithub className="text-xl" />
              GitHub Repository
            </a>
          
          </div>
            {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} ExpenseTracker. All rights reserved.
          </p>
        </div>
        </div>


      
      </div>



    </footer>
  );
};

export default Footer;
