import React, { useState, useEffect, useRef } from 'react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleElements, setVisibleElements] = useState({
    title: false,
    cards: [false, false, false, false]
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger title animation first
          setTimeout(() => {
            setVisibleElements(prev => ({ ...prev, title: true }));
            
            // Then description after 300ms
            setTimeout(() => {
              // Animate cards sequentially
              visibleElements.cards.forEach((_, index) => {
                setTimeout(() => {
                  setVisibleElements(prev => ({
                    ...prev,
                    cards: prev.cards.map((card, i) => 
                      i === index ? true : card
                    )
                  }));
                }, index * 200); // 200ms delay between cards
              });
            }, 300); // Delay after title
          }, 100);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="services" 
      className="py-16 bg-black text-white overflow-hidden"
      ref={sectionRef}
    >
      <div className="container mx-auto px-4">
        {/* Animated Title */}
        <h2 
          className={`text-4xl font-bold text-center m-1 transform transition-all duration-700 ease-out ${
            visibleElements.title 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-[-50px]'
          }`}
        >
         Our Key Features
        </h2>
<h3 
className={`text-xl font-bold text-center mb-10 transform transition-all duration-700 ease-out ${
  visibleElements.title 
    ? 'opacity-100 translate-y-0' 
    : 'opacity-0 translate-y-[-50px]'
}`}
>
  Discover our tailored financial management solutions designed for everyone.
</h3>


        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleElements.cards.map((isCardVisible, index) => (
            <div 
              key={index}
              className={`bg-gray-900 p-8 rounded-lg shadow-lg transition-all duration-500 ease-out delay-${index * 200} ${
                isCardVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-[100px]'
              }`}
            >
              <div className="text-center">
                <h3 className="text-3xl font-semibold mb-8">
                  {[
                    'Expense Tracking',
                    'Budgeting',
                    'Data Visualization',
                    'Real-time Notifications'
                  ][index]}
                </h3>
                <p className="text-gray-300 mb-6">
                  {[
                    'Effortlessly log your daily expenses and keep track of your finances with our intuitive interface.',
                    'Set monthly budgets for categories like groceries, entertainment, and more. Get alerts when you\'re close to your limit.',
                    'Visualize your spending habits with interactive charts and graphs. Understand where your money goes.',
                    'Stay informed with instant alerts for budget limits, due bills, and financial milestones.'
                  ][index]}
                </p>
                <button className="bg-blue-500 text-black py-2 px-6 rounded-full hover:bg-blue-200 transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;