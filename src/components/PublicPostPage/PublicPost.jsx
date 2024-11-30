import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUserId } from "../../Store/features/user/userSlice";
import NewsCorner from "../Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import PostCard from "./PostCard/PostCard";
import { environment } from "../../environments/environment";
import "./PublicPost.scss";

const baseUrl = environment.baseUrl;


const PublicPost = () => {
	const loggedInUserId = useSelector(selectLoggedInUserId);
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

	// const handlePollVote = async (postId, optionId) => {
	// 	try {
	// 	  const token = localStorage.getItem('accessToken');
	// 	  const response = await fetch(`${baseUrl}/api/posts/vote`, {
	// 		method: 'PATCH',
	// 		headers: {
	// 		  'Content-Type': 'application/json',
	// 		  'Authorization': `Bearer ${token}`,
	// 		},
	// 		body: JSON.stringify({ 
	// 		  postId, 
	// 		  optionId,
	// 		  userId: loggedInUserId
	// 		}),
	// 	  });
	
	// 	  const result = await response.json();
		  
	// 	  if (!response.ok) {
	// 		throw new Error(result.message || 'Error voting for poll');
	// 	  }
	
	// 	  // Update the posts state while preserving all post data
	// 	  setAllPosts(prevPosts => 
	// 		prevPosts.map(post => {
	// 		  if (post._id === postId) {
	// 			return {
	// 			  ...post,                    // Keep all existing post data
	// 			  pollOptions: result.data    // Update only the poll options
	// 			};
	// 		  }
	// 		  return post;
	// 		})
	// 	  );
	
	// 	  // Return the updated poll options for the InvestorFeedPostCard component
	// 	  return result.data;
	
	// 	} catch (error) {
	// 	  console.error('Error voting for poll:', error);
	// 	  throw error;
	// 	}
	//   };

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
		pollOptions
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
