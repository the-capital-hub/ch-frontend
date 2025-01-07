import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAPI } from "../../../../../Service/user";
import {
	selectUserRecentExperience,
	selectUserRecentEducation,
	loginSuccess,
} from "../../../../../Store/features/user/userSlice";
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
	logo: "",
};

const emptyEducation = {
	schoolName: "",
	course: "",
	location: "",
	passoutYear: "",
	description: "",
	logo: "",
};

export default function PersonalInfoCard() {
	const [isEditingExperience, setIsEditingExperience] = useState(false);
	const [isEditingEducation, setIsEditingEducation] = useState(false);
	const recentEducation = useSelector(selectUserRecentEducation);
	const recentExperience = useSelector(selectUserRecentExperience);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		recentExperience,
		recentEducation,
	});

	const [formErrors, setFormErrors] = useState({});

	const handleExperienceChange = (index, field, value) => {
		const newExperience = [...formData.recentExperience];
		if (field === "experienceDuration") {
			newExperience[index] = {
				...newExperience[index],
				experienceDuration: {
					...newExperience[index].experienceDuration,
					...value,
				},
			};
		} else {
			newExperience[index] = { ...newExperience[index], [field]: value };
		}
		setFormData({ ...formData, recentExperience: newExperience });
	};

	const handleEducationChange = (index, field, value) => {
		const newEducation = [...formData.recentEducation];
		newEducation[index] = { ...newEducation[index], [field]: value };
		setFormData({ ...formData, recentEducation: newEducation });
	};

	const validateForm = (data, type) => {
		const errors = {};
		data.forEach((item, index) => {

			if (type === "experience") {
				if (!item.companyName)
					errors[`companyName-${index}`] = "Company name is required";
				if (!item.role) errors[`role-${index}`] = "Role is required";
				if (!item.location)
					errors[`location-${index}`] = "Location is required";
				if (!item.experienceDuration.startYear)
					errors[`startYear-${index}`] = "Start year is required";
				if (!item.experienceDuration.endYear)
					errors[`endYear-${index}`] = "End year is required";
			} else {
				if (!item.schoolName)
					errors[`schoolName-${index}`] = "School name is required";
				if (!item.course) errors[`course-${index}`] = "Course is required";
				if (!item.location)
					errors[`location-${index}`] = "Location is required";
				if (!item.passoutYear)
					errors[`passoutYear-${index}`] = "Passout year is required";
			}
		});
		return errors;
	};

	const handleSave = async () => {
		console.log("Saving:", formData);
		setIsEditingExperience(false);
		setIsEditingEducation(false);

		const experienceErrors = validateForm(
			formData.recentExperience,
			"experience"
		);
		const educationErrors = validateForm(formData.recentEducation, "education");

		if (
			Object.keys(experienceErrors).length > 0 ||
			Object.keys(educationErrors).length > 0
		) {
			setFormErrors({ ...experienceErrors, ...educationErrors });
			return;
		}

		try {
			const {
				data: { data },
			} = await updateUserAPI(formData);
			dispatch(loginSuccess(data));
			alert("Data Successfully Updated.");
		} catch (error) {
			console.error(error);
		}
	};

	const addExperience = () => {
		setFormData({
			...formData,
			recentExperience: [
				{ ...emptyExperience, isNew: true, logo: CompanyDummy },
				...formData.recentExperience,
			],
		});
		setIsEditingExperience(true);
	};

	const removeExperience = (index) => {
		const newExperience = [...formData.recentExperience];
		newExperience.splice(index, 1);
		setFormData({ ...formData, recentExperience: newExperience });
	};

	const addEducation = () => {
		setFormData({
			...formData,
			recentEducation: [
				{ ...emptyEducation, isNew: true, logo: CollageDummy },
				...formData.recentEducation,
			],
		});
		setIsEditingEducation(true);
	};

	const removeEducation = (index) => {
		const newEducation = [...formData.recentEducation];
		newEducation.splice(index, 1);
		setFormData({ ...formData, recentEducation: newEducation });
	};

	const handleImageUpload = (event, type, index) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (type === "experience") {
					handleExperienceChange(index, "logo", reader.result);
				} else {
					handleEducationChange(index, "logo", reader.result);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	function convertToDateFormat(dateString) {
		// Create a new Date object from the input string
		const date = new Date(dateString);

		// Extract the year, month, and day
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
		const day = String(date.getDate()).padStart(2, "0");

		// Format the date as "yyyy-MM-dd"
		return `${year}-${month}-${day}`;
	}

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
							<button className="PIC-btn-add" onClick={addExperience}>
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
					{isEditingExperience && (
						<button className="PIC-btn-save" onClick={handleSave}>
							<CiSaveUp2 />
							Save
						</button>
					)}
					{formData.recentExperience.map((exp, index) => (
						<div key={index} className="PIC-item">
							{isEditingExperience ? (
								<>
									<div className="PIC-form-group">
										<div className="PIC-form-group-top">
											<label htmlFor={`companyName-${index}`}>Company</label>
											<button
												className="PIC-btn-remove"
												onClick={() => removeExperience(index)}
											>
												Remove
											</button>
										</div>
										<input
											id={`companyName-${index}`}
											value={exp.companyName}
											onChange={(e) =>
												handleExperienceChange(
													index,
													"companyName",
													e.target.value
												)
											}
											required
										/>
										{formErrors[`companyName-${index}`] && (
											<span className="PIC-error">
												{formErrors[`companyName-${index}`]}
											</span>
										)}
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`location-${index}`}>Location</label>
										<input
											id={`location-${index}`}
											value={exp.location}
											onChange={(e) =>
												handleExperienceChange(
													index,
													"location",
													e.target.value
												)
											}
											required
										/>
										{formErrors[`location-${index}`] && (
											<span className="PIC-error">
												{formErrors[`location-${index}`]}
											</span>
										)}
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`role-${index}`}>Role</label>
										<input
											id={`role-${index}`}
											value={exp.role}
											onChange={(e) =>
												handleExperienceChange(index, "role", e.target.value)
											}
											required
										/>
										{formErrors[`role-${index}`] && (
											<span className="PIC-error">
												{formErrors[`role-${index}`]}
											</span>
										)}
									</div>
									<div className="PIC-form-group">
										<div className="PIC-date-group">
											<div>
												<label htmlFor={`exp-start-${index}`}>Start Year</label>
												<input
													id={`exp-start-${index}`}
													type="date"
													value={convertToDateFormat(
														exp.experienceDuration.startYear
													)}
													onChange={(e) =>
														handleExperienceChange(
															index,
															"experienceDuration",
															{
																startYear: e.target.value,
															}
														)
													}
													required
												/>
												{formErrors[`startYear-${index}`] && (
													<span className="PIC-error">
														{formErrors[`startYear-${index}`]}
													</span>
												)}
											</div>
											<div>
												<label htmlFor={`exp-end-${index}`}>End Year</label>
												<input
													id={`exp-end-${index}`}
													type="date"
													value={convertToDateFormat(
														exp.experienceDuration.endYear
													)}
													onChange={(e) =>
														handleExperienceChange(
															index,
															"experienceDuration",
															{
																endYear: e.target.value,
															}
														)
													}
													required
												/>
												{formErrors[`endYear-${index}`] && (
													<span className="PIC-error">
														{formErrors[`endYear-${index}`]}
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`exp-desc-${index}`}>Description</label>
										<textarea
											id={`exp-desc-${index}`}
											value={exp.description}
											onChange={(e) =>
												handleExperienceChange(
													index,
													"description",
													e.target.value
												)
											}
										/>
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`exp-logo-${index}`}>Logo</label>
										<span className="PIC-image-upload-sublabel">
											{exp.logo ? "Change Image" : "Upload Image"}
										</span>
										<div className="PIC-image-upload">
											<input
												type="file"
												id={`exp-logo-${index}`}
												accept="image/*"
												onChange={(e) =>
													handleImageUpload(e, "experience", index)
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
											- {new Date(exp.experienceDuration.endYear).getFullYear()}
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
					<button className="PIC-btn-save" onClick={handleSave}>
						<CiSaveUp2 />
						Save
					</button>
				)}

				{/* Education Section */}
				<div className="PIC-section">
					<h3>
						Education
						<div className="PIC-section-right">
							<button className="PIC-btn-add" onClick={addEducation}>
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
					{isEditingEducation && (
						<button className="PIC-btn-save" onClick={handleSave}>
							<CiSaveUp2 />
							Save
						</button>
					)}
					{formData.recentEducation.map((edu, index) => (
						<div key={index} className="PIC-item">
							{isEditingEducation ? (
								<>
									<div className="PIC-form-group">
										<div className="PIC-form-group-top">
											<label htmlFor={`schoolName-${index}`}>School</label>
											<button
												className="PIC-btn-remove"
												onClick={() => removeEducation(index)}
											>
												Remove
												{/* <FaTrash /> */}
											</button>
										</div>
										<input
											id={`schoolName-${index}`}
											value={edu.schoolName}
											onChange={(e) =>
												handleEducationChange(
													index,
													"schoolName",
													e.target.value
												)
											}
											required
										/>
										{formErrors[`schoolName-${index}`] && (
											<span className="PIC-error">
												{formErrors[`schoolName-${index}`]}
											</span>
										)}
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`location-${index}`}>Location</label>
										<input
											id={`location-${index}`}
											value={edu.location}
											onChange={(e) =>
												handleEducationChange(index, "location", e.target.value)
											}
											required
										/>
										{formErrors[`location-${index}`] && (
											<span className="PIC-error">
												{formErrors[`location-${index}`]}
											</span>
										)}
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`course-${index}`}>Course</label>
										<input
											id={`course-${index}`}
											value={edu.course}
											onChange={(e) =>
												handleEducationChange(index, "course", e.target.value)
											}
											required
										/>
										{formErrors[`course-${index}`] && (
											<span className="PIC-error">
												{formErrors[`course-${index}`]}
											</span>
										)}
									</div>
									<div className="PIC-form-group">
										<div className="PIC-date-group">
											<div>
												<label htmlFor={`passoutYear-${index}`}>
													Passout Year
												</label>
												<input
													id={`passoutYear-${index}`}
													type="date"
													value={convertToDateFormat(edu.passoutYear)}
													onChange={(e) =>
														handleEducationChange(
															index,
															"passoutYear",
															e.target.value
														)
													}
													required
												/>
												{formErrors[`passoutYear-${index}`] && (
													<span className="PIC-error">
														{formErrors[`passoutYear-${index}`]}
													</span>
												)}
											</div>
										</div>
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`edu-desc-${index}`}>Description</label>
										<textarea
											id={`edu-desc-${index}`}
											value={edu.description}
											onChange={(e) =>
												handleEducationChange(
													index,
													"description",
													e.target.value
												)
											}
										/>
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`edu-logo-${index}`}>Logo</label>
										<span className="PIC-image-upload-sublabel">
											{edu.logo ? "Change Image" : "Upload Image"}
										</span>
										<div className="PIC-image-upload">
											<input
												type="file"
												id={`edu-logo-${index}`}
												accept="image/*"
												onChange={(e) =>
													handleImageUpload(e, "education", index)
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
					<button className="PIC-btn-save" onClick={handleSave}>
						<CiSaveUp2 />
						Save
					</button>
				)}
			</div>
		</div>
	);
}
