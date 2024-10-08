import React from "react";
import "./InvestorAbout.scss";
import ProfileSection from "../InvestorCards/ProfileSection";
import { selectTheme } from "../../../../Store/features/design/designSlice";
// import { FaGlobe } from "react-icons/fa";
// import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";

const profileData = {
  areas: [
    {
      name: "AI and ML",
      icon: "https://media.licdn.com/dms/image/C560BAQFHkV3vxfQA3A/company-logo_200_200/0/1668962953169?e=2147483647&v=beta&t=iGoIBf6vGNFVzkRDH8yk73eKf0IILkCiphOyXHCjzb8",
    },
    {
      name: "Adtech",
      icon: "https://media.licdn.com/dms/image/C560BAQFHkV3vxfQA3A/company-logo_200_200/0/1668962953169?e=2147483647&v=beta&t=iGoIBf6vGNFVzkRDH8yk73eKf0IILkCiphOyXHCjzb8",
    },
    // ... more areas
  ],
  companies: [
    {
      name: "BURNCAL",
      location: "Ahmedabad",
      logo: "https://media.licdn.com/dms/image/C560BAQFHkV3vxfQA3A/company-logo_200_200/0/1668962953169?e=2147483647&v=beta&t=iGoIBf6vGNFVzkRDH8yk73eKf0IILkCiphOyXHCjzb8",
    },
    {
      name: "COKWIK",
      location: "Delhi-NCR",
      logo: "https://media.licdn.com/dms/image/C560BAQFHkV3vxfQA3A/company-logo_200_200/0/1668962953169?e=2147483647&v=beta&t=iGoIBf6vGNFVzkRDH8yk73eKf0IILkCiphOyXHCjzb8",
    },
  ],
  partners: [
    {
      name: "Aman Gupta",
      photo:
        "https://media.licdn.com/dms/image/C560BAQFHkV3vxfQA3A/company-logo_200_200/0/1668962953169?e=2147483647&v=beta&t=iGoIBf6vGNFVzkRDH8yk73eKf0IILkCiphOyXHCjzb8",
    },
    {
      name: "Amit Lakhotia",
      photo:
        "https://media.licdn.com/dms/image/C560BAQFHkV3vxfQA3A/company-logo_200_200/0/1668962953169?e=2147483647&v=beta&t=iGoIBf6vGNFVzkRDH8yk73eKf0IILkCiphOyXHCjzb8",
    },
  ],
};

export default function InvestorAbout({
  bio,
  firstName,
  lastName,
  email,
  mobileNumber,
  startUp,
  investor,
  experience,
  education,
  designation,
  socialLinks,
  linkedIn,
}) {
  const theme = useSelector(selectTheme);
  return (
    <>
      <article
        className="person__about d-flex flex-column gap-4 flex-lg-row gap-lg-0 mt-2"
        style={{ color: "var(--d-l-grey)" }}
      >
        {/* <h6 className="div__heading">Bio:</h6> */}
        <p className="about__text">{bio}</p>
      </article>
      <article
        className="name_number d-flex flex-column gap-3 mt-2"
        style={{ color: "var(--d-l-grey)" }}
      >
        {/* <h6 className="div__heading">Personal Information:</h6>
        <div className="personal_info_grid">
          <div className="" style={{ display: "flex" }}>
            <p className="div__heading field-text" style={{ paddingRight: "10px" }}>Company Name:</p>
            <p className="about__text field-text">{startUp?.company || investor?.companyName || "No company"}</p>
          </div>
          <div className="" style={{ display: "flex" }}>
            <p className="div__heading field-text" style={{ paddingRight: "10px" }}>Education:</p>
            <p className="about__text field-text">{education}</p>
          </div>
          <div className="" style={{ display: "flex" }}>
            <p className="div__heading field-text" style={{ paddingRight: "10px" }}>Designation:</p>
            <p className="about__text field-text">{designation}</p>
          </div>
          <div className="" style={{ display: "flex" }}>
            <p className="div__heading field-text" style={{ paddingRight: "10px" }}>Experience:</p>
            <p className="about__text field-text">{experience}</p>
          </div>
        </div> */}
        <div class="profile-investments">
          {/* <h3>Prominent Investment Areas</h3> */}
          <div class="investment-areas">
            <div
              className="card-recent-investments"
              style={{ background: theme === "dark" ? "#292B33" : "#f5f5f5" }}
            >
              Recent Investment
              <div className="card-recent-value">50 Lakhs</div>
            </div>
            <div
              className="card-recent-investments"
              style={{ background: theme === "dark" ? "#292B33" : "#f5f5f5" }}
            >
              Average Recent Investments
              <div className="card-recent-value">5 Lakhs</div>
            </div>
            <div
              className="card-recent-investments"
              style={{ background: theme === "dark" ? "#292B33" : "#f5f5f5" }}
            >
              Avg Age of Startup
              <div className="card-recent-value">2-5</div>
            </div>
          </div>
        </div>

        <div className="social-links">
          <h5>Public Link</h5>
          <div className="social-buttons">
            {/*<div className="button-social">
                <a href="https://www.facebook.com" class="button facebook"> 
                <FaGlobe size={"20px"}/>
                  Website
                </a>
              </div>*/}

            <div className="button-social">
              <a href={linkedIn} class="button linkedin">
                <FaLinkedin size={"20px"} style={{ marginRight: "10px" }} />{" "}
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="social-links">
          <div className="button-social">
            <ProfileSection profile={investor} />
          </div>
        </div>
      </article>
    </>
  );
}
