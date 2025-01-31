import React, { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
import { BsCircleFill } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { MdNetworkCheck } from "react-icons/md";
import OneLink from "../../Images/Milestone/OneLink.png";
import Linkedin from "../../Images/Milestone/Linkedin.png";
import Network from "../../Images/Milestone/Network.png";
import Profile from "../../Images/Milestone/Profile.png";
import "./Milestone.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../Store/features/design/designSlice";
import { getPdfData, userPosts } from "../../Service/user";
import {
	userRequiredFields,
	oneLinkRequiredFields,
	companyRequiredFields,
	documentRequiredFields,
	calculateProfileCompletion,
} from "../../components/Investor/Milestones/UserMilestones";
import { useNavigate } from "react-router-dom";

const Milestone = ({ isInvestor = false }) => {
	const theme = useSelector(selectTheme);
	const [pdfDocumentsCount, setPdfDocumentsCount] = useState(0);
	const [postCount, setPostCount] = useState(0);
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const loggedInUserCompany = useSelector((state) => state.user.company);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const response = await userPosts();
				setPostCount(response.data.allPosts.length);
			} catch (error) {
				console.error("Failed to fetch user posts:", error);
			}
		};

		fetchUserPosts();
	}, [loggedInUser]);

	useEffect(() => {
		const fetchPdf = async () => {
			try {
				const pdfDataLegal = await getPdfData(
					loggedInUser?.oneLinkId,
					"legal and compliance"
				);
				const pdfDataKyc = await getPdfData(
					loggedInUser?.oneLinkId,
					"kycdetails"
				);
				const pdfDataBusiness = await getPdfData(
					loggedInUser?.oneLinkId,
					"business"
				);
				const pdfDataPitch = await getPdfData(
					loggedInUser?.oneLinkId,
					"pitchdeck"
				);
				const documentsLength =
					pdfDataBusiness.data.length +
					pdfDataKyc.data.length +
					pdfDataLegal.data.length +
					pdfDataPitch.data.length;
				setPdfDocumentsCount(documentsLength);
			} catch (error) {
				console.error("Failed to fetch PDF data:", error);
			}
		};

		if (loggedInUser?.oneLinkId) {
			fetchPdf();
		}
	}, [loggedInUser?.oneLinkId]);

	const milestones = [
		{
			icon: OneLink,
			name: "Onelink",
			progress: calculateProfileCompletion(
				loggedInUserCompany,
				oneLinkRequiredFields,
				postCount,
				pdfDocumentsCount
			),
			link: "/onelink",
		},
		{
			icon: Linkedin,
			name: "Company Profile",
			progress: calculateProfileCompletion(
				loggedInUserCompany,
				companyRequiredFields,
				postCount,
				pdfDocumentsCount
			).toFixed(0),
			link: "/company-profile",
		},
		{
			icon: Network,
			name: "Post",
			progress: calculateProfileCompletion(
				"posts",
				userRequiredFields,
				postCount,
				pdfDocumentsCount
			),
			link: "/home",
		},
		{
			icon: Profile,
			name: "Profile",
			progress: calculateProfileCompletion(
				loggedInUser,
				userRequiredFields,
				postCount,
				pdfDocumentsCount
			),
			link: "/profile",
		},
	];

	return (
		<div
			className={`milestone-container ${theme === "dark" ? " dark-theme" : ""}`}
			data-bs-theme={theme}
		>
			<div className="milestone-section">
				<h2>Milestone</h2>

				<div className="milestone-grid">
					{milestones.map((milestone, index) => (
						<div key={index} className="milestone-item">
							<div className="icon-container">
								<img
									src={milestone.icon}
									alt={milestone.name}
									className="icon-wrapper"
									onClick={() => navigate(milestone.link)}
								/>
								<div className="progress-bar">
									<div
										className={`${
											isInvestor ? "investor-progress-fill" : "progress-fill"
										}`}
										style={{ width: `${milestone.progress}%` }}
									/>
								</div>
							</div>

							<span className="milestone-name">{milestone.name}</span>
							<span className="milestone-progress">{milestone.progress}%</span>
						</div>
					))}
				</div>

				<button
					className={` ${
						isInvestor ? "investor-show-all-button" : "show-all-btn"
					}`}
					onClick={() =>
						navigate(`${isInvestor ? "/investor/profile" : "/profile"}`)
					}
				>
					Show all Milestone
				</button>
			</div>
		</div>
	);
};

export default Milestone;
