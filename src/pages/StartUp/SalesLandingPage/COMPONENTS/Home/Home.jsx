import React, { useEffect, useState } from "react";
import Features from "../Features/Features";
import { useNavigate } from "react-router-dom";
import smallline from "../images/Line 152.png";
import img2 from "../images/Home.png";
import play from "../images/playbutton.png";
import arrow1 from "../images/arrow1.png"; // Use your arrow image path here
import "./home.scss";

const Home = () => {
	const [startAnimation, setStartAnimation] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setStartAnimation(true);
	}, []);

	return (
		<div className="home">
			<div className="home__container">
				<div className="main-banner">
					{/* Background Image */}
					<div className="banner-bg">
						<div className="best-startup">
							<img src={smallline} alt="" className="smallline" />
							<h1>
								<b>
									# No 1 Company For <span id="headBanner">Startup</span>
								</b>
							</h1>
							<img src={smallline} alt="" className="smallline" />
						</div>

						{/* Green Arrow */}
						<div className="arrow-container">
							<img className="green-arrow" src={arrow1} alt="green arrow" />
						</div>

						<h1 className="main-heading">
							Build Your Startup's <br /> Future, Today
						</h1>

						<center>
							<p className="description">
								Access India’s Most Comprehensive Investor Database and Start
								Connecting with 500+ VCs and 1000+ Angel Investors
							</p>
						</center>

						<center>
							<div className="button-cta">
								<button
									onClick={() => {
										navigate("/signup");
									}}
									className="join-button"
								>
									Buy Now
								</button>
								<button
									onClick={() => {
										navigate("/signup");
									}}
									className="download-button"
								>
									Download Now
								</button>
							</div>
						</center>

						
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
