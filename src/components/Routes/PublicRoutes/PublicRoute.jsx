import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar3/Navbar3";
import Sidebar from "../../SidebarPublic/SidebarPublic";
import "./PublicRoutes.scss";

const PublicRoutes = ({ children, ...props }) => {
	const [sidebarCollapse, setSidebarCollapse] = useState(true);
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
				<Sidebar
					sidebarCollapse={sidebarCollapse}
					handleSidebarToggle={handleSidebarToggle}
				/>
				<div className="public-routes-main">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default PublicRoutes;
