import React from "react";
import infinity from "../../Images/infinity.png";
import rocket from "../../Images/rocket.png";
import piggybank from "../../Images/piggybank.png";
import caplogo from "../../Images/caplogo.png";
import videocard from "../../Images/video-card.png";
import "./heroSection.scss";

const HeroSection = () => {
	return (
		<div className="heroSection-container">

			<div className="heroSection-personal-assistant">
				<img
					className="heroSection-personal-assistant-img"
					src={infinity}
					alt="infinity-img"
				/>
				<div className="heroSection-personal-assistant-btn">
					Loop Your Personal Assistant
				</div>
			</div>

			<div className="heroSection-container-title">
				Fund your next big idea into a <br /> Startup now !
			</div>

			<div className="heroSection-container-description">
				Welcome to The Capital Hub, Our integrated platform, where investors,
				startups, and professionals come together to unlock new opportunities
				and build meaningful connections. Whether your're seeking investment
				opportunities, looking to fund your startup, or eager to expand your
				network, our platform offers the perfect ecosystem to fulfill your goals
			</div>

			<div className="heroSection-container-cards">
				<div className="heroSection-container-cards-card">
					<img src={rocket} alt="piggybank" />
					<div className="heroSection-container-cards-card-title">Startup</div>
					<div className="heroSection-container-cards-card-description">
						An anonymous description of your startup to get the investor
						interested
					</div>
					<div className="heroSection-container-cards-card-tags">
						<div className="heroSection-container-cards-card-tags-tag">
							EdTech
						</div>
						<div className="heroSection-container-cards-card-tags-tag">
							Rs. 10 Cr Revenue
						</div>
						<div className="heroSection-container-cards-card-tags-tag">
							150k
						</div>
						<div className="heroSection-container-cards-card-tags-tag">
							2.2 Years Old
						</div>
					</div>
					<div className="heroSection-container-cards-card-button">
						Start Up
					</div>
				</div>
				<div className="heroSection-container-cards-img-card">
					<div className="heroSection-container-cards-img-card-title">
						Register now as
					</div>
					<img src={caplogo} alt="caplogo" />
				</div>
				<div className="heroSection-container-cards-card">
					<img src={piggybank} alt="piggybank" />
					<div className="heroSection-container-cards-card-title">Investor</div>
					<div className="heroSection-container-cards-card-description">
						Define your guardrails and create mandates to discover the right
						companies
					</div>
					<div className="heroSection-container-cards-card-tags">
						<div className="heroSection-container-cards-card-tags-tag">
							EdTech
						</div>
						<div className="heroSection-container-cards-card-tags-tag">
							Rs. 10 Cr Revenue
						</div>
						<div className="heroSection-container-cards-card-tags-tag">
							150k
						</div>
						<div className="heroSection-container-cards-card-tags-tag">
							2.2 Years Old
						</div>
					</div>
					<div className="heroSection-container-cards-card-button">
						Investor
					</div>
				</div>
			</div>

			<p className="heroSection-container-active-buyers-text">
				Join the largest network of active buyers
			</p>

			<div className="heroSection-container-tagbar">
				<span>Coinbase</span>
				<span>COINIGY</span>
				<span>COINIGY</span>
				<span>Kraken</span>
				<span>BINANCE</span>
				<span>Collective</span>
			</div>

			<div className="heroSection-container-who-are-we">
				<div className="heroSection-container-who-are-we-title">
					Who Are <span>We</span> ?
				</div>
				<div className="heroSection-container-who-are-we-description">
					The Capital Hub team comprises exceptional individuals with a diveerse
					range of expertise, spanning investment banking, startup management
					banking, startup management, software development, advisory services,
					and more. Our collective dedication is aimed at empowering startups to
					flourish and thrive in today's dynamic market. Together, we are
					committed to providing the guidance and support needed for your
					startup to reach new heights of success.
				</div>
			</div>

			<img
				className="heroSection-container-video-card"
				src={videocard}
				alt="Video Thumbnail"
			/>
		</div>
	);
};

export default HeroSection;
