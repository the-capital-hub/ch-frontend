import React, { useState, useEffect } from "react";
import "./EditInvestorCompanyProfilePage.scss";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
// import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
// import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import CompanyProfileForm from "../../../components/Investor/CompanyProfilePageComponents/CompanyProfileForm";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useLocation } from "react-router-dom";
// import { CiEdit, CiSaveUp2 } from "react-icons/ci";
// import RaghuImage from "../../../Images/aboutUs/Raghu.jpeg";
import CoinIcon from "../../../Images/investorView/Rectangle.png";
import ColorCard from "../../../components/Investor/InvestorGlobalCards/ColoredCards/ColorCard";
import { getInvestorById, postInvestorData } from "../../../Service/user";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import Milestones from "../../../components/Investor/CompanyProfilePageComponents/Milestones/Milestones";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import CoreTeam from "../../../components/Investor/CompanyProfilePageComponents/CoreTeam/CoreTeam";
import { useNavigate } from "react-router-dom";
import backIcon from "../../../Images/Chat/BackIcon.svg";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import CompanyDescription from "../../../components/Investor/CompanyProfilePageComponents/CompanyDescription/CompanyDescription";
import ErrorPopUp from "../../../components/PopUp/ErrorPopUp/ErrorPopUp";
import InvestorAfterSuccessPopUp from "../../../components/PopUp/InvestorAfterSuccessPopUp/InvestorAfterSuccessPopUp";
import {
  selectLoggedInUserId,
  selectUserCompanyData,
  selectUserInvestor,
  setUserCompany,
} from "../../../Store/features/user/userSlice";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";
import InvestorPublicLinks from "../../../components/Investor/CompanyProfilePageComponents/PublicLinks/InvestorPublicLinks";

