import React, { useEffect, useState } from "react";
import "./feed.scss";
// import profilePic from "../../../Images/investorIcon/profilePic.webp";
import SmallProfileCard from "../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import RightProfileCard from "../InvestorGlobalCards/RightProfileCard/RightProfileCard";
import FeedPostCard from "../Cards/FeedPost/FeedPostCard";
import CreatePostPopUp from "../../PopUp/CreatePostPopUp/CreatePostPopUp";
import {
	getAllPostsAPI,
	getSavedPostCollections,
	postUserPost,
} from "../../../Service/user";
import { useDispatch, useSelector } from "react-redux";
import NewsCorner from "../InvestorGlobalCards/NewsCorner/NewsCorner";
import RecommendationCard from "../InvestorGlobalCards/Recommendation/RecommendationCard";
import { useLocation } from "react-router-dom";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import {
	setPageTitle,
	selectCreatePostModal,
	toggleCreatePostModal,
	setShowOnboarding,
} from "../../../Store/features/design/designSlice";
import { startupOnboardingSteps } from "../../OnBoardUser/steps/startup";
import TutorialTrigger from "../../Shared/TutorialTrigger/TutorialTrigger";
import LookingForFund from "./Components/LookingForFund/LookingForFund";
import ShareThoughts from "./Components/ShareYourThoughts/ShareThoughts";
import { environment } from "../../../environments/environment";
import { useParams } from "react-router-dom";
import PostDetail from "../Cards/FeedPost/PostDetail";
import ArticlePopup from "../../PopUp/ArticlePopup/ArticlePopup";
import NewsCard from "./Components/NewsCard/NewsCard";
import LatestResources from "./Components/LatestResources/LatestResources";
import Milestone from "../../Milestone/Milestone";
import UserJourney from "../../Milestone/UserJourney";
import NewsHorizontal from "./Components/NewsCardHorizontal/News";
import SkeletonLoader from "./Components/SkeletonLoader/SkeletonLoader";
import JoinHustlersClub from "./Components/JoinHustlersClub/JoinHustlersClub";
import TopVoiceTracker from "./Components/TopVoiceTracker/TopVoiceTracker";

const baseUrl = environment.baseUrl;

