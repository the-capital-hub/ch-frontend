import React from "react";
import { useSelector } from "react-redux";
import "./ResourcesNew.scss";
import Picture1 from "./images/Picture1.png";
import Picture2 from "./images/Picture2.png";
import Picture3 from "./images/Picture3.png";
import Picture4 from "./images/Picture4.png";
import Hustler from "./images/hustler.png";
import lock from "./images/lock.png";

const ResourcesNew = () => {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	console.log("loggedInUser", loggedInUser.isSubscribed);
	return (
		<div className="resources-new-container">
			<div className="resource-main">
				<div className="resource-new-header">
					<div className="hustler-img-text">
						{/* Add the logo image here */}
						<img
							src={Hustler}
							alt="Hustlers Club Logo"
							className="logo-image"
						/>
						<p className="sub-text1">
							{loggedInUser.isSubscribed ? (
								<>
									Welcome to the
									<span className="hustler-text"> Hustlers Club</span>
								</>
							) : (
								"Hey Pramod !"
							)}
						</p>
						<p className="sub-text">
							{loggedInUser.isSubscribed
								? "Hustlers Club gives you all the tools and support you need to take your startup to the next level."
								: "Get Ready with Pitch & GTM plans"}
						</p>
					</div>
					{!loggedInUser.isSubscribed && (
						<div className="pricing">
							<div className="pricing-details">
								<h3>Unlock Premium Resources</h3>
								<h4>
									INR <span>1,999</span>
								</h4>
								<button>Get Premium</button>
							</div>
						</div>
					)}
					{!loggedInUser.isSubscribed && (
						<button className="buy-now-btn">Join Beta Group Now</button>
					)}
				</div>
				<div className="resource-cards-container">
					<div className="resource-access-text">
						{!loggedInUser.isSubscribed ? " Access Now (Locked)" : "Access Now"}
					</div>
					<div className="resources-cards">
						<div className="card">
							<div className="resource-card-header">
								<img src={Picture1} alt="" />
								{!loggedInUser.isSubscribed && (
									<div className="card-lock-icon">
										locked <img className="lock" src={lock} alt="" />
									</div>
								)}
							</div>
							<span>GTM Strategy</span>
						</div>
						<div className="card">
							<div className="resource-card-header">
								<img src={Picture3} alt="" />
								{!loggedInUser.isSubscribed && (
									<div className="card-lock-icon">
										locked <img className="lock" src={lock} alt="" />
									</div>
								)}
							</div>
							<span>Sales & Marketing Plans</span>
						</div>
						<div className="card">
							<div className="resource-card-header">
								<img src={Picture4} alt="" />
								{!loggedInUser.isSubscribed && (
									<div className="card-lock-icon">
										locked <img className="lock" src={lock} alt="" />
									</div>
								)}
							</div>
							<span>Pitch Deck</span>
						</div>
						<div className="card">
							<div className="resource-card-header">
								<img src={Picture2} alt="" />
								{!loggedInUser.isSubscribed && (
									<div className="card-lock-icon">
										locked <img className="lock" src={lock} alt="" />
									</div>
								)}
							</div>
							<span>Financial Modelling</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResourcesNew;
