import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import {
	getMeetingsAvailability,
	updateMeetingsAvailability,
} from "../../../Service/user";
import "react-datepicker/dist/react-datepicker.css";
import "./Availability.scss";

const AvailabilitySettings = () => {
	const navigate = useNavigate();
	const theme = useSelector((state) => state.design.theme);
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const isInvestor = useSelector((state) => state.user.isInvestor);

	// Helper function to format time in 12-hour format
	const formatTime = (date) => {
		return date.toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		});
	};

	// Helper function to parse 12-hour time string to Date object
	const parseTime = (timeStr) => {
		const [time, period] = timeStr.split(" ");
		let [hours, minutes] = time.split(":");
		hours = parseInt(hours);

		if (period === "PM" && hours !== 12) hours += 12;
		if (period === "AM" && hours === 12) hours = 0;

		const date = new Date();
		date.setHours(hours, parseInt(minutes), 0);
		return date;
	};

	const [availability, setAvailability] = useState([
		{ day: "Monday", enabled: false, start: "10:00 AM", end: "6:00 PM" },
		{ day: "Tuesday", enabled: false, start: "10:00 AM", end: "6:00 PM" },
		{ day: "Wednesday", enabled: false, start: "10:00 AM", end: "6:00 PM" },
		{ day: "Thursday", enabled: false, start: "10:00 AM", end: "6:00 PM" },
		{ day: "Friday", enabled: false, start: "10:00 AM", end: "6:00 PM" },
		{ day: "Saturday", enabled: false, start: "10:00 AM", end: "6:00 PM" },
		{ day: "Sunday", enabled: false, start: "10:00 AM", end: "6:00 PM" },
	]);

	const [minGap, setMinGap] = useState(15);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchAvailability();
	}, []);

	const fetchAvailability = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await getMeetingsAvailability();
			console.log("Availability data:", data.data);

			// Update state with fetched data
			setAvailability((prev) =>
				prev.map((slot) => {
					const fetchedSlot = data.data.dayAvailability.find(
						(d) => d.day.toLowerCase() === slot.day.toLowerCase()
					);
					if (fetchedSlot) {
						return {
							...slot,
							start: fetchedSlot.startTime,
							end: fetchedSlot.endTime,
							enabled: true,
						};
					}
					return { ...slot, enabled: false };
				})
			);
			setMinGap(data.data.minimumGap);
		} catch (err) {
			setError("Failed to load availability settings. Please try again.");
			console.error("Error fetching availability:", err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDayToggle = (day) => {
		setAvailability((prev) =>
			prev.map((slot) =>
				slot.day === day ? { ...slot, enabled: !slot.enabled } : slot
			)
		);
	};

	const handleTimeChange = (day, type, date) => {
		const timeStr = formatTime(date);
		setAvailability((prev) =>
			prev.map((slot) =>
				slot.day === day ? { ...slot, [type]: timeStr } : slot
			)
		);
	};

	const updateAvailability = async () => {
		try {
			setError(null);
			const formattedData = {
				dayAvailability: availability
					.filter((slot) => slot.enabled)
					.map((slot) => ({
						day: slot.day,
						startTime: slot.start,
						endTime: slot.end,
					})),
				minimumGap: minGap,
			};

			await updateMeetingsAvailability(formattedData);
			setShowSuccess(true);
			setTimeout(() => {
				setShowSuccess(false);
				navigate("/meeting/events");
			}, 2000);
		} catch (err) {
			setError("Failed to update availability. Please try again.");
			console.error("Error updating availability:", err);
		}
	};

	if (isLoading) {
		return (
			<div className="availability-container">
				Loading availability settings...
			</div>
		);
	}

	return (
		<div
			className={`availability-container ${
				theme === "dark" ? "dark-theme" : ""
			} ${isInvestor ? "investor-theme" : ""}`}
		>
			<h1>Availability Settings</h1>

			{error && <div className="error-message">{error}</div>}

			<div className="time-slots">
				{availability.map((slot) => (
					<div key={slot.day} className="time-slot-row">
						<div className="day-toggle">
							<input
								type="checkbox"
								checked={slot.enabled}
								onChange={() => handleDayToggle(slot.day)}
							/>
							<span>{slot.day}</span>
						</div>

						{slot.enabled && (
							<div className="time-inputs">
								<DatePicker
									selected={parseTime(slot.start)}
									onChange={(date) => handleTimeChange(slot.day, "start", date)}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Start"
									dateFormat="h:mm aa"
									timeFormat="h:mm aa"
								/>
								<span className="time-separator">to</span>
								<DatePicker
									selected={parseTime(slot.end)}
									onChange={(date) => handleTimeChange(slot.day, "end", date)}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="End"
									dateFormat="h:mm aa"
									timeFormat="h:mm aa"
								/>
								<span className="time-display">
									{slot.start} to {slot.end}
								</span>
							</div>
						)}
					</div>
				))}
			</div>

			<div className="min-gap-setting">
				<label>
					Minimum gap between meetings (minutes)
					<input
						type="number"
						value={minGap}
						onChange={(e) => setMinGap(Number(e.target.value))}
						min="0"
						step="5"
					/>
				</label>
			</div>

			{showSuccess && (
				<div className="success-message">
					Availability updated successfully!
				</div>
			)}

			<button className="update-btn" onClick={updateAvailability}>
				Update Availability
			</button>
		</div>
	);
};

export default AvailabilitySettings;
