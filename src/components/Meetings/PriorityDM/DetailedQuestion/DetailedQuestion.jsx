import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Send } from "lucide-react";
import { getPriorityDMById, updatePriorityDM } from "../../../../Service/user";
import "./DetailedQuestion.scss";

export default function DetailedQuestionPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [questionData, setQuestionData] = useState(null);
	const [answer, setAnswer] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	console.log("questionData", questionData);
	const [isFounder, setIsFounder] = useState(false);

	useEffect(() => {
		// Check the current pathname to determine if it's a founder or user route
		const path = window.location.pathname;

		if (path.includes("/meeting/priority-dm/founder/question/")) {
			setIsFounder(true); // It's a founder route
		} else if (path.includes("/meeting/priority-dm/user/my-question/")) {
			setIsFounder(false); // It's a user route
		}
	}, [id]);

	useEffect(() => {
		setIsLoading(true);
		getPriorityDMById(id)
			.then((response) => {
				setIsLoading(false);
				if (response && response.data) {
					setQuestionData(response.data);
				} else {
					setError("Unexpected data format for my questions.");
				}
			})
			.catch((error) => {
				setIsLoading(false);
				setError("Error fetching my questions.");
				console.error("Error fetching my questions:", error);
			});
	}, [id]);

	const handleSubmitAnswer = async (e) => {
		e.preventDefault();

		try {
			const response = await updatePriorityDM(id, answer);

			if (response.status === 200) {
				alert("Answer sent successfully.");
				setAnswer(""); // Clear the answer input
			}
		} catch (error) {
			console.error("Error sending answer:", error);
			alert("There was an error sending your answer. Please try again.");
		}
	};

	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}

	if (error) {
		return <div className="error">Error: {error}</div>;
	}

	if (!questionData) {
		return <div className="not-found">Question not found</div>;
	}

	return (
		<div className="detailed-question-page">
			<header className="header">
				<div className="header-left">
					<button className="back-button" onClick={() => navigate(-1)}>
						<ArrowLeft />
					</button>
					<div className="user-info">
						<img
							src={
								questionData?.founderId?.profilePicture ||
								"/placeholder.svg?height=40&width=40"
							}
							alt={`${questionData.userName}'s avatar`}
							className="avatar"
						/>
						<span className="name">
							{questionData?.founderId?.firstName +
								" " +
								questionData?.founderId?.lastName}
						</span>
					</div>
				</div>
				<div className="rating">
					<Star className="star-icon" />
					<span>{questionData.userRating || 4.5}/5</span>
				</div>
			</header>

			<main className="main-content">
				<div className="content-wrapper">
					<div className="question-section">
						<h2>Question</h2>
						<p>{questionData.question}</p>
					</div>

					{!isFounder || questionData.isAnswered ? (
						questionData.answer ? (
							<div className="answer-section">
								<h2>Answer</h2>
								<p>{questionData.answer}</p>
							</div>
						) : (
							"Thank you for your question! When the founder answers your query, we will notify you via email."
						)
					) : (
						<div className="answer-input-section">
							<h2>Your Answer</h2>
							<form onSubmit={handleSubmitAnswer}>
								<textarea
									value={answer}
									onChange={(e) => setAnswer(e.target.value)}
									placeholder="Type your answer here..."
									rows={6}
								/>
								<button type="submit" className="submit-button">
									<Send className="send-icon" />
									Submit Answer
								</button>
							</form>
						</div>
					)}
				</div>
			</main>
		</div>
	);
}
