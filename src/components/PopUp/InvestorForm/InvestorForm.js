import React, { useEffect, useState } from "react";
import "./InvestorForm.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AfterRegisterPopUp from "../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { postInvestorData } from "../../../Service/user";

const InvestorForm = ({ onStartupClick }) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    gender: "",
    education: "",
    experience: "",
    location: "",
    industry: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleClosePopup = () => {
    setIsSubmitted(true);
    navigate("/login");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { _id } = JSON.parse(localStorage.getItem("user_data"));
      const response = await postInvestorData({ ...formData, founderId: _id });
      console.log("Investor data posted successfully:", response);
      if (response) {
        setIsSubmitted(true);
      }
      localStorage.removeItem("user_data");
    } catch (error) {
      console.error("Error posting user data:", error);
    }
  };


  

  return (
    <>
      <div className="startup_form_container">
        <div className="popup-container">
          <div className="popup">
            <div className="back_and_home">
            <a href="/signup" onClick={handleBack}>
                <span>← Back</span>
              </a>
              <a href="/signup">Home</a>
            </div>
            <div className="title_text">
              <h1>Investor</h1>
              <p>
                Enter the required information below . You can change it anytime
                you want
              </p>
            </div>
            <div className="inside_startUp_popup">
              <form onSubmit={handleSubmit}>
                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="company">Company:</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input_half row">
                  <div className="col-6">
                    <label htmlFor="designation">Designation:</label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>
                <div className="input_half row">
                  <div className="col-6">
                    <label htmlFor="education">Education:</label>
                    <input
                      type="text"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="experience">Experience:</label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="location">Location:</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />{" "}
                  </div>
                </div>

                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="portfolio">Portfolio:</label>
                    <input
                      type="text"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="input_half row">
                  <div className="col-12">
                    <label htmlFor="industry">Industry:</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                    >
                      <option value="">Select</option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      {/* Add more options as needed */}
                    </select>
                  </div>
                </div>

                <div className="input_half row">
                  <div className="col-12">
                    <button type="submit">Submit</button>
                  </div>
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

export default InvestorForm;
