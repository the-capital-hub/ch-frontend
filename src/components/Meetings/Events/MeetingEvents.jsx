import React, { useState, useEffect } from "react";
import { FiCopy, FiTrash2, FiPlus } from "react-icons/fi";
import "./MeetingEvents.scss";
import EventModal from "./CreateEventModal/EventModal";
import { IoCalendarOutline } from "react-icons/io5";

import { environment } from "../../../environments/environment";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

// Function to generate a random light color
const getRandomLightColor = () => {
	const r = Math.floor(Math.random() * 156 + 100); // Red value between 100-255
	const g = Math.floor(Math.random() * 156 + 100); // Green value between 100-255
	const b = Math.floor(Math.random() * 156 + 100); // Blue value between 100-255
	return `rgb(${r}, ${g}, ${b})`;
};

const Spinner = () => (
	<div className="loader-container">
		<div className="loader">
			<div className="loader-inner"></div>
		</div>
	</div>
);

const EventsList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [copiedLinks, setCopiedLinks] = useState({});
	const user = localStorage.getItem("loggedInUser");
	const username = user ? JSON.parse(user).userName : null;
	console.log("Events", events);

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
					setEvents(data.data);
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
		fetchEvents();
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
		fetch(`${baseUrl}/meetings/deleteEvent/${eventId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.status === 200) {
					alert("Event deleted successfully");
					fetchEvents();
				} else {
					alert("Error deleting event");
				}
			})
			.catch(() => alert("Error deleting event"));
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
		return <Spinner />;
	}

	return (
		<div className="events-container">
			<div className="events-header">
				<h1>Events</h1>
				<button
					className="create-event-btn"
					onClick={() => setIsModalOpen(true)}
				>
					<FiPlus />
					<span>Create Event</span>
				</button>
			</div>

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
										<span>{event.isPrivate ? "Private" : "Public"}</span>
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
										className="copy-btn"
										onClick={() => handleCopy(event._id)}
									>
										<FiCopy />
										{copiedLinks[event._id] ? "Link Copied!" : "Copy Link"}
									</button>
									<button
										className="delete-btn"
										onClick={() => handleDeleteEvent(event._id)}
									>
										<FiTrash2 /> Delete
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
