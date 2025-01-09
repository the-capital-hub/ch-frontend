import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { environment } from '../environments/environment';
import { toast } from 'react-toastify';
import { sendOTP, verifyOTP, postUserLogin, updateUserAPI } from '../Service/user';
import { loginSuccess } from '../Store/features/user/userSlice';
import { load } from '@cashfreepayments/cashfree-js';

export const usePaymentFlow = () => {
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

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

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
				const registrationResponse = await axios.post(
					`${environment.baseUrl}/users/registerUser`,
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
				const user = response.user;
				const token = response.token;
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("accessToken", token);
				localStorage.setItem("isLoggedIn", "true");
				dispatch(loginSuccess(user));

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

			const paymentFormData = {
				firstName: formData.firstName || loggedInUser?.firstName || "",
				lastName: formData.lastName || loggedInUser?.lastName || "",
				email: formData.email || loggedInUser?.email || "",
				mobileNumber: formData.mobileNumber || loggedInUser?.phoneNumber?.replace('+91', '') || "",
				userType: formData.userType || loggedInUser?.userType || "startup founder"
			};

			if (!paymentFormData.firstName || !paymentFormData.email || !paymentFormData.mobileNumber) {
				throw new Error("Missing required payment information");
			}

			const paymentResponse = await axios.post(
				`${environment.baseUrl}/users/create-subscription-payment`,
				paymentFormData
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
			toast.error(error.message || "Payment failed. Please try again.");
		} finally {
			setIsLoading(false);
			setIsModalOpen(false);
		}
	};

	const verifyPayment = async (orderId) => {
		try {
			const verificationResponse = await axios.post(
				`${environment.baseUrl}/users/verify-subscription-payment`,
				{ orderId }
			);

			if (verificationResponse.data.data.status === "SUCCESS") {
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

	const handleBuyNowClick = () => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        
        if (loggedInUser) {
            if (loggedInUser.isSubscribed) {
                navigate('/resources');
                return;
            } else {
                setFormData({
                    firstName: loggedInUser.firstName || "",
                    lastName: loggedInUser.lastName || "",
                    email: loggedInUser.email || "",
                    mobileNumber: loggedInUser.phoneNumber || "",
                    userType: loggedInUser.userType || "startup founder"
                });
                processPayment();
                return;
            }
        }
        setIsModalOpen(true);
    };

	const renderSubscriptionModal = () => (
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
					<option value="startup founder" selected>Startup Founder</option>
					<option value="startup employee">Startup Employee</option>
					<option value="investor">Investor</option>
					<option value="vc">VC</option>
					<option value="student">Student</option>
				</select>
				<button type="submit">Proceed to Payment</button>
			</form>
		</div>
	);

	const renderOtpModal = () => (
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
	);

	return {
		isModalOpen,
		showOtpModal,
		isLoading,
		formData,
		otp,
		orderId,
		inputRefs,
		isVerifyingOtp,
		setIsModalOpen,
		setShowOtpModal,
		handleInputChange,
		handleOtpChange,
		handleKeyDown,
		handleSubmit,
		handleOtpVerify,
		renderSubscriptionModal,
		renderOtpModal,
		handleBuyNowClick
	};
}; 