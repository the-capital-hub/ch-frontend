import React, { useState, useEffect } from "react";
import {
	FaUserCircle,
	FaRegBookmark,
	FaChevronRight,
	FaPaperPlane,
} from "react-icons/fa";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import "./ThoughtsQA.scss";
import { useParams } from "react-router-dom";
import { environment } from "../../../environments/environment";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const dummyAnswers = [
	{
		name: "Rahul Kumar",
		content:
			"In the face of rapid advancements in financial technologies (fintech), such as blockchain, digital currencies, and decentralized finance (DeFi), how are traditional financial institutions responding to the threat of disruption while still leveraging these technologies to enhance their own services, and what are the potential risks and rewards of this transition for both consumers and investors With the growing demand for personalized medicine and the rise of biotechnologies such",
	},
	{
		name: "John Smith",
		content:
			"In the realm of artificial intelligence (AI) and machine learning (ML), how are organizations adapting to the increasing automation of processes and decision-making, and what are the key considerations for ensuring transparency and accountability in AI-driven systems",
	},
	{
		name: "John Smith",
		content:
			"In the realm of artificial intelligence (AI) and machine learning (ML), how are organizations adapting to the increasing automation of processes and decision-making, and what are the key considerations for ensuring transparency and accountability in AI-driven systems",
	},
	{
		name: "Suresh Kumar",
		content:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
	},
];

const QAComponent = () => {
	const [question, setQuestion] = useState({});
	const [inputText, setInputText] = useState("");
	const { id } = useParams();
	console.log("question", question);
	// Fetch question data
	// /getQuestionById/:questionId

	const fetchQuestion = async () => {
		try {
			const response = await fetch(`${baseUrl}/thoughts/getQuestionById/${id}`);
			const data = await response.json();
			setQuestion(data.data);
		} catch (error) {
			console.error("Error fetching question:", error);
		}
	};
	useEffect(() => {
		fetchQuestion();
	}, [id]);

	const handleSendClick = () => {
		console.log(inputText);

		// Send the inputText to the backend
		// /addAnswerToQuestion/:questionId
		try {
			fetch(`${baseUrl}/thoughts/addAnswerToQuestion/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ answer: inputText }),
			}).then((res) => {
				if (res.status === 200) {
					alert("Answer sent successfully");
					fetchQuestion();
				}
			});
		} catch (error) {
			console.error("Error sending answer:", error);
		}
		setInputText("");
	};

	return (
		<div className="qa-page">
			{/* Left Side - Questions */}
			<div className="questions-sidebar">
				<h2 className="sidebar-title">Questions</h2>
				<div className="question-preview">
					<div className="user-info">
						{/* <FaUserCircle className="user-icon" /> */}
						<img
							src={question?.user?.profilePicture}
							alt="Profile Pic"
							className="user-icon"
						/>
						<div className="user-details">
							<span className="username">
								{question?.user?.firstName + " " + question?.user?.lastName}
							</span>
							{/* <span className="follow-text">· Follow</span> */}
						</div>
						{/* <button className="more-options">···</button> */}
					</div>
					<p className="preview-text">{question?.question}</p>
				</div>
			</div>

			{/* Main Content */}
			<div className="main-content">
				{/* Answers Section */}
				<div className="answers-section">
					<h3 className="answers-title">Answers</h3>

					{/* Answer Input */}
					<div className="answer-input-container">
						<div className="input-header">
							{/* <FaUserCircle className="user-icon" /> */}
							<img
								src={question?.user?.profilePicture}
								alt="Profile Pic"
								className="user-icon"
							/>
							<input
								type="text"
								placeholder="Type your answer here"
								className="input-placeholder"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							/>
						</div>
						<div className="input-actions">
							<FaPaperPlane className="send-icon" onClick={handleSendClick} />
						</div>
					</div>

					{/* Answer Items */}
					{question?.answer
						? question?.answer.map((answer, index) => (
								<div key={index} className="answer-item">
									<div className="user-info">
										<img
											src={answer?.user?.profilePicture}
											alt="Profile Pic"
											className="user-icon"
										/>
										<div className="user-details">
											<span className="username">
												{answer.user.firstName + " " + answer.user.lastName}
											</span>
											{/* <span className="follow-text">· Follow</span> */}
										</div>
									</div>

									<p className="answer-text">{answer.answer}</p>

									<div className="interaction-bar">
										<div className="action-buttons">
											<button className="action-button">
												<BiLike />
												<span>Like</span>
											</button>
											<button className="action-button">
												<BiCommentDetail />
												<span>Comment</span>
											</button>
										</div>
										<FaRegBookmark className="bookmark-icon" />
									</div>
								</div>
						  ))
						: "No data found"}

					{/* View More Button */}
					{/* <div className="view-more">
						<button className="view-more-button">
							<span>View more answers</span>
							<FaChevronRight />
						</button>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default QAComponent;
