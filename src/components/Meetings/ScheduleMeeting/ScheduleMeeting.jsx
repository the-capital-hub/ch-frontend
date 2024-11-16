import React, { useState, useEffect } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
import {
	FaCalendarAlt,
	FaVideo,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import Calendar from "react-calendar";
import "./ScheduleMeeting.scss";
import { useParams } from "react-router-dom";
import { environment } from "../../../environments/environment";
const baseUrl = environment.baseUrl;
// const token = localStorage.getItem("accessToken");

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
	console.log("events", events);

	// const login = useGoogleLogin({
	// 	onSuccess: (tokenResponse) => {
	// 		console.log("Tokens:", tokenResponse);
	// 		try {
	// 			fetch(`${baseUrl}/users/saveMeetingToken`, {
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					Authorization: `Bearer ${token}`,
	// 				},
	// 				body: JSON.stringify({ tokenResponse }),
	// 			}).then((res) => {
	// 				if (res.status === 200) {
	// 					console.log("Token saved successfully");
	// 				} else {
	// 					console.log("Error saving token");
	// 				}
	// 			});
	// 		} catch (error) {
	// 			console.error("Error saving token:", error);
	// 		}
	// 	},
	// 	onError: (error) => {
	// 		console.error("Login Failed:", error);
	// 	},
	// 	scope:
	// 		"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
	// 	flow: "auth-code",
	// 	accessType: "offline",
	// });

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

	const handleSchedule = (e) => {
		e.preventDefault();

		const startTime = selectedTime;
		const [startHour, startMinute] = startTime.split(":").map(Number);

		const minimumGap = 30;
		const endDate = new Date();
		endDate.setHours(startHour);
		endDate.setMinutes(startMinute + minimumGap);

		const endTime = `${endDate.getHours().toString().padStart(2, "0")}:${endDate
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;

		const data = {
			startTime: startTime,
			endTime: endTime,
			date: selectedDate.toLocaleDateString("en-US", {
				day: "numeric",
				month: "long",
			}),
			name: e.target.name.value,
			email: e.target.email.value,
			additionalInfo: e.target.additionalInfo.value,
			eventId: meetingId,
			username: username,
		};
		console.log("data", data);
		try {
			fetch(`${baseUrl}/meetings/scheduleMeeting`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			})
				.then((res) => {
					if (res.ok) {
						return res.json();
					} else {
						// Parse the response to get the error message
						return res.json().then((errorData) => {
							throw new Error(errorData.message || "Error saving booking data");
						});
					}
				})
				.then((data) => {
					console.log("Booking data saved successfully", data.data);
					setMeetingLink(data.data.meetingLink);
					setIsBooked(true);
				})
				.catch((error) => {
					console.error("Error saving booking data:", error);
					setError(error.message);
					alert(error.message);
				});
		} catch (error) {
			console.error("Error saving booking data:", error);
			setError(error.message);
			alert(error.message);
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
		<div className="meeting-scheduler">
			<div className="meeting-scheduler__container">
				<div className="meeting-scheduler__left">
					<div className="profile">
						<img
							src={user.profilePicture}
							className="profile__image"
							alt="Profile Pic"
						/>
						<div className="profile__info">
							<h2>{events.map((event) => event.title || "")}</h2>
							<p>{user.email}</p>
						</div>
					</div>

					<div className="meeting-info">
						<FaCalendarAlt />
						<span>{events.map((event) => event.duration || 30)} minutes</span>
					</div>

					<div className="meeting-info">
						<FaVideo />
						<span>Google Meet</span>
					</div>
					<div className="meeting-info">
						<ImPriceTags />
						<span>Even Price</span>
						<div className="price">
							{events[0]?.price > 0 && (
								<div className="price-tag">
									{events[0]?.discount > 0 && (
										<>
											<span className="original-price">
												{formatPrice(events[0]?.price)}
											</span>
											{/* <span className="discount-badge">
												{events[0]?.discount}% OFF
											</span> */}
										</>
									)}
									<span className="new-price">
										{formatPrice(
											calculateDiscountedPrice(
												events[0]?.price,
												events[0]?.discount
											)
										)}
									</span>
								</div>
							)}
							{events[0]?.price === 0 && (
								<div className="price-tag">
									<span className="new-price">Free</span>
								</div>
							)}
						</div>
					</div>

					<p className="meeting-description">
						{events.map((event) => event.description || "")}
					</p>

					{/* <button className="book-meeting" onClick={login}>
						Sync With Google
					</button> */}
				</div>

				{!isBooked ? (
					<div className="meeting-scheduler__right">
						<div className="calendar-container">
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

						<form onSubmit={handleSchedule} className="booking-form">
							<input type="text" name="name" placeholder="Your Name" required />
							<input
								type="email"
								name="email"
								placeholder="Your Email"
								required
							/>
							<textarea
								name="additionalInfo"
								placeholder="Additional Information"
								rows={4}
							/>
							<button type="submit">Schedule Event</button>
						</form>
						{/* Display error message if exists */}
						{error && (
							<div className="error-message">
								<p>{error}</p>
							</div>
						)}
					</div>
				) : (
					<div className="meeting-scheduler__success">
						<h3>Booking successful!</h3>
						<div className="meeting-link-container">
							<h4>Join the meeting:</h4>
							<a href={meetingLink} className="meeting-link">
								{meetingLink
									? meetingLink
									: "https://meet.google.com/hur-sdhb-mnu"}
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MeetingScheduler;
