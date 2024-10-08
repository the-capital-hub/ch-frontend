import React, { useEffect, useState } from "react";
import CompanyProfile from "../../../components/NewInvestor/CompanyProfileComponents/CompanyProfile";
// import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import { useDispatch, useSelector } from "react-redux";
import { getOnePager, getInvestorFromOneLinkAPI } from "../../../Service/user";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
// import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import { useParams } from "react-router-dom";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useSearchParams } from "react-router-dom";

export default function InvestorCompanyProfilePage() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  let { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const isInvestor = searchParams.get("investor");

  const [companyData, setCompanyData] = useState([]);
  const [investorData, setInvestorData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Company Profile | Investors - The Capital Hub";
    dispatch(setPageTitle("Company Profile"));
  }, [dispatch]);

  useEffect(() => {
    if (isInvestor === "1") {
      getInvestorFromOneLinkAPI(username, loggedInUser.oneLinkId)
        .then(({ data }) => {
          setInvestorData(data.company);
          setCompanyData([]);
        })
        .catch(() => {
          setInvestorData([]);
        });
    } else {
      getOnePager(username)
        .then(({ data }) => {
          setCompanyData(data);
          setInvestorData([]);
        })
        .catch(() => {
          setCompanyData([]);
        });
    }
  }, [username, isInvestor, loggedInUser.oneLinkId]);

  return (
    <MaxWidthWrapper>
      <div className="otherInvestorCompanyProfilePage__wrapper pb-5">
        {/* Main content */}
        <div className="main__content">
          <SmallProfileCard text={"Company Profile"} />
          {/* Company profile */}
          {companyData.length !== 0 || investorData.length !== 0 ? (
            companyData.length !== 0 ? (
              <CompanyProfile companyData={companyData} />
            ) : investorData.length !== 0 ? (
              <CompanyProfile investorData={investorData} isStartup="false" />
            ) : (
              <div>No data available</div>
            )
          ) : (
            <SpinnerBS />
          )}
        </div>
        {/* Right side content */}
        {/* <div className="right__content">
          <RecommendationCard />
          <NewsCorner />
        </div> */}
      </div>
    </MaxWidthWrapper>
  );
}
