import { useState, useEffect } from "react";
import {
	ArrowLeft,
	ArrowRight,
	Star,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getUserByOneLinkId,
	// getUserByUsername,
	createPaymentSessionForPriorityDM,
	varifyPaymentForPriorityDM,
} from "../../../../Service/user";
import { load } from "@cashfreepayments/cashfree-js";
import Spinner from "../../../Spinner/Spinner";
import PaymentSuccessPopup from "./SuccessPopup/PaymentSuccessPopup";
import "./PriorityDMPage.scss";

export default function PriorityDMPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	// const { username } = useParams();
	const [isOrderSummaryVisible, setIsOrderSummaryVisible] = useState(true);
	const [founderData, setFounderData] = useState({});
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		question: "",
		mobile: "",
	});
	const [errors, setErrors] = useState({});
	const [orderId, setOrderId] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");

	useEffect(() => {
		setLoading(true);
		getUserByOneLinkId(id)
			.then((response) => {
				// console.log("response", response);
				setFounderData(response.user);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				console.error("Error fetching founder data:", error);
			});
	}, [id]);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!formData.question.trim()) {
			newErrors.question = "Question is required";
		}

		if (!formData.mobile.trim()) {
			newErrors.mobile = "Phone number is required";
		} else if (!/^\d{10}$/.test(formData.mobile)) {
			newErrors.mobile = "Phone number must be 10 digits";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
		// Clear error when user starts typing
		if (errors[id]) {
			setErrors((prev) => ({
				...prev,
				[id]: "",
			}));
		}
	};

	// Initialize Cashfree SDK
	const initializeCashfree = async () => {
		try {
			return await load({ mode: "production" });
		} catch (error) {
			console.error("Failed to initialize Cashfree:", error);
			throw error;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			console.log("Form submitted:", formData);
			// You can add your submission logic here

			try {
				// Prepare payment data
				const dataForPaymentSession = {
					name: formData.name,
					email: formData.email,
					mobile: formData.mobile,
					amount: founderData?.priorityDMPrice,
				};

				const dataForPaymentVerification = {
					name: formData.name,
					email: formData.email,
					mobile: formData.mobile,
					orderId,
					question: formData.question,
					founderUserName: founderData?.userName,
				};

				// Initialize payment flow
				const cashfree = await initializeCashfree();

				// Create payment session
				const sessionResponse = await createPaymentSessionForPriorityDM(
					dataForPaymentSession
				);
				console.log("Session Data:", sessionResponse.data);

				const newOrderId = sessionResponse.data.order_id;
				const newSessionId = sessionResponse.data.payment_session_id;

				setOrderId(newOrderId);

				// Handle checkout in a Promise to ensure completion
				await new Promise((resolve, reject) => {
					cashfree
						.checkout({
							paymentSessionId: newSessionId,
							redirectTarget: "_modal",
							// redirectTarget: "_self", // Changed to _self to avoid modal issues
						})
						.then((result) => {
							console.log("Checkout result:", result);
							resolve(result);
						})
						.catch((error) => {
							console.error("Checkout error:", error);
							reject(error);
						});
				});

				// Verify payment after checkout completes
				if (newOrderId) {
					const verificationResponse = await varifyPaymentForPriorityDM({
						...dataForPaymentVerification,
						orderId: newOrderId,
					});

					setPaymentStatus(verificationResponse.data.status);
					// setPaymentId(verificationResponse.data.payment_id);

					if (verificationResponse.data.status === "SUCCESS") {
						// Show success message first
						await new Promise((resolve) => {
							alert("Payment Success");
							resolve();
						});
					} else {
						alert("Payment Failed");
					}
				}
			} catch (error) {
				console.error("Error:", error);
				alert(
					"An error occurred during the payment process. Please try again."
				);
			}
		}
	};

	const toggleOrderSummary = (e) => {
		e.preventDefault();
		setIsOrderSummaryVisible(!isOrderSummaryVisible);
	};

	const closePaymentPopup = () => {
		setPaymentStatus(false);
		setFormData({
			name: "",
			email: "",
			question: "",
			mobile: "",
		});
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<div className="priority-dm-page">
				<header className="header">
					<div className="header-left">
						<button className="back-button" onClick={() => navigate(-1)}>
							<ArrowLeft />
						</button>
						<div className="user-info">
							<img
								src={founderData?.profilePicture}
								alt="User avatar"
								className="avatar"
							/>
							<span className="name">
								{founderData?.firstName + " " + founderData?.lastName}
							</span>
						</div>
					</div>
					<div className="rating">
						<Star className="star-icon" />
						<span>5/5</span>
					</div>
				</header>

				<main className="main-content">
					<div className="content-wrapper">
						<h1>Have A Question?</h1>
						<p className="subtitle">Priority DM</p>

						<div className="description">
							<p>Ask away anything related to my expertise.</p>
							<p>I'll try my best to help you out in a detailed answer 😊</p>
							<p>Please ask only one question!</p>
						</div>

						<form className="question-form" onSubmit={handleSubmit}>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									id="name"
									value={formData.name}
									onChange={handleInputChange}
									placeholder="Enter your name"
									className={errors.name ? "error" : ""}
								/>
								{errors.name && (
									<span className="error-message">{errors.name}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="Enter your email"
									className={errors.email ? "error" : ""}
								/>
								{errors.email && (
									<span className="error-message">{errors.email}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="question">Your Question</label>
								<textarea
									id="question"
									value={formData.question}
									onChange={handleInputChange}
									placeholder="Try asking a detailed question"
									rows={4}
									className={errors.question ? "error" : ""}
								/>
								{errors.question && (
									<span className="error-message">{errors.question}</span>
								)}
							</div>

							<div className="form-group">
								<label htmlFor="mobile">Phone number</label>
								<div className="phone-input">
									<div className="country-code">
										<span>+91</span>
									</div>
									<input
										type="tel"
										id="mobile"
										value={formData.mobile}
										onChange={handleInputChange}
										placeholder="Enter phone number"
										className={errors.mobile ? "error" : ""}
									/>
								</div>
								{errors.mobile && (
									<span className="error-message">{errors.mobile}</span>
								)}
							</div>

							<div className="order-summary">
								<button
									className="summary-toggle"
									onClick={toggleOrderSummary}
									aria-expanded={isOrderSummaryVisible}
									aria-controls="order-summary-content"
								>
									<h2>Order Summary</h2>
									<span
										className={`toggle-icon ${
											isOrderSummaryVisible ? "rotated" : ""
										}`}
									>
										{isOrderSummaryVisible ? (
											<ChevronUp size={16} />
										) : (
											<ChevronDown size={16} />
										)}
									</span>
								</button>
								<div
									id="order-summary-content"
									className={`summary-content ${
										isOrderSummaryVisible ? "visible" : "hidden"
									}`}
								>
									<div className="summary-item">
										<span>1 x Have a question?</span>
										<span>₹{founderData?.priorityDMPrice}</span>
									</div>
									<div className="summary-item">
										<span>Platform fee</span>
										<span className="free">
											<span className="free-icon">₹10</span> FREE
										</span>
									</div>
									<div className="summary-item total">
										<span>Total</span>
										<span>₹ {founderData?.priorityDMPrice}</span>
									</div>
								</div>
							</div>

							<div className="security-note">
								<span>🔒 Payments are 100% secure & encrypted</span>
							</div>

							<div className="terms">
								<a href="#">Terms</a> | <a href="#">Privacy</a>
							</div>

							<div className="powered-by">
								<span>Powered by topmate.io</span>
							</div>
						</form>
					</div>
				</main>

				<footer className="footer">
					<button type="button" className="price-button">
						<span>₹{founderData?.priorityDMPrice}</span>
						<ArrowRight className="arrow-icon" />
					</button>
					<button type="submit" className="send-button" onClick={handleSubmit}>
						Send Message
					</button>
				</footer>
			</div>

			{paymentStatus && (
				<PaymentSuccessPopup
					amount={founderData?.priorityDMPrice}
					onClose={closePaymentPopup}
				/>
			)}
		</>
	);
}
