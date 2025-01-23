import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
	FaCalendarAlt,
	FaLinkedin,
	FaGlobe,
	FaGithub,
	FaGraduationCap,
	FaBriefcase,
	FaHeart,
	FaRegComment,
	FaShare,
	FaClock,
	FaStar,
	FaArrowRight,
} from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import { GrSend } from "react-icons/gr";
import { environment } from "../../../environments/environment";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import {
	sentConnectionRequest,
	getUserByUserNameOrOneLinkId,
} from "../../../Service/user";
import ImageCarousel from "../../../components/Investor/Cards/FeedPost/ImageCarousel/ImageCarousel";
import SubscriptionPopup from "../../../components/PopUp/SubscriptionPopUp/SubcriptionPop";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EmailDisplay from "./components/EmailDisplay/EmailDisplay";
import AfterSuccessPopup from "../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import "./PrivateUserProfile.scss";

const PrivateUserProfile = ({ isInvestor = false }) => {
	const theme = useSelector(selectTheme);
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [activeTab, setActiveTab] = useState("posts");
	const [activeInterestTab, setActiveInterestTab] = useState("Top Voices");
	const [founder, setFounder] = useState(null);
	const [post, setPost] = useState(null);
	const [events, setEvents] = useState([]);

	const [subscriptionAlert, setSubscriptionAlert] = useState(false);
	const [popPayOpen, setPopPayOpen] = useState(false);
	const [connectionSent, setConnectionSent] = useState(false);
	const [loading, setLoading] = useState(true);

	// console.log("User", founder);

	const { username } = useParams();
	const { oneLinkId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchFounderData = async () => {
			try {
				const response = await getUserByUserNameOrOneLinkId(
					username,
					oneLinkId
				);
				console.log("response", response.data);
				if (response.status === 200) {
					setFounder(response.data.user);
					setPost(response.data.posts);

					// Filter out "Pitch Day" events
					const filteredEvents = response.data.events.filter(
						(event) => event.eventType !== "Pitch Day"
					);
					setEvents(filteredEvents);
				} else {
					console.error("Failed to fetch founder data");
				}
			} catch (error) {
				console.error("Error fetching founder data:", error);
			}
		};

		// const fetchEvents = async () => {
		// 	try {
		// 		const response = await fetch(
		// 			`${environment.baseUrl}/meetings/getEvents/${username}`,
		// 			{
		// 				method: "GET",
		// 				headers: {
		// 					"Content-Type": "application/json",
		// 				},
		// 			}
		// 		);
		// 		if (response.ok) {
		// 			const data = await response.json();
		// 			const publicEvents = data.data.filter(
		// 				(event) => event.isPrivate === false
		// 			);
		// 			setEvents(publicEvents);
		// 		} else {
		// 			console.error("Failed to fetch events");
		// 		}
		// 	} catch (error) {
		// 		console.error("Error fetching events:", error);
		// 	}
		// };

		Promise.all([fetchFounderData()]).then(() => setLoading(false));
	}, [username, oneLinkId]);

	const formatedDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(date).toLocaleDateString("en-IN", options);
	};

	const renderActivityContent = () => {
		if (activeTab === "posts") {
			return (
				<div className="posts-container">
					{loading ? (
						<Skeleton count={3} height={200} />
					) : post && post.length > 0 ? (
						post.map((post, index) => (
							<div key={index} className="post-card">
								<div className="post-content">
									<p>
										{post.description
											? post.description.replace(/<[^>]*>/g, "").slice(0, 150) +
											  (post.description.replace(/<[^>]*>/g, "").length > 150
													? "......"
													: "")
											: ""}
									</p>

									{post.images && post.images.length > 0 ? (
										<ImageCarousel images={post.images} />
									) : (
										post.image && (
											<img
												src={post.image}
												alt="Post"
												className="post-image"
												// style={{ width: "600px", height: "400px" }}
											/>
										)
									)}
								</div>
								<div className="post-stats">
									<span>
										<FaHeart /> {post.likes ? post.likes.length : 0}
									</span>
									<span>
										<FaRegComment /> {post.comments ? post.comments.length : 0}
									</span>
									<span>
										<FaShare /> {post.resharedCount || 0}
									</span>
								</div>
								<span className="date">{formatedDate(post.createdAt)}</span>
							</div>
						))
					) : (
						<p className="no-data-message">No Data Available</p>
					)}
				</div>
			);
		}
		return null;
	};

	const handleMeetingClick = (meetingId) => {
		navigate(`/meeting/schedule/${username}/${meetingId}`);
	};

	const handlePriorityDMClick = () => {
		navigate(`/priority-dm/${username}`);
	};

	const canSendRequest = () => {
		const trialPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
		const currentDate = new Date();
		const trialEndDate = new Date(
			new Date(loggedInUser?.trialStartDate).getTime() + trialPeriod
		);

		return (
			loggedInUser?.isSubscribed ||
			(loggedInUser?.trialStartDate && currentDate < trialEndDate)
		);
	};

	const handleConnect = (userId) => {
		if (canSendRequest()) {
			sentConnectionRequest(loggedInUser._id, userId)
				.then(({ data }) => {
					if (data?.message === "Connection Request Sent") {
						setConnectionSent(true);
						setTimeout(() => {
							setConnectionSent(false);
						}, 2500);
					}
				})
				.catch((error) => console.log());
		} else {
			setPopPayOpen(true);
		}
	};

	return (
		<>
			<Helmet>
				<title>
					{loading
						? "Loading..."
						: `${founder?.firstName} ${founder?.lastName} - ${founder?.designation}`}
				</title>
				<meta name="description" content={founder?.bio || "Founder Profile"} />
				<meta
					property="og:title"
					content={
						loading
							? "Loading..."
							: `${founder?.firstName} ${founder?.lastName} - ${founder?.designation}`
					}
				/>
				<meta
					property="og:description"
					content={founder?.bio || "Founder Profile"}
				/>
			</Helmet>

			<div
				className={`private-profile-container ${
					theme === "dark" ? "dark-theme" : ""
				}`}
			>
				<main className="profile-main">
					{/* Header Section */}
					<section className="profile-header">
						<div className="profile-avatar">
							{loading ? (
								<Skeleton circle height={150} width={150} />
							) : (
								<img src={founder?.profilePicture} alt="Profile" />
							)}
						</div>
						<div className="profile-info">
							<h1>
								{loading ? (
									<Skeleton width={200} />
								) : (
									`${founder?.firstName} ${founder?.lastName}`
								)}
							</h1>
							{/* Designation, company, location */}
							{/* <p className="title">
								{loading ? (
									<Skeleton width={250} />
								) : (
									founder?.designation +
										" of " +
										founder?.startUp?.company +
										", " +
										founder?.startUp?.location +
										", India" || "No Data Available"
								)}
							</p> */}

							<p className="title">
								{loading ? (
									<Skeleton width={250} />
								) : (
									(() => {
										const designation = founder?.designation;
										const company = founder?.startUp?.company;
										const location = founder?.startUp?.location;

										// Count how many of the three properties are defined
										const definedCount = [
											designation,
											company,
											location,
										].filter(Boolean).length;

										// If two or more are undefined, show "No Data Available"
										if (definedCount < 2) {
											return "Designation, Company & Location not Available";
										}

										// Otherwise, return the formatted string
										return `${designation} of ${company}, ${location}, India`;
									})()
								)}
							</p>
							{/* User's Email display here in place of designation */}
							<div className="company">
								{loading ? (
									<Skeleton width={150} />
								) : (
									<EmailDisplay
										loading={loading}
										loggedInUser={loggedInUser}
										founder={founder}
										setSubscriptionAlert={setSubscriptionAlert}
									/>
								)}
							</div>
							{/* User Connections */}
							<div
								className={`location ${isInvestor ? "bg-green" : "bg-orange"}`}
							>
								<span>
									{loading ? (
										<Skeleton width={100} />
									) : (
										founder?.connections.length + " Connections" ||
										"No Data Available"
									)}
								</span>
							</div>
						</div>
						<div className="profile-links-connect-btn">
							{loading ? (
								<Skeleton count={3} height={30} />
							) : founder?.startUp?.socialLinks?.website ||
							  founder?.linkedin ||
							  founder?.startUp?.github ? (
								<div className="profile-links">
									{founder?.startUp?.socialLinks?.website && (
										<a
											href={founder.startUp.socialLinks.website}
											className="link-item"
										>
											<FaGlobe />
										</a>
									)}
									{founder?.linkedin && (
										<a href={founder.linkedin} className="link-item">
											<FaLinkedin />
										</a>
									)}
									{founder?.startUp?.github && (
										<a href={founder.startUp.github} className="link-item">
											<FaGithub />
										</a>
									)}
								</div>
							) : (
								<p className="no-data-message">No Social Links Available</p>
							)}

							{/* If loggedIn user's userName === username don't show the connect button */}
							{loading ? (
								<Skeleton width={150} />
							) : (
								founder?.userName !== loggedInUser.userName && (
									<div
										className={`connect-btn ${
											isInvestor ? "bg-green" : "bg-orange"
										}`}
										onClick={() => handleConnect(founder._id)}
									>
										Connect
									</div>
								)
							)}
						</div>
					</section>

					{/* About Section */}
					<section className="private-profile-section">
						<h2>About</h2>
						{loading ? (
							<Skeleton count={3} />
						) : (
							<p>{founder?.bio || "No Data Available"}</p>
						)}
					</section>

					{/* Education Section */}
					<section className="private-profile-section">
						<h2>
							<FaGraduationCap /> Education
						</h2>
						<div className="education-list">
							{loading ? (
								<Skeleton count={2} height={100} />
							) : founder?.recentEducation &&
							  founder.recentEducation.length > 0 ? (
								founder.recentEducation.map((edu, index) => (
									<div key={index} className="PIC-item">
										<div className="PIC-view">
											<div className="PIC-view-header">
												<div className="PIC-view-header-left">
													{edu.logo && (
														<img
															src={edu.logo}
															alt="School Logo"
															className="PIC-view-logo"
														/>
													)}
													<div className="PIC-view-info">
														<p className="PIC-view-title">{edu.schoolName}</p>
														<p className="PIC-view-location">{edu.location}</p>
													</div>
												</div>
												<p className="PIC-view-duration">
													{new Date(edu.passoutYear).getFullYear()}
												</p>
											</div>
											<p className="PIC-view-subtitle">{edu.course}</p>
											<p className="PIC-view-desc">{edu.description}</p>
										</div>
									</div>
								))
							) : (
								<p className="no-data-message">No Data Available</p>
							)}
						</div>
					</section>

					{/* Experience Section */}
					<section className="private-profile-section">
						<h2>
							<FaBriefcase /> Experience
						</h2>
						<div className="experience-list">
							{loading ? (
								<Skeleton count={2} height={100} />
							) : founder?.recentExperience &&
							  founder.recentExperience.length > 0 ? (
								founder.recentExperience.map((exp, index) => (
									<div key={index} className="PIC-item">
										<div className="PIC-view">
											<div className="PIC-view-header">
												<div className="PIC-view-header-left">
													{exp.logo && (
														<img
															src={exp.logo}
															alt="Company Logo"
															className="PIC-view-logo"
														/>
													)}
													<div className="PIC-view-info">
														<p className="PIC-view-title">{exp.companyName}</p>
														<p className="PIC-view-location">{exp.location}</p>
													</div>
												</div>
												<p className="PIC-view-duration">
													{new Date(
														exp.experienceDuration.startYear
													).getFullYear()}{" "}
													-{" "}
													{new Date(
														exp.experienceDuration.endYear
													).getFullYear()}
												</p>
											</div>
											<p className="PIC-view-subtitle">{exp.role}</p>
											<p className="PIC-view-desc">{exp.description}</p>
										</div>
									</div>
								))
							) : (
								<p className="no-data-message">No Data Available</p>
							)}
						</div>
					</section>

					{/* Priority DM Section */}
					<section className="private-profile-section">
						<h2>
							<BiMailSend /> Priority DM
						</h2>
						<div className="priority-dm">
							<div className="priority-dm-card" onClick={handlePriorityDMClick}>
								<div className="priority-dm-card-header">
									<div className="pd-rating">
										<FaStar className="pd-star-icon" />
										<span>5</span>
									</div>
									<span className="pd-badge">Popular</span>
								</div>

								<h2 className="pd-title">Have a question?</h2>

								<div className="pd-info-section">
									<div className="pd-info-content">
										<GrSend className="pd-plane-icon" />
										<div className="pd-text-group">
											<div className="pd-reply-time">Replies in 2 days</div>
											<div className="dm-text">Priority DM</div>
										</div>
									</div>

									<button className="pd-price-button">
										<span>
											₹
											{loading ? (
												<Skeleton width={30} />
											) : (
												founder?.priorityDMPrice || "N/A"
											)}
										</span>
										<FaArrowRight className="pd-arrow-icon" />
									</button>
								</div>
							</div>
						</div>
					</section>

					{/* Public Events Section */}
					<section className="private-profile-section meeting-section">
						<h2>
							<FaCalendarAlt /> Events
						</h2>
						<div className="meeting-cards-container">
							<div className="meeting-cards">
								{loading ? (
									<Skeleton count={3} height={150} />
								) : events.length > 0 ? (
									events.map((meeting) => (
										<div
											key={meeting._id}
											className="meeting-card"
											onClick={() => handleMeetingClick(meeting._id)}
										>
											<div className="meeting-card-header">
												<h3>{meeting.title}</h3>
												<span className="meeting-type">
													{meeting.eventType}
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
									<p className="no-data-message">No Data Available</p>
								)}
							</div>
						</div>
					</section>

					{/* Activity Section */}
					<section className="private-profile-section activity-section">
						<h2>Activity</h2>
						<div className="tabs">
							<button
								className={`tab ${activeTab === "posts" ? "active" : ""}`}
								onClick={() => setActiveTab("posts")}
							>
								Posts
							</button>
						</div>
						<div className="activity-content">{renderActivityContent()}</div>
					</section>

					{/* Interests Section */}
					<section className="private-profile-section interests-section">
						<h2>Interests</h2>
						{loading ? (
							<Skeleton count={3} height={50} />
						) : founder?.interests?.categories &&
						  founder.interests.categories.length > 0 ? (
							<>
								<div className="interests-tabs">
									{founder.interests.categories.map((category) => (
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
									{founder.interests.categories
										.find((category) => category.title === activeInterestTab)
										?.items.map((item, index) => (
											<div key={index} className="interest-card">
												<div className="interest-image">
													<img
														src={item.image || "placeholder.jpg"}
														alt={item.name}
													/>
												</div>
												<div className="interest-info">
													<h3>{item.name}</h3>
													<p>{item.description}</p>
													<div className="followers">
														{item.followers || "0"} followers
													</div>
												</div>
											</div>
										))}
								</div>
							</>
						) : (
							<p className="no-data-message">No Data Available</p>
						)}
					</section>

					{/* Public Links Section */}
					{/* <section className="profile-section">
						<h2>Public Links</h2>
						{loading ? (
							<Skeleton count={3} height={30} />
						) : founder?.startUp?.socialLinks?.website ||
						  founder?.linkedin ||
						  founder?.startUp?.github ? (
							<div className="public-links">
								{founder?.startUp?.socialLinks?.website && (
									<a
										href={founder.startUp.socialLinks.website}
										className="link-item"
									>
										<FaGlobe />
									</a>
								)}
								{founder?.linkedin && (
									<a href={founder.linkedin} className="link-item">
										<FaLinkedin />
									</a>
								)}
								{founder?.startUp?.github && (
									<a href={founder.startUp.github} className="link-item">
										<FaGithub />
									</a>
								)}
							</div>
						) : (
							<p className="no-data-message">No Data Available</p>
						)}
					</section> */}
				</main>
			</div>

			{subscriptionAlert && (
				<SubscriptionPopup
					isOpen={subscriptionAlert}
					onClose={() => setSubscriptionAlert(!subscriptionAlert)}
				/>
			)}
			{popPayOpen && (
				<SubscriptionPopup
					isOpen={popPayOpen}
					onClose={() => setPopPayOpen(false)}
				/>
			)}
			{connectionSent && (
				<AfterSuccessPopup
					withoutOkButton
					onClose={() => setConnectionSent(!connectionSent)}
					successText="Connection Sent Successfully"
				/>
			)}
		</>
	);
};

export default PrivateUserProfile;
