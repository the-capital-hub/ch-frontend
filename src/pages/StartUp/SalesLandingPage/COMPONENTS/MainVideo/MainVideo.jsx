import React from 'react';
import img2 from '../images/Home.png';
import play from '../images/playbutton.png';
import './style.scss';
import { useNavigate } from 'react-router-dom';

const Process = () => {
  const navigate = useNavigate();
  return (
    
    <div className="mainVideo-container" id='process-1nd'>
      <div className="content-container">
        <div className="content-section">
          <div className="image-content">
            <img src={img2} alt="Create Onelink" className="main-image" />
            <div className="play-button-container">
              <img src={play} alt="play-button" className="play-button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
