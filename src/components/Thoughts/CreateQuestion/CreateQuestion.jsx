import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./CreateQuestion.scss";

const QuestionCreator = () => {
	const [activeTab, setActiveTab] = useState("question");
	const [question, setQuestion] = useState("");
	const [industry, setIndustry] = useState("");
	const [answers, setAnswers] = useState([""]);
	const [correctAnswer, setCorrectAnswer] = useState("");

	const handleAddAnswer = () => {
		if (answers.length < 4) {
			setAnswers([...answers, ""]);
		}
	};

	const handleRemoveAnswer = (index) => {
		const newAnswers = answers.filter((_, i) => i !== index);
		setAnswers(newAnswers);
		if (correctAnswer === `${index + 1}`) {
			setCorrectAnswer("");
		}
	};

	const handleAnswerChange = (index, value) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
	};

	return (
		<div className="question-creator-container">
			<div className="question-creator">
				<div className="tabs">
					<button
						className={activeTab === "question" ? "active" : ""}
						onClick={() => setActiveTab("question")}
					>
						Create Question
					</button>
					<button
						className={activeTab === "poll" ? "active" : ""}
						onClick={() => setActiveTab("poll")}
					>
						Create Poll
					</button>
				</div>

				{activeTab === "question" ? (
					<div className="create-question">
						<h1>Create Question</h1>
						<div className="input-group">
							<label htmlFor="question">Question</label>
							<input
								type="text"
								id="question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								placeholder="Type your question here..."
							/>
						</div>
						<div className="input-group">
							<label htmlFor="industry">Select Industry / Skill</label>
							<select
								id="industry"
								value={industry}
								onChange={(e) => setIndustry(e.target.value)}
							>
								<option value="">Select an option</option>
								<option value="tech">Technology</option>
								<option value="finance">Finance</option>
								<option value="healthcare">Healthcare</option>
							</select>
						</div>
						<button className="upload-button">Upload Question</button>
					</div>
				) : (
					<div className="create-poll">
						<h1>Create Poll</h1>
						<div className="input-group">
							<label htmlFor="poll-question">Question</label>
							<input
								type="text"
								id="poll-question"
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								placeholder="Type your question here..."
							/>
						</div>
						{answers.map((answer, index) => (
							<div key={index} className="input-group answer-input">
								<label htmlFor={`answer-${index + 1}`}>
									Answer {index + 1}
								</label>
								<input
									type="text"
									id={`answer-${index + 1}`}
									value={answer}
									onChange={(e) => handleAnswerChange(index, e.target.value)}
									placeholder={`Type answer ${index + 1} here...`}
								/>
								{index === answers.length - 1 && answers.length < 4 && (
									<button className="add-answer" onClick={handleAddAnswer}>
										<FaPlus />
									</button>
								)}
								{answers.length > 1 && (
									<button
										className="remove-answer"
										onClick={() => handleRemoveAnswer(index)}
									>
										<FaMinus />
									</button>
								)}
							</div>
						))}
						<div className="input-group">
							<label htmlFor="correct-answer">Select Correct Answer</label>
							<select
								id="correct-answer"
								value={correctAnswer}
								onChange={(e) => setCorrectAnswer(e.target.value)}
							>
								<option value="">Select correct answer</option>
								{answers.map((_, index) => (
									<option key={index} value={`${index + 1}`}>
										Answer {index + 1}
									</option>
								))}
							</select>
						</div>
						<div className="input-group">
							<label htmlFor="poll-industry">Select Industry / Skill</label>
							<select
								id="poll-industry"
								value={industry}
								onChange={(e) => setIndustry(e.target.value)}
							>
								<option value="">Select an option</option>
								<option value="tech">Technology</option>
								<option value="finance">Finance</option>
								<option value="healthcare">Healthcare</option>
							</select>
						</div>
						<button className="upload-button">Upload Poll</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default QuestionCreator;
