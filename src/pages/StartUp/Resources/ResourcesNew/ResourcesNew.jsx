import React from "react";
import "./ResourcesNew.scss";
import Picture1 from "./images/Picture1.png";
import Picture2 from "./images/Picture2.png";
import Picture3 from "./images/Picture3.png";
import Picture4 from "./images/Picture4.png";

const ResourcesNew = () => {
	return (
		<div className="resources-new-container">
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
	);
};

export default ResourcesNew;
