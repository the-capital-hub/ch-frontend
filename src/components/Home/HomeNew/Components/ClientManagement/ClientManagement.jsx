import React from "react";
import CM_Pic from "../../Images/Client-Management.png";
import "./ClientManagement.scss";

const ClientManagement = () => {
	return (
		<div className="ClientManagement">
			<div className="ClientManagement-container">
				<div className="ClientManagement-container-actions">
					<div className="ClientManagement-container-actions-card1">
						<div className="ClientManagement-container-actions-card1-title">
							Client Management
						</div>
						<div className="ClientManagement-container-actions-card1-description">
							Elevate client interactions with our user-friendly management
							tools.
						</div>
					</div>

					<div className="ClientManagement-container-actions-card">
						<div className="ClientManagement-container-actions-card-title">
							Create Community
						</div>
						<div className="ClientManagement-container-actions-card-description">
							Elevate client interactions with our user-friendly management
							tools.
						</div>
					</div>

					<div className="ClientManagement-container-actions-card">
						<div className="ClientManagement-container-actions-card-title">
							Investor management
						</div>
						<div className="ClientManagement-container-actions-card-description">
							Elevate client interactions with our user-friendly management
							tools.
						</div>
					</div>

					<div className="ClientManagement-container-actions-card">
						<div className="ClientManagement-container-actions-card-title">
							Growthive for Mentors
						</div>
						<div className="ClientManagement-container-actions-card-description">
							Elevate client interactions with our user-friendly management
							tools.
						</div>
					</div>
				</div>
				<div className="ClientManagement-container-management-card">
					<img src={CM_Pic} alt="" />
					<div className="ClientManagement-container-management-card-title">
						Client Management
					</div>
					<div className="ClientManagement-container-management-card-description">
						Elevate client interactions with our user-friendly management tools.
						From simplified payment and workflow tracking to effortless invoice
						creation and smooth payment processing, our platform ensures a
						seamless 
					</div>
				</div>
			</div>
			<div className="ClientManagement-view-all-btn">View all</div>
		</div>
	);
};

export default ClientManagement;
