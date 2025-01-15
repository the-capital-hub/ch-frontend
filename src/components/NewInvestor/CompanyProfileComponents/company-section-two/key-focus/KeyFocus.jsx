import React from "react";

export default function KeyFocus({ tags }) {
	return (
		<div
			className="key__focus d-flex flex-column gap-4"
			style={{ color: "var(--d-l-grey)" }}
		>
			<h6 className="div__heading">Key Focus</h6>
			<div className="tags__container d-flex flex-wrap gap-3">
				{tags.map((tag, index) => (
					<div
						key={index}
						className="iconCard__container d-flex align-items-center gap-1 pill fs-6 border rounded-2xl p-2"
					>
						<p className="text-black mb-0">{tag}</p>
					</div>
				))}
			</div>
		</div>
	);
}
