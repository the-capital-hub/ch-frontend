import React, { useState } from "react";
import "./Availability.scss";
import { environment } from "../../../environments/environment";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const AvailabilitySettings = () => {
	const theme = useSelector(selectTheme);
	const [availability, setAvailability] = useState({
		dayAvailability: [
			{ day: "Monday", start: "09:00", end: "17:00", enabled: true },
			{ day: "Tuesday", start: "09:00", end: "17:00", enabled: false },
			{ day: "Wednesday", start: "09:00", end: "17:00", enabled: false },
			{ day: "Thursday", start: "09:00", end: "17:00", enabled: false },
			{ day: "Friday", start: "09:00", end: "17:00", enabled: false },
			{ day: "Saturday", start: "09:00", end: "17:00", enabled: false },
			{ day: "Sunday", start: "09:00", end: "17:00", enabled: false },
		],
		minGap: 15,
	});

	// Updated handleDayToggle function
	const handleDayToggle = (day) => {
		setAvailability((prev) => {
			const updatedDayAvailability = prev.dayAvailability.map((item) => {
				if (item.day === day) {
					return { ...item, enabled: !item.enabled }; // Toggle enabled state
				}
				return item; // Return unchanged item
			});
			return { ...prev, dayAvailability: updatedDayAvailability }; // Update state
		});
	};

	// Updated handleTimeChange function
	const handleTimeChange = (day, type, value) => {
		setAvailability((prev) => {
			const updatedDayAvailability = prev.dayAvailability.map((item) => {
				if (item.day === day) {
					return { ...item, [type]: value }; // Update start or end time
				}
				return item; // Return unchanged item
			});
			return { ...prev, dayAvailability: updatedDayAvailability }; // Update state
		});
	};

	const updateAvailability = () => {
		console.log("Updating availability:", availability);
		// Make API call to update availability
		try {
			fetch(`${baseUrl}/meetings/updateAvailability`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(availability),
			}).then((res) => {
				if (res.status === 200) {
					console.log("Availability updated successfully");
					alert("Availability updated successfully");
				} else {
					console.log("Error updating availability");
					alert("Error updating availability");
				}
			});
		} catch (error) {
			console.error("Error updating availability:", error);
			alert("Error updating availability");
		}
	};

	// console.log("theme", theme);

	return (
		<div
			className={`availability-container ${
				theme === "dark" ? " dark-theme" : ""
			}`}
		>
			<div className="availability-wrapper">
				<h1>Availability</h1>

				<div className="time-slots">
					{availability.dayAvailability.map((item) => (
						<div key={item.day} className="time-slot-row">
							<label className="checkbox-label">
								<input
									type="checkbox"
									checked={item.enabled} // Access enabled directly from item
									onChange={() => handleDayToggle(item.day)} // Pass the day to toggle
								/>
								<span>{item.day}</span>
							</label>

							{item.enabled && ( // Check if the day is enabled
								<div className="time-inputs">
									<input
										type="time"
										value={item.start} // Access start time directly from item
										onChange={
											(e) => handleTimeChange(item.day, "start", e.target.value) // Pass day, type, and value
										}
									/>
									<span className="time-separator">to</span>
									<input
										type="time"
										value={item.end} // Access end time directly from item
										onChange={
											(e) => handleTimeChange(item.day, "end", e.target.value) // Pass day, type, and value
										}
									/>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="min-gap-setting">
					<label>
						Minimum gap before booking (minutes):
						<input
							type="number"
							value={availability.minGap}
							onChange={(e) => {
								const newMinGap = e.target.value;
								setAvailability((prev) => ({
									...prev,
									minGap: newMinGap,
								}));
							}}
							min="0"
						/>
					</label>
				</div>

				<button className="update-btn" onClick={updateAvailability}>
					Update Availability
				</button>
			</div>
		</div>
	);
};

export default AvailabilitySettings;
