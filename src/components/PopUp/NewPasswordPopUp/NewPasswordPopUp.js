import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import "./NewPasswordPopUp.scss";
import { postNewPassword } from "../../../Service/user";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AfterSuccessPopUp from "../AfterSuccessPopUp/AfterSuccessPopUp";

const NewPasswordPopUp = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation(); // Get the location object

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNewPassword = async () => {
    try {
      const token = new URLSearchParams(location.search).get("token");
      if (token) {
        console.log("Token:", token);
        console.log("Password:", password);

        const response = await postNewPassword(password, token);
        console.log("Response:", response.data); // Log the response from the API
        if (response.status == "200") {
          setShowSuccess(true);
        }
      } else {
        console.log("Token not found in URL");
      }
    } catch (error) {
      alert("Invalid User Details or Token");
      console.error("Error updating password:", error);
    }
  };

  const handleClosePopup = () => {
    setShowSuccess(false);
    navigate("/login");
  };
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Reset Password | The Capital Hub";
  }, []);

  return (
    <div className="reset_password_popup">
      <div className="popup">
        <div className="popup-content">
          <div>
            <h4 className="mb-5">Enter your New Password</h4>
            <div className="password_input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            <button className="reset_button" onClick={handleNewPassword}>
              Reset Password
            </button>
          </div>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
      {showSuccess && (
        <AfterSuccessPopUp onClose={handleClosePopup} passwordChange={true} />
      )}
    </div>
  );
};

export default NewPasswordPopUp;
