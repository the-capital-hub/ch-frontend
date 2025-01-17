import React from "react";
import "./ImageCarousel.scss";
import InvestorIcon from '../images/investorPng.png';
import StartupIcon from '../images/startupPng.png';

const ImageCarousel = () => {
  return (
    <div className="connection-container">
      {/* Startup Card */}
      <div className="card startup">
        <div className="header">
          <div className="icon">
		  	<img src={StartupIcon} alt="startup-pic" />
		  </div>
          <div className="title">
            <h3>Startup</h3>
            <span className="verified">Verified</span>
          </div>
        </div>
        <p className="description">
          An anonymous description of your startup to get the investor interested
        </p>
        <div className="tags">
          <span>EdTech</span>
          <span>4.5 Years Old</span>
          <span>₹5 Cr Revenue</span>
          <span>150K Users</span>
          <span>EBITDA Positive</span>
        </div>
        <div className="status">✔ Connected with Investor</div>
      </div>

      {/* Connector */}
      <div className="connector">
        <div className="line"></div>
        <div className="connector-icon">🔗</div>
        <div className="line"></div>
      </div>

      {/* Investor Card */}
      <div className="card investor">
        <div className="header">
          <div className="icon">
		  	<img src={InvestorIcon} alt="investor-pic" />
		  </div>
          <div className="title">
            <h3>Investor</h3>
            <span className="verified">Verified</span>
          </div>
        </div>
        <p className="description">
          Define your guardrails and create mandates to discover companies
        </p>
        <div className="tags">
          <span>EdTech</span>
          <span>Fintech</span>
          <span>Operational - 3 years +</span>
          <span>Revenue – ₹1 crore – ₹10 crore</span>
        </div>
        <div className="status">✔ Connected with Company</div>
      </div>
    </div>
  );
};

export default ImageCarousel;
