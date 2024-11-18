// SharePopup.jsx
import React, { useState } from "react";
import { FaTwitter, FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import "./SharePopup.scss";

const SharePopup = ({ url, isOpen, setIsOpen }) => {
	const [showCopyAlert, setShowCopyAlert] = useState(false);
	const [whatsappTitle, setWhatsappTitle] = useState("");

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(url);
			setShowCopyAlert(true);
			setTimeout(() => setShowCopyAlert(false), 2000);
		} catch (err) {
			console.error("Failed to copy link:", err);
		}
	};

	const shareToSocial = (platform) => {
		const shareText = encodeURIComponent(whatsappTitle);
		const encodedUrl = encodeURIComponent(url);

		const shareUrls = {
			twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`,
			facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
			linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
			whatsapp: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
		};

		window.open(shareUrls[platform], "_blank", "width=600,height=400");
	};

	return (
		<div className="share-popup">
			{isOpen && (
				<div className="popup-overlay" onClick={() => setIsOpen(false)}>
					<div className="popup-content" onClick={(e) => e.stopPropagation()}>
						<div className="popup-header">
							<h2>Share on Socials</h2>
							<button className="close-button" onClick={() => setIsOpen(false)}>
								×
							</button>
						</div>

						<div className="social-icons">
							<button
								className="social-button twitter"
								onClick={() => shareToSocial("twitter")}
							>
								<FaTwitter />
							</button>
							<button
								className="social-button facebook"
								onClick={() => shareToSocial("facebook")}
							>
								<FaFacebook />
							</button>
							<button
								className="social-button linkedin"
								onClick={() => shareToSocial("linkedin")}
							>
								<FaLinkedin />
							</button>
							<button
								className="social-button whatsapp"
								onClick={() => shareToSocial("whatsapp")}
								aria-label="Share on WhatsApp"
							>
								<FaWhatsapp />
							</button>
						</div>

						<div className="whatsapp-title">
							<label htmlFor="whatsapp-title">WhatsApp Message:</label>
							<input
								id="whatsapp-title"
								type="text"
								value={whatsappTitle}
								onChange={(e) => setWhatsappTitle(e.target.value)}
								placeholder="Enter Title for WhatsApp"
								className="whatsapp-title-input"
							/>
						</div>

						<div className="copy-link">
							<button className="copy-button" onClick={handleCopyLink}>
								<span className="url-text">{url}</span>
								<FiCopy />
							</button>
						</div>

						{showCopyAlert && (
							<div className="copy-alert">Link copied to clipboard!</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default SharePopup;
