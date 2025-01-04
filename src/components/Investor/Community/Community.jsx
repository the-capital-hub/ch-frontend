import "./Community.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { environment } from "../../../environments/environment";
import {
	Link,
	// useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { setThemeColor } from "../../../utils/setThemeColor";
import { useParams } from "react-router-dom";
import axios from "axios";
import FeedPostCard from "../Cards/FeedPost/FeedPostCard"
import CreatePostPopUp from "../../PopUp/CreatePostPopUp/CreatePostPopUp"
import {
	selectIsInvestor,
	selectLoggedInUserId,
} from "../../../Store/features/user/userSlice";

import { selectTheme } from "../../../Store/features/design/designSlice";
import InvestorNavbar from "../../../components/Investor/InvestorNavbar/InvestorNavbar";
import OnboardingSwitch from "../InvestorNavbar/OnboardingSwitch/OnboardingSwitch";
import { getAllPostsAPI } from "../../../Service/user";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonLoader from "../Feed/Components/SkeletonLoader/SkeletonLoader";
import UpdateCommunityForm from "./UpdateCommunityForm";
import EventsList from "../../Meetings/Events/MeetingEvents";
import PeopleTab from "./PeopleTab/PeopleTab";
import Products from "./Products/Products";
import About from './About/About';
import { Toaster, toast } from "react-hot-toast";
import { MdMenu, MdMenuOpen } from "react-icons/md";


const Community = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const paramUserId = searchParams.get("userId");
	const isCommunityOpen = searchParams.get("isCommunityOpen");
	const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


	// Fetch global state
	const loggedInUserId = useSelector(selectLoggedInUserId);
	const isInvestor = useSelector(selectIsInvestor);
	const theme = useSelector(selectTheme);


   const { communityId } = useParams();
   const [posts, setPosts] = useState([]);
   const [community, setCommunity] = useState(null);
   const [activeTab, setActiveTab] = useState("home");
   const [popupOpen, setPopupOpen] = useState(false);
	const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);

	// New Fetch call
	useEffect(() => {
		document.title = "Community | The Capital Hub";
		window.scrollTo({ top: 0, behavior: "smooth" });
		function handleWindowResize() {
			const isMobile = window.innerWidth <= 820;
			setIsMobileView(isMobile);
		}
		window.addEventListener("resize", handleWindowResize);
		handleWindowResize();

		setThemeColor();

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);


  useEffect(() => {
        fetchCommunityDetails();
      }, [communityId]);

    
      const fetchCommunityDetails = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${environment.baseUrl}/communities/getCommunityById/${communityId}`
          );
          setCommunity(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error("Error fetching community:", error);
        }
      };
  
    
      const isAdmin = community?.adminId._id === loggedInUserId;
    
      // const openCreatePostPopup = () => {
      //   setPopupOpen(true);
      //   dispatch(toggleCreatePostModal());
      // };
  
    
      const [page, setPage] = useState(1);
      const [hasMore, setHasMore] = useState(true);
      const [allPosts, setAllPosts] = useState([]);

      // Add this function to fetch community posts
      const fetchMorePosts = () => {
        getAllPostsAPI(page)
          .then(({ data }) => {
            if (data?.length === 0) {
              setHasMore(false);
            } else {
              // Filter posts for this community
              const communityPosts = data.filter(
                (item) => 
                  item.postType === "community" && 
                  item.communityId === community?._id
              );
              
              if (communityPosts.length === 0) {
                setHasMore(false);
              }
              setAllPosts((prevPosts) => [...prevPosts, ...communityPosts]);
              setPage((prevPage) => prevPage + 1);
            }
          })
          .catch((err) => {
            setHasMore(false);
            console.log(err);
          });
      };

      // Add this function to handle poll votes
      const handlePollVote = async (postId, optionId) => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await fetch(`${environment.baseUrl}/api/posts/vote`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              postId,
              optionId,
              userId: loggedInUserId,
            }),
          });

          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || "Error voting for poll");
          }

          setAllPosts((prevPosts) =>
            prevPosts.map((post) => {
              if (post._id === postId) {
                return {
                  ...post,
                  pollOptions: result.data,
                };
              }
              return post;
            })
          );

          return result.data;
        } catch (error) {
          console.error("Error voting for poll:", error);
          throw error;
        }
      };

      // Add this effect to fetch initial posts
      useEffect(() => {
        if (community?._id) {
          fetchMorePosts();
        }
      }, [community]);

      // Add this function to append new posts
      const appendDataToAllPosts = (data) => {
        setAllPosts((prevPosts) => [data, ...prevPosts]);
      };

      // Add this function to delete posts
      const deletePostFilterData = (postId) => {
        const filteredPosts = allPosts.filter((post) => post._id !== postId);
        setAllPosts(filteredPosts);
      };

      const [repostingPostId, setRepostingPostId] = useState("");
      const [postData, setPostData] = useState({});
      const [repostLoading, setRepostLoading] = useState(false);
      const [getSavedPostData, setGetSavedPostData] = useState("");

      const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === "settings") {
          setShowSettings(true);
        } else {
          setShowSettings(false);
        }
      };

      const renderTabContent = () => {
        switch (activeTab) {
          case "home":
            return (
              <>
                <div className="create-post">
                  <img src={community?.image} alt="Community" />
                  <input 
                    type="text" 
                    placeholder="Share your thoughts with the community..."
                    onClick={() => setPopupOpen(true)}
                  />
                </div>
                <div className="posts-container">
                  <InfiniteScroll
                    className="m-0 p-0"
                    dataLength={allPosts.length}
                    next={fetchMorePosts}
                    hasMore={hasMore}
                    loader={<SkeletonLoader />}
                  >
                    {allPosts?.map(
                      ({
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
                        allow_multiple_answers,
                      }) => {
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
                          isTopVoice,
                        } = user;

                        return (
                          <FeedPostCard
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
                            allow_multiple_answers={allow_multiple_answers}
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
                            repostInstantly={(resharedPostId) => {
                              // Define repostInstantly function if needed
                              // Implement repost logic here
                            }}
                            repostLoading={repostLoading}
                            deletePostFilterData={deletePostFilterData}
                            setPostData={setPostData}
                            isSubscribed={isSubscribed}
                            isTopVoice={isTopVoice}
                            communityId = {community._id}
                          />
                        );
                      }
                    )}
                  </InfiniteScroll>
                </div>
              </>
            );
          case "settings":
            return <UpdateCommunityForm community={community} />;
          case "about":
            return <About community={community} />;
          case "events":
            return <EventsList communityId={community._id}/>
          case "people":
            return <PeopleTab community={community} />;
          case "products":
            return <Products community={community} />;  
          default:
            return <div>Content coming soon...</div>;
        }
      };

      const handlePostCreated = (newPost) => {
        setAllPosts(prevPosts => [newPost, ...prevPosts]);
        setPopupOpen(false);
        toast.success('Post created successfully!');
      };

      return (
        <div className="community-page" data-bs-theme={theme}>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <InvestorNavbar isCommunity={true} />
          <div className="community-header">
            <div className="community-info">
              <div className="info-wrapper">
              {isMobileView && (
                  !isSidebarOpen ? (
                    <MdMenu
                      size={25}
                      style={{
                        color: "var(--d-l-grey)",
                      }}
                      onClick={() => setIsSidebarOpen(prevState => !prevState)}
                    />
                  ) : (
                    <MdMenuOpen
                      size={25}
                      style={{
                        color: "var(--d-l-grey)",
                      }}
                      onClick={() => setIsSidebarOpen(prevState => !prevState)}
                    />
                  )
                )}

                <img src={community?.image} alt={community?.name} />
                <div className="info-text">
                  <h1>{community?.name}</h1>
                  <p>{community?.description}</p>
                  <div className="stats">
                    <span>{community?.members?.length + 1} members</span>
                    <span>{allPosts.length} posts</span>
                  </div>
                </div>
              </div>
              <OnboardingSwitch/>
            </div>
          </div>
    
          <div className="community-content">
            <aside className={`sidebar ${isMobileView ? (isSidebarOpen ? 'open' : 'closed') : ''}`}>
    
              <nav>
                <button 
                  className={activeTab === "home" ? "active" : ""} 
                  onClick={() => handleTabChange("home")}
                >
                  Home
                </button>
                
                <button 
                  className={activeTab === "products" ? "active" : ""} 
                  onClick={() => handleTabChange("products")}
                >
                  Products
                </button>
                <button 
                  className={activeTab === "events" ? "active" : ""} 
                  onClick={() => handleTabChange("events")}
                >
                  Events
                </button>
                <button 
                  className={activeTab === "people" ? "active" : ""} 
                  onClick={() => handleTabChange("people")}
                >
                  People
                </button>
                <button 
                  className={activeTab === "about" ? "active" : ""} 
                  onClick={() => handleTabChange("about")}
                >
                  About
                </button>
                {isAdmin && (
                  <button 
                    className={activeTab === "settings" ? "active" : ""} 
                    onClick={() => handleTabChange("settings")}
                  >
                    Settings
                  </button>
                )}
              </nav>
            </aside>
    
            <div className="main-content">
              {renderTabContent()}
              {popupOpen && (
                <CreatePostPopUp
                  setPopupOpen={setPopupOpen}
                  popupOpen={popupOpen}
                  communityId={community?._id}
                  appendDataToAllPosts={handlePostCreated}
                />
              )}
            </div>
          </div>
        </div>
      );
}

export default Community;
  