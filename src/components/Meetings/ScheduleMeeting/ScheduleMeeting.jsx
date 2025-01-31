import React, { useState, useEffect } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
import {
	FaCalendarAlt,
	FaVideo,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import Calendar from "react-calendar";
import "./ScheduleMeeting.scss";
import { useParams } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import { environment } from "../../../environments/environment";
import avatar4 from "../../../Images/avatars/image.png";
const baseUrl = environment.baseUrl;


const Spinner = () => (
	<div className="loader-container">
		<div className="loader">
			<div className="loader-inner"></div>
		</div>
	</div>
);

const MeetingScheduler = () => {
	const [isBooked, setIsBooked] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [currentDate, setCurrentDate] = useState(new Date());
	const { username, meetingId } = useParams();
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState({});
	const [availability, setAvailability] = useState({});
	const [events, setEvents] = useState([]);
	const [meetingLink, setMeetingLink] = useState("");
	const [error, setError] = useState("");
	const [orderId, setOrderId] = useState("");
	const [paymentStatus, setPaymentStatus] = useState(null);
	const [showDetailsForm, setShowDetailsForm] = useState(false);
	const theme = useSelector(selectTheme);


	useEffect(() => {
		const fetchSchedulePageData = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`${baseUrl}/meetings/getSchedulePageData/${username}/${meetingId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							// Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === 200) {
					const data = await response.json();
					setUser(data.data.user);
					setAvailability(data.data.availability);
					setEvents(data.data.events);
					setLoading(false);
				} else {
					console.error("Failed to fetch schedule page data");
					setLoading(false);
				}
			} catch (error) {
				console.error("Error:", error);
				setLoading(false);
			}
		};

		fetchSchedulePageData();
	}, [username, meetingId]);

	const timeSlots = [
		"08:00",
		"09:00",
		"09:30",
		"10:00",
		"10:30",
		"11:00",
		"11:30",
		"12:00",
		"12:30",
		"13:00",
		"13:30",
		"14:00",
		"14:30",
		"15:00",
		"15:30",
		"16:00",
	];

	const calculateDiscountedPrice = (price, discountPercentage) => {
		if (discountPercentage && discountPercentage > 0) {
			const discountAmount = (price * discountPercentage) / 100;
			return price - discountAmount;
		}
		return price;
	};

	// Initialize Cashfree SDK
	const initializeCashfree = async () => {
		try {
			return await load({ mode: "production" });
		} catch (error) {
			console.error("Failed to initialize Cashfree:", error);
			throw error;
		}
	};

	// Create payment session
	const createPaymentSession = async (paymentData) => {
		try {
			const response = await fetch(`${baseUrl}/meetings/createPaymentSession`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(paymentData),
			});
			const data = await response.json();

			if (!data.data.payment_session_id) {
				throw new Error("Failed to create payment session");
			}

			// Set orderId in state immediately after creating payment session
			setOrderId(data.data.order_id);

			return {
				sessionId: data.data.payment_session_id,
				orderId: data.data.order_id,
			};
		} catch (error) {
			console.error("Payment session creation failed:", error);
			throw error;
		}
	};

	// Verify payment status
	const verifyPayment = async (orderId) => {
		try {
			const response = await fetch(`${baseUrl}/meetings/verifyPayment`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ orderId }),
			});

			const data = await response.json();
			if (data.status !== 200) {
				throw new Error("Payment verification failed");
			}

			setPaymentStatus("success");
			return true;
		} catch (error) {
			console.error("Payment verification failed:", error);
			setPaymentStatus("failed");
			throw error;
		}
	};

	// Schedule meeting with server
	const scheduleMeeting = async (meetingData) => {
		try {
			const response = await fetch(`${baseUrl}/meetings/scheduleMeeting`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ meetingData }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Failed to schedule meeting");
			}

			const data = await response.json();
			setMeetingLink(data.data.meetingLink);
			setIsBooked(true);
			return data;
		} catch (error) {
			console.error("Meeting scheduling failed:", error);
			setError(error.message);
			throw error;
		}
	};

	// Main handler for scheduling and payment
	const handleSchedule = async (e) => {
		e.preventDefault();
		setError("");

		if (!selectedDate) {
			setError("Please select a date before scheduling.");
			return;
		}

		setLoading(true);

		try {
			const startTime = selectedTime;
			const [startHour, startMinute] = startTime.split(":").map(Number);

			const duration = events[0]?.duration || 30;
			const endDate = new Date();
			endDate.setHours(startHour);
			endDate.setMinutes(startMinute + duration);

			const endTime = `${endDate
				.getHours()
				.toString()
				.padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;

			const meetingData = {
				startTime,
				endTime,
				date: selectedDate.toLocaleDateString("en-US", {
					day: "numeric",
					month: "long",
				}),
				name: e.target.name.value,
				email: e.target.email.value,
				additionalInfo: e.target.additionalInfo.value,
				eventId: meetingId,
				username: username,
				paymentAmount:
					calculateDiscountedPrice(events[0]?.price, events[0]?.discount) || 0,
				paymentStatus: "Not Required",
				paymentId: null,
			};

			// Payment handling logic and scheduling logic here
			await scheduleMeeting(meetingData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setError(error.message || "An error occurred during the process");
		}
	};

	const isDateAvailable = (date) => {
		const dayOfWeek = date.getDay();
		const availabilityDays = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];

		const dayAvailability = availability?.dayAvailability?.find(
			(availability) => availability.day === availabilityDays[dayOfWeek]
		);

		return dayAvailability ? dayAvailability.enabled : false;
	};

	const handleDateChange = (date) => {
		if (isDateAvailable(date)) {
			setSelectedDate(date);
			setCurrentDate(date);
		}
	};

	const formatPrice = (price) => {
		return price === 0 ? "Free" : `₹${price.toFixed(0)}`;
	};

	// if (loading) {
	// 	return <Spinner />;
	// }

	return (
		<div className="meeting-scheduler" data-bs-theme={theme}>
			<div className="meeting-scheduler__container">
				{/* Left Container */}
				<div className="meeting-scheduler__left">
					{/* Header Section */}
					<div className="header-section">
						<button className="back-button" onClick={() => window.history.back()}>
							<FaChevronLeft /> Back
						</button>
						<div className="profile">
							<img
								src={user.profilePicture || avatar4}
								className="profile__image"
								alt="Profile"
							/>
							<div className="profile__info">
								<h2>{events.map((event) => event.title || "")}</h2>
								<p>{user.email}</p>
							</div>
						</div>
					</div>

					{/* Details Section */}
					<div className="details-section">
						<div className="meeting-info">
							<FaCalendarAlt />
							<span>{events.map((event) => event.duration || 30)} minutes</span>
						</div>

						<div className="meeting-info">
							<FaVideo />
							<span>Google Meet</span>
						</div>

						<div className="meeting-info price-info">
							<ImPriceTags />
							<div className="price">
								{events[0]?.price > 0 ? (
									<div className="price-tag">
										{events[0]?.discount > 0 && (
											<span className="original-price">
												{formatPrice(events[0]?.price)}
											</span>
										)}
										<span className="new-price">
											{formatPrice(
												calculateDiscountedPrice(events[0]?.price, events[0]?.discount)
											)}
										</span>
									</div>
								) : (
									<span className="free-tag">Free</span>
								)}
							</div>
						</div>

						<div className="description-section">
							<h4>About this meeting</h4>
							<p>{events.map((event) => event.description || "")}</p>
						</div>
					</div>
				</div>

				{/* Right Container */}
				<div className="meeting-scheduler__right">
					{!isBooked ? (
						<>
							<div className="calendar-section">
								<Calendar
									onChange={handleDateChange}
									value={currentDate}
									minDate={new Date()}
									tileDisabled={({ date }) => !isDateAvailable(date)}
									prevLabel={<FaChevronLeft />}
									nextLabel={<FaChevronRight />}
									className="custom-calendar"
								/>
							</div>

							<div className="time-slots">
								<h4>Available Time Slots</h4>
								<div className="time-slots__grid">
									{timeSlots.map((time) => (
										<button
											key={time}
											className={selectedTime === time ? "selected" : ""}
											onClick={() => setSelectedTime(time)}
										>
											{time}
										</button>
									))}
								</div>
							</div>

							<button 
								className="confirm-details-btn"
								onClick={() => setShowDetailsForm(true)}
								disabled={!selectedDate || !selectedTime}
							>
								Confirm Details
							</button>

							{/* Details Form Modal */}
							{showDetailsForm && (
								<div className="details-form-modal">
									<div className="modal-content">
										<button className="back-button" onClick={() => setShowDetailsForm(false)}>
											<FaChevronLeft /> Back
										</button>
										
										<div className="form-section">
											<h3>Additional Details</h3>
											<form onSubmit={handleSchedule}>
												<input type="text" name="name" placeholder="Your Name" required />
												<input type="email" name="email" placeholder="Your Email" required />
												<textarea
													name="additionalInfo"
													placeholder="Additional Information"
													rows={4}
												/>
												
												{events[0]?.price > 0 && (
													<div className="order-summary">
														<h4>Order Summary</h4>
														<div className="summary-item">
															<span>Meeting Duration</span>
															<span>{events[0]?.duration} minutes</span>
														</div>
														<div className="summary-item">
															<span>Price</span>
															<span>{formatPrice(events[0]?.price)}</span>
														</div>
														{events[0]?.discount > 0 && (
															<div className="summary-item discount">
																<span>Discount ({events[0]?.discount}%)</span>
																<span>-{formatPrice(events[0]?.price * events[0]?.discount / 100)}</span>
															</div>
														)}
														<div className="summary-item total">
															<span>Total</span>
															<span>{formatPrice(
																calculateDiscountedPrice(events[0]?.price, events[0]?.discount)
															)}</span>
														</div>
													</div>
												)}
												
												<button type="submit" disabled={loading}>
													{events[0]?.price > 0 ? "Schedule and Pay" : "Schedule Event"}
												</button>
											</form>
										</div>
									</div>
								</div>
							)}
						</>
					) : (
						<div className="success-message">
							<h3>Booking successful!</h3>
							<div className="meeting-link-container">
								<h4>Join the meeting:</h4>
								<a href={meetingLink} className="meeting-link">
									{meetingLink || "https://meet.google.com/hur-sdhb-mnu"}
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MeetingScheduler;
