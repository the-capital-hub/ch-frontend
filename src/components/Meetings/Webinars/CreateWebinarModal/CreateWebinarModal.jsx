import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import { getAllCommunity } from "../../../../Service/user";
import DatePicker from "react-datepicker";
import {
	addMinutes,
	format,
	set,
	setHours,
	setMinutes,
	setSeconds,
} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateWebinarModal.scss";

const WebinarModal = ({ isOpen, onClose, onSubmit }) => {
	const loggedInUserId = useSelector(selectLoggedInUserId);
	// const initStartTime = setSeconds(setMinutes(setHours(new Date(), 9), 0), 0);
	// Helper function to strip timezone info
	const stripTimezone = (date) => {
		return new Date(date).toLocaleString("en-IN", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
			hour12: false,
		});
	};
	const [eventData, setEventData] = useState({
		title: "",
		description: "",
		duration: 30,
		webinarType: "Public",
		price: 0,
		discount: 0,
		date: stripTimezone(new Date()),
		startTime: new Date(),
		endTime: addMinutes(new Date(), 30),
	});

	const [community, setCommunity] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// console.log("community", community);

	useEffect(() => {
		setLoading(true);
		getAllCommunity(loggedInUserId)
			.then((res) => {
				setCommunity(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
	}, [loggedInUserId]);

	// Helper function to format date and time in ISO format
	const formatDateTime = (date, time) => {
		const combinedDate = new Date(date);
		const timeDate = new Date(time);

		combinedDate.setHours(
			timeDate.getHours(),
			timeDate.getMinutes(),
			0, // Seconds set to 0
			0 // Milliseconds set to 0
		);

		return format(combinedDate, "yyyy-MM-dd'T'HH:mm:ss");
	};

	// Helper function to calculate end time
	const calculateEndTime = (startTime, duration) => {
		return addMinutes(new Date(startTime), parseInt(duration));
	};

	// Update end time whenever start time or duration changes
	useEffect(() => {
		setEventData((prev) => ({
			...prev,
			endTime: calculateEndTime(prev.startTime, prev.duration),
		}));
	}, [eventData.startTime, eventData.duration]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEventData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleDateChange = (date) => {
		setEventData((prev) => ({
			...prev,
			date,
		}));
	};

	const handleTimeChange = (time) => {
		setEventData((prev) => ({
			...prev,
			startTime: time,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Format the dates before submitting
		const formattedData = {
			...eventData,
			date: stripTimezone(eventData.date),
			startTime: formatDateTime(eventData.date, eventData.startTime),
			endTime: formatDateTime(eventData.date, eventData.endTime),
		};

		onSubmit(formattedData);

		// Reset form with initial times
		setEventData({
			title: "",
			description: "",
			duration: 30,
			webinarType: "Public",
			price: 0,
			discount: 0,
			date: stripTimezone(new Date()),
			startTime: new Date(),
			endTime: addMinutes(new Date(), 30),
		});
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<h2>Create New Webinar</h2>

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="title">Title</label>
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
					<div className="form-group-time">
						<div className="form-group">
							<label htmlFor="date">Date</label>
							<DatePicker
								selected={eventData.date}
								onChange={handleDateChange}
								dateFormat="MMMM d, yyyy"
								minDate={new Date()}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="duration">Duration (min.)</label>
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
					</div>

					<div className="form-group-time">
						<div className="form-group">
							<label htmlFor="startTime">Start Time</label>
							<DatePicker
								selected={eventData.startTime}
								onChange={handleTimeChange}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={15}
								timeCaption="Time"
								dateFormat="h:mm aa"
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="endTime">End Time</label>
							<DatePicker
								selected={eventData.endTime}
								readOnly
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={15}
								timeCaption="Time"
								dateFormat="h:mm aa"
								className="readonly-picker"
							/>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="privacy">Privacy</label>
						<select
							id="webinarType"
							name="webinarType"
							value={eventData.webinarType}
							onChange={handleChange}
						>
							<option value="Private">Private</option>
							<option value="Public">Public</option>
							<option value="Pitch Day">Pitch Day</option>
						</select>
					</div>

					{eventData.webinarType === "Private" && (
						<div className="form-group">
							<label htmlFor="community">Community</label>
							<select
								id="community"
								name="community"
								value={eventData.community}
								onChange={handleChange}
								required
							>
								<option value="">Select a community</option>
								{community.map((comm) => (
									<option key={comm._id} value={comm._id}>
										{comm.communityName}
									</option>
								))}
							</select>
							{loading && <span>Loading communities...</span>}
							{error && (
								<span className="error">Error loading communities</span>
							)}
						</div>
					)}

					<div className="form-group">
						<label htmlFor="price">Price</label>
						<input
							type="number"
							id="price"
							name="price"
							value={eventData.price}
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="discount">Discount (%)</label>
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
							Create Webinar
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

export default WebinarModal;
