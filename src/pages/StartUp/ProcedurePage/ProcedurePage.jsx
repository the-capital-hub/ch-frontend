import React, { useEffect, useRef } from 'react';
import './procedurePage.scss';
import { FaUserPlus, FaBook, FaLink, FaSearchDollar, FaHandshake, FaRocket } from 'react-icons/fa';

const ProcedurePage = () => {
  const progressLineRef = useRef(null);
  const progressPathRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const path = progressPathRef.current;
      if (!path) return;

      const container = path.closest('.progress-container');
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      const scrollTop = window.scrollY || window.pageYOffset;
      const totalHeight = containerHeight + containerTop;
      const scrollPercentage = Math.max(0, Math.min(100, (scrollTop / totalHeight) * 100));

      const pathLength = path.getTotalLength();
      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = pathLength - (scrollPercentage / 100) * pathLength;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="procedure-page">
      <h1 className="main-title">Follow the Steps</h1>
      
      <div className="progress-container">
        <svg 
          className="progress-line" 
          ref={progressLineRef} 
          viewBox="0 0 100 600"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA259" />
              <stop offset="100%" stopColor="#FF5900" />
            </linearGradient>
          </defs>

          <path
            d="M 50 0 L 50 80 
               C 50 100, 80 100, 80 120
               L 80 200
               C 80 220, 20 220, 20 240
               L 20 320
               C 20 340, 80 340, 80 360
               L 80 440
               C 80 460, 50 460, 50 480
               L 50 560"
            stroke="rgba(255, 162, 89, 0.3)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="2,2"
          />

          <path
            ref={progressPathRef}
            d="M 50 0 L 50 80 
               C 50 100, 80 100, 80 120
               L 80 200
               C 80 220, 20 220, 20 240
               L 20 320
               C 20 340, 80 340, 80 360
               L 80 440
               C 80 460, 50 460, 50 480
               L 50 560"
            stroke="url(#progressGradient)"
            strokeWidth="1.5"
            fill="none"
            style={{
              transition: 'stroke-dashoffset 0.1s ease'
            }}
          />
        </svg>
        
        <div className="step step-1">
          <div className="step-number">Step 1</div>
          <div className="step-content">
            <h2>CREATE A PROFILE</h2>
            <FaUserPlus className="step-icon" />
            <p>Build your startup's professional profile and showcase your vision to potential investors and mentors.</p>
          </div>
        </div>

        <div className="step step-2">
          <div className="step-number">Step 2</div>
          <div className="step-content">
            <h2>ACCESS RESOURCES</h2>
            <FaBook className="step-icon" />
            <p>Access essential startup resources and tools.</p>
            <div className="resource-cards">
              <div className="card">
                <FaBook className="card-icon" />
                <span>GMT</span>
              </div>
              <div className="card">
                <FaLink className="card-icon" />
                <span>Pitch Deck</span>
              </div>
            </div>
            <button className="access-btn">Access Resources</button>
          </div>
        </div>

        <div className="step step-3">
          <div className="step-number">Step 3</div>
          <div className="step-content">
            <h2>BUILD DOCUMENTS WITH ONE LINK</h2>
            <FaLink className="step-icon" />
            <p>Create and manage all your startup documents efficiently with our integrated document builder.</p>
            <img src="/path-to-your-document-image.png" alt="Document Builder" className="step-image" />
          </div>
        </div>

        <div className="step step-4">
          <div className="step-number">Step 4</div>
          <div className="step-content">
            <h2>EXPLORE 1000+ INVESTORS AND 500+ VC'S</h2>
            <FaSearchDollar className="step-icon" />
            <p>Access our extensive network of investors and venture capitalists actively looking for promising startups.</p>
          </div>
        </div>

        <div className="step step-5">
          <div className="step-number">Step 5</div>
          <div className="step-content">
            <h2>REACH OUT TO MENTORS AND INVESTORS</h2>
            <FaHandshake className="step-icon" />
            <p>Connect directly with experienced mentors and investors who can guide your startup's growth journey.</p>
            <img src="/path-to-your-mentor-image.png" alt="Mentorship" className="step-image" />
          </div>
        </div>

        <div className="step step-6 center-step">
          <div className="step-number">Step 6</div>
          <div className="step-content final-step">
            <h2>RAISE INVESTMENTS EFFICIENTLY</h2>
            <FaRocket className="step-icon" />
            <p>Successfully secure investments and take your startup to new heights.</p>
            <img src="/path-to-your-investment-image.png" alt="Investment" className="step-image rocket-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcedurePage;