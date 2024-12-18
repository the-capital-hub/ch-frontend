import React from "react";
import "./VcCard.scss";

const VcCard = ({ vc }) => {
	return (
		<div className="vc-card">
			<div className="header">
				{vc.logo ? (
					<img src={vc.logo} alt={`${vc.name} logo`} className="vc-logo" />
				) : (
					<img
						src="https://thecapitalhub.s3.ap-south-1.amazonaws.com/company-dummy.png"
						alt={`${vc.name} logo`}
						className="vc-logo"
					/>
				)}
				<div className="vc-info">
					<h3>{vc.name}</h3>
					<p className="info">
						{vc.location}, {vc.age} years
					</p>
				</div>
				<p className="ticket-size">
					<span>Ticket Size</span>{": "}
					{vc.ticket_size
						? `$${vc.ticket_size
								.split("-")
								.map((size) => parseInt(size) / 1000 + "k")
								.join("-")}`
						: "N/A"}
				</p>
				<button className="know-more">Know more</button>
			</div>
			<div className="stage-sector-info">
				<div className="stage-focus">
					<h5>Stage Focus</h5>
					{Array.isArray(vc.stage_focus) &&
						vc.stage_focus.map((stage, index) => (
							<div className="bubble" key={index}>
								{stage}
							</div>
						))}
				</div>
				<div className="sector-focus">
					<h5>Sector Focus</h5>
					{Array.isArray(vc.sector_focus) &&
						vc.sector_focus.map((sector, index) => (
							<div className="bubble" key={index}>
								{sector}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default VcCard;
