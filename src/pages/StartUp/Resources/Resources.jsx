import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { environment } from "../../../environments/environment";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import "./Resources.scss";
import { IoMdAdd } from "react-icons/io";
import { load } from "@cashfreepayments/cashfree-js";
import resource_background from "../../../Images/resources_background.png";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const Resources = () => {
	const [resources, setResources] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		amount: "",
		files: [],
	});
	const [showDownloadLinks, setShowDownloadLinks] = useState(false);
	const [selectedResourceLinks, setSelectedResourceLinks] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [paidResources, setPaidResources] = useState(new Set());

	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const isAdmin = loggedInUser?.isAdmin;

	useEffect(() => {
		fetchResources();
	}, []);

	const fetchResources = async () => {
		try {
			const response = await fetch(`${environment.baseUrl}/resources/getAll`);
			const data = await response.json();
			setResources(data);
		} catch (error) {
			console.error("Error fetching resources:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleCreateResource = async (e) => {
		e.preventDefault();
		const formDataToSend = new FormData();
		formDataToSend.append("title", formData.title);
		formDataToSend.append("description", formData.description);
		formDataToSend.append("amount", formData.amount);
		formData.files.forEach((file) => {
			formDataToSend.append("files", file);
		});

		try {
			const response = await fetch(`${environment.baseUrl}/resources/create`, {
				method: "POST",
				body: formDataToSend,
			});
			if (response.ok) {
				setShowCreateForm(false);
				fetchResources();
				setFormData({ title: "", description: "", amount: "", files: [] });
			}
		} catch (error) {
			console.error("Error creating resource:", error);
		}
	};

	const toggleResourceStatus = async (resourceId, currentStatus) => {
		try {
			await fetch(`${environment.baseUrl}/resources/update/${resourceId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ isActive: !currentStatus }),
			});
			fetchResources();
		} catch (error) {
			console.error("Error updating resource status:", error);
		}
	};

	const handleDownload = (resource) => {
		setSelectedResourceLinks(resource);
		setShowDownloadLinks(true);
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
			return true;
		} catch (error) {
			console.error("Payment verification failed:", error);
			throw error;
		}
	};

	const handlePurchase = async (resource) => {
		setProcessing(true);
		try {
			const cashfree = await initializeCashfree();
			const paymentData = {
				order_amount: resource.amount,
				customer_name: loggedInUser.firstName + " " + loggedInUser.lastName,
				customer_email: loggedInUser.email,
				customer_phone: loggedInUser.phoneNumber,
				resourceId: resource._id,
			};

			const { sessionId, orderId } = await createPaymentSession(paymentData);

			// Handle payment checkout
			await cashfree.checkout({
				paymentSessionId: sessionId,
				redirectTarget: "_modal",
			});

			// Handle payment verification
			const paymentVerified = await verifyPayment(orderId, resource._id);

			if (paymentVerified) {
				setPaidResources((prev) => new Set([...prev, resource._id]));
				alert("Payment successful");
				// setProcessing(false);
				// console.log("Payment successful", paymentVerified);
			}
		} catch (error) {
			console.error("Error processing payment:", error);
		} finally {
			setProcessing(false);
			fetchResources();
		}
	};

	if (loading) return <SpinnerBS />;

	return (
		<div className="resources-container">
			<div className="resources-header">
				<h2>Resources</h2>
				{isAdmin && (
					<button
						className="create-resource-btn"
						onClick={() => setShowCreateForm(true)}
					>
						<IoMdAdd /> Create Resource
					</button>
				)}
			</div>

			<div className="resources-grid">
				{resources.map((resource) => (
					<div key={resource._id} className="resource-card">
						{isAdmin && (
							<div className="toggle-switch">
								<input
									type="checkbox"
									id={`toggle-${resource._id}`}
									checked={resource.isActive}
									onChange={() =>
										toggleResourceStatus(resource._id, resource.isActive)
									}
								/>
								<label
									htmlFor={`toggle-${resource._id}`}
									className="switch-label"
								></label>
							</div>
						)}
						<div
							className="card-background"
							style={{
								backgroundImage: `url(${resource_background})`,
							}}
						></div>

						<div className="card-hover-content">
							<h3>{resource.title}</h3>
							<p>{resource.description}</p>
						</div>
						<div className="card-cta">
							{isAdmin ||
							resource.purchased_users?.includes(loggedInUser?._id) ? (
								<button
									onClick={() => handleDownload(resource)}
									className="cta-btn download-btn"
								>
									₹{resource.amount}/-
								</button>
							) : (
								<button
									onClick={() => handlePurchase(resource)}
									disabled={processing}
									className="cta-btn purchase-btn"
								>
									{processing ? "Processing..." : "Purchase"}
								</button>
							)}
						</div>
					</div>
				))}
			</div>

			{showCreateForm && (
				<div className="create-resource-popup">
					<div className="popup-content">
						<h2>Create New Resource</h2>
						<form onSubmit={handleCreateResource} className="apple-style-form">
							<div className="form-group">
								<label htmlFor="title">Title</label>
								<input
									id="title"
									type="text"
									value={formData.title}
									onChange={(e) =>
										setFormData({ ...formData, title: e.target.value })
									}
									placeholder="Enter resource title"
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="description">Description</label>
								<textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									placeholder="Enter resource description"
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="amount">Amount (₹)</label>
								<input
									id="amount"
									type="number"
									value={formData.amount}
									onChange={(e) =>
										setFormData({ ...formData, amount: e.target.value })
									}
									placeholder="Enter resource amount"
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="files">Upload Files</label>
								<input
									id="files"
									type="file"
									multiple
									onChange={(e) =>
										setFormData({
											...formData,
											files: Array.from(e.target.files),
										})
									}
									required
								/>
							</div>

							<div className="form-actions">
								<button type="submit" className="submit-btn">
									Create Resource
								</button>
								<button
									type="button"
									className="cancel-btn"
									onClick={() => setShowCreateForm(false)}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{showDownloadLinks && selectedResourceLinks && (
				<div className="resources-popup-overlay">
					<div className="resources-popup">
						<button
							className="close-btn"
							onClick={() => setShowDownloadLinks(false)}
						>
							&times;
						</button>
						<div className="resource-links">
							<h3>Download Links</h3>
							{selectedResourceLinks.link?.map((link, index) => (
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
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Resources;
