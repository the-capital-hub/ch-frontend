import React, { useState, useEffect } from "react";
import "./LatestResources.scss";
import ResourcesPopup from "../ResourcesPopup/ResourcesPopup";
import ResourcesPopupNew from "../../../../PopUp/ResourcesPopup/ResourcesPopupNew";
import { IoMdCloseCircle } from "react-icons/io";

export default function LatestResources() {
	const [showPopup, setShowPopup] = useState(false);

	const [isDismissed, setIsDismissed] = useState(() => {
		return localStorage.getItem("resourcesDismissed") === "false";
	});

	const [displayText, setDisplayText] = useState(""); // Current text being displayed
	const [isTyping, setIsTyping] = useState(true); // Indicates typing or deleting phase
	const [charIndex, setCharIndex] = useState(0); // Current character index
	const [wordIndex, setWordIndex] = useState(0); // Current word index in rotation

	const words = ["Resources", "Documents", "Articles", "Guides", "Updates"]; // Words to cycle through

	useEffect(() => {
		const currentWord = words[wordIndex]; // Get the current word

		if (isTyping) {
			// Typing Phase
			if (charIndex < currentWord.length) {
				const typingTimeout = setTimeout(() => {
					setDisplayText((prev) => prev + currentWord[charIndex]); // Add one character at a time
					setCharIndex((prev) => prev + 1);
				}, 100); // Typing speed
				return () => clearTimeout(typingTimeout); // Cleanup timeout
			} else {
				// Pause before deleting
				setTimeout(() => setIsTyping(false), 1000); // Pause duration
			}
		} else {
			// Deleting Phase
			if (charIndex > 0) {
				const deletingTimeout = setTimeout(() => {
					setDisplayText((prev) => prev.slice(0, -1)); // Remove one character at a time
					setCharIndex((prev) => prev - 1);
				}, 100); // Deleting speed
				return () => clearTimeout(deletingTimeout); // Cleanup timeout
			} else {
				// Move to the next word
				setIsTyping(true);
				setWordIndex((prev) => (prev + 1) % words.length); // Cycle to the next word
			}
		}
	}, [isTyping, charIndex, wordIndex, words]);

	const handleDismiss = () => {
		localStorage.setItem("resourcesDismissed", "true");
		setIsDismissed(true);
	};

	const handleView = () => {
		setShowPopup(true);
	};

	if (isDismissed) return null;

	return (
		<>
			<div className="latest_resources_wrapper text-white py-1">
				<div className="d-flex align-items-center justify-content-around justify-content-md-between px-md-4 flex-wrap gap-3">
					<p className="m-0 fs-5 fw-bold" onClick={handleView}>
						Latest <span className="typed-text">{displayText}</span>
					</p>

					<div className="d-flex align-items-center gap-3">
						<button
							onClick={() => setShowPopup(true)}
							className="btn orange_button d-flex align-items-center justify-content-center"
						>
							<span>Download Now!</span>
						</button>

						<div
							onClick={handleDismiss}
							aria-label="Dismiss Resources"
							style={{ cursor: "pointer" }} // Add this line
						>
							<IoMdCloseCircle size={20} />
						</div>
					</div>
				</div>
			</div>

			{showPopup && <ResourcesPopupNew onClose={() => setShowPopup(false)} />}
		</>
	);
}
