import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <a href="#home" className="logo">
          <span>Drive</span>Analyze
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
          <a href="#get-started" className="cta-button">
            Get Started
          </a>
        </div>

        <button 
          className="menu-toggle" 
          onClick={toggleMenu} 
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween' }}
            >
              <div className="mobile-menu-header">
                <a href="#home" className="logo" onClick={closeMenu}>
                  <span>Drive</span>Analyze
                </a>
                <button onClick={toggleMenu} className="close-menu" aria-label="Close menu">
                  <FaTimes />
                </button>
              </div>
              <div className="mobile-links">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="mobile-link"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#get-started"
                  className="mobile-cta"
                  onClick={closeMenu}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
