import { useEffect, useState } from "react";
import "./investorHome.scss";
// import profilePic from "../../../Images/investorIcon/profilePic.webp";
// import AddUserIcon from "../../../Images/investorIcon/Add-User.svg";
// import { CiEdit, CiSaveUp2 } from "react-icons/ci";
// import { Link } from "react-router-dom";
import FeaturedPostsContainer from "../InvestorGlobalCards/MilestoneCard/FeaturedPostsContainer";
// import { SidebarContext } from "../../Sidebar/SidebarContext";
// import SmallProfileCard from "../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import RightProfileCard from "../InvestorGlobalCards/RightProfileCard/RightProfileCard";
import RecommendationCard from "../InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../InvestorGlobalCards/NewsCorner/NewsCorner";
import CompanyProfileDetailsCard from "../InvestorGlobalCards/CompanyDetails/CompanyProfileDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { getStartupByFounderId } from "../../../Service/user";
import {
	selectCompanyDataId,
	selectCompanyFounderId,
	setUserCompany,
} from "../../../Store/features/user/userSlice";
// import CoinIcon from "../../../Images/investorView/Rectangle.png";
// import ColorCard from "../InvestorGlobalCards/ColoredCards/ColorCard";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import ConnectionCard from "../ConnectionCard/ConnectionCard";
import ProfessionalInfo from "../StartupProfilePageComponents/ProfessionalInfo/ProfessionalInfo";
import { setPageTitle } from "../../../Store/features/design/designSlice";
// import OnBoardUser from "../../OnBoardUser/OnBoardUser";
// import { startupOnboardingSteps } from "../../OnBoardUser/steps/startup";
import ColorCards from "./Components/ColorCards/ColorCards";
import UserBio from "./Components/UserBio/UserBio";
//import MissingDetails from "./Components/Questionnaire/MissingDetails";
// import AchievementsComponents from "../AchievementsPageComponents/AchievementsComponents";
// import { Link } from "react-router-dom";
import CompanyPost from "../InvestorGlobalCards/MilestoneCard/CompanyPost";
import PersonalDetail from "../StartupProfilePageComponents/ProfessionalInfo/PersonalDetail";
import Milestones from "../Milestones/Milestones";
import MyPost from "../InvestorGlobalCards/MilestoneCard/MyPost";
import PersonalInfoCard from "./Components/PersonalInfoCard/PersonalInfoCard.jsx";

// Startup profile page
const InvestorHome = () => {
	// Fetch loggedInUser from global state
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const loggedInUserId = useSelector((state) => state.user.loggedInUser._id);
	const [postSection, setPostSection] = useState("featuredPosts");
	//const companyFounderId = useSelector(selectCompanyFounderId);
	const companyDataId = useSelector(selectCompanyDataId);
	const dispatch = useDispatch();

	// Update title
	useEffect(() => {
		document.title = "Profile | The Capital Hub";
		dispatch(setPageTitle("Profile"));
	}, [dispatch]);

	// Fetch startup company data
	useEffect(() => {
		if (!companyDataId) {
			getStartupByFounderId(loggedInUserId)
				.then(({ data }) => {
					dispatch(setUserCompany(data));
				})
				.catch((error) => {
					console.error("Error fetching startup data:", error);
				});
		}
	}, [loggedInUserId, dispatch, companyDataId]);

	return (
		<MaxWidthWrapper>
			<div className="investorHome_main_container ">
				<div className="two_column_wrapper">
					<div className="seventy d-flex flex-column gap-4">
						{/* Small Profile Card */}
						{/* <SmallProfileCard className={""} /> */}

						{/* Professional info component */}
						<ProfessionalInfo theme={"startup"} />
						<PersonalDetail theme={"startup"} />
						<PersonalInfoCard />
						{/* offcanvas trigger - Add missing details. Show if details are missing */}
						{/*<MissingDetails />/}

              {/* Bio */}
						<UserBio />
						{/* Company Details */}
						<div className="">
							<CompanyProfileDetailsCard
								className=""
								userDetails={loggedInUser}
								page={""}
								theme="startup"
							/>
						</div>
						{/* achievements */}
						{/*<div className="box personal_information">
                <div className="personal_information_header ">
                  <h2 className="typography">Achievements</h2>
                  <div className="milestone_see_more">
                    <Link to={"/profile/achievements"}>See more</Link>
                  </div>
                </div>
                <div className="col-12 mt-2 milestones">
                  <AchievementsComponents />
                </div>
                 </div>*/}

						{/* Featured Posts */}
						<div className="box personal_information">
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
									<CompanyPost userId={loggedInUserId} postDelete={true} />
								) : postSection === "featuredPosts" ? (
									<FeaturedPostsContainer
										userId={loggedInUserId}
										postDelete={true}
									/>
								) : (
									<MyPost userId={loggedInUserId} postDelete={true} />
								)}
							</div>
						</div>
						{/*<div className="box personal_information">
              <div className="personal_information_header">
                <h2 className="typography">Featured posts</h2>
              </div>
              <div className="mt-2 milestones">
                <FeaturedPostsContainer userId={loggedInUserId} postDelete={true}/>
              </div>
             </div>*/}

						<div className="box personal_information">
							<h4 className="typography" style={{ marginLeft: "1rem" }}>
								Recent Connections
							</h4>
							<div className="col-12 mt-2 milestones">
								<ConnectionCard />
							</div>
						</div>
						<div className="box personal_information">
							<h4
								className="typography"
								style={{
									marginLeft: "1rem",
									fontFamily: '"Outfit", sans-serif',
								}}
							>
								Milestones
							</h4>
							<Milestones pageTheme="startup" />
						</div>
						{/* Featured Posts End */}

						{/* Color Cards */}
					</div>
					<div className="thirty d-none d-xl-block">
						<RightProfileCard />
						<RecommendationCard />
						<NewsCorner />
					</div>
				</div>

				{/* OffCanvas for questionnaire */}
				{/* <Questionnaire
          countData={countData}
          setCountData={setCountData}
          handleRefetch={handleRefetch}
        /> */}
			</div>
			{/* <OnBoardUser steps={startupOnboardingSteps.profilePage} /> */}
		</MaxWidthWrapper>
	);
};

export default InvestorHome;
