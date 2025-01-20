import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import smallline from "../images/Line 152.png";
import Modal from "react-modal";
import "./home.scss";
import { environment } from "../../../../../environments/environment";
import { usePaymentFlow } from "../../../../../hooks/usePaymentFlow";

const Home = () => {
	const baseUrl = environment.baseUrl;
	const [startAnimation, setStartAnimation] = useState(false);
	const navigate = useNavigate();
	const paymentFlow = usePaymentFlow();

	useEffect(() => {
		setStartAnimation(true);
	}, []);

	return (
		<div className="home">
			<div className="home__container">
				<div className="main-banner">
					{/* Background Image */}
					<div className="banner-bg">
						<div className="best-startup">
							<img src={smallline} alt="" className="smallline" />
							<h1>
								<b>
									# No 1 Company For <span id="headBanner">Startup</span>
								</b>
							</h1>
							<img src={smallline} alt="" className="smallline" />
						</div>

						{/* Green Arrow */}
						{/* <div className="arrow-container">
							<img className="green-arrow" src={arrow1} alt="green arrow" />
						</div> */}

						<h1 className="main-heading">
							India’s Leading Startup <br />
							Ecosystem
						</h1>

						<center>
							<p className="description-1">
								Unleash Your Startup’s Full Potential Today – Unlock Growth,
								Build Connections, and Reach New Milestones!
							</p>
						</center>
						<center>
							<p className="description">
								Explore Exclusive database of 2000+ Angel Investors and  500+
								VCs
							</p>
						</center>
						<center>
							<p className="description">
							Build Valuable Connections, Accelerate Your Funding, and Drive Unstoppable Growth for Your Startup.
							</p>
						</center>

						<center>
							<div className="button-cta">
								<button
									onClick={paymentFlow.handleBuyNowClick}
									className="join-button"
								>
									Buy Now
								</button>
								{/* <button className="download-button">Download Now</button> */}
							</div>
						</center>
					</div>
				</div>
			</div>

			{/* Subscription Modal */}
			<Modal
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
			)}
		</div>
	);
};

export default Home;
