import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CiCircleCheck } from "react-icons/ci";
import { IoSparkles } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { subscribe } from "../../../Service/user";
import { load } from "@cashfreepayments/cashfree-js";
import { contactPrice } from "./data";
import "./subscriptionPop.scss";

const SubscriptionPopup = ({ isOpen, onClose }) => {
	const [orderId, setOrderId] = useState("");
	const [showFreePlanModal, setShowFreePlanModal] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	let cashfree;

	useEffect(() => {
		const initializeSDK = async () => {
			cashfree = await load({ mode: "production" });
		};
		initializeSDK();
	}, []);

	useEffect(() => {
		if (showFreePlanModal) {
			const timer = setTimeout(() => {
				setShowFreePlanModal(false);
				navigate("/");
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [showFreePlanModal, navigate]);

	const handlePurchase = async (item) => {
		try {
			if (item.subscriptionType === "Basic") {
				if (loggedInUser.trialStartDate) {
					alert("Trial already taken");
				} else {
					const res = await subscribe({ subscriptionType: "Basic" });
					if (res.message === "Trial started") {
						const currentDate = new Date();
						dispatch({
							type: "user/updateTrialStartDate",
							payload: currentDate,
						});
						onClose();
						setShowFreePlanModal(true);
					}
				}
			} else {
				const res = await subscribe(item);
				if (res) {
					setOrderId(res.order_id);
					const checkOutOptions = {
						paymentSessionId: res.payment_session_id,
						redirectTarget: "_modal",
					};
					cashfree
						.checkout(checkOutOptions)
						.then(() => {
							// Handle successful checkout
						})
						.catch((error) => {
							console.error("Checkout error:", error);
						});
				}
			}
		} catch (err) {
			console.error("Purchase error:", err);
		}
	};

	const getColorBySubscriptionType = (type) => {
		switch (type) {
			case "Basic":
				return "white";
			case "Pro":
			case "Pro Basic":
				return "gold";
			default:
				return "white";
		}
	};

	if (!isOpen) return null;

	return (
		<div className="sp-container">
			<div className="sp-overlay" onClick={onClose}></div>
			<div className="sp-modal">
				<button
					className="sp-close-button"
					onClick={onClose}
					aria-label="Close"
				>
					<IoMdClose />
				</button>
				<h2 className="sp-title">Simple and Affordable Pricing Plans</h2>
				<div className="sp-plans">
					{contactPrice
						.filter((item) => item.subscriptionType !== "Standard")
						.map((item, index) => (
							<div
								key={index}
								className={`sp-plan ${
									item.subscriptionType === "Pro" ? "sp-plan-pro" : ""
								}`}
							>
								<h3
									className="sp-plan-title"
									style={{
										color: getColorBySubscriptionType(item.subscriptionType),
									}}
								>
									{item.subscriptionType}
									{item.subscriptionType !== "Basic" && (
										<IoSparkles className="sp-sparkle" />
									)}
								</h3>
								<p className="sp-price">
									₹{item.price} <span>/year</span>
								</p>
								<p className="sp-description">{item.description}</p>
								<hr className="sp-divider" />
								<ul className="sp-features">
									{item.features.map((feature, idx) => (
										<li key={idx}>
											<CiCircleCheck
												color={getColorBySubscriptionType(
													item.subscriptionType
												)}
											/>
											{feature}
										</li>
									))}
								</ul>
								<button
									className="sp-purchase-button"
									onClick={() => handlePurchase(item)}
								>
									{item.subscriptionType === "Basic"
										? "Join for Free!"
										: "Purchase Now"}
								</button>
							</div>
						))}
				</div>
			</div>
			{showFreePlanModal && (
				<div className="sp-free-plan-modal">
					<div className="sp-free-plan-modal-content">
						Subscribed for Free Plan
					</div>
				</div>
			)}
		</div>
	);
};

export default SubscriptionPopup;
