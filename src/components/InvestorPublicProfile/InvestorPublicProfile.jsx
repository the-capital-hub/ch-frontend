// FounderProfile.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaLinkedin,
	FaGlobe,
	FaGithub,
	FaMoon,
	FaSun,
	FaGraduationCap,
	FaBriefcase,
	FaRegComment,
	FaHeart,
	FaShare,
	FaArrowCircleLeft,
	FaClock,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../Store/features/design/designSlice";
import { environment } from "../../environments/environment";
import UserPic from "../../Images/UserPic.jpg";
import AIPoster from "../../Images/AIPoster.jpg";
import ImageCarousel from "../Investor/Cards/FeedPost/ImageCarousel/ImageCarousel";
import "./InvestorPublicProfile.scss";
import avatar4 from "../../Images/avatars/image.png";

const Spinner = () => (
	<div className="loader-container">
		<div className="loader">
			<div className="loader-inner"></div>
		</div>
	</div>
);

const FounderProfile = () => {
	const theme = useSelector(selectTheme);
	// const [theme, setTheme] = useState("dark");
	const [activeTab, setActiveTab] = useState("posts");
	const [activeInterestTab, setActiveInterestTab] = useState("Top Voices");
	const [founder, setFounder] = useState(null);
	const [post, setPost] = useState(null);
	// const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);

	const { username } = useParams();
	const navigate = useNavigate();
	// console.log("userName", username);
	console.log("founder", founder);
	console.log("post", post);
	// console.log("events", events);

	// Set initial theme when component mounts
	useEffect(() => {
		document.body.setAttribute("data-theme", "dark");
	}, []);

	// const toggleTheme = () => {
	// 	const newTheme = theme === "light" ? "dark" : "light";
	// 	setTheme(newTheme);
	// 	document.body.setAttribute("data-theme", newTheme);
	// };

	// /getUserByUserName - Founder data other than events
	useEffect(() => {
		const fetchFounderData = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`${environment.baseUrl}/users/getUserByUserName`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ username }),
					}
				);
				if (response.ok) {
					const data = await response.json();
					// console.log("User data", data);
					setLoading(false);
					setFounder(data.user);
					setPost(data.post);
				} else {
					setLoading(false);
					console.error("Failed to fetch founder data");
				}
			} catch (error) {
				setLoading(false);
				console.error("Error fetching founder data:", error);
			}
		};

		fetchFounderData();
	}, [username]);

	// /getEvents/:username - Events
	// useEffect(() => {
	// 	const fetchEvents = async () => {
	// 		setLoading(true);
	// 		try {
	// 			const response = await fetch(
	// 				`${environment.baseUrl}/meetings/getEvents/${username}`,
	// 				{
	// 					method: "GET",
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 					},
	// 				}
	// 			);
	// 			if (response.ok) {
	// 				const data = await response.json();
	// 				console.log("User events data", data);
	// 				const publicEvents = data.data.filter(
	// 					(event) => event.isPrivate === false
	// 				);
	// 				setLoading(false);
	// 				setEvents(publicEvents);
	// 				// setEvents(data.data);
	// 			} else {
	// 				setLoading(false);
	// 				console.error("Failed to fetch events");
	// 			}
	// 		} catch (error) {
	// 			setLoading(false);
	// 			console.error("Error fetching events:", error);
	// 		}
	// 	};

	// 	fetchEvents();
	// }, [username]);

	const dummyData = {
		name: "Sarah Chen",
		title: "Founder & CEO",
		company: "TechVision Labs",
		location: "San Francisco, CA",
		email: "sarah@techvision.com",
		joined: "March 2023",
		about:
			"Building the future of AI-powered analytics. Previously led product teams at major tech companies.",
		education: [
			{
				school: "Stanford University",
				degree: "Master of Science in Computer Science",
				year: "2018-2020",
			},
			{
				school: "UC Berkeley",
				degree: "Bachelor of Science in Computer Engineering",
				year: "2014-2018",
			},
		],
		experience: [
			{
				company: "TechVision Labs",
				role: "Founder & CEO",
				duration: "2023 - Present",
				description:
					"Leading the development of AI-powered analytics solutions.",
			},
			{
				company: "Google",
				role: "Senior Product Manager",
				duration: "2020 - 2023",
				description: "Led machine learning product initiatives.",
			},
		],
		activities: {
			posts: [
				{
					id: 1,
					content:
						"Excited to announce our new AI product launch! This is going to revolutionize how we think about machine learning applications in enterprise environments.",
					image: AIPoster,
					likes: 245,
					comments: 56,
					shares: 32,
					date: "2 days ago",
				},
				{
					id: 2,
					content:
						"Just finished speaking at the AI Summit 2024. Great discussions about the future of AI and ethics in technology.",
					likes: 189,
					comments: 43,
					shares: 21,
					date: "1 week ago",
				},
				{
					id: 3,
					content:
						"Reflecting on our first year of building TechVision Labs. What a journey it has been!",
					likes: 423,
					comments: 89,
					shares: 67,
					date: "2 weeks ago",
				},
			],
			comments: [
				{
					id: 1,
					postAuthor: "Elena Martinez",
					postContent:
						"Thoughts on the latest developments in quantum computing?",
					comment:
						"This is a fascinating development! At TechVision, we are closely watching quantum computing advances...",
					likes: 34,
					date: "3 days ago",
				},
				{
					id: 2,
					postAuthor: "James Wilson",
					postContent: "The future of AI regulation in Europe",
					comment:
						"Great analysis! We need to balance innovation with responsible development...",
					likes: 56,
					date: "1 week ago",
				},
			],
		},
		interests: {
			categories: [
				{
					title: "Top Voices",
					items: [
						{ name: "Melanie Mitchell", description: "AI Ethics" },
						{ name: "Andrew Ng", description: "Machine Learning" },
						{ name: "Kate Crawford", description: "AI Policy" },
						{ name: "Yann LeCun", description: "Deep Learning" },
						{ name: "Fei-Fei Li", description: "Computer Vision" },
					],
				},
				{
					title: "Companies",
					items: [
						{ name: "OpenAI", description: "AI Research" },
						{ name: "DeepMind", description: "AI Solutions" },
						{ name: "Anthropic", description: "AI Safety" },
						{ name: "Scale AI", description: "Data Platform" },
						{ name: "Cohere", description: "NLP Solutions" },
					],
				},
				{
					title: "Newsletters",
					items: [
						{ name: "The Algorithm", description: "MIT Tech Review" },
						{ name: "Import AI", description: "Weekly AI News" },
						{ name: "The Batch", description: "DeepLearning.AI" },
						{ name: "ML News", description: "Weekly Digest" },
						{ name: "AI Weekly", description: "Industry Updates" },
					],
				},
			],
		},
		publicLinks: {
			website: "https://techvisionlabs.com",
			linkedin: "https://linkedin.com/in/sarahchen",
			github: "https://github.com/sarahchen",
		},
	};

	const formatedDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(date).toLocaleDateString("en-IN", options);
	};

	const founderData = founder
		? {
				name: founder.firstName + " " + founder.lastName || dummyData.name,
				title: founder.designation || dummyData.title,
				company: founder?.startUp?.company || dummyData.company,
				location: founder?.startUp?.location || dummyData.location,
				email: founder.email || dummyData.email,
				joined: founder?.startUp?.startedAtDate || dummyData.joined,
				about: founder.bio || dummyData.about,
				profilePic: founder.profilePicture || avatar4, // Assuming a default empty string if not provided
				publicLinks: {
					website:
						founder?.startUp?.socialLinks?.website ||
						dummyData.publicLinks?.website,
					linkedin: founder.linkedin || dummyData.publicLinks.linkedin,
					github: founder?.startUp?.github || dummyData.publicLinks.github,
				},
				activities: {
					posts:
						post.map((post) => ({
							content: post.description
								? post.description.replace(/<[^>]*>/g, "")
								: "",
							image: post.image || "",
							images: post.images || [],
							like: post.likes && post.likes.length ? post.likes.length : 0, // Number of likes
							comments:
								post.comments && post.comments.length
									? post.comments.length
									: 0, // Number of comments
							shares: post.resharedCount || 0, // Use resharedCount for the number of shares, defaults to 0 if not present
							date: formatedDate(post.createdAt) || "",
						})) || dummyData.activities.posts,
					comments:
						(founder.comments || []).map((comment) => ({
							content: comment.description || "",
							date: comment.createdAt || "",
						})) || dummyData.activities.comments,
				},
				interests: {
					categories: founder.interests?.categories.length
						? founder.interests.categories
						: dummyData.interests.categories,
				},
		  }
		: dummyData;

	// console.log("founderData", founderData);

	const renderActivityContent = () => {
		if (activeTab === "posts") {
			return (
				<div className="posts-container">
					{founderData.activities.posts.map((post) => (
						<div key={post.id} className="post-card">
							<div className="post-content">
								<p>{post.content}</p>
								{/* Check for multiple images first */}
								{post.images && post.images.length > 0 ? (
									<ImageCarousel images={post.images} />
								) : (
									// If no multiple images, check for single image
									post.image && (
										<img
											src={post.image}
											alt="Post"
											className="post-image"
											style={{ width: "600px", height: "400px" }}
										/>
									)
								)}
							</div>
							<div className="post-stats">
								<span>
									<FaHeart /> {post.like}
								</span>
								<span>
									<FaRegComment /> {post.comments}
								</span>
								<span>
									<FaShare /> {post.shares}
								</span>
							</div>
							<span className="date">{post.date}</span>
						</div>
					))}
				</div>
			);
		}

		return (
			<div className="comments-container">
				{founderData.activities.comments.map((comment) => (
					<div key={comment.id} className="comment-card">
						<div className="comment-header">
							<span className="author">{comment.postAuthor}</span>
							<span className="post-preview">{comment.postContent}</span>
						</div>
						<p className="comment-content">{comment.comment}</p>
						<div className="comment-stats">
							<span>
								<FaHeart /> {comment.likes}
							</span>
							<span className="date">{comment.date}</span>
						</div>
					</div>
				))}
			</div>
		);
	};

	const handleMeetingClick = (meetingId) => {
		navigate(`/meeting/schedule/${username}/${meetingId}`);
	};

	const renderNoDataMessage = (section) => (
		<div className="no-data-message">
			<p>No {section} data available</p>
		</div>
	);

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<Helmet>
				<title>{`${founderData?.name} - ${founderData?.title}`}</title>
				<meta name="description" content={founderData?.about} />
				<meta
					property="og:title"
					content={`${founderData?.name} - ${founderData?.title}`}
				/>
				<meta property="og:description" content={founderData?.about} />
			</Helmet>

			<div
				className={`founder-profile-container ${
					theme === "dark" ? " dark-theme" : ""
				}`}
			>
				{/* <nav className="profile-nav">
					<div className="nav-container">
						<button className="back-button">
							<FaArrowCircleLeft />
						</button>
						<span className="nav-title">Founder Profile</span>
					</div>
					<button className="theme-toggle" onClick={toggleTheme}>
						{theme === "light" ? <FaMoon /> : <FaSun />}
					</button>
				</nav> */}

				<main className="profile-main">
					{/* Header Section */}
					<section className="profile-header">
						<div className="profile-avatar">
							{/* <span>{founderData.name.charAt(0)}</span> */}
							<img src={founderData?.profilePic} alt="Profile" />
						</div>
						<div className="profile-info">
							<h1>{founderData?.name}</h1>
							<p className="title">{founderData?.title}</p>
							<p className="company">{founderData?.company}</p>
							<div className="location">
								<FaMapMarkerAlt />
								<span>{founderData?.location}</span>
							</div>
						</div>
						{/* <div className="profile-actions">
							<button className="btn-primary">
								<FaEnvelope /> Message
							</button>
						</div> */}
					</section>

					{/* About Section */}
					<section className="profile-section">
						<h2>About</h2>
						{founderData?.about ? (
							<p>{founderData.about}</p>
						) : (
							renderNoDataMessage("about")
						)}
					</section>

					{/* Education Section - Direct Rendering */}
					<section className="profile-section">
						<h2>
							<FaGraduationCap /> Education
						</h2>
						<div className="education-list">
							{founder?.education ? (
								<div className="education-item">
									<p className="text-base">{founder.education}</p>
								</div>
							) : (
								<div className="no-data-message">
									<p>No education data available</p>
								</div>
							)}
						</div>
					</section>

					{/* Experience Section - Direct Rendering */}
					<section className="profile-section">
						<h2>
							<FaBriefcase /> Experience
						</h2>
						<div className="experience-list">
							{founder?.startUp ? (
								<div className="experience-item">
									<h3>{founder.startUp.company}</h3>
									<p className="role">{founder.designation}</p>
									<p className="duration">{founder.startUp.startedAtDate}</p>
									<p className="description">{founder.startUp.description}</p>
									<p className="location">{founder.experience}</p>
								</div>
							) : founder?.experience ? (
								<div className="experience-item">
									<h3>{founder.experience.company}</h3>
									<p className="role">{founder.designation}</p>
									<p className="duration">{founder.experience}</p>
									<p className="duration">{founder.experience.startedAtDate}</p>
									<p className="location">{founder.experience.location}</p>
								</div>
							) : (
								<div className="no-data-message">
									<p>No experience data available</p>
								</div>
							)}
						</div>
					</section>

					{/* Public Events Section with Vertical Scroll */}
					{/* <section className="profile-section meeting-section">
						<h2>
							<FaCalendarAlt /> Public Events
						</h2>
						<div className="meeting-cards-container">
							<div className="meeting-cards">
								{events.length > 0 ? (
									events.map((meeting) => (
										<div
											key={meeting._id}
											className="meeting-card"
											onClick={() => handleMeetingClick(meeting._id)}
										>
											<div className="meeting-card-header">
												<h3>{meeting.title}</h3>
												<span className="meeting-type">
													{meeting.isPrivate ? "Private" : "Public"}
												</span>
											</div>
											<div className="meeting-card-content">
												<div className="meeting-duration">
													<FaClock />
													<span>{meeting.duration} minutes</span>
												</div>
												<p>{meeting.description}</p>
											</div>
											<div className="meeting-card-footer">
												<span className="bookings-count">
													{meeting?.bookings?.length}{" "}
													{meeting?.bookings?.length === 1
														? "Booking"
														: "Bookings"}
												</span>
											</div>
										</div>
									))
								) : (
									<p>No Events Created Yet</p>
								)}
							</div>
						</div>
					</section> */}

					{/* Activity Section */}
					<section className="profile-section activity-section">
						<h2>Activity</h2>
						<div className="tabs">
							<button
								className={`tab ${activeTab === "posts" ? "active" : ""}`}
								onClick={() => setActiveTab("posts")}
							>
								Posts
							</button>
							{/* <button
								className={`tab ${activeTab === "comments" ? "active" : ""}`}
								onClick={() => setActiveTab("comments")}
							>
								Comments
							</button> */}
						</div>
						<div className="activity-content">
							{activeTab === "posts" &&
								founderData?.activities?.posts?.length === 0 &&
								renderNoDataMessage("posts")}
							{activeTab === "comments" &&
								founderData?.activities?.comments?.length === 0 &&
								renderNoDataMessage("comments")}
							{renderActivityContent()}
						</div>
					</section>

					{/* Interests Section - Show Dummy Data if No Data Available */}
					<section className="profile-section interests-section">
						<h2>Interests</h2>
						<div className="interests-tabs">
							{(
								founderData?.interests?.categories ||
								dummyData.interests.categories
							).map((category) => (
								<button
									key={category.title}
									className={`tab ${
										activeInterestTab === category.title ? "active" : ""
									}`}
									onClick={() => setActiveInterestTab(category.title)}
								>
									{category.title}
								</button>
							))}
						</div>
						<div className="interests-content">
							{(
								founderData?.interests?.categories ||
								dummyData.interests.categories
							)
								.find((category) => category.title === activeInterestTab)
								?.items.map((item, index) => (
									<div key={index} className="interest-card">
										<div className="interest-image">
											<img src={UserPic} alt={item.name} />
										</div>
										<div className="interest-info">
											<h3>{item.name}</h3>
											<p>{item.description}</p>
											<div className="followers">430,302 followers</div>
										</div>
									</div>
								))}
						</div>
					</section>

					{/* Public Links Section */}
					<section className="profile-section">
						<h2>Public Links</h2>
						{founderData?.publicLinks ? (
							<div className="public-links">
								{founderData.publicLinks.website && (
									<a
										href={founderData.publicLinks.website}
										className="link-item"
									>
										<FaGlobe /> Website
									</a>
								)}
								{founderData.publicLinks.linkedin && (
									<a
										href={founderData.publicLinks.linkedin}
										className="link-item"
									>
										<FaLinkedin /> LinkedIn
									</a>
								)}
								{founderData.publicLinks.github && (
									<a
										href={founderData.publicLinks.github}
										className="link-item"
									>
										<FaGithub /> GitHub
									</a>
								)}
							</div>
						) : (
							renderNoDataMessage("public links")
						)}
					</section>
				</main>
			</div>
		</>
	);
};

export default FounderProfile;
