import React, { useState, useEffect, useRef } from 'react';

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const faqs = [
    {
      question: "How secure is my financial data?",
      answer: "Your financial data is protected through advanced encryption techniques and secure servers, ensuring complete confidentiality and safety."
    },
    {
      question: "Is the platform suitable for beginners?",
      answer: "Yes, our platform is designed to be user-friendly and intuitive, making it accessible for beginners and experienced users alike."
    },
    {
      question: "Can I access the platform on mobile devices?",
      answer: "Absolutely! Our financial management platform is mobile-friendly and highly responsive for on-the-go access."
    },
    {
      question: "How do I set up a budget?",
      answer: "Setting up a budget is simple! Just navigate to the budgeting tool, enter your expenses and income, and the platform will guide you."
    },
    {
      question: "Is customer support available for assistance?",
      answer: "Yes, we offer 24/7 customer support via phone or email to assist you with any inquiries."
    },
    {
      question: "What types of alerts will I receive?",
      answer: "You will receive notifications for budget limits, unusual spending, and important financial deadlines to help you stay on track."
    }
  ];

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
    id='FAQ' ref={sectionRef} className="py-16 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-50px]'
        }`}>
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked Questions <span className="text-electric-blue">(FAQ)</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get answers to common questions about our financial management platform
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-[100px]'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-4 text-electric-blue">
                {faq.question}
              </h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;