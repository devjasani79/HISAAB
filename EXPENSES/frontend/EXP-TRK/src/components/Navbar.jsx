import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For managing the menu state

  // Toggle the menu state when hamburger is clicked
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu if clicked outside of it
  const handleClickOutside = (e) => {
    if (e.target.closest('.navbar') || e.target.closest('.menu')) return;
    setIsMenuOpen(false);
  };

  // Attach event listener to close the menu when clicked outside
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
<nav className="navbar sticky top-0 left-0 w-full bg-gray-900 text-white shadow-[0_4px_10px_0_rgba(0,0,0,0.7)] z-50">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    {/* Logo */}
    <div className="text-2xl font-semibold flex items-center">
    <a href="#HeroSection"><img src="/logo.png" alt="Logo" className="h-8 mr-2" /></a> 
      <span>EXP-TRK</span>
    </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li><a href="#HeroSection" className="hover:text-blue-400">Home</a></li>
          <li><a href="#services" className="hover:text-blue-400">Services</a></li>
          <li><a href="#Reviews" className="hover:text-blue-400">Reviews</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
          <li><a href="#FAQ" className="hover:text-blue-400">FAQ</a></li>
        </ul>

        {/* Hamburger Icon (visible on mobile & tablet) */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <FaBars size={30} />
          </button>
        </div>
      </div>

      {/* Side Menu (visible on mobile & tablet) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isMenuOpen ? 'block' : 'hidden'}`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between p-6">
          <div className="text-2xl font-semibold">
            <span>EXP-TRK</span>
          </div>
          <button onClick={toggleMenu}>
            <FaTimes size={30} />
          </button>
        </div>
        <ul className="space-y-8 p-6">
          <li><a href="#home" className="hover:text-blue-400" onClick={toggleMenu}>Home</a></li>
          <li><a href="#services" className="hover:text-blue-400" onClick={toggleMenu}>Services</a></li>
          <li><a href="#reviews" className="hover:text-blue-400" onClick={toggleMenu}>Reviews</a></li>
          <li><a href="#contact" className="hover:text-blue-400" onClick={toggleMenu}>Contact</a></li>
          <li><a href="#faq" className="hover:text-blue-400" onClick={toggleMenu}>FAQ</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
