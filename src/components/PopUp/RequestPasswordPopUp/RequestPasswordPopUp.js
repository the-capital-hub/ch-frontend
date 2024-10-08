import React, { useState } from "react";
import "./RequestPasswordPopUp.scss";
import CorrectIcon from "../../../Images/CorrectIcon.svg";
import { postResetPaswordLink } from "../../../Service/user";
import AfterSuccessPopUp from "../AfterSuccessPopUp/AfterSuccessPopUp";
import { useNavigate } from "react-router-dom";

const RequestPasswordPopUp = ({ onClose, login }) => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendResetLink = async () => {
    try {
      const response = await postResetPaswordLink(email);
      console.log("response", response);

      if (response.status == "200") {
        console.log("response1", response);

        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }else{
        alert("Something went wrong while sending Email")
      }
    } catch (error) {
      alert("Something went wrong while sending Email")
      onClose();
      console.error("Error sending reset link:", error);
    }
  };
  const handleClosePopup = () => {
    setShowSuccess(false);
    navigate("/login");
  };
  const navigate = useNavigate();

  return (
    <div className="reset_password_popup">
      <div className="popup">
        <div className="popup-content">
          {/* <img src={CorrectIcon} alt="image" /> */}
          <div>
            <h4 className="mb-5">
              Enter your email and we'll send you a link to reset Password
            </h4>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <button className="ok_button" onClick={handleSendResetLink}>
              Send Link
            </button>
          </div>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      {showSuccess && (
        <AfterSuccessPopUp onClose={handleClosePopup} emailSent={true} />
      )}
    </div>
  );
};

export default RequestPasswordPopUp;
