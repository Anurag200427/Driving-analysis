import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import VideoUpload from './components/VideoUpload/VideoUpload';
import './App.css';

// Add fonts to document head
const addFonts = () => {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add fonts when component mounts
    addFonts();
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
              stroke="#000"
            />
          </svg>
        </motion.div>
        <h2>Loading Driving Analysis</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <VideoUpload />
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>DriveAnalyze</h3>
              <p>Advanced driving analysis powered by AI</p>
            </div>
            <div className="footer-links">
              <div className="footer-section">
                <h4>Navigation</h4>
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
              <div className="footer-section">
                <h4>Legal</h4>
                <a href="#privacy">Privacy Policy</a>
                <a href="#terms">Terms of Service</a>
                <a href="#cookies">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} DriveAnalyze. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
