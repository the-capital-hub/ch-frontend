import React from 'react';
import i1 from '../images/Vector.png';
import i2 from '../images/Vector (1).png';
import i3 from '../images/Vector (2).png';
import i4 from '../images/Vector (3).png';
import i5 from '../images/Vector (4).png';
import i6 from '../images/Group.png';
import bg1 from '../images/Polygon 3.png';
import bg2 from '../images/Polygon 7.png';
// import img1 from '../images/Polygon 2 (2).png';
import line from '../images/Group 1261152818.png';
import { FaArrowRight } from "react-icons/fa";
import './features.scss';
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate()
  return (
    <div className='features-container'>
      <div className='center-content'>
        <h1>Our Features</h1>
        <p>We’ve established a platform for budding entrepreneurs to master the art of initiating and expanding their business successfully.</p>
      </div>
      <img src={bg2} alt="background" className='background-image bg2' />
      <img src={bg1} alt="background" className='background-image bg1' />
      {/* <img src={img1} alt="" className='img1' /> */}

      <div className='features-content'>
        <div className='column left-column'>
          <div className='line'></div>
          <div className='content'>
            <div className='feature'>
              <img src={i1} alt="Networking" />
              <h1>Networking</h1>
              <p>Connect with a vast network of investors and other startups, fostering meaningful
              relationships and collaborations.</p>
              <div className='buttons' onClick={()=>{navigate("/signup")}}>
                <button >Learn more</button>
                <div className='icon-button'>
                  <FaArrowRight className='text-2xl' />
                </div>
              </div>
            </div>
            <div className='feature'>
              <img src={i2} alt="One Link" />
              <h1>One Link</h1>
              <p>Share comprehensive startup profiles, including over 32+ documents, team details,
              and more, all through a single link, making it easy for investors to access crucial
              information.
              </p>
              <div className='buttons' onClick={()=>{navigate("/signup")}}>
                <button>Learn more</button>
                <div className='icon-button'>
                  <FaArrowRight className='text-2xl' />
                </div>
              </div>
            </div>
            <div className='feature'>
              <img src={i3} alt="IRM" />
              <h1>IRM</h1>
              <p>Maintain and nurture relationships with your investors, providing them with updates,
                reports, and easy access to crucial information</p>
              <div className='buttons' onClick={()=>{navigate("/signup")}}>
                <button>Learn more</button>
                <div className='icon-button'>
                  <FaArrowRight className='text-2xl' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='column right-column'>
          <div className='line'></div>
          <div className='content'>
            <div className='feature'>
              <img src={i4} alt="Angel Investor" />
              <h1>Angel Investor</h1>
              <p>Easily find and engage with angel investors interested in your industry, using
                  advanced filters to match your startup with the right investors.
              </p>
              <div className='buttons' onClick={()=>{navigate("/signup")}}>
                <button>Learn more</button>
                <div className='icon-button'>
                  <FaArrowRight className='text-2xl' />
                </div>
              </div>
            </div>
            <div className='feature'>
              <img src={i5} alt="TRM" />
              <h1>TRM</h1>
              <p>Seamlessly manage and track all your investment transactions, ensuring smooth and
              efficient financial interactions</p>
              <div className='buttons' onClick={()=>{navigate("/signup")}}>
                <button>Learn more</button>
                <div className='icon-button'>
                  <FaArrowRight className='text-2xl' />
                </div>
              </div>
            </div>
            <div className='feature'>
              <img src={i6} alt="CRM" />
              <h1>CRM</h1>
              <p>Efficiently manage interactions with potential customers, clients, and community
              members to build strong, lasting relationships.</p>
              <div className='buttons' onClick={()=>{navigate("/signup")}}>
                <button>Learn more</button>
                <div className='icon-button'>
                  <FaArrowRight className='text-2xl' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className='join-button'>JOIN OUR COMMUNITY FOR FREE</button>
      <img src={line} alt="bottom line" className='bottom-line' />
    </div>
  );
}

export default Features;
