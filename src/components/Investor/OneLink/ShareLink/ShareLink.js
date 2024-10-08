import React from "react";
import "./ShareLink.scss";
// import LinkImage from "../../../../Images/LinkImage.svg";
// import ExitImage from "../../../../Images/Exit.svg";
// import CorrectImage from "../../../../Images/Correct.svg";
// import Cross from "../../../../Images/Cross.svg";
import { Link } from "react-router-dom";
import IconLink from "../../SvgIcons/IconLink";
import { useSelector } from "react-redux";
import { RiShareBoxLine } from "react-icons/ri";

const ShareLink = ({
  OneLink,
  onExitClick,
  investor = false,
  isExitClicked,
}) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  return (
    <>
      <div className="ShareLink_container  mt-md-0">
        <div className="box_container rounded-4 shadow-sm border">
          <section className="title_section">
            <h6>Now share all your startup details in OneLink</h6>
          </section>
          <hr />
          {isExitClicked && (OneLink === undefined || OneLink === "") && (
            <div className="warning_message">
              Please fill company details to get the OneLink.
            </div>
          )}
          <Link
            // to={"/onelink/" + oneLink.OneLink}
            className="copy_link_input text-decoration-none"
          >
            <div className="input_container left_margin">
              <div
                className={`left_icons ${investor ? "investor" : "startup"} `}
              >
                {/* <img src={LinkImage} alt="image" /> */}
                <IconLink color={`${investor ? "black" : "white"} `} />
              </div>
              <input
                type="text"
                placeholder="Type your text here"
                className="pe-2"
                value={
                  OneLink
                    ? investor
                      ? "thecapitalhub.in/investor/onelink/" +
                        OneLink +
                        "/" +
                        loggedInUser.oneLinkId
                      : "thecapitalhub.in/onelink/" +
                        OneLink +
                        "/" +
                        loggedInUser.oneLinkId
                    : ""
                }
                disabled
              />
              <div className="right_icons_onelink">
                {/* <img
                  className="right_icons_img1"
                  src={ExitImage}
                  alt="Share Icon"
                  
                /> */}
                <RiShareBoxLine
                  size={30}
                  onClick={onExitClick}
                  className="right_icons_img1"
                  style={{ fill: "var(--d-l-grey)" }}
                />

                {/* <img
                  className="right_icons_img2"
                  src={CorrectImage}
                  alt="image"
                /> 
                <img className="right_icons_img3" src={Cross} alt="image" /> */}
              </div>
            </div>
          </Link>
          {/* <hr />
          <section className="previous_link copy_link_input">
            <h5>Previous Links</h5>
            <div className="input_container">
              <input type="text" placeholder="Type your text here" />
              <div className="right_icons">
                <img className="right_icons_img1" src={ExitImage} alt="image" />
                <img className="right_icons_img2" src={CorrectImage} alt="image" />
              </div>
            </div>
            <div className="input_container">
              <input type="text" placeholder="Type your text here" />
              <div className="right_icons">
                <img className="right_icons_img1" src={ExitImage} alt="image" />
                <img className="right_icons_img2" src={CorrectImage} alt="image" />
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </>
  );
};

export default ShareLink;
