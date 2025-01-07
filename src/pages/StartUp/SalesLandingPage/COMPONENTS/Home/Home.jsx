import React, { useEffect, useState, useRef } from "react";
import Features from "../Features/Features";
import { useNavigate } from "react-router-dom";
import smallline from "../images/Line 152.png";
import img2 from "../images/Home.png";
import play from "../images/playbutton.png";
import arrow1 from "../images/arrow1.png"; 
import axios from "axios";
import Modal from "react-modal";
import "./home.scss";
import { environment } from "../../../../../environments/environment";
import { load } from "@cashfreepayments/cashfree-js";
import { toast } from 'react-toastify';
import { sendOTP, verifyOTP } from "../../../../../Service/user";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../../Store/features/user/userSlice";
import { postUserLogin, updateUserAPI } from "../../../../../Service/user";


const Home = () => {

	const baseUrl = environment.baseUrl;
	const [startAnimation, setStartAnimation] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		mobileNumber: "",
		userType: ""
	});
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const [showOtpModal, setShowOtpModal] = useState(false);
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [orderId, setOrderId] = useState("");
	const inputRefs = useRef([]);
	const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

	useEffect(() => {
		setStartAnimation(true);
	}, []);

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const initializeCashfree = async () => {
		try {
			return await load({ mode: "sandbox" });
		} catch (error) {
			console.error("Failed to initialize Cashfree:", error);
			throw error;
		}
	};

	const handleOtpChange = (index, value) => {
		if (isNaN(value)) return;
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value !== "" && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && index > 0 && otp[index] === "") {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await sendOTP(`+91${formData.mobileNumber}`);
			setOrderId(response?.orderId);
			setShowOtpModal(true);
			setIsModalOpen(false);
		} catch (error) {
			toast.error("Failed to send OTP. Please try again.");
		}
	};

	const handleOtpVerify = async () => {
		setIsVerifyingOtp(true);
		try {
			const verificationCode = otp.join("");
			const otpResponse = await verifyOTP({
				otp: verificationCode,
				orderId,
				phoneNumber: `+91${formData.mobileNumber}`,
			});

			if (otpResponse.isOTPVerified) {

				// Register user
				const registrationResponse = await axios.post(
					`${baseUrl}/users/registerUser`,
					{
						firstName: formData.firstName,
						lastName: formData.lastName,
						email: formData.email,
						phoneNumber: `+91${formData.mobileNumber}`,
						userType: formData.userType,
						isInvestor: formData.userType === "investor" ? true : false,
					}
				);
				const response = await postUserLogin({
					phoneNumber: `+91${formData.mobileNumber}`,
				});
				console.log(response);
				const user = response.user;
				const token = response.token;
				// Store user data and dispatch login
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("accessToken", token);
				localStorage.setItem("isLoggedIn", "true");
				dispatch(loginSuccess(user));

				// Close OTP modal and proceed with payment
				setShowOtpModal(false);
				setIsVerifyingOtp(false);
				await processPayment();
			} else {
				toast.error("Invalid OTP. Please try again.");
				setIsVerifyingOtp(false);
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "OTP verification failed");
			setIsVerifyingOtp(false);
		}
	};

	const processPayment = async () => {
		setIsLoading(true);
		try {
			const cashfree = await initializeCashfree();
			if (!cashfree) {
				throw new Error("Cashfree SDK not initialized");
			}

			const paymentResponse = await axios.post(
				`${baseUrl}/users/create-subscription-payment`,
				formData
			);

			const { orderId, paymentSessionId } = paymentResponse.data.data;
			
			await cashfree.checkout({
				paymentSessionId: paymentSessionId,
				redirectTarget: "_modal"
			});

			const verificationResponse = await verifyPayment(orderId);
			if (verificationResponse) {
				toast.success('Payment successful!');
				navigate('/resources');
			}
		} catch (error) {
			console.error("Payment Error:", error);
			toast.error("Payment failed. Please try again.");
		} finally {
			setIsLoading(false);
			setIsModalOpen(false);
		}
	};

	const verifyPayment = async (orderId) => {
		try {
			const verificationResponse = await axios.post(
				`${baseUrl}/users/verify-subscription-payment`,
				{ orderId }
			);

			if (verificationResponse.data.data.status === "SUCCESS") {
				// Update user subscription status
				await updateUserAPI({
					subscriptionType: "Pro",
					isSubscribed: true
				});
				
				toast.success('Payment successful!');
				return true;
			} else {
				toast.error('Payment verification failed');
				return false;
			}
		} catch (error) {
			console.error('Verification error:', error);
			toast.error('Payment verification failed');
			return false;
		}
	};

	return (
		<div className="home">
			<div className="home__container">
				<div className="main-banner">
					{/* Background Image */}
					<div className="banner-bg">
						<div className="best-startup">
							{/* <img src={smallline} alt="" className="smallline" /> */}
							<h1>
								<b>
									# No 1 Company For <span id="headBanner">Startup</span>
								</b>
							</h1>
							{/* <img src={smallline} alt="" className="smallline" /> */}
						</div>

						{/* Green Arrow */}
						<div className="arrow-container">
							<img className="green-arrow" src={arrow1} alt="green arrow" />
						</div>

						<h1 className="main-heading">
							Build Your Startup's <br /> Future, Today
						</h1>

						<center>
							<p className="description">
								Access India’s Most Comprehensive Investor Database and Start Connecting with 500+ VCs and 1000+ Angel Investors
							</p>
						</center>

						<center>
							<div className="button-cta">
								<button
									onClick={() => setIsModalOpen(true)}
									className="join-button"
								>
									Buy Now
								</button>
								<button className="download-button">
									Download Now
								</button>
							</div>
						</center>
					</div>
				</div>
			</div>

			{/* Subscription Modal */}
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				className="subscription-modal"
				overlayClassName="subscription-modal-overlay"
			>
				<div className="modal-content">
					<h2>Subscribe to Premium</h2>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							name="firstName"
							placeholder="First Name"
							value={formData.firstName}
							onChange={handleInputChange}
							required
						/>
						<input
							type="text"
							name="lastName"
							placeholder="Last Name"
							value={formData.lastName}
							onChange={handleInputChange}
							required
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleInputChange}
							required
						/>
						<input
							type="tel"
							name="mobileNumber"
							placeholder="Mobile Number"
							value={formData.mobileNumber}
							onChange={handleInputChange}
							required
						/>
						<select
							name="userType"
							value={formData.userType}
							onChange={handleInputChange}
							required
						>
							<option value="">Select User Type</option>
							<option value="startup founder">Startup Founder</option>
							<option value="startup employee">Startup Employee</option>
							<option value="investor">Investor</option>
							<option value="vc">VC</option>
							<option value="student">Student</option>
						</select>
						<button type="submit">Proceed to Payment</button>
					</form>
				</div>
			</Modal>

			{/* Add OTP Modal */}
			<Modal
				isOpen={showOtpModal}
				onRequestClose={() => setShowOtpModal(false)}
				className="otp-modal"
				overlayClassName="otp-modal-overlay"
			>
				<div className="modal-content">
					<h2>Enter verification code</h2>
					<p>We have just sent a verification code to your mobile number.</p>
					<div className="otp-container">
						{otp.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength="1"
								className="otp-input"
								value={digit}
								onChange={(e) => handleOtpChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
							/>
						))}
					</div>
					<button onClick={handleOtpVerify} disabled={isVerifyingOtp}>
						{isVerifyingOtp ? (
							<div className="button-loader"></div>
						) : (
							"Verify"
						)}
					</button>
				</div>
			</Modal>

			{isLoading && (
				<div className="loader-overlay">
					<div className="loader"></div>
					<p className="loader-text">Processing payment...</p>
				</div>
			)}
		</div>
	);
};

export default Home;
