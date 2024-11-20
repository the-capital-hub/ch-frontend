import React from "react";
import { Link } from "react-router-dom";
import "./ShareYourThoughts.scss";

const ShareThoughts = () => {
	return (
		<div className="share_your_thoughts_container">
			<div className="d-flex align-items-center justify-content-around justify-content-md-between px-md-2 flex-wrap gap-3">
				<p className="m-0 fs-5">Share your thoughts here</p>

				<Link
					to={"/thoughts"}
					className="btn orange_button d-flex align-items-center justify-content-center"
				>
					<span>Start Now</span>
				</Link>
			</div>
		</div>
	);
};
export default ShareThoughts;
