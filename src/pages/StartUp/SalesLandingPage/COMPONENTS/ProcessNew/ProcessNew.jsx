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

import fox from "../imagesNew/fox.png";
import Exclusive from "../images/exclusive.png";

const ProcessNew = () => {
	return (
		<div className="process-new-container">
						<div className="process-new-content-2">
				<div className="process-new-finally">
					<div className="finally-img-container">
						<img className="finally-img" src={finallyImg} alt="" />
					</div>
					<div className="process-new-finally-content">
						<h3>Finally</h3>
						<p>
							Join Hustler's club to connect with like minded startups, angel
							investors and VC's in an invite only community powered by Capital
							HUB.
						</p>
					</div>
				</div>

				<div className="process-new-finally-button">
					<button>Get Started Now</button>
				</div>
			</div>
			<div className="deals-container">
				<div className="inner-container">
					<h2 className="head-two">
						Why Join <span>Hustlers Club?</span>
					</h2>

					<div className="hustler-img-text">
						<img src={fox} alt="Hustlers Club Logo" className="logo-image" />
						<p className="sub-text">
							Hustlers Club gives you all the tools and support you need to take
							your startup to the next level.
						</p>
					</div>

					<div className="exc-outer">
						<div className="exclusive-content">
							<div className="content-left">
								<h3>Exclusive webinars and Events</h3>
								<p>
									Learn from top investors and founders. These invite-only
									sessions will help you sharpen your growth strategies.
								</p>
								<h3>Pitch & Networking Events</h3> <p> Present your startup to a curated group of investors for valuable feedback on your pitch and business strategy, while also connecting with fellow entrepreneurs, investors, and industry experts in exclusive networking sessions to build meaningful relationships. </p>
							</div>
							
							
							
								
							

							<div className="content-right">
								<img src={Exclusive} alt="exclusive" />
							</div>
						</div>

						<div className="exclusive-content2">
							<div className="content-left">
								<h3>1 : 1 Discussions with Experts</h3>
								<p>
									Book private sessions with industry leaders who can offer
									insights on fundraising, business strategy, and growth.
								</p>
							</div>
						</div>
					</div>

					<center>
						<button className="head">Join Hustlers Club Now</button>
					</center>
				</div>
			</div>
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
							critical for growth and success in today's competitive market.
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
						<h2> Explore 1000+ investors and 500 + VC's</h2>
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
		</div>
	);
};

export default ProcessNew;
