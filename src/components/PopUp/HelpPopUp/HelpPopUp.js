import React, { useEffect, useState } from "react";
import "./helpPopUp.scss";
import fbIcon from "../../../Images/fb_contact.svg";
import instaIcon from "../../../Images/insta_contact.svg";
import twIcon from "../../../Images/tw_contact.svg";
import { environment } from "../../../environments/environment";
import axios from "axios";
import AfterSuccessPopUp from "../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { useSelector } from "react-redux";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";

const baseUrl = environment.baseUrl;

const HelpPopUp = ({ setOpen }) => {
  const initialForm = {
    name: "",
    email: "",
    mobileNumber: "",
    category: "fundraising",
    description: "",
  };
  const [contactForm, setContactForm] = useState({ ...initialForm });

  const onChangeFormHandler = (event) => {
    const { name, value } = event.target;
    setContactForm((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const requestBody = {
      name: contactForm.name,
      email: contactForm.email.trim(),
      mobile: contactForm.mobileNumber,
      inquiryType: contactForm.category,
      description: contactForm.description,
      isEcom: false,
    };
    axios
      .post(`${baseUrl}/contactUs`, requestBody)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          console.log("form submitted");
          setFormSubmitted(true);
          setContactForm({ ...initialForm });
        }
      })
      .catch((error) => {
        console.error("Error sending mail:", error);
      });
  };

  useEffect(() => {
    document.title = "Contact Us | The Capital Hub";
  }, []);
  const theme = useSelector(selectTheme);

  return (
    <div className="after_register_popup">
      <div className="popup" data-bs-theme={theme}>
        {formSubmitted && (
          <AfterSuccessPopUp
            contactFrom
            onClose={() => setFormSubmitted(!formSubmitted)}
          />
        )}
        <div className="container-fluid contactus_container">
          <div className="container mt-5" style={{ flexDirection: "row" }}>
            <form
              className="d-flex gap-3 flex-column"
              onSubmit={formSubmitHandler}
            >
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="form-input col">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={contactForm.name}
                    onChange={onChangeFormHandler}
                    name="name"
                    required
                  />
                </div>
                <div className="form-input col">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={onChangeFormHandler}
                    required
                  />
                </div>
              </div>
              <div className="row row-cols-1 row-cols-lg-2">
                <div className="form-input col">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    id="mobileNumber"
                    type="number"
                    name="mobileNumber"
                    value={contactForm.mobileNumber}
                    onChange={onChangeFormHandler}
                    required
                  />
                </div>
                <div className="form-input col">
                  <label htmlFor="category">Choose one</label>
                  <select
                    id="category"
                    value={contactForm.category}
                    onChange={onChangeFormHandler}
                    name="category"
                    required
                  >
                    <option value="fundraising">Fundraising</option>
                    <option value="webdevelopment">Web Development</option>
                  </select>
                </div>
              </div>
              <div className="form-input px-2">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={contactForm.description}
                  onChange={onChangeFormHandler}
                  rows={5}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <div
              className="card-container card-container_contact"
              style={{ flexDirection: "column" }}
            >
              <div className="card">
                {/* <img src={callIcon} alt="callimg" /> */}
                <BsTelephone size={75} />

                <div className="text_content">
                  <h2>Customer Support</h2>
                  <span
                    style={{
                      color: "#FD5901",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    {/* +91 8217839506 */}
                    {/* +91 76249 37258 */}
                    +91 6366255319, +91 8217839506
                  </span>
                  <p>
                    You may call us between Monday to Friday 9:00 am to 5:30 pm
                    from your registered mobile number.
                  </p>
                </div>
                <button>
                  <a
                    href="tel:+918217839506"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    Call Us
                  </a>
                </button>
              </div>
              <div className="card">
                {/* <img src={messageIcon} alt="callimg" /> */}
                <VscSend size={75} />

                <div className="text_content">
                  <h2>Email us</h2>
                  <span
                    style={{
                      color: "#FD5901",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    investments@thecapitalhub.in
                  </span>
                  <p>
                    Write to us about your query and our customer support team
                    will revert as soon as possible
                  </p>
                </div>
                <button>
                  <a
                    href="mailto:investments@thecapitalhub.in"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      cursor: "pointer",
                    }}
                  >
                    Send Email
                  </a>
                </button>
              </div>
              <div className="card">
                {/* <img src={mapPinIcon} alt="callimg" />
                 */}
                <CiLocationOn size={75} />

                <div className="text_content">
                  <h2>Our address</h2>
                  <p>
                    The Capital Hub <br />
                    7th block, Jayanagar,
                    <br /> Bengaluru - 560070
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPopUp;
