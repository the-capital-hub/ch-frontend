import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import "./CreateQuestion.scss";
import { environment } from "../../../environments/environment";
import industriesAndSkills from "../data/industriesAndSkills";

const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const QuestionCreator = () => {
	const theme = useSelector(selectTheme);
	const [formData, setFormData] = useState({
		question: "",
		industry: "",
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [showOptions, setShowOptions] = useState(false);
	const [customIndustry, setCustomIndustry] = useState("");
	const optionsContainerRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			// Check if the click is outside the options container
			if (
				optionsContainerRef.current &&
				!optionsContainerRef.current.contains(event.target)
			) {
				setShowOptions(false);
			}
		};

		// Add event listener when options are shown
		if (showOptions) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Cleanup the event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showOptions]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleUpload = async () => {
		const { question, industry } = formData;

		if (!question || !industry) {
			alert("Please fill in both the question and select an industry.");
			return;
		}
		try {
			const response = await fetch(`${baseUrl}/thoughts/create-question`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				alert("Question created successfully");
			} else {
				const errorData = await response.json();
				console.error("Error uploading question:", errorData);
				alert(
					`Error uploading question: ${errorData.message || "Unknown error"}`
				);
			}
		} catch (error) {
			console.error("Network error:", error);
			alert(
				"An error occurred while uploading the question. Please try again."
			);
		}

		setFormData({
			question: "",
			industry: "",
		});
		setCustomIndustry("");
		setSearchTerm("");
		setShowOptions(false);
	};

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		setShowOptions(true);
	};

	const handleOptionClick = (industry) => {
		setFormData((prevData) => ({
			...prevData,
			industry: industry,
		}));
		setSearchTerm(industry);
		setShowOptions(false);
	};

	const handleCustomIndustryChange = (e) => {
		setCustomIndustry(e.target.value);
	};

	const handleAddCustomIndustry = () => {
		if (customIndustry) {
			setFormData((prevData) => ({
				...prevData,
				industry: customIndustry,
			}));
			setSearchTerm(customIndustry);
			setCustomIndustry("");
			setShowOptions(false);
		} else {
			alert("Please enter a custom industry.");
		}
	};

	const filteredIndustries = industriesAndSkills.filter((industry) =>
		industry.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div
			className={`question-creator-container ${
				theme === "dark" ? " dark-theme" : ""
			}`}
			data-bs-theme={theme}
		>
			<div className="question-creator">
				<div className="create-question">
					<h1>Create Question</h1>
					<div className="input-group">
						<label htmlFor="question">Question</label>
						<input
							type="text"
							id="question"
							name="question"
							value={formData.question}
							onChange={handleChange}
							placeholder="Type your question here..."
						/>
					</div>
					<div className="input-group">
						<label htmlFor="industry">Select Industry / Skill</label>
						<input
							type="text"
							id="industry"
							name="industry"
							value={searchTerm}
							onChange={handleSearchChange}
							placeholder="Search or add a custom industry..."
							onFocus={() => setShowOptions(true)}
						/>
						{showOptions && (
							<div className="options-container" ref={optionsContainerRef}>
								{filteredIndustries.length > 0 ? (
									filteredIndustries.map((industry) => (
										<div
											key={industry}
											className="option-item"
											onClick={() => handleOptionClick(industry)}
										>
											{industry}
										</div>
									))
								) : (
									<div className="no-options">No options found</div>
								)}
								<div className="custom-industry">
									<input
										type="text"
										value={customIndustry}
										onChange={handleCustomIndustryChange}
										placeholder="Add custom industry"
									/>
									<button onClick={handleAddCustomIndustry}>Add</button>
								</div>
							</div>
						)}
					</div>
					<button className="upload-button" onClick={handleUpload}>
						Upload Question
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuestionCreator;
