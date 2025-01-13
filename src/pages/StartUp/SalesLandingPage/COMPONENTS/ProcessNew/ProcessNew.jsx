import React from "react";
import step2img from "../imagesNew/process-step-2-img.png";
import step3img from "../imagesNew/process-step-3-img.png";
import step5img from "../imagesNew/process-step-5-img.png";
import finallyImg from "../imagesNew/finally-img.png";
import eventsImg from "../imagesNew/events.png";
import webinar from "../imagesNew/webinar.png";
import pitchDays from "../imagesNew/pitch-days.png";
import networkingEvents from "../imagesNew/networking-events.png";
import "./ProcessNew.scss";

const ProcessNew = () => {
	return (
		<div className="process-new-container">
			<h1>Follow the Steps</h1>

			<div className="process-new-content">
				<div className="process-new-steps">
					<div className="process-new-step">
						<p className="step">Step 1</p>
					</div>
					<div className="process-new-body">
						<h2>Create a profile</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud
						</p>
					</div>
				</div>
				<div className="process-new-steps">
					<div className="process-new-step">
						<p className="step">Step 2</p>
					</div>
					<div className="process-new-body">
						<h2>Access resources</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incAccessing the right business resources is
							critical for growth and success in today’s competitive market.
							Whether you're starting a new venture or scaling an existing one,
							tools like market research platforms, financial management
							software,ididunt ut labore et dolore magna aliqua. Ut enim ad
							minim veniam, quis nostrud
						</p>
					</div>
					<div className="process-new-images">
						<img src={step2img} alt="" />
					</div>
				</div>
				<div className="process-new-steps">
					<div className="process-new-step">
						<p className="step">Step 3</p>
					</div>
					<div className="process-new-body">
						<h2>Build documents with One link</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incAccessing the right business resources is
							critical for growth and success in today’s competitive market.
							Whether you're starting ...
						</p>
					</div>
					<div className="process-new-images">
						<img src={step3img} alt="" />
					</div>
				</div>
				<div className="process-new-steps">
					<div className="process-new-step">
						<p className="step">Step 4</p>
					</div>
					<div className="process-new-body">
						<h2> Explore 1000+ investors and 500 + VC’s</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incAccessing the right business resources is.....
						</p>
					</div>
				</div>
				<div className="process-new-steps">
					<div className="process-new-step">
						<p className="step">Step 5</p>
					</div>
					<div className="process-new-body">
						<h2>Reach out to mentors and investors</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incAccessing the right business resources is. Lorem
							ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
							tempor incAccessing the right business resources is.....
						</p>
					</div>
					<div className="process-new-images">
						<img className="step5img" src={step5img} alt="" />
					</div>
				</div>
				<div className="process-new-steps">
					<div className="process-new-step">
						<p className="step">Step 6</p>
					</div>
					<div className="process-new-body">
						<h2>Raise investments efficiently</h2>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incAccessing the right business resources is. Lorem
							ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
							tempor incAccessing the right business resources is.....
						</p>
					</div>
				</div>
			</div>

			<div className="process-new-content-2">
				<div className="process-new-finally">
					<div className="finally-img-container">
						<img className="finally-img" src={finallyImg} alt="" />
					</div>
					<div className="process-new-finally-content">
						<h3>Finally</h3>
						<p>
							Join Hustler’s club to connect with like minded startups, angel
							investors and VC’s in an invite only community powered by Capital
							HUB.
						</p>
					</div>
				</div>

				<div className="process-new-finally-cards">
					<div className="process-new-finally-card">
						<div className="process-new-finally-card-top">
							<img src={eventsImg} alt="" />
							<h3>Events</h3>
						</div>
						<p>
							Learn from top investors and founders. These invite-only sessions
							will help you sharpen your growth strategies.
						</p>
					</div>
					<div className="process-new-finally-card">
						<div className="process-new-finally-card-top">
							<img src={webinar} alt="" />
							<h3>Webinar</h3>
						</div>
						<p>
							Learn from top investors and founders. These invite-only sessions
							will help you sharpen your growth strategies.
						</p>
					</div>
					<div className="process-new-finally-card">
						<div className="process-new-finally-card-top">
							<img src={pitchDays} alt="" />
							<h3>Pitch Days</h3>
						</div>
						<p>
							Learn from top investors and founders. These invite-only sessions
							will help you sharpen your growth strategies.
						</p>
					</div>
					<div className="process-new-finally-card">
						<div className="process-new-finally-card-top">
							<img src={networkingEvents} alt="" />
							<h3>Networking Events</h3>
						</div>
						<p>
							Learn from top investors and founders. These invite-only sessions
							will help you sharpen your growth strategies.
						</p>
					</div>
				</div>

				<div className="process-new-finally-button">
					<button>Get Started Now</button>
				</div>
			</div>
		</div>
	);
};

export default ProcessNew;
