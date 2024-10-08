import React, { useEffect, useState } from "react";
import "./FundingInfo.scss";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import RightProfileCard from "../../../components/Investor/InvestorGlobalCards/RightProfileCard/RightProfileCard";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
// import { fundingQuestions } from "../../../constants/Startups/FundingInfo";
import { useDispatch, useSelector } from "react-redux";
// import FundingFormFields from "../../../components/Investor/FundingPageComponents/FundingFormFields/FundingFormFields";
import {
  selectFundingQuestions,
  // selectLoggedInUserId,
  // setUserCompany,
} from "../../../Store/features/user/userSlice";
// import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
// import { postStartUpData } from "../../../Service/user";
import { useNavigate } from "react-router-dom";
import IconChevronBack from "../../../components/Investor/SvgIcons/IconChevronBack";
import FundingForm from "../../../components/Investor/FundingPageComponents/FundingForm/FundingForm";
import FundingPreviousData from "../../../components/Investor/FundingPageComponents/FundingPreviousData/FundingPreviousData";
import { setPageTitle } from "../../../Store/features/design/designSlice";

export default function FundingInfo() {
  // const loggedInUserId = useSelector(selectLoggedInUserId);
  const fundingViaCapitalHubQuestions = useSelector(selectFundingQuestions);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccess, setShoeSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false);

  // Update document title
  useEffect(() => {
    document.title = "Funding | The Capital Hub";
    dispatch(setPageTitle("Funding"));
  }, [dispatch]);

  // Handle back
  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="funding_wrapper mb-4 mx-lg-3 mx-xl-0">
      <MaxWidthWrapper>
        <div className="two_col_wrapper">
          {/* Main content */}
          <div className="funding_form_container d-flex flex-column gap-3 rounded-4 shadow-sm py-4 overflow-hidden">
            <div className="px-4 border-bottom pb-4 d-flex align-items-center justify-content-between">
              <h2 className="m-0">
                "Apply for Funding" with{" "}
                <span style={{ color: "#fd5901" }}>Capital HUB</span>
              </h2>
              {/* <button
                type="button"
                className="btn btn-secondary rounded-2 back-btn d-flex justify-content-center align-items-center gap-1"
                onClick={handleBack}
              >
                <IconChevronBack className="back-icon" />
                Back
              </button> */}
            </div>
            {/* Form */}
            {!showForm && fundingViaCapitalHubQuestions ? showSuccess? <div style={{maxWidth:"800px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
              <h5 style={{color:"#fff"}}>Thank you for showing interest
              </h5></div>:(
              <FundingPreviousData setShowForm={setShowForm} />
            ) : (
              <FundingForm setShowForm={setShowForm} setShoeSuccess={setShoeSuccess}/>
            )}
          </div>

          {/* Right Content */}
          <div className="d-none d-xl-block">
            <RightProfileCard />
            <RecommendationCard />
            <NewsCorner />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
