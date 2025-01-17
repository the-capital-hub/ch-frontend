import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAPI } from "../../../../../Service/user";
import {
	selectUserRecentExperience,
	selectUserRecentEducation,
	loginSuccess,
} from "../../../../../Store/features/user/userSlice";
import { toast } from "react-hot-toast";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import { FiUpload } from "react-icons/fi";
import { FaPlus, FaTrash } from "react-icons/fa";
import CollageDummy from "../../../../../Images/dummy/Collage.png";
import CompanyDummy from "../../../../../Images/dummy/Company.jpg";
import "./PersonalInfoCard.scss";

const emptyExperience = {
	companyName: "",
	role: "",
	location: "",
	experienceDuration: { startYear: "", endYear: "" },
	description: "",
	logo: CompanyDummy,
};

const emptyEducation = {
	schoolName: "",
	course: "",
	location: "",
	passoutYear: "",
	description: "",
	logo: CollageDummy,
};

export default function PersonalInfoCard() {
	const [isEditingExperience, setIsEditingExperience] = useState(false);
	const [isEditingEducation, setIsEditingEducation] = useState(false);
	const [showNewExperienceForm, setShowNewExperienceForm] = useState(false);
	const [showNewEducationForm, setShowNewEducationForm] = useState(false);

	const recentEducation = useSelector(selectUserRecentEducation);
	const recentExperience = useSelector(selectUserRecentExperience);
	const dispatch = useDispatch();

	const [existingData, setExistingData] = useState({
		recentExperience,
		recentEducation,
	});

	const [newExperience, setNewExperience] = useState(emptyExperience);
	const [newEducation, setNewEducation] = useState(emptyEducation);
	const [formErrors, setFormErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleExistingExperienceChange = (index, field, value) => {
		const newExperiences = [...existingData.recentExperience];
		if (field === "experienceDuration") {
			newExperiences[index] = {
				...newExperiences[index],
				experienceDuration: {
					...newExperiences[index].experienceDuration,
					...value,
				},
			};
		} else {
			newExperiences[index] = { ...newExperiences[index], [field]: value };
		}
		setExistingData({ ...existingData, recentExperience: newExperiences });
	};

	const handleNewExperienceChange = (field, value) => {
		if (field === "experienceDuration") {
			setNewExperience({
				...newExperience,
				experienceDuration: {
					...newExperience.experienceDuration,
					...value,
				},
			});
		} else {
			setNewExperience({ ...newExperience, [field]: value });
		}
	};

	const handleExistingEducationChange = (index, field, value) => {
		const newEducations = [...existingData.recentEducation];
		newEducations[index] = { ...newEducations[index], [field]: value };
		setExistingData({ ...existingData, recentEducation: newEducations });
	};

	const handleNewEducationChange = (field, value) => {
		setNewEducation({ ...newEducation, [field]: value });
	};

	const validateForm = (data, type) => {
		const errors = {};
		if (type === "experience") {
			if (!data.companyName) errors.companyName = "Company name is required";
			if (!data.role) errors.role = "Role is required";
			if (!data.location) errors.location = "Location is required";
			if (!data.experienceDuration.startYear)
				errors.startYear = "Start year is required";
			if (!data.experienceDuration.endYear)
				errors.endYear = "End year is required";
		} else {
			if (!data.schoolName) errors.schoolName = "School name is required";
			if (!data.course) errors.course = "Course is required";
			if (!data.location) errors.location = "Location is required";
			if (!data.passoutYear) errors.passoutYear = "Passout year is required";
		}
		return errors;
	};

	const handleSaveNewExperience = async () => {
		const errors = validateForm(newExperience, "experience");
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			toast.error("Please fill in all required fields");
			return;
		}

		const updatedData = {
			...existingData,
			recentExperience: [newExperience, ...existingData.recentExperience],
		};

		setIsLoading(true);

		try {
			const {
				data: { data },
			} = await updateUserAPI(updatedData);
			dispatch(loginSuccess(data));
			setShowNewExperienceForm(false);
			setNewExperience(emptyExperience);
			setExistingData(updatedData);
			setFormErrors({});
			toast.success("Experience added successfully");
		} catch (error) {
			console.error(error);
			toast.error("Failed to add experience");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSaveNewEducation = async () => {
		const errors = validateForm(newEducation, "education");
		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			toast.error("Please fill in all required fields");
			return;
		}

		const updatedData = {
			...existingData,
			recentEducation: [newEducation, ...existingData.recentEducation],
		};

		setIsLoading(true);

		try {
			const {
				data: { data },
			} = await updateUserAPI(updatedData);
			dispatch(loginSuccess(data));
			setShowNewEducationForm(false);
			setNewEducation(emptyEducation);
			setExistingData(updatedData);
			setFormErrors({});
			toast.success("Education added successfully");
		} catch (error) {
			console.error(error);
			toast.error("Failed to add education");
		} finally {
			setIsLoading(false);
		}
	};

	const handleSaveExisting = async () => {
		setIsLoading(true);
		try {
			const {
				data: { data },
			} = await updateUserAPI(existingData);
			dispatch(loginSuccess(data));
			setIsEditingExperience(false);
			setIsEditingEducation(false);
			toast.success("Changes saved successfully");
		} catch (error) {
			console.error(error);
			toast.error("Failed to save changes");
		} finally {
			setIsLoading(false);
		}
	};

	const removeExistingExperience = (index) => {
		const newExperiences = [...existingData.recentExperience];
		newExperiences.splice(index, 1);
		setExistingData({ ...existingData, recentExperience: newExperiences });
	};

	const removeExistingEducation = (index) => {
		const newEducations = [...existingData.recentEducation];
		newEducations.splice(index, 1);
		setExistingData({ ...existingData, recentEducation: newEducations });
	};

	const handleImageUpload = (event, type, isNew = false, index = null) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (type === "experience") {
					if (isNew) {
						setNewExperience({ ...newExperience, logo: reader.result });
					} else {
						const newExperiences = [...existingData.recentExperience];
						newExperiences[index] = {
							...newExperiences[index],
							logo: reader.result,
						};
						setExistingData({
							...existingData,
							recentExperience: newExperiences,
						});
					}
				} else {
					if (isNew) {
						setNewEducation({ ...newEducation, logo: reader.result });
					} else {
						const newEducations = [...existingData.recentEducation];
						newEducations[index] = {
							...newEducations[index],
							logo: reader.result,
						};
						setExistingData({
							...existingData,
							recentEducation: newEducations,
						});
					}
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const convertToDateFormat = (dateString) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	return (
		<div className="PIC-card">
			<div className="PIC-header">
				<h2>Personal Information</h2>
			</div>

			<div className="PIC-content">
				{/* Experience Section */}
				<div className="PIC-section">
					<h3>
						Experience
						<div className="PIC-section-right">
							<button
								className="PIC-btn-add"
								onClick={() => setShowNewExperienceForm(!showNewExperienceForm)}
							>
								<FaPlus />
							</button>
							<button
								className="PIC-btn-edit"
								onClick={() => setIsEditingExperience(!isEditingExperience)}
							>
								<CiEdit />
							</button>
						</div>
					</h3>

					{/* New Experience Form */}
					{showNewExperienceForm && (
						<div className="PIC-item">
							<div className="PIC-form-group">
								<div className="PIC-form-group-top">
									<label>Company</label>
									<button
										className="PIC-btn-remove"
										onClick={() => {
											setShowNewExperienceForm(false);
											setNewExperience(emptyExperience);
											setFormErrors({});
										}}
									>
										Cancel
									</button>
								</div>
								<input
									value={newExperience.companyName}
									onChange={(e) =>
										handleNewExperienceChange("companyName", e.target.value)
									}
									required
								/>
								{formErrors.companyName && (
									<span className="PIC-error">{formErrors.companyName}</span>
								)}
							</div>

							<div className="PIC-form-group">
								<label>Location</label>
								<input
									value={newExperience.location}
									onChange={(e) =>
										handleNewExperienceChange("location", e.target.value)
									}
									required
								/>
								{formErrors.location && (
									<span className="PIC-error">{formErrors.location}</span>
								)}
							</div>

							<div className="PIC-form-group">
								<label>Role</label>
								<input
									value={newExperience.role}
									onChange={(e) =>
										handleNewExperienceChange("role", e.target.value)
									}
									required
								/>
								{formErrors.role && (
									<span className="PIC-error">{formErrors.role}</span>
								)}
							</div>

							<div className="PIC-form-group">
								<div className="PIC-date-group">
									<div>
										<label>Start Year</label>
										<input
											type="date"
											value={
												newExperience.experienceDuration.startYear
													? convertToDateFormat(
															newExperience.experienceDuration.startYear
													  )
													: ""
											}
											onChange={(e) =>
												handleNewExperienceChange("experienceDuration", {
													startYear: e.target.value,
												})
											}
											required
										/>
										{formErrors.startYear && (
											<span className="PIC-error">{formErrors.startYear}</span>
										)}
									</div>
									<div>
										<label>End Year</label>
										<input
											type="date"
											value={
												newExperience.experienceDuration.endYear
													? convertToDateFormat(
															newExperience.experienceDuration.endYear
													  )
													: ""
											}
											onChange={(e) =>
												handleNewExperienceChange("experienceDuration", {
													endYear: e.target.value,
												})
											}
											required
										/>
										{formErrors.endYear && (
											<span className="PIC-error">{formErrors.endYear}</span>
										)}
									</div>
								</div>
							</div>

							<div className="PIC-form-group">
								<label>Description</label>
								<textarea
									value={newExperience.description}
									onChange={(e) =>
										handleNewExperienceChange("description", e.target.value)
									}
								/>
							</div>

							<div className="PIC-form-group">
								<label>Logo</label>
								<span className="PIC-image-upload-sublabel">
									{newExperience.logo ? "Change Image" : "Upload Image"}
								</span>
								<div className="PIC-image-upload">
									<input
										type="file"
										accept="image/*"
										onChange={(e) => handleImageUpload(e, "experience", true)}
										className="PIC-image-upload-input"
									/>
									<label className="PIC-image-upload-label">
										{newExperience.logo ? (
											<img
												src={newExperience.logo}
												alt="Company Logo"
												className="PIC-preview-image"
											/>
										) : (
											<FiUpload />
										)}
										<span>
											{newExperience.logo ? "Change Image" : "Upload Image"}
										</span>
									</label>
								</div>
							</div>

							<button
								className="PIC-btn-save"
								onClick={handleSaveNewExperience}
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										Saving...
										<div className="PIC-btn-save-loader"></div>
									</>
								) : (
									<>
										<CiSaveUp2 />
										Save New Experience
									</>
								)}
							</button>
						</div>
					)}

					{/* Existing Experiences */}
					{existingData.recentExperience.map((exp, index) => (
						<div key={index} className="PIC-item">
							{isEditingExperience ? (
								<>
									<div className="PIC-form-group">
										<div className="PIC-form-group-top">
											<label>Company</label>
											<button
												className="PIC-btn-remove"
												onClick={() => removeExistingExperience(index)}
											>
												<FaTrash />
											</button>
										</div>
										<input
											value={exp.companyName}
											onChange={(e) =>
												handleExistingExperienceChange(
													index,
													"companyName",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<label>Location</label>
										<input
											value={exp.location}
											onChange={(e) =>
												handleExistingExperienceChange(
													index,
													"location",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<label>Role</label>
										<input
											value={exp.role}
											onChange={(e) =>
												handleExistingExperienceChange(
													index,
													"role",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<div className="PIC-date-group">
											<div>
												<label>Start Year</label>
												<input
													type="date"
													value={convertToDateFormat(
														exp.experienceDuration.startYear
													)}
													onChange={(e) =>
														handleExistingExperienceChange(
															index,
															"experienceDuration",
															{ startYear: e.target.value }
														)
													}
												/>
											</div>
											<div>
												<label>End Year</label>
												<input
													type="date"
													value={convertToDateFormat(
														exp.experienceDuration.endYear
													)}
													onChange={(e) =>
														handleExistingExperienceChange(
															index,
															"experienceDuration",
															{ endYear: e.target.value }
														)
													}
												/>
											</div>
										</div>
									</div>

									<div className="PIC-form-group">
										<label>Description</label>
										<textarea
											value={exp.description}
											onChange={(e) =>
												handleExistingExperienceChange(
													index,
													"description",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<label>Logo</label>
										<span className="PIC-image-upload-sublabel">
											{exp.logo ? "Change Image" : "Upload Image"}
										</span>
										<div className="PIC-image-upload">
											<input
												type="file"
												id={`exp-logo-${index}`}
												accept="image/*"
												onChange={(e) =>
													handleImageUpload(e, "experience", false, index)
												}
												className="PIC-image-upload-input"
											/>
											<label
												htmlFor={`exp-logo-${index}`}
												className="PIC-image-upload-label"
											>
												{exp.logo ? (
													<img
														src={exp.logo}
														alt="Company Logo"
														className="PIC-preview-image"
													/>
												) : (
													<FiUpload />
												)}
												<span>
													{exp.logo ? "Change Image" : "Upload Image"}
												</span>
											</label>
										</div>
									</div>
								</>
							) : (
								<div className="PIC-view">
									<div className="PIC-view-header">
										<div className="PIC-view-header-left">
											{exp.logo && (
												<img
													src={exp.logo}
													alt="Company Logo"
													className="PIC-view-logo"
												/>
											)}
											<div className="PIC-view-info">
												<p className="PIC-view-title">{exp.companyName}</p>
												<p className="PIC-view-location">{exp.location}</p>
											</div>
										</div>
										<p className="PIC-view-duration">
											{new Date(exp.experienceDuration.startYear).getFullYear()}{" "}
											-{new Date(exp.experienceDuration.endYear).getFullYear()}
										</p>
									</div>
									<p className="PIC-view-subtitle">{exp.role}</p>
									<p className="PIC-view-desc">{exp.description}</p>
								</div>
							)}
						</div>
					))}
				</div>

				{isEditingExperience && (
					<button
						className="PIC-btn-save"
						onClick={handleSaveExisting}
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								Saving...
								<div className="PIC-btn-save-loader"></div>
							</>
						) : (
							<>
								<CiSaveUp2 />
								Save Changes
							</>
						)}
					</button>
				)}

				{/* Education Section */}
				<div className="PIC-section">
					<h3>
						Education
						<div className="PIC-section-right">
							<button
								className="PIC-btn-add"
								onClick={() => setShowNewEducationForm(!showNewEducationForm)}
							>
								<FaPlus />
							</button>
							<button
								className="PIC-btn-edit"
								onClick={() => setIsEditingEducation(!isEditingEducation)}
							>
								<CiEdit />
							</button>
						</div>
					</h3>

					{/* New Education Form */}
					{showNewEducationForm && (
						<div className="PIC-item">
							<div className="PIC-form-group">
								<div className="PIC-form-group-top">
									<label>School</label>
									<button
										className="PIC-btn-remove"
										onClick={() => {
											setShowNewEducationForm(false);
											setNewEducation(emptyEducation);
											setFormErrors({});
										}}
									>
										Cancel
									</button>
								</div>
								<input
									value={newEducation.schoolName}
									onChange={(e) =>
										handleNewEducationChange("schoolName", e.target.value)
									}
									required
								/>
								{formErrors.schoolName && (
									<span className="PIC-error">{formErrors.schoolName}</span>
								)}
							</div>

							<div className="PIC-form-group">
								<label>Location</label>
								<input
									value={newEducation.location}
									onChange={(e) =>
										handleNewEducationChange("location", e.target.value)
									}
									required
								/>
								{formErrors.location && (
									<span className="PIC-error">{formErrors.location}</span>
								)}
							</div>

							<div className="PIC-form-group">
								<label>Course</label>
								<input
									value={newEducation.course}
									onChange={(e) =>
										handleNewEducationChange("course", e.target.value)
									}
									required
								/>
								{formErrors.course && (
									<span className="PIC-error">{formErrors.course}</span>
								)}
							</div>

							<div className="PIC-form-group">
								<div className="PIC-date-group">
									<div>
										<label>Passout Year</label>
										<input
											type="date"
											value={
												newEducation.passoutYear
													? convertToDateFormat(newEducation.passoutYear)
													: ""
											}
											onChange={(e) =>
												handleNewEducationChange("passoutYear", e.target.value)
											}
											required
										/>
										{formErrors.passoutYear && (
											<span className="PIC-error">
												{formErrors.passoutYear}
											</span>
										)}
									</div>
								</div>
							</div>

							<div className="PIC-form-group">
								<label>Description</label>
								<textarea
									value={newEducation.description}
									onChange={(e) =>
										handleNewEducationChange("description", e.target.value)
									}
								/>
							</div>

							<div className="PIC-form-group">
								<label>Logo</label>
								<span className="PIC-image-upload-sublabel">
									{newEducation.logo ? "Change Image" : "Upload Image"}
								</span>
								<div className="PIC-image-upload">
									<input
										type="file"
										accept="image/*"
										onChange={(e) => handleImageUpload(e, "education", true)}
										className="PIC-image-upload-input"
									/>
									<label className="PIC-image-upload-label">
										{newEducation.logo ? (
											<img
												src={newEducation.logo}
												alt="School Logo"
												className="PIC-preview-image"
											/>
										) : (
											<FiUpload />
										)}
										<span>
											{newEducation.logo ? "Change Image" : "Upload Image"}
										</span>
									</label>
								</div>
							</div>

							<button
								className="PIC-btn-save"
								onClick={handleSaveNewEducation}
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										Saving...
										<div className="PIC-btn-save-loader"></div>
									</>
								) : (
									<>
										<CiSaveUp2 />
										Save New Education
									</>
								)}
							</button>
						</div>
					)}

					{/* Existing Education */}
					{existingData.recentEducation.map((edu, index) => (
						<div key={index} className="PIC-item">
							{isEditingEducation ? (
								<>
									<div className="PIC-form-group">
										<div className="PIC-form-group-top">
											<label>School</label>
											<button
												className="PIC-btn-remove"
												onClick={() => removeExistingEducation(index)}
											>
												<FaTrash />
											</button>
										</div>
										<input
											value={edu.schoolName}
											onChange={(e) =>
												handleExistingEducationChange(
													index,
													"schoolName",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<label>Location</label>
										<input
											value={edu.location}
											onChange={(e) =>
												handleExistingEducationChange(
													index,
													"location",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<label>Course</label>
										<input
											value={edu.course}
											onChange={(e) =>
												handleExistingEducationChange(
													index,
													"course",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<div className="PIC-date-group">
											<div>
												<label>Passout Year</label>
												<input
													type="date"
													value={convertToDateFormat(edu.passoutYear)}
													onChange={(e) =>
														handleExistingEducationChange(
															index,
															"passoutYear",
															e.target.value
														)
													}
												/>
											</div>
										</div>
									</div>

									<div className="PIC-form-group">
										<label>Description</label>
										<textarea
											value={edu.description}
											onChange={(e) =>
												handleExistingEducationChange(
													index,
													"description",
													e.target.value
												)
											}
										/>
									</div>

									<div className="PIC-form-group">
										<label>Logo</label>
										<span className="PIC-image-upload-sublabel">
											{edu.logo ? "Change Image" : "Upload Image"}
										</span>
										<div className="PIC-image-upload">
											<input
												type="file"
												id={`edu-logo-${index}`}
												accept="image/*"
												onChange={(e) =>
													handleImageUpload(e, "education", false, index)
												}
												className="PIC-image-upload-input"
											/>
											<label
												htmlFor={`edu-logo-${index}`}
												className="PIC-image-upload-label"
											>
												{edu.logo ? (
													<img
														src={edu.logo}
														alt="School Logo"
														className="PIC-preview-image"
													/>
												) : (
													<FiUpload />
												)}
												<span>
													{edu.logo ? "Change Image" : "Upload Image"}
												</span>
											</label>
										</div>
									</div>
								</>
							) : (
								<div className="PIC-view">
									<div className="PIC-view-header">
										<div className="PIC-view-header-left">
											{edu.logo && (
												<img
													src={edu.logo}
													alt="School Logo"
													className="PIC-view-logo"
												/>
											)}
											<div className="PIC-view-info">
												<p className="PIC-view-title">{edu.schoolName}</p>
												<p className="PIC-view-location">{edu.location}</p>
											</div>
										</div>
										<p className="PIC-view-duration">
											{new Date(edu.passoutYear).getFullYear()}
										</p>
									</div>
									<p className="PIC-view-subtitle">{edu.course}</p>
									<p className="PIC-view-desc">{edu.description}</p>
								</div>
							)}
						</div>
					))}
				</div>

				{isEditingEducation && (
					<button
						className="PIC-btn-save"
						onClick={handleSaveExisting}
						disabled={isLoading}
					>
						{isLoading ? (
							<>
								Saving...
								<div className="PIC-btn-save-loader"></div>
							</>
						) : (
							<>
								<CiSaveUp2 />
								Save Changes
							</>
						)}
					</button>
				)}
			</div>
		</div>
	);
}
