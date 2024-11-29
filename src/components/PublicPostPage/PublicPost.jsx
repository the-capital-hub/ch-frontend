import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NewsCorner from "../Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import PostCard from "./PostCard/PostCard";
import { environment } from "../../environments/environment";
import "./PublicPost.scss";

const PublicPost = () => {
	const navigate = useNavigate();
	const { postId } = useParams();
	const [postData, setPostData] = useState({});

	useEffect(() => {
		const fetchSinglePost = async () => {
			try {
				const response = await fetch(
					`${environment.baseUrl}/api/posts/getSinglePost/${postId}`
				);
				const { data } = await response.json();
				setPostData(data);
			} catch (error) {
				console.error("Error fetching post:", error);
			}
		};

		fetchSinglePost();
	}, [postId]);

	const {
		user,
		startUpCompanyName,
		investorCompanyName,
		designation,
		location,
		description,
		video,
		image,
		images,
		createdAt,
		likes,
		comments,
		pollOptions,
	} = postData;

	console.log("postData", postData);

	return (
		<div className="PublicPost-container">
			<div className="PublicPost-content">
				<div className="PublicPost-left">
					<PostCard
						firstName={user?.firstName}
						lastName={user?.lastName}
						profilePicture={user?.profilePicture}
						oneLinkId={user?.oneLinkId}
						isSubscribed={false}
						startUpCompanyName={startUpCompanyName}
						investorCompanyName={investorCompanyName}
						designation={designation}
						location={location}
						description={description}
						video={video}
						image={image}
						images={images}
						createdAt={createdAt}
						likes={likes}
						comments={comments}
						pollOptions={pollOptions}
					/>
				</div>
				<div className="PublicPost-right">
					<div className="PublicPost-right-profile">
						<h3>Profile</h3>
						<p>Sign in to Like, Share, comment, Repost and save</p>
						<button
							className="PublicPost-signin"
							onClick={() => navigate("/login")}
						>
							Sign in
						</button>
					</div>
					<NewsCorner />
				</div>
			</div>
		</div>
	);
};

export default PublicPost;
