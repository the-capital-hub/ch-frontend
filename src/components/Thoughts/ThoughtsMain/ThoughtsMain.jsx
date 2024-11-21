import React, { useState } from "react";
import {
	BiChevronLeft,
	BiPlus,
	BiLike,
	BiComment,
	BiShareAlt,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "./ThoughtsMain.scss";

const TopicTag = ({ children, isSelected, onClick }) => (
	<button
		className={`topic-tag ${isSelected ? "topic-tag--selected" : ""}`}
		onClick={onClick}
	>
		{children}
	</button>
);

const ArticleCard = ({
	title,
	contributors,
	time,
	description,
	tags,
	onClick,
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
			<span className="article-card__stat">{time}</span>
		</div>

		{description && <p className="article-card__description">{description}</p>}

		<div className="article-card__tags">
			{tags.map((tag, index) => (
				<span key={index} className="article-card__tag">
					{tag}
				</span>
			))}
		</div>

		<div className="article-card__actions">
			<button
				className="article-card__button"
				onClick={(e) => e.stopPropagation()}
			>
				<BiLike className="article-card__icon" />
				<span>Upvote</span>
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

	const filters = ["All", "Latest", "Top Questions", "My Question", "My Poll"];
	const topics = [
		"Marketing",
		"Public Administration",
		"Healthcare",
		"Engineering",
		"IT Services",
		"Sustainability",
		"Business Administration",
		"Telecommunications",
		"HR Management",
	];

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

	const handleArticleClick = () => {
		navigate("/thoughts/answers");
	};

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
							<ArticleCard
								title="Your calendar is packed with back-to-back meetings. How do you handle last-minute requests?"
								contributors="35"
								time="4 minutes ago"
								tags={["Administrative Assistance"]}
								onClick={handleArticleClick}
							/>

							<ArticleCard
								title="You're facing data discrepancies and time constraints. How can you effectively manage both?"
								contributors="11"
								time="13 minutes ago"
								description="Tackle data discrepancies and tight deadlines with these strategies. Automate validation, prioritize tasks, and set realistic timelines."
								tags={["Analytical Skills", "•", "Soft Skills"]}
								onClick={handleArticleClick}
							/>
							<ArticleCard
								title="Your calendar is packed with back-to-back meetings. How do you handle last-minute requests?"
								contributors="35"
								time="4 minutes ago"
								tags={["Administrative Assistance"]}
								onClick={handleArticleClick}
							/>
							<ArticleCard
								title="Your calendar is packed with back-to-back meetings. How do you handle last-minute requests?"
								contributors="35"
								time="4 minutes ago"
								tags={["Administrative Assistance"]}
								onClick={handleArticleClick}
							/>
						</div>
					</div>

					<div className="content__right">
						<h2 className="content__subtitle">More to explore</h2>
						<div className="topics">
							{topics.map((topic) => (
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
