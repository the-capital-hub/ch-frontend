import React, { useState, useEffect } from "react";
import "./ResourcesPopup.scss";
import { environment } from "../../../../../environments/environment";
import { useSelector } from "react-redux";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
import { load } from "@cashfreepayments/cashfree-js";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

export default function ResourcesPopup({ onClose }) {
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
			return await load({ mode: "sandbox" });
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
			console.log("data", data.data);

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

			console.log("Payment verified successfully", data);
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
		<div className="resources-popup-overlay fade-in">
			<div className="resources-popup">
				<button className="close-btn" onClick={onClose}>
					&times;
				</button>

				{!selectedResource ? (
					<div className="resources-list">
						<h3 style={{ textAlign: "left", marginBottom: "20px" }}>
							Available Resources
						</h3>
						<div className="resources-horizontal-list">
							{resources.map((resource) => (
								<div key={resource?._id} className="resource-card">
									<div className="resource-image">
										<img
											src={
												resource?.thumbnail ||
												"https://thecapitalhub.s3.ap-south-1.amazonaws.com/doc.png"
											}
											alt={resource?.title}
										/>
									</div>
									<div className="resource-info">
										<h4>{resource?.title}</h4>
										<p>
											{resource?.description || "No description available."}
										</p>
									</div>
									<div className="resource-action">
										<button
											className="view-details-btn"
											// onClick={() => handleResourceClick(resource)}
											onClick={() => handleClick(resource)}
										>
											{paymentStatus === "success" &&
											paidResources.has(resource._id)
												? "Download"
												: `Download only at ₹${resource?.amount}`}
										</button>
									</div>
								</div>
							))}
						</div>

						<div className="resource-action">
							<button
								className="view-all-resources-btn"
								onClick={() => (window.location.href = "/resources")}
							>
								View all resources
							</button>
						</div>
					</div>
				) : showLinks ? (
					<div className="resource-links">
						<h3>Download Links</h3>
						{selectedResource.link.map((link, index) => (
							<a
								key={index}
								href={link}
								target="_blank"
								rel="noopener noreferrer"
								className="download-link"
							>
								Download File {index + 1}
							</a>
						))}
						<button onClick={() => setShowLinks(false)}>Back</button>
					</div>
				) : (
					<div className="resource-details">
						<h3>{selectedResource.title}</h3>
						<p>{selectedResource.description}</p>
						<p>Price: ₹{selectedResource.amount}</p>

						{loggedInUser.isAdmin ||
						selectedResource.purchased_users.includes(loggedInUser._id) ? (
							<button
								className="download-btn"
								onClick={() => handleDownload(selectedResource.link)}
							>
								Download
							</button>
						) : (
							<button
								className="pay-btn"
								onClick={() => handlePayment(selectedResource._id)}
							>
								Pay to View
							</button>
						)}
						<button onClick={() => setSelectedResource(null)}>
							Back to List
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
