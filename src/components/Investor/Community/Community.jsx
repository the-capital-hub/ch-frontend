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
import { IoFilter } from "react-icons/io5";
import JoinWhatsAppGroupPopup from "./JoinWhatsAppGroupPopup";
import avatar4 from "../../../Images/avatars/image-4.png";
import WhiteLogo from "../../../Images/investorIcon/logo-white.png";
import DarkLogo from "../../../Images/investorIcon/new-logo.png";
import { FaShareAlt } from "react-icons/fa";
import SharePopup from "../../PopUp/SocialSharePopup/SharePopup";

const WhatsAppBanner = ({ onClick, onClose }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		try {
			await onClick();
		} catch (error) {
			console.error("Failed to join WhatsApp group:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="whatsapp-banner">
			<div className="banner-content" onClick={handleClick}>
				<div className="banner-text">
					<img 
						src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
						alt="WhatsApp"
						className="whatsapp-icon"
					/>
					<div className="banner-message">
						<span className="title">Join our WhatsApp Community</span>
						<span className="subtitle">Get instant updates and connect with members</span>
					</div>
				</div>
				<button className="join-btn" disabled={isLoading}>
					{isLoading ? (
						<div className="spinner-border spinner-border-sm text-light" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					) : (
						'Join Now'
					)}
				</button>
			</div>
			<button className="close-btn" onClick={onClose} aria-label="Close">
				×
			</button>
		</div>
	);
};

const Community = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const paramUserId = searchParams.get("userId");
	const isCommunityOpen = searchParams.get("isCommunityOpen");
	const navigate = useNavigate();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWhatsAppBanner, setShowWhatsAppBanner] = useState(true);


	// Fetch global state
	const loggedInUserId = useSelector(selectLoggedInUserId);
	const isInvestor = useSelector(selectIsInvestor);
	const theme = useSelector(selectTheme);
	const loggedInUser = useSelector((state) => state.user.loggedInUser);


   const { communityId } = useParams();
   const [posts, setPosts] = useState([]);
   const [community, setCommunity] = useState(null);
   const [activeTab, setActiveTab] = useState("home");
   const [popupOpen, setPopupOpen] = useState(false);
	const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sharePopupOpen, setSharePopupOpen] = useState(false);
  const [communityUrl, setCommunityUrl] = useState('');

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
        setIsLoading(true);
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get(
            `${environment.baseUrl}/communities/getCommunityById/${communityId}`
          );
          setCommunity(response.data.data);
        } catch (error) {
          console.error("Error fetching community:", error);
        } finally {
          setIsLoading(false);
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

      const [filterType, setFilterType] = useState("all");
      const [showFilterDropdown, setShowFilterDropdown] = useState(false);

      const getFilteredPosts = useMemo(() => {
        switch (filterType) {
          case "admin":
            return allPosts.filter(post => post.user._id === community?.adminId._id);
          case "members":
            return allPosts.filter(post => post.user._id !== community?.adminId._id);
          default:
            return allPosts;
        }
      }, [allPosts, filterType, community]);

      const renderTabContent = () => {
        switch (activeTab) {
          case "home":
            return (
              <>
                {community?.whatsapp_group_link && showWhatsAppBanner && (
                  <WhatsAppBanner 
                    onClick={() => setShowWhatsAppPopup(true)} 
                    onClose={() => setShowWhatsAppBanner(false)}
                  />
                )}
                <div className="create-post">
                  <img src={loggedInUser?.profilePicture || avatar4} alt="Community" />
                  <input 
                    type="text" 
                    placeholder="Share your thoughts with the community..."
                    onClick={() => setPopupOpen(true)}
                  />
                  <button 
                    className="filter-button"
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  >
                    <IoFilter />
                  </button>
                  {showFilterDropdown && (
                    <div className="filter-dropdown">
                      <div className="filter-option" onClick={() => { setFilterType("all"); setShowFilterDropdown(false); }}>
                        All Posts
                      </div>
                      <div className="filter-option" onClick={() => { setFilterType("admin"); setShowFilterDropdown(false); }}>
                        Admin Posts
                      </div>
                      <div className="filter-option" onClick={() => { setFilterType("members"); setShowFilterDropdown(false); }}>
                        Member Posts
                      </div>
                    </div>
                  )}
                </div>
                <div className="posts-container">
                  <InfiniteScroll
                    className="m-0 p-0"
                    dataLength={getFilteredPosts.length}
                    next={fetchMorePosts}
                    hasMore={hasMore}
                    loader={<SkeletonLoader />}
                  >
                    {getFilteredPosts?.map(
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
                            profilePicture={profilePicture || avatar4}
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

      // Function to handle WhatsApp group join request
      const handleJoinWhatsAppGroup = async (phoneNumber) => {
        try {
          const token = localStorage.getItem("accessToken");
          const emailData = {
            name: loggedInUser.firstName + " " + loggedInUser.lastName,
            email: loggedInUser.email,
            phoneNumber: loggedInUser.phoneNumber,
            requestedNumber: phoneNumber,
            adminEmail: community?.adminId?.email,
          };

          const response = await axios.post(
            `${environment.baseUrl}/communities/sendJoinRequest`, 
            emailData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (response.status === 200) {
            toast.success("Join request sent successfully!");
            // Open WhatsApp link
            window.open(community.whatsapp_group_link, "_blank");
            // Small delay before closing popup and banner
            await new Promise(resolve => setTimeout(resolve, 1500));
            setShowWhatsAppPopup(false);
            setShowWhatsAppBanner(false);
          }
        } catch (error) {
          console.error("Error sending join request:", error);
          toast.error("Failed to send join request. Please try again.");
          throw error; // Propagate error to maintain loading state in popup
        }
      };

      const handleOpenSocialShare = (communityId) => {
        const baseUrl = window.location.origin;
        const communityUrl = `${baseUrl}/community/${encodeURIComponent(communityId)}`;
        setCommunityUrl(communityUrl);
        setSharePopupOpen(true);
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
          {!isLoading && community && (
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
                    <div className="title-with-share">
                      <h1>{community?.name}</h1>
                      <FaShareAlt 
                        className="share-icon"
                        onClick={() => handleOpenSocialShare(community?._id)}
                      />
                    </div>
                    <p>{community?.description}</p>
                    <div className="stats">
                      <span>{community?.members?.length + 1} members</span>
                      <span>{allPosts.length} posts</span>
                    </div>
                  </div>
                </div>
             {!isMobileView && <nav className="horizontal-menu">
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
                </nav>}
                <div className="right-elements">
                {!isMobileView && <OnboardingSwitch />}
                {!isMobileView && <Link to="/manage-account" className="profile-link">
                  <img 
                    src={loggedInUser?.profilePicture || avatar4} 
                    alt="Profile" 
                    className="profile-pic"
                  />
                </Link>}
                </div>
              </div>
            </div>
          )}
    
          <div className="community-content">
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
              {!isMobileView && (
                <Link to="/home" className="desktop-logo-link">
                  <img 
                    src={theme === "dark" ? WhiteLogo : DarkLogo} 
                    alt="The Capital Hub" 
                  />
                </Link>
              )}
            </div>
          </div>
          {showWhatsAppPopup && (
            <JoinWhatsAppGroupPopup 
              onClose={() => setShowWhatsAppPopup(false)} 
              onJoin={handleJoinWhatsAppGroup} 
            />
          )}
          {isMobileView && isSidebarOpen && (
            <div className="mobile-sidebar">
              <div className="sidebar-header">
                <Link to="/manage-account" className="profile-section">
                  <img 
                    src={loggedInUser?.profilePicture || avatar4} 
                    alt="Profile" 
                    className="profile-pic"
                  />
                  <div className="profile-info">
                    <h3>{loggedInUser?.firstName} {loggedInUser?.lastName}</h3>
                    <p>{loggedInUser?.designation}</p>
                  </div>
                </Link>
              </div>

              <div className="sidebar-onboarding">
                <OnboardingSwitch />
              </div>

              <nav className="sidebar-menu">
                <button 
                  className={activeTab === "home" ? "active" : ""} 
                  onClick={() => {
                    handleTabChange("home");
                    setIsSidebarOpen(false);
                  }}
                >
                  Home
                </button>
                <button 
                  className={activeTab === "products" ? "active" : ""} 
                  onClick={() => {
                    handleTabChange("products");
                    setIsSidebarOpen(false);
                  }}
                >
                  Products
                </button>
                <button 
                  className={activeTab === "events" ? "active" : ""} 
                  onClick={() => {
                    handleTabChange("events");
                    setIsSidebarOpen(false);
                  }}
                >
                  Events
                </button>
                <button 
                  className={activeTab === "people" ? "active" : ""} 
                  onClick={() => {
                    handleTabChange("people");
                    setIsSidebarOpen(false);
                  }}
                >
                  People
                </button>
                <button 
                  className={activeTab === "about" ? "active" : ""} 
                  onClick={() => {
                    handleTabChange("about");
                    setIsSidebarOpen(false);
                  }}
                >
                  About
                </button>
                {isAdmin && (
                  <button 
                    className={activeTab === "settings" ? "active" : ""} 
                    onClick={() => {
                      handleTabChange("settings");
                      setIsSidebarOpen(false);
                    }}
                  >
                    Settings
                  </button>
                )}
                  <Link to="/home" className="logo-link">
                  <img src={theme === "dark" ? WhiteLogo : DarkLogo} alt="The Capital Hub" />
                </Link>
              </nav>
            </div>
          )}
          <SharePopup 
            url={communityUrl} 
            isOpen={sharePopupOpen} 
            setIsOpen={setSharePopupOpen} 
          />
        </div>
      );
}

export default Community;
  