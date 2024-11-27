import React, { useState, useEffect, useRef, useCallback } from "react";
import { BiChevronLeft, BiPlus, BiLike, BiShareAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { environment } from "../../../environments/environment";
import "./ThoughtsMain.scss";
import industriesAndSkills from "../data/industriesAndSkills";
import DarkLogo from "../../../Images/investorIcon/new-logo.png";
import WhiteLogo from "../../../Images/investorIcon/logo-white.png";

const baseUrl = environment.baseUrl;

// Custom hook for handling upvotes
const useUpvoteHandler = (baseUrl) => {
	const [upvotedQuestions, setUpvotedQuestions] = useState(() => {
		const stored = localStorage.getItem("question");
		return stored ? JSON.parse(stored).upvote : [];
	});

	const handleUpvote = useCallback(
		async (questionId) => {
			try {
				const token = localStorage.getItem("accessToken");
				if (!token) {
					throw new Error("Authentication required");
				}

				// Optimistic update
				setUpvotedQuestions((prev) => {
					const isUpvoted = prev.includes(questionId);
					const newUpvotes = isUpvoted
						? prev.filter((id) => id !== questionId)
						: [...prev, questionId];

					// Update localStorage
					const storedQuestions = JSON.parse(
						localStorage.getItem("question") || '{"upvote":[]}'
					);
					storedQuestions.upvote = newUpvotes;
					localStorage.setItem("question", JSON.stringify(storedQuestions));

					return newUpvotes;
				});

				// API call
				const response = await fetch(
					`${baseUrl}/thoughts/upvoteDownvoteQuestion/${questionId}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) {
					throw new Error("Failed to update vote");
				}

				// Optional: Update questions list with new vote count from server
				return await response.json();
			} catch (error) {
				// Revert optimistic update on error
				setUpvotedQuestions((prev) => {
					const isUpvoted = prev.includes(questionId);
					const revertedUpvotes = isUpvoted
						? [...prev, questionId]
						: prev.filter((id) => id !== questionId);

					// Update localStorage
					const storedQuestions = JSON.parse(
						localStorage.getItem("question") || '{"upvote":[]}'
					);
					storedQuestions.upvote = revertedUpvotes;
					localStorage.setItem("question", JSON.stringify(storedQuestions));

					return revertedUpvotes;
				});

				console.error("Error handling upvote:", error);
				throw error;
			}
		},
		[baseUrl]
	);

	return {
		upvotedQuestions,
		handleUpvote,
		isUpvoted: useCallback(
			(questionId) => upvotedQuestions.includes(questionId),
			[upvotedQuestions]
		),
	};
};

const TopicTag = ({ children, isSelected, onClick }) => (
	<button
		className={`topic-tag ${isSelected ? "topic-tag--selected" : ""}`}
		onClick={onClick}
	>
		{children}
	</button>
);

function timeAgo(timestamp) {
	const now = new Date();
	const date = new Date(timestamp);
	const seconds = Math.floor((now - date) / 1000);

	const intervals = [
		{ limit: 60, name: "second", divisor: 1 },
		{ limit: 60, name: "minute", divisor: 60 },
		{ limit: 24, name: "hour", divisor: 60 * 60 },
		{ limit: 7, name: "day", divisor: 24 * 60 * 60 },
		{ limit: 4.35, name: "week", divisor: 7 * 24 * 60 * 60 },
		{ limit: 12, name: "month", divisor: 30.44 * 24 * 60 * 60 },
		{ limit: Infinity, name: "year", divisor: 365.25 * 24 * 60 * 60 },
	];

	for (const interval of intervals) {
		const value = Math.floor(seconds / interval.divisor);
		if (value < interval.limit) {
			return `${value} ${interval.name}${value !== 1 ? "s" : ""} ago`;
		}
	}

	return "just now";
}

const ArticleCard = ({
	id,
	title,
	contributors,
	contributorsList,
	time,
	description,
	tags,
	onClick,
	isUpvoted,
	onUpvote,
}) => (
	<div className="article-card" onClick={onClick}>
		<h2 className="article-card-title">{title}</h2>

		<div className="article-card-meta">
			<div className="article-card-contributors">
				{contributorsList.map((user, i) => (
					<img
						key={i}
						src={user?.user?.profilePicture}
						alt="avatar"
						className="article-card-avatar"
					/>
				))}
			</div>
			<span className="article-card-stat">{contributors} contributions</span>
			<span className="article-card-dot">•</span>
			<span className="article-card-stat">{timeAgo(time)}</span>
		</div>

		{description && <p className="article-card-description">{description}</p>}

		<div className="article-card-tags">
			<span className="article-card-tag">{tags}</span>
		</div>

		<div className="article-card-actions">
			<button
				className="article-card-button"
				onClick={(e) => {
					e.stopPropagation();
					onUpvote(id);
				}}
			>
				<BiLike
					className={`article-card-icon ${isUpvoted ? "upvoted" : ""}`}
					id={`${isUpvoted ? "Upvoted" : ""}`}
				/>
				<span id={`${isUpvoted ? "Upvoted" : ""}`}>Upvote</span>
			</button>
			<button
				className="article-card-button"
				onClick={(e) => e.stopPropagation()}
			>
				<BiShareAlt className="article-card-icon" />
				<span>Share</span>
			</button>
		</div>
	</div>
);

const Thoughts = () => {
	const theme = useSelector(selectTheme);
	const navigate = useNavigate();
	const [selectedFilter, setSelectedFilter] = useState("All");
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [questions, setQuestions] = useState([]);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const topicsRef = useRef(null);
	const animationFrameRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const { upvotedQuestions, handleUpvote, isUpvoted } = useUpvoteHandler(
		environment.baseUrl
	);
	const user = JSON.parse(localStorage.getItem("loggedInUser"));
	// console.log("questions", questions);

	// fetch questions from server
	useEffect(() => {
		fetch(`${baseUrl}/thoughts/get-questions`)
			.then((res) => res.json())
			.then((data) => setQuestions(data.data));
	}, []);

	// Auto-scroll for topics only
	useEffect(() => {
		const container = topicsRef.current;

		const startAutoScroll = () => {
			if (container && !isHovering) {
				// Scroll down by 1 pixel
				container.scrollTop += 1;

				// If reached bottom, reset to top
				if (
					container.scrollTop >=
					container.scrollHeight - container.clientHeight
				) {
					container.scrollTop = 0;
				}

				// Request next animation frame
				animationFrameRef.current = requestAnimationFrame(startAutoScroll);
			}
		};

		// Start auto-scrolling if not hovering
		if (!isHovering) {
			animationFrameRef.current = requestAnimationFrame(startAutoScroll);
		}

		// Cleanup function
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
		};
	}, [isHovering]);

	const filters = ["All", "Latest", "Top Questions", "My Question"];

	const handleFilterClick = (filter) => {
		setSelectedFilter(filter);
	};

	const handleTopicClick = (topic) => {
		setSelectedTopics((prevTopics) =>
			prevTopics.includes(topic)
				? prevTopics.filter((t) => t !== topic)
				: [...prevTopics, topic]
		);
	};

	const handleArticleClick = (id) => {
		navigate(`/thoughts/question/${id}`);
	};

	const handleUpvoteClick = async (questionId) => {
		try {
			await handleUpvote(questionId);
		} catch (error) {
			alert(error.message);
		}
	};

	// Filter questions based on selected filter
	let filteredQuestions;

	if (selectedFilter === "All") {
		filteredQuestions = questions;
	} else if (selectedFilter === "Latest") {
		filteredQuestions = [...questions].sort(
			(a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
		);
	} else if (selectedFilter === "Top Questions") {
		filteredQuestions = questions.sort(
			(a, b) => b.answer.length - a.answer.length
		);
	} else {
		filteredQuestions = questions.filter(
			(question) => question?.user?._id === user?._id
		);
	}

	// Filter questions based on selected topics
	filteredQuestions =
		selectedTopics.length > 0
			? filteredQuestions.filter((question) =>
					selectedTopics.some((topic) =>
						question.industry.toLowerCase().includes(topic.toLowerCase())
					)
			  )
			: filteredQuestions;

	return (
		<div
			className={`thoughts-container ${theme === "dark" ? "dark-theme" : ""}`}
		>
			<nav className="thoughts-navbar">
				<div className="thoughts-navbar-left">
					<div className="thoughts-navbar-buttons">
						<button
							className="thoughts-navbar-back-button"
							onClick={() => navigate(-1)}
						>
							<BiChevronLeft />
						</button>
						<button
							className={`thoughts-navbar-mobile-toggle ${
								isMobileMenuOpen ? "thoughts-navbar-mobile-toggle-open" : ""
							}`}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<GiHamburgerMenu />
						</button>
					</div>
					<div className="logo_container">
						<img
							src={theme === "dark" ? WhiteLogo : DarkLogo}
							onClick={() => navigate("/home")}
							alt="the capital hub logo"
						/>
					</div>
					<div
						className={`thoughts-navbar-filters ${
							isMobileMenuOpen ? "mobile-open" : ""
						}`}
					>
						{filters.map((filter) => (
							<button
								key={filter}
								className={`thoughts-navbar-filter-button ${
									selectedFilter === filter ? "active" : ""
								}`}
								onClick={() => handleFilterClick(filter)}
							>
								{filter}
							</button>
						))}
					</div>
				</div>

				<button
					className="thoughts-navbar-create-button"
					onClick={() => navigate("/thoughts/create-question")}
				>
					<BiPlus />
					Create Question
				</button>
			</nav>

			<main className="thoughts-main">
				<div className="thoughts-content">
					<div className="thoughts-content-topics">
						<h2 className="thoughts-content-subtitle">More to explore</h2>
						<div
							ref={topicsRef}
							className="thoughts-topics-container"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							{industriesAndSkills.map((topic) => (
								<TopicTag
									key={topic}
									isSelected={selectedTopics.includes(topic)}
									onClick={() => handleTopicClick(topic)}
								>
									{topic}
								</TopicTag>
							))}
						</div>
					</div>

					<div className="thoughts-content-articles">
						{filteredQuestions && filteredQuestions.length > 0 ? (
							filteredQuestions.map((question) => (
								<ArticleCard
									key={question._id}
									id={question._id}
									title={question.question}
									contributors={question.answer.length}
									contributorsList={question.answer}
									time={question.updatedAt}
									tags={question.industry}
									onClick={() => handleArticleClick(question._id)}
									isUpvoted={isUpvoted(question._id)}
									onUpvote={handleUpvoteClick}
								/>
							))
						) : (
							<div className="thoughts-no-questions">
								No questions are available for the selected industry or skill.
								Please try selecting a different one.
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Thoughts;
