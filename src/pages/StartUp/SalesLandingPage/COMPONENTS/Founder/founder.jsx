import React, { useState, useEffect, useRef } from "react";
import bg from "../images/Polygon 12.png";
import dot from "../images/Ellipse 9.png";
import blurdot from "../images/Ellipse 12.png";
import small from "../images/Ellipse 20.png";
import "./founder.scss";
import { useNavigate } from "react-router-dom";
import profile from "../images/profile.png";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import { environment } from "../../../../../environments/environment";
import { toast } from 'react-toastify';
import { sendOTP, verifyOTP, postUserLogin, updateUserAPI } from "../../../../../Service/user";
import { loginSuccess } from "../../../../../Store/features/user/userSlice";
import { load } from "@cashfreepayments/cashfree-js";
import { usePaymentFlow } from "../../../../../hooks/usePaymentFlow";

const Founder = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showOtpModal, setShowOtpModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
		userType: ""
	});
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [orderId, setOrderId] = useState("");
	const inputRefs = useRef([]);
	const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
	const paymentFlow = usePaymentFlow();

	const handleInputChange = (e) => { /* ... */ };
	const initializeCashfree = async () => { /* ... */ };
	const handleOtpChange = (index, value) => { /* ... */ };
	const handleKeyDown = (index, e) => { /* ... */ };
	const handleSubmit = async (e) => { /* ... */ };
	const handleOtpVerify = async () => { /* ... */ };
	const processPayment = async () => { /* ... */ };
	const verifyPayment = async (orderId) => { /* ... */ };

	const handleBuyNowClick = () => {
		paymentFlow.setIsModalOpen(true);
	};

	return (
		<div className="founder-container">
			<div className="heading">
				<h1>Meet the Visionary Behind It All</h1>
			</div>

			<div className="founder_info">
				<div className="founder_img">
					<img src={profile} alt="profile"></img>
				</div>
				<div className="founder_text">
					<h1>Pramod Badiger</h1>
					{/* <h3>Pramod Badiger -</h3> */}
					<h4>
						<span>The Force Behind Capital Hub</span>
					</h4>
					<p>
						With a decade of experience in guiding startups, Pramod Badiger,
						Founder & CEO of Capital HUB, has a clear mission: to build India’s
						largest platform for startup founders and investors. Pramod is known
						for combining structured processes with innovative strategies that
						empower founders to take control of their growth journey.
					</p>
				</div>
				<p id="read-more-desc">
					With a decade of experience in guiding startups, Pramod Badiger,
					Founder & CEO of Capital HUB, has a clear mission: to build India’s
					largest platform for startup founders and investors. Pramod is known
					for combining structured processes with innovative strategies that
					empower founders to take control of their growth journey.
				</p>
			</div>

			<img src={dot} alt="dot1" className="background-img dot1" />
			<img src={small} alt="small" className="background-img small" />
			<img src={dot} alt="dot2" className="background-img dot2" />
			<img src={blurdot} alt="blur-dot1" className="background-img blur-dot1" />
			<img src={blurdot} alt="blur-dot2" className="background-img blur-dot2" />
			<img src={blurdot} alt="blur-dot3" className="background-img blur-dot3" />
			<img src={bg} alt="background" className="background-img bg" />

			<div className="founder_about">
				<h2>A Mentor and An Innovator</h2>
				<p>
					Pramod is passionate about creating spaces where founders can not only
					raise funds but also learn, grow, and succeed on their own terms. He’s
					guided numerous startups through their early stages, providing
					personalised advice and a steady hand during critical growth phases
				</p>
				<h2>Your Silent Partner In Success</h2>
				<p>
					Known as the “silent cheerleader” at Capital HUB, Pramod is dedicated
					to helping founders realise their vision, offering support without
					overwhelming them with opinions. His unique ability to connect
					startups with investors has built Hustlers Club into a community that
					fosters innovation and growth.
				</p>
			</div>

			<div className="sales_pitch">
				<h1>
					How <span>Hustlers Club & Capital HUB</span> Help You Become a Great
					Founder
				</h1>
				<h3>
					Start by <span>downloading the database</span> and making your first
					connection.
				</h3>
				<h3>
					Join Hustlers Club to <span>learn from experts,</span>perfect your
					pitch, and attend exclusive events.
				</h3>
				<h3>
					Use Capital HUB's <span>tools, investor network, and platform</span>to
					scale faster
				</h3>
				<br></br>
				<br></br>
				<br></br>
				<h1>The Best Part? It's All Yours for Just INR 1,999/-</h1>
				<h3>
					Limited-Time Offer. Unlock the full Power of Hustlers Club and Capital
					HUB for INR 1,999
				</h3>
			</div>

			<div className="pricing">
				<div className="pricing-details">
					<h3>Unlock Premium Resources</h3>
					<h4>
						INR <span>1,999</span>
					</h4>
					<button onClick={handleBuyNowClick}>Get Premium</button>
				</div>
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
		</div>
	);
};

export default Founder;
