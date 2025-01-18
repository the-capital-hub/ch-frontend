import React from "react";
import "./ProcessNew.scss";
import step1Img from "../images/step1profileCreated.png";
import step2Img from "../images/step2Resources.png";
import step3Img from "../images/step3DocumentWithOnelink.png";
import step4Img from "../images/step4ProfileCreated.png";
import step5Img from "../images/founterCard.png";
import step6Img from "../images/startupCard.png";

import finallyImg from "../imagesNew/finally-img.png";
import eventsImg from "../imagesNew/events.png";
import webinar from "../imagesNew/webinar.png";
import pitchDays from "../imagesNew/pitch-days.png";
import networkingEvents from "../imagesNew/networking-events.png";

const ProcessNew = () => {
	return (
		<div className="process-new-container">
			<h1>Follow the Steps</h1>
			<div className="process-steps-wrapper">
				{/* step 1 */}
				<div className="process-step">
					<p className="step-number">Step 1</p>
					<div className="step1">
						<div className="step-left">
							<div className="step-header">
								<h2> Create a profile</h2>
							</div>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud
							</p>
						</div>

						<div className="step-content">
							<img src={step1Img} alt="Step 4" className="step-img" />
						</div>
					</div>
				</div>

				<div className="process-two">
					{/* Step 2 */}
					<div className="process-step">
						<p className="step-number">Step 2</p>
						<div className="step-header">
							<h2>Access resources</h2>
						</div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incAccessing the right business resources is
							critical for growth and success in today’s competitive market.
						</p>
						<div className="step-content">
							<img src={step2Img} alt="Step 2" className="step-img" />
							{/* <p>
								Gain valuable insights from industry experts and investors.
								Build your network for future growth.
							</p>
							<div className="step-buttons">
								<button className="primary-button">Explore Mentors</button>
							</div> */}
						</div>
					</div>
					{/* Step 3 */}
					<div className="process-step">
						<p className="step-number">Step 3</p>
						<div className="step-header">
							<h2>Build documents with one link</h2>
						</div>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incAccessing
						</p>
						<div className="step-content">
							<img src={step3Img} alt="Step 3" className="step-img" />
							{/* <p>
								Efficiently connect with investors to secure funding for your
								business.
							</p>
							<div className="step-buttons">
								<button className="primary-button">Get Started Now</button>
							</div> */}
						</div>
					</div>
				</div>

				{/* Step 4 */}
				<div className="process-step">
					<p className="step-number">Step 4</p>
					<div className="step-header">
						<h2> Explore 1000+ investors and 500 + VC’s</h2>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Access
						resources that help you grow efficiently.
					</p>
					<div className="step-content">
						<img src={step4Img} alt="Step 4" className="step-img" />
					</div>
				</div>

				<div className="process-two">
					{/* Step 5 */}
					<div className="process-step">
						<p className="step-number">Step 5</p>
						<div className="step-header">
							<h2>Reach Out to Mentors & Investors</h2>
						</div>
						<div className="step-content">
							<img src={step5Img} alt="Step 5" className="step-img" />
							<p>
								Gain valuable insights from industry experts and investors.
								Build your network for future growth.
							</p>
							<div className="step-buttons">
								<button className="primary-button">Explore Mentors</button>
							</div>
						</div>
					</div>
					{/* Step 6 */}
					<div className="process-step">
						<p className="step-number">Step 6</p>
						<div className="step-header">
							<h2>Raise Investments Efficiently</h2>
						</div>
						<div className="step-content">
							<img src={step6Img} alt="Step 6" className="step-img" />
							<p>
								Efficiently connect with investors to secure funding for your
								business.
							</p>
							<div className="step-buttons">
								<button className="primary-button">Get Started Now</button>
							</div>
						</div>
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
