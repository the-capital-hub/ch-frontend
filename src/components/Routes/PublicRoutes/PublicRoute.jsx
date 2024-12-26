import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar3/Navbar3";
import Sidebar from "../../SidebarPublic/SidebarPublic";
// import InvestorSidebar from "../../Investor/InvestorSidebar/InvestorSidebar";
import "./PublicRoutes.scss";

const PublicRoutes = ({ children, ...props }) => {
	// const user = useSelector((state) => state.user.loggedInUser);
	const [sidebarCollapse, setSidebarCollapse] = useState(true);
	// const [isExpanded, setIsExpanded] = useState(false);

	const handleSidebarToggle = () => {
		setSidebarCollapse((prev) => !prev);
	};
	return (
		<div className="public-routes-container">
			<Navbar
				handleSidebarToggle={handleSidebarToggle}
				sidebarCollapse={sidebarCollapse}
			/>
			<div className="public-routes-main-container">
				{/* {user && (
					<InvestorSidebar
						sidebarCollapsed={sidebarCollapse}
						setSidebarCollapsed={handleSidebarToggle}
					/>
				)} */}
				<Sidebar
					sidebarCollapse={sidebarCollapse}
					setSidebarCollapse={setSidebarCollapse}
				/>
				<div className="public-routes-main">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PublicRoutes;
