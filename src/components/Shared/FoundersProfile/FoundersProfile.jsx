// FounderProfile.jsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
	FaEnvelope,
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaLinkedin,
	FaGlobe,
	FaGithub,
	FaMoon,
	FaSun,
	FaGraduationCap,
	FaBriefcase,
	FaNewspaper,
	FaRegComment,
	FaHeart,
	FaShare,
	// FaUser,
	FaArrowCircleLeft,
} from "react-icons/fa";
import UserPic from "../../../Images/UserPic.jpg";
import AIPoster from "../../../Images/AIPoster.jpg";
import { environment } from "../../../environments/environment";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./FounderProfile.scss";

const FounderProfile = () => {
	const [theme, setTheme] = useState("light");
	const [activeTab, setActiveTab] = useState("posts");
	const [activeInterestTab, setActiveInterestTab] = useState("Top Voices");
	const [founder, setFounder] = useState(null);
	const { username } = useParams();
	console.log("userName", username);
	console.log("founder", founder);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.body.setAttribute("data-theme", newTheme);
	};

	useEffect(() => {
		const fetchFounderData = async () => {
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
					setFounder(data);
				} else {
					console.error("Failed to fetch founder data");
				}
			} catch (error) {
				console.error("Error fetching founder data:", error);
			}
		};

		fetchFounderData();
	}, [username]);

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

	const founderData = founder
		? {
				name: founder.firstName + " " + founder.lastName || dummyData.name,
				title: founder.designation || dummyData.title,
				company: founder.startUp.company || dummyData.company,
				location: founder.startUp.location || dummyData.location,
				email: founder.email || dummyData.email,
				joined: founder.startUp.startedAtDate || dummyData.joined,
				about: founder.bio || dummyData.about,
				profilePic: founder.profilePicture || "", // Assuming a default empty string if not provided
				education: founder.education.length
					? founder.education
					: dummyData.education,
				experience: [
					{
						company: founder.startUp.company || dummyData.experience[0].company,
						role: founder.designation || dummyData.experience[0].role,
						duration:
							founder.startUp.startedAtDate || dummyData.experience[0].duration,
						description:
							founder.startUp.description ||
							dummyData.experience[0].description,
					},
				],
				publicLinks: {
					website:
						founder.startUp.socialLinks.website ||
						dummyData.publicLinks.website,
					linkedin: founder.linkedin || dummyData.publicLinks.linkedin,
					github: founder.startUp.github || dummyData.publicLinks.github,
				},
				activities: {
					posts:
						(founder.featuredPosts || []).map((post) => ({
							content: post.description || "",
							image: post.image || "",
							like: (post.likes || []).length,
							date: post.createdAt || "",
							comments: (post.comments || []).length,
							shares: (post.shares || []).length || 0,
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

	console.log("founderData", founderData);

	const renderActivityContent = () => {
		if (activeTab === "posts") {
			return (
				<div className="posts-container">
					{founderData.activities.posts.map((post) => (
						<div key={post.id} className="post-card">
							<div className="post-content">
								<p>{post.content}</p>
								{post.image && (
									<img
										src={post.image}
										alt="Post"
										className="post-image"
										style={{ width: "600px", height: "400px" }}
									/>
								)}
							</div>
							<div className="post-stats">
								<span>
									<FaHeart /> {post.likes}
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

	// users/getUserByUserName  -> search with userName

	return (
		<>
			<Helmet>
				<title>{`${founderData.name} - ${founderData.title}`}</title>
				<meta name="description" content={founderData.about} />
				<meta
					property="og:title"
					content={`${founderData.name} - ${founderData.title}`}
				/>
				<meta property="og:description" content={founderData.about} />
			</Helmet>

			<div className="profile-container">
				<nav className="profile-nav">
					<div className="nav-container">
						<button className="back-button">
							<FaArrowCircleLeft />
						</button>
						<span className="nav-title">Founder Profile</span>
					</div>
					<button className="theme-toggle" onClick={toggleTheme}>
						{theme === "light" ? <FaMoon /> : <FaSun />}
					</button>
				</nav>

				<main className="profile-main">
					{/* Header Section */}
					<section className="profile-header">
						<div className="profile-avatar">
							{/* <span>{founderData.name.charAt(0)}</span> */}
							<img src={founderData.profilePic} alt="Profile" />
						</div>
						<div className="profile-info">
							<h1>{founderData.name}</h1>
							<p className="title">{founderData.title}</p>
							<p className="company">{founderData.company}</p>
							<div className="location">
								<FaMapMarkerAlt />
								<span>{founderData.location}</span>
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
						<p>{founderData.about}</p>
					</section>

					{/* Education Section */}
					<section className="profile-section">
						<h2>
							<FaGraduationCap /> Education
						</h2>
						<div className="education-list">
							{founderData.education.map((edu, index) => (
								<div key={index} className="education-item">
									<h3>{edu.school}</h3>
									<p>{edu.degree}</p>
									<span className="year">{edu.year}</span>
								</div>
							))}
						</div>
					</section>

					{/* Experience Section */}
					<section className="profile-section">
						<h2>
							<FaBriefcase /> Experience
						</h2>
						<div className="experience-list">
							{founderData.experience.map((exp, index) => (
								<div key={index} className="experience-item">
									<h3>{exp.company}</h3>
									<p className="role">{exp.role}</p>
									<p className="duration">{exp.duration}</p>
									<p className="description">{exp.description}</p>
								</div>
							))}
						</div>
					</section>

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
							<button
								className={`tab ${activeTab === "comments" ? "active" : ""}`}
								onClick={() => setActiveTab("comments")}
							>
								Comments
							</button>
						</div>
						<div className="activity-content">{renderActivityContent()}</div>
					</section>

					{/* Interests Section */}
					<section className="profile-section interests-section">
						<h2>Interests</h2>
						<div className="interests-tabs">
							{founderData.interests.categories.map((category) => (
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
							{founderData.interests.categories
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
						<div className="public-links">
							<a href={founderData.publicLinks.website} className="link-item">
								<FaGlobe /> Website
							</a>
							<a href={founderData.publicLinks.linkedin} className="link-item">
								<FaLinkedin /> LinkedIn
							</a>
							<a href={founderData.publicLinks.github} className="link-item">
								<FaGithub /> GitHub
							</a>
						</div>
					</section>
				</main>
			</div>
		</>
	);
};

export default FounderProfile;