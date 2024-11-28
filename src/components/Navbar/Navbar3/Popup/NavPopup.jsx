import React, { useEffect, useState } from "react";
import { selectTheme } from "../../../../Store/features/design/designSlice";
import { useSelector } from "react-redux";

import "./NavPopup.scss";

const NotificationsPopup = ({ popupFor = "notification" }) => {
	const theme = useSelector(selectTheme);
	const [unReadCount, setUnReadCount] = useState(2);
	const [activePopup, setActivePopup] = useState(popupFor);
	const [notifications, setNotifications] = useState({
		notification: [
			{
				_id: "1",
				sender: "Capital Hub",
				description: "Welcome to Capital Hub.",
				read: false,
				timestamp: new Date("2024-01-15T10:30:00"),
			},
			{
				_id: "2",
				sender: "Capital Hub",
				description: "Please login to get personalized notifications.",
				read: false,
				timestamp: new Date("2024-01-16T14:45:00"),
			},
		],
		message: [
			{
				_id: "1",
				sender: "John Doe",
				description: "Hey, can we discuss the project?",
				read: false,
				timestamp: new Date("2024-01-17T09:15:00"),
			},
			{
				_id: "2",
				sender: "Capital Hub Support",
				description: "Your account verification is pending.",
				read: false,
				timestamp: new Date("2024-01-18T16:20:00"),
			},
		],
	});

	useEffect(() => {
		// Update unread count whenever notifications change
		const currentUnreadCount = notifications[activePopup].filter(
			(item) => !item.read
		).length;
		setUnReadCount(currentUnreadCount);
	}, [notifications, activePopup]);

	const markAsRead = (id) => {
		setNotifications((prev) => ({
			...prev,
			[activePopup]: prev[activePopup].map((item) =>
				item._id === id ? { ...item, read: true } : item
			),
		}));
	};

	const markAllRead = () => {
		setNotifications((prev) => ({
			...prev,
			[activePopup]: prev[activePopup].map((item) => ({ ...item, read: true })),
		}));
	};

	const handleNotificationClick = (id) => {
		// Logic for handling notification click (e.g., navigate to specific page)
		console.log(`Clicked notification ${id} in ${activePopup}`);
		markAsRead(id);
	};

	const togglePopupType = () => {
		setActivePopup((prev) =>
			prev === "notification" ? "message" : "notification"
		);
	};

	const formatTimestamp = (timestamp) => {
		const now = new Date();
		const diff = now - timestamp;
		const hours = Math.floor(diff / (1000 * 60 * 60));

		if (hours < 24) return `${hours} hours ago`;
		if (hours < 48) return "1 day ago";
		return timestamp.toLocaleDateString();
	};

	return (
		<div
			className={`notifications-popup-container ${
				theme === "dark" ? "dark-theme" : ""
			}`}
		>
			<div className="notification-header">
				<div className="popup-toggle">
					<button
						className={`toggle-btn ${
							activePopup === "notification" ? "active" : ""
						}`}
						onClick={() => setActivePopup("notification")}
					>
						Notifications
					</button>
					<button
						className={`toggle-btn ${
							activePopup === "message" ? "active" : ""
						}`}
						onClick={() => setActivePopup("message")}
					>
						Messages
					</button>
				</div>
				<button className="mark-all-read" onClick={markAllRead}>
					Mark all read
				</button>
			</div>

			{notifications[activePopup].map((item) => (
				<div
					key={item._id}
					className={`notification ${item.read ? "read" : "unread"}`}
					onClick={() => handleNotificationClick(item._id)}
				>
					<div className="notification-content">
						<div className="notification-header-item">
							<span className="sender">{item.sender}</span>
							<span className="timestamp">
								{formatTimestamp(item.timestamp)}
							</span>
						</div>
						<span className="description">{item.description}</span>
					</div>
					{!item.read && (
						<div className="notification-actions">
							<button
								className="mark-read"
								onClick={(e) => {
									e.stopPropagation();
									markAsRead(item._id);
								}}
							>
								<span className="mark-read-icon">✔</span>
							</button>
						</div>
					)}
				</div>
			))}

			<div className="notification-footer">
				<span>
					{unReadCount} New{" "}
					{activePopup === "notification" ? "Notifications" : "Messages"}
				</span>
			</div>
		</div>
	);
};

export default NotificationsPopup;
