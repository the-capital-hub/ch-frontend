import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import { IoCalendarOutline } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi";
import Spinner from "../../../components/Spinner/Spinner";
import {
	// getEventsByOnelinkId,
	getWebinarsByOnelinkId,
	createPaymentSessionToJoinWebinar,
	varifyPaymentToJoinWebinar,
} from "../../../Service/user";
import PaymentPopup from "./PaymentPopup/PaymentPopup";
import "./PitchDays.scss";

const PitchDays = () => {
	const { userId } = useParams(); // its onelinkId
	const [pitchDays, setPitchDays] = useState([]);
	const [webinarDataForPayment, setWebinarDataForPayment] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState("failed");
	const [paymentId, setPaymentId] = useState("");
	const [orderId, setOrderId] = useState("");
	const [sessionId, setSessionId] = useState("");
	console.log("Order ID-2:", orderId);

	useEffect(() => {
		setLoading(true);
		getWebinarsByOnelinkId(userId)
			.then((data) => {
				setLoading(false);
				if (data && data.data) {
					setPitchDays(data.data);
				} else {
					setPitchDays([]);
				}
			})
			.catch((error) => {
				console.error("Error fetching pitchdays:", error);
				setLoading(false);
			});
	}, [userId]);

	const getRandomLightColor = () => {
		const r = Math.floor(Math.random() * 156 + 100); // Red value between 100-255
		const g = Math.floor(Math.random() * 156 + 100); // Green value between 100-255
		const b = Math.floor(Math.random() * 156 + 100); // Blue value between 100-255
		return `rgb(${r}, ${g}, ${b})`;
	};

	const handleJoinClick = (webinar) => {
		// Handle join button click
		if (webinar.price > 0) {
			// If the webinar has a price, redirect to the payment page
			setWebinarDataForPayment(webinar);
			setIsPaymentModalOpen(true);
		} else {
			// If the webinar is free, open the Google Meet link in a new tab
			window.open(webinar.link, "_blank", "noopener,noreferrer");
		}
	};

	if (loading) {
		return <Spinner />;
	}

	// console.log(pitchDays);
	const webinarDetails = {
		title: "React Best Practices",
		description: "Learn advanced React patterns...",
		price: 999,
		duration: 60,
		date: "2024-12-28",
		startTime: "2024-12-28T10:00:00",
		endTime: "2024-12-28T11:00:00",
	};

	const discountedPrice = (webinar) => {
		return (webinar.price * (1 - webinar.discount / 100)).toFixed(0);
	};

	// Initialize Cashfree SDK
	const initializeCashfree = async () => {
		try {
			return await load({ mode: "sandbox" });
		} catch (error) {
			console.error("Failed to initialize Cashfree:", error);
			throw error;
		}
	};

	const handleProceedToPayment = async (userDetails) => {
		console.log("User Details:", userDetails);
		// Handle payment logic here
		const dataForPaymentSession = {
			name: userDetails.name,
			email: userDetails.email,
			mobile: userDetails.mobile,
			amount: discountedPrice(webinarDataForPayment),
		};
		const dataForPaymentVerification = {
			name: userDetails.name,
			email: userDetails.email,
			mobile: userDetails.mobile,
			orderId,
			webinarId: webinarDataForPayment._id,
		};

		// Initialize payment flow
		const cashfree = await initializeCashfree();

		await createPaymentSessionToJoinWebinar(dataForPaymentSession)
			.then((data) => {
				console.log("Data:", data.data);
				console.log("Order ID-1:", data.data.order_id);
				setOrderId(data.data.order_id);
				setSessionId(data.data.payment_session_id);
			})
			.catch((error) => {
				console.log("Error creating payment session:", error);
			});

		// Handle payment checkout
		await cashfree.checkout({
			paymentSessionId: sessionId,
			redirectTarget: "_modal",
		});

		if (orderId) {
			await varifyPaymentToJoinWebinar(dataForPaymentVerification)
				.then((data) => {
					setPaymentStatus(data.data.status);
					setPaymentId(data.data.payment_id);
					if (data.data.status === "SUCCESS") {
						alert("Payment Success");
						window.open(
							webinarDataForPayment.link,
							"_blank",
							"noopener,noreferrer"
						);
					} else {
						alert("Payment Failed");
					}
				})
				.catch((error) => {
					console.log("Error creating payment session:", error);
				});
		}
	};

	// const joinWebinar = async () => {
	// 	// Handle join button click
	// 	window.open(webinarDataForPayment.link, "_blank", "noopener,noreferrer");
	// };
	return (
		<>
			<div className="pitch-days-container">
				<h1>Pitch Days</h1>
				<div className="events-grid">
					{pitchDays.map((event, index) => (
						<div
							key={index}
							className="event-card"
							style={{ backgroundColor: getRandomLightColor() }} // Apply random light color
						>
							<div className="event-info">
								<h3>{event.title}</h3>
								<div className="event-meta">
									<div className="leftTime">
										<span>
											<IoCalendarOutline size={20} />
										</span>{" "}
										&nbsp;&nbsp;
										<span>{event.duration} mins</span> &nbsp;&nbsp;
										<span className="separator">|</span> &nbsp;&nbsp;
										<span>{event.eventType}</span>
									</div>
									<div className="leftRight">
										{event.price > 0 ? (
											<div className="price-tag">
												{event.discount > 0 && (
													<span className="original-price">
														₹{event.price.toFixed(0)}
													</span>
												)}
												<span className="new-price">
													₹ {discountedPrice(event)}
												</span>
											</div>
										) : (
											<div className="price-tag">
												<b>Free</b>
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="event-actions">
								<div className="action-buttons">
									<button
										className="join-btn"
										onClick={() => handleJoinClick(event)}
									>
										<HiVideoCamera />
										Join Meeting
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<PaymentPopup
				isOpen={isPaymentModalOpen}
				onClose={() => setIsPaymentModalOpen(false)}
				webinarDetails={
					webinarDataForPayment ? webinarDataForPayment : webinarDetails
				}
				onProceed={handleProceedToPayment}
			/>
		</>
	);
};

export default PitchDays;
