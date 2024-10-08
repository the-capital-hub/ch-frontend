

import React from 'react';
import './FeedbackCard.scss';

const FeedbackCard = ({ image, name, stars, paragraph }) => {
  return (
    <div className="feedbackcard-component">
      <div className="card-header">
        <div className="header-left">
          <img src={image} alt="Profile" />
        </div>
        <div className="header-right">
          <h2 className="name">{name}</h2>
          <div className="feedback">
            {Array.from({ length: stars }, (_, index) => (
              <span key={index} className="star">&#9733;</span>
            ))}
          </div>
        </div>
      </div>
      <div className="card-body">
        <p className="paragraph">{paragraph}</p>
      </div>
    </div>
  );
}

export default FeedbackCard;
