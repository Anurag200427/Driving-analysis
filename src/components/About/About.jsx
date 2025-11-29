import React, { useEffect, useRef } from 'react';
import './About.css';
import { FaCar, FaChartLine, FaShieldAlt, FaMobileAlt, FaBrain } from 'react-icons/fa';

const About = () => {
  const sectionRef = useRef(null);
  const featureRefs = useRef([]);
  const addToRefs = (el) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    featureRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      featureRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const features = [
    {
      icon: <FaCar className="feature-icon" />,
      title: 'Comprehensive Analysis',
      description: 'Get detailed insights into your driving patterns, including speed, acceleration, braking, and more.'
    },
    {
      icon: <FaChartLine className="feature-icon" />,
      title: 'Performance Metrics',
      description: 'Track your progress over time with easy-to-understand metrics and visualizations.'
    },
    {
      icon: <FaShieldAlt className="feature-icon" />,
      title: 'Safety First',
      description: 'Identify risky behaviors and get personalized recommendations to improve your driving safety.'
    },
    {
      icon: <FaMobileAlt className="feature-icon" />,
      title: 'Mobile Friendly',
      description: 'Access your driving data anytime, anywhere with our responsive web application.'
    },
    {
      icon: <FaBrain className="feature-icon" />,
      title: 'AI-Powered',
      description: 'Leveraging advanced machine learning to provide you with the most accurate analysis.'
    }
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Why Choose Our Platform</h2>
        <p className="section-subtitle">
          Our advanced driving analysis platform helps you understand and improve your driving habits 
          through cutting-edge technology and intuitive insights.
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card" 
              ref={addToRefs}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>About Our Technology</h3>
            <p>
              Our platform utilizes state-of-the-art computer vision and machine learning algorithms to analyze 
              your driving patterns with precision. By processing video footage of your drives, we can identify 
              key metrics that help you become a safer, more efficient driver.
            </p>
            <p>
              Whether you're a daily commuter, a professional driver, or just looking to improve your skills, 
              our platform provides valuable insights to help you reach your goals. Our system is designed to be 
              easy to use while providing professional-grade analysis.
            </p>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Accuracy</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Users</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80" 
              alt="Car dashboard with analytics"
              className="about-img"
            />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
