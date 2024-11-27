import React, { useState, useEffect } from "react";
import {
	FaRegBookmark,
	FaPaperPlane,
	FaUserCircle,
	FaChevronRight,
} from "react-icons/fa";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import "./ThoughtsQA.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { environment } from "../../../environments/environment";
import { useUpvoteHandler } from "../UtilityFunction/upvoteDownvote";
// import AddUserIconBlack from "../../../Images/investorIcon/Add-UserBlack.svg";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const QAComponent = () => {
	const theme = useSelector(selectTheme);
	const [question, setQuestion] = useState({});
	const [inputText, setInputText] = useState("");
	const [inputComment, setInputComment] = useState("");
	const [isCommentsOpen, setIsCommentsOpen] = useState({});
	const { id } = useParams(); // used as questionId
	const user = JSON.parse(localStorage.getItem("loggedInUser"));

	const {
		upvotedIds: upvotedAnswers,
		handleUpvote: handleAnswerUpvote,
		isUpvoted: isAnswerUpvoted,
	} = useUpvoteHandler(baseUrl, "answer");

	const {
		upvotedIds: upvotedComments,
		handleUpvote: handleCommentUpvote,
		isUpvoted: isCommentUpvoted,
	} = useUpvoteHandler(baseUrl, "comment");

	// console.log("question", question);
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
	}, [id, upvotedAnswers, upvotedComments]);

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

	const openComments = (answerId) => {
		setIsCommentsOpen((prev) => ({
			...prev,
			[answerId]: !prev[answerId],
		}));
	};

	// /addSuggestionsToAnswer/:questionId/:answerId
	const handleCommentClick = async (answerId) => {
		// first check if the user is logged in
		if (!token || !user) {
			alert("Please login to send suggestions");
			return;
		}

		try {
			fetch(`${baseUrl}/thoughts/addSuggestionsToAnswer/${id}/${answerId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ suggestion: inputComment }),
			}).then((res) => {
				if (res.status === 200) {
					alert("Suggestion sent successfully");
					fetchQuestion();
				}
			});
		} catch (error) {
			console.error("Error sending suggestion:", error);
		}
		setInputComment("");
	};

	return (
		<div
			className={`qa-page ${theme === "dark" ? " dark-theme" : ""}`}
			data-bs-theme={theme}
		>
			{/* Left Side - Questions */}
			<div className="questions-sidebar">
				<h2 className="sidebar-title">Question</h2>
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
											<button
												className="action-button"
												onClick={() => handleAnswerUpvote(id, answer._id)}
											>
												<BiLike
													id={isAnswerUpvoted(answer._id) ? "upvoted" : ""}
												/>
												<span>
													{answer?.upvotes?.length || 0}{" "}
													{answer?.upvotes?.length === 1 ? "Like" : "Likes"}
												</span>
											</button>
											<button
												className="action-button"
												onClick={() => openComments(answer._id)}
											>
												<BiCommentDetail />
												<span>Comment</span>
											</button>
										</div>
										{/* <FaRegBookmark className="bookmark-icon" /> */}
									</div>

									<div
										className="comments-section"
										style={{
											display: isCommentsOpen[answer._id] ? "block" : "none",
										}}
									>
										<div className="comments-wrapper">
											{/* Existing comments */}
											{answer.suggestions?.map((comment, index) => (
												<div key={index} className="comment-item">
													<img
														src={comment.user.profilePicture}
														alt=""
														className="user-icon"
													/>
													<div className="comment-content">
														<div className="user-name">
															{comment.user.firstName +
																" " +
																comment.user.lastName}
														</div>
														<div className="comment-text">
															{comment.comment}
														</div>
														<div className="comment-actions">
															<button
																onClick={() =>
																	handleCommentUpvote(
																		id,
																		answer._id,
																		comment._id
																	)
																}
															>
																<BiLike
																	id={
																		isCommentUpvoted(comment._id)
																			? "upvoted"
																			: ""
																	}
																/>{" "}
																<span>
																	{comment?.likes?.length || 0}{" "}
																	{comment?.likes?.length === 1
																		? "Like"
																		: "Likes"}
																</span>
															</button>
														</div>
													</div>
												</div>
											))}
										</div>

										{/* New comment input */}
										<div className="comment-input-container">
											{user?.profilePicture ? (
												<img
													src={user?.profilePicture}
													alt=""
													className="user-icon"
												/>
											) : (
												<FaUserCircle className="user-icon" />
											)}

											<div className="input-wrapper">
												<input
													type="text"
													value={inputComment}
													onChange={(e) => setInputComment(e.target.value)}
													placeholder="Write a comment..."
												/>
												<FaPaperPlane
													className="send-icon"
													onClick={() => handleCommentClick(answer._id)}
												/>
											</div>
										</div>
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
