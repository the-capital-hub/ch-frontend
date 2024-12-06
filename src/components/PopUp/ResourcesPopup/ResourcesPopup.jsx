import React from "react";
import Hustler from "../../../pages/StartUp/SalesLandingPage/COMPONENTS/images/hustler.png";
import { IoClose } from "react-icons/io5";
import Picture1 from "./images/Picture1.png";
import Picture2 from "./images/Picture2.png";
import Picture3 from "./images/Picture3.png";
import Picture4 from "./images/Picture4.png";
import Picture5 from "./images/Picture5.png";
import Picture6 from "./images/Picture6.png";
import "./ResourcesPopup.scss";

const ResourcesPopup = ({ onClose }) => {
	return (
		<div className="ResourcesPopup-overlay">
			<div className="ResourcesPopup-container">
				<span className="close">
					<IoClose className="fa fa-times" onClick={() => onClose()}></IoClose>
				</span>
				<div className="ResourcesPopup-header">
					<h2>
						Ready - to - Use
						<span> Templates</span>
					</h2>
					<p>Access to events, unlock investors database and more at 1,999/-</p>
					<hr />
				</div>
				<div className="join-hustlers-club">
					<span>Join Hustlers Club ?</span>
					<p>Get ready to use templates</p>
					<img src={Hustler} alt="Hustlers Club Logo" className="logo-image" />
          <img src={Picture5} className="gradient-hustler1" alt="" />
          <img src={Picture6} className="gradient-hustler2" alt="" />
				</div>
				<div className="resources-cards">
					<div className="card">
						<img src={Picture1} alt="" />
						<span>GTM Strategy</span>
						<button>Buy Now</button>
					</div>
					<div className="card">
						<img src={Picture3} alt="" />
						<span>Sales & Marketing Plans</span>
						<button>Buy Now</button>
					</div>
					<div className="card">
						<img src={Picture4} alt="" />
						<span>Pitch Deck</span>
						<button>Buy Now</button>
					</div>
					<div className="card">
						<img src={Picture2} alt="" />
						<span>Financial Modelling</span>
						<button>Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResourcesPopup;
