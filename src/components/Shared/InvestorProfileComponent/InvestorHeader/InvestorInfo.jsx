import React from "react";
import {
  Location,
  Calendar,
  CircleArrow,
} from "../../../../Images/Investor/CompanyProfile";
import DefaultAvatar from "../../../../Images/Chat/default-user-avatar.webp";
import IconCard from "../../../NewInvestor/CompanyProfileComponents/shared-components/icon-card/IconCard";
import './InvestorInfo.scss';
import { Link } from "react-router-dom";



export default function InvestorInfo({
  fullName,
  designation,
  companyName,
  profilePicture,
  location,
  name,
  oneLinkId,
  isInvestor,
  lastFunding,
  foundedYear,
  industry,
}) {

  const linkTo = isInvestor
    ? `/investor/user/${name}/${oneLinkId}`
    : `/user/${name}/${oneLinkId}`;

  return (
    <div className="person_info">
      <div className="person__profile__header d-flex flex-lg-row gap-4" style={{ color: "var(--d-l-grey)" }}>
      <Link to={linkTo}>
        <div className="person__profile__image">
          <img
            src={profilePicture || DefaultAvatar}
            alt={fullName}
            // style={{ width: "110px", height: "110px", objectFit: "cover" }}
            loading="lazy"
            className="investor-profile-img"
          />
        </div>
        </Link>

        <div className="person__profile__details d-flex flex-column gap-4 justify-content-around">
          <div className="person__profile__headings" style={{ height: "70px" }}>
            <div style={{ height: "40px" }}>
              <Link to={linkTo}>
                <h5 className="person__profile__name">{fullName}</h5>
              </Link>
              {/* <p className="person__profile__type" style={{ marginBottom: 0 }}>{designation || "NA"}</p> */}
              <p className="person__profile__type" style={{ marginBottom: 0 }}>{location || "India"}</p>
              {/* <p className="person__profile__type" style={{ marginBottom: 0 }}>{industry || "NA"}</p> */}

              <p className="person__profile__type" style={{ marginBottom: 0 }}>{designation || "NA"} of {companyName || "NA"}</p>
            </div>
          </div>
          {/* <div className="icon__details d-flex flex-column flex-md-row gap-4 align-items-start">
            <IconCard src={Location} alt={"location icon"} text={`${location || "India"}`} key="location" />
            <IconCard src={Calendar} alt={"calendar icon"} text={`Founded in, ${foundedYear || "2014"}`} key="founded" />
            <IconCard src={CircleArrow} alt={"rising arrow icon"} text={`Last Funding in ${lastFunding || "May, 2023"}`} key="funding" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
