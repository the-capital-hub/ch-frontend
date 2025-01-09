import React, { useEffect, useState } from "react";
import DefaultAvatar from "../../../../Images/Chat/default-user-avatar.webp";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import IconCloudUpload from "../../SvgIcons/IconCloudUpload";
import { useSelector } from "react-redux";
import {
	selectCompanyFounderId,
	selectLoggedInUserId,
} from "../../../../Store/features/user/userSlice";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import EasyCrop from "react-easy-crop";
import { selectTheme } from "../../../../Store/features/design/designSlice";
import BatchImag from "../../../../Images/tick-mark.png";

const EXPERIENCE_OPTIONS = [
	"0",
	"1 year",
	"2 years",
	"3 years",
	"4 years",
	"5 years",
	"6 years",
	"7 years",
	"8 years",
	"9 years",
	"10 years",
	"11 years",
	"12 years",
	"13 years",
	"14 years",
	"15 years",
	"16 years",
	"17 years",
	"18 years",
	"19 years",
	"20 years",
];

export default function ProfessionalInfoDisplay({
	professionalData,
	theme,
	isEditing,
	setIsEditing,
	handleSubmit,
	selectedFile,
	handleTextChange,
	handleFileChange,
	canEdit = true,
	loading,
	previewImage,
	cropComplete,
	setCropComplete,
	setCroppedImage,
	croppedImage,
	detail,
	followers,
}) {
	const userTheme = useSelector(selectTheme);
	const companyFounderId = useSelector(selectCompanyFounderId);
	const loggedinUserId = useSelector(selectLoggedInUserId);
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	console.log("professionalData", professionalData);
	console.log("yearsOfExperience", professionalData.yearsOfExperience);

	const getCroppedImg = async (imageSrc, crop) => {
		const image = new Image();
		image.src = imageSrc;
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		canvas.width = crop.width;
		canvas.height = crop.height;
		ctx.drawImage(
			image,
			crop.x,
			crop.y,
			crop.width,
			crop.height,
			0,
			0,
			crop.width,
			crop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob(
				(blob) => {
					if (!blob) {
						reject(new Error("Failed to crop image"));
						return;
					}

					const reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onloadend = () => {
						resolve(reader.result);
					};
				},
				"image/jpeg",
				1
			);
		});
	};

	const onCropComplete = async (croppedArea, croppedAreaPixels) => {
		const croppedImg = await getCroppedImg(previewImage, croppedAreaPixels);
		setCroppedImage(croppedImg);
	};

	const getExperienceValue = () => {
		return (
			professionalData.yearsOfExperience || professionalData.experience || ""
		);
	};

	return (
		<>
			{/* header */}
			{!detail && (
				<header className="professional_info_display p-0 d-flex flex-column gap-3 flex-md-row align-items-center justify-content-between">
					{/* profile picture and name */}
					<div className="d-flex gap-4" style={{ width: "100%" }}>
						<img
							src={professionalData.profilePicture || DefaultAvatar}
							alt={professionalData.fullName}
							style={{ width: "120px", height: "120px", objectFit: "cover" }}
							className="rounded-circle"
						/>
						<div className="d-flex flex-column justify-content-center gap-1 ">
							<div
								className="d-flex gap-2 align-items-center justify-content-between"
								style={{ display: "flex" }}
							>
								<h5 className="m-0 fw-semibold">
									{professionalData.fullName}
									{loggedInUser.isSubscribed && (
										<img
											src={BatchImag}
											style={{
												width: "1.2rem",
												height: "1.2rem",
												objectFit: "contain",
												marginLeft: "4px",
												marginBottom: "4px",
											}}
											alt="Batch Icon"
										/>
									)}
								</h5>
								{canEdit && (
									<span className="edit_btn d-flex align-self-end align-md-self-start ">
										<span
										>
											<button
												onClick={() => setIsEditing(!isEditing)}
											>
												<CiEdit
													style={{
														color:
															theme !== "startup"
																? "rgb(211, 243, 107)"
																: "#ffb27d",
													}}
												/>
											</button>
										</span>
									</span>
								)}
							</div>

							<h6
								className="m-0 fw-semibold"
								style={{
									color: userTheme === "dark" ? "#fff" : "#000",
									marginTop: "-5px",
								}}
							>
								{professionalData.userName || ""}
							</h6>
							<p className="m-0">
								{professionalData.designation && (
									<>
										{professionalData.designation}
										{professionalData.company &&
											` of ${professionalData.company}`}
									</>
								)}
								{professionalData.location &&
									(professionalData.designation || professionalData.company) &&
									`, ${professionalData.location}`}
							</p>

							<p
								className="m-0"
								style={{
									color: theme !== "startup" ? "rgb(211, 243, 107)" : "#ffb27d",
								}}
							>
								{professionalData.followers.length} Connections
							</p>
						</div>
					</div>

					{/* Edit button */}

					{/* Edit button end */}
				</header>
			)}

			{/* Info text */}

			{detail && (
				<div className="professional_info_display p-0 gap-3 flex-md-row align-items-center justify-content-between">
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<h4 className="typography">Professional Information</h4>
						{canEdit && (
							<span className="edit_btn d-flex align-self-end align-md-self-start ">
								<span
								>
									<button
										onClick={() => setIsEditing(!isEditing)}
									>
										<CiEdit
											style={{
												color:
													theme !== "startup"
														? "rgb(211, 243, 107)"
														: "#ffb27d",
											}}
										/>
									</button>
								</span>
							</span>
						)}
					</div>

					{!isEditing && (
						<div className="info_text d-flex flex-column gap-3">
							<div className="text_field gap-3 gap-lg-3 align-items-center">
								<h6
									className="m-0"
									style={{
										fontWeight: 400,
										color: theme === "dark" ? "#9F9F9F" : "#5d5d5d",
									}}
								>
									Company
								</h6>
								<p className="m-0" style={{ paddingTop: "3px" }}>
									{professionalData.company}
								</p>
							</div>
							<div className="text_field gap-3 gap-lg-3 align-items-center">
								<h6
									className="m-0"
									style={{
										fontWeight: 400,
										color: theme === "dark" ? "#9F9F9F" : "#5d5d5d",
									}}
								>
									Designation
								</h6>
								<p className="m-0" style={{ paddingTop: "3px" }}>
									{professionalData.designation}
								</p>
							</div>
							<div className="text_field gap-3 gap-lg-3 align-items-center">
								<h6
									className="m-0"
									style={{
										fontWeight: 400,
										color: theme === "dark" ? "#9F9F9F" : "#5d5d5d",
									}}
								>
									Education
								</h6>
								<p className="m-0" style={{ paddingTop: "3px" }}>
									{professionalData.education}
								</p>
							</div>
							<div className="text_field gap-3 gap-lg-3 align-items-start">
								<h6
									className="m-0"
									style={{
										fontWeight: 400,
										color: theme === "dark" ? "#9F9F9F" : "#5d5d5d",
									}}
								>
									Industry
								</h6>
								<p className="m-0" style={{ paddingTop: "3px" }}>
									{professionalData.industry}
								</p>
							</div>
							<div className="text_field gap-3 gap-lg-3 align-items-start">
								<h6
									className="m-0"
									style={{
										fontWeight: 400,
										color: theme === "dark" ? "#9F9F9F" : "#5d5d5d",
									}}
								>
									{professionalData.yearsOfExperience
										? "Experience"
										: "Industry Experience"}
								</h6>
								<p className="m-0" style={{ paddingTop: "3px" }}>
									{getExperienceValue()}
								</p>
							</div>
						</div>
					)}
				</div>
			)}

			{/* Edit form */}
			{isEditing && (
				<form className="">
					{/* profilePicture*/}
					{!detail && (
						<fieldset className={` ${theme} `}>
							<legend className="px-2">Profile Picture</legend>
							<input
								type="file"
								accept="image/*"
								className="visually-hidden"
								name="profilePicture"
								id="profilePicture"
								//   value={professionalData.company}
								onChange={handleFileChange}
							/>
							<div className="professional_form_input d-flex align-items-center gap-4">
								<label htmlFor="profilePicture" style={{ cursor: "pointer" }}>
									<IconCloudUpload
										color={theme === "startup" ? "#fd5901" : "#b2cc5d"}
										height="1.75rem"
										width="1.75rem"
									/>
								</label>
								<p className="m-0 fs-6 fw-light">{selectedFile?.name}</p>
							</div>
						</fieldset>
					)}

					{previewImage && !cropComplete && (
						<div className="d-flex flex-column justify-content-center gap-2">
							<div className="image-cropper">
								<EasyCrop
									image={previewImage}
									crop={crop}
									zoom={zoom}
									onCropChange={setCrop}
									onZoomChange={setZoom}
									onCropComplete={onCropComplete}
								/>
							</div>
							<button
								className="btn btn-light btn-sm"
								onClick={() => setCropComplete(true)}
							>
								Crop
							</button>
						</div>
					)}
					{cropComplete && (
						<div className="cropped-preview w-100 d-flex justify-content-center">
							<img
								src={croppedImage}
								alt="cropped post"
								className=""
								style={{
									maxHeight: "30vh",
									width: "auto",
									objectFit: "contain",
								}}
							/>
						</div>
					)}

					{/* Company */}
					{detail && isEditing && (
						<fieldset className={` ${theme} `}>
							<legend className="px-2">Company</legend>
							<input
								type="text"
								className="professional_form_input"
								name="company"
								value={professionalData.company}
								onChange={handleTextChange}
							/>
						</fieldset>
					)}

					{/* Designation */}
					{detail && (
						<fieldset className={` ${theme} `}>
							<legend className="px-2">Designation</legend>
							<input
								type="text"
								className="professional_form_input"
								name="designation"
								value={professionalData.designation}
								onChange={handleTextChange}
							/>
						</fieldset>
					)}

					{/* Education */}
					{detail && (
						<fieldset className={` ${theme} `}>
							<legend className="px-2">Education</legend>
							<input
								type="text"
								className="professional_form_input"
								name="education"
								value={professionalData.education}
								onChange={handleTextChange}
							/>
							{/*<select
              name="education"
              id="userEducation"
              onChange={handleTextChange}
              value={professionalData.education}
              className="professional_form_input"
            >
              <option value="" hidden={Boolean(professionalData.education)}>
                Education
              </option>
              {educationOptions.map((option, index) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>*/}
						</fieldset>
					)}
					{detail && (
						<fieldset className={` ${theme} `}>
							<legend className="px-2">Industry</legend>
							<input
								type="text"
								className="professional_form_input"
								name="industry"
								value={professionalData.industry}
								onChange={handleTextChange}
							/>
							{/*<select
              name="education"
              id="userEducation"
              onChange={handleTextChange}
              value={professionalData.education}
              className="professional_form_input"
            >
              <option value="" hidden={Boolean(professionalData.education)}>
                Education
              </option>
              {educationOptions.map((option, index) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
            </select>*/}
						</fieldset>
					)}

					{/* Experience */}
					{detail && (
						<fieldset className={` ${theme} `}>
							<legend className="px-2">
								{/* {professionalData.yearsOfExperience
									? "Experience"
									: "Industry Experience"} */}
								Industry Experience
							</legend>
							<select
								name="experience"
								id="userExperience"
								onChange={handleTextChange}
								// value={getExperienceValue()}
								value={professionalData.experience}
								className="professional_form_input"
							>
								<option value="" hidden>
									Select Experience
								</option>
								{EXPERIENCE_OPTIONS.map((option) => (
									<option value={option} key={option}>
										{option}
									</option>
								))}
							</select>
						</fieldset>
					)}
					{isEditing && canEdit && (
						<span className="edit_btn d-flex align-self-end align-md-self-start ">
							<button
								className="btn ms-2 d-flex align-items-center gap-1"
								onClick={handleSubmit}
							>
								{loading ? (
									<SpinnerBS spinnerSizeClass="spinner-border-sm" />
								) : (
									<>
										Save <CiSaveUp2 />
									</>
								)}
							</button>
						</span>
					)}
				</form>
			)}
		</>
	);
}
