import React from "react";
import "./InvestorAfterSuccessPopUp.scss";
import CorrectIcon from "../../../Images/CorrectIcon.svg";
import IconCorrect from "./IconCorrect";

const InvestorAfterSuccessPopUp = ({
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
    <div className="investor_after_register_popup">
      <div className="popup">
        <div className="popup-content">
          {/* <img src={CorrectIcon} alt="image" /> */}
          <IconCorrect fill={"#d3f36b"} />
          {contactFrom && (
            <h1>
              Form Submitted{" "}
              <span style={{ color: "#D3F36B" }}>Successfully!</span>
            </h1>
          )}
          {register && (
            <h1>
              Thank You for{" "}
              <span style={{ color: "#D3F36B" }}>Registering!</span>
            </h1>
          )}
          {login && (
            <h1>
              You Are Successfully{" "}
              <span style={{ color: "#D3F36B" }}>Logged in!</span>
            </h1>
          )}
          {(register || contactFrom) && <p>We will contact you soon...</p>}
          {savedFile && <h1>File Saved Successfully</h1>}

          {passwordChange && <h1>Password Change Successfully</h1>}
          {successText && <h1>{successText}</h1>}
          {emailSent && <h1>Email Sent Successfully</h1>}
          {emailSent && <p>Please Check Your Email</p>}

          {!withoutOkButton && (
            <button className="investor_ok_button" onClick={handleOKClick}>
              OK
            </button>
          )}
          <button className="investor_close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestorAfterSuccessPopUp;
