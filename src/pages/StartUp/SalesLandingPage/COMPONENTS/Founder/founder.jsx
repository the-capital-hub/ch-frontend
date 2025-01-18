import React, { useState, useRef } from "react";
import bg from "../images/Polygon 7.png";
import dot from "../images/Polygon 12.png";
import blurdot from "../images/Polygon 2 (2).png";
import small from "../images/Polygon 12.png";
import "./founder.scss";
import { useNavigate } from "react-router-dom";
import profile from "../images/profile.png";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import axios from "axios";
import { environment } from "../../../../../environments/environment";
import { toast } from "react-toastify";
import {
	sendOTP,
	verifyOTP,
	postUserLogin,
	updateUserAPI,
} from "../../../../../Service/user";
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
		userType: "",
	});
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [orderId, setOrderId] = useState("");
	const inputRefs = useRef([]);
	const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
	const paymentFlow = usePaymentFlow();

	const handleInputChange = (e) => {
		/* ... */
	};
	const initializeCashfree = async () => {
		/* ... */
	};
	const handleOtpChange = (index, value) => {
		/* ... */
	};
	const handleKeyDown = (index, e) => {
		/* ... */
	};
	const handleSubmit = async (e) => {
		/* ... */
	};
	const handleOtpVerify = async () => {
		/* ... */
	};
	const processPayment = async () => {
		/* ... */
	};
	const verifyPayment = async (orderId) => {
		/* ... */
	};

	const handleBuyNowClick = () => {
		paymentFlow.setIsModalOpen(true);
	};

	return (
		<div className="founder-container">
			<div className="heading">
				<h1>Meet the Visionary Behind Capital HUB</h1>
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
						Pramod Badiger, Founder and CEO of Capital HUB, is a seasoned
						startup mentor with over a decade of experience empowering founders
						to scale and succeed. Driven by a clear mission to build India’s
						largest platform for startups and investors, Pramod combines
						strategic thinking with innovation to help entrepreneurs navigate
						their growth journey.
					</p>
				</div>
				<p id="read-more-desc">
					Pramod Badiger, Founder and CEO of Capital HUB, is a seasoned startup
					mentor with over a decade of experience empowering founders to scale
					and succeed. Driven by a clear mission to build India’s largest
					platform for startups and investors, Pramod combines strategic
					thinking with innovation to help entrepreneurs navigate their growth
					journey.
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
				<h2>An Experienced Mentor, a Strategic Innovator</h2>
				<p>
					Passionate about empowering founders, Pramod has mentored countless
					startups, offering valuable insights and personalized guidance during
					critical growth stages. He helps entrepreneurs succeed on their own
					terms while providing strategic support.
				</p>
				<h2>Your Trusted Partner in Growth</h2>
				<p>
					Known as the “silent cheerleader,” Pramod connects startups with
					investors and fosters a thriving ecosystem that drives innovation,
					growth, and long-term success.
				</p>
			</div>

			{/* <div className="sales_pitch">
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
			</div> */}

			<div className="pricing">
				<div className="pricing-details">
					<p>Scale Your Startup with Capital HUB & Hustlers Club</p>
					<h4>All for Just INR 1,999!</h4>
					<h3>
						Unlock unlimited access to resources, investors, mentorship, and
						tools today. Limited-time offer!
					</h3>
					<h3>
						Seize the opportunity to unlock everything you need to elevate your
						startup, all at an unbeatable price
					</h3>
					<button onClick={handleBuyNowClick}>Claim Your Access Now</button>
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
