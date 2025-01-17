import axios from "axios";
import API from "../api";

// Helper function to get the token from localStorage
const getAuthToken = () => {
	return localStorage.getItem("accessToken");
};
// Create an instance of Axios with default headers
const axiosInstance = axios.create({
	baseURL: API.baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor to include the token in the 'Authorization' header
axiosInstance.interceptors.request.use(
	(config) => {
		const token = getAuthToken();
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

async function getUser() {
	try {
		const response = await axiosInstance.get(API.getUser);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function getPdfData(oneLinkId, folderName) {
	try {
		const requestBody = {
			oneLinkId,
			folderName,
		};
		const response = await axiosInstance.post(API.getDocument, requestBody);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function uploadDocument(userData) {
	try {
		const response = await axiosInstance.post(API.uploadDocument, userData);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function sendOTP(phoneNumber) {
	try {
		const response = await axiosInstance.post(API.sendOtp, { phoneNumber });
		console.log(response);
		return response.data;
	} catch (err) {
		throw err;
	}
}

async function verifyOTP(userData) {
	try {
		const response = await axiosInstance.post(API.verifyOtp, userData);
		return response.data;
	} catch (err) {
		throw err;
	}
}
export const handelLinkdin = async (code) => {
	try {
		const response = await axiosInstance.post(API.linkdinLogin, { code });
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const getLinkedInProfile = async (accessToken) => {
	try {
		const response = await axiosInstance.post(API.getLinkedInProfile, {
			accessToken,
		});
		return response.data;
	} catch (err) {
		throw err;
	}
};
async function postUser(userData, isInvestor, companyDetail) {
	try {
		const response = await axiosInstance.post(API.postUser, {
			...userData,
			isInvestor,
			...companyDetail,
		});
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function postStartUpData(startUpData) {
	try {
		const response = await axiosInstance.post(API.postStartUpData, startUpData);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

export const deleteStartUp = async (startUpId) => {
	try {
		const response = await axiosInstance.put(API.deleteStartUp, { startUpId });
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
async function postUserLogin(userData) {
	try {
		const response = await axiosInstance.post(API.loginUser, userData);
		return response?.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function postUserPost(postData) {
	try {
		const response = await axiosInstance.post(API.postUserPost, postData);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function sharePostLinkedin(linkedInPostData, token, s3ImageUrl) {
	try {
		const response = await axiosInstance.post(
			API.sharePostOnLinkedin,
			linkedInPostData,
			token,
			s3ImageUrl
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

export const addArticle = async (content) => {
	try {
		const response = await axiosInstance.post(API.addArticle, { content });
		return response;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};
async function getAllPostsAPI(page) {
	try {
		const response = await axiosInstance.get(`${API.getAllPosts}?page=${page}`);
		// console.log(response);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function getOnePager(oneLink) {
	try {
		const response = await axiosInstance.get(API.getOnePager + "/" + oneLink);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

async function getUserById(oneLink, userId) {
	try {
		if (oneLink !== "") {
			const onePager = await getOnePager(oneLink);
			const response = await axiosInstance.get(API.getUserById + "/" + userId);
			response.data.data.company = onePager.data.company;
			response.data.data.location = onePager.data.location;
			return response.data;
		} else {
			const response = await axiosInstance.get(API.getUserById + "/" + userId);
			return response.data;
		}
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}

export const updateUserAPI = async (data) => {
	try {
		const response = await axiosInstance.patch(API.updateUser, data);
		return response;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const getStartupByFounderId = async (founderId) => {
	try {
		const response = await axiosInstance.get(
			API.getStartupByFounderId + "/" + founderId
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

//06-08-2024
export const getStartUpById = async (startupId) => {
	try {
		const response = await axiosInstance.get(
			API.getStartUpById + "/" + startupId
		);
		return response;
	} catch (error) {
		throw error;
	}
};

export const updateUserById = async (userId, data) => {
	try {
		const response = await axiosInstance.patch(
			API.updateUserById + "/" + userId,
			data
		);
		return response;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const updateIntroMsgAPI = async (newIntro) =>
	await axiosInstance.patch(API.updateIntroMessage, newIntro);

export const getSavedPostsAPI = async () =>
	await axiosInstance.get(API.getSavedPosts);

// export const savePostAPI = async (postId) => await axiosInstance

export const investNow = async (data) => {
	try {
		const response = await axiosInstance.post(API.investNow, data);
		return response;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};
export const postResetPaswordLink = async (email) => {
	try {
		const response = await axiosInstance.post(API.postResetPaswordLink, email);
		return response.data;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const changePasswordAPI = async (newData) => {
	try {
		const { data } = await axiosInstance.patch(API.changePassword, newData);
		return data;
	} catch (error) {
		console.log();
		throw error?.response?.data || error;
	}
};

export const postNewPassword = async (password, token) => {
	try {
		const response = await axiosInstance.patch(API.postNewPassword, {
			token: token,
			newPassword: password,
		});
		return response;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const likeUnlikeAPI = async (postId) => {
	try {
		const response = await axiosInstance.post(
			`${API.likeUnlikePost}/${postId}`
		);
		return response;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const pendingConnectionRequestsAPI = async () => {
	try {
		const response = await axiosInstance.get(API.pendingConnectionRequests);
		return response.data;
	} catch (error) {
		console.error("Error: ", error);
	}
};

export const acceptConnectionAPI = async (connectionId) => {
	try {
		const response = await axiosInstance.patch(
			`${API.acceptConnectionRequest}/${connectionId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error: ", error);
	}
};

export const rejectConnectionAPI = async (connectionId) => {
	try {
		const response = await axiosInstance.patch(
			`${API.rejectConnectionRequest}/${connectionId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error: ", error);
	}
};

export const getRecommendations = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getRecommendations}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const sentConnectionRequest = async (senderId, receiverId) => {
	try {
		const response = await axiosInstance.post(`${API.sendConnectionRequest}`, {
			senderId: senderId,
			receiverId: receiverId,
		});
		return response;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const getSentConnectionsAPI = async () => {
	try {
		const response = await axiosInstance.get(API.sentConnectionRequests);
		return response.data;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const cancelConnectionRequestAPI = async (connectionId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.cancelConnectionRequest}/${connectionId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const sendPostComment = async ({ postId, userId, text }) => {
	try {
		const response = await axiosInstance.post(
			`${API.sendPostComment}/${postId}`,
			{
				userId: userId,
				text: text,
			}
		);
		return response;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const getPostComment = async ({ postId }) => {
	try {
		const response = await axiosInstance.get(`${API.getPostComment}/${postId}`);
		return response;
	} catch (error) {
		console.error("Error:", error);
		// throw error;
	}
};

export const getUserConnections = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getUserConnections}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

// getpost by collection name
export const getSavedPostCollections = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getSavedPostCollections}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const getSavedPostsByCollection = async (userId, collectionName) => {
	try {
		const response = await axiosInstance.post(
			`${API.getSavedPostsByCollection}/${userId}`,
			{
				collectionName: collectionName,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const getUserAndStartUpByUserIdAPI = async (userId) => {
	try {
		const { data } = await axiosInstance.get(`${API.getUserById}/${userId}`);
		return data;
	} catch (error) {
		console.error("Error getting user details:", error);
		throw error;
	}
};

export const getSearchResultsAPI = async (searchBy) => {
	try {
		const { data } = await axiosInstance.get(
			`${API.getSearchResults}?searchQuery=${searchBy}`
		);
		return data;
	} catch (error) {
		console.error("Error getting search results:", error);
		throw error;
	}
};

export const savePostByUserIdAPI = async (userId, collectionName, postId) => {
	try {
		const postdata = {
			collectionName: collectionName,
			userId: userId,
		};
		const url = `${API.savePostByUserId}/${postId}`;
		const { data } = await axiosInstance.patch(url, postdata);

		return data;
	} catch (error) {
		console.error("Error saving the post:", error);
		throw error;
	}
};

export {
	getUser,
	postUser,
	postStartUpData,
	postUserLogin,
	postUserPost,
	getPdfData,
	uploadDocument,
	getAllPostsAPI,
	getOnePager,
	getUserById,
	sendOTP,
	verifyOTP,
	blockUser,
	unblockUser,
	getUserByIdBody,
	sharePostLinkedin,
};
export const deletePostAPI = async (postId) => {
	try {
		const { data } = await axiosInstance.delete(`${API.deletePost}/${postId}`);
		return data;
	} catch (error) {
		console.error("Error getting search results:", error);
		throw error;
	}
};

export const getUserChats = async (userId) => {
	try {
		const { data } = await axiosInstance.get(`${API.getUserChats}/${userId}`);
		return data;
	} catch (error) {
		console.error("Error getting user chats:", error);
		throw error;
	}
};

export const addMessage = async (messageData) => {
	try {
		const { data } = await axiosInstance.post(`${API.addMessage}`, messageData);
		return data;
	} catch (error) {
		console.error("Error getting user message:", error);
		throw error;
	}
};

export const getSinglePostAPI = async (postId) => {
	try {
		const { data } = await axiosInstance.get(`${API.getSinglePost}/${postId}`);
		return data;
	} catch (error) {
		console.error("Error getting single post:", error);
		throw error;
	}
};

export const findChat = async (firstId, secondId) => {
	try {
		const { data } = await axiosInstance.get(
			`${API.findChat}/${firstId}/${secondId}`
		);
		return data;
	} catch (error) {
		console.error("Error getting user message:", error);
		throw error;
	}
};

export const createChat = async (senderId, recieverId) => {
	try {
		const requestData = {
			senderId,
			recieverId,
		};
		const { data } = await axiosInstance.post(`${API.createChat}`, requestData);
		return data;
	} catch (error) {
		console.error("Error getting user message:", error);
		throw error;
	}
};

export const markMessagesAsRead = async (chatId, userId) => {
	try {
		const response = await axiosInstance.patch(
			`${API.markMessagesAsRead}/${chatId}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error marking message as read:", error);
		throw error;
	}
};

export const getUnreadMessageCount = async (chatId, userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getUnreadMessageCount}/${chatId}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error getting user message count:", error);
		throw error;
	}
};

export const getTotalUnreadMessagesCount = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getTotalUnreadMessagesCount}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error getting total unread messages count:", error);
		throw error;
	}
};

export const getUserByUserName = async (username) => {
	try {
		const response = await axiosInstance.post(API.getUserByUserName, {
			username,
		});
		return response;
	} catch (error) {
		console.error(error.response?.message);
		throw error;
	}
};

export const togglePinMessage = async (userId, chatId) => {
	try {
		const response = await axiosInstance.patch(
			`${API.togglePinMessage}/${userId}/${chatId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while toogle pin chat:", error);
		throw error;
	}
};

export const getPinnedChat = async (userId) => {
	try {
		const response = await axiosInstance.get(`${API.getPinnedChat}/${userId}`);
		return response.data;
	} catch (error) {
		console.error("Error getting pinned chat:", error);
		throw error;
	}
};

export const getInvestorById = async (investorId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getInvestorById}/${investorId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error getting user message count:", error);
		throw error;
	}
};

export const postInvestorData = async (investorData) => {
	try {
		const response = await axiosInstance.post(
			`${API.postInvestorData}`,
			investorData
		);
		return response.data;
	} catch (error) {
		console.error("Error posting investor data:", error);
		throw error;
	}
};

export const addStartupInvested = async (
	investorId,
	newStartUpInvestedData
) => {
	try {
		const response = await axiosInstance.patch(
			`${API.addStartupInvested}/${investorId}`,
			newStartUpInvestedData
		);
		return response.data;
	} catch (error) {
		console.error("Error while adding startup invested:", error);
		throw error;
	}
};

export const addSectorOfInterest = async (
	investorId,
	newSectorOfInterestData
) => {
	try {
		const response = await axiosInstance.patch(
			`${API.addSectorOfInterest}/${investorId}`,
			newSectorOfInterestData
		);
		return response.data;
	} catch (error) {
		console.error("Error while adding sector of interest:", error);
		throw error;
	}
};

export const uploadLogo = async (logo) => {
	try {
		const response = await axiosInstance.post(`${API.uploadLogo}`, logo);
		return response.data;
	} catch (error) {
		console.error("Error while uploading logo:", error);
		throw error;
	}
};

// export const clearChat = async (chatId) => {
//   try {
//     const response = await axiosInstance.patch(`${API.clearChat}/${chatId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error while clearing chat:", error);
//     throw error;
//   }
// };

export const createCommunity = async (createCommunityData) => {
	try {
		const response = await axiosInstance.post(
			`${API.createCommunity}`,
			createCommunityData
		);
		return response.data;
	} catch (error) {
		console.error("Error while clearing chat:", error);
		throw error;
	}
};
export const getAllCommunity = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getAllCommunity}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while clearing chat:", error);
		throw error;
	}
};

export const addMyInterest = async (investorId, newInterestData) => {
	try {
		const response = await axiosInstance.patch(
			`${API.addMyInterest}/${investorId}`,
			newInterestData
		);
		return response.data;
	} catch (error) {
		console.error("Error while adding interest:", error);
		throw error;
	}
};

export const userPosts = async () => {
	try {
		const response = await axiosInstance.get(`${API.getUserPost}`);
		return response.data;
	} catch (error) {
		console.error("Error while getting featured post:", error);
		throw error;
	}
};
export const getCompanyPost = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getCompanyUpdatePosts}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while getting featured post:", error);
		throw error;
	}
};
export const getFeaturedPost = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getFeaturedPostsByUser}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while getting featured post:", error);
		throw error;
	}
};

export const addToCompanyUpdate = async (postId) => {
	try {
		const response = await axiosInstance.post(
			`${API.addToCompanyUpdate}/${postId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while adding featured post:", error);
		throw error;
	}
};
export const addToFeaturedPost = async (postId) => {
	try {
		const response = await axiosInstance.post(
			`${API.addToFeaturedPost}/${postId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while adding featured post:", error);
		throw error;
	}
};

export const removeFromFeaturedPost = async (postId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.removeFromFeaturedPost}/${postId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const removeCompanyUpdatedPost = async (postId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.removeCompanyUpdatePost}/${postId}`
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getCommunityById = async (communityId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getCommunityById}/${communityId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while getting community by id:", error);
		throw error;
	}
};

export const getChatSettings = async (loggedInUserId, otherUserId, chatId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getChatSettings}/${loggedInUserId}/${otherUserId}/${chatId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while getting chat setting:", error);
		throw error;
	}
};

export const getCommunitySettings = async (communityId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getCommunitySettings}/${communityId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while getting chat setting:", error);
		throw error;
	}
};

export const deleteComment = async (postId, commentId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteComment}/${postId}/${commentId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error while deleting the post:", error);
		throw error;
	}
};

export const toggleLikeComment = async (postId, commentId) => {
	try {
		const response = await axiosInstance.post(
			`${API.likeComment}/${postId}/${commentId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error in like comment:", error);
	}
};
export const unsavePost = async (requestBody) => {
	try {
		const response = await axiosInstance.patch(`${API.unsavePost}`, {
			...requestBody,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const reportPost = async (
	postPublicLink,
	postId,
	reportReason,
	reporterEmail,
	reporterId,
	reportTime,
	email
) => {
	try {
		const response = await axiosInstance.post(`${API.reportPost}`, {
			postPublicLink,
			postId,
			reportReason,
			reporterEmail,
			reporterId,
			reportTime,
			email,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const deleteMessage = async (messageId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteMessage}/${messageId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error in delete message:", error);
	}
};

export const fetchNotificationsAPI = async (userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getNotifications}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.log("Error fetching notifications: ", error);
	}
};

export const markNotificationAsReadAPI = async (_id) => {
	try {
		const response = await axiosInstance.patch(
			`${API.markNotificationAsRead}/${_id}`
		);
		return response.data;
	} catch (error) {
		console.log("Error marking notificaiton as read : ", error);
	}
};

export const markAllNotificationsReadAPI = async () => {
	try {
		const response = await axiosInstance.patch(API.markAllNotificationAsRead);
		return response.data;
	} catch (error) {
		console.log("Error marking all notifications as read: ", error);
	}
};

export const getLikeCount = async (postId) => {
	try {
		const response = await axiosInstance.get(`${API.getLikeCount}/${postId}`);
		return response?.data;
	} catch (error) {
		console.log("Error getting like count : ", error);
		throw error;
	}
};

export const searchStartUps = async (searchQuery) => {
	try {
		const response = await axiosInstance.get(
			`${API.searchStartUps}/${searchQuery}`
		);
		return response.data;
	} catch (error) {
		console.log("Error getting startup details : ", error.message);
	}
};

export const addStartUpToUser = async (userId, startUpId) => {
	try {
		const requestBody = {
			userId,
			startUpId,
		};
		const response = await axiosInstance.patch(
			`${API.addStartUpToUser}`,
			requestBody
		);
		return response.data;
	} catch (error) {
		console.log("Error adding startup to user : ", error);
	}
};

export const searchInvestors = async (searchQuery) => {
	try {
		const response = await axiosInstance.get(
			`${API.searchInvestors}/${searchQuery}`
		);
		return response.data;
	} catch (error) {
		console.log("Error getting investor company details : ", error.message);
	}
};

export const addUserAsInvestor = async (userId, investorId) => {
	try {
		const requestBody = {
			userId,
			investorId,
		};
		const response = await axiosInstance.patch(
			`${API.addUserAsInvestor}`,
			requestBody
		);
		return response.data;
	} catch (error) {
		console.log("Error adding startup to user : ", error);
	}
};

export const deleteDocument = async (docId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteDocument}/${docId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error in delete document:", error);
		throw error;
	}
};

export const markMessagesAsReadInCommunities = async (chatId, userId) => {
	try {
		const response = await axiosInstance.patch(
			`${API.markMessagesAsReadInCommunities}/${chatId}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const getUnreadMessageCountInCommunities = async (chatId, userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getUnreadMessageCountInCommunities}/${chatId}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
export const fetchExploreFiltersAPI = async (type) => {
	try {
		const response = await axiosInstance.get(
			`${API.getExploreFilters}?type=${type.toLowerCase()}`
		);
		return response.data;
	} catch (error) {
		console.error("Error in fetching filters in explore:", error);
		throw error;
	}
};

export const fetchExploreFilteredResultsAPI = async (filtersObj) => {
	let filters = "";
	for (const filter in filtersObj) {
		let tempValue = filtersObj[filter];
		if (filter === "gender" || filter === "type") {
			tempValue = tempValue.toLowerCase();
		}
		if (filter === "size") {
			tempValue = tempValue.replace("+", "");
		}
		filters += filter + "=" + tempValue + "&";
	}
	filters = filters.slice(0, filters.length - 1);
	try {
		const response = await axiosInstance.get(
			`${API.getExploreFilteredData}?${filters}`
		);
		return response.data;
	} catch (error) {
		console.log("Error fetching filtered results", error);
		throw error;
	}
};

export const updateCommunity = async (communityId, updatedData) => {
	try {
		const response = await axiosInstance.patch(
			`${API.updateCommunity}/${communityId}`,
			updatedData
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const getUnAddedMembers = async (communityId, userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getUnAddedMembers}/${communityId}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const addMembersToCommunity = async (communityId, memberIds) => {
	try {
		const response = await axiosInstance.patch(
			`${API.addMembersToCommunity}/${communityId}`,
			{ memberIds }
		);
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const createSecretKey = async (secretOneLinkKey) => {
	try {
		const response = await axiosInstance.post(`${API.createSecretKey}`, {
			secretOneLinkKey,
		});
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const validateSecretKey = async (oneLinkId, secretOneLinkKey) => {
	try {
		const response = await axiosInstance.post(`${API.validateSecretKey}`, {
			oneLinkId,
			secretOneLinkKey,
		});
		return response.data;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const getInvestorFromOneLinkAPI = async (oneLink, userId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getInvestorFromOneLink}/${oneLink}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error getting investor from :", error);
		throw error;
	}
};

export const createMeetingLink = async () => {
	try {
		const response = await axiosInstance.post(`${API.createMeetingLink}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
export const validateMeetingAuth = async (code) => {
	try {
		const response = await axiosInstance.post(`${API.validateMeetingAuth}`, {
			code,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
export const createMeetingAPI = async (newMeeting) => {
	try {
		const response = await axiosInstance.post(
			`${API.createMeeting}`,
			newMeeting
		);
		return response.data;
	} catch (error) {
		console.error("Error creating Meeting:", error);
		throw error;
	}
};
export const getAllMeetings = async (oneLinkId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getAllMeetings}/${oneLinkId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error getting meetings:", error);
		throw error;
	}
};

export const deleteMeeting = async (meetingId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteMeeting}/${meetingId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error getting meetings:", error);
		throw error;
	}
};

export const removeConnection = async (userId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.removeConnection}/${userId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error getting meetings:", error);
	}
};

export const requestMeetingAPI = async (meetingId, requestData) => {
	try {
		const response = await axiosInstance.post(
			`${API.requestMeeting}/${meetingId}`,
			requestData
		);
		return response.data;
	} catch (error) {
		console.error("Error requesting meeting:", error);
		throw error;
	}
};

export const getAllMeetingRequests = async () => {
	try {
		const response = await axiosInstance.get(`${API.getAllMeetingRequests}`);
		return response.data;
	} catch (error) {
		console.error("Error getting meeting requests:", error);
		throw error;
	}
};

export const acceptMeetingRequest = async (meetingId, requestId) => {
	try {
		const response = await axiosInstance.post(
			`${API.acceptMeetingRequest}/${meetingId}/${requestId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error accepting request:", error);
		throw error;
	}
};

export const getNotificationCount = async () => {
	try {
		const response = await axiosInstance.get(`${API.getNotificationCount}`);
		return response.data;
	} catch (error) {
		console.error("Error accepting request:", error);
		throw error;
	}
};

export const deleteCommunityAPI = async (communityId) => {
	try {
		const res = await axiosInstance.delete(
			`${API.deleteCommunity}/${communityId}`
		);
		return res.data;
	} catch (error) {
		console.error("Error deleting community:", error);
		throw error;
	}
};

export const exitCommunityAPI = async (communityId, userId) => {
	try {
		const res = await axiosInstance.patch(
			`${API.exitCommunity}/${communityId}/${userId}`
		);
		return res.data;
	} catch (error) {
		console.error("Error exiting community:", error);
		throw error;
	}
};

export const getFoldersApi = async (userId) => {
	try {
		const res = await axiosInstance.get(`${API.getfolders}/${userId}`);
		return res.data;
	} catch (error) {
		console.error("Error in getfolders:", error);
		throw error;
	}
};

export const getAllMileStoneAPI = async () => {
	try {
		const response = await axiosInstance.get(`${API.getAllMileStone}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching all milestones:", error);
		throw error;
	}
};

export const getUserMilestonesAPI = async (onelinkId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getUserMilestones}/${onelinkId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching user milestones:", error);
		throw error;
	}
};

export const addMilestoneToUserAPI = async (milestoneId) => {
	try {
		const response = await axiosInstance.post(
			`${API.addMilestoneToUser}`,
			milestoneId
		);
		return response.data;
	} catch (error) {
		console.error("Error adding milestone to user:", error);
		throw error;
	}
};

export const deleteUserMilestoneAPI = async (oneLinkId, milestoneId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteUserMilestone}/${oneLinkId}/${milestoneId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error deleting milestone:", error);
		throw error;
	}
};

export const googleLoginAPI = async (credential) => {
	try {
		const response = await axiosInstance.post(`${API.googleLogin}`, {
			credential,
		});
		return response.data;
	} catch (error) {
		console.error("Error google sign in:", error);
		throw error;
	}
};

export const googleRegisterApi = async (credential) => {
	try {
		const response = await axiosInstance.post(`${API.googleRegister}`, {
			credential,
		});
		return response.data;
	} catch (error) {
		console.error("Error google sign Up:", error);
		throw error;
	}
};

export const RegisterApi = async (credential) => {
	try {
		const response = await axiosInstance.post(`${API.Register}`, {
			credential,
		});
		return response.data;
	} catch (error) {
		console.error("Error Registering the user:", error);
		throw error;
	}
};

export const getQuestionsAPI = async (query) => {
	try {
		const response = await axiosInstance.get(`${API.getQuestions}/${query}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching question:", error);
		throw error;
	}
};

export const answerQuestionAPI = async (answerObject) => {
	try {
		const response = await axiosInstance.post(
			`${API.answerQuestion}`,
			answerObject
		);
		return response.data;
	} catch (error) {
		console.error("Error updating answer:", error);
		throw error;
	}
};

export const getQuestionCountAPI = async () => {
	try {
		const response = await axiosInstance.get(`${API.getQuestionCount}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching count:", error);
		throw error;
	}
};

export const addRecentExperience = async (userId, experienceData) => {
	try {
		const response = await axiosInstance.patch(
			`${API.addRecentExperience}/${userId}`,
			experienceData
		);
		return response.data;
	} catch (error) {
		console.error("Error adding recent experience:", error);
		throw error;
	}
};

export const addRecentEducation = async (userId, educationData) => {
	try {
		const response = await axiosInstance.patch(
			`${API.addRecentEducation}/${userId}`,
			educationData
		);
		return response.data;
	} catch (error) {
		console.error("Error adding recent education:", error);
		throw error;
	}
};

export const updateRecentEducation = async (educationId, updatedData) => {
	try {
		const response = await axiosInstance.patch(
			`${API.updateRecentEducation}/${educationId}`,
			updatedData
		);
		return response.data;
	} catch (error) {
		console.error("Error updating recent education:", error);
		throw error;
	}
};

export const deleteRecentEducation = async (educationId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteRecentEducation}/${educationId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error deleting recent education:", error);
		throw error;
	}
};

export const updateRecentExperience = async (experienceId, updatedData) => {
	try {
		const response = await axiosInstance.patch(
			`${API.updateRecentExperience}/${experienceId}`,
			updatedData
		);
		return response.data;
	} catch (error) {
		console.error("Error updating recent experience:", error);
		throw error;
	}
};

export const deleteRecentExperience = async (experienceId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteRecentExperience}/${experienceId}
      `
		);
		return response.data;
	} catch (error) {
		console.error("Error deleting recent experience:", error);
		throw error;
	}
};

export const getLastMessage = async (chatId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getLastMessage}/${chatId}
      `
		);
		return response.data;
	} catch (error) {
		console.error("Error getting last message:", error);
		throw error;
	}
};

export const rejectMeetingRequestAPI = async (meetingId, requestId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.rejectMeetingRequest}/${meetingId}/${requestId}`
		);
		return response.data;
	} catch (error) {
		console.error("Error declining meeting:", error);
		throw error;
	}
};

// export const getUserAchievements = async () => {
//   try {
//     const response = await axiosInstance.get(`${API.getUserAchievements}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error declining meeting:", error);
//     throw error;
//   }
// };

export const submitFundingToMailAPI = async (fundingAnswers) => {
	try {
		const response = await axiosInstance.post(
			`${API.submitFundingToMail}`,
			fundingAnswers
		);
		return response.data;
	} catch (error) {
		console.error("Error submitting to mail:", error);
		throw error;
	}
};

export const addNotificationAPI = async (notificationData) => {
	try {
		const response = await axiosInstance.post(
			`${API.addNotificationAPI}`,
			notificationData
		);
		return response.data;
	} catch (error) {
		console.error("Error adding notification:", error);
		throw error;
	}
};

export const getAllChatsAPI = async () => {
	try {
		const response = await axiosInstance.get(`${API.getAllChats}`);
		return response.data;
	} catch (error) {
		console.error("Error getting all chats:", error);
		throw error;
	}
};

export const addPastInvestments = async (investorId, newPastInvestmentData) => {
	try {
		const response = await axiosInstance.patch(
			`${API.addPastInvestments}/${investorId}`,
			newPastInvestmentData
		);
		return response.data;
	} catch (error) {
		console.error("Error while adding past investments:", error);
		throw error;
	}
};

export const liveDeals = async () => {
	try {
		const response = await axiosInstance.get(`${API.getLiveDeals}`);
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const addInvestorToLiveDeal = async (liveDealId) => {
	try {
		const response = await axiosInstance.post(`${API.addInvestorToLiveDeal}`, {
			liveDealId,
		});
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const getPostById = async (postId) => {
	try {
		const response = await axiosInstance.get(`${API.getPostById}`, { postId });
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const subscribe = async (data) => {
	try {
		const response = await axiosInstance.post(`${API.subscription}`, data);
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const updateTrialStartDate = async (data) => {
	try {
		const response = await axiosInstance.post(`${API.subscription}`, data);
		return response.data;
	} catch (err) {
		throw err;
	}
};

export const getSubscriptionUrl = async (orderId) => {
	try {
		const response = await axiosInstance.post(`${API.getPaymentDetail}`, {
			orderId,
		});
		return response.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
};

async function blockUser(userId, blockedUserId) {
	try {
		const response = await axiosInstance.post(API.blockuser, {
			userId,
			blockedUserId,
		});
		return response.data;
	} catch (error) {
		console.error(
			"Error blocking user:",
			error.response?.data || error.message
		);
		throw error;
	}
}

async function unblockUser(userId, unblockUserId) {
	try {
		const response = await axiosInstance.post(API.unblockUser, {
			userId,
			unblockUserId,
		});
		return response.data;
	} catch (error) {
		console.error(
			"Error blocking user:",
			error.response?.data || error.message
		);
		throw error;
	}
}

async function getUserByIdBody(userId) {
	try {
		const response = await axiosInstance.post(API.getUserByIdBody, { userId });
		return response.data;
	} catch (error) {
		console.error("Error:", error.response?.data || error.message);
		throw error;
	}
}

export const getMessageByChatId = async (chatId, currentUserId) => {
	try {
		const { data } = await axiosInstance.get(
			`${API.getMessageByChatId}/${chatId}`,
			{ currentUserId }
		);
		return data;
	} catch (error) {
		console.error("Error getting user message:", error);
		throw error;
	}
};

export const clearChat = async (chatId, userId) => {
	try {
		const response = await axiosInstance.post(`${API.clearChat}/${chatId}`, {
			userId,
		});
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateUserWithTopVoice = async () => {
	try {
		const response = await axiosInstance.patch(`${API.updateTopVoices}`);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getUserAvailability = async () => {
	try {
		const response = await axiosInstance.get(`${API.getUserAvailability}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getInshortsNews = async (language, category) => {
	try {
		const response = await axiosInstance.post(`${API.getInshortNews}`, {
			language,
			category,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getMoreInshortsNews = async (language, category, news_offset) => {
	try {
		const response = await axiosInstance.post(`${API.getMoreInshortNews}`, {
			language,
			category,
			news_offset,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getEventsByOnelinkId = async (onelinkId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getEventsByOnelinkId}/${onelinkId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createWebinar = async (data) => {
	try {
		const response = await axiosInstance.post(`${API.createWebinar}`, data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getAllWebinars = async () => {
	try {
		const response = await axiosInstance.get(`${API.getAllWebinars}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
export const getWebinarsByOnelinkId = async (onelinkId) => {
	try {
		const response = await axiosInstance.get(
			`${API.getWebinarsByOnelinkId}/${onelinkId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteWebinar = async (webinarId) => {
	try {
		const response = await axiosInstance.delete(
			`${API.deleteWebinar}/${webinarId}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createPaymentSessionToJoinWebinar = async (data) => {
	try {
		const response = await axiosInstance.post(
			`${API.createPaymentSessionToJoinWebinar}`,
			data
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const varifyPaymentToJoinWebinar = async (data) => {
	try {
		const response = await axiosInstance.post(
			`${API.varifyPaymentToJoinWebinar}`,
			data
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getUserByUsername = async (username) => {
	try {
		const response = await axiosInstance.get(
			`${API.getUserByUsername}/${username}`
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createPaymentSessionForPriorityDM = async (data) => {
	try {
		const response = await axiosInstance.post(
			`${API.createPaymentSessionForPriorityDM}`,
			data
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const varifyPaymentForPriorityDM = async (data) => {
	try {
		const response = await axiosInstance.post(
			`${API.varifyPaymentForPriorityDM}`,
			data
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getPriorityDMForUser = async () => {
	try {
		const response = await axiosInstance.get(`${API.getPriorityDMForUser}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getPriorityDMForFounder = async () => {
	try {
		const response = await axiosInstance.get(`${API.getPriorityDMForFounder}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getPriorityDMById = async (id) => {
	try {
		const response = await axiosInstance.get(`${API.getPriorityDMById}/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updatePriorityDM = async (id, answer) => {
	try {
		const response = await axiosInstance.patch(
			`${API.updatePriorityDM}/${id}`,
			{ answer }
		);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const sendOneLinkRequest = async (startUpId, userId) => {
	try {
		const response = await axiosInstance.post(`${API.sendOneLinkRequest}`, {
			startUpId,
			userId,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getOneLinkRequest = async (startUpId) => {
	try {
		const response = await axiosInstance.get(`${API.getOneLinkRequest}/${startUpId}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const approveOneLinkRequest = async (startUpId, userId) => {
	try {
		const response = await axiosInstance.post(`${API.approveOneLinkRequest}`, {
			startUpId,
			userId,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const rejectOneLinkRequest = async (startUpId, userId) => {
	try {
		const response = await axiosInstance.post(`${API.rejectOneLinkRequest}`, {
			startUpId,
			userId,
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getThoughts = async () => {
	try {
		const response = await axiosInstance.get(`${API.getThoughts}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
