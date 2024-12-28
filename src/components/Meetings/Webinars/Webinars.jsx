import React, { useState, useEffect } from "react";
import { FiCopy, FiTrash2, FiPlus } from "react-icons/fi";
import "./Webinars.scss";
import WebinarModal from "./CreateWebinarModal/CreateWebinarModal";
import { IoCalendarOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import {
	createWebinar,
	getAllWebinars,
	deleteWebinar,
} from "../../../Service/user";
import { HiVideoCamera } from "react-icons/hi";
import { getUserAvailability } from "../../../Service/user";
import { useSelector } from "react-redux";

// import { environment } from "../../../environments/environment";
// const baseUrl = environment.baseUrl;
// const token = localStorage.getItem("accessToken");

// Function to generate a random light color
const getRandomLightColor = () => {
	const r = Math.floor(Math.random() * 156 + 100); // Red value between 100-255
	const g = Math.floor(Math.random() * 156 + 100); // Green value between 100-255
	const b = Math.floor(Math.random() * 156 + 100); // Blue value between 100-255
	return `rgb(${r}, ${g}, ${b})`;
};

const Spinner = ({ isInvestor }) => (
	<div className="loader-container">
		<div className={`${isInvestor ? "investor-loader" : "loader"}`}>
			<div className="loader-inner"></div>
		</div>
	</div>
);

const EventsList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	// const [copiedLinks, setCopiedLinks] = useState({});
	const [userAvailability, setUserAvailability] = useState({});
	// const user = localStorage.getItem("loggedInUser");
	// const username = user ? JSON.parse(user).userName : null;
	const navigate = useNavigate();
	// console.log("Events", events);
	// console.log("User Availability", userAvailability);
	const [isInvestor, setIsInvestor] = useState(false);

	const loggedInUser = useSelector((state) => state.user.loggedInUser);

	const fetchEvents = () => {
		setLoading(true);
		getAllWebinars()
			.then((response) => {
				setLoading(false);
				if (response && response.data) {
					setEvents(response.data);
				} else {
					console.error("Unexpected data format:", response);
				}
			})
			.catch((error) => {
				setLoading(false);
				console.error("Error fetching events:", error);
			});
	};

	useEffect(() => {
		setIsInvestor(loggedInUser.isInvestor);
		fetchEvents();
	}, []);

	useEffect(() => {
		// Fetch user availability
		const fetchAvailability = async () => {
			try {
				const response = await getUserAvailability();
				if (response.status === 200) {
					setUserAvailability(response.availability);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchAvailability();
	}, []);

	const handleCreateEvent = (eventData) => {
		console.log("eventData", eventData);
		createWebinar(eventData)
			.then((res) => {
				if (res.status === 200) {
					alert("Webinar created successfully");
					fetchEvents();
				} else {
					alert("Error creating event");
				}
			})
			.catch(() => alert("Error creating event"));

		setIsModalOpen(false);
	};

	const handleDeleteEvent = (eventId) => {
		deleteWebinar(eventId)
			.then((res) => {
				if (res.status === 200) {
					alert("Webinar deleted successfully");
					fetchEvents();
				} else {
					alert("Error deleting event");
				}
			})
			.catch(() => {
				alert("Error deleting event");
			});
		// fetch(`${baseUrl}/meetings/deleteEvent/${eventId}`, {
		// 	method: "DELETE",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// })
		// 	.then((res) => {
		// 		if (res.status === 200) {
		// 			alert("Event deleted successfully");
		// 			fetchEvents();
		// 		} else {
		// 			alert("Error deleting event");
		// 		}
		// 	})
		// 	.catch(() => alert("Error deleting event"));
	};

	// const handleCopy = async (eventId, link) => {
	// 	try {
	// 		await navigator.clipboard.writeText(`${link}`);
	// 		setCopiedLinks((prev) => ({ ...prev, [eventId]: true }));
	// 		setTimeout(() => {
	// 			setCopiedLinks((prev) => ({ ...prev, [eventId]: false }));
	// 		}, 2000);
	// 	} catch (err) {
	// 		console.error("Failed to copy: ", err);
	// 	}
	// };

	if (loading) {
		return <Spinner isInvestor={isInvestor} />;
	}

	return (
		<div className="events-container">
			<div className="events-header">
				<h1>Webinars</h1>
				{userAvailability ? (
					<button
						className="create-event-btn"
						onClick={() => setIsModalOpen(true)}
					>
						<FiPlus />
						<span>Create Webinar</span>
					</button>
				) : (
					<button
						className="create-event-btn"
						onClick={() => navigate("/meeting/availability")}
					>
						<RxUpdate />
						<span>Set Availability</span>
					</button>
				)}
			</div>

			{events.length === 0 ? (
				<div className="no-events">No webinars found.</div>
			) : (
				<div className="events-grid">
					{events.map((event, index) => (
						<div
							key={index}
							className="event-card"
							style={{ backgroundColor: getRandomLightColor() }} // Apply random light color
						>
							<div className="event-info">
								<h3>{event.title}</h3>

								<div className="event-meta">
									<div className="leftTime">
										<span>
											<IoCalendarOutline size={20} />
										</span>{" "}
										&nbsp;&nbsp;
										<span>{event.duration} mins</span> &nbsp;&nbsp;
										<span className="separator">|</span> &nbsp;&nbsp;
										<span>{event.eventType}</span>
									</div>
									<div className="leftRight">
										{event.price > 0 ? (
											<div className="price-tag">
												{event.discount > 0 && (
													<span className="original-price">
														₹{event.price.toFixed(0)}
													</span>
												)}
												<span className="new-price">
													₹
													{(event.price * (1 - event.discount / 100)).toFixed(
														0
													)}
												</span>
											</div>
										) : (
											<div className="price-tag">
												<b>Free</b>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="event-actions">
								<div className="action-buttons">
									{/* <button
										className="copy-btn"
										onClick={() => handleCopy(event._id, event.link)}
									>
										<FiCopy />
										{copiedLinks[event._id] ? "Link Copied!" : "Copy Link"}
									</button> */}
									<Link to={`${event?.link}`}>
										<button className="join-btn">
											<HiVideoCamera />
											Join Meeting
										</button>
									</Link>
									<button
										className="delete-btn"
										onClick={() => handleDeleteEvent(event._id)}
									>
										<FiTrash2 /> Delete
									</button>
								</div>
								{/* <div className="bookings-count">
									{event.joinedUsers.length}{" "}
									{event.joinedUsers.length === 1
										? "User Joined"
										: "Users Joined"}
								</div> */}
							</div>
						</div>
					))}
				</div>
			)}

			<WebinarModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleCreateEvent}
			/>
		</div>
	);
};

export default EventsList;
