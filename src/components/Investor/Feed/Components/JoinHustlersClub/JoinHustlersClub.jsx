import React, { useState } from "react";
import HustlersClubBackground from "../../../../../Images/HustlersClubBackground.png";
import HustlersClubFox from "../../../../../Images/HustlersClubFox.png";
import ResourcesPopupNew from "../../../../PopUp/ResourcesPopup/ResourcesPopupNew";
import "./JoinHustlersClub.scss";

const JoinHustlersClub = () => {
	const [showPopup, setShowPopup] = useState(false);
	const handleView = () => {
		setShowPopup(true);
	};
	return (
		<>
			<div className="join-hustlers-club-container">
				{/* background image */}
				<img
					src={HustlersClubBackground}
					className="hustlers-club-background"
					alt="Hustlers Club Banner"
				/>

				<div className="join-hustlers-club" onClick={handleView}>
					<img src={HustlersClubFox} className="hustlers-club-fox" alt="Fox" />
					<span>Join Hustlers Club Now</span>
				</div>
			</div>
			{showPopup && <ResourcesPopupNew onClose={() => setShowPopup(false)} />}
		</>
	);
};

export default JoinHustlersClub;
