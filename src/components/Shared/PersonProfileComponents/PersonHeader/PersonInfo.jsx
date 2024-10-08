import React from "react";
import {
  Location,
  Calendar,
  CircleArrow,
} from "../../../../Images/Investor/CompanyProfile";
import DefaultAvatar from "../../../../Images/Chat/default-user-avatar.webp";
import IconCard from "../../../NewInvestor/CompanyProfileComponents/shared-components/icon-card/IconCard";
import BatchImag from "../../../../Images/tick-mark.png"

export default function PersonInfo({
  fullName,
  designation,
  companyName,
  profilePicture,
  location,
  lastFunding,
  foundedYear,
  industry,
  isSubscribed
}) {
  return (
    <div className="person_info">
      <div
        className="person__profile__header d-flex flex-column flex-lg-row gap-3 "
        style={{ color: "var(--d-l-grey)" }}
      >
        <div className="person__profile__image">
          <img
            src={profilePicture || DefaultAvatar}
            alt={fullName}
            style={{ width: "110px", height: "110px", objectFit: "cover" }}
            loading="lazy"
            className="rounded-3"
          />
        </div>

        <div className="person__profile__details d-flex flex-column gap-4 justify-content-around">
          <div
            className="person__profile__headings"
            style={{ height: "100px" }}
          >
             <div style={{ height: "40px" }}>
              <h5 className="person__profile__name">{fullName} {isSubscribed && <img
                src={BatchImag}
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  objectFit: "contain",
                }}
                alt="Batch Icon"
              />}</h5>
              <p className="person__profile__type" style={{ marginBottom: 0 }}>
                {designation|| "NA"}
              </p>
 {/*             <p className="person__profile__type" style={{ marginBottom: 0 }}>
                {industry||"NA"}
              </p>*/}
              <p className="person__profile__type" style={{ marginBottom: 0 }}>
                {companyName||"NA"}
              </p>
            </div>
          </div>
          <div className="icon__details d-flex flex-column flex-md-row gap-4 align-items-start">
            <IconCard
              src={Location}
              alt={"location icon"}
              text={`${location || "India"}`}
              key="location"
            />
            <IconCard
              src={Calendar}
              alt={"calendar icon"}
              text={`Founded in, ${foundedYear || "2014"}`}
              key="founded"
            />
            <IconCard
              src={CircleArrow}
              alt={"rising arrow icon"}
              text={`Last Funding in ${lastFunding || "May, 2023"}`}
              key="funding"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
