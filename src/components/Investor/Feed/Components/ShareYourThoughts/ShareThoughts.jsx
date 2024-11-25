import React from "react";
import { Link } from "react-router-dom";
import "./ShareYourThoughts.scss";
import { WiStars } from "react-icons/wi";

const ShareThoughts = () => {
	return (
		<div className="share_your_thoughts_container">
			<div className="d-flex align-items-center justify-content-around justify-content-md-between px-md-2 flex-wrap gap-3">
				<p className="m-0 fs-5" style={{ lineHeight: "1.5" }}>
					You're faced with conflicting data interpretations. How do you ensure
					timely and accurate results?
				</p>

				<Link
					to={"/thoughts"}
					className="btn orange_button d-flex align-items-center justify-content-center"
				>
					<span>Share your thoughts now</span>
				</Link>

				<WiStars />
			</div>
		</div>
	);
};
export default ShareThoughts;
