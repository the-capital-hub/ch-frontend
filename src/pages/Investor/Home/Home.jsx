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
import NewsCard from "./Components/NewsCard/NewsCard";
import {environment} from "../../../environments/environment"
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

const baseUrl = environment.baseUrl;


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
  const [newsData, setNewsData] = useState([]);
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
    images: "",
    documentName: "",
    documentUrl: "",
    createdAt: "",
    likes: "",
    response: "",
    repostLoading: "",
    resharedPostId: "",
    isSubscribed:false,
    pollOptions: "",
    location: "",
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
          console.log();
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
        console.log();
      })
      .finally(() => setLoadingFeed(false));
  };

  useEffect(() => {
    getSavedPostCollections(loggedInUserId)
      .then((data) => {
        setgetSavedPostData(data);
      })
      .catch((error) => {
        console.log();
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
      .catch((err) => console.log())
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

  //Fetching NEWS
  useEffect(() => {
    const fetchNews = async () => {
        try {
          const response = await fetch(`${baseUrl}/news/getTodaysNews`);
          const data = await response.json();
          const filteredArticles = data?.articles?.filter(article => 
            article?.title && 
            article?.description && 
            article?.url && 
            article?.urlToImage && 
            article?.publishedAt
          ) || [];
          setNewsData(filteredArticles);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    fetchNews();
}, []);

  const handlePollVote = async (postId, optionId) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${baseUrl}/api/posts/vote`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          postId, 
          optionId,
          userId: loggedInUserId
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Error voting for poll');
      }

      // Update the posts state while preserving all post data
      setAllPosts(prevPosts => 
        prevPosts.map(post => {
          if (post._id === postId) {
            return {
              ...post,                    // Keep all existing post data
              pollOptions: result.data    // Update only the poll options
            };
          }
          return post;
        })
      );

      // Return the updated poll options for the InvestorFeedPostCard component
      return result.data;

    } catch (error) {
      console.error('Error voting for poll:', error);
      throw error;
    }
  };

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
            images= {postData.images}
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
            pollOptions={postData.pollOptions}
            handlePollVote={handlePollVote}
            location={postData.location}
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
                    <div className="spinner_loader container p-5 text-center my-5 rounded-4 shadow">
                      <div className="d-flex justify-content-center">
                        <div className="spinner-border text-secondary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                  }
                >
                  {allPosts?.map(({
                    description,
                    user,
                    video,
                    image,
                    images,
                    documentUrl,
                    documentName,
                    createdAt,
                    likes,
                    _id,
                    resharedPostId,
                    pollOptions,
                  }, index) => {
                    if (!user) return null;

                    const {
                      firstName,
                      lastName,
                      location,
                      designation,
                      profilePicture,
                      _id: userId,
                      startUp,
                      investor,
                      oneLinkId,
                      isSubscribed,
                    } = user;

                    return (
                      <React.Fragment key={_id}>
                        <InvestorFeedPostCard
                          key={_id}
                          userId={userId}
                          postId={_id}
                          designation={designation}
                          startUpCompanyName={startUp}
                          investorCompanyName={investor}
                          profilePicture={profilePicture}
                          description={description}
                          firstName={firstName}
                          lastName={lastName}
                          oneLinkId={oneLinkId}
                          pollOptions={pollOptions}
                          handlePollVote={handlePollVote}
                          video={video}
                          image={image}
                          images={images}
                          location={location}
                          documentName={documentName}
                          documentUrl={documentUrl}
                          createdAt={createdAt}
                          likes={likes}
                          resharedPostId={resharedPostId}
                          fetchAllPosts={fetchMorePosts}
                          response={getSavedPostData}
                          repostWithToughts={(resharedPostId) => {
                            setRepostingPostId(resharedPostId);
                            setPopupOpen(true);
                          }}
                          repostInstantly={repostInstantly}
                          repostLoading={repostLoading}
                          deletePostFilterData={deletePostFilterData}
                          setPostData={setPostData}
                          isSubscribed={isSubscribed}
                        />
                        {(index + 1) % 3 === 0 && (
                          <NewsCard 
                            title={newsData[Math.floor(index)]?.title} 
                            description={newsData[Math.floor(index)]?.description} 
                            url={newsData[Math.floor(index)]?.url} 
                            urlToImage={newsData[Math.floor(index)]?.urlToImage} 
                            publishedAt={newsData[Math.floor(index)]?.publishedAt} 
                          />
                        )}
                      </React.Fragment>
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
