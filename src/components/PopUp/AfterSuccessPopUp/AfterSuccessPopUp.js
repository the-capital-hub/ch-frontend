import React from "react";
import "./AfterSuccessPopUp.scss";
import CorrectIcon from "../../../Images/CorrectIcon.svg";

const AfterSuccessPopUp = ({
  onClose,
  contactFrom,
  register,
  login,
  savedFile,
  passwordChange,
  emailSent,
  successText,
  withoutOkButton,
}) => {
  const handleOKClick = () => {
    onClose();

    // Navigate back to the signup page
    // window.location.href = "/signup"; // Replace "/signup" with your signup page URL
  };

  return (
    <div className="after_register_popup">
      <div className="popup">
        <div className="popup-content">
          <img src={CorrectIcon} alt="image" />
          {contactFrom && (
            <h1>
              Form Submitted{" "}
              <span style={{ color: "#FD5901" }}>Successfully!</span>
            </h1>
          )}
          {register && (
            <h1>
              Thank You for{" "}
              <span style={{ color: "#FD5901" }}>Registering!</span>
            </h1>
          )}
          {login && (
            <h1>
              You Are Successfully{" "}
              <span style={{ color: "#FD5901" }}>Logged in!</span>
            </h1>
          )}
          {(register || contactFrom) && <p>We will contact you soon...</p>}
          {savedFile && <h1>File Saved Successfully</h1>}

          {passwordChange && <h1>Password Change Successfully</h1>}
          {successText && <h1>{successText}</h1>}
          {emailSent && <h1>Email Sent Successfully</h1>}
          {emailSent && <p>Please Check Your Email</p>}

          {!withoutOkButton && (
            <button className="ok_button" onClick={handleOKClick}>
              OK
            </button>
          )}
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default AfterSuccessPopUp;
