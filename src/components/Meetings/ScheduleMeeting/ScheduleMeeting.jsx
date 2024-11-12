import React, { useState, useEffect } from "react";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
	FaCalendarAlt,
	FaVideo,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import "./ScheduleMeeting.scss";
import { useParams } from "react-router-dom";
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
	// const [bookingData, setBookingData] = useState({});
	// console.log("bookingData", bookingData);
	// console.log("user:", user, "availability:", availability);

	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => {
			// console.log("Access Token:", tokenResponse);
			// You can now use the access token to make API calls
			try {
				fetch(`${baseUrl}/users/saveMeetingToken`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ token: tokenResponse }),
				}).then((res) => {
					if (res.status === 200) {
						console.log("Token saved successfully");
					} else {
						console.log("Error saving token");
					}
				});
			} catch (error) {
				console.error("Error saving token:", error);
			}
		},
		onError: (error) => {
			console.error("Login Failed:", error);
		},
		scope:
			"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
	});

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
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (response.status === 200) {
					const data = await response.json();
					// console.log("Schedule page data:", data.data);
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
	const formatDate = (day) => {
		const monthNames = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const month = monthNames[currentDate.getMonth()];
		return `${day}, ${month}`;
	};

	const handleSchedule = (e) => {
		e.preventDefault();

		// Assuming selectedTime is in the format "HH:mm"
		const startTime = selectedTime;
		const [startHour, startMinute] = startTime.split(":").map(Number);

		// Calculate end time based on minimum gap (assuming minimumGap is in minutes)
		const minimumGap = 30; // Replace with the actual minimum gap from availability
		const endDate = new Date();
		endDate.setHours(startHour);
		endDate.setMinutes(startMinute + minimumGap);

		const endTime = `${endDate.getHours().toString().padStart(2, "0")}:${endDate
			.getMinutes()
			.toString()
			.padStart(2, "0")}`;

		// Format the selected date
		const formattedDate = formatDate(selectedDate);

		// Collect user input data
		const data = {
			startTime: startTime,
			endTime: endTime,
			date: formattedDate,
			name: e.target.name.value, // Get the name from the input field
			email: e.target.email.value, // Get the email from the input field
			additionalInfo: e.target.additionalInfo.value, // Get additional info from the textarea
			eventId: meetingId, // Use the meetingId as eventId
		};

		// make an api call to save the booking data
		try {
			fetch(`${baseUrl}/meetings/scheduleMeeting`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			})
				.then((res) => {
					if (res.ok) {
						// Use res.ok to check for a successful response
						return res.json(); // Parse the response as JSON
					} else {
						throw new Error("Error saving booking data"); // Throw an error for non-200 responses
					}
				})
				.then((data) => {
					console.log("Booking data saved successfully", data.data); // Now `data` contains the parsed JSON response
					setMeetingLink(data.data.meetingLink);
				})
				.catch((error) => {
					console.error("Error saving booking data:", error);
				});
		} catch (error) {
			console.error("Error saving booking data:", error);
		}
		// Update the booking data state
		// setBookingData(data);
		setIsBooked(true);
	};

	const getDaysInMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const handlePreviousMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
		);
		setSelectedDate(null);
	};

	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
		);
		setSelectedDate(null);
	};

	// Check if a date is available based on the availability data
	const isDateAvailable = (dayNumber) => {
		const date = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			dayNumber
		);
		const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

		// Map dayOfWeek to the corresponding day name
		const availabilityDays = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];

		// Get the corresponding day from the availability data
		const dayAvailability = availability?.dayAvailability?.find(
			(availability) => availability.day === availabilityDays[dayOfWeek]
		);

		// Check if the day is enabled
		return dayAvailability ? dayAvailability.enabled : false;
	};
	// const isDateAvailable = (dayNumber) => {
	// 	const date = new Date(
	// 		currentDate.getFullYear(),
	// 		currentDate.getMonth(),
	// 		dayNumber
	// 	);
	// 	const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

	// 	// Convert dayOfWeek to match availability format (if needed)
	// 	const availabilityDays = {
	// 		0: "sunday",
	// 		1: "monday",
	// 		2: "tuesday",
	// 		3: "wednesday",
	// 		4: "thursday",
	// 		5: "friday",
	// 		6: "saturday",
	// 	};

	// 	// Check if the day is available in the availability object
	// 	return availability[availabilityDays[dayOfWeek]]?.enabled ?? false;
	// };

	const generateCalendarDays = () => {
		const days = [];
		const daysInMonth = getDaysInMonth(currentDate);
		const firstDay = getFirstDayOfMonth(currentDate);

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDay; i++) {
			days.push(<div key={`empty-${i}`} className="date-cell" />);
		}

		// Add cells for each day of the month
		for (let i = 1; i <= daysInMonth; i++) {
			const isAvailable = isDateAvailable(i);
			days.push(
				<div
					key={i}
					className={`date-cell ${
						selectedDate === i ? "date-cell--selected" : ""
					} ${!isAvailable ? "date-cell--disabled" : ""}`}
					onClick={() => isAvailable && setSelectedDate(i)}
					style={{
						cursor: isAvailable ? "pointer" : "not-allowed",
						opacity: isAvailable ? 1 : 0.5,
					}}
				>
					{i}
				</div>
			);
		}

		return days;
	};

	const formatMonth = () => {
		return new Intl.DateTimeFormat("en-US", {
			month: "long",
			year: "numeric",
		}).format(currentDate);
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

					<p className="meeting-description">
						{events.map((event) => event.description || "")}
					</p>

					<button className="book-meeting" onClick={login}>
						Sync With Google
					</button>
				</div>

				{!isBooked ? (
					<div className="meeting-scheduler__right">
						<div className="calendar-header">
							<h3>{formatMonth()}</h3>
							<div className="nav-buttons">
								<button onClick={handlePreviousMonth}>
									<FaChevronLeft />
								</button>
								<button onClick={handleNextMonth}>
									<FaChevronRight />
								</button>
							</div>
						</div>

						<div className="calendar-grid">
							<div className="calendar-grid__days">
								<div>Su</div>
								<div>Mo</div>
								<div>Tu</div>
								<div>We</div>
								<div>Th</div>
								<div>Fr</div>
								<div>Sa</div>
							</div>

							<div className="calendar-grid__dates">
								{generateCalendarDays()}
							</div>
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
							<input
								type="text"
								name="name"
								// value="name"
								placeholder="Your Name"
								required
							/>
							<input
								type="email"
								name="email"
								// value="email"
								placeholder="Your Email"
								required
							/>
							<textarea
								name="additionalInfo"
								// value="additionalInfo"
								placeholder="Additional Information"
								rows={4}
							/>
							<button type="submit">Schedule Event</button>
						</form>
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
								{/* Join the meeting: https://meet.google.com/hur-sdhb-mnu */}
							</a>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MeetingScheduler;

// import React, { useState, useEffect } from "react";
// import {
// 	FaCalendarAlt,
// 	FaVideo,
// 	FaChevronLeft,
// 	FaChevronRight,
// } from "react-icons/fa";
// import "./ScheduleMeeting.scss";
// import { useParams } from "react-router-dom";
// import { environment } from "../../../environments/environment";
// const baseUrl = environment.baseUrl;
// const token = localStorage.getItem("accessToken");

// const Spinner = () => (
// 	<div className="loader-container">
// 		<div className="loader">
// 			<div className="loader-inner"></div>
// 		</div>
// 	</div>
// );

// const MeetingScheduler = () => {
// 	const [isBooked, setIsBooked] = useState(false);
// 	const [selectedDate, setSelectedDate] = useState(null);
// 	const [selectedTime, setSelectedTime] = useState(null);
// 	const [currentDate, setCurrentDate] = useState(new Date());
// 	const { username, meetingId } = useParams();
// 	const [loading, setLoading] = useState(false);
// 	const [user, setUser] = useState({});
// 	const [availability, setAvailability] = useState({});
// 	const [events, setEvents] = useState({});
// 	// console.log("username", username, "meetingId", meetingId);

// 	// /getSchedulePageData/:username/:eventId
// 	useEffect(() => {
// 		const fetchSchedulePageData = async () => {
// 			try {
// 				setLoading(true);
// 				const response = await fetch(
// 					`${baseUrl}/meetings/getSchedulePageData/${username}/${meetingId}`,
// 					{
// 						method: "GET",
// 						headers: {
// 							"Content-Type": "application/json",
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);

// 				if (response.ok) {
// 					const data = await response.json();
// 					console.log("Schedule page data:", data.data);
// 					setUser(data.data.user);
// 					setAvailability(data.data.availability);
// 					setEvents(data.data.events);
// 					setLoading(false);
// 				} else {
// 					console.error("Failed to fetch schedule page data");
// 					setLoading(false);
// 				}
// 			} catch (error) {
// 				console.error("Error:", error);
// 				setLoading(false);
// 			}
// 		};

// 		fetchSchedulePageData();
// 	}, [username, meetingId]);

// 	const timeSlots = [
// 		"08:00",
// 		"09:00",
// 		"09:30",
// 		"10:00",
// 		"10:30",
// 		"11:00",
// 		"11:30",
// 		"12:00",
// 		"12:30",
// 		"13:00",
// 		"13:30",
// 		"14:00",
// 		"14:30",
// 		"15:00",
// 		"15:30",
// 		"16:00",
// 	];

// 	const handleSchedule = (e) => {
// 		e.preventDefault();
// 		setIsBooked(true);
// 	};

// 	const getDaysInMonth = (date) => {
// 		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
// 	};

// 	const getFirstDayOfMonth = (date) => {
// 		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
// 	};

// 	const handlePreviousMonth = () => {
// 		setCurrentDate(
// 			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
// 		);
// 		setSelectedDate(null);
// 	};

// 	const handleNextMonth = () => {
// 		setCurrentDate(
// 			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
// 		);
// 		setSelectedDate(null);
// 	};

// 	const generateCalendarDays = () => {
// 		const days = [];
// 		const daysInMonth = getDaysInMonth(currentDate);
// 		const firstDay = getFirstDayOfMonth(currentDate);

// 		// Add empty cells for days before the first day of the month
// 		for (let i = 0; i < firstDay; i++) {
// 			days.push(<div key={`empty-${i}`} className="date-cell" />);
// 		}

// 		// Add cells for each day of the month
// 		for (let i = 1; i <= daysInMonth; i++) {
// 			days.push(
// 				<div
// 					key={i}
// 					className={`date-cell ${
// 						selectedDate === i ? "date-cell--selected" : ""
// 					}`}
// 					onClick={() => setSelectedDate(i)}
// 				>
// 					{i}
// 				</div>
// 			);
// 		}

// 		return days;
// 	};

// 	const formatMonth = () => {
// 		return new Intl.DateTimeFormat("en-US", {
// 			month: "long",
// 			year: "numeric",
// 		}).format(currentDate);
// 	};

// 	if (loading || !user || !availability || !events) {
// 		return <Spinner />;
// 	}

// 	return (
// 		<div className="meeting-scheduler">
// 			<div className="meeting-scheduler__container">
// 				<div className="meeting-scheduler__left">
// 					<div className="profile">
// 						<div className="profile__image" />
// 						<div className="profile__info">
// 							<h2>{events && events?.map((event) => event.title || "")}</h2>
// 							<p>{user.email}</p>
// 						</div>
// 					</div>

// 					<div className="meeting-info">
// 						<FaCalendarAlt />
// 						<span>
// 							{events && events?.map((event) => event.duration || 30)} minutes
// 						</span>
// 					</div>

// 					<div className="meeting-info">
// 						<FaVideo />
// 						<span>Google Meet</span>
// 					</div>

// 					<p className="meeting-description">
// 						{events && events?.map((event) => event.description || "")}
// 					</p>
// 				</div>

// 				{!isBooked ? (
// 					<div className="meeting-scheduler__right">
// 						<div className="calendar-header">
// 							<h3>{formatMonth()}</h3>
// 							<div className="nav-buttons">
// 								<button onClick={handlePreviousMonth}>
// 									<FaChevronLeft />
// 								</button>
// 								<button onClick={handleNextMonth}>
// 									<FaChevronRight />
// 								</button>
// 							</div>
// 						</div>

// 						<div className="calendar-grid">
// 							<div className="calendar-grid__days">
// 								<div>Su</div>
// 								<div>Mo</div>
// 								<div>Tu</div>
// 								<div>We</div>
// 								<div>Th</div>
// 								<div>Fr</div>
// 								<div>Sa</div>
// 							</div>

// 							<div className="calendar-grid__dates">
// 								{generateCalendarDays()}
// 							</div>
// 						</div>

// 						<div className="time-slots">
// 							<h4>Available Time Slots</h4>
// 							<div className="time-slots__grid">
// 								{timeSlots.map((time) => (
// 									<button
// 										key={time}
// 										className={selectedTime === time ? "selected" : ""}
// 										onClick={() => setSelectedTime(time)}
// 									>
// 										{time}
// 									</button>
// 								))}
// 							</div>
// 						</div>

// 						<form onSubmit={handleSchedule} className="booking-form">
// 							<input type="text" placeholder="Your Name" required />
// 							<input type="email" placeholder="Your Email" required />
// 							<textarea placeholder="Additional Information" rows={4} />
// 							<button type="submit">Schedule Event</button>
// 						</form>
// 					</div>
// 				) : (
// 					<div className="meeting-scheduler__success">
// 						<h3>Booking successful!</h3>
// 						<a href="#" className="meeting-link">
// 							Join the meeting: https://meet.google.com/hur-sdhb-mnu
// 						</a>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default MeetingScheduler;
