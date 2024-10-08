import React, { useState } from "react";
import "./footer.scss";
import FbIcon from "../../Images/Fb.svg";
import TwIcon from "../../Images/Tw.svg";
import InIcon from "../../Images/In.svg";
import YtIcon from "../../Images/Yt.svg";
import { Link } from "react-router-dom";
import { selectIsInvestor } from "../../Store/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTheme,
  toggleTheme,
} from "../../Store/features/design/designSlice";

const Footer = ({ className }) => {
  const isInvestor = useSelector(selectIsInvestor);
  const theme = useSelector(selectTheme);
  const [selectedMode, setSelectedMode] = useState(theme);
  const dispatch = useDispatch();

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
    dispatch(toggleTheme(event.target.value));
  };
  return (
    <div>
      <div className={`container-fluid footer_container ${className}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="d-flex flex-column justify-content-center align-items-center py-2">
              <p className="m-1 ">
                Choose how your Capital hub experience looks for this device.
              </p>
              <div className="onboarding_switch_wrapper ">
                <div className="form-check form-switch ">
                  <input
                    className={`form-check-input ${isInvestor && "investor"}`}
                    type="checkbox"
                    role="switch"
                    id="onboardingToggle"
                    defaultChecked={selectedMode}
                    // checked={selectedMode === "light"}
                    onClick={handleModeChange}
                    // ref={switchRef}
                  />
                </div>
              </div>
            </div>
            {/* <div className="col-md-3 col-sm-12 d-flex justify-content-center align-items-center ">
            <p>
              Lorem ipsum dolor sit amet consectetur. Magna integer enim vitae
              vulputate eu vitae tristique.raju
            </p>
          </div> */}

            {/* General */}
            {/* <div className="col-md-2 col-sm-6 footer_list_item">
            <h4>General</h4>
            <ul className="list-unstyled">
              <li>
                <a href="http://thecapitalhub.in/about" className="text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="http://thecapitalhub.in/contactus"
                  className="text-white"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  Courses
                </a>
              </li>
            </ul>
          </div> */}

            {/* Policies */}
            {/* <div className="col-md-2 col-sm-6 footer_list_item">
            <h4>Policies</h4>
            <ul className="list-unstyled">
              <li>
                <Link to="/security-safeguard" className="text-white">
                  Security safeguards
                </Link>
              </li>
              <li>
                <Link to="/term-of-service" className="text-white">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white">
                  Privacy
                </Link>
              </li>

              <li>
                <a href="#" className="text-white">
                  Accessibility
                </a>
              </li>
            </ul>
          </div> */}

            {/* Social links */}
            <div className="col-md-6 col-sm-6 text-center footer_list_item">
              <h4>Get in touch</h4>
              <p>
                Follow us on social media and stay updated with the latest
                information about our services
              </p>
              <div className="d-flex justify-content-center gap-3">
                <a href="https://www.facebook.com/p/Capital-HUB-100086708877527/">
                  <img src={FbIcon} alt="img" style={{ margin: "0px 2px" }} />
                </a>
                <a href="https://twitter.com/TheCapitalHub_">
                  <img src={TwIcon} alt="img" style={{ margin: "0px 2px" }} />
                </a>
                <a href="https://instagram.com/capitalhub_official?igshid=MzRlODBiNWFlZA==">
                  <img src={InIcon} alt="img" style={{ margin: "0px 2px" }} />
                </a>
                {/* <a href="https://www.youtube.com/@huboriginals4179/featured">
                <img src={YtIcon} alt="img" style={{ margin: "0px 2px" }} />
              </a> */}
              </div>
            </div>

            {/* News letter */}
            {/* <div className="col-md-3 col-sm-6 footer_list_item">
            <h4>Subscribe to our Newsletter</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Velit enim est urna est
              massa cras. Sed varius convallis netus aliquet duis ut.
            </p>
            <div className="input-group mb-3 subscribe_input">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
              />
              <div className="input-group-append">
                <button className="subscribe_btn" type="button">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
            {/* <div className="row ">
            <div className="col copyright_text">
            <h5>2022 - &copy;Lorem all right deserved</h5>

            </div>
          </div> */}
            <a
              href="https://madewithloveinindia.org"
              target="_blank"
              className="text-center my-3 mx-2"
            >
              Made with{" "}
              <span aria-label="Love" style={{ color: "#f43f5e" }}>
                &#x1F9E1;
              </span>{" "}
              in India by <Link to="/">Capital Hub</Link>
            </a>
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center py-2"
        style={{ backgroundColor: "#fff" }}
      >
        <Link to="/terms-and-conditions" style={{ color: "#000",fontWeight:"bold" }}>
          Term & conditions
        </Link>
        <p style={{padding:"0 5px",marginBottom:"0",fontWeight:"bold"}}>|</p>
        <Link to="/refund-policy" style={{ color: "#000",fontWeight:"bold" }}>
          Refund & Policy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
