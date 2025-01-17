import React from "react";
import noise from "../imagesNew/noise-bg.png";
import "./EmpowerYourStartup.scss";

const EmpowerYourStartup = () => {
	return (
		<div className="EmpowerYourStartup-container">
			<div className="EmpowerYourStartup-content">
				<h1>Empower Your Starting with Game - Changing Resources</h1>
				<div className="EmpowerYourStartup-cards">
					<div className="EmpowerYourStartup-card">
						{/* <img src={noise} alt="" /> */}
						<h5>Comprehensive GTM Strategy Template</h5>
						<p>
							Launch your product with ease using our GTM strategy template to
							define your audience, channels, and sales approach fro success.
						</p>
					</div>
					<div className="EmpowerYourStartup-card">
						{/* <img src={noise} alt="" /> */}
						<h5>Pre-Built Sales templates</h5>
						<p>
							Enhance your sales with ready-to-use templates, including lead-gen
							scripts and email sequences, to streamline processes and drive
							faster growth.
						</p>
					</div>
					<div className="EmpowerYourStartup-card">
						{/* <img src={noise} alt="" /> */}
						<h5>Financial Modeling template</h5>
						<p>
							Take control of your finances with a robust template to forecast
							revenue, manage expenses, and track cash flow, helping you attract
							investors.
						</p>
					</div>
					<div className="EmpowerYourStartup-card">
						{/* <img src={noise} alt="" /> */}
						<h5>Investor-Ready pitch Deck Template</h5>
						<p>
							Create a compelling pitch that highlights your startup’s
							strengths, opportunities, and financials to captivate investors.
						</p>
					</div>
					<div className="EmpowerYourStartup-card">
						{/* <img src={noise} alt="" /> */}
						<h5>Premium Investor network</h5>
						<p>
							Connect with 500+ VCs and 1000+ Angel Investors, filtered by
							sector, region, and investment stage, to secure the right funding
							for your startup.
						</p>
					</div>
				</div>
				<div className="EmpowerYourStartup-price-card">
					<div className="EmpowerYourStartup-price-card-details">
						<div className="EmpowerYourStartup-price-card-title">
							Get Premium Access for Only
						</div>
						<div className="EmpowerYourStartup-price-card-price">
							<span>INR</span> 1,999
						</div>
						<button className="EmpowerYourStartup-price-card-button">
							Unlock Your Growth Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmpowerYourStartup;
