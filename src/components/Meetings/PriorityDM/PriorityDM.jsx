import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import {
	getPriorityDMForUser,
	getPriorityDMForFounder,
} from "../../../Service/user";

import "./PriorityDM.scss";

const Spinner = ({ isInvestor }) => (
	<div className="loader-container">
		<div className={`${isInvestor ? "investor-loader" : "loader"}`}>
			<div className="loader-inner"></div>
		</div>
	</div>
);

const QuestionCard = ({ question, isFounder = false }) => {
	const navigate = useNavigate();
	const truncatedQuestion =
		question?.question.length > 100
			? question.question.substring(0, 100) + "....."
			: question.question;

	const handleCardClick = (id) => {
		if (isFounder) {
			navigate(`/meeting/priority-dm/user/my-question/${id}`);
		} else {
			navigate(`/meeting/priority-dm/founder/question/${id}`);
		}
	};

	return (
		<div
			className="question-card"
			onClick={() => handleCardClick(question?._id)}
		>
			<div className="founder-details">
				<div className="founder-image">
					<img
						src={
							isFounder
								? question?.founderId?.profilePicture
								: question?.userId?.profilePicture
						}
						alt="Founder"
					/>
				</div>
				<div className="founder-name">
					{isFounder
						? question?.founderId?.firstName +
						  " " +
						  question?.founderId?.lastName
						: question?.userId?.firstName + " " + question?.userId?.lastName}
				</div>
				<div className="founder-rating">
					{question?.founderId?.rating ? question?.founderId?.rating : 4.5}/5
				</div>
			</div>

			<div className="question-details">
				<h3>{truncatedQuestion}</h3>
				<p className="isanswered-text">
					{question?.isAnswered
						? "The founder has answered your question. Please check your email or click on this card to view the response."
						: "Thank you for your question! When the founder answers your query, we will notify you via email."}
				</p>
			</div>
			<span className="answered-status-text">
				{question?.isAnswered ? "✨ Answered" : "Unanswered"}
			</span>
		</div>
	);
};

const PriorityDM = () => {
	const theme = useSelector(selectTheme);
	const [activeTab, setActiveTab] = useState("my-questions");
	const [isInvestor, setIsInvestor] = useState(false);

	const [myQuestions, setMyQuestions] = useState([]);
	const [unAnsweredQuestions, setUnAnsweredQuestions] = useState([]);
	const [loadingMyQuestions, setLoadingMyQuestions] = useState(false);
	const [loadingUnansweredQuestions, setLoadingUnansweredQuestions] =
		useState(false);
	const [error, setError] = useState(null);

	const fetchMyQuestions = () => {
		setLoadingMyQuestions(true);
		getPriorityDMForUser()
			.then((response) => {
				setLoadingMyQuestions(false);
				if (response && response.data) {
					setMyQuestions(response.data);
				} else {
					setError("Unexpected data format for my questions.");
				}
			})
			.catch((error) => {
				setLoadingMyQuestions(false);
				setError("Error fetching my questions.");
				console.error("Error fetching my questions:", error);
			});
	};

	const fetchUnAnsweredQuestions = () => {
		setLoadingUnansweredQuestions(true);
		getPriorityDMForFounder()
			.then((response) => {
				setLoadingUnansweredQuestions(false);
				if (response && response.data) {
					setUnAnsweredQuestions(response.data);
				} else {
					setError("Unexpected data format for unanswered questions.");
				}
			})
			.catch((error) => {
				setLoadingUnansweredQuestions(false);
				setError("Error fetching unanswered questions.");
				console.error("Error fetching unanswered questions:", error);
			});
	};

	useEffect(() => {
		fetchMyQuestions();
		fetchUnAnsweredQuestions();
	}, []);

	if (loadingMyQuestions || loadingUnansweredQuestions) {
		return <Spinner isInvestor={isInvestor} />;
	}

	if (error) {
		return <div className="error-message">{error}</div>;
	}

	const renderQuestions = () => {
		if (activeTab === "my-questions") {
			return myQuestions.map((question) => (
				<QuestionCard
					key={question?._id}
					question={question}
					isFounder={true}
				/>
			));
		} else if (activeTab === "unanswered") {
			return unAnsweredQuestions
				.filter((q) => !q.isAnswered)
				.map((question) => (
					<QuestionCard key={question?._id} question={question} />
				));
		} else if (activeTab === "answered") {
			return unAnsweredQuestions
				.filter((q) => q.isAnswered)
				.map((question) => (
					<QuestionCard key={question?._id} question={question} />
				));
		}
	};

	return (
		<div
			className={`meetings-container ${theme === "dark" ? "dark-theme" : ""} ${
				isInvestor ? "investor-theme" : ""
			}`}
		>
			<div className="meetings-wrapper">
				<div className="meetings-header">
					<h1>Priority DM</h1>
					<div className="tabs">
						<button
							className={`tab ${activeTab === "my-questions" ? "active" : ""}`}
							onClick={() => setActiveTab("my-questions")}
						>
							My Questions
						</button>
						<button
							className={`tab ${activeTab === "unanswered" ? "active" : ""}`}
							onClick={() => setActiveTab("unanswered")}
						>
							Unanswered
						</button>
						<button
							className={`tab ${activeTab === "answered" ? "active" : ""}`}
							onClick={() => setActiveTab("answered")}
						>
							Answered
						</button>
					</div>
				</div>
				<div className="meetings-list">{renderQuestions()}</div>
			</div>
		</div>
	);
};

export default PriorityDM;
