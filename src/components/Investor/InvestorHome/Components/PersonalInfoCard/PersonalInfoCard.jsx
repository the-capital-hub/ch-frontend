import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAPI } from "../../../../../Service/user";
import {
	selectUserRecentExperience,
	selectUserRecentEducation,
	loginSuccess,
} from "../../../../../Store/features/user/userSlice";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import "./PersonalInfoCard.scss";

const LOGO_OPTIONS = [
	"https://images.unsplash.com/photo-1576961453646-b4c376c7021b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXBhbnklMjBmcmVlfGVufDB8fDB8fHww",
	"https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcGFueSUyMGZyZWV8ZW58MHx8MHx8fDA%3D",
	"https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tcGFueSUyMGZyZWV8ZW58MHx8MHx8fDA%3D",
	"https://images.unsplash.com/photo-1554232456-8727aae0cfa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXBhbnklMjBmcmVlfGVufDB8fDB8fHww",
	"https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbXBhbnklMjBmcmVlfGVufDB8fDB8fHww",
];

const emptyExperience = {
	companyName: "",
	role: "",
	location: "",
	experienceDuration: { startYear: "", endYear: "" },
	description: "",
	logo: "",
};

const emptyEducation = {
	school: "",
	course: "",
	location: "",
	passoutYear: "",
	description: "",
	logo: "",
};

