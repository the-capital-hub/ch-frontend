import React, { useState, useEffect } from "react";
import { format } from "date-fns";
// import {
// 	createPaymentSessionToJoinWebinar,
// 	varifyPaymentToJoinWebinar,
// } from "../../../../Service/user";
import "./PaymentPopup.scss";

const PaymentPopup = ({
	isOpen,
	onClose,
	webinarDetails,
	onProceed,
	// setPaymentStatus,
}) => {
	const [userDetails, setUserDetails] = useState({
		name: "",
		email: "",
		mobile: "",
	});

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		// Check if all fields are filled and mobile is exactly 10 digits
		const isValid =
			userDetails.name.trim() !== "" &&
			userDetails.email.trim() !== "" &&
			/^[0-9]{10}$/.test(userDetails.mobile);

		setIsFormValid(isValid);
	}, [userDetails]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserDetails((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onProceed(userDetails);
		onClose();
	};

	const discountedPrice = (webinar) => {
		return (webinar.price * (1 - webinar.discount / 100)).toFixed(0);
	};

	if (!isOpen) return null;

	return (
		<div className="payment-modal-overlay">
			<div className="payment-modal-content">
				<div className="modal-header">
					<h2>Webinar Details</h2>
					<p>
						Please fill these details, capitalHub use these details for further
						communication. Thank you
					</p>
				</div>

				<div className="webinar-details-card">
					{/* <h3>Webinar Details</h3> */}
					<div className="details-grid">
						<div className="detail-item">
							<span className="label">Title:</span>
							<span className="value">{webinarDetails.title}</span>
						</div>
						<div className="detail-item">
							<span className="label">Description:</span>
							<span className="value">{webinarDetails.description}</span>
						</div>
						<div className="detail-item">
							<span className="label">Date:</span>
							<span className="value">
								{format(new Date(webinarDetails.date), "MMMM d, yyyy")}
							</span>
						</div>
						<div className="detail-item">
							<span className="label">Start Time:</span>
							<span className="value">
								{format(new Date(webinarDetails.startTime), "h:mm aa")}
							</span>
						</div>
						<div className="detail-item">
							<span className="label">End Time:</span>
							<span className="value">
								{format(new Date(webinarDetails.endTime), "h:mm aa")}
							</span>
						</div>
						<div className="detail-item">
							<span className="label">Duration:</span>
							<span className="value">{webinarDetails.duration} minutes</span>
						</div>
						<div className="detail-item">
							<span className="label">Platform:</span>
							<span className="value">Google Meet</span>
						</div>
						<div className="detail-item">
							<span className="label">Price:</span>
							<span className="value">₹{webinarDetails.price}</span>
						</div>
						<div className="detail-item">
							<span className="label">Discounted Price:</span>
							<span className="value">₹{discountedPrice(webinarDetails)}</span>
						</div>
					</div>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							type="text"
							id="name"
							name="name"
							value={userDetails.name}
							onChange={handleChange}
							required
							placeholder="Enter your name"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={userDetails.email}
							onChange={handleChange}
							required
							placeholder="Enter your email"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="mobile">Mobile Number</label>
						<input
							type="tel"
							id="mobile"
							name="mobile"
							value={userDetails.mobile}
							onChange={handleChange}
							required
							pattern="[0-9]{10}"
							placeholder="Enter your mobile number"
						/>
					</div>

					<div className="modal-actions">
						<button type="button" className="cancel-btn" onClick={onClose}>
							Cancel
						</button>
						<button
							type="submit"
							className={`proceed-btn ${!isFormValid ? "disabled" : ""}`}
							disabled={!isFormValid}
						>
							Proceed to Payment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentPopup;
