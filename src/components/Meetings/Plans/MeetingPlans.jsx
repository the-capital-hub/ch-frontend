// MeetingsView.jsx
import React, { useState, useEffect } from "react";
import { BsCalendar, BsClock } from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi";
import { environment } from "../../../environments/environment";
import { Link, link, useNavigate } from "react-router-dom";
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

const MeetingsView = () => {
	const [activeTab, setActiveTab] = useState("upcoming");
	const [meeting, setMeeting] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	// console.log("meeting", meeting);

	useEffect(() => {
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
				setMeeting(data.data);
			})
			.catch((error) => {
				setLoading(false);
				console.error("Error fetching meetings:", error);
			});
	}, []);

	// const meetings = [
	// 	{
	// 		id: 1,
	// 		title: "1:1 meet check",
	// 		with: "Arun Dwivedi",
	// 		subtitle: "Schedule bisweekly meet?",
	// 		date: "November 11, 2024",
	// 		time: "12:30 PM - 1:00 PM",
	// 		joinUrl: "#",
	// 	},
	// ];

	if (loading || !meeting) {
		return <Spinner />;
	}

	// const handleMeetingClick = (meetingLink) => {
	// 	navigate(`${meetingLink}`);
	// };

	return (
		<div className="meetings-container">
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
					{meeting.map((meeting) => (
						<div key={meeting.id} className="meeting-card">
							<div className="meeting-details">
								<h3>{meeting.eventId.title}</h3>
								<p className="with-text">with {meeting.with}</p>
								<p className="subtitle">{meeting.additionalInfo}</p>

								<div className="meeting-meta">
									<div className="meta-item">
										<BsCalendar />
										<span>{meeting.date}</span>
									</div>
									<div className="meta-item">
										<BsClock />
										<span>{meeting.eventId.duration}</span>
									</div>
								</div>

								<div className="meeting-actions">
									<Link to={`${meeting?.meetingLink}`}>
										<button className="join-btn">
											<HiVideoCamera />
											Join Meeting
										</button>
									</Link>
									<button className="cancel-btn">Cancel Meeting</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default MeetingsView;
