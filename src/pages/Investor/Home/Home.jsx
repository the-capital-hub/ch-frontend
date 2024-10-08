import React, { useEffect, useState } from "react";
import "./home.scss";
// import profilePic from "../../../Images/investorIcon/profilePic.webp";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
// import InvestorRecommendationCard from "../../../components/NewInvestor/InvestorRecommendationCard/InvestorRecommendationCard";
import BatchImag from "../../../Images/tick-mark.png"
import InvestorRightProfileCard from "../../../components/NewInvestor/InvestorRightProfileCard/InvestorRightProfileCard";
import InvestorCreatePostPopUp from "../../../components/NewInvestor/InvestorCreatePostPopUp/InvestorCreatePostPopUp";
// import InvestorSmallProfilecard from "../../../components/NewInvestor/InvestorSmallProfilecard/InvestorSmallProfilecard";
import InvestorFeedPostCard from "../../../components/NewInvestor/InvesterFeedPostCard/InvestorFeedPostCard";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import {
  getAllPostsAPI,
  getInvestorById,
  getSavedPostCollections,
  postUserPost,
} from "../../../Service/user";
import { useLocation, useParams } from "react-router-dom";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import {
  setPageTitle,
  selectInvestorCreatePostModal,
  setShowOnboarding,
} from "../../../Store/features/design/designSlice";

import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";
import {
  selectCompanyDataId,
  selectIsInvestor,
  selectLoggedInUserId,
  selectUserInvestor,
  selectUserProfilePicture,
  setUserCompany,
} from "../../../Store/features/user/userSlice";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import PostDetail from "../../../components/Investor/Cards/FeedPost/PostDetail";


