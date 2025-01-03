import { useState } from "react";
import "./PersonalInfoCard.scss";

export default function PersonalInfoCard() {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		latestExperience: [
			{
				company: "Capital Hub",
				role: "Full Stack Developer Intern",
				duration: {
					startYear: "2023-01-01",
					endYear: "2024-01-01",
				},
				description: "Working on full stack development projects",
			},
			// {
			// 	company: "Google",
			// 	role: "Senior Product Manager",
			// 	duration: {
			// 		startYear: "2023-01-01",
			// 		endYear: "2024-01-01",
			// 	},
			// 	description: "Led machine learning product initiatives.",
			// },
		],
		latestEducation: [
			{
				school: "Example University",
				course: "B.Tech Mechanical Engineering",
				year: {
					startYear: "2019-01-01",
					endYear: "2023-01-01",
				},
				description: "Studied mechanical engineering with focus on design",
			},
			// {
			// 	school: "Stanford University",
			// 	course: "Master of Science in Computer Science",
			// 	year: {
			// 		startYear: "2019-01-01",
			// 		endYear: "2023-01-01",
			// 	},
			// 	description: "Studied mechanical engineering with focus on design",
			// },
			// {
			// 	school: "UC Berkeley",
			// 	course: "Bachelor of Science in Computer Engineering",
			// 	year: {
			// 		startYear: "2019-01-01",
			// 		endYear: "2023-01-01",
			// 	},
			// 	description: "Studied mechanical engineering with focus on design",
			// },
		],
	});

	const handleExperienceChange = (index, field, value) => {
		const newExperience = [...formData.latestExperience];
		if (field === "duration") {
			newExperience[index] = {
				...newExperience[index],
				duration: { ...newExperience[index].duration, ...value },
			};
		} else {
			newExperience[index] = { ...newExperience[index], [field]: value };
		}
		setFormData({ ...formData, latestExperience: newExperience });
	};

	const handleEducationChange = (index, field, value) => {
		const newEducation = [...formData.latestEducation];
		if (field === "year") {
			newEducation[index] = {
				...newEducation[index],
				year: { ...newEducation[index].year, ...value },
			};
		} else {
			newEducation[index] = { ...newEducation[index], [field]: value };
		}
		setFormData({ ...formData, latestEducation: newEducation });
	};

	const handleSave = () => {
		// TODO: Implement save to backend
		console.log("Saving:", formData);
		setIsEditing(false);
	};

	return (
		<div className="card">
			<div className="card__header">
				<h2>Personal Information</h2>
				<button
					className="edit-button"
					onClick={() => setIsEditing(!isEditing)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
						<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
					</svg>
				</button>
			</div>

			<div className="card__content">
				{formData.latestExperience.map((exp, index) => (
					<div key={index} className="card__section">
						<h3>Experience {index + 1}</h3>
						{isEditing ? (
							<>
								<div className="card__form-group">
									<label htmlFor={`company-${index}`}>Company</label>
									<input
										id={`company-${index}`}
										value={exp.company}
										onChange={(e) =>
											handleExperienceChange(index, "company", e.target.value)
										}
									/>
								</div>
								<div className="card__form-group">
									<label htmlFor={`role-${index}`}>Role</label>
									<input
										id={`role-${index}`}
										value={exp.role}
										onChange={(e) =>
											handleExperienceChange(index, "role", e.target.value)
										}
									/>
								</div>
								<div className="card__form-group">
									<div className="card__date-inputs">
										<div>
											<label htmlFor={`exp-start-${index}`}>Start Year</label>
											<input
												id={`exp-start-${index}`}
												type="date"
												value={exp.duration.startYear.split("T")[0]}
												onChange={(e) =>
													handleExperienceChange(index, "duration", {
														startYear: e.target.value,
													})
												}
											/>
										</div>
										<div>
											<label htmlFor={`exp-end-${index}`}>End Year</label>
											<input
												id={`exp-end-${index}`}
												type="date"
												value={exp.duration.endYear.split("T")[0]}
												onChange={(e) =>
													handleExperienceChange(index, "duration", {
														endYear: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
								<div className="card__form-group">
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
							</>
						) : (
							<div className="card__view-mode">
								<p className="company">{exp.company}</p>
								<p className="role">{exp.role}</p>
								<p className="duration">
									{new Date(exp.duration.startYear).getFullYear()} -{" "}
									{new Date(exp.duration.endYear).getFullYear()}
								</p>
								<p className="description">{exp.description}</p>
							</div>
						)}
					</div>
				))}

				{formData.latestEducation.map((edu, index) => (
					<div key={index} className="card__section">
						<h3>Education {index + 1}</h3>
						{isEditing ? (
							<>
								<div className="card__form-group">
									<label htmlFor={`school-${index}`}>School</label>
									<input
										id={`school-${index}`}
										value={edu.school}
										onChange={(e) =>
											handleEducationChange(index, "school", e.target.value)
										}
									/>
								</div>
								<div className="card__form-group">
									<label htmlFor={`course-${index}`}>Course</label>
									<input
										id={`course-${index}`}
										value={edu.course}
										onChange={(e) =>
											handleEducationChange(index, "course", e.target.value)
										}
									/>
								</div>
								<div className="card__form-group">
									<div className="card__date-inputs">
										<div>
											<label htmlFor={`edu-start-${index}`}>Start Year</label>
											<input
												id={`edu-start-${index}`}
												type="date"
												value={edu.year.startYear.split("T")[0]}
												onChange={(e) =>
													handleEducationChange(index, "year", {
														startYear: e.target.value,
													})
												}
											/>
										</div>
										<div>
											<label htmlFor={`edu-end-${index}`}>End Year</label>
											<input
												id={`edu-end-${index}`}
												type="date"
												value={edu.year.endYear.split("T")[0]}
												onChange={(e) =>
													handleEducationChange(index, "year", {
														endYear: e.target.value,
													})
												}
											/>
										</div>
									</div>
								</div>
								<div className="card__form-group">
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
							</>
						) : (
							<div className="card__view-mode">
								<p className="company">{edu.school}</p>
								<p className="role">{edu.course}</p>
								<p className="duration">
									{new Date(edu.year.startYear).getFullYear()} -{" "}
									{new Date(edu.year.endYear).getFullYear()}
								</p>
								<p className="description">{edu.description}</p>
							</div>
						)}
					</div>
				))}

				{isEditing && (
					<button className="save-button" onClick={handleSave}>
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
