import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { calculateProfileCompletion } from "../../../Milestones/UserMilestones";
import { getUserByIdBody } from "../../../../../Service/user";
import "./CompletionBanner.scss";


const CompletionBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const loggedInUserCompany = useSelector((state) => state.user.company);
  const isInvestor = loggedInUser?.isInvestor === "true";

  const userRequiredFields = [
	"bio",
	"designation",
	(loggedInUser.firstName === "Your" ? "name" : "firstName"),
	(loggedInUser.lastName === "Name" ? "name" : "lastName"),
	"profilePicture",
    "phoneNumber",
    "email",
    "userName"
]

 const companyRequiredFields = [
	(loggedInUser.isInvestor === "true" ? "companyName" : "company"),
    "logo",
	"description",
	"location",
	"mission",
	"noOfEmployees",
	"sector",
	"socialLinks",
	"stage",
	"startedAtDate",
	"tagline",
	"vision"
];

  useEffect(() => {
    const getUser = async () => {
        await getUserByIdBody(loggedInUser).then((res) => {
            if (res.data.password) {
                setIsPassword(true);
            }
            if(res.data.startUp || res.data.investor) {
                setIsCompany(true);
            }
        });
    };
    getUser();
  }, [loggedInUser]);

  // Calculate completions
  const profileCompletion = calculateProfileCompletion(loggedInUser, userRequiredFields);
  const companyCompletion = calculateProfileCompletion(loggedInUserCompany, companyRequiredFields);
  console.log(loggedInUserCompany)
  // If everything is complete, don't show banner
  if (profileCompletion === 100 && companyCompletion === 100 && isPassword) {
    return null;
  }

  return (
    <div className="completion-banner">
      <div 
        className={`banner-header ${isInvestor ? 'investor' : 'startup'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h5>🚀 Boost Your Presence!</h5>
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>

      {isExpanded && (
        <div className="banner-content">
          {/* Profile Step */}
          {profileCompletion < 100 && (
            <div className={`step ${isInvestor ? 'investor' : ''}`} onClick={() => navigate("/profile")}>
              <div className="step-header">
                <h6>Stand Out with Your Profile</h6>
                <span>{Math.round(profileCompletion)}% Complete</span>
              </div>
              <div className="progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <small>Showcase your expertise and make a lasting impression</small>
            </div>
          )}

          {/* Company Step */}
          {companyCompletion < 100 && (
            <div className={`step ${isInvestor ? 'investor' : ''}`} onClick={() => navigate("/company-profile")}>
              <div className="step-header">
                <h6>
                  {!isCompany 
                    ? "Add Your Company to Shine" 
                    : "Enhance Your Company Profile"}
                </h6>
               {isCompany ? (<span>{Math.round(companyCompletion)}% Complete</span>) : (<span>Essential</span>)}
              </div>
             {isCompany && (<div className="progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${companyCompletion}%` }}
                />
              </div>)}
              <small>
                {!isCompany
                  ? "Put your company in the spotlight and attract opportunities"
                  : "Highlight your company's strengths and achievements"}
              </small>
            </div>
          )}

          {/* Password Step */}
          {!isPassword && (
            <div className={`step ${isInvestor ? 'investor' : ''}`} onClick={() => navigate("/manage-account")}>
              <div className="step-header">
                <h6>Secure Your Journey</h6>
                <span>Essential</span>
              </div>
              <small>Protect your growing network with a strong password</small>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompletionBanner; 