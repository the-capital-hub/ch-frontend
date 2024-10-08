import React, { useState } from "react";
import CompanyInfo from "./company-section-one/company-info/CompanyInfo";
// import HCLImage from "../../../Images/Investor/CompanyProfile/HCL.png";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
import CompanyActions from "./company-section-one/company-actions/CompanyActions";
import CompanyStats from "./company-section-one/company-stats/CompanyStats";
import PublicLinks from "./company-section-two/public-links/PublicLinks";
// import Feedback from "./company-section-two/feedback/Feedback";
import FoundingTeam from "./company-section-two/founding-team/FoundingTeam";
import KeyFocus from "./company-section-two/key-focus/KeyFocus";
import CoinIcon from "../../../Images/investorView/Rectangle.png";
import CompanyAbout from "./company-section-one/company-about/CompanyAbout";
import "./CompanyProfile.scss";
import SelectCommitmentModal from "../MyStartupsComponents/SelectCommitmentModal/SelectCommitmentModal";
import {
  useLocation,
  //  useNavigate
} from "react-router-dom";
import CardComponent from "../../../pages/InvestorView/Company/CardComponent/CardComponent";
import {
  About1,
  About2,
  About3,
  Revenue1,
  Revenue2,
} from "../../../Images/Investor/CompanyProfile";
import { deleteStartUp } from "../../../Service/user";
// import { selectIsInvestor } from "../../../Store/features/user/userSlice";
import { useSelector } from "react-redux";
import Modal from 'react-modal';
import PasswordModal from "../MyStartupsComponents/DeleteModal";
import { postUserLogin } from "../../../Service/user";
import API from "../../../api";

