import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import Content from './components/Content';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import UnderProcess from './components/UnderProcess'
const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Content />
      <WhyChooseUs />
      <Reviews />
      <Contact/>
      <FAQ/>
    <CTA/>
    <Footer/>
    {/* <UnderProcess/> */}
    </div>
  );
};

export default App;
