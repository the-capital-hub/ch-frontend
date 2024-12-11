import React, { useState, useEffect } from "react";
import { userPosts } from "../../../../../Service/user";
import DOMPurify from "dompurify";
// import { FaVolumeUp } from "react-icons/fa";
import "./TopVoiceTracker.scss";

const TopVoice = () => {
	const [posts, setPosts] = useState([]);
	const [showAllPosts, setShowAllPosts] = useState(false);

	// fetch user posts
	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const response = await userPosts();
				console.log("response", response.data.allPosts);
				setPosts(response.data.allPosts);
			} catch (error) {
				console.error("Failed to fetch user posts:", error);
			}
		};

		fetchUserPosts();
	}, []);
	const handleShowAllPosts = () => {
		setShowAllPosts(!showAllPosts);
	};

	return (
		<div className="top-voice-container">
			<div className="top-voice-header">
				<span className="top-voice-title">Top Voice</span>
				<p className="top-voice-subtitle">
					You have made {posts.length} posts. You need {10 - posts.length} more
					to reach the Top Voice
				</p>
			</div>

			<div className="top-voice-progress-bar-container">
				<div className="level-indicator">
					<div className="level-labels-indicator">
						{posts && (
							<div
								className="current-level"
								style={{ left: `${(posts.length / 10) * 100}%` }}
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
								<img className="post-icon" src={post.image} alt="Post Icon" />
							</div>
							<div className="post-item-container">
								<div className="post-title">{post.title}</div>
								<div
									className="post-description"
									dangerouslySetInnerHTML={{
										__html: DOMPurify.sanitize(post.description),
									}}
								/>
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
					</div>
					<div className="post-item">
						<div className="post-icon">
							<img src="https://via.placeholder.com/50x50" alt="Post Icon" />
						</div>
						<div className="post-item-container">
							<div className="post-title">Achieve Top Voice Status</div>
							<div className="post-description">
								Clear steps or requirements to achieve Top Voice status
							</div>
						</div>
					</div>
					<div className="post-item">
						<div className="post-icon">
							<img src="https://via.placeholder.com/50x50" alt="Post Icon" />
						</div>
						<div className="post-item-container">
							<div className="post-title">Achieve Top Voice Status</div>
							<div className="post-description">
								Clear steps or requirements to achieve Top Voice status
							</div>
						</div>
					</div>
					<div className="post-item">
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
				<div className="know-more" onClick={handleShowAllPosts}>
					<button>Know More</button>
				</div>
			</div>
		</div>
	);
};

export default TopVoice;
