import React, { useState, useEffect } from "react";
import bg from "../images/Polygon 12.png";
import dot from "../images/Ellipse 9.png";
import blurdot from "../images/Ellipse 12.png";
import small from "../images/Ellipse 20.png";
import "./pricing.scss";
import { useNavigate } from "react-router-dom";
import Networking from '../images/networking.png';
import Features from "../Features/Features";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="pricing-container">
      <div className="heading">
        <h1>Why Use <span>Capital HUB's</span> Platform ?</h1>
        <h3>With access to 1000+ Angel Investors across India, Capital HUB gives you everything you need to grow and connect with the right investors.</h3>
      </div>

      <div className="networking">
        <div className="image">
          <img src={Networking} alt="networking image" />
        </div>
        <div className="net-platform">
          <h1>Networking Platform</h1>
          <p>Engage with fellow startups and investors, create posts, and build a network that accelerates your growth.</p>
          <button>Buy Now</button>
        </div>
      </div>


      <img src={dot} alt="dot1" className="background-img dot1" />
      <img src={small} alt="small" className="background-img small" />
      <img src={dot} alt="dot2" className="background-img dot2" />
      <img src={blurdot} alt="blur-dot1" className="background-img blur-dot1" />
      <img src={blurdot} alt="blur-dot2" className="background-img blur-dot2" />
      <img src={blurdot} alt="blur-dot3" className="background-img blur-dot3" />
      {/* <img src={bg} alt="background" className="background-img bg" /> */}
      
      <Features />

    </div>
  );
};

export default Pricing;
