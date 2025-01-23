import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import smallline from "../images/Line 152.png";
import Modal from "react-modal";
import "./home.scss";
import {usePaymentFlow} from "../../../../hooks/usePaymentFlow";

const Home = ({ rawUser, onClaimProfile }) => {
	const [startAnimation, setStartAnimation] = useState(false);
	const [isInfoVisible, setIsInfoVisible] = useState(false);
	const navigate = useNavigate();
	const paymentFlow = usePaymentFlow();

	useEffect(() => {
		setStartAnimation(true);

		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const triggerPosition = 300; // Adjust this value as needed

			if (scrollPosition > triggerPosition) {
				setIsInfoVisible(true);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div className="home">
			<div className="home__container">
				<div className="main-banner">
					<div className="banner-bg">
			
						{/* Profile Section */}
						<div className="profile-section">
							<div className="profile-image">
								<img 
									src={rawUser?.profilePicture} 
									alt={`${rawUser?.firstName} ${rawUser?.lastName}`} 
								/>
							</div>
							<h1 className="welcome-text">
								Welcome {rawUser?.firstName} {rawUser?.lastName}
							</h1>
							<p className="attention-text">
								YOUR STARTUP IS GAINING ATTENTION—20 INVESTORS HAVE ALREADY VIEWED YOUR PROFILE!
							</p>
							<p className="cta-text">
								BOOST YOUR GAME, REACH NEW FAME, CLAIM YOUR PROFILE NOW TO PING YOUR DREAM ANGEL INVESTORS!
							</p>
							<button className="claim-button" onClick={onClaimProfile}>
								Claim Now
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* New info box section */}
			<div className={`info-box ${isInfoVisible ? 'visible' : ''}`}>
				<h2>Welcome <span className="highlight">{rawUser?.firstName} {rawUser?.lastName}</span>!</h2>
				<p>We've Started Setting Up Your Profile On Capital Hub, And Guess What? In Just A Short Time, 20 Investors Have Already Viewed Your Profile!</p>
				<p>You're On The Radar Of Our Curated Network Of 500+ VCs And 1000+ Angel Investors—And They're Eager To Learn More About Your Startup. But Before You Can Dive In And See Who's Interested, You Need To Complete Your Profile And Claim Your Spot.</p>
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
