import React from "react";
import { Link } from "react-router-dom";
import "./ShareYourThoughts.scss";
import { WiStars } from "react-icons/wi";

const ShareThoughts = () => {
	return (
		<div className="share_your_thoughts_container">
			<div className="d-flex flex-column flex-md-row align-items-center justify-content-around justify-content-md-between px-md-2 gap-2">
				<p className="m-0">
					How are rapidly evolving regulatory environments, particularly around
					...
				</p>
				{/* <p className="m-0" style={{ lineHeight: "1.5" }}>
					You're faced with conflicting data interpretations. How do you ensure
					timely and accurate results?
				</p> */}

				<Link
					to={"/thoughts"}
					className="btn orange_button d-flex align-items-center justify-content-center"
				>
					<span>View Question</span>
					{/* <span>Share your thoughts now</span> */}
				</Link>

				{/* <WiStars /> */}
			</div>
		</div>
	);
};
export default ShareThoughts;
