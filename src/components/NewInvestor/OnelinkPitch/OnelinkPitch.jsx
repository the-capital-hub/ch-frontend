import React from "react";
import UserPic from "../../../Images/investorOneLink/UserPic.png";
import "./OnelinkPitch.scss";

const OnelinkPitch = () => {
	return (
		<div className="pitch-container">
			<div className="pitch-cards">
				<div className="profile-card">
					<div className="avatar">
						<img src={UserPic} alt="Profile" />
					</div>
					<h2>Pramod Badiger</h2>
					<p className="title">
						Founder & CEO of capital Hub, Bangalore , India
					</p>
					<p className="quote">
						A little about myself. "Dejection is a sign of failure but becomes
						the cause of success"
					</p>
				</div>

				<div className="video-card">
					<button className="play-button">
						<span className="play-icon">▶</span>
					</button>
				</div>

				<div className="info-card">
					<h2>Pitch Day</h2>
					<p className="description">
						Will provide a detailed feedback for you startup pitchcheck,Will
						provide a detailed feedback for you startup pitchcheck Dejection is
						a sign of failure...
					</p>

					<div className="meeting-info">
						<div className="duration">
							<span className="calendar-icon">📅</span>
							<div className="time-details">
								<h3>30 Mins</h3>
								<p>Video Meeting</p>
							</div>
						</div>
						<div className="price">Rs.6,500+</div>
					</div>

					<div className="price-breakup">
						<span className="info-icon">ℹ</span>
						Price Breakup
					</div>
				</div>
			</div>

			<div className="action-buttons">
				<button className="view-pitch">View Pitch Day</button>
				<button className="view-recording">View Pitch Recording</button>
				<button className="register">Register Your Spot</button>
			</div>
		</div>
	);
};

export default OnelinkPitch;