function Home() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const userProfilePicture = useSelector(selectUserProfilePicture);
  const isInvestor = useSelector(selectIsInvestor);
  const userInvestor = useSelector(selectUserInvestor);
  const companyDataId = useSelector(selectCompanyDataId);
  const { postId } = useParams();
  const userVisitCount = localStorage.getItem("userVisit");
  const [popupOpen, setPopupOpen] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState(false);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const [getSavedPostData, setgetSavedPostData] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState({
    userId: "",
    postId: "",
    designation: "",
    startUpCompanyName: "",
    investorCompanyName: "",
    profilePicture: "",
    description: "",
    firstName: "",
    lastName: "",
    oneLinkId: "",
    video: "",
    image: "",
    documentName: "",
    documentUrl: "",
    createdAt: "",
    likes: "",
    response: "",
    repostLoading: "",
    resharedPostId: "",
    isSubscribed:false
  });
  const dispatch = useDispatch();
  const isInvestorCreatePostModalOpen = useSelector(
    selectInvestorCreatePostModal
  );

  useEffect(() => {
    if (Number(userVisitCount) <= 1) {
      dispatch(setShowOnboarding(true));
    }
  }, []);
  useEffect(() => {
    setPopupOpen(isInvestorCreatePostModalOpen);
  }, [isInvestorCreatePostModalOpen]);

  const openPopup = () => {
    setPopupOpen(!popupOpen);
  };

  const appendDataToAllPosts = (data) => {
    setAllPosts([data, ...allPosts]);
  };

  const deletePostFilterData = (postId) => {
    const filteredPosts = allPosts.filter((post) => post._id !== postId);
    setAllPosts(filteredPosts);
  };

  useEffect(() => {
    dispatch(setPageTitle("Home"));
    document.title = "Home | Investors - The Capital Hub";

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

  const fetchMorePosts = () => {
    getAllPostsAPI(page)
      .then(({ data }) => {
        if (data?.length === 0) {
          setHasMore(false);
        } else {
          const totalPost = data.filter((item) => item?.postType !== "company");
          const post = allPosts.filter((item) => item?.postType !== "company");
          setAllPosts([...post, ...totalPost]);
          setPage(page + 1);
        }
      })
      .catch((err) => {
        setHasMore(false);
        console.log(err);
      })
      .finally(() => setLoadingFeed(false));
  };

  useEffect(() => {
    getSavedPostCollections(loggedInUserId)
      .then((data) => {
        setgetSavedPostData(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
    fetchMorePosts();
  }, [newPost, loggedInUserId]);

  // Repost
  const [repostLoading, setRepostLoading] = useState({
    instant: false,
    withThoughts: false,
  });
  const [respostingPostId, setRepostingPostId] = useState("");

  const repostInstantly = (resharedPostId) => {
    setRepostLoading({ ...repostLoading, instant: true });
    postUserPost({ resharedPostId })
      .then(() => fetchMorePosts())
      .catch((err) => console.log(err))
      .finally(() => setRepostLoading({ ...repostLoading, instant: false }));
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const showPopup = queryParams.get("showPopup") === "true";

  useEffect(() => {
    if (showPopup) {
      setPopupOpen(true);
      const urlWithoutQuery = location.pathname;
      window.history.replaceState({}, "", urlWithoutQuery);
    }
  }, [location]);

  return (
    <MaxWidthWrapper>
      <div className="investor_feed_container">
        {postId ? (
          <PostDetail
            userId={postData.userId}
            postId={postId}
            designation={postData.designation}
            startUpCompanyName={postData.startUp}
            investorCompanyName={postData.investor}
            profilePicture={postData.profilePicture}
            description={postData.description}
            firstName={postData.firstName}
            lastName={postData.lastName}
            oneLinkId={postData.oneLinkId}
            video={postData.video}
            image={postData.image}
            documentName={postData.documentName}
            documentUrl={postData.documentUrl}
            createdAt={postData.createdAt}
            likes={postData.likes}
            resharedPostId={postData.resharedPostId}
            fetchAllPosts={fetchMorePosts}
            response={getSavedPostData}
            repostWithToughts={(resharedPostId) => {
              setRepostingPostId(resharedPostId);
              openPopup();
            }}
            repostInstantly={repostInstantly}
            repostLoading={repostLoading}
            deletePostFilterData={deletePostFilterData}
            setPostData={setPostData}
            isSubscribed = {postData.isSubscribed}
          />
        ) : (
          <div className="main_content">
            {/* <InvestorSmallProfilecard text={"Home"} /> */}
            <div className="posts_col d-flex flex-column gap-3">
              {/* Onboarding popup */}
              <TutorialTrigger steps={investorOnboardingSteps.homePage} />

              {/* Write a post */}
              <div className="box start_post_container border">
                <img
                  src={userProfilePicture}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ objectFit: "cover" }}
                />
                 
                <div className="w-100 me-4" onClick={openPopup}>
                  <input
                    className="px-3"
                    type="text"
                    placeholder="Write a post..."
                    style={{ pointerEvents: "none" }}
                  />
                </div>
              </div>
              <InfiniteScroll
                  dataLength={allPosts.length}
                  next={fetchMorePosts}
                  hasMore={hasMore}
                  loader={
                    <p className="spinner_loader container p-5 text-center my-5 rounded-4 shadow">
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border text-secondary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </p>
                  }
                >
                  {allPosts?.map((post) => {
                    if (!post || !post.user) {
                      return null;
                    }
                    const {
                      description,
                      user: {
                        firstName,
                        lastName,
                        designation,
                        profilePicture,
                        _id: userId,
                        startUp,
                        investor,
                        oneLinkId,
                        isSubscribed
                      },
                      video,
                      image,
                      documentUrl,
                      documentName,
                      createdAt,
                      likes,
                      _id,
                      resharedPostId,
                    } = post;
                    return (
                      <InvestorFeedPostCard
                        key={_id} // Ensure this is a unique key
                        userId={userId}
                        postId={_id}
                        designation={designation}
                        profilePicture={profilePicture}
                        description={description}
                        startUpCompanyName={startUp}
                        investorCompanyName={investor}
                        firstName={firstName}
                        lastName={lastName}
                        oneLinkId={oneLinkId}
                        video={video}
                        image={image}
                        documentName={documentName}
                        documentUrl={documentUrl}
                        createdAt={createdAt}
                        likes={likes}
                        fetchAllPosts={fetchMorePosts}
                        response={getSavedPostData}
                        repostWithToughts={(resharedPostId) => {
                          setRepostingPostId(resharedPostId);
                          openPopup();
                        }}
                        repostInstantly={repostInstantly}
                        repostLoading={repostLoading}
                        resharedPostId={resharedPostId}
                        deletePostFilterData={deletePostFilterData}
                        setPostData={setPostData}
                        isSubscribed={isSubscribed||false}
                      />
                    );
                  })}
                </InfiniteScroll>

            </div>
          </div>
        )}
        <div className="right_content d-none d-xl-block">
          <InvestorRightProfileCard />
          <RecommendationCard isInvestor={true} />
          <NewsCorner />
        </div>
      </div>
      {popupOpen && (
        <InvestorCreatePostPopUp
          setPopupOpen={setPopupOpen}
          popupOpen
          setNewPost={setNewPost}
          respostingPostId={respostingPostId}
          appendDataToAllPosts={appendDataToAllPosts}
        />
      )}
    </MaxWidthWrapper>
  );
}

export default Home;
