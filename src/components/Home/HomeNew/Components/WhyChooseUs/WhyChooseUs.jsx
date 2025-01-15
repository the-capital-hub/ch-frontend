import React from "react";
import investor from "../../Images/investor.png";
import networking from "../../Images/networking.png";
import team from "../../Images/team-management.png";
import onelink from "../../Images/onelink.png";
import crm from "../../Images/crm.png";
import irm from "../../Images/irm.png";
import "./WhyChooseUs.scss";

const WhyChooseUs = () => {
	return (
		<div className="whyChooseUs-container">
			<div className="whyChooseUs-container-cards">
				<div className="whyChooseUs-container-cards-card">
					<img src={investor} alt="" />
					<div className="whyChooseUs-container-cards-card-title">
						Angel Investor
					</div>
					<div className="whyChooseUs-container-cards-card-description">
						Discover the perfect angel investors aligned with your preferences
						through our advanced filtering system, as finding the right investor
						is crucial for your startup's success.
					</div>
				</div>
				<div className="whyChooseUs-container-cards-card">
					<img src={networking} alt="" />
					<div className="whyChooseUs-container-cards-card-title">
						Networking
					</div>
					<div className="whyChooseUs-container-cards-card-description">
						Expand your horizons by connecting and learning from experienced
						leaders, mentors, and angel investors, fostering valuable
						relationships to fuel your startup's growth.
					</div>
				</div>
				<div className="whyChooseUs-container-cards-card">
					<img src={team} alt="" />
					<div className="whyChooseUs-container-cards-card-title">
						Team Management
					</div>
					<div className="whyChooseUs-container-cards-card-description">
						Optimize team collaboration and productivity by adding members,
						creating a vision board, and assigning tasks, all within an
						efficient and cohesive environment for seamlessteamwork.
					</div>
				</div>
				<div className="whyChooseUs-container-cards-card">
					<img src={onelink} alt="" />
					<div className="whyChooseUs-container-cards-card-title">One Link</div>
					<div className="whyChooseUs-container-cards-card-description">
						Discover the perfect angel investors aligned with your preferences
						through our advanced filtering system, as finding the right investor
						is crucial for your startup's success.
					</div>
				</div>
				<div className="whyChooseUs-container-cards-card">
					<img src={crm} alt="" />
					<div className="whyChooseUs-container-cards-card-title">CRM</div>
					<div className="whyChooseUs-container-cards-card-description">
						Expand your horizons by connecting and learning from experienced
						leaders, mentors, and angel investors, fostering valuable
						relationships to fuel your startup's growth.
					</div>
				</div>
				<div className="whyChooseUs-container-cards-card">
					<img src={irm} alt="" />
					<div className="whyChooseUs-container-cards-card-title">IRM</div>
					<div className="whyChooseUs-container-cards-card-description">
						Optimize team collaboration and productivity by adding members,
						creating a vision board, and assigning tasks, all within an
						efficient and cohesive environment for seamlessteamwork.
					</div>
				</div>
			</div>
		</div>
	);
};

export default WhyChooseUs;
