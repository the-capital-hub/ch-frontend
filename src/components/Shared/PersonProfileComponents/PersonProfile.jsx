import React from "react";
import PersonInfo from "./PersonHeader/PersonInfo";
import PersonActions from "./PersonHeader/PersonActions";
import PersonAbout from "./PersonAbout/PersonAbout";
// import PublicLinks from "../../NewInvestor/CompanyProfileComponents/company-section-two/public-links/PublicLinks";
import CompanyStats from "../../NewInvestor/CompanyProfileComponents/company-section-one/company-stats/CompanyStats";
import "./PersonProfile.scss";
import { useSelector } from "react-redux";
import CompanyDetailsCard from "../../Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";

const PERSON = {
  profilePicture: "",
  firstName: "FirstName",
  lastName: "LastName",
  designation: "Founder",
  email: "example@xyz.com",
  mobileNumber: "+91 9876543210",
  companyName: "Company Name",
  location: " ",
  foundedYear: " ",
  lastFunding: " ",
  about:
    "Man's all about building great start-ups from a simple idea to an elegant reality. Humbled and honored to have worked with Angels and VC's across the globe to support and grow the startup culture.With the vision of make in India for the world, they design and build augmented reality glasses for Defence, Enterprise, and Training sectors. In addition to hardware, they also provide their clients with end-to-end AR/VR/MR solutions that are tailored to their business needs.",
};

export default function PersonProfile({ theme, short, personData }) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  let profilePicture;
  let firstName;
  let lastName;
  let designation;
  let email;
  let phoneNumber;
  let bio;
  let isInvestor;
  let location;
  let lastFunding;
  let startedAtDate;
  let companyName;
  let socialLinks;
  let colorCard;
  let investor;
  let startUp;
  let experience;
  let education;
  let industry;
  let isSubscribed;

  if (personData?.startUp) {
    profilePicture = personData?.profilePicture;
    firstName = personData?.firstName;
    lastName = personData?.lastName;
    isSubscribed = personData?.isSubscribed;
    designation = personData?.designation;
    email = personData?.email;
    phoneNumber = personData?.phoneNumber;
    bio = personData?.bio;
    isInvestor = personData?.isInvestor === "true" ? true : false;
    companyName = personData?.startUp.company;
    location = personData?.startUp.location;
    lastFunding = personData?.startUp.lastFunding;
    startedAtDate = personData?.startUp.startedAtDate;
    socialLinks = personData?.startUp.socialLinks;
    colorCard = personData?.startUp.colorCard;
    startUp = personData?.startUp;
    experience = personData?.experience;
    education = personData?.education;
    industry = personData?.industry|| "Nun"
  } else {
    profilePicture = personData?.profilePicture;
    firstName = personData?.firstName;
    lastName = personData?.lastName;
    isSubscribed = personData?.isSubscribed;
    designation = personData?.designation;
    email = personData?.email;
    phoneNumber = personData?.phoneNumber;
    bio = personData?.bio;
    isInvestor = personData?.isInvestor === "true" ? true : false;
    companyName = personData?.investor?.companyName;
    location = personData?.investor?.location;
    lastFunding = personData?.investor?.lastFunding;
    startedAtDate = personData?.investor?.startedAtDate;
    socialLinks = personData?.investor?.socialLinks;
    colorCard = personData?.investor?.colorCard;
    investor = personData?.investor;
    experience = personData?.experience;
    education = personData?.education;
    industry = personData?.industry|| "Nun"
  }

  return (
    <div className={`person_profile_wrapper  shadow-sm ${theme}`}>
      <div className="person__section__one border-bottom d-flex flex-column gap-4 py-5 px-3 px-lg-5 ">
        {/* Profile header */}
        <div className="person__info d-flex flex-column flex-xl-row gap-4 justify-content-between position-relative">
        <PersonInfo
            fullName={`${firstName} ${lastName}`}
            designation={designation}
            
            profilePicture={profilePicture}
            companyName={companyName || PERSON.companyName}
            location={location}
            foundedYear={
              new Date(startedAtDate).getFullYear() || PERSON.foundedYear
            }
            lastFunding={lastFunding || PERSON.lastFunding}
            industry = {industry|| "Nun"}
            isSubscribed={isSubscribed}
          />
          <PersonActions
            person={`${isInvestor ? "Investor" : "Founder"}`}
            userId={personData?._id}
            name={
              personData.firstName?.toLowerCase() +
              "-" +
              personData.lastName?.toLowerCase()
            }
            oneLinkId={personData?.oneLinkId}
            isInvestor={loggedInUser?.isInvestor === "true"}
          />
        </div>

        {/* Profile About */}
        <PersonAbout
          bio={bio}
          firstName={firstName}
          lastName={lastName}
          email={email}
          mobileNumber={phoneNumber}
          investor={investor}
          startUp={startUp}
          designation={designation}
          experience={experience}
          education={education}
        />
      </div>
      <div className="" style={{ padding: "0 1rem" }}>
        <CompanyDetailsCard className="" userDetails={personData} page={""} theme="startup"/>
      </div>
      <div className="person__section__two d-flex flex-column gap-4 pt-3 pb-5 px-3 px-lg-5">
         {/* <PublicLinks socialLinks={socialLinks} />*/}
        {/* Have to make this component reusable. Right now color card title is hard coded */}
        {!short && <CompanyStats colorCard={colorCard} />}
      </div>
    </div>
  );
}
