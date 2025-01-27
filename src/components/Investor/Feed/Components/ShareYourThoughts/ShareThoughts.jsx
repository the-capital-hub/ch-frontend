import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getThoughts } from "../../../../../Service/user";
import "./ShareYourThoughts.scss";

const ShareThoughts = ({ isInvestor = false }) => {
	const [maxAnswerQuestion, setMaxAnswerQuestion] = useState(null);

	// Function to fetch questions and set the one with the maximum answers
	const fetchAndSetMaxAnswerQuestion = async () => {
		try {
			const response = await getThoughts();
			if (response && response.data) {
				const questions = response.data;

				// Find the question with the maximum number of answers
				const questionWithMaxAnswers = questions.reduce((prev, current) => {
					return prev.answer.length > current.answer.length ? prev : current;
				});

				setMaxAnswerQuestion(questionWithMaxAnswers);
			}
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	useEffect(() => {
		fetchAndSetMaxAnswerQuestion();
	}, []);

	return (
		<div className="share_your_thoughts_container">
			<div className="d-flex flex-column flex-md-row align-items-center justify-content-around justify-content-md-between px-md-2 gap-2">
				{maxAnswerQuestion ? (
					<>
						<p className="m-0">{maxAnswerQuestion.question}</p>
						<Link
							to={`${isInvestor ? "/investor" : ""}/thoughts/question/${
								maxAnswerQuestion._id
							}`}
							className={`btn d-flex align-items-center justify-content-center ${
								isInvestor ? "green_button" : "orange_button"
							}`}
						>
							<span>View Question</span>
						</Link>
					</>
				) : (
					<p className="m-0">Loading questions...</p>
				)}
			</div>
		</div>
	);
};

export default ShareThoughts;
