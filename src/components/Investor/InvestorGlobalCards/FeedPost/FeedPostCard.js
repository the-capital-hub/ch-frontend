import React from "react";
import profilePic from "../../../../Images/investorIcon/profilePic.webp";
import locationIcon from "../../../../Images/investorIcon/octicon_location-16.svg";
import RoundLogo from "../../../../Images/RoundLogo.png";
import SavedIcon from "../../../../Images/SavedIcon.svg";
import HomeIcon from "../../../../Images/HomeIcon.svg";
import ThreeODotIcon from "../../../../Images/ThreeDotIcon.svg";
import FireIcon from "../../../../Images/Fire.png";
import "./feedPostCard.scss";

const FeedPostCard = () => {
  return (
    <>
      <div className="row feedpostcard_main_container">
        <div className="col-12">
          <div className="box feedpostcard_container mt-2">
            <div className="  feed_header_container">
              <div className="feedpostcard_content">
                <img src={RoundLogo} alt="logo" />
                <div className="feedpostcart_text_header">
                  <span
                    style={{ fontSize: "20px", fontWeight: 600, color: "#000" }}
                  >
                    The Capital Hub
                  </span>
                  <span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#000",
                      }}
                    >
                      <img src={HomeIcon} alt="logo" />
                      Corporate
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#000",
                      }}
                    >
                      <img src={locationIcon} alt="logo" />
                      Bangalore, India
                    </span>
                  </span>
                  <span
                    style={{ fontSize: "12px", fontWeight: 500, color: "#000" }}
                  >
                    1 Day ago
                  </span>
                </div>
              </div>
              <div className="three_dot">
                <img src={ThreeODotIcon} alt="dot" />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 para_container">
                <div className="para_container_text">
                  <p>
                    As the Founder at The Capital HUB, my vision is all about
                    building great start-ups from a simple idea to an elegant
                    reality. Humbled and honored to have worked with Angels and
                    VC's across the globe to support and grow the
                    startup culture.
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="row feedpostcard_footer">
              <div className="col-6">
                <div className="feedpostcard_footer_like_comment">
                  <span>
                    <img src={FireIcon} alt="Like" />
                    <span>Like</span>
                  </span>
                  <span>
                    <img src={HomeIcon} alt="Comment" />
                    <span>Comment</span>
                  </span>
                </div>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <img src={SavedIcon} alt="saved" />
                <span>Save</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedPostCard;
