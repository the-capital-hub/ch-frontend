import React from "react";
import NP_img from "../../Images/networking-platform.png";
import rocket from "../../Images/rocket.png";
import onelink1 from "../../Images/create-onelink3.png";
import onelink2 from "../../Images/create-onelink2.png";
import onelink3 from "../../Images/create-onelink1.png";
import "./WhyUseCapitalHub.scss";

const WhyUseCapitalHub = () => {
	return (
		<div className="whyUseCapitalHub-container">
			<h1>
				Why Use <span>Capital HUB's</span> Platform ?
			</h1>

			<div className="whyUseCapitalHub-container-cards">
				<div className="whyUseCapitalHub-container-cards-card">
					<img src={NP_img} alt="" />
					<div className="whyUseCapitalHub-container-cards-card-title">
						Networking Platform
					</div>
					<div className="whyUseCapitalHub-container-cards-card-description">
						Unlock the potential of your startup by connecting with the ideal
						angel investors tailored to your preferences. Our advanced filtering
						system ensures you find the perfect match, crucial for achieving
						your startup's success. Don't miss out on this opportunity to take
						your business to new{" "}
					</div>
				</div>
				<div className="whyUseCapitalHub-container-cards-card">
					<img src={rocket} alt="" />
					<div className="whyUseCapitalHub-container-cards-card-title">
						Angel Investment Made Easy
					</div>
					<div className="whyUseCapitalHub-container-cards-card-description">
						Unlock the potential of your startup by connecting with the ideal
						angel investors tailored to your preferences. Our advanced filtering
						system ensures you find the perfect match, crucial for achieving
						your startup's success. Don't miss out on this opportunity to take
						your business to new
					</div>
				</div>
			</div>

			<div className="whyUseCapitalHub-container-onelink-card">
				<div className="whyUseCapitalHub-container-onelink-card-top">
					<img src={onelink1} alt="" />
					<h3>Create your Onelink now</h3>
				</div>
				<p>
					With our innovative "OneLink" feature, managing your startup's
					communication has never been easier. Say goodbye to the hassle of
					multiple attachments and lengthy emails. Now, you can effortlessly
					share all vital information, including pitch decks,documents, and
					crucial updates, using just one convenient and easily accessible link.
				</p>
				<div className="whyUseCapitalHub-container-onelink-card-images">
					<img className="onelink2" src={onelink2} alt="" />
					<img className="onelink3" src={onelink3} alt="" />
				</div>
			</div>
		</div>
	);
};

export default WhyUseCapitalHub;