export default function EditInvestorCompanyProfilePage() {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const userInvestor = useSelector(selectUserInvestor);
  const userCompanyData = useSelector(selectUserCompanyData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [publicLinks, setPublicLinks] = useState({
    website:"",
    linkedin: "",
    twitter:"",
    instagram:"",
  });
  const [colorCardData, setColorCardData] = useState(null);

  const [field, setField] = useState("last_round_investment");
  const [companyData, setCompanyData] = useState([]);
  const [isBioEditable, setIsBioEditable] = useState(false);
  const [companyDescription, setCompanyDescription] = useState(null);

  // States for popup
  const [showPopup, setShowPopup] = useState({ success: false, error: false });
  const [loading, setLoading] = useState(false);
  const [isSaveAll, setIsSaveAll] = useState(false);

  const handlePublicLinksUpdate = (newLinks) => {
    setPublicLinks(newLinks);
  };

  // Set page title
  useEffect(() => {
    document.title = "Edit Company Profile | Investors - The Capital Hub";
    dispatch(setPageTitle("Edit Company"));
  }, [dispatch]);

  useEffect(() => {
    if (!userCompanyData) {
      getInvestorById(userInvestor)
        .then(({ data }) => {
          setCompanyData(data);
          setPublicLinks(data.socialLinks);
          setCompanyDescription(data.description);
          setColorCardData({
            averageInvestment: data.colorCard?.averageInvestment,
            total_investment: data.colorCard?.total_investment,
            no_of_investments: data.colorCard?.no_of_investments,
            minimumTicketsSize: data.colorCard?.minimumTicketsSize,
            maximumTicketsSize: data.colorCard?.maximumTicketsSize,
            seedRound: data.colorCard?.seedRound,
          });
        })
        .catch((error) => {
          console.log();
        });
    } else {
      setPublicLinks(userCompanyData.socialLinks);
      setCompanyData(userCompanyData);
      setCompanyDescription(userCompanyData.description);
      setColorCardData({
        averageInvestment: userCompanyData.colorCard?.averageInvestment,
        total_investment: userCompanyData.colorCard?.total_investment,
        no_of_investments: userCompanyData.colorCard?.no_of_investments,
        minimumTicketsSize: userCompanyData.colorCard?.minimumTicketsSize,
        maximumTicketsSize: userCompanyData.colorCard?.maximumTicketsSize,
        seedRound: userCompanyData.colorCard?.seedRound,
      });
    }
  }, [isSaveAll, userInvestor, userCompanyData]);

  // handleAmountChange
  const handleAmountChange = (currentfield, updatedAmount) => {
    setField(currentfield);
    setColorCardData((prevData) => ({
      ...prevData,
      [currentfield]: updatedAmount,
    }));
  };

  // Handle Description Change
  const handleDescriptionChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 3 + "px";

    setCompanyDescription(e.target.value);
  };

  // Handle Description submit
  const submitBioHandler = async (e) => {
    e.preventDefault();
    // Set Loading
    setLoading(true);
    const companyData = {
      description: companyDescription,
      founderId: loggedInUserId,
    };

    try {
      const response = await postInvestorData(companyData);
      if (response.status === 200) {
        setIsBioEditable(false);
        setLoading(false);
        handleShowPopup({ success: true });
        setCompanyData((prev) => ({
          ...prev,
          description: companyDescription,
        }));
        dispatch(setUserCompany(response.data));
      }
    } catch (error) {
      console.log();
      setLoading(false);
      handleShowPopup({ error: true });
    }
  };

  const handleSaveAll = (e) => {
    setLoading(true);
    submitBioHandler(e);
    setIsSaveAll(true);
    setTimeout(() => {
      setIsSaveAll(false);
      setLoading(false);
    }, 1000);
  };

  // handle show popup
  const handleShowPopup = (popupType) => {
    setShowPopup((prev) => ({ ...prev, ...popupType }));
    setTimeout(() => {
      handlePopupClose();
    }, 2000);
  };

  // handle popup close
  const handlePopupClose = () => {
    setShowPopup({ success: false, error: false });
  };

  return (
    <MaxWidthWrapper>
      <div className="editinvestorCompanyProfilePage__wrapper pb-5">
        {/* Main content */}
        <div className="main__content">
          <span className="back_img rounded-circle shadow-sm" title="Go Back">
            <img
              src={backIcon}
              width={20}
              height={20}
              onClick={() => navigate(-1)}
              alt=""
            />
          </span>
          {/* <SmallProfileCard text={"Company Profile"} /> */}
          {/* Company profile form */}

          {/* Onboarding popup */}
          <TutorialTrigger
            steps={investorOnboardingSteps.companyProfileEditPage}
            className={""}
          />

          <div
            className="CompanyProfileForm rounded-4 p-5 border"
            id="profileFormContainer"
          >
            <CompanyProfileForm
              companyData={companyData}
              investor={true}
              handleShowPopup={handleShowPopup}
              isSaveAll={isSaveAll}
            />
          </div>
          <div
            className="CompanyProfileForm rounded-4 p-5 border"
            id="profileFormContainer"
          >
            <InvestorPublicLinks publicLinks={publicLinks} 
            setPublicLinks={handlePublicLinksUpdate} 
            loading={loading} 
            investor={true}/>
          </div>

          {/* Company Description */}
          <CompanyDescription
            companyData={companyData}
            companyDescription={companyDescription}
            setCompanyDescription={setCompanyDescription}
            isBioEditable={isBioEditable}
            setIsBioEditable={setIsBioEditable}
            submitBioHandler={submitBioHandler}
            handleDescriptionChange={handleDescriptionChange}
            loading={loading}
          />

          {/* Core Team */}
          <div className="core__team  rounded-4 p-5 d-flex flex-column gap-4 border">
            <CoreTeam
              companyData={companyData}
              setCompanyData={setCompanyData}
              theme="investor"
            />
          </div>

          {/* Milestones */}
          {/*<div className="milestones__component  rounded-4 p-5 d-flex flex-column gap-4 border">
            <Milestones theme={"investor"} />
          </div>*/}

          {/* Color Cards */}
          {/*<div className="card_holder d-flex justify-content-between flex-wrap">
            <ColorCard
              color="white"
              background="#BB98FF"
              text="Total Investment"
              image={CoinIcon}
              amount={colorCardData?.total_investment || "0"}
              onAmountChange={(amount) =>
                handleAmountChange("total_investment", amount)
              }
              field={"total_investment"}
              colorCardData={colorCardData}
              isInvestor={true}
            />
            <ColorCard
              color="white"
              background="#DAC191"
              text="Average Investment"
              image={CoinIcon}
              amount={colorCardData?.averageInvestment || "0"}
              onAmountChange={(amount) =>
                handleAmountChange("averageInvestment", amount)
              }
              field={"averageInvestment"}
              colorCardData={colorCardData}
              isInvestor={true}
            />
            <ColorCard
              color="white"
              background="#DCDCDC"
              text="No.of Investment"
              image={CoinIcon}
              amount={colorCardData?.no_of_investments || "0"}
              onAmountChange={(amount) =>
                handleAmountChange("no_of_investments", amount)
              }
              field={"no_of_investments"}
              colorCardData={colorCardData}
              isInvestor={true}
              noRupee={true}
            />
            <ColorCard
              color="white"
              background="#2B2B2B"
              text="Minimum Tickets Size"
              image={CoinIcon}
              amount={colorCardData?.minimumTicketsSize || "0"}
              onAmountChange={(amount) =>
                handleAmountChange("minimumTicketsSize", amount)
              }
              field={"minimumTicketsSize"}
              colorCardData={colorCardData}
              isInvestor={true}
              noRupee={true}
            />
            <ColorCard
              color="white"
              background="#FF7373"
              text="Maximum Tickets Size"
              image={CoinIcon}
              amount={colorCardData?.maximumTicketsSize || "0"}
              onAmountChange={(amount) =>
                handleAmountChange("maximumTicketsSize", amount)
              }
              field={"maximumTicketsSize"}
              colorCardData={colorCardData}
              isInvestor={true}
              noRupee={true}
            />
            <ColorCard
              color="white"
              background="#9198DA"
              text="Seed Round"
              image={CoinIcon}
              amount={colorCardData?.seedRound || "0"}
              onAmountChange={(amount) =>
                handleAmountChange("seedRound", amount)
              }
              field={"seedRound"}
              colorCardData={colorCardData}
              isInvestor={true}
              noRupee={true}
            />
          </div>*/}
          <button
            className={`align-self-end btn-base investor`}
            onClick={handleSaveAll}
          >
            {loading ? (
              <SpinnerBS
                colorClass={"text-dark"}
                spinnerSizeClass="spinner-border-sm"
              />
            ) : (
              "Save all"
            )}
          </button>
        </div>
        {/* Right side content */}
        <div className="right__content">
          <RecommendationCard isInvestor={true} />
        </div>

        {/* Popups */}
        {showPopup.success && (
          <InvestorAfterSuccessPopUp
            successText={"Changes Saved"}
            onClose={handlePopupClose}
          />
        )}
        {showPopup.error && (
          <ErrorPopUp
            message={"Error While Saving! Please try again"}
            onClose={handlePopupClose}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
}
