import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { FiCopy, FiTrash2 } from "react-icons/fi";
import { HiVideoCamera } from "react-icons/hi";
import Spinner from "../../../components/Spinner/Spinner";
import {
	getEventsByOnelinkId,
	getWebinarsByOnelinkId,
} from "../../../Service/user";
import PaymentPopup from "./PaymentPopup/PaymentPopup";
import "./PitchDays.scss"; // Create a corresponding SCSS file for styles

const PitchDays = () => {
	const { userId } = useParams(); // its onelinkId
	const [pitchDays, setPitchDays] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const navigate = useNavigate();

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

	const cards = [
		{
			title: "Pitch Day 1",
			duration: 45,
			price: 200,
			bookings: ["a", "b", "c"],
			isPrivate: false,
		},
		{
			title: "Pitch Day 2",
			duration: 60,
			price: 300,
			bookings: ["a", "b", "c", "a", "b", "c"],
			isPrivate: true,
		},
		{
			title: "Pitch Day 3",
			duration: 90,
			price: 0,
			bookings: ["a", "b", "c", "a", "b", "c", "a", "b", "c"],
			isPrivate: false,
		},
		{
			title: "Pitch Day 4",
			duration: 30,
			price: 150,
			bookings: [],
			isPrivate: true,
		},
	];

	// Function to generate random descriptions and headings
	const getRandomDescription = () => {
		const descriptions = [
			"Exciting opportunities await!",
			"Join us for an insightful day.",
			"Network with industry leaders.",
			"Discover innovative pitches.",
		];
		return descriptions[Math.floor(Math.random() * descriptions.length)];
	};

	const getRandomLightColor = () => {
		const r = Math.floor(Math.random() * 156 + 100); // Red value between 100-255
		const g = Math.floor(Math.random() * 156 + 100); // Green value between 100-255
		const b = Math.floor(Math.random() * 156 + 100); // Blue value between 100-255
		return `rgb(${r}, ${g}, ${b})`;
	};

	const getRandomHeading = (index) => `Pitch Day ${index + 1}`;

	// New function to generate random time, price, and bookings
	const getRandomEventDetails = () => {
		const duration = Math.floor(Math.random() * 120) + 30; // Random duration between 30 and 150 mins
		const price = Math.floor(Math.random() * 1000); // Random price between 0 and 1000
		const bookings = Math.floor(Math.random() * 100); // Random bookings between 0 and 100
		const isPrivate = Math.random() < 0.5; // Randomly decide if the event is private
		return { duration, price, bookings, isPrivate };
	};

	const handleJoinClick = (event) => {
		// Handle join button click
		if (event.price > 0) {
			// If the event has a price, redirect to the payment page
			// Replace this with your actual payment page URL
			// window.location.href = "/payment";
			setIsPaymentModalOpen(true);
		} else {
			// If the event is free, open the Google Meet link in a new tab
			window.open(event.link, "_blank", "noopener,noreferrer");
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

	const handleProceedToPayment = (userDetails) => {
		console.log("User Details:", userDetails);
		// Handle payment logic here
	};
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
													₹
													{(event.price * (1 - event.discount / 100)).toFixed(
														0
													)}
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
				webinarDetails={webinarDetails}
				onProceed={handleProceedToPayment}
			/>
		</>
	);
};

export default PitchDays;
