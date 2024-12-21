import React from "react";
import InvestorInfo from "./InvestorHeader/InvestorInfo";
import InvestorActions from "./InvestorHeader/InvestorAction";
import InvestorAbout from "./InvestorAbout/InvestorAbout";
// import PublicLinks from "../../NewInvestor/CompanyProfileComponents/company-section-two/public-links/PublicLinks";
// import CompanyStats from "../../NewInvestor/CompanyProfileComponents/company-section-one/company-stats/CompanyStats";
import "./InvestorProfile.scss";
import { useSelector } from "react-redux";
// import CompanyDetailsCard from "../../Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";

export default function InvestorProfile({ theme, short, personData }) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  let profilePicture = personData?.profilePicture;
  let fullName = `${personData?.firstName} ${personData?.lastName}`;
  let designation = personData?.designation;
  let email = personData?.email;
  let phoneNumber = personData?.phoneNumber;
  let bio = personData?.bio;
  let isInvestor = personData?.isInvestor === "true" ? true : false;
  let companyName = personData?.investor?.companyName;
  let location = personData?.investor?.location;
  let lastFunding = personData?.investor?.lastFunding;
  let startedAtDate = personData?.investor?.startedAtDate;
  let socialLinks = personData?.investor?.socialLinks;
  let linkedIn = personData?.linkedin
  //let colorCard = personData?.investor?.colorCard;
  let investor = personData?.investor;
  let experience = personData?.experience;
  let education = personData?.education;
  let industry = personData?.industry || "N/A";
  

  return (
    <div className={`person_profile_wrapper shadow-sm ${theme}`}>
      <div className="person__section__one d-flex flex-column gap-1 py-3 px-3 px-lg-3">
        <div className="person__info d-flex flex-column flex-xl-row gap-1 justify-content-between position-relative">
          <InvestorInfo
            fullName={fullName}
            designation={designation}
            profilePicture={profilePicture}
            companyName={companyName}
            location={location}
            foundedYear={new Date(startedAtDate).getFullYear()}
            lastFunding={lastFunding}
            industry={industry}
            userId={personData?._id}
            name={`${personData?.firstName?.toLowerCase()}-${personData?.lastName?.toLowerCase()}`}
            oneLinkId={personData?.oneLinkId}
            isInvestor={loggedInUser?.isInvestor === "true"}
          />
          <InvestorActions
            person={isInvestor ? "Investor" : "Founder"}
            userId={personData?._id}
            name={`${personData?.firstName?.toLowerCase()}-${personData?.lastName?.toLowerCase()}`}
            oneLinkId={personData?.oneLinkId}
            isInvestor={loggedInUser?.isInvestor === "true"}
          />
        </div>
        <hr />
        <InvestorAbout
          bio={bio}
          firstName={personData?.firstName}
          lastName={personData?.lastName}
          email={email}
          mobileNumber={phoneNumber}
          investor={investor}
          startUp={personData?.startUp}
          designation={designation}
          experience={experience}
          education={education}
          linkedIn={linkedIn}
        />
      </div>
      {/* <div style={{ padding: "0 1rem" }}>
        <CompanyDetailsCard userDetails={personData} page="" theme="startup" />
      </div> */}
      {/* <div className="person__section__two d-flex flex-column gap-4 pt-3 pb-5 px-3 px-lg-5">
        {!short && <CompanyStats colorCard={colorCard} />}
        <PublicLinks socialLinks={socialLinks} />
      </div> */}
    </div>
  );
}
