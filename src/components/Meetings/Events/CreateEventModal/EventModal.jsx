// EventModal.jsx
import React, { useState } from "react";
import "./EventModal.scss";

const EventModal = ({ isOpen, onClose, onSubmit }) => {
	const [eventData, setEventData] = useState({
		title: "",
		description: "",
		duration: 30,
		isPrivate: false,
		price: 0,
		discount: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEventData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(eventData);
		setEventData({
			title: "",
			description: "",
			duration: 30,
			isPrivate: false,
			price: 0,
			discount: 0,
		});
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Create New Event</h2>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="title">Event Title</label>
						<input
							type="text"
							id="title"
							name="title"
							value={eventData.title}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea
							id="description"
							name="description"
							value={eventData.description}
							onChange={handleChange}
							rows="4"
						/>
					</div>

					<div className="form-group">
						<label htmlFor="duration">Duration (minutes)</label>
						<input
							type="number"
							id="duration"
							name="duration"
							value={eventData.duration}
							onChange={handleChange}
							min="1"
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="privacy">Event Privacy</label>
						<select
							id="isPrivate"
							name="isPrivate"
							value={eventData.isPrivate}
							onChange={handleChange}
						>
							<option value="true">Private</option>
							<option value="false">Public</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="price">Event Price</label>
						<input
							type="number"
							id="price"
							name="price"
							value={eventData.price}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="discount">Price Discount (%)</label>
						<input
							type="number"
							id="discount"
							name="discount"
							value={eventData.discount}
							onChange={handleChange}
						/>
					</div>

					<div className="modal-actions">
						<button type="submit" className="create-btn">
							Create Event
						</button>
						<button type="button" className="cancel-btn" onClick={onClose}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EventModal;