export default function CompanyProfile({
  isOnelink,
  companyData,
  investorData,
  startup = "false",
  short,
  isStartup = "true",
  pageName,
  show,
  theme,
  setCompanyData,
  companyDelete
}) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  // Fetch Company Data here
  let name = "NA";
  let logo = DefaultAvatar;
  let location = "NA";
  let description = "No description";
  let socialLinks = {
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
  };
  let colorCard = "";
  let foundedIn = "NA";
  let vision = "";
  let mission = "";
  let noOfEmployees = "";
  let team = [];
  let tags = [];
  let tagline = "";
  let tam = "";
  let sam = "";
  let som = "";
  let founderId = "";
  let industry = "";
  let lastFunding = "";
  let stage = "";
  let sector = "";

  // Interests Data
  let interestData = {
    logo: "",
    name: "",
    ask: "",
    commitment: "",
    investedEquity: "",
    companyId: "",
    companyOnelink: "",
  };

  if (companyData) {
    name = companyData.company || name;
    logo = companyData.logo || logo;
    location = companyData.location || location;
    description = companyData.description || description;
    socialLinks = companyData.socialLinks || socialLinks;
    colorCard = companyData.colorCard || colorCard;
    foundedIn = companyData.startedAtDate || foundedIn;
    vision = companyData.vision || vision;
    mission = companyData.mission || mission;
    noOfEmployees = companyData.noOfEmployees || noOfEmployees;
    team = companyData.team || team;
    tags = companyData.keyFocus?.split(",").map((tag) => tag.trim()) || tags;
    tagline = companyData.tagline || tagline;
    tam = companyData.TAM || "";
    sam = companyData.SAM || "";
    som = companyData.SOM || "";
    founderId = companyData.founderId || "";
    lastFunding = companyData?.lastFunding || "";
    stage = companyData?.stage || "";
    sector = companyData?.sector || "";
    industry = companyData?.industryType || "";

    interestData = {
      logo: companyData?.logo,
      name: companyData?.company,
      ask: companyData?.colorCard?.fund_ask,
      commitment: "",
      investedEquity: "",
      companyId: companyData?._id,
      companyOnelink: companyData?.oneLink,
    };
  }
  if (investorData) {
    name = investorData.companyName || name;
    logo = investorData.logo || logo;
    location = investorData.location || location;
    description = investorData.description || description;
    socialLinks = investorData.socialLinks || socialLinks;
    colorCard = investorData.colorCard || colorCard;
    foundedIn = investorData.startedAtDate || foundedIn;
    vision = investorData.vision || vision;
    mission = investorData.mission || mission;
    noOfEmployees = investorData.noOfEmployees || noOfEmployees;
    team = investorData.team || team;
    tags = investorData.keyFocus?.split(",").map((tag) => tag.trim()) || tags;
    tagline = investorData.tagline || tagline;
    founderId = investorData?.founderId || "";
    industry = investorData?.industry || "";
    lastFunding = investorData?.lastFunding || "";
    stage = investorData?.stage || "";
    sector = companyData?.sector || "";
  }
  

  const deleteCompany = async () => {
    try {
      const response = await deleteStartUp(companyData._id);
      console.log(response);
      if (response.delete_status) {
        setCompanyData({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCompany = () => {
    setIsModalOpen(true); 
  };

  const handleConfirmPassword = async (enteredPassword) => {
    
    try{
      setPassword(enteredPassword);  
      const response = await fetch(API.loginUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: loggedInUser.email, password: enteredPassword }),
      });

      if(response.ok){
            deleteCompany(); 
            setIsModalOpen(false); // Close the modal
      }
      else{
        alert("Incorrect Password, Try again")
      }
    }
    catch(err){
      console.log(err)
    }
    
  };

  return (
    <>
      <div className="company__profile  shadow-sm" startup={startup}>
        <div className="company__section__one border-bottom d-flex flex-column gap-4 p-3 p-md-5">
          {/* <h5 className="ms-auto m-0 p-0 " onClick={() => navigate(isInvestor === "true" ? "/investor/home" : "/home")
          }
          >x</h5> */}
          <div className="company__info d-flex flex-column flex-xxl-row gap-4 justify-content-between position-relative">
            <CompanyInfo
              name={name}
              logo={logo}
              tagline={tagline}
              location={location}
              foundedYear={new Date(foundedIn).getFullYear()}
              industry={industry}
              lastFunding={lastFunding}
              stage={stage}
              sector={sector}
              deleteCompany={handleDeleteCompany} 
              companyDelete={companyDelete} 
              userId={loggedInUser?._id || null}
              founderId={founderId}
            />
            <CompanyActions
              isOnelink={isOnelink}
              founderId={founderId}
              companyId={interestData?.companyId}
            />
          </div>
          <CompanyAbout
            about={description}
            vision={!short && vision}
            mission={!short && mission}
            noOfEmployees={noOfEmployees}
          />

          {theme !== "investor" && (
            <CompanyStats
              colorCard={colorCard}
              startup={isStartup}
              sam={sam}
              tam={tam}
              som={som}
              show={show}
            />
          )}
        </div>
        {pageName && (
          <div
            className="company__section__one border-bottom d-flex flex-column gap-4"
            style={{ padding: "1rem 3rem" }}
          >
            <PublicLinks socialLinks={socialLinks} />
            <KeyFocus tags={tags} />
          </div>
        )}
        {!pageName ? (
          <div className="company__section__two d-flex flex-column gap-4 pt-3 pb-5 px-3 px-md-5">
            {!pageName && <PublicLinks socialLinks={socialLinks} />}
            
            {!short && <FoundingTeam isOnelink={isOnelink} team={team} />}
            {!short && <KeyFocus tags={tags} />}
          </div>
        ) : (
          <div
            className="company__section__two d-flex flex-column gap-4 pt-3 pb-3 px-3 px-md-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {open !== companyData._id && (
              <button
                className={`btn-capital-small p-2 p-md-3`}
                onClick={() => {
                  if (open === companyData._id) {
                    setOpen("");
                  } else setOpen(companyData._id);
                }}
              >
                <span className="d-none d-md-block">Know more</span>
              </button>
            )} */}
          </div>
        )}
        {/* {theme !== "investor" && pageName && open === companyData._id && (
          <div className="company__section__two d-flex flex-column gap-4 pt-3 pb-5 px-3 px-md-5">
            <FoundingTeam isOnelink={isOnelink} team={team} />
            <h6 className="div__heading">{`Previous funding`}</h6>
            <div className="stat__row d-flex flex-wrap gap-4 gap-lg-5">
              <div
                className="p-2 rounded-3 text-white d-flex flex-row justify-content-between stat__badge"
                style={{ backgroundColor: "rgba(187, 152, 255, 1)" }}
              >
                <div className="d-flex flex-column gap-2 justify-content-center ps-2">
                  <p className="small">
                    {startup === "true" ? "Valuation" : "Average Investment"}
                  </p>
                  <p className="fw-semibold">
                    {" "}
                    {startup === "true"
                      ? colorCard?.last_round_investment
                      : colorCard?.averageInvestment || ""}
                  </p>
                </div>
                <img src={About1} alt="statistics" style={{ width: "80px" }} />
              </div>

              <div
                className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
                style={{ backgroundColor: "rgba(218, 193, 145, 1)" }}
              >
                <div className="d-flex flex-column gap-2 justify-content-center ps-2">
                  <p className="small">Total Investment</p>
                  <p className="fw-semibold">
                    {" "}
                    {colorCard?.total_investment || ""}
                  </p>
                </div>
                <img src={About2} alt="statistics" style={{ width: "80px" }} />
              </div>

              <div
                className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
                style={{ backgroundColor: "rgba(170, 173, 185, 1)" }}
              >
                <div className="d-flex flex-column gap-2 justify-content-center ps-2">
                  <p className="small">
                    {startup === "true"
                      ? "No. of Investors"
                      : "No. of Investments"}
                  </p>
                  <p className="fw-semibold">
                    {startup === "true"
                      ? colorCard?.no_of_investers
                      : ` ${colorCard?.no_of_investments}` || ""}
                  </p>
                </div>
                <img src={About3} alt="statistics" style={{ width: "80px" }} />
              </div>
            </div>
            <div className="row revenue_section">
              <h6 className="div__heading">{`Revenue Statistics`}</h6>
              <div
                className="stat__row d-flex flex-wrap gap-4 gap-lg-5"
                style={{ paddingTop: "1rem" }}
              >
                <div
                  className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
                  style={{ backgroundColor: "rgba(43, 43, 43, 1)" }}
                >
                  <div className="d-flex flex-column gap-2 justify-content-center ps-2">
                    
                    <p className="small">
                      {startup === "true"
                        ? "Last year revenue(FY 23)"
                        : "Maximum Tickets Size"}
                    </p>
                    <p className="fw-semibold">
                      {startup === "true"
                        ? colorCard?.valuation
                        : colorCard?.maximumTicketsSize || ""}
                    </p>
                  </div>
                  <img
                    src={Revenue1}
                    alt="statistics"
                    style={{ width: "80px" }}
                  />
                </div>

               

                <div
                  className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
                  style={{ backgroundColor: "rgba(255, 115, 115, 1)" }}
                >
                  <div className="d-flex flex-column gap-2 justify-content-center ps-2">
                    <p className="small">
                      {startup === "true" ? "Target (FY 24)" : "Seed Round"}
                    </p>
                    <p className="fw-semibold">
                      {" "}
                      {startup === "true"
                        ? colorCard?.raised_funds
                        : colorCard?.seedRound || ""}
                    </p>
                  </div>
                  <img
                    src={Revenue2}
                    alt="statistics"
                    style={{ width: "80px" }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className={`btn-capital-small p-2 p-md-3`}
                onClick={() => {
                  if (open === companyData._id) {
                    setOpen("");
                  } else setOpen(companyData._id);
                }}
              >
                <span className="d-none d-md-block">See less</span>
              </button>
            </div>
          </div>
        )} */}
      </div>

      {/* Select Commitment Modal */}
      {!(pathname === "/investor/company-profile") && (
        <SelectCommitmentModal
          interestData={interestData}
          founderId={founderId}
        />
      )}

        <PasswordModal
        isOpen={isModalOpen} // Added PasswordModal component
        onClose={() => setIsModalOpen(false)} // Handler to close the modal
        onConfirm={handleConfirmPassword} // Handler to confirm password
      />
    </>
  );
}
