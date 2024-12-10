import React from "react";
import HustlersClubBackground from "../../../../../Images/HustlersClubBackground.png";
import HustlersClubFox from "../../../../../Images/HustlersClubFox.png";
import "./JoinHustlersClub.scss";

const JoinHustlersClub = () => {
	return (
		<div className="join-hustlers-club-container">
			{/* background image */}
			<img src={HustlersClubBackground} className="hustlers-club-background" alt="Hustlers Club Banner" />

			<div className="join-hustlers-club">
				<img src={HustlersClubFox} className="hustlers-club-fox" alt="Fox" />
				<span>Join Hustlers Club Now</span>
			</div>
		</div>
	);
};

export default JoinHustlersClub;
