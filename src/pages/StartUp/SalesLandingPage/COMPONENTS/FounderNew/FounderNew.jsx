import React from "react";
import Modal from "react-modal";
import { usePaymentFlow } from "../../../../../hooks/usePaymentFlow";
import profile from "../images/profile.png";
import profile1 from "../imagesNew/pramod-sir-pic.png";
import glow from "../imagesNew/founder-glow.png";
import "./FounderNew.scss";

const FounderNew = () => {
	const paymentFlow = usePaymentFlow();
	const handleBuyNowClick = () => {
		paymentFlow.setIsModalOpen(true);
	};
	return (
		<>
			<div className="founder-container">
				<h1>Meet the Visionary Behind Capital HUB</h1>
				<div className="founder-container-details">
					<img className="pic-desktop" src={profile} alt="profile" />
					<img className="pic-mobile" src={profile1} alt="profile" />

					<div className="founder-container-details-info">
						<div className="founder-container-details-info-name">
							Pramod Badiger <span> The Force Behind Capital HUB</span>
						</div>
						{/* <div className="founder-container-details-info-description">
							
						</div> */}
						<p className="founder-container-details-info-bio">
							Pramod Badiger, Founder and CEO of Capital HUB, is a seasoned
							startup mentor with over a decade of experience empowering
							founders to scale and succeed. Driven by a clear mission to build
							India’s largest platform for startups and investors, Pramod
							combines strategic thinking with innovation to help entrepreneurs
							navigate their growth journey.
						</p>
						<h2 className="founder-container-more-details-info1">
						An Experienced Mentor, a Strategic Innovator
					</h2>
					<p className="founder-container-details-info-bio">
						Passionate about empowering founders, Pramod has mentored countless
						startups, offering valuable insights and personalized guidance
						during critical growth stages. He helps entrepreneurs succeed on
						their own terms while providing strategic support.	
					</p>
					</div>
				</div>

				<div className="founder-container-more-details">
					{/* <h2 className="founder-container-more-details-info1">
						An Experienced Mentor, a Strategic Innovator
					</h2>
					<p className="founder-container-more-details-info2">
						Passionate about empowering founders, Pramod has mentored countless
						startups, offering valuable insights and personalized guidance
						during critical growth stages. He helps entrepreneurs succeed on
						their own terms while providing strategic support.
					</p> */}
					<h2 className="founder-container-more-details-info1">
						Your Trusted Partner in Growth
					</h2>
					<p className="founder-container-more-details-info2">
						Known as the “silent cheerleader,” Pramod connects startups with
						investors and fosters a thriving ecosystem that drives innovation,
						growth, and long-term success.
					</p>
				</div>

				<div className="pricing">
					<div className="pricing-details">
						<p>Scale Your Startup with Capital HUB & Hustlers Club</p>
						<h4>All for Just INR 1,999!</h4>
						<h3>
							Unlock unlimited access to resources, investors, mentorship, and
							tools today. Limited-time offer!
						</h3>
						<h3>
							Seize the opportunity to unlock everything you need to elevate
							your startup, all at an unbeatable price
						</h3>
						<button onClick={paymentFlow.handleBuyNowClick}>Claim Your Access Now</button>
					</div>
				</div>

				<img src={glow} className="glow1" alt="" />
				<img src={glow} className="glow2" alt="" />
				<img src={glow} className="glow3" alt="" />
				<img src={glow} className="glow4" alt="" />
			</div>

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
		</>
	);
};

export default FounderNew;
