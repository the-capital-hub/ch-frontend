import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";
import { BiLike, BiCommentDetail } from "react-icons/bi";
import "./ThoughtsQA.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { environment } from "../../../environments/environment";
import { useUpvoteHandler } from "../UtilityFunction/upvoteDownvote";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

const QAComponent = () => {
	const theme = useSelector(selectTheme);
	const [question, setQuestion] = useState({});
	const [questions, setQuestions] = useState([]);
	const [posts, setPosts] = useState([]);
	const [inputText, setInputText] = useState("");
	const [inputComment, setInputComment] = useState("");
	const [isCommentsOpen, setIsCommentsOpen] = useState({});
	const [activeTab, setActiveTab] = useState("posts");
	const [showCreatorDetails, setShowCreatorDetails] = useState(false);
	const { id } = useParams();
	const user = JSON.parse(localStorage.getItem("loggedInUser"));
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
		try {
			const response = await fetch(`${baseUrl}/thoughts/getQuestionById/${id}`);
			const data = await response.json();
			setQuestion(data.data.question);
			setQuestions(data.data.userThoughts);
			setPosts(data.data.posts);
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

	const dummyPosts = [
		{
			id: 1,
			content:
				"As the Founder at Capital HUB, Man's all about building great start-ups from a simple idea to an elegant reality. Humbled and honored to have worked with Angels and VC's across the globe to support and grow the startup culture.As the Founder at Capital HUB, Man's all about building great start-ups",
			likes: "Harideep and 121 Others",
		},
		{
			id: 2,
			content:
				"As the Founder at Capital HUB, Man's all about building great start-ups from a simple idea to an elegant reality. Humbled and honored to have worked with Angels and VC's across the globe to support and grow the startup culture.",
			likes: "Harideep and 121 Others",
		},
	];

	const dummyQuestions = [
		{
			id: 1,
			title: "Onboarding and UI/UX",
			content: "How can we improve the onboarding experience for new users?",
		},
		{
			id: 2,
			title: "Fundraising and UI/UX",
			content:
				"What are the key metrics investors look for in a startup's UI/UX?",
		},
	];

	return (
		<div
			className={`qa-page ${theme === "dark" ? " dark-theme" : ""}`}
			data-bs-theme={theme}
		>
			{/* Left Side - Questions */}
			<div className="questions-sidebar">
				{/* Questions Section */}
				<div className="section">
					<div className="question-preview">
						<h2>Questions</h2>
						<hr />
						<div className="user-info">
							<img
								src={question?.user?.profilePicture}
								alt={`${question?.user?.firstName} ${question?.user?.lastName}`}
							/>
							<span>{`${question?.user?.firstName} ${question?.user?.lastName}`}</span>
						</div>
						<hr />
						<p>{question?.question}</p>
					</div>
				</div>

				{/* button to toggle -show or hide creator details */}
				{/* <button
					className="toggle-button"
					onClick={() => setShowCreatorDetails((prev) => !prev)}
				>
					{showCreatorDetails ? "Hide" : "Show"} Creator Details
				</button> */}

				{/* Creator Details Section */}
				<div
					className={`creator-details`}
					// className={`creator-details ${showCreatorDetails ? "show" : "hide"}`}
				>
					<div className="section">
						<h2>About the {question?.user?.firstName}</h2>
						<hr />
						<div className="about-user">
							<div className="about-user-info">
								<img src={question?.user?.profilePicture} alt="Pic" />
								<div className="user-details">
									<h3>{`${question?.user?.firstName} ${question?.user?.lastName}`}</h3>
									<p className="username">@{question?.user?.userName}</p>
									<p className="position">
										{question?.user?.designation} of{" "}
										{question?.user?.startUp.company},{" "}
										{question?.user?.startUp?.location}
									</p>
									<span className="stats-container">
										<p className="stats">253 Followers</p>
										<p className="stats">
											{question?.user?.connections.length} Connections
										</p>
									</span>
								</div>
							</div>
							<button
								className="follow-button"
								onClick={() =>
									alert("Please login first! To Follow for more questions")
								}
							>
								Follow for more questions
							</button>
						</div>
					</div>

					<div className="section posts-questions">
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

						<div className="content">
							{activeTab === "posts" ? (
								<div className="posts">
									{posts?.map((post) => (
										<div key={post.id} className="post-card">
											<div className="card-header">
												<div className="header-left">
													<div className="logo">
														<img
															src={post?.user?.startUp?.logo}
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

					<hr />

					<div className="section user-bio">
						<h2>Bio</h2>
						<p>
							{question?.user?.bio ||
								"A little about myself. Dejection is a sign of failure but it becomes the cause of success. I wrote this when I was 15 years old and that's exactly when I idealized the reality of life. In this current world, success is defined in many ways, some of which include money, fame and power."}
						</p>
					</div>

					<hr />

					<div className="section user-company">
						<h2>Company</h2>
						<div className="company-info">
							<div className="company-logo">
								<img src={question?.user?.startUp?.logo} alt="Capital Hub" />
							</div>
							<div className="company-details">
								<h3>{question?.user?.startUp?.company}</h3>
								<p>{question?.user?.startUp?.location}</p>
							</div>
						</div>
						<div className="company-meta">
							<div className="meta-item">
								<span className="label">Designation</span>
								<span className="value">{question?.user?.designation}</span>
							</div>
							<div className="meta-item">
								<span className="label">Education</span>
								<div className="value">
									<p>Graduate, University of Northampton</p>
								</div>
							</div>
							<div className="meta-item">
								<span className="label">Experience</span>
								<p className="value">
									{question?.user?.experience
										? question?.user?.experience
										: "5+ Years building various startups • Mentored 24 startups Growth $ 50M+ Revenue"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Right Side - Answers */}
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
								src={user?.profilePicture}
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
												{answer?.user?.firstName + " " + answer?.user?.lastName}
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
