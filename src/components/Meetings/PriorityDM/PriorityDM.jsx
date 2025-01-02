import React, { useState, useEffect } from "react";
import { BsCalendar, BsClock } from "react-icons/bs";
import { HiVideoCamera } from "react-icons/hi";
import { environment } from "../../../environments/environment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import {
	getPriorityDMForUser,
	getPriorityDMForFounder,
	updatePriorityDM,
} from "../../../Service/user";

import "./PriorityDM.scss";

const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const Spinner = ({ isInvestor }) => (
	<div className="loader-container">
		<div className={`${isInvestor ? "investor-loader" : "loader"}`}>
			<div className="loader-inner"></div>
		</div>
	</div>
);

const Meetings = () => {
	const theme = useSelector(selectTheme);
	const [activeTab, setActiveTab] = useState("my-questions");
	const [meetings, setMeetings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [cancelLoading, setCancelLoading] = useState(null);
	const [isInvestor, setIsInvestor] = useState(false);

	const loggedInUser = useSelector((state) => state.user.loggedInUser);

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
		setIsInvestor(loggedInUser.isInvestor);
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
		return <Spinner isInvestor={isInvestor} />;
	}
	// console.log("meetings", meetings);
	return (
		<div
			className={`meetings-container ${theme === "dark" ? "dark-theme" : ""} ${
				isInvestor ? "investor-theme" : ""
			}`}
		>
			<div className="meetings-wrapper">
				<div className="meetings-header">
					<h1>Priority DM</h1>
					<div className="tabs">
						<button
							className={`tab ${activeTab === "my-questions" ? "active" : ""}`}
							onClick={() => setActiveTab("my-questions")}
						>
							My Questions
						</button>
						<button
							className={`tab ${activeTab === "unanswered" ? "active" : ""}`}
							onClick={() => setActiveTab("unanswered")}
						>
							Un Answered
						</button>
						<button
							className={`tab ${activeTab === "answered" ? "active" : ""}`}
							onClick={() => setActiveTab("answered")}
						>
							Answered
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
