import React from 'react';
import './CardComponent.scss';

const CardComponent = ({ color, text, image,amount,background }) => {
  return (
    <div className="card-component card row"style={{ background }}>
      <div className="col-7 left-content" style={{ color }}>
        <h3 className="title">{text}</h3>
        <span className="rupee-sign">₹ {amount}</span>
      </div>
      <div className="col-5 right-content">
        <img src={image} alt="Card" />
      </div>
    </div>
  );
}

export default CardComponent;
