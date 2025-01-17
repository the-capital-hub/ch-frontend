import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { useUpvoteHandler } from "../UtilityFunction/upvoteDownvote";
import { sentConnectionRequest } from "../../../Service/user";
import { environment } from "../../../environments/environment";
import DOMPurify from "dompurify";

import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import Spinner from "../../Spinner/Spinner";
import "./ThoughtsQA.scss";

const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");
const MAX_ANSWER_LENGTH = 1000;

const QAComponent = () => {
	const theme = useSelector(selectTheme);
	const { id } = useParams();
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("loggedInUser"));

	const [question, setQuestion] = useState({});
	const [questions, setQuestions] = useState([]);
	const [posts, setPosts] = useState([]);
	const [inputText, setInputText] = useState("");
	const [inputComment, setInputComment] = useState("");
	const [isCommentsOpen, setIsCommentsOpen] = useState({});
	const [activeTab, setActiveTab] = useState("posts");
	const [connectionMessageSuccess, setConnectionMessageSuccess] =
		useState(false);
	const [connectionStatus, setConnectionStatus] = useState({
		isConnected: false,
		isPending: false,
		isLoading: false,
	});
	const [loading, setLoading] = useState(true);
	const [answerError, setAnswerError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	// const [showCreatorDetails, setShowCreatorDetails] = useState(false);
	// console.log("question", question);
	// console.log("questions", questions);
	// console.log("posts", posts);

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

	const fetchQuestion = async () => {
		let localLoading = true;
		try {
			const response = await fetch(`${baseUrl}/thoughts/getQuestionById/${id}`);
			const data = await response.json();
			setQuestion(data.data.question);
			setQuestions(data.data.userThoughts);
			setPosts(data.data.posts);
		} catch (error) {
			console.error("Error fetching question:", error);
		} finally {
			localLoading = false;
		}
		return localLoading;
	};
	useEffect(() => {
		const loadData = async () => {
			const isLoading = await fetchQuestion();
			setLoading(isLoading);
		};
		loadData();
	}, [id, upvotedAnswers, upvotedComments]);

	const handleSendClick = async (e) => {
		e.preventDefault();
		setAnswerError("");

		if (!token || !user) {
			setAnswerError("Please login to submit an answer");
			return;
		}

		const sanitizedInput = DOMPurify.sanitize(inputText.trim());
		if (!sanitizedInput) {
			setAnswerError("Please enter an answer");
			return;
		}

		if (sanitizedInput.length > MAX_ANSWER_LENGTH) {
			setAnswerError(`Answer must not exceed ${MAX_ANSWER_LENGTH} characters`);
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await fetch(
				`${baseUrl}/thoughts/addAnswerToQuestion/${id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ answer: sanitizedInput }),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to submit answer");
			}

			const data = await response.json();

			console.log("data", data);
			if (data.status === 200) {
				setInputText("");

				// Immediately update local state
				setQuestion((prevQuestion) => ({
					...prevQuestion,
					answer: [
						{
							_id: data.data._id,
							answer: sanitizedInput,
							user: user,
							upvotes: [],
							suggestions: [],
						},
						...(prevQuestion.answer || []),
					],
				}));

				// Fetch updated data from server
				fetchQuestion();
			} else {
				setAnswerError("Failed to submit answer. Please try again.");
			}
		} catch (error) {
			console.error("Error sending answer:", error);
			setAnswerError("An error occurred. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
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
		} finally {
			setInputComment("");
			setLoading(false);
		}
	};

	// Function to check connection status
	const checkConnectionStatus = (questionUser) => {
		if (!user || !questionUser) return;

		const isAlreadyConnected = questionUser.connections?.includes(user._id);
		const hasPendingRequest =
			questionUser.connectionsReceived?.includes(user._id) ||
			questionUser.connectionsSent?.includes(user._id);

		setConnectionStatus({
			isConnected: isAlreadyConnected,
			isPending: hasPendingRequest,
			isLoading: false,
		});
	};

	// Effect to check connection status when question data changes
	useEffect(() => {
		if (question?.user) {
			checkConnectionStatus(question.user);
		}
	}, [question?.user, user?._id]);

	// Enhanced connection handler with proper error handling and loading states
	const handleConnect = async (e, userId) => {
		e?.preventDefault();
		e?.stopPropagation();

		if (!user) {
			alert("Please login first to connect!");
			return;
		}

		if (connectionStatus.isConnected || connectionStatus.isPending) {
			return;
		}

		try {
			setConnectionStatus((prev) => ({ ...prev, isLoading: true }));

			const { data } = await sentConnectionRequest(user._id, userId);

			setConnectionStatus({
				isConnected: false,
				isPending: true,
				isLoading: false,
			});

			// Show success message temporarily
			setConnectionMessageSuccess(true);
			setTimeout(() => setConnectionMessageSuccess(false), 2500);
		} catch (error) {
			console.error("Connection request failed:", error);
			alert("Failed to send connection request. Please try again.");

			setConnectionStatus((prev) => ({
				...prev,
				isLoading: false,
			}));
		}
	};

	// Connection button renderer
	const renderConnectionButton = () => {
		if (!user) {
			return (
				<button
					className="follow-button"
					onClick={() => alert("Please login first to follow!")}
				>
					Follow for more questions
				</button>
			);
		}

		const buttonText = connectionStatus.isLoading
			? "Processing..."
			: connectionStatus.isConnected
			? "Following"
			: connectionStatus.isPending
			? "Request Pending"
			: "Follow for more questions";

		return (
			<button
				className={`follow-button ${
					connectionStatus.isConnected ? "connected" : ""
				} 
										 ${connectionStatus.isPending ? "pending" : ""}`}
				onClick={(e) => handleConnect(e, question?.user?._id)}
				disabled={
					connectionStatus.isLoading ||
					connectionStatus.isConnected ||
					connectionStatus.isPending
				}
			>
				{buttonText}
			</button>
		);
	};

	if (loading) {
		return <Spinner className="thoughts-qa-spinner" />;
	}

	return (
		<div
			className={`qa-page ${theme === "dark" ? " dark-theme" : ""}`}
			data-bs-theme={theme}
		>
			{/* Left Side - Questions */}
			<div className="questions-left">
				{/* Questions Preview Section */}
				<div className="question-preview">
					<h2 className="question-preview-title">Questions</h2>
					<hr className="question-preview-hr" />
					<div className="question-preview-creator-details">
						<img
							src={question?.user?.profilePicture || "/placeholder.svg"}
							alt={`${question?.user?.firstName} ${question?.user?.lastName}`}
						/>
						<div className="creator-info">
							<div className="creator-info-details">
								<h3>
									{`${question?.user?.firstName} ${question?.user?.lastName} 
									`}
								</h3>

								<div
									onClick={() => {
										user
											? navigate(
													`/user/${
														question?.user?.firstName?.toLowerCase() +
														"-" +
														question?.user?.lastName?.toLowerCase()
													}/${question?.user?.oneLinkId}`
											  )
											: navigate(`/founder/${question?.user?.userName}`);
									}}
									className="creator-info-details-view-profile"
								>
									View full profile
								</div>
							</div>
							<p className="creator-info-position">
								{question?.user?.designation} of{" "}
								{question?.user?.startUp.company},{" "}
								{question?.user?.startUp?.location}
							</p>
							<p className="creator-info-connections">
								{question?.user?.connections.length} Connections
							</p>
						</div>
					</div>
					<hr />
					<p className="question-preview-question">{question?.question}</p>
				</div>

				{/* Creator Details Section */}
				<div className="creator-details">
					<div className="section">
						<h2>About the {question?.user?.firstName}</h2>
						<hr />
						<div className="about-user">
							<div className="about-user-info">
								<img
									src={question?.user?.profilePicture || "/placeholder.svg"}
									alt="Pic"
								/>
								<div className="user-details">
									<h3>
										{`${question?.user?.firstName} ${question?.user?.lastName} 
									`}
										{/* <span className="username">
											@{question?.user?.userName}
										</span> */}
									</h3>
									<p className="username">@{question?.user?.userName}</p>
									<p className="position">
										{question?.user?.designation} of{" "}
										{question?.user?.startUp.company},{" "}
										{question?.user?.startUp?.location}
									</p>
									<span className="stats-container">
										{/* <p className="stats">253 Followers</p> */}
										<p className="stats">
											{question?.user?.connections.length} Connections
										</p>
									</span>
								</div>
							</div>

							<div className="connection-section">
								{renderConnectionButton()}
								{connectionMessageSuccess && (
									<p className="connection-message success">
										Connection request sent successfully
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="posts-questions">
						<div className="tabs">
							<button
								className={`tab ${activeTab === "posts" ? "active" : ""}`}
								onClick={() => setActiveTab("posts")}
							>
								Posts
							</button>
							<button
								className={`tab ${activeTab === "questions" ? "active" : ""}`}
								onClick={() => setActiveTab("questions")}
							>
								Previous Questions
							</button>
						</div>

						<div className="thoughts-qa-content">
							{activeTab === "posts" ? (
								<div className="posts">
									{posts?.map((post, index) => (
										<div key={index} className="post-card">
											<div className="card-header">
												<div className="header-left">
													<div className="logo">
														<img
															src={
																post?.user?.startUp?.logo || "/placeholder.svg"
															}
															alt="Capital Hub"
														/>
													</div>
													<span>Capital Hub</span>
												</div>
											</div>

											<div
												className="post-content"
												dangerouslySetInnerHTML={{
													__html: DOMPurify.sanitize(post?.description),
												}}
											></div>
											<div className="engagement">
												<span className="fire-icon">🔥</span>
												<span className="likes">
													{post?.likes.length} Likes
												</span>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="questions">
									{questions
										.filter((q) => q._id !== id)
										?.map((q) => (
											<div key={q._id} className="question-card">
												<h4>{q.question}</h4>
												<p>{q.industry}</p>
											</div>
										))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Answers */}
			<div className="questions-right">
				{/* Answers Section */}
				<div className="answers-section">
					<h3 className="answers-title">Answers</h3>

					<div className="answer-input-container">
						<div className="input-top">
							<div className="input-header">
								<img
									src={
										user?.profilePicture
											? user?.profilePicture
											: "https://cdn-icons-png.flaticon.com/512/149/149071.png" ||
											  "/placeholder.svg"
									}
									alt="Profile Pic"
									className="user-icon"
								/>
								<input
									type="text"
									placeholder={
										token ? "Type your answer here" : "Please login to answer"
									}
									className="input-placeholder"
									value={inputText}
									onChange={(e) => {
										if (e.target.value.length <= MAX_ANSWER_LENGTH) {
											setInputText(e.target.value);
											setAnswerError("");
										}
									}}
									disabled={!token}
								/>
							</div>
							<div className="input-actions">
								{inputText && (
									<span className="character-count">
										{inputText.length}/{MAX_ANSWER_LENGTH}
									</span>
								)}
								{isSubmitting ? (
									<CgSpinner className="send-icon animate-spin" />
								) : (
									<FaPaperPlane
										className={`send-icon ${!token ? "disabled" : ""}`}
										onClick={handleSendClick}
									/>
								)}
							</div>
						</div>
						{answerError && <div className="error-message">{answerError}</div>}
					</div>

					{/* Answer Items */}
					{question?.answer
						? question?.answer
								.slice()
								.reverse()
								.map((answer, index) => (
									<div key={index} className="answer-item">
										<div className="user-info">
											<img
												src={answer?.user?.profilePicture || "/placeholder.svg"}
												alt="Profile Pic"
												className="user-icon"
											/>
											<div className="user-details">
												<span className="username">
													{answer?.user?.firstName +
														" " +
														answer?.user?.lastName}
												</span>
												{/* <span className="follow-text">· Follow</span> */}
											</div>
										</div>

										<p className="answer-text">{answer?.answer}</p>

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
															src={
																comment.user.profilePicture ||
																"/placeholder.svg"
															}
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
														src={user?.profilePicture || "/placeholder.svg"}
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
				</div>
			</div>
		</div>
	);
};

export default QAComponent;
