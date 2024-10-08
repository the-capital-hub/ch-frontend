import React from "react";
import "./ErrorPopUp.scss";
import CrossRedIcon from "../../../Images/Cross.svg";

const ErrorPopUp = ({ onClose, message }) => {
  return (
    <div className="error_popup">
      <div className="popup">
        <div className="popup-content">
          <div className="image_text" onClick={onClose}>
            <img src={CrossRedIcon} alt="Error Icon" className="m-2" />
            <h1>{message}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopUp;
