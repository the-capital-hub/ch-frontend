import React from "react";
import "./deals.scss";
import Hustler from "../images/hustler.png";
import Exclusive from "../images/exclusive.png";
import { useNavigate } from "react-router-dom";

const Deals = () => {
	return (
		<div className="deals-container">
			<div className="inner-container">
				<center>
					<p className="head">How We Work</p>
				</center>
				<h2 className="head-two">
					Why Join <span>Hustlers Club?</span>
				</h2>

				<div className="hustler-img-text">
					{/* Add the logo image here */}
					<img src={Hustler} alt="Hustlers Club Logo" className="logo-image" />
					<p className="sub-text">
						Hustlers Club gives you all the tools and support you need to take
						your startup to the next level.
					</p>
				</div>

				<div className="exc-outer">
					<div className="exclusive-content">
						<div className="content-left">
							<h3>Exclusive webinars and Events</h3>
							<p>
								Learn from top investors and founders. These invite-only
								sessions will help you sharpen your growth strategies.
							</p>
							<button className="buy-now-btn">Buy Now</button>
						</div>
						<div className="content-right">
							<img src={Exclusive} alt="exclusive" />
						</div>
					</div>

					<div className="exclusive-content2">
						<div className="content-left">
							<h3>1 : 1 Discussions with Experts</h3>
							<p>
								Book private sessions with industry leaders who can offer
								insights on fundraising, business strategy, and growth.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Deals;
