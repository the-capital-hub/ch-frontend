// EventsList.jsx
import React, { useState, useEffect } from "react";
import { FiCopy, FiTrash2, FiPlus } from "react-icons/fi";
import "./MeetingEvents.scss";
import EventModal from "./CreateEventModal/EventModal";
import { environment } from "../../../environments/environment";

const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

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
				console.log("API response:", data); // Log the API response
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
		console.log("New event:", eventData);
		try {
			fetch(`${baseUrl}/meetings/createEvent`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(eventData),
			}).then((res) => {
				if (res.status === 200) {
					console.log("Event created successfully");
					alert("Event created successfully");
					fetchEvents();
				} else {
					console.error("Error creating event, status:", res.status);
					alert("Error creating event");
				}
			});
		} catch (error) {
			console.error("Error creating event:", error);
			alert("Error creating event");
		}
		setIsModalOpen(false);
	};

	const handleDeleteEvent = (eventId) => {
		try {
			fetch(`${baseUrl}/meetings/deleteEvent/${eventId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				if (res.status === 200) {
					console.log("Event deleted successfully");
					alert("Event deleted successfully");
					fetchEvents();
				} else {
					console.error("Error deleting event, status:", res.status);
					alert("Error deleting event");
				}
			});
		} catch (error) {
			console.error("Error deleting event:", error);
			alert("Error deleting event");
		}
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

	const calculateDiscountedPrice = (price, discountPercentage) => {
		if (discountPercentage && discountPercentage > 0) {
			const discountAmount = (price * discountPercentage) / 100;
			return price - discountAmount;
		}
		return price;
	};

	const formatPrice = (price) => {
		return price === 0 ? "Free" : `₹${price.toFixed(0)}`;
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="events-container">
			<div className="events-wrapper">
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
							<div key={index} className="event-card">
								<div className="event-info">
									<div className="event-title-price">
										<h3>{event.title}</h3>
										{event.price > 0 && (
											<div className="price-tag">
												{event.discount > 0 && (
													<>
														<span className="original-price">
															{formatPrice(event.price)}
														</span>
													</>
												)}
												<span className="new-price">
													{formatPrice(
														calculateDiscountedPrice(event.price, event.discount)
													)}
												</span>
											</div>
										)}
										{event.price === 0 && (
											<div className="price-tag">
												<span className="new-price">Free</span>
											</div>
										)}
									</div>

									<div className="event-meta">
										<span>{event.duration} minutes</span>
										<span className="separator">|</span>
										<span>{event.isPrivate ? "Private" : "Public"}</span>
									</div>
								</div>

								<div className="event-actions">
									<div className="action-buttons">
										<button
											className="copy-btn"
											onClick={() => handleCopy(event._id)}
										>
											<FiCopy />
											<span>
												{copiedLinks[event._id] ? "Link Copied!" : "Copy Link"}
											</span>
										</button>
										<button
											className="delete-btn"
											onClick={() => handleDeleteEvent(event._id)}
										>
											<FiTrash2 />
											<span>Delete</span>
										</button>
									</div>

									<div className="bookings-count">
										{event.bookings?.length}{" "}
										{event.bookings?.length === 1 ? "Booking" : "Bookings"}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<EventModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleCreateEvent}
			/>
		</div>
	);
};

export default EventsList;
