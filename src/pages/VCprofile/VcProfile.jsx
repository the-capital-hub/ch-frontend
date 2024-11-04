import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
	FaFacebookF,
	FaTwitter,
	FaLinkedinIn,
	FaInstagram,
} from "react-icons/fa";
import "./VcProfile.scss";

const VcProfile = () => {
	const { vcId } = useParams();
	const [vcData, setVcData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchVcData = async () => {
			try {
				const response = await fetch(
					"https://api.thecapitalhub.in/vc/getVcById",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ vcId }),
					}
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setVcData(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchVcData();
	}, [vcId]);

	const handleBackClick = () => {
		navigate(-1);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!vcData) return <div>No VC data found.</div>;

	return (
		<>
			<div className="vc-profile">
				{vcData.logo ? (
					<img
						src={vcData.logo}
						alt={`${vcData.name} logo`}
						className="vc-logo"
					/>
				) : (
					<img
						src="https://thecapitalhub.s3.ap-south-1.amazonaws.com/company-dummy.png"
						alt={`${vcData.name} logo`}
						className="vc-logo"
					/>
				)}
				<h1 className="vc-name">{vcData.name}</h1>
				<p className="vc-description">{vcData.description}</p>

				<div className="vc-social-links">
					{/* {vcData.facebook && (
                    <a href={vcData.facebook} target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                )}
                {vcData.twitter && (
                    <a href={vcData.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                )}
                {vcData.instagram && (
                    <a href={vcData.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                )} */}
					{vcData.linkedin && (
						<a
							href={vcData.linkedin}
							className="linkedIn"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaLinkedinIn />
						</a>
					)}
					<br />
				</div>
				<div className="vc-funding">
					<a
						href={"/funding"}
						className="fundingApply"
						target="_blank"
						rel="noopener noreferrer"
					>
						Apply for Funding
					</a>
				</div>

				<hr className="divider" />

				<div className="vc-contact-section">
					<h2 className="vc-contact-header">Best Way to Get in Touch</h2>
					<button className="contact-button">Contact</button>
					<hr className="divider" />
					<div className="vc-focus">
						<div className="vc-stage-focus">
							<h2 className="vc-contact-header">Stage Focus</h2>
							<div className="vc-bubbles">
								{vcData.stage_focus.map((stage, index) => (
									<div key={index} className="bubble purple">
										{stage}
									</div>
								))}
							</div>
						</div>
						<div className="vc-sector-focus">
							<h2 className="vc-contact-header">Sector Focus</h2>
							<div className="vc-bubbles">
								{vcData.sector_focus.map((sector, index) => (
									<div key={index} className="bubble purple">
										{sector}
									</div>
								))}
							</div>
						</div>
					</div>
					<hr className="divider" />
					<div className="vc-details">
						<div className="vc-detail-item">
							<h4>Ticket Size:</h4>
							<div className="vc-detail bubble grey">
								{vcData.ticket_size
									? `$${vcData.ticket_size
											.split("-")
											.map((size) => parseInt(size) / 1000 + "k")
											.join("-")}`
									: "N/A"}
							</div>
						</div>
						<div className="vc-detail-item">
							<h4>Total Portfolio:</h4>
							<div className="vc-detail bubble grey">
								{vcData.total_portfolio}
							</div>
						</div>
						<div className="vc-detail-item">
							<h4>Current Fund Corpus:</h4>
							<div className="vc-detail bubble grey">
								{vcData.current_fund_corpus}
							</div>
						</div>
						<div className="vc-detail-item">
							<h4>Total Fund Corpus:</h4>
							<div className="vc-detail bubble grey">
								{vcData.total_fund_corpus}
							</div>
						</div>
					</div>
				</div>
			</div>
			<button onClick={handleBackClick} className="back-button">
				Back to VCs
			</button>
		</>
	);
};

export default VcProfile;
