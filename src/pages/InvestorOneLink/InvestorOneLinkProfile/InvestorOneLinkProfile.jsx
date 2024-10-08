import React, { useEffect } from "react";
import "./InvestorOneLinkProfile.scss";
import { useOutletContext } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTheme,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
import Investment from "./Investment";
import FeaturedPostsContainer from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/FeaturedPostsContainer";

export default function InvestorOneLinkProfile() {
  const theme = useSelector(selectTheme);
  const { investor, company } = useOutletContext();
  const socialLinks = {
    website: "Website",
    facebook: "Facebook",
    twitter: "Twitter",
    linkedin: "Linkedin",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Investor Profile | The Capital Hub";
    dispatch(setPageTitle("Investor Profile"));
  }, [dispatch]);
  return (
    <div
      className="investor_one_link_profile_page d-flex flex-column"
      style={{ paddingBottom: "2rem" }}
    >
      <h1 className="mb-3 px-3 px-xxl-0 fw-bold page_heading">
        Profile
      </h1>
      <div className="main_inner-section d-flex flex-column gap-3 p-3 border">
        <div className="user_data_section d-flex flex-row gap-3 py-3">
          <img
            src={investor?.profilePicture}
            alt="user_img"
            className="rounded-pill"
            style={{ width: "120px", height: "120px",borderRadius:"60px" }}
          />
          <div className="user_data ">
            <h1>
              {investor?.firstName} {investor?.lastName}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <span style={{ fontWeight: 200, color: "#c5c5c6" }}>
                Company :{" "}
              </span>{" "}
              <p style={{ marginTop: "5px" }}> {company?.companyName}</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <span style={{ fontWeight: 200, color: "#c5c5c6" }}>
                Designation :{" "}
              </span>{" "}
              <p style={{ marginTop: "5px" }}>{investor?.designation}</p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              <span style={{ fontWeight: 200, color: "#c5c5c6" }}>
                Location :{" "}
              </span>
              <p style={{ marginTop: "5px" }}>{investor?.location}</p>
            </div>
          </div>
        </div>
        {/*<div className="bio_section shadow-sm">
          <h1 className="px-2 rounded-pill">Bio</h1>
          <div className="experience_data d-flex flex-column flex-md-row gap-2 gap-md-4 p-3">
            <p>{investor?.bio}</p>
          </div>
        </div>
        <div className="experience_section ">
          <h1 className="px-2 rounded-pill">Current Experience</h1>
          <div className="experience_data d-flex flex-column flex-md-row gap-2 gap-md-4 p-3">
            <p>{investor?.experience}</p>
          </div>
        </div>
        <div className="social_media_section d-flex flex-column gap-1 py-2">
          <p>Social Links</p>
          <div className="link_icons d-flex flex-row flex-md-row gap-2">
            <PublicLinks socialLinks={socialLinks} />
          </div>
        </div>*/}
      </div>
      <div
        className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
        style={{ marginTop: "1rem" }}
      >
        <div className="user_data_section d-flex flex-row gap-3 py-3">
          <Investment canEdit={false}/>
        </div>
      </div>
      <div
        className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
        style={{ marginTop: "1rem" }}
      >
        <div className="user_data_section gap-3">
          <h3 className="px-2 rounded-pill">Bio</h3>
          <div className="bio_section">
            <div
              className="experience_data d-flex flex-column flex-md-row gap-2 gap-md-4"
              style={{ padding: "0 0.5rem" }}
            >
              <p>{investor?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
        style={{ marginTop: "1rem" }}
      >
        <div className="user_data_section gap-3">
          <h3 className="px-2 rounded-pill">Public Links</h3>
        </div>
        <div style={{ display: "flex" }}>
          {company?.socialLinks && Object.keys(company?.socialLinks).map((key) => {
            const IconComponent = socialLinks[key];
            const url = company?.socialLinks[key];

            // Only render if the URL is not empty
            if (url) {
              return (
                <div key={key} className="social-link">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={key}
                    style={{
                      textDecoration: "none",
                      border:
                        theme === "dark" ? "1px solid #fff" : "1px solid #000",
                      padding: "5px 10px",
                      borderRadius: "25px",
                      marginRight: "0.5rem",
                      fontSize: "16px",
                      color: theme === "dark" ? "#fff" : "#000",
                    }}
                  >
                    {IconComponent}
                  </a>
                </div>
              );
            }

            return null; // Skip rendering if the URL is empty
          })}
        </div>
      </div>
      <div
        className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
        style={{ marginTop: "1rem" }}
      >
        <div className="user_data_section gap-3">
          <h3 className="px-2 rounded-pill">
            Key Focus Area Sector Interested
          </h3>
          <div
            className="experience_data d-flex flex-md-row gap-2 gap-md-4"
            style={{
              padding: "0 0.5rem",
              borderTop: "1px solid grey",
              paddingTop: "10px",
            }}
          >
            {investor?.sectorPreferences.map((item) => (
              <div
                style={{
                  background: theme === "dark" ? "#22262c" : "#f5f5f5",
                  padding: "10px",
                  borderRadius: "0.37rem",
                  width: "15rem",
                }}
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex",flexWrap:"wrap", justifyContent: "space-between", marginTop: "1rem", }}>
        <div
          className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
          style={{ maxWidth: "39rem", width: "100%" }}
        >
          <div className="user_data_section gap-3">
            <h3 className="px-2 rounded-pill">Recent Experience</h3>
            <div>
            {company?.pastInvestments.map((item,index)=>(
              <div key={index} style={{borderLeft:"2px solid grey",padding:"10px",display:"flex",alignItems:"center"}}>

              <img src={item.logo} alt={item.name} style={{borderRadius:"50%"}}/>
              <div style={{paddingLeft:"1rem"}}>
              <h6 style={{color:theme === "dark"?"#fff":"#000",fontSize:"16px"}}>{item.name}</h6>
              </div>
              </div>
            ))}</div>
          </div>
        </div>
        <div
          className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
          style={{ maxWidth: "39rem", width: "100%" }}
        >
          <div className="user_data_section gap-3">
            <h3 className="px-2 rounded-pill">Education</h3>
          </div>
        </div>
      </div>
      <div
        className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
        style={{ marginTop: "1rem" }}
      >
        <div className="user_data_section gap-3">
          <h3 className="px-2 rounded-pill">Feature Articles</h3>
          <FeaturedPostsContainer userId={investor._id} postDelete={false} />
        </div>
      </div>
    </div>
  );
}
