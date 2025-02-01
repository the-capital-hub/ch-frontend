import React from "react";
import "./OneLink.scss";
import RightProfileCard from "../InvestorGlobalCards/RightProfileCard/RightProfileCard";
import RecommendationCard from "../InvestorGlobalCards/Recommendation/RecommendationCard";
import ShareLink from "./ShareLink/ShareLink";
import IntroductoryMessage from "./IntroductoryMessage/IntroductoryMessage";
import ThreeDotsImage from "../../../Images/whiteTheeeDots.svg";
import FolderImage from "../../../Images/Folder.svg";
import VideoImage from "../../../Images/Video.svg";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getStartupByFounderId } from "../../../Service/user";
import SharingOneLinkPopUp from "../../PopUp/SharingOneLinkPopUp/SharingOneLinkPopUp";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { selectTheme, setPageTitle } from "../../../Store/features/design/designSlice";
import TutorialTrigger from "../../Shared/TutorialTrigger/TutorialTrigger";
import { startupOnboardingSteps } from "../../OnBoardUser/steps/startup";
import {
  selectCompanyDataId,
  selectLoggedInUserId,
  selectUserCompanyData,
} from "../../../Store/features/user/userSlice";
import { PlusIcon } from "../../NewInvestor/SvgIcons";
import CompanyPost from "../InvestorGlobalCards/MilestoneCard/CompanyPost";
import CreatePostPopUp from "../../PopUp/CreatePostPopUp/CreatePostPopUp";
import SubcriptionPop from "../../PopUp/SubscriptionPopUp/SubcriptionPop";

const OneLink = () => {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const [popPayOpen, setPopPayOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const companyDataId = useSelector(selectCompanyDataId);
  const userCompanyData = useSelector(selectUserCompanyData);
  const [isExitClicked, setIsExitClicked] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const theme = useSelector(selectTheme)
  const [company, setCompany] = useState([]);
  const [respostingPostId, setRepostingPostId] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    document.title = "OneLink | The Capital Hub";
    dispatch(setPageTitle("OneLink"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [company, dispatch]);

  // Fetch data by userId
  useEffect(() => {
    if (!companyDataId) {
      getStartupByFounderId(loggedInUserId)
        .then(({ data }) => {
          setCompany(data);
        })
        .catch(() => setCompany([]));
    } else {
      setCompany(userCompanyData);
    }
  }, [loggedInUserId, companyDataId, userCompanyData]);

  // HandleExitClick
  const handleExitClick = () => {
    setIsExitClicked(true);
  };

  const handleClosePopup = () => {
    setIsExitClicked(false);
  };
  const appendDataToAllPosts = (data) => {
    setAllPosts([data, ...allPosts]);
  };

  // Function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <MaxWidthWrapper>
      <div className="onelink_container">
        <div className="onelink_intro_container">
          {/* Main content */}

          <div className="main__content">
            {/* Onboarding popup */}
            <TutorialTrigger steps={startupOnboardingSteps.oneLinkPage} />

            {/* ShareLink */}
            <ShareLink
              OneLink={company?.oneLink}
              onExitClick={handleExitClick}
              isExitClicked={isExitClicked}
            />

            {/* Introductory message */}
            <IntroductoryMessage
              title={"Introductory message"}
              image={{
                threeDots: ThreeDotsImage,
                folder: FolderImage,
                video: VideoImage,
              }}
              para={company?.introductoryMessage}
              previous={company?.previousIntroductoryMessage}
              input={true}
              isExitClicked={isExitClicked}
              setCompany={setCompany}
              showPreviousIM={false}
            />
            <div
              className="rounded-4 shadow-sm"
              style={{ backgroundColor: "var(--white-to-grey)" }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 1rem 0 1rem",
                }}
                className="box personal_information"
              >
                <div className="personal_information_header">
                  <h2 className="typography" style={{color:theme==="dark"?"#fff":"#000"}}>Company update</h2>
                </div>
                <div
                  // onClick={() => setSidebarCollapsed(true)}
                  //to="/investor/home?showPopup=true"
                  id="sidebar_createAPost"
                >
                  <button
                    className="create_post_newInvestor"
                    style={{backgroundColor: loggedInUser.isInvestor === "true" ? "#d3f36b" : "#fd5901"}}
                    onClick={() => setPopupOpen(true)}
                  >
                    {/* <span>Create a Post</span>
                <img src={PlusIcon} alt="image" /> */}
                    <span className="ms-0" style={{color: loggedInUser.isInvestor === "true" ? "#000" : "#fff"}}>Create Post</span>
                    {/* <img src={PlusIcon} alt="image" /> */}
                    <PlusIcon color={loggedInUser.isInvestor === "true" ? "#000" : "#fff"} width="24" height="24" />
                  </button>
                </div>
              </div>
              {/* Dropdown for month selection */}
              <select onChange={handleMonthChange} value={selectedMonth} className="month-dropdown">
                <option value="">Select Month</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
              <div className="mt-2 milestones">
                <CompanyPost
                  userId={loggedInUserId}
                  postDelete={true}
                  newPost={newPost}
                  selectedMonth={selectedMonth}
                />
              </div>
            </div>
          </div>

          {/* Rightside content */}
          <div className="right__content">
            <RightProfileCard />
            <RecommendationCard maxCount={3} />
            {/* <NewsCorner /> */}
          </div>
        </div>

        {/* New OnePager end */}
        {isExitClicked && company.introductoryMessage && (
          <SharingOneLinkPopUp
            introMessage={company.introductoryMessage}
            oneLink={company.oneLink}
            onClose={handleClosePopup}
          />
        )}
        {popupOpen && (
          <CreatePostPopUp
            setPopupOpen={setPopupOpen}
            popupOpen
            setNewPost={setNewPost}
            respostingPostId={respostingPostId}
            appendDataToAllPosts={appendDataToAllPosts}
          />
        )}
        {popPayOpen && (
          <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen} />
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default OneLink;
