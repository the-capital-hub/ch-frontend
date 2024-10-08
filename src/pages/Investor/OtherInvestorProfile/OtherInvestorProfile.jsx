import React, { useEffect, useState } from "react";
import "./OtherInvestorProfile.scss";
import { useNavigate, useParams } from "react-router-dom";
// import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import { getUserAndStartUpByUserIdAPI } from "../../../Service/user";
// import messageIcon from "../../../Images/StartUp/icons/message.svg";
import { useDispatch } from "react-redux";
// import IconMessage from "../../../components/NewInvestor/SvgIcons/IconMessage";
import ProfileHeader from "../../../components/NewInvestor/OtherInvestorProfile/ProfileHeader/ProfileHeader";
// import Experience from "../../../components/NewInvestor/OtherInvestorProfile/ProfileHeader/Experience";
import CompanyDetailsCard from "../../../components/Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
import ColorCard from "../../../components/Investor/InvestorGlobalCards/ColoredCards/ColorCard";
import lastRoundInvIcon from "../../../Images/StartUp/icons/ColoredCards/isoSideCoin.svg";
import totalInvIcon from "../../../Images/StartUp/icons/ColoredCards/oneHandSideCoin.svg";
import noOfInvIcon from "../../../Images/StartUp/icons/ColoredCards/Investors.svg";
import fundAskIcon from "../../../Images/StartUp/icons/ColoredCards/fundAsk.svg";
import valuationIcon from "../../../Images/StartUp/icons/ColoredCards/3Coins.svg";
import raisedFundsIcon from "../../../Images/StartUp/icons/ColoredCards/3CoinStack.svg";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import {
  selectTheme,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
import { useSelector } from "react-redux";

export default function OtherInvestorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const theme = useSelector(selectTheme);
  const [userData, setUserData] = useState(null);
  // const { userId } = useParams();
  // const location = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userId } = useParams();
  const [connectionSent, setConnectionSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserAndStartUpByUserIdAPI(userId)
      .then(({ data }) => {
        setUserData(data);
        if (data.isInvestor === "true") {
          dispatch(setPageTitle("Investor Profile"));
          window.title = "Investor Profile | The Capital Hub";
        } else {
          dispatch(setPageTitle("StartUp Profile"));
          window.title = "StartUp Profile | The Capital Hub";
        }
      })
      .catch(() => navigate("/profile"));
  }, [userId, connectionSent, dispatch]);

  return (
    <MaxWidthWrapper>
      <div className="otherInvestorProfile_wrapper d-flex flex-column gap-4 px-1 px-sm-3 pb-4">
        {/* Small profile Section */}
        {/* <section className="">
          <SmallProfileCard text="User Details" />
        </section> */}
        {/* Profile Header section */}
        {userData ? (
          <section className="otherInvestor_header">
            <ProfileHeader
              userData={userData}
              loggedInUser={loggedInUser}
              setConnectionSent={setConnectionSent}
            />
          </section>
        ) : (
          <div className="d-flex py-5 justify-content-center align-items-center w-100 white-to-grey">
            <SpinnerBS colorClass={"d-l-grey"} />
          </div>
        )}
        <div className="two_column_wrapper">
          {/* Main Section */}
          {userData ? (
            <section className="main_section d-flex flex-column gap-3">
              {/* About */}
              {/* <div className="about rounded-4 border shadow-sm profile_container">
                  <h4 className="h4">About</h4>
                  <p className="text-secondary">{userData?.bio}</p>
                </div>
                <div className="personal_information rounded-4 border shadow-sm profile_container">
                  <h4 className="h4">Personal Information</h4>
                  <div className="details w-100 m-0 p-0 col-md-9 row row-cols-1 row-cols-md-2">
                    <div className="d-flex flex-column mb-1 mb-md-3 p-0">
                      <p className="text-secondary mb-1">First name</p>
                      <p className="m-0">{userData?.firstName}</p>
                    </div>
                    <div className="d-flex flex-column mb-1 mb-md-3 p-0">
                      <p className="text-secondary mb-1">Last name</p>
                      <p className="m-0">{userData?.lastName}</p>
                    </div>
                    <div className="d-flex flex-column mb-1 mb-md-3 p-0">
                      <p className="text-secondary mb-1">Email address</p>
                      <p className="m-0">{userData?.email}</p>
                    </div>
                    <div className="d-flex flex-column mb-1 mb-md-3 p-0">
                      <p className="text-secondary mb-1">Mobile number</p>
                      <p className="m-0">{userData?.phoneNumber}</p>
                    </div>
                  </div>
                </div> */}
              {/* Experience */}
              {/* <Experience /> */}
              {/* Education */}
              {/* <div className="education bg-white p-4 rounded-4 border shadow-sm profile_container">
                <h4 className="h4">Education</h4>
                <div className="single_education">
                  <h6 className="h6">
                    Avanthi Institute of Engineering & Technology, Tamaram
                    Village, Makavarapalem mandal
                  </h6>
                  <p className="m-0 font_14">
                    B.tech-Electronic communication Engineering
                  </p>
                  <p className="m-0 font_12 font_light">March 2019 - 2023</p>
                </div>
              </div> */}
              {/* bio */}
              {userData?.bio ? (
                <div className="bio white-to-grey p-4 rounded-4 border shadow-sm profile_container">
                  <h4 className="h4 d-l-grey">Bio</h4>
                  <div className="single_education">
                    <h6
                      className="h6"
                      style={{ color: theme === "dark" ? "#fff" : "#000" }}
                    >
                      {userData?.bio}
                    </h6>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* Company Details */}
              <CompanyDetailsCard
                className="company_details profile_container"
                userDetails={userData}
                theme="startup"
              />
              {/* Color cards */}
              <div>
                <h6
                  className="div__heading"
                  style={{
                    color: theme === "dark" ? "#fff" : "#000",
                    marginLeft: "0.5rem",
                  }}
                >
                  Previous funding
                </h6>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <ColorCard
                    color="white"
                    background="#BB98FF"
                    text="Valuation"
                    image={lastRoundInvIcon}
                    amount={userData?.startUp?.colorCard?.last_round_investment}
                    isOneLink={true}
                  />
                  <ColorCard
                    color="white"
                    background="#DAC191"
                    text="Total Investment"
                    image={totalInvIcon}
                    amount={userData?.startUp?.colorCard?.total_investment}
                    isOneLink={true}
                  />
                  <ColorCard
                    color="white"
                    background="#DCDCDC"
                    text="No.of Investers"
                    image={noOfInvIcon}
                    amount={userData?.startUp?.colorCard?.no_of_investers}
                    noRupee
                    isOneLink={true}
                  />
                </div>
                <h6
                  className="div__heading"
                  style={{
                    color: theme === "dark" ? "#fff" : "#000",
                    marginLeft: "0.5rem",
                  }}
                >
                Current Funding
                </h6>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <ColorCard
                    color="white"
                    background="#2B2B2B"
                    text="Fund ask"
                    image={fundAskIcon}
                    amount={userData?.startUp?.colorCard?.fund_ask}
                    isOneLink={true}
                  />
                  <ColorCard
                    color="white"
                    background="#FF7373"
                    text="Valuation"
                    image={valuationIcon}
                    amount={userData?.startUp?.colorCard?.valuation}
                    isOneLink={true}
                  />
                  <ColorCard
                    color="white"
                    background="#9198DA"
                    text="Funds raised"
                    image={raisedFundsIcon}
                    amount={userData?.startUp?.colorCard?.raised_funds}
                    isOneLink={true}
                  />
                </div>
              </div>
            </section>
          ) : (
            <div className="d-flex py-5 justify-content-center align-items-center w-100 white-to-grey">
              <SpinnerBS colorClass={"d-l-grey"} />
            </div>
          )}
          {/* Right Section */}
          <aside className="right_section">
            <RecommendationCard isInvestor={true} />
            <NewsCorner />
          </aside>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
