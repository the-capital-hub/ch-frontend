import React, { useState, useEffect } from "react";
import Hustler from "../../../pages/StartUp/SalesLandingPage/COMPONENTS/images/hustler.png";
import { IoClose } from "react-icons/io5";
import Picture1 from "./images/Picture1.png";
import Picture2 from "./images/Picture2.png";
import Picture3 from "./images/Picture3.png";
import Picture4 from "./images/Picture4.png";
import Picture5 from "./images/Picture5.png";
import Picture6 from "./images/Picture6.png";
import "./ResourcesPopupNew.scss";

import { environment } from "../../../environments/environment";
import { useSelector } from "react-redux";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import { load } from "@cashfreepayments/cashfree-js";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const ResourcesPopup = ({ onClose, isInvestor }) => {
	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedResource, setSelectedResource] = useState(null);
	const [showLinks, setShowLinks] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [paymentStatus, setPaymentStatus] = useState(null);
	const [paidResources, setPaidResources] = useState(new Set());

	const loggedInUser = useSelector((state) => state.user.loggedInUser);

	useEffect(() => {
		fetchResources();
	}, []);

	const fetchResources = async () => {
		try {
			const response = await fetch(`${environment.baseUrl}/resources/getAll`);
			const data = await response.json();
			setResources(data.filter((resource) => resource.isActive));
		} catch (error) {
			console.error("Error fetching resources:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleResourceClick = (resource) => {
		if (resource.link && resource.link.length > 0) {
			const fileUrl = resource.link[0];
			const anchor = document.createElement("a");
			anchor.href = fileUrl;
			anchor.download = "";
			anchor.target = "_blank";
			document.body.appendChild(anchor);
			anchor.click();
			document.body.removeChild(anchor);
		} else {
			console.error("No download link available for this resource.");
		}
	};

	// initialize  Cashfree SDK
	const initializeCashfree = async () => {
		try {
			return await load({ mode: "production" });
		} catch (error) {
			console.error("Failed to initialize Cashfree:", error);
			throw error;
		}
	};
	// create payment session
	const createPaymentSession = async (paymentData) => {
		try {
			const response = await fetch(
				`${baseUrl}/resources/createPaymentSession`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(paymentData),
				}
			);
			const data = await response.json();

			if (!data.data.payment_session_id) {
				throw new Error("Failed to create payment session");
			}

			// Set orderId in state immediately after creating payment session
			setOrderId(data.data.order_id);

			return {
				sessionId: data.data.payment_session_id,
				orderId: data.data.order_id,
			};
		} catch (error) {
			console.error("Payment session creation failed:", error);
			throw error;
		}
	};
	// verify payment
	const verifyPayment = async (orderId, resourceId) => {
		try {
			const response = await fetch(`${baseUrl}/resources/verifyPayment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ orderId, resourceId }),
			});

			const data = await response.json();
			if (data.status !== 200) {
				throw new Error("Payment verification failed");
			}

			setPaymentStatus("success");
			return true;
		} catch (error) {
			console.error("Payment verification failed:", error);
			setPaymentStatus("failed");
			throw error;
		}
	};
	const handlePayment = async (resourceId) => {
		// console.log("Processing payment for resource:", resourceId);

		try {
			const cashfree = await initializeCashfree();
			const paymentData = {
				order_amount: resourceId.amount,
				customer_name: loggedInUser.firstName + " " + loggedInUser.lastName,
				customer_email: loggedInUser.email,
				customer_phone: loggedInUser.phoneNumber,
				resourceId: resourceId._id,
			};

			const { sessionId, orderId } = await createPaymentSession(paymentData);

			// Handle payment checkout
			await cashfree.checkout({
				paymentSessionId: sessionId,
				redirectTarget: "_modal",
			});

			// Handle payment verification
			const paymentVerified = await verifyPayment(orderId, resourceId._id);

			if (paymentVerified) {
				setPaidResources((prev) => new Set([...prev, resourceId._id]));
				alert("Payment successful");
				// console.log("Payment successful", paymentVerified);
			}
		} catch (error) {
			console.error("Error processing payment:", error);
		}
	};

	const handleClick = (resource) => {
		// console.log("paymentStatus", paymentStatus);
		// console.log("resource", resource);
		if (paymentStatus === "success" && paidResources.has(resource._id)) {
			handleResourceClick(resource);
		} else {
			handlePayment(resource);
		}
	};

	const handleDownload = (links) => {
		setShowLinks(true);
	};

	if (loading) return <SpinnerBS />;
	
	return (
		<div className="ResourcesPopup-overlay">
			<div className="ResourcesPopup-container">
				<span className="close">
					<IoClose className="fa fa-times" onClick={() => onClose()}></IoClose>
				</span>
				<div className="ResourcesPopup-header">
					<h2>
						Ready - to - Use
						<span> Templates</span>
					</h2>
					<p>Access to events, unlock investors database and more at 1,999/-</p>
					<hr />
				</div>
				<div className="join-hustlers-club">
					<span>Join Hustlers Club ?</span>
					<p>Get ready to use templates</p>
					<img src={Hustler} alt="Hustlers Club Logo" className="logo-image" />
					<img src={Picture5} className="gradient-hustler1" alt="" />
					<img src={Picture6} className="gradient-hustler2" alt="" />
				</div>
				<div className="resources-cards">
					<div className="card">
						<img src={Picture1} alt="" />
						<span>GTM Strategy</span>
						<button>Buy Now</button>
					</div>
					<div className="card">
						<img src={Picture3} alt="" />
						<span>Sales & Marketing Plans</span>
						<button>Buy Now</button>
					</div>
					<div className="card">
						<img src={Picture4} alt="" />
						<span>Pitch Deck</span>
						<button>Buy Now</button>
					</div>
					<div className="card">
						<img src={Picture2} alt="" />
						<span>Financial Modelling</span>
						<button>Buy Now</button>
					</div>
				</div>
				<button
					className="view-all-button"
					onClick={() => isInvestor ? (window.location.href = "/investor/resources") : (window.location.href = "/resources")}
				>
					View All
				</button>
			</div>
		</div>
	);
};

export default ResourcesPopup;
