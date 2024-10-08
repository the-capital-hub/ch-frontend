import React from "react";
import LocationIcon from "../../../../Images/investorIcon/octicon_location-16.svg";
import EmailIcon from "../../../../Images/investorIcon/Message.svg";
import TweeterIcon from "../../../../Images/investorIcon/Tweeter.svg";
import IntagramIcon from "../../../../Images/investorIcon/Instagram.svg";
import LinkedinIcon from "../../../../Images/investorIcon/Linkedin.svg";
import WebIcon from "../../../../Images/investorIcon/WebIcon.svg";
import LogoX from "../../../../Images/investorIcon/LogoX.png";
import "./companyDetails.scss";

const CompanyDetailsCard = () => {
  return (
    <>
      <div className="row company_details_container">
        <div className="col-12 mt-2">
          <div className=" company_details box">
            <div className="row">
              <div className="col-12">
                <div className="image_name_section mt-2 company_details_image_text">
                  <span className="company_details_logo_container">
                    <img src={LogoX} alt="profileimage" />
                  </span>
                  <div className="left_profile_text flex_content">
                    <h2 className="typography m-2">The Capital Hub</h2>
                    <span className="small_typo m-2">
                      Channing & Barrett industries pvt ltd
                    </span>
                    <span className="small_typo location_icon">
                      <img src={LocationIcon} alt="location" />
                      jayanagar 4th block banglore{" "}
                      <img src={EmailIcon} alt="location" />
                      pramodbadigar.capitalhub@gmail.com{" "}
                    </span>
                    <div className="small_typo social_icon mt-3">
                      <img src={WebIcon} alt="social_img" />
                      <img src={LinkedinIcon} alt="social_img" />
                      <img src={TweeterIcon} alt="social_img" />
                      <img src={IntagramIcon} alt="social_img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="company_details mt-4">
                <p>
                  As the Founder at The Capital HUB, my vision is all about building
                  great start-ups from a simple idea to an elegant reality.
                  Humbled and honored to have worked with Angels and VC's across
                  the globe to support and grow the startup culture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDetailsCard;
