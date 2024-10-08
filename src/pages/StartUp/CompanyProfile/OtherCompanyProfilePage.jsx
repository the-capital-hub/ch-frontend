import React, { useEffect, useState } from "react";
import CompanyProfile from "../../../components/NewInvestor/CompanyProfileComponents/CompanyProfile";
import "./OtherCompanyProfilePage.scss";
import { useNavigate, useParams } from "react-router-dom";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import { getStartupByFounderId, getInvestorById } from "../../../Service/user";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useDispatch, useSelector } from "react-redux";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import { useSearchParams } from "react-router-dom";

export default function OtherCompanyProfilePage() {
  // get founderId from params
  const { founderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInvestor = searchParams.get("investor");

  // Fetch from redux store
  const loggedInUserId = useSelector(selectLoggedInUserId);

  // States
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState(false);
  const [investorData, setInvestorData] = useState(false);

  if (loggedInUserId === founderId) {
    navigate("/company-profile");
  }

  // Fetch company data by founderId
  useEffect(() => {
    setLoading(true);
    if (isInvestor === "1") {
      getInvestorById(founderId)
        .then(({ data }) => {
          setInvestorData(data);
          setCompanyData([]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setInvestorData([]);
          console.error("Error fetching investor company data:", error.message);
        });
    } else {
      getStartupByFounderId(founderId)
        .then(({ data }) => {
          setCompanyData(data);
          setInvestorData([]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setCompanyData([]);
          console.error("Error fetching startup data:", error.message);
        });
    }
    document.title = "Company Profile | The Capital Hub";
    dispatch(setPageTitle("Company"));
  }, [dispatch, founderId, isInvestor]);

  return (
    <MaxWidthWrapper>
      <div className="otherCompanyProfilePage_wrapper mb-4">
        {/* Main Content */}
        <div className="main_content">
          {companyData.length !== 0 || investorData.length !== 0 ? (
            companyData.length !== 0 ? (
              <CompanyProfile companyData={companyData} startup="true" />
            ) : investorData.length !== 0 ? (
              <CompanyProfile investorData={investorData} isStartup="false" />
            ) : (
              <div>No data available</div>
            )
          ) : (
            <SpinnerBS />
          )}
        </div>
        {/* Right Content */}
        <div className="right_content">
          <RecommendationCard />
          <NewsCorner />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
