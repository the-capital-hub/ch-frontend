import React, { useState, useEffect } from "react";
import TweeterIcon from "../../../../Images/investorIcon/Tweeter.svg";
import Mail from "../../../../Images/mail.png";
import IntagramIcon from "../../../../Images/investorIcon/Instagram.svg";
import LinkedinIcon from "../../../../Images/investorIcon/Linkedin.svg";
import WebIcon from "../../../../Images/investorIcon/WebIcon.svg";
import LogoX from "../../../../Images/investorIcon/LogoX.png";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import "./companyDetails.scss";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import {
	getInvestorById,
	getStartupByFounderId,
	postStartUpData,
} from "../../../../Service/user";
import {
	Location,
	Calendar,
	CircleArrow,
} from "../../../../Images/Investor/CompanyProfile";
import { HiOutlineMail } from "react-icons/hi";
import { GiProgression } from "react-icons/gi";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";

const CompanyProfileDetailsCard = ({
	userDetails,
	page,
	className,
	isOnelink = false,
	theme,
	email,
}) => {
	const colorTheme = useSelector(selectTheme);
	const [isDescriptionEditable, setIsDescriptionEditable] = useState(false);
	const [descriptionContent, setDescriptionContent] = useState("");
	const [onePager, setOnePager] = useState({});
	const [socialLinks, setSocialLinks] = useState({
		website: "",
		linkedin: "",
		twitter: "",
		instagram: "",
	});
	const [locationData, setLocationData] = useState("");

	useEffect(() => {
		if (theme === "investor") {
			getInvestorById(userDetails?.investor)
				.then(({ data }) => {
					setOnePager(data);
					setDescriptionContent(data.description || "");
					setSocialLinks(data.socialLinks || {});
					setLocationData(data.location || "");
				})
				.catch((error) => {
					setOnePager({});
					setDescriptionContent("");
					setSocialLinks({});
					setLocationData("");
				});
		} else {
			getStartupByFounderId(userDetails?._id)
				.then(({ data }) => {
					setOnePager(data);
					setDescriptionContent(data.description || "");
					setSocialLinks(data.socialLinks || {});
					setLocationData(data.location || "");
				})
				.catch((error) => {
					setOnePager({});
					setDescriptionContent("");
					setSocialLinks({});
					setLocationData("");
				});
		}
	}, [userDetails, theme]);

	const submitDescriptionHandler = async () => {
		const updatedData = {
			founderId: userDetails._id,
			description: descriptionContent,
			socialLinks,
			location: locationData,
		};
		try {
			await postStartUpData(updatedData);
			setIsDescriptionEditable(!isDescriptionEditable);
		} catch (error) {
			console.error("Error updating description:", error);
		}
	};

	return (
		<div className={`${className} company_details_container`}>
			<div
				className={`px-2 px-md-4 py-4 company_details box ${
					isOnelink ? "border" : ""
				} ${theme === "investor" ? "border" : ""} rounded-2`}
			>
				<h4
					className="typography"
					style={{
						marginBottom: "0.5rem",
						color: colorTheme === "dark" ? "#fff" : "#000",
					}}
				>
					Company Details
				</h4>
				<div className="image_name_section d-flex flex-column flex-md-row align-items-start align-items-md-center px-2 px-md-0">
					<span className="company_details_logo_container d-none d-md-block rounded">
						<img src={onePager.logo || LogoX} alt="profileimage" />
					</span>
					<div className="d-flex justify-content-between w-100 d-md-none d-flex">
						<span className="company_details_logo_container d-md-none d-flex">
							<img
								src={
									onePager.logo ||
									userDetails?.startUp?.logo ||
									userDetails?.investor?.logo ||
									LogoX
								}
								alt="profileimage d-md-none d-flex"
							/>
						</span>
						{page === "edit" && (
							<span className="align-self-start ms-auto d-md-none d-block pt-2">
								<div className="d-flex align-items-center gap-2 flex-wrap">
									<button
										className="edit-btn btn"
										onClick={() =>
											setIsDescriptionEditable(!isDescriptionEditable)
										}
									>
										{isDescriptionEditable ? "Cancel" : "Edit"}
										<CiEdit />
									</button>
									{isDescriptionEditable && (
										<button
											className="edit-btn btn ms-2"
											onClick={() => submitDescriptionHandler()}
										>
											Save <CiSaveUp2 />
										</button>
									)}
								</div>
							</span>
						)}
					</div>
					<div className="left_profile_text flex_content">
						<h3
							className="typography ms-0"
							style={{ fontSize: "18px", margin: "0.5rem" }}
						>
							{onePager.companyName ||
								onePager.company ||
								userDetails?.startUp?.company ||
								userDetails?.investor?.companyName ||
								"No company found"}
						</h3>
						<div className="company__header d-flex flex-column flex-lg-row gap-2 ">
							<div
								className="icon__details d-flex flex-column flex-md-row gap-2 align-items-start"
								style={{ flexWrap: "wrap" }}
							>
								{onePager.location && (
									<div style={{ display: "flex", alignItems: "center" }}>
										<img
											src={Location}
											style={{ width: "14px", height: "14px" }}
											alt="Location"
										/>
										<p
											className="typography"
											style={{
												fontSize: "12px",
												margin: "0 0 0 0.5rem",
												color: colorTheme === "dark" ? "#fff" : "#000",
											}}
										>
											{onePager.location}
										</p>
									</div>
								)}
								{onePager.startedAtDate && (
									<div style={{ display: "flex", alignItems: "center" }}>
										<img
											src={Calendar}
											style={{ width: "14px", height: "14px" }}
											alt="Calendar"
										/>
										<p
											className="typography"
											style={{
												fontSize: "12px",
												margin: "0 0 0 0.5rem",
												color: colorTheme === "dark" ? "#fff" : "#000",
											}}
										>
											{`Founded in, ${onePager.startedAtDate.split("-")[0]}`}
										</p>
									</div>
								)}
								{onePager.lastFunding && (
									<div style={{ display: "flex", alignItems: "center" }}>
										<img
											src={CircleArrow}
											style={{ width: "14px", height: "14px" }}
											alt="Circle Arrow"
										/>
										<p
											className="typography"
											style={{
												fontSize: "12px",
												margin: "0 0 0 0.5rem",
												color: colorTheme === "dark" ? "#fff" : "#000",
											}}
										>
											{`Last funding in ${new Date(
												onePager.lastFunding
											).toLocaleString("en-US", {
												month: "short",
												year: "numeric",
											})}`}
										</p>
									</div>
								)}
								{onePager.stage && (
									<div className="iconCard__container d-flex justify-content-center align-items-center gap-1">
										<GiProgression color="#898989" />
										<p
											className="icon__text typography"
											style={{
												fontSize: "12px",
												margin: "0 0 0 0.5rem",
												color: colorTheme === "dark" ? "#fff" : "#000",
											}}
										>
											{`Stage of funding: ${onePager.stage}`}
										</p>
									</div>
								)}
								{onePager.sector && (
									<div className="iconCard__container d-flex justify-content-start justify-content-md-center align-items-center gap-1">
										<HiOutlineBuildingOffice2 color="#898989" />
										<p
											className="icon__text typography"
											style={{
												fontSize: "12px",
												margin: "0 0 0 0.5rem",
												color: colorTheme === "dark" ? "#fff" : "#000",
											}}
										>
											{`Sector: ${onePager.sector}`}
										</p>
									</div>
								)}
							</div>
						</div>
						<div className="small_typo social_icon mt-3 d-flex gap-2 align-items-center">
							{socialLinks.website && (
								<a
									href={socialLinks.website}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={WebIcon}
										alt="Website"
										style={{ width: "25px", height: "25px" }}
									/>
								</a>
							)}
							{socialLinks.linkedin && (
								<a
									href={socialLinks.linkedin}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={LinkedinIcon}
										alt="LinkedIn"
										style={{ width: "25px", height: "25px" }}
									/>
								</a>
							)}
							{socialLinks.twitter && (
								<a
									href={socialLinks.twitter}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={TweeterIcon}
										alt="Twitter"
										style={{ width: "25px", height: "25px" }}
									/>
								</a>
							)}
							{socialLinks.instagram && (
								<a
									href={socialLinks.instagram}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={IntagramIcon}
										alt="Instagram"
										style={{ width: "25px", height: "25px" }}
									/>
								</a>
							)}
							{(email || userDetails?.email) && (
								<a
									href={`mailto:${email || userDetails.email}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<img
										src={Mail}
										alt="Mail"
										style={{ width: "40px", height: "40px" }}
									/>
								</a>
							)}
						</div>
					</div>
					{page === "edit" && (
						<span className="align-self-start ms-auto d-none d-md-block">
							<div className="d-flex align-items-center gap-2">
								<button
									className="edit-btn btn"
									onClick={() =>
										setIsDescriptionEditable(!isDescriptionEditable)
									}
								>
									{isDescriptionEditable ? "Cancel" : "Edit"}
									<CiEdit />
								</button>
								{isDescriptionEditable && (
									<button
										className="edit-btn btn ms-2"
										onClick={() => submitDescriptionHandler()}
									>
										Save <CiSaveUp2 />
									</button>
								)}
							</div>
						</span>
					)}
				</div>
				<div className="company_details px-2 px-md-0 mt-4">
					{page === "edit" ? (
						<>
							<div className="para_text">
								{isDescriptionEditable ? (
									<>
										<div className="input-group my-2">
											<label htmlFor="bio" className="align-self-start">
												Description:
											</label>
											<textarea
												className="description flex-grow-1 rounded-2"
												value={descriptionContent}
												id="bio"
												name="bio"
												rows={6}
												onChange={(e) => setDescriptionContent(e.target.value)}
											/>
										</div>
										<div className="input-group mb-2">
											<label htmlFor="location">Location:</label>
											<input
												type="text"
												id="location"
												name="location"
												value={locationData}
												onChange={(e) => setLocationData(e.target.value)}
												className="rounded-2"
											/>
										</div>
										<div className="social-inputs">
											<div className="input-group">
												<label>Website:</label>
												<input
													type="text"
													value={socialLinks.website}
													onChange={(e) =>
														setSocialLinks({
															...socialLinks,
															website: e.target.value,
														})
													}
													className="rounded-2"
												/>
											</div>
											<div className="input-group">
												<label>LinkedIn:</label>
												<input
													type="text"
													value={socialLinks.linkedin}
													onChange={(e) =>
														setSocialLinks({
															...socialLinks,
															linkedin: e.target.value,
														})
													}
													className="rounded-2"
												/>
											</div>
											<div className="input-group">
												<label>Twitter:</label>
												<input
													type="text"
													value={socialLinks.twitter}
													onChange={(e) =>
														setSocialLinks({
															...socialLinks,
															twitter: e.target.value,
														})
													}
													className="rounded-2"
												/>
											</div>
											<div className="input-group">
												<label>Instagram:</label>
												<input
													type="text"
													value={socialLinks.instagram}
													onChange={(e) =>
														setSocialLinks({
															...socialLinks,
															instagram: e.target.value,
														})
													}
													className="rounded-2"
												/>
											</div>
										</div>
									</>
								) : (
									<p
										style={{
											color: colorTheme === "dark" ? "#fff" : "#000",
											fontSize: "12px",
											fontWeight: "100",
										}}
									>
										{descriptionContent}
									</p>
								)}
							</div>
						</>
					) : (
						<p
							style={{
								color: colorTheme === "dark" ? "#fff" : "#000",
								fontSize: "12px",
								fontWeight: "100",
							}}
						>
							{descriptionContent ||
								userDetails?.startUp?.description ||
								userDetails?.investor?.description ||
								"No description"}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default CompanyProfileDetailsCard;