const Feed = () => {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const isCreatePostModalOpen = useSelector(selectCreatePostModal);
	const { postId } = useParams();
	const dispatch = useDispatch();
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
		images: [],
		documentName: "",
		documentUrl: "",
		createdAt: "",
		likes: "",
		response: "",
		repostLoading: "",
		resharedPostId: "",
		isSubscribed: false,
		pollOptions: "",
		location: "",
	});
	const [newsData, setNewsData] = useState([]);
	const [popupOpen, setPopupOpen] = useState(false);
	const [allPosts, setAllPosts] = useState([]);
	const [newPost, setNewPost] = useState(false);
	const userVisitCount = localStorage.getItem("userVisit");
	//const [loadingFeed, setLoadingFeed] = useState(false);
	const [articlePopup, setArticlePopup] = useState(false);
	const [getSavedPostData, setgetSavedPostData] = useState("");
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [pollOptions, setPollOptions] = useState("");

	console.log("allPosts", allPosts);

	useEffect(() => {
		if (Number(userVisitCount) <= 1) {
			dispatch(setShowOnboarding(true));
		}
	}, []);
	useEffect(() => {
		setPopupOpen(isCreatePostModalOpen);
	}, [isCreatePostModalOpen]);

	//Fetching NEWS
	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await fetch(`${baseUrl}/news/getTodaysNews`);
				const data = await response.json();
				const filteredArticles =
					data?.articles?.filter(
						(article) =>
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

	// Methods
	const openPopup = () => {
		setPopupOpen(!popupOpen);
		dispatch(toggleCreatePostModal());
	};

	const appendDataToAllPosts = (data) => {
		setAllPosts((prevPosts) => [data, ...prevPosts]);
	};

	const deletePostFilterData = (postId) => {
		const filteredPosts = allPosts.filter((post) => post._id !== postId);
		setAllPosts(filteredPosts);
	};

	const fetchMorePosts = () => {
		getAllPostsAPI(page)
			.then(({ data }) => {
				if (data?.length === 0) {
					setHasMore(false);
				} else {
					const totalPost = data.filter((item) => item.postType !== "company");
					if (totalPost.length === 0) {
						setHasMore(false);
					}
					setAllPosts((prevPosts) => [...prevPosts, ...totalPost]);
					setPage((prevPage) => prevPage + 1);
				}
			})
			.catch((err) => {
				setHasMore(false);
				console.log(err);
			});
	};
	const handlePollVote = async (postId, optionId) => {
		try {
			const token = localStorage.getItem("accessToken");
			const response = await fetch(`${baseUrl}/api/posts/vote`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					postId,
					optionId,
					userId: loggedInUser._id,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.message || "Error voting for poll");
			}

			// Update the posts state while preserving all post data
			setAllPosts((prevPosts) =>
				prevPosts.map((post) => {
					if (post._id === postId) {
						return {
							...post, // Keep all existing post data
							pollOptions: result.data, // Update only the poll options
						};
					}
					return post;
				})
			);

			// Return the updated poll options for the FeedPostCard component
			return result.data;
		} catch (error) {
			console.error("Error voting for poll:", error);
			throw error;
		}
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

	useEffect(() => {
		getSavedPostCollections(loggedInUser._id).then((data) => {
			setgetSavedPostData(data);
		});
		fetchMorePosts();
	}, []);
	// newPost

	useEffect(() => {
		document.title = "Home | The Capital Hub";
		dispatch(setPageTitle("Home"));
	}, [dispatch]);

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

	return (
		<MaxWidthWrapper>
			<div className="mx-0 feed_container">
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
						images={postData.images}
						documentName={postData.documentName}
						documentUrl={postData.documentUrl}
						createdAt={postData.createdAt}
						likes={postData.likes}
						location={postData.location}
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
						isSubscribed={postData.isSubscribed}
						pollOptions={postData.pollOptions}
						handlePollVote={handlePollVote}
						postData={postData}
					/>
				) : (
					<div className="main_content">
						{/* {console.log("post ka hai ye data", postData)} */}
						<div className="Posts__column d-flex flex-column gap-2">
							{/* Small Profile Card */}
							<SmallProfileCard className="d-none d-md-block" text={"Home"} />

							{/* Onboarding popup */}
							{/* <TutorialTrigger steps={startupOnboardingSteps.homePage} /> */}

							{/* Looking for funding */}
							{/* <LookingForFund /> */}

							{/* <LookingForFund /> */}
							{/* <LatestResources /> */}

							{/* Hustlers club banner */}
							<JoinHustlersClub />

							{/* Write a Post */}
							<div
								className="rounded-2 start_post_container"
								style={{ flexDirection: "column" }}
							>
								<div className="start_post_container" style={{ width: "100%" }}>
									<img
										src={loggedInUser.profilePicture}
										alt="Profile"
										className="rounded-circle object-fit-cover"
										style={{ width: "50px", height: "50px" }}
									/>
									<div
										className="w-auto flex-grow-1 me-4"
										onClick={openPopup}
										style={{ cursor: "pointer" }}
									>
										<input
											className="px-3 flex-grow-1"
											type="text"
											placeholder="Write a post..."
											style={{ pointerEvents: "none" }}
										/>
									</div>
								</div>
							</div>

							{/* Share your thoughts */}
							<ShareThoughts />

							{/* Posts container - column of <FeedPostCard /> */}
							<div className="posts__container d-flex flex-column gap-3">
								<InfiniteScroll
									className="m-0 p-0"
									dataLength={allPosts.length}
									next={fetchMorePosts}
									hasMore={hasMore}
									loader={
										<SkeletonLoader />
										// <div className="loader_spinner container p-5 text-center my-5  rounded-5 shadow-sm ">
										// 	<SpinnerBS colorClass={"d-l-grey"} />
										// </div>
									}
								>
									{allPosts?.map(
										(
											{
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
											},
											index
										) => {
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
												<React.Fragment key={_id}>
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
															openPopup();
														}}
														repostInstantly={repostInstantly}
														repostLoading={repostLoading}
														deletePostFilterData={deletePostFilterData}
														setPostData={setPostData}
														isSubscribed={isSubscribed}
														isTopVoice={isTopVoice}
													/>
													{(index + 1) % 3 === 0 && (
														<NewsCard
															title={newsData[Math.floor(index)]?.title}
															description={
																newsData[Math.floor(index)]?.description
															}
															url={newsData[Math.floor(index)]?.url}
															urlToImage={
																newsData[Math.floor(index)]?.urlToImage
															}
															publishedAt={
																newsData[Math.floor(index)]?.publishedAt
															}
														/>
													)}
													{index === 1 && (
														<NewsHorizontal newsData={newsData} />
													)}
												</React.Fragment>
											);
										}
									)}
								</InfiniteScroll>
							</div>
						</div>
						{popupOpen && (
							<CreatePostPopUp
								setPopupOpen={setPopupOpen}
								popupOpen
								setNewPost={setNewPost}
								respostingPostId={respostingPostId}
								appendDataToAllPosts={appendDataToAllPosts}
							/>
						)}
						{articlePopup && (
							<ArticlePopup
								setArticlePopup={setArticlePopup}
								articlePopup={articlePopup}
								setNewPost={setNewPost}
								respostingPostId={respostingPostId}
								appendDataToAllPosts={appendDataToAllPosts}
							/>
						)}
					</div>
				)}
				<div className="right_content">
					<div className="right_content_wrapper">
						<RightProfileCard />
						<TopVoiceTracker />
						<Milestone />
						<UserJourney />
						<NewsCorner />
						<RecommendationCard />
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default Feed;
