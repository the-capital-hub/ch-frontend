import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import './footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="description">
          <h1>Funds refer to pooled investment vehicles that gather capital from multiple investors to invest in a diversified portfolio of assets.</h1>
        </div>
        <div className="general">
          <h1>General</h1>
          <h3>About Us</h3>
          <h3>Pricing</h3>
          <h3>Contact Us</h3>
        </div>
        <div className="policies">
          <h1>Policies</h1>
          <h3>Security safeguards</h3>
          <h3>Terms of service</h3>
          <h3>Privacy</h3>
          <h3>Accessibility</h3>
        </div>
        <div className="get-in-touch">
          <h1>Get in touch</h1>
          <h3>Follow us on social media and stay updated with the latest information about our services</h3>
          <div className="social-icons">
            <div className="icon">
              <FaFacebookF />
            </div>
            <div className="icon">
              <FaTwitter />
            </div>
            <div className="icon">
              <RiInstagramFill />
            </div>
            <div className="icon">
              <FaYoutube />
            </div>
          </div>
        </div>
        <div className="subscribe">
          <h1>Subscribe to our Lorem</h1>
          <h3>Lorem ipsum dolor sit amet consectetur. Velit enim est urna est massa cras. Sed varius convallis netus aliquet duis ut.</h3>
          <div className="subscription-form">
            <input type="text" placeholder="Enter your email" />
            <button>Join Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
