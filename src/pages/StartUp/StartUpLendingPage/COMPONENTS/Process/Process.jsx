import React from 'react';
import { CgProfile } from "react-icons/cg";
import { LuLink } from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaShareAlt } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { BsPiggyBankFill } from "react-icons/bs";
import { RiFundsLine } from "react-icons/ri";
import arrow from '../images/Line 192.png';
import img1 from '../images/Rectangle 1990.png';
import img2 from '../images/Rectangle 1991.png';
import img3 from '../images/Rectangle 1992.png';
import img4 from '../images/Rectangle 1993.png';
import img5 from '../images/Rectangle 1994.png';
import img6 from '../images/Rectangle 1995.png';
import img7 from '../images/Rectangle 1996.png';
import one from '../images/1.png';
import two from '../images/2.png';
import three from '../images/3.png';
import four from '../images/4.png';
import five from '../images/5.png';
import six from '../images/6.png';
import seven from '../images/7.png';
import './process.scss';
import { useNavigate } from 'react-router-dom';

const Process = () => {
  const navigate = useNavigate()
  return (
    <div className="process-container">
      <center>
        <h1 className="title">Raise angel investments in just seven steps</h1>
      </center>
      <div className="steps-container">
        <div className="step">
          <div className="step-icon step1">
            <CgProfile className="icon" />
          </div>
          <h1 className="step-text">Create Profile</h1>
        </div>
        <img src={arrow} alt="arrow" className="arrow" />
        <div className="step active">
          <div className="step-icon step2">
            <LuLink className="icon" />
          </div>
          <h1 className="step-text">Create Onelink</h1>
        </div>
        <img src={arrow} alt="arrow" className="arrow" />
        <div className="step">
          <div className="step-icon step3">
            <GiTakeMyMoney className="icon" />
          </div>
          <h1 className="step-text">Investors</h1>
        </div>
        <img src={arrow} alt="arrow" className="arrow" />
        <div className="step">
          <div className="step-icon step4">
            <FaShareAlt className="icon" />
          </div>
          <h1 className="step-text">Share Onelink</h1>
        </div>
        <img src={arrow} alt="arrow" className="arrow" />
        <div className="step">
          <div className="step-icon step5">
            <IoCalendarNumber className="icon" />
          </div>
          <h1 className="step-text">Schedule</h1>
        </div>
        <img src={arrow} alt="arrow" className="arrow" />
        <div className="step">
          <div className="step-icon step6">
            <BsPiggyBankFill className="icon" />
          </div>
          <h1 className="step-text">Negotiate</h1>
        </div>
        <img src={arrow} alt="arrow" className="arrow" />
        <div className="step">
          <div className="step-icon step7">
            <RiFundsLine className="icon" />
          </div>
          <h1 className="step-text">Funds</h1>
        </div>
      </div>

      <div className="content-container">
        <div className="content-section reverse">
          <div className="image-content">
            <img src={img1} alt="Create profile" />
          </div>
          
          <div className="text-content">
            <div className="headProNumber">
              <div className="number-right"><img src={one} alt="One" /></div>
              <h1>Create profile seamlessly</h1>
            </div>
            <p>Set up your startup profile in just a few minutes with our user-friendly interface.
            Provide key details about your startup to attract the right investors</p>
            <button className="learn-more" onClick={()=>{navigate("/signup")}}>Join Now</button>
          </div>
        </div>

        <div className="content-section">
          <div className="image-content">
            <img src={img2} alt="Create Onelink" />
          </div>
          <div className="text-content">
            <div className="headProNumber">
              <div className="number"><img src={two} alt="Two" /></div>
              <h1>Create One link</h1>
            </div>
              <p>Generate a comprehensive link that includes all your essential documents, team
              details, and more. Make it easy for investors to access and review your startup
              information in one place.</p>
              <button className="learn-more" onClick={()=>{navigate("/signup")}}>Learn More</button>
          </div>
          
        </div>

        <div className="content-section reverse">
          <div className="image-content">
            <img src={img3} alt="Investors" />
          </div>
          
          <div className="text-content">
            <div className="headProNumber">
              <div className="number-right"><img src={three} alt="Three" /></div>
              <h1>Search for Investors</h1>
            </div>
            <p>Use advanced filters to find investors who are specifically interested in your industry
            and stage of growth. Save time by connecting with the most relevant investors for
            your startup.
            </p>
            <button className="learn-more" onClick={()=>{navigate("/signup")}}>Learn More</button>
          </div>
        </div>

        <div className="content-section">
          <div className="image-content">
            <img src={img4} alt="Share Onelink" />
          </div>
          <div className="text-content">
            <div className="headProNumber">
              <div className="number"><img src={four} alt="Four" /></div>
              <h1>Introduce and share onelink</h1>
            </div>

                <p>Share your One Link with potential investors via email or direct messaging on the
                platform. Ensure investors have all the information they need to evaluate your
                startup.
                </p>
              <button className="learn-more" onClick={()=>{navigate("/signup")}}>Learn More</button>
          </div>
          
        </div>

        <div className="content-section reverse">
          <div className="image-content">
            <img src={img5} alt="Schedule" />
          </div>
          
          <div className="text-content">
            <div className="headProNumber">
              <div className="number-right"><img src={five} alt="Five" /></div>
              <h1>Schedule an appointment</h1>
            </div>
            <p>Easily set up meetings with interested investors through our integrated scheduling
            tool. Coordinate and confirm appointments without the hassle of back-and-forth
            emails</p>
            <button className="learn-more" onClick={()=>{navigate("/signup")}}>Learn More</button>
          </div>
        </div>

        <div className="content-section">
          <div className="image-content">
            <img src={img6} alt="Negotiate" />
          </div>
          <div className="text-content">
            <div className="headProNumber">
              <div className="number"><img src={six} alt="Six" /></div>
              <h1>Negotiate and Sign Agreement via iSafe</h1>
            </div>

              <p>Finalise deals with investors using secure and straightforward iSafe agreements.
              Streamline the negotiation process and ensure all parties are on the same page.
              </p>
              <button className="learn-more" onClick={()=>{navigate("/signup")}}>Learn More</button>
          </div>
          
        </div>

        <div className="content-section reverse">
          <div className="image-content">
            <img src={img7} alt="Funds" />
          </div>
          
          <div className="text-content">
            <div className="headProNumber">
              <div className="number-right"><img src={seven} alt="Seven" /></div>
              <h1>Raise and Receive Funds Directly</h1>
            </div>
            <p>Secure the necessary funding and receive investments directly through the platform.
            Monitor the progress of your fundraising efforts and manage funds efficiently</p>
            <button className="learn-more" onClick={()=>{navigate("/signup")}}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
