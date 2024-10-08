import React, { useState, useEffect } from "react";
import "./InvestorOnelink.scss";
import ShareLink from "../../../components/Investor/OneLink/ShareLink/ShareLink";
import IntroductoryMessage from "../../../components/Investor/OneLink/IntroductoryMessage/IntroductoryMessage";
import RightProfileCard from "../../../components/NewInvestor/InvestorRightProfileCard/InvestorRightProfileCard";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import SharingOneLinkPopUp from "../../../components/PopUp/SharingOneLinkPopUp/SharingOneLinkPopUp";
import { getInvestorById, validateMeetingAuth } from "../../../Service/user";
import ThreeDotsImage from "../../../Images/whiteTheeeDots.svg";
import FolderImage from "../../../Images/Folder.svg";
import VideoImage from "../../../Images/Video.svg";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import {
  selectTheme,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";
import {
  loginSuccess,
  selectUserCompanyData,
  selectUserInvestor,
} from "../../../Store/features/user/userSlice";
import InvestorPhilosophy from "../../../components/NewInvestor/InvestorPhilosophy/InvestorPhilosophy";
import InvestmentPhilosophy from "../../../components/NewInvestor/ProfileComponents/InvestmentPhilosophy/InvestmentPhilosophy";
import CompanyPost from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/CompanyPost";
import { PlusIcon } from "../../../components/NewInvestor/SvgIcons";
import CreatePostPopUp from "../../../components/PopUp/CreatePostPopUp/CreatePostPopUp";
import Milestones from "../../../components/Investor/Milestones/Milestones";
import SubcriptionPop from "../../../components/PopUp/SubscriptionPopUp/SubcriptionPop";
import AfterSuccessPopUp from "../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";

export default function InvestorOnelink() {
  const theme = useSelector(selectTheme);
  const [popupOpen, setPopupOpen] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const [open, setOpen] = useState(false);
  const [respostingPostId, setRepostingPostId] = useState("");
  const [popPayOpen, setPopPayOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [isExitClicked, setIsExitClicked] = useState(false);
  const [company, setCompany] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const dispatch = useDispatch();
  // const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      const getToken = async () => {
        const res = await validateMeetingAuth(code);
        if (res.status === 200) {
          dispatch(loginSuccess(res.data));
          setOpen(true);
        }
      };
      getToken();
    }
  }, []);
  useEffect(() => {
    document.title = "OneLink | The Capital Hub";
    dispatch(setPageTitle("OneLink"));
  }, [dispatch]);

  // Fetch data by userId
  useEffect(() => {
    getInvestorById(loggedInUser._id)
      .then(({ data }) => {
        setCompany(data);
      })
      .catch(() => setCompany([]));
  }, [loggedInUser._id]);
  // HandleExitClick
  const handleExitClick = () => {
    // if (loggedInUser.subscriptionType === "Basic") {
    //   setPopPayOpen(true);
    //   return;
    // }
    setIsExitClicked(true);
  };

  const handleClosePopup = () => {
    setIsExitClicked(false);
    // navigate("/login");
  };
  const appendDataToAllPosts = (data) => {
    setAllPosts([...data, ...allPosts]);
  };
  return (
    <MaxWidthWrapper>
      <div className="investor_onelink_wrapper mb-4">
        <div className="investor_onelink_into_container">
          {/* Main Content */}
          <div className="main_content">
            <SmallProfileCard text={"OneLink"} />

            {/* Onboarding popup */}
            <TutorialTrigger
              steps={investorOnboardingSteps.oneLinkPage}
              className={""}
            />

            <ShareLink
              OneLink={company?.oneLink}
              onExitClick={handleExitClick}
              investor
            />
            <IntroductoryMessage
              title={"Introductory message"}
              image={{
                threeDots: ThreeDotsImage,
                folder: FolderImage,
                video: VideoImage,
              }}
              para={company.introductoryMessage}
              previous={company?.previousIntroductoryMessage || ""}
              input={true}
              isExitClicked={isExitClicked}
              setCompany={setCompany}
              investor
              showPreviousIM={false}
            />
            <InvestorPhilosophy showProfile={false} />
            <div className="startups_invested border shadow-sm rounded-2 introductory_message_container">
              <div className="box_container rounded-2 border shadow-sm p-4">
                <div
                  className="header border-bottom d-flex"
                  style={{
                    paddingBottom: "15px",
                    marginBottom: "0.5rem",
                    color: theme === "dark" ? "#fff" : "#000",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <h4
                    style={{
                      color: theme === "dark" ? "#fff" : "#000",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    Feature Articles
                  </h4>

                  <div
                    // onClick={() => setSidebarCollapsed(true)}
                    //to="/investor/home?showPopup=true"
                    id="sidebar_createAPost"
                  >
                    <button
                      className="create_post_newInvestor"
                      onClick={() => setPopupOpen(true)}
                    >
                      {/* <span>Create a Post</span>
                    <img src={PlusIcon} alt="image" /> */}
                      <span className="text-black ms-0">Create Post</span>
                      {/* <img src={PlusIcon} alt="image" /> */}
                      <PlusIcon color="black" width="24" height="24" />
                    </button>
                  </div>
                </div>
                <CompanyPost userId={loggedInUser?._id} postDelete={true} />
              </div>
            </div>
            <InvestmentPhilosophy />
          </div>
          {/* Right Side content */}
          <div className="right_content">
            <RightProfileCard />
            <RecommendationCard maxCount={3} />
          </div>
        </div>

        {/* Onepage Preview */}
        {/* <OnePagePreview show={true} /> */}

        {/*{company.length !== 0 ? (
          <div
            className="onePager_wrapper d-flex flex-column gap-4"
            theme="investor"
          >
            <Link
              to={"/investor/onelink/edit"}
              className="fs-4 text-white bg-black rounded-4 px-3 py-4 text-center text-decoration-none"
            >
              Edit OneLink
            </Link>
            <OnePagerCompanyLogo image={company.logo} /> 
            <OnePagerCompanyInfo
              company={company.companyName}
              location={company.location}
              startedAtDate={company.startedAtDate}
              keyFocus={company.keyFocus}
              socialLinks={company.socialLinks}
              showEdit={false}
            />
             <OnePagerCompanyAbout
              description={company.description}
              problem={company.problem}
              solution={company.solution}
              showEdit={true}
            /> 
          </div>
        ) : (
          <SpinnerBS className={"d-flex justify-content-center w-100 py-5"} />
            )}*/}

        {isExitClicked && company.introductoryMessage && (
          <SharingOneLinkPopUp
            introMessage={company.introductoryMessage}
            oneLink={company.oneLink}
            onClose={handleClosePopup}
            investor
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
      </div>
      {popPayOpen && (
        <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen} />
      )}
      {open && (
        <AfterSuccessPopUp
          withoutOkButton
          onClose={() => setOpen(!open)}
          successText="Authentication withe the google completed"
        />
      )}
    </MaxWidthWrapper>
  );
}
