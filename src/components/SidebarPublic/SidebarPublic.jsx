import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	selectTheme,
	selectIsMobileView,
} from "../../Store/features/design/designSlice";
import {
	FaHome,
	FaBuilding,
	FaSearch,
	FaNewspaper,
	FaLink,
	FaBook,
	FaUserFriends,
	FaFileAlt,
	FaCheckSquare,
	FaChartLine,
	FaCalendarAlt,
	FaQuestionCircle,
	FaUserCog,
	FaLightbulb,
	FaCalendarCheck,
	FaUserEdit,
	FaUserCheck,
	FaPowerOff,
} from "react-icons/fa";

import "./SidebarPublic.scss";

const PublicSidebar = ({ sidebarCollapse, setSidebarCollapse }) => {
	const theme = useSelector(selectTheme);
	const isMobileView = useSelector(selectIsMobileView);
	const [activeSubMenu, setActiveSubMenu] = useState(null);

	const handleIconClick = (feature) => {
		alert(`Please login to use the "${feature}" feature.`);
	};

	const handleSubMenuClick = (subMenu) => {
		setActiveSubMenu(subMenu === activeSubMenu ? null : subMenu);
	};

	useEffect(() => {
		const handleScroll = () => {
			setSidebarCollapse(false);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div
			className={`public-sidebar ${theme === "dark" ? "dark-theme" : ""}${
				sidebarCollapse ? " collapsed" : " expended"
			}`}
			onMouseEnter={() => setSidebarCollapse(false)}
			onMouseLeave={() => setSidebarCollapse(true)}
		>
			<div className="public-sidebar-content">
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Home")}
				>
					<FaHome className="public-sidebar-icon" />
					<span className="public-sidebar-label">Home</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Company")}
				>
					<FaBuilding className="public-sidebar-icon" />
					<span className="public-sidebar-label">Company</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Explore")}
				>
					<FaSearch className="public-sidebar-icon" />
					<span className="public-sidebar-label">Explore</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("News")}
				>
					<FaNewspaper className="public-sidebar-icon" />
					<span className="public-sidebar-label">News</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("OneLink")}
				>
					<FaLink className="public-sidebar-icon" />
					<span className="public-sidebar-label">OneLink</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Resources")}
				>
					<FaBook className="public-sidebar-icon" />
					<span className="public-sidebar-label">Resources</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className={`public-sidebar-item ${
						activeSubMenu === "Community" ? "active" : ""
					}`}
					// onClick={() => handleSubMenuClick("Community")}
					onClick={() => handleIconClick("Community")}
				>
					<FaUserFriends className="public-sidebar-icon" />
					<span className="public-sidebar-label">Community</span>
					{/* {sidebarCollapse && (
					)} */}
					{/* {activeSubMenu === "Community" && (
						<div className="public-sidebar-submenu">
							<div
								className="public-sidebar-item"
								onClick={() => handleIconClick("Create Community")}
							>
								<FaUserEdit className="public-sidebar-icon" />
								<span className="public-sidebar-label">Create Community</span>
							</div>
							<div
								className="public-sidebar-item"
								onClick={() => handleIconClick("My Community")}
							>
								<FaUserCheck className="public-sidebar-icon" />
								<span className="public-sidebar-label">My Community</span>
							</div>
						</div>
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Documentation")}
				>
					<FaFileAlt className="public-sidebar-icon" />
					<span className="public-sidebar-label">Documentation</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Saved Posts")}
				>
					<FaCheckSquare className="public-sidebar-icon" />
					<span className="public-sidebar-label">Saved Posts</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Connections")}
				>
					<FaUserFriends className="public-sidebar-icon" />
					<span className="public-sidebar-label">Connections</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Analytics")}
				>
					<FaChartLine className="public-sidebar-icon" />
					<span className="public-sidebar-label">Analytics</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className={`public-sidebar-item ${
						activeSubMenu === "Meetings" ? "active" : ""
					}`}
					onClick={() => handleIconClick("Meetings")}
				>
					<FaCalendarAlt className="public-sidebar-icon" />
					<span className="public-sidebar-label">Meetings</span>
					{/* {sidebarCollapse && (
					)} */}
					{/* {activeSubMenu === "Meetings" && (
						<div className="public-sidebar-submenu">
							<div
								className="public-sidebar-item"
								onClick={() => handleIconClick("Events")}
							>
								<FaCalendarCheck className="public-sidebar-icon" />
								<span className="public-sidebar-label">Events</span>
							</div>
							<div
								className="public-sidebar-item"
								onClick={() => handleIconClick("Plans")}
							>
								<FaCalendarCheck className="public-sidebar-icon" />
								<span className="public-sidebar-label">Plans</span>
							</div>
							<div
								className="public-sidebar-item"
								onClick={() => handleIconClick("Availability")}
							>
								<FaCalendarCheck className="public-sidebar-icon" />
								<span className="public-sidebar-label">Availability</span>
							</div>
						</div>
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Help")}
				>
					<FaQuestionCircle className="public-sidebar-icon" />
					<span className="public-sidebar-label">Help</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Settings")}
				>
					<FaUserCog className="public-sidebar-icon" />
					<span className="public-sidebar-label">Settings</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Learn More")}
				>
					<FaLightbulb className="public-sidebar-icon" />
					<span className="public-sidebar-label">Learn More</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
				<div
					className="public-sidebar-item"
					onClick={() => handleIconClick("Logout")}
				>
					<FaPowerOff className="public-sidebar-icon" />
					<span className="public-sidebar-label">Logout</span>
					{/* {sidebarCollapse && (
					)} */}
				</div>
			</div>
		</div>
	);
};

export default PublicSidebar;
