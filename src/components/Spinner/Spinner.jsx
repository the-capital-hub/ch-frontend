import React from "react";
import "./Spinner.scss";

const Spinner = ({ className = "" }) => (
	<div className={`spinner-overlay ${className}`.trim()}>
		<div className="spinner-wrapper">
			<div className="spinner-outer">
				<div className="spinner-inner"></div>
			</div>
		</div>
	</div>
);

export default Spinner;
