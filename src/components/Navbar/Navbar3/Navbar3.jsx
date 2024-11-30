import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectTheme,
	selectIsMobileView,
} from "../../../Store/features/design/designSlice";
import { Link, useNavigate } from "react-router-dom";
import DarkLogo from "../../../Images/investorIcon/new-logo.png";
import WhiteLogo from "../../../Images/investorIcon/logo-white.png";
import OnboardingSwitch from "../../../components/Investor/InvestorNavbar/OnboardingSwitch/OnboardingSwitch";
import { BsBell } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { selectTotalUnreadCount } from "../../../Store/features/chat/chatSlice";
import { setUnreadNotifications } from "../../../Store/features/user/userSlice";
import NavPopup from "./Popup/NavPopup";
import "./Navbar3.scss";

const Navbar3 = () => {
	const theme = useSelector(selectTheme);
	const user = useSelector((state) => state.user.loggedInUser);
	const isMobileView = useSelector(selectIsMobileView);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const totalUnreadCount = useSelector(selectTotalUnreadCount);
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const [activePopup, setActivePopup] = useState(null);
	const notificationRef = useRef(null);
	const messageRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				notificationRef.current &&
				!notificationRef.current.contains(event.target) &&
				messageRef.current &&
				!messageRef.current.contains(event.target)
			) {
				setActivePopup(null);
			}
		}

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleNotificationClick = () => {
		setActivePopup((prev) => (prev === "notification" ? null : "notification"));
		dispatch(setUnreadNotifications(0));
	};

	const handleMessageClick = () => {
		setActivePopup((prev) => (prev === "message" ? null : "message"));
	};

	const handleProfileClick = () => {
		setShowProfileDropdown(!showProfileDropdown);
	};

	const handleLogout = () => {
		// Implement logout logic here
		// For example: dispatch(logoutUser())
		navigate("/login");
	};

	return (
		<>
			<div
				className={`navbar-public-container ${
					theme === "dark" ? "dark-theme" : ""
				}`}
			>
				<div className="navbar-public-logo">
					<img
						src={theme === "dark" ? WhiteLogo : DarkLogo}
						onClick={() => navigate("/")}
						alt="the capital hub logo"
					/>
				</div>
				<div className="navbar-public-links">
					<Link to="/about">
						<span>About Us</span>
					</Link>

					<Link to="/contactus">
						<span>Contact Us</span>
					</Link>

					<Link to="/our-investor">
						<span>Investor</span>
					</Link>

					<Link to="/start-up">
						<span>Startup</span>
					</Link>

					<Link to="/blog">
						<span>Blog</span>
					</Link>
				</div>
				<div className="navbar-public-profile-items">
					{!isMobileView && <OnboardingSwitch />}

					{/* Notification */}
					<div className="notification-container" ref={notificationRef}>
						<div className="icon-wrapper">
							<BsBell
								size={25}
								style={{
									color:
										activePopup === "notification"
											? "var(--currentTheme)"
											: "var(--d-l-grey)",
								}}
								onClick={handleNotificationClick}
							/>
						</div>

						{activePopup === "notification" && (
							<NavPopup
								popupFor="notification"
								onClose={() => setActivePopup(null)}
							/>
						)}
					</div>

					{/* Message */}
					<div className="message-container" ref={messageRef}>
						<div className="icon-wrapper">
							<AiOutlineMessage
								size={25}
								style={{
									color:
										activePopup === "message"
											? "var(--currentTheme)"
											: "var(--d-l-grey)",
								}}
								onClick={handleMessageClick}
							/>
							{!activePopup && totalUnreadCount > 0 && (
								<div className="message-count">{totalUnreadCount}</div>
							)}
						</div>

						{activePopup === "message" && (
							<NavPopup
								popupFor="message"
								onClose={() => setActivePopup(null)}
							/>
						)}
					</div>

					{/* Profile */}
					<div className="profile-container" onClick={handleProfileClick}>
						<img
							src={
								user?.profilePicture
									? user.profilePicture
									: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
							}
							alt="profile"
							// onClick={() => navigate("/profile")}
						/>
						{showProfileDropdown && (
							<div className="profile-dropdown">
								{user ? (
									<>
										<div onClick={() => navigate("/profile")}>Profile</div>
										<div onClick={handleLogout}>Logout</div>
									</>
								) : (
									<div onClick={() => navigate("/login")}>Login</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar3;
