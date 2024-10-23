import React from 'react';
import './process.scss';
import backgroundImage from '../images/bgProcess.png'; 
import icon1 from '../images/icon1.png'; 
import icon2 from '../images/icon2.png'; 
import icon3 from '../images/icon3.png'; 
import arrow2 from "../images/arrow2.png";
import { MdKeyboardArrowRight } from "react-icons/md";

const Process = () => {
  return (
    <div className="process-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <center>
        <button className="step1">Step 1</button>
        <h1 className="title">
          Download the Investor <span className="highlight">DATABASE</span> - 500+ VCs and Angels
        </h1>
      </center>
      {/* Green Arrow */}
      <div className="arrow-container-process">
							<img className="green-arrow" src={arrow2} alt="green arrow" />
			</div>
      <div className='databaseText'>
        <div className="subtitle">Fuel your startup's growth with the right connections.</div>
          <div className="descriptions">
          Download our exclusive database with 500+ active Venture Capitalists and Angel Investors to build meaningful relationships.
          </div>
      </div>
        
      

      <div className="features">
        <h2 className="feature-title">What You'll Get</h2>
        <div className="features-grid">
          <div className="feature-item">
            <img src={icon1} className='icon' alt="icon1" />
            <h3>
               Verified contact info of top investors
            </h3>
            <p>Lets users quickly find answers to their questions without having to search through multiple sources.</p>
            <a href="#" className="buy-now" style={{display:"inline-flex", alignItems:"center"}}>Buy Now <span><MdKeyboardArrowRight /></span> </a>
          </div>

          <div className="feature-item">
          <img src={icon2} className='icon' alt="icon2" />
            <h3>
               Categorised for easy sorting (Sector, Stage, Region)
            </h3>
            <p>Lets users quickly find answers to their questions without having to search through multiple sources.</p>
            <a href="#" className="buy-now" style={{display:"inline-flex", alignItems:"center"}}>Buy Now <span><MdKeyboardArrowRight /></span> </a>
          </div>

          <div className="feature-item">
          <img src={icon3} className='icon' alt="icon3" />
            <h3>
               Tips for crafting the perfect investor pitch
            </h3>
            <p>Lets users quickly find answers to their questions without having to search through multiple sources.</p>
            <a href="#" className="buy-now" style={{display:"inline-flex", alignItems:"center"}}>Buy Now <span><MdKeyboardArrowRight /></span> </a>
          </div>
        </div>
      </div>

      <div className="download-section">
          <a href="#" className="download-btn">Start Download Now</a>
          <div className="text-content">
              <p className="no-hassles">
                  No Hassles, <span>Instant Access</span>
              </p>
              <p className="download-info">Download in 2 minutes and start reaching out.</p>
          </div>
      </div>

      <div className="download-section2">
          <div className="text-content">
              <p className='step2'>Step 2</p>
              <p className="no-hassles">
                Unlock Premium <span>Resources</span> to Elevate Your Startup
              </p>
              <p className="download-info">Once you’ve downloaded the database, become a Great founder by joining <span>Hustlers Club</span>and <span>Capital HUB</span> for just <span>INR 1,999</span>.</p>
          </div>
          <div className="download-btn">
            <div className='card-details'>
              <div className='getHead'>Unlock Premium Resources</div>
              <div className='getPrice'><span>INR</span> 1,999</div>
              <a className='button-get-started' href="#">Get Started</a>
            </div>
            
          </div>
      </div>
    </div>
  );
};

export default Process;
