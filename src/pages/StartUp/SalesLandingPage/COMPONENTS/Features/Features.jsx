import React from "react";
import i1 from "../images/Vector.png";
import i2 from "../images/Vector (1).png";
import i3 from "../images/Vector (2).png";
import i4 from "../images/Vector (3).png";
import i5 from "../images/Vector (4).png";
import i6 from "../images/Group.png";
import Company from "../images/sscompany.png";
import Documentation from "../images/ssdocumentation.png";
import Invest from "../images/ssinvest.png";
import Profile from "../images/ssprofile.png";
import bg1 from "../images/Polygon 3.png";
import bg2 from "../images/Polygon 7.png";
// import img1 from '../images/Polygon 2 (2).png';
import line from "../images/Group 1261152818.png";
import { FaArrowRight } from "react-icons/fa";
import "./features.scss";
import { useNavigate } from "react-router-dom";

const Features = () => {
	const navigate = useNavigate();
	return (
		<div className="features-container">
			<div className="center-content">
				<h1>All-in One Link to Share Your Startup’s Story</h1>
				<p>
					Use a single link to share over <span>32+ documents</span> with
					investors, including profiles, financials, and team info.
				</p>
				<button className="join-button">Buy Now</button>
			</div>

			<div className="features-content">
				<div className="column left-column">
					<div className="line"></div>
					<div className="content">
						<div className="feature">
							<h1>Company</h1>
							<img src={Company} alt="Company" />
						</div>
						<div className="feature">
							<h1>Invest Now</h1>
							<img src={Invest} alt="Invest Now" />
						</div>
					</div>
				</div>
				<div className="column right-column">
					<div className="line"></div>
					<div className="content">
						<div className="feature">
							<h1>Documentation</h1>
							<img src={Documentation} alt="Documentation" />
						</div>
						<div className="feature">
							<h1>Profile</h1>
							<img src={Profile} alt="Profile" />
						</div>
					</div>
				</div>
			</div>
			{/* <button className='join-button'>JOIN OUR COMMUNITY FOR FREE</button> */}
			{/* <img src={line} alt="bottom line" className='bottom-line' /> */}
		</div>
	);
};

export default Features;
