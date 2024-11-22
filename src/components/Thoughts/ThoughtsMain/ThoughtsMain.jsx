import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	BiChevronLeft,
	BiPlus,
	BiLike,
	BiShareAlt,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { environment } from "../../../environments/environment";
import "./ThoughtsMain.scss";
import industriesAndSkills from "../data/industriesAndSkills";

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
	time,
	description,
	tags,
	onClick,
	isUpvoted,
	onUpvote,
}) => (
	<div className="article-card" onClick={onClick}>
		<h2 className="article-card__title">{title}</h2>

		<div className="article-card__meta">
			<div className="article-card__contributors">
				{Array(3)
					.fill(0)
					.map((_, i) => (
						<div key={i} className="article-card__avatar" />
					))}
			</div>
			<span className="article-card__stat">{contributors} contributions</span>
			<span className="article-card__dot">•</span>
			<span className="article-card__stat">{timeAgo(time)}</span>
		</div>

		{description && <p className="article-card__description">{description}</p>}

		<div className="article-card__tags">
			<span className="article-card__tag">{tags}</span>
		</div>

		<div className="article-card__actions">
			<button
				className="article-card__button"
				onClick={(e) => {
					e.stopPropagation();
					onUpvote(id);
				}}
			>
				<BiLike
					className={`article-card__icon ${isUpvoted ? "upvoted" : ""}`}
					id={`${isUpvoted ? "Upvoted" : ""}`}
				/>
				<span id={`${isUpvoted ? "Upvoted" : ""}`}>Upvote</span>
			</button>
			<button
				className="article-card__button"
				onClick={(e) => e.stopPropagation()}
			>
				<BiShareAlt className="article-card__icon" />
				<span>Share</span>
			</button>
		</div>
	</div>
);

const Thoughts = () => {
	const navigate = useNavigate();
	const [selectedFilter, setSelectedFilter] = useState("All");
	const [selectedTopics, setSelectedTopics] = useState([]);
	const [questions, setQuestions] = useState([]);
	const topicsRef = useRef(null);
	const animationFrameRef = useRef(null);
	const [isHovering, setIsHovering] = useState(false);
	const { upvotedQuestions, handleUpvote, isUpvoted } = useUpvoteHandler(
		environment.baseUrl
	);

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

	// Filter questions based on selected topics
	const filteredQuestions =
		selectedTopics.length > 0
			? questions.filter((question) =>
					selectedTopics.some((topic) =>
						question.industry.toLowerCase().includes(topic.toLowerCase())
					)
			  )
			: questions;

	return (
		<div className="app">
			<nav className="navbar">
				<div className="navbar__left">
					<button className="navbar__back-btn" onClick={() => navigate(-1)}>
						<BiChevronLeft />
					</button>

					<div className="navbar__filters">
						{filters.map((filter) => (
							<button
								key={filter}
								className={`navbar__filter-btn ${
									selectedFilter === filter ? "navbar__filter-btn--active" : ""
								}`}
								onClick={() => handleFilterClick(filter)}
							>
								{filter}
							</button>
						))}
					</div>
				</div>

				<button
					className="navbar__create-btn"
					onClick={() => navigate("/thoughts/create-question")}
				>
					<BiPlus />
					Create Question
				</button>
			</nav>

			<main className="main">
				<div className="content">
					<div className="content__left">
						<div className="articles">
							{filteredQuestions && filteredQuestions.length > 0 ? (
								filteredQuestions.map((question) => (
									<ArticleCard
										key={question._id}
										id={question._id}
										title={question.question}
										contributors={question.answer.length}
										time={question.updatedAt}
										tags={question.industry}
										onClick={() => handleArticleClick(question._id)}
										isUpvoted={isUpvoted(question._id)}
										onUpvote={handleUpvoteClick}
									/>
								))
							) : (
								<div className="no-questions">
									No questions are available for the selected industry or skill.
									Please try selecting a different one.
								</div>
							)}
						</div>
					</div>

					<div className="content__right">
						<h2 className="content__subtitle">More to explore</h2>
						<div
							ref={topicsRef}
							className="topics"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
							style={{
								maxHeight: "560px",
								overflowY: "auto",
								position: "relative",
							}}
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
				</div>
			</main>
		</div>
	);
};

export default Thoughts;