export default function PersonalInfoCard() {
	const [isEditing, setIsEditing] = useState(false);
	const recentEducation = useSelector(selectUserRecentEducation);
	const recentExperience = useSelector(selectUserRecentExperience);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		recentExperience,
		recentEducation,
	});

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

	const handleSave = async () => {
		console.log("Saving:", formData);
		setIsEditing(false);

		try {
			const {
				data: { data },
			} = await updateUserAPI(formData);
			dispatch(loginSuccess(data));
			alert("Education and Experience Updated.");
		} catch (error) {
			console.error(error);
		}
	};

	const addExperience = () => {
		setFormData({
			...formData,
			recentExperience: [...formData.recentExperience, { ...emptyExperience }],
		});
	};

	const removeExperience = (index) => {
		const newExperience = [...formData.recentExperience];
		newExperience.splice(index, 1);
		setFormData({ ...formData, recentExperience: newExperience });
	};

	const addEducation = () => {
		setFormData({
			...formData,
			recentEducation: [...formData.recentEducation, { ...emptyEducation }],
		});
	};

	const removeEducation = (index) => {
		const newEducation = [...formData.recentEducation];
		newEducation.splice(index, 1);
		setFormData({ ...formData, recentEducation: newEducation });
	};

	return (
		<div className="PIC-card">
			<div className="PIC-header">
				<h2>Personal Information</h2>
				<button
					className="PIC-btn-edit"
					onClick={() => setIsEditing(!isEditing)}
				>
					{/* <svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
						<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
					</svg> */}
					<CiEdit />
				</button>
			</div>

			<div className="PIC-content">
				{/* Experience Section */}
				<div className="PIC-section">
					<h3>
						Experience
						{isEditing && (
							<button className="PIC-btn-add" onClick={addExperience}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<line x1="12" y1="5" x2="12" y2="19"></line>
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
							</button>
						)}
					</h3>
					{formData.recentExperience.map((exp, index) => (
						<div key={index} className="PIC-item">
							{isEditing ? (
								<>
									<div className="PIC-form-group">
										<label htmlFor={`companyName-${index}`}>Company</label>
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
										/>
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
										/>
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`role-${index}`}>Role</label>
										<input
											id={`role-${index}`}
											value={exp.role}
											onChange={(e) =>
												handleExperienceChange(index, "role", e.target.value)
											}
										/>
									</div>
									<div className="PIC-form-group">
										<div className="PIC-date-group">
											<div>
												<label htmlFor={`exp-start-${index}`}>Start Year</label>
												<input
													id={`exp-start-${index}`}
													type="date"
													value={exp.experienceDuration.startYear}
													onChange={(e) =>
														handleExperienceChange(
															index,
															"experienceDuration",
															{
																startYear: e.target.value,
															}
														)
													}
												/>
											</div>
											<div>
												<label htmlFor={`exp-end-${index}`}>End Year</label>
												<input
													id={`exp-end-${index}`}
													type="date"
													value={exp.experienceDuration.endYear}
													onChange={(e) =>
														handleExperienceChange(
															index,
															"experienceDuration",
															{
																endYear: e.target.value,
															}
														)
													}
												/>
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
										<label>Logo</label>
										<div className="PIC-logo-grid">
											{LOGO_OPTIONS.map((logo, logoIndex) => (
												<button
													key={logoIndex}
													onClick={() =>
														handleExperienceChange(index, "logo", logo)
													}
													className={exp.logo === logo ? "selected" : ""}
												>
													<img src={logo} alt={`Logo ${logoIndex + 1}`} />
												</button>
											))}
										</div>
									</div>
									<button
										className="PIC-btn-remove"
										onClick={() => removeExperience(index)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<line x1="18" y1="6" x2="6" y2="18"></line>
											<line x1="6" y1="6" x2="18" y2="18"></line>
										</svg>
									</button>
								</>
							) : (
								<div className="PIC-view">
									<div className="PIC-view-header">
										<div className="PIC-view-header-left">
											{exp.logo && (
												<img
													src={exp.logo}
													alt="Company Logo"
													style={{
														width: "40px",
														height: "40px",
														marginBottom: "0.5rem",
														borderRadius: "50%",
														objectFit: "cover",
													}}
												/>
											)}
											<div className="d-flex flex-column ">
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

				{/* Education Section */}
				<div className="PIC-section">
					<h3>
						Education
						{isEditing && (
							<button className="PIC-btn-add" onClick={addEducation}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
								>
									<line x1="12" y1="5" x2="12" y2="19"></line>
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
							</button>
						)}
					</h3>
					{formData.recentEducation.map((edu, index) => (
						<div key={index} className="PIC-item">
							{isEditing ? (
								<>
									<div className="PIC-form-group">
										<label htmlFor={`schoolName-${index}`}>School</label>
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
										/>
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`location-${index}`}>Location</label>
										<input
											id={`location-${index}`}
											value={edu.location}
											onChange={(e) =>
												handleEducationChange(index, "location", e.target.value)
											}
										/>
									</div>
									<div className="PIC-form-group">
										<label htmlFor={`course-${index}`}>Course</label>
										<input
											id={`course-${index}`}
											value={edu.course}
											onChange={(e) =>
												handleEducationChange(index, "course", e.target.value)
											}
										/>
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
													value={edu.passoutYear}
													onChange={(e) =>
														handleEducationChange(
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
										<label>Logo</label>
										<div className="PIC-logo-grid">
											{LOGO_OPTIONS.map((logo, logoIndex) => (
												<button
													key={logoIndex}
													onClick={() =>
														handleEducationChange(index, "logo", logo)
													}
													className={edu.logo === logo ? "selected" : ""}
												>
													<img src={logo} alt={`Logo ${logoIndex + 1}`} />
												</button>
											))}
										</div>
									</div>
									<button
										className="PIC-btn-remove"
										onClick={() => removeEducation(index)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
										>
											<line x1="18" y1="6" x2="6" y2="18"></line>
											<line x1="6" y1="6" x2="18" y2="18"></line>
										</svg>
									</button>
								</>
							) : (
								<div className="PIC-view">
									<div className="PIC-view-header">
										<div className="PIC-view-header-left">
											{edu.logo && (
												<img
													src={edu.logo}
													alt="School Logo"
													style={{
														width: "40px",
														height: "40px",
														borderRadius: "50%",
														objectFit: "cover",
														marginBottom: "0.5rem",
													}}
												/>
											)}
											<div className="d-flex flex-column ">
												<p className="PIC-view-title">{edu.schoolName}</p>
												<p className="PIC-view-location">{edu.location}</p>
											</div>
										</div>
										<p className="PIC-view-duration">
											{new Date(edu.passoutYear).getFullYear()}
											{/* -{" "}
											{new Date(edu.year.endYear).getFullYear()} */}
										</p>
									</div>
									<p className="PIC-view-subtitle">{edu.course}</p>
									<p className="PIC-view-desc">{edu.description}</p>
								</div>
							)}
						</div>
					))}
				</div>

				{isEditing && (
					<button className="PIC-btn-save" onClick={handleSave}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
						>
							<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
							<polyline points="17 21 17 13 7 13 7 21" />
							<polyline points="7 3 7 8 15 8" />
						</svg>
						Save
					</button>
				)}
			</div>
		</div>
	);
}
