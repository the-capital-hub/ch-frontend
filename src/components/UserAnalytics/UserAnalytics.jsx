import React, { useState, useEffect } from "react";
import { FaRegCommentAlt, FaRegEye, FaUserFriends } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectTheme } from "../../Store/features/design/designSlice";
import { environment } from "../../environments/environment";
import "./AnalyticsCard.scss";

const Spinner = () => (
	<div className="loader-container">
		<div className="loader">
			<div className="loader-inner"></div>
		</div>
	</div>
);

const AnalyticsCard = () => {
	const theme = useSelector(selectTheme);
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const token = localStorage.getItem("accessToken");

	const [loading, setLoading] = useState(true);
	const [selectedFilter, setSelectedFilter] = useState("7days");
	const [userData, setUserData] = useState(null);
	const [postsData, setPostsData] = useState(null);
	const [userPublicProfileViews, setUserPublicProfileViews] = useState(0);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`${environment.baseUrl}/api/posts/user_post`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const data = await response.json();
				setUserData(data.data?.userData);
				setPostsData(data.data?.allPosts);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching user data:", error);
				setLoading(false);
			}
		};
		fetchUserData();
	}, [loggedInUser._id]);

	useEffect(() => {
		const data = async () => {
			setLoading(true);
			const response = await fetch(
				`${environment.baseUrl}/users/getUserProfileViews/${loggedInUser._id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = await response.json();
			console.log("getUserProfileViews", data);
			if (data.status === 404) {
				setUserPublicProfileViews(0);
				setLoading(false);
			} else {
				setUserPublicProfileViews(data?.data?.publicProfileViews);
				setLoading(false);
			}
		};
		data();
	}, []);

	// useEffect(() => {
	// 	const data = async () => {
	// 		const response = await fetch(
	// 			`${environment.baseUrl}/users/getUserAnalytics/${loggedInUser._id}`,
	// 			{
	// 				method: "GET",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 			}
	// 		);
	// 		const data = await response.json();
	// 		console.log("data", data);
	// 	};
	// 	data();
	// }, []);

	if (loading || !userData || !postsData) {
		return <Spinner />;
	}

	// Function to calculate analytics data
	const calculateAnalyticsData = (postsData) => {
		const now = Date.now();
		const connections = userData?.connections || [];

		const getFilteredPostsComments = (posts, daysAgo) => {
			return posts
				?.filter(
					(post) =>
						new Date(post.createdAt).getTime() >
						now - daysAgo * 24 * 60 * 60 * 1000
				)
				.reduce((total, post) => total + (post.comments?.length || 0), 0);
		};

		const getFilteredPostsCount = (posts, daysAgo) => {
			return (
				posts?.filter(
					(post) =>
						new Date(post.createdAt).getTime() >
						now - daysAgo * 24 * 60 * 60 * 1000
				).length || 0
			);
		};

		const analyticsData = {
			"7days": {
				comments: getFilteredPostsComments(postsData, 7),
				posts: getFilteredPostsCount(postsData, 7),
				profileViews:
					userPublicProfileViews && userPublicProfileViews
						? userPublicProfileViews
						: 0,
				followers: connections.length,
			},
			"17days": {
				comments: getFilteredPostsComments(postsData, 17),
				posts: getFilteredPostsCount(postsData, 17),
				profileViews:
					userPublicProfileViews && userPublicProfileViews
						? userPublicProfileViews
						: 0,
				followers: connections.length,
			},
			"1month": {
				comments: getFilteredPostsComments(postsData, 30),
				posts: getFilteredPostsCount(postsData, 30),
				profileViews:
					userPublicProfileViews && userPublicProfileViews
						? userPublicProfileViews
						: 0,
				followers: connections.length,
			},
			"1year": {
				comments: getFilteredPostsComments(postsData, 365),
				posts: getFilteredPostsCount(postsData, 365),
				profileViews:
					userPublicProfileViews && userPublicProfileViews
						? userPublicProfileViews
						: 0,
				followers: connections.length,
			},
		};

		return analyticsData;
	};

	const analyticsData = calculateAnalyticsData(postsData);

	const handleFilterChange = (filter) => {
		setSelectedFilter(filter);
	};

	return (
		<div className={`analytics-card ${theme === "dark" ? " dark-theme" : ""}`}>
			<div className="analytics-header">
				<h2>Analytics</h2>
				<div className="filter-options">
					<button
						className={selectedFilter === "7days" ? "active" : ""}
						onClick={() => handleFilterChange("7days")}
					>
						Last 7 days
					</button>
					<button
						className={selectedFilter === "17days" ? "active" : ""}
						onClick={() => handleFilterChange("17days")}
					>
						Last 17 days
					</button>
					<button
						className={selectedFilter === "1month" ? "active" : ""}
						onClick={() => handleFilterChange("1month")}
					>
						1 month
					</button>
					<button
						className={selectedFilter === "1year" ? "active" : ""}
						onClick={() => handleFilterChange("1year")}
					>
						1 year
					</button>
				</div>
			</div>
			<div className="analytics-content">
				<div className="analytics-item">
					<FaRegCommentAlt className="icon" />
					<span className="value">
						{analyticsData[selectedFilter].comments}
					</span>
					<span className="label">Comments</span>
				</div>
				<div className="analytics-item">
					<FaRegEye className="icon" />
					<span className="value">{analyticsData[selectedFilter].posts}</span>
					<span className="label">Posts</span>
				</div>
				<div className="analytics-item">
					<FaRegEye className="icon" />
					<span className="value">
						{analyticsData[selectedFilter].profileViews}
					</span>
					<span className="label">Profile Views</span>
				</div>
				<div className="analytics-item">
					<FaUserFriends className="icon" />
					<span className="value">
						{analyticsData[selectedFilter].followers}
					</span>
					<span className="label">Followers</span>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsCard;
