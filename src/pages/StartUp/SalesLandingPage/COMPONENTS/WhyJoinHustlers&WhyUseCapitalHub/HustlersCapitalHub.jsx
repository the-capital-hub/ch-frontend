import React from "react";
import Exclusive from "../images/exclusive.png";
import dot from "../images/Ellipse 9.png";
import blurdot from "../images/Ellipse 12.png";
import small from "../images/Ellipse 20.png";
import bg from "../images/Polygon 12.png";
import fox from "../imagesNew/fox.png";
import onelink from "../imagesNew/onelink.png";
import connectStartup from "../imagesNew/connectStartup.png";
import amplifyStartup from "../imagesNew/amplifyStartup.png";
import noise from "../imagesNew/noise-bg.png";
import "./HustlersCapitalHub.scss";

const HustlersCapitalHub = () => {
	return (
		<>
			<div className="deals-container">
				<div className="inner-container">
					<h2 className="head-two">
						Why Join <span>Hustlers Club?</span>
					</h2>

					<div className="hustler-img-text">
						{/* Add the logo image here */}
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
								<button
									className="buy-now-btn"
									// onClick={() => paymentFlow.setIsModalOpen(true)}
								>
									Buy Now
								</button>
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

				{/* <Modal
					isOpen={paymentFlow.isModalOpen}
					onRequestClose={() => paymentFlow.setIsModalOpen(false)}
					className="subscription-modal"
					overlayClassName="subscription-modal-overlay"
				>
					{paymentFlow.renderSubscriptionModal()}
				</Modal>

				<Modal
					isOpen={paymentFlow.showOtpModal}
					onRequestClose={() => paymentFlow.setShowOtpModal(false)}
					className="otp-modal"
					overlayClassName="otp-modal-overlay"
				>
					{paymentFlow.renderOtpModal()}
				</Modal>

				{paymentFlow.isLoading && (
					<div className="loader-overlay">
						<div className="loader"></div>
						<p className="loader-text">Processing payment...</p>
					</div>
				)} */}
			</div>

			<div className="pricing-container">
				<div className="heading">
					<h1>
						Why Use <span>Capital HUB's</span> Platform ?
					</h1>
				</div>

				<div className="networking">
					<div className="image">
						<img src={onelink} alt="networking-pic" />
					</div>
					<div className="net-platform">
						<h1>
							<span>One</span> Link
						</h1>
						<p>
							"Streamline your startup's communication by sharing key documents,
							pitch decks, and updates through a single, easy-to-share link."
						</p>
					</div>
				</div>
				<div className="connect-with-investor">
					<div className="net-platform">
						<h1>
							Connect with the <span>Right Investors</span>
						</h1>
						<p>
							"Tap into a curated network of 500+ VCs and 1000+ angel investors,
							streamlining the process of connecting with the right backers for
							your growth."
						</p>
					</div>
					<div className="image">
						<img src={connectStartup} alt="networking-pic" />
					</div>
				</div>
				<div className="networking">
					<div className="amplifyStartup-image">
						<img src={amplifyStartup} alt="networking-pic" />
					</div>
					<div className="net-platform">
						<h1>
							Amplify Your <span>Startup’s Presence</span>
						</h1>
						<p>
							"Gain exposure in a dynamic ecosystem, boosting your brand
							credibility and attracting investors and partners who can
							accelerate your growth."
						</p>
					</div>
				</div>
				<div className="funding-opportunities-platform">
					<div className="funding-opportunity">
						<img src={noise} alt="" />
						<h3>Unlock Funding Opportunities</h3>
						<p>
							Gain access to pitch events and expert guidance, helping you
							connect with investors and secure the funding you need to scale.
						</p>
					</div>
					<div className="all-in-one-platform">
						<img src={noise} alt="" />
						<h3>All-in-One Platform</h3>
						<p>
							Simplify your startup's journey with an integrated platform that
							centralizes investor relations, document sharing, and
							communication in one place.
						</p>
					</div>
				</div>

				<center>
					<button className="capital-hub-today-btn">
						Scale with Capital HUB Today
					</button>
				</center>

				<img src={dot} alt="dot1" className="background-img dot1" />
				<img src={small} alt="small" className="background-img small" />
				<img src={dot} alt="dot2" className="background-img dot2" />
				<img
					src={blurdot}
					alt="blur-dot1"
					className="background-img blur-dot1"
				/>
				<img
					src={blurdot}
					alt="blur-dot2"
					className="background-img blur-dot2"
				/>
				<img
					src={blurdot}
					alt="blur-dot3"
					className="background-img blur-dot3"
				/>
				<img src={bg} alt="background" className="background-img bg" />
			</div>
		</>
	);
};

export default HustlersCapitalHub;
