// import { useState } from "react";
import "./Profile.scss";
// import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InvestorRightProfileCard from "../../../components/NewInvestor/InvestorRightProfileCard/InvestorRightProfileCard";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import {
  selectTheme,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
import ProfessionalInfo from "../../../components/Investor/StartupProfilePageComponents/ProfessionalInfo/ProfessionalInfo";
import StartupsInvested from "../../../components/NewInvestor/ProfileComponents/StartupsInvested/StartupsInvested";
import SectorsInterested from "../../../components/NewInvestor/ProfileComponents/SectorsInterested/SectorsInterested";
// import InvestmentPhilosophy from "../../../components/NewInvestor/ProfileComponents/InvestmentPhilosophy/InvestmentPhilosophy";
import MissingDetails from "../../../components/Investor/InvestorHome/Components/Questionnaire/MissingDetails";
import UserBio from "../../../components/Investor/InvestorHome/Components/UserBio/UserBio";
import {
  selectCompanyDataId,
  selectIsInvestor,
  selectUserInvestor,
  setUserCompany,
} from "../../../Store/features/user/userSlice";
import { getInvestorById } from "../../../Service/user";
// import AchievementsComponent from "../../../components/NewInvestor/ProfileComponents/AchievementsComponent/AchievementsComponent";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";
import PersonalDetail from "../../../components/Investor/StartupProfilePageComponents/ProfessionalInfo/PersonalDetail";
// import RecentExperience from "../../../components/NewInvestor/RecentExperience/RecentExperience";
import CompanyDetailsCard from "../../../components/Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
// import InvestorCompanyProfilePage from "../InvestorCompanyProfilePage/InvestorCompanyProfilePage";
import InvestorPhilosophy from "../../../components/NewInvestor/InvestorPhilosophy/InvestorPhilosophy";
import ConnectionCard from "../../../components/Investor/ConnectionCard/ConnectionCard";
import CompanyPost from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/CompanyPost";
import FeaturedPostsContainer from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/FeaturedPostsContainer";
import MyPost from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/MyPost";
import Investment from "../../InvestorOneLink/InvestorOneLinkProfile/Investment";
import Milestones from "../../../components/Investor/Milestones/Milestones";

function Profile() {
  // Fetch loggedInUser from global state
  const loggedInUserId = useSelector((state) => state.user.loggedInUser._id);
  const email = useSelector((state)=> state.user.loggedInUser.email)
  const isInvestor = useSelector(selectIsInvestor);
  const [postSection, setPostSection] = useState("featuredPosts");
  const userInvestor = useSelector(selectUserInvestor);
  const companyDataId = useSelector(selectCompanyDataId);
  const dispatch = useDispatch();

  // Update page title
  useEffect(() => {
    document.title = "Profile | Investors - The Capital Hub";
    dispatch(setPageTitle("Profile"));

    // Fetch company data
    if (isInvestor && !companyDataId) {
      getInvestorById(userInvestor)
        .then(({ data }) => {
          dispatch(setUserCompany(data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, isInvestor, userInvestor, companyDataId]);
  return (
    <MaxWidthWrapper>
      <div className="profile_container">
        <div className="two_col_wrapper">
          <div className="main_content">
            {/* <SmallProfileCard /> */}

            {/* Onboarding popup */}
            <TutorialTrigger
              steps={investorOnboardingSteps.profilePage}
              className={""}
            />

            {/* Professional Info */}
            <ProfessionalInfo theme={"investor"} />
            <div
            className={`professional_info_section d-flex flex-column gap-3 p-2 px-md-4 py-4  shadow-sm rounded-2 border
            `}
            >
              <Investment userDetails={userInvestor} canEdit={true}/>
            </div>
            {/* Misssing details Chat Assistant */}
            {/*<MissingDetails isInvestor={true} />*/}

            {/* Bio */}
            <PersonalDetail theme={"investor"} />
            <UserBio />
            <CompanyDetailsCard theme="investor" userDetails={userInvestor} email={email}/>
            <InvestorPhilosophy showProfile={false} />
            <div className="box personal_information rounded-2 border">
              <div style={{ display: "flex" }}>
              <div
                  className="personal_information_header"
                  onClick={() => {
                    setPostSection("featuredPosts");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <h2
                    className={`typography ${
                      postSection === "featuredPosts" ? "active" : ""
                    }`}
                  >
                    Featured posts
                  </h2>
                </div>

                <div
                  className="personal_information_header"
                  onClick={() => {
                    setPostSection("companyUpdate");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <h2
                    className={`typography ${
                      postSection === "companyUpdate" ? "active" : ""
                    }`}
                  >
                    Company update
                  </h2>
                  {/* <div className="milestone_see_more">
              <Link to={""}>See more</Link>
            </div> */}
                </div>
                <div
                className="personal_information_header"
                onClick={() => {
                  setPostSection("myPost");
                }}
                style={{ cursor: "pointer" }}
              >
                <h2
                  className={`typography ${
                    postSection === "myPost" ? "active" : ""
                  }`}
                >
                  My posts
                </h2>
              </div>
              </div>
              <div className="mt-2 milestones">
                {postSection === "companyUpdate" ? (
                  <CompanyPost userId={loggedInUserId}
                  postDelete={true}/>
                ) : postSection === "featuredPosts" ? (
                  <FeaturedPostsContainer
                    userId={loggedInUserId}
                    postDelete={true}
                  />
                ) : (
                  <MyPost postDelete={true}/>
                )}
              </div>
            </div>
            <div className="box personal_information rounded-2 border">
              <h4 className="typography" style={{ marginLeft: "1rem" }}>
                Recent Connections
              </h4>
              <div className="col-12 mt-2 milestones">
                <ConnectionCard theme={"investor"} />
              </div>
            </div>
            {/* Achievements */}
            {/*<AchievementsComponent />*/}

            {/* Startups Invested In */}
            <StartupsInvested />

            {/* Sectores Interested */}
            {/* <SectorsInterested /> */}
            {/*<RecentExperience/>*/}
            {/* Investment Philosophy */}
            {/*<InvestmentPhilosophy />*/}
            <div className="box personal_information rounded-2 border">
            <h4
              className="typography"
              style={{
                marginLeft: "1rem",
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              Milestones
            </h4>
            <Milestones pageTheme="investor" />
          </div>
          </div>

          {/* Right Content */}
          <div className="right_content d-none d-xl-block">
            <InvestorRightProfileCard />
            <RecommendationCard isInvestor={true} />
            <NewsCorner />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default Profile;
