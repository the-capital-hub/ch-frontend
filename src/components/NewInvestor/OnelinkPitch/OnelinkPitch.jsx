import React from "react";
import UserPic from "../../../Images/investorOneLink/UserPic.png";
import BatchImag from "../../../Images/tick-mark.png";
import { Link, useLocation } from "react-router-dom";
import "./OnelinkPitch.scss";

const OnelinkPitch = ({ user, isProfilePage = false }) => {
	const location = useLocation();
	const basePath = location.pathname.split("/").slice(0, -1).join("/");
	return (
		<div className="pitch-container">
			<div className="pitch-cards">
				<div className="profile-card-container">
					{isProfilePage ? (
						<div className="image_name_section card-content">
							<img
								className="rounded-cirlce"
								src={user?.profilePicture}
								alt="profileimage"
							/>
							<div className="left_profile_text flex_content ms-3">
								<h2 className="typography" style={{ textDecoration: "none" }}>
									{user?.firstName} {user?.lastName}{" "}
									{user?.isSubscribed && (
										<img
											src={BatchImag}
											style={{
												width: "1.4rem",
												height: "1.4rem",
												objectFit: "contain",
												marginLeft: "4px",
												marginBottom: "4px",
											}}
											alt="Batch Icon"
										/>
									)}
								</h2>
								<span className="small_typo">
									{user?.designation || ` `}, {user.company}
								</span>
								<span className="small_typo" style={{ display: "block" }}>
									{" "}
									{user?.location} | {user?.experience} of Experience
								</span>
							</div>
						</div>
					) : (
						<div className="profile-card card-content">
							<div className="avatar">
								<img src={UserPic} alt="Profile" />
							</div>
							<h2>Pramod Badiger</h2>
							<p className="title">
								Founder & CEO of capital Hub, Bangalore , India
							</p>
							<p className="quote">
								A little about myself. "
								<span>
									Dejection is a sign of failure but becomes the cause of
									success{" "}
								</span>
								"
							</p>
						</div>
					)}

					<div className="action-buttons">
						<Link to={`${basePath}/pitchdays`}>
							<button className="view-pitch">View Pitch Day</button>
						</Link>
					</div>
				</div>

				<div className="profile-card-container">
					<div className="video-card card-content">
						<button className="play-button">
							<span className="play-icon">▶</span>
						</button>
					</div>

					<div className="action-buttons">
						<Link to={`${basePath}/documentation/onelinkpitch`}>
							<button className="view-recording">View Pitch Recording</button>
						</Link>
					</div>
				</div>

				<div className="profile-card-container">
					<div className="info-card card-content">
						<h2>Pitch Day</h2>
						<p className="description">
							Will provide a detailed feedback for you startup pitchcheck,Will
							provide a detailed feedback for you startup pitchcheck Dejection
							is a sign of failure...
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

					<div className="action-buttons">
						<Link to={`${basePath}/register`}>
							<button className="register">Register Your Spot</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OnelinkPitch;
