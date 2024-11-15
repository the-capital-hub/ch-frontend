import React, { useState, useEffect } from "react";
import { BsCalendar, BsClock } from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi";
import { environment } from "../../../environments/environment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import "./Plans.scss";

const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const Spinner = () => (
	<div className="loader-container">
		<div className="loader">
			<div className="loader-inner"></div>
		</div>
	</div>
);

const Meetings = () => {
	const theme = useSelector(selectTheme);
	const [activeTab, setActiveTab] = useState("upcoming");
	const [meetings, setMeetings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [cancelLoading, setCancelLoading] = useState(null);

	const fetchMeetings = () => {
		setLoading(true);
		fetch(`${baseUrl}/meetings/getALLScheduledMeetings`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setLoading(false);
				setMeetings(data.data);
			})
			.catch((error) => {
				setLoading(false);
				console.error("Error fetching meetings:", error);
			});
	};

	useEffect(() => {
		fetchMeetings();
	}, []);

	const cancelScheduledMeeting = (meetingId) => {
		setCancelLoading(meetingId);
		fetch(`${baseUrl}/meetings/cancelScheduledMeeting/${meetingId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Canceled meeting", data);
				// Refetch meetings after cancellation
				fetchMeetings();
			})
			.catch((error) => {
				console.error("Error canceling meeting:", error);
			})
			.finally(() => {
				setCancelLoading(null);
			});
	};

	if (loading || !meetings) {
		return <Spinner />;
	}
	// console.log("meetings", meetings);
	return (
		<div
			className={`meetings-container ${theme === "dark" ? " dark-theme" : ""}`}
		>
			<div className="meetings-wrapper">
				<div className="meetings-header">
					<h1>Plans</h1>
					<div className="tabs">
						<button
							className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
							onClick={() => setActiveTab("upcoming")}
						>
							Upcoming
						</button>
						<button
							className={`tab ${activeTab === "past" ? "active" : ""}`}
							onClick={() => setActiveTab("past")}
						>
							Past
						</button>
					</div>
				</div>
				<div className="meetings-list">
					{meetings.map((meeting) => (
						<div key={meeting?._id} className="meeting-card">
							<div className="meeting-details">
								<h3>{meeting?.eventId?.title}</h3>
								<p className="with-text">
									with {meeting?.name + " (" + meeting?.email + ")"}
								</p>
								<p className="subtitle">{meeting?.additionalInfo}</p>

								<div className="meeting-meta">
									<div className="meta-item">
										<BsCalendar />
										<span>{meeting?.date}</span>
									</div>
									<div className="meta-item">
										<BsClock />
										<span>{meeting?.eventId?.duration} minutes</span>
									</div>
								</div>

								<div className="meeting-actions">
									<Link to={`${meeting?.meetingLink}`}>
										<button className="join-btn">
											<HiVideoCamera />
											Join Meeting
										</button>
									</Link>
									<button
										className="cancel-btn"
										onClick={() => cancelScheduledMeeting(meeting?._id)}
										disabled={cancelLoading === meeting?._id}
									>
										{cancelLoading === meeting?._id
											? "Cancelling..."
											: "Cancel Meeting"}
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Meetings;

// // MeetingsView.jsx
// import React, { useState, useEffect } from "react";
// import { BsCalendar, BsClock } from "react-icons/bs";
// import { HiVideoCamera } from "react-icons/hi";
// import { environment } from "../../../environments/environment";
// import { Link, useNavigate } from "react-router-dom";
// import "./Plans.scss";
// const baseUrl = environment.baseUrl;
// const token = localStorage.getItem("accessToken");

// const Spinner = () => (
// 	<div className="loader-container">
// 		<div className="loader">
// 			<div className="loader-inner"></div>
// 		</div>
// 	</div>
// );

// const MeetingsView = () => {
// 	const [activeTab, setActiveTab] = useState("upcoming");
// 	const [meetings, setMeetings] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	// const navigate = useNavigate();
// 	// console.log("meeting", meeting);

// 	useEffect(() => {
// 		setLoading(true);
// 		fetch(`${baseUrl}/meetings/getALLScheduledMeetings`, {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`,
// 			},
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				setLoading(false);
// 				setMeetings(data.data);
// 			})
// 			.catch((error) => {
// 				setLoading(false);
// 				console.error("Error fetching meetings:", error);
// 			});
// 	}, []);

// 	// const meetings = [
// 	// 	{
// 	// 		id: 1,
// 	// 		title: "1:1 meet check",
// 	// 		with: "Arun Dwivedi",
// 	// 		subtitle: "Schedule bisweekly meet?",
// 	// 		date: "November 11, 2024",
// 	// 		time: "12:30 PM - 1:00 PM",
// 	// 		joinUrl: "#",
// 	// 	},
// 	// ];

// 	if (loading || !meetings) {
// 		return <Spinner />;
// 	}

// 	// const handleMeetingClick = (meetingLink) => {
// 	// 	navigate(`${meetingLink}`);
// 	// };

// 	const cancelScheduledMeeting = (meetingId) => {
// 		fetch(`${baseUrl}/meetings/cancelScheduledMeeting/${meetingId}`, {
// 			method: "DELETE",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`,
// 			},
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				console.log("canceled meeting", data);
// 			})
// 			.catch((error) => {
// 				console.error("Error fetching meetings:", error);
// 			});
// 	};
// 	// console.log("meeting", meeting);
// 	return (
// 		<div className="meetings-container">
// 			<div className="meetings-wrapper">
// 				<div className="meetings-header">
// 					<h1>Plans</h1>
// 					<div className="tabs">
// 						<button
// 							className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
// 							onClick={() => setActiveTab("upcoming")}
// 						>
// 							Upcoming
// 						</button>
// 						<button
// 							className={`tab ${activeTab === "past" ? "active" : ""}`}
// 							onClick={() => setActiveTab("past")}
// 						>
// 							Past
// 						</button>
// 					</div>
// 				</div>
// 				<div className="meetings-list">
// 					{meetings.map((meeting) => (
// 						<div key={meeting?._id} className="meeting-card">
// 							<div className="meeting-details">
// 								<h3>{meeting?.eventId?.title}</h3>
// 								<p className="with-text">with {meeting?.with}</p>
// 								<p className="subtitle">{meeting?.additionalInfo}</p>

// 								<div className="meeting-meta">
// 									<div className="meta-item">
// 										<BsCalendar />
// 										<span>{meeting?.date}</span>
// 									</div>
// 									<div className="meta-item">
// 										<BsClock />
// 										<span>{meeting?.eventId?.duration}</span>
// 									</div>
// 								</div>

// 								<div className="meeting-actions">
// 									<Link to={`${meeting?.meetingLink}`}>
// 										<button className="join-btn">
// 											<HiVideoCamera />
// 											Join Meeting
// 										</button>
// 									</Link>
// 									<button
// 										className="cancel-btn"
// 										onClick={() => cancelScheduledMeeting(meeting?._id)}
// 									>
// 										Cancel Meeting
// 									</button>
// 								</div>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default MeetingsView;
