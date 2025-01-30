import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
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
    id='contact'
      ref={sectionRef} 
      className="py-16 bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Contact Info */}
          <div className={`lg:w-1/2 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[100px]'
          }`}>
            <h2 className="text-4xl font-bold mb-8">Get in Touch with Us</h2>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-400 text-2xl flex-shrink-0" />
                <p>G2 Ramanand Park<br/>Pune, MH 411028</p>
              </div>
              
              <div className="flex items-center gap-4">
                <FaPhone className="text-blue-400 text-2xl flex-shrink-0" />
                <p>+91 7888117903</p>
              </div>
              
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-400 text-2xl flex-shrink-0" />
                <p>devjasani79@gmail.com</p>
              </div>
              
              <div className="flex items-center gap-4">
                <FaClock className="text-blue-400 text-2xl flex-shrink-0" />
                <p>Mon-Sat: 11:00 AM - 5:00 PM<br/>Sunday: Closed</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/devjasani79/"   target='_blank' className="text-electric-blue hover:text-blue-400 transition">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="https://github.com/devjasani79" target='_blank' className="text-electric-blue hover:text-blue-400  transition">
                <FaGithub className="text-2xl" />
              </a>
              <a href="https://www.instagram.com/dev_jasani/" target='_blank'  className="text-electric-blue hover:text-blue-400  transition">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Right Side - Google Maps */}
          <div className={`lg:w-1/2 transition-all duration-700 ease-out delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[100px]'
          }`}>
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl"> 
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.8101710919432!2d73.93515462784735!3d18.50084860825822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c20298a0ef3f%3A0xee0a510558704aed!2sRamanand%20Complex!5e0!3m2!1sen!2sin!4v1738190045732!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;