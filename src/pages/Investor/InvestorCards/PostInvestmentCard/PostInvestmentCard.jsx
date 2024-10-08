import React from "react";
import "./PostInvestmentCard.scss";

const PostInvestmentCard = ({ logo, text, para, images, smallText }) => {
  // Function to generate a random dark color
  const getRandomDarkColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
      color += letters[Math.floor(Math.random() * 8)]; // Limiting to 0-7 for dark colors
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const backgroundColor = getRandomDarkColor();

  return (
    <div className="postinvestment-card-row gap-2 col-md-6">
      <div 
        className="postinvestment-card-container "
        style={{ backgroundColor, color: '#FFFFFF' }} // Setting text color to white for contrast
      >
        <div className="left">
          <img src={logo} alt="Logo" className="logo" width="50" height="50"/>
          <div className="text">
            <strong>{text}</strong>
          </div>
        </div>
        <p className="para">{para}</p>
      </div>
      {/* <div className="d-flex align-items-center py-2 px-3">
            <p className={`m-0`}>
              <strong>My Commitment:</strong>{" "}
              <span className="">
                commitment
              </span>
            </p>
            
      </div> */}
    </div>
  );
};

export default PostInvestmentCard;
