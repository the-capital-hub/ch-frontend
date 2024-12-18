import React, { useState, useEffect } from "react";
import { userPosts, updateUserWithTopVoice } from "../../../../../Service/user";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../../Store/features/design/designSlice";
import DOMPurify from "dompurify";
import TopVoices from "../../../../../Images/TopVoices.png";
import "./TopVoiceTracker.scss";

const TopVoice = () => {
	const theme = useSelector(selectTheme);
	const [posts, setPosts] = useState([]);
	const [showAllPosts, setShowAllPosts] = useState(false);
	const [expanded, setExpanded] = useState(false);

	// fetch user posts
	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const response = await userPosts();
				setPosts(response.data.allPosts);
			} catch (error) {
				console.error("Failed to fetch user posts:", error);
			}
		};

		fetchUserPosts();
	}, []);

	// update user as top voice
	const handleUpdateUserAsTopVoice = async () => {
		try {
			const response = await updateUserWithTopVoice();
		} catch (error) {
			console.error();
		}
	};

	useEffect(() => {
		// first check if user is top voice
		if (posts.length >= 10) {
			handleUpdateUserAsTopVoice();
		}
	}, [posts]);

	const handleShowAllPosts = () => {
		setShowAllPosts(!showAllPosts);
	};

	const toggleDescription = (e) => {
		e.stopPropagation();
		setExpanded(!expanded);
	};

	return (
		<div
			className={`top-voice-container ${theme === "dark" ? " dark-theme" : ""}`}
		>
			<div className="top-voice-header">
				<span className="top-voice-title">Top Voice</span>
				<p className="top-voice-subtitle">
					{posts.length >= 10
						? `You have made ${posts.length} posts this month. Congratulation, You are a Top Voice Now.`
						: `You have made ${posts.length} posts. You need ${
								10 - posts.length
						  } more posts
					to reach the Top Voice!`}
				</p>
			</div>

			<div className="top-voice-progress-bar-container">
				<div className="level-indicator">
					<div className="level-labels-indicator">
						{posts && (
							<div
								className="current-level"
								// style={{ left: `${(posts.length / 10) * 100}%` }}
								style={{
									left: `${Math.min(
										Math.max((posts.length / 10) * 100, 0),
										100
									)}%`,
								}}
							>
								Post: {posts.length}
							</div>
						)}
					</div>
					<div className="level-progress">
						<div
							className="level-fill"
							style={{ width: `${(posts.length / 10) * 100}%` }}
						></div>
					</div>
					<div className="level-labels">
						<span>Post 0</span>
						<span>Post 10</span>
					</div>
				</div>
				{posts.length >= 10 && (
					<div className="top-voice-status">
						<span>You have achieved Top Voice status!</span>
					</div>
				)}
			</div>

			<div className="top-voice-body">
				<div className="post-items">
					{posts.slice(0, showAllPosts ? 10 : 5).map((post) => (
						<div key={post.id} className="post-item">
							<div className="post-icon">
								<img
									className="post-icon"
									src={post.image || TopVoices}
									alt="Post Icon"
								/>
							</div>
							<div className="post-item-container">
								<div className="post-title">{post.title}</div>
								<div
									className="post-description"
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(
											expanded
												? post.description
												: post.description?.substring(0, 100) + "..."
										),
									}}
								/>
								{post.description?.length > 100 && (
									<span
										onClick={toggleDescription}
										className={`read-more-text ${expanded ? "expanded" : ""}`}
									>
										{expanded ? "Read Less" : "Read More"}
									</span>
								)}
							</div>
						</div>
					))}
					{/* <div className="post-item">
						<div className="post-icon">
							<img src="https://via.placeholder.com/50x50" alt="Post Icon" />
						</div>
						<div className="post-item-container">
							<div className="post-title">Achieve Top Voice Status</div>
							<div className="post-description">
								Clear steps or requirements to achieve Top Voice status
							</div>
						</div>
					</div> */}
				</div>
				<div className="know-more-btn" onClick={handleShowAllPosts}>
					<button>Know More</button>
				</div>
			</div>
		</div>
	);
};

export default TopVoice;
