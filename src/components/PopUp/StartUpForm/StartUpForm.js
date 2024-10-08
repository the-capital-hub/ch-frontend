import React, { useEffect, useState } from "react";
import "./StartUpForm.scss";
import { Link } from "react-router-dom";
import { postStartUpData } from "../../../Service/user";
import { useNavigate } from "react-router-dom";
import AfterRegisterPopUp from "../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";

const StartUpForm = ({ onStartupClick }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    company: "",
    sector: "",
    fundingAsk: "",
    preFundingAsk: "",
    numberOfFundingRounds: "",
  });

  const handleClosePopup = () => {
    setIsSubmitted(true);
    navigate("/login");
  };
  const handleBack = () => {
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { _id } = JSON.parse(localStorage.getItem("user_data"));
      const response = await postStartUpData({ ...formData, founderId: _id });
      console.log("Startup data posted successfully:", response);

      // Call onStartupClick or other logic here with formData
      if (response) {
        // Additional logic
        setIsSubmitted(true);
      }
      localStorage.removeItem("user_data");
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };
  useEffect(() => {
    let userDataFromLocalStorage = localStorage.getItem("user_data");
    if (userDataFromLocalStorage) {
      setUserData(JSON.parse(userDataFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    // Update form data with user data
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
      }));
    }
  }, [userData]);

  return (
    <>
      <div className="startup_form_container_register">
        <div className="popup-container">
          <div className="popup">
            <div className="back_and_home">
              <a href="/signup" onClick={handleBack}>
                <span>← Back</span>
              </a>
              <a href="/signup">Home</a>
            </div>
            <div className="title_text">
              <h1>Start Up</h1>
              <p>
                Enter the required information below . You can change it anytime
                you want
              </p>
            </div>
            <div className="inside_startUp_popup">
              <form onSubmit={handleSubmit}>
                <div className="input_half row">
                  <div className="col-6">
                    <label htmlFor="firstName">FirstName:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="lastName">LastName:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                  {/* <div className="col-6">
                    <label htmlFor="company">Company Name:</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div> */}
                </div>
                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="sector">Company Sector:</label>
                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                    >
                      <option value="">Choose a sector</option>
                      <option value="option1">Sector 1</option>
                      <option value="option2">Sector 2</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>

                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="company">Company Name:</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="fundingAsk">Funding Ask:</label>
                    <input
                      type="text"
                      id="fundingAsk"
                      name="fundingAsk"
                      value={formData.fundingAsk}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="preFundingAsk">
                      Previous funding round (amount):
                    </label>
                    <input
                      type="text"
                      id="preFundingAsk"
                      name="preFundingAsk"
                      value={formData.preFundingAsk}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="numberOfFundingRounds">
                      Number of funding rounds:
                    </label>
                    <input
                      type="text"
                      id="numberOfFundingRounds"
                      name="numberOfFundingRounds"
                      value={formData.numberOfFundingRounds}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input_half mt-2 w-100 d-flex justify-content-end">
                  <button type="submit">Confirm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {isSubmitted && (
        <AfterRegisterPopUp onClose={handleClosePopup} register={true} />
      )}
    </>
  );
};

export default StartUpForm;
