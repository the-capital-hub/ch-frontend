import React, { useState, useEffect } from "react";
import { FiCopy, FiTrash2, FiPlus } from "react-icons/fi";
import "./MeetingEvents.scss";
import EventModal from "./CreateEventModal/EventModal";
import { IoCalendarOutline } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

import { environment } from "../../../environments/environment";
import { getUserAvailability } from "../../../Service/user";
import { useSelector } from "react-redux";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

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

const EventsList = ({ communityId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [copiedLinks, setCopiedLinks] = useState({});
	const [userAvailability, setUserAvailability] = useState({});
	const user = localStorage.getItem("loggedInUser");
	const username = user ? JSON.parse(user).userName : null;
	const navigate = useNavigate();
	console.log("Events", events);
	// console.log("User Availability", userAvailability);
	const [isInvestor, setIsInvestor] = useState(false);

	const loggedInUser = useSelector((state) => state.user.loggedInUser);

	const fetchEvents = () => {
		setLoading(true);
		fetch(`${baseUrl}/meetings/getEvents`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				if (data && data.data) {
					let eventsToSet = data.data;

					// If communityId is present, filter events by matching communityId
					if (communityId) {
						eventsToSet = eventsToSet.filter(
							(event) => event.communityId === communityId
						);
					} else {
						eventsToSet = eventsToSet.filter((event) => !event.communityId);
					}

					// Set the filtered or all events to state
					setEvents(eventsToSet);
				} else {
					console.error("Unexpected data format:", data);
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
		fetch(`${baseUrl}/meetings/createEvent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(eventData),
		})
			.then((res) => {
				if (res.status === 200) {
					alert("Event created successfully");
					fetchEvents();
				} else {
					alert("Error creating event");
				}
			})
			.catch(() => alert("Error creating event"));

		setIsModalOpen(false);
	};

	const handleDeleteEvent = (eventId) => {
		fetch(`${baseUrl}/meetings/disableEvent/${eventId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					alert("Event disabled successfully");
					fetchEvents();
				} else {
					alert("Error disabling event");
				}
			})
			.catch(() => alert("Error disabling event"));
	};

	const handleCopy = async (eventId) => {
		try {
			await navigator.clipboard.writeText(
				`${window.location.origin}/meeting/schedule/${username}/${eventId}`
			);
			setCopiedLinks((prev) => ({ ...prev, [eventId]: true }));
			setTimeout(() => {
				setCopiedLinks((prev) => ({ ...prev, [eventId]: false }));
			}, 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	if (loading) {
		return <Spinner isInvestor={isInvestor} />;
	}

	return (
		<div className="events-container">
			{!communityId && (
				<div className="events-header">
					<h1>Events</h1>
					{userAvailability ? (
						<button
							className="create-event-btn"
							onClick={() => setIsModalOpen(true)}
						>
							<FiPlus />
							<span>Create Event</span>
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
			)}

			{events.length === 0 ? (
				<div className="no-events">No events found.</div>
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
									<button
										className={`copy-btn ${!event.isActive ? "disabled" : ""}`}
										onClick={() => handleCopy(event._id)}
									>
										<FiCopy />
										{copiedLinks[event._id] ? "Link Copied!" : "Copy Link"}
									</button>
									<button
										className={`delete-btn ${
											!event.isActive ? "disabled" : ""
										}`}
										onClick={() => handleDeleteEvent(event._id)}
										disabled={!event.isActive}
									>
										<FiTrash2 /> Disable
									</button>
								</div>
								<div className="bookings-count">
									{event.bookings.length}{" "}
									{event.bookings.length === 1 ? "Booking" : "Bookings"}
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			<EventModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleCreateEvent}
			/>
		</div>
	);
};

export default EventsList;
