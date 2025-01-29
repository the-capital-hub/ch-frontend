import React from "react";

export default function MaxWidthWrapper({
	children,
	containerClass = "container", // container/container-fluid class
}) {
	return (
		<div className={`${containerClass} mx-auto px-sm-5 px-lg-3`}>
			{children}
		</div>
	);
}
