import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Drive Smarter Drive Safer';
  const typewriterSpeed = 100; // milliseconds per character

  useEffect(() => {
    // Reset animation when component mounts
    setDisplayText('');
    let currentIndex = 0;
    let timer;

    const typeWriter = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(prev => prev + fullText.charAt(currentIndex));
        currentIndex++;
        timer = setTimeout(typeWriter, typewriterSpeed);
      } else {
        // Show subtitle and CTA after typing completes
        if (textRef.current && ctaRef.current) {
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translateY(0)';
          ctaRef.current.style.opacity = '1';
          ctaRef.current.style.transform = 'translateY(0)';
        }
      }
    };

    // Start typing animation after a short delay
    const startTimer = setTimeout(typeWriter, 500);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      clearTimeout(startTimer);
    };

    // Parallax effect
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        heroRef.current.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="typing-text">{displayText}</span>
            <span className="cursor">|</span>
          </h1>
          <p className="hero-subtitle" ref={textRef} style={{opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'}}>
            Advanced driving analysis powered by AI to enhance your driving experience
            and improve road safety.
          </p>
          <div className="hero-cta" ref={ctaRef}>
            <a href="#analyze" className="cta-button primary">
              Analyze Your Drive
            </a>
            <a href="#learn-more" className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
