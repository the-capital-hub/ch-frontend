// import { useState, useCallback } from "react";

// const getStorageKey = (type) => {
// 	switch (type) {
// 		case "question":
// 			return "question";
// 		case "answer":
// 			return "answer";
// 		case "comment":
// 			return "comment";
// 		default:
// 			return "question";
// 	}
// };

// const getEndpoint = (type, id, additionalId) => {
// 	switch (type) {
// 		case "question":
// 			return `/thoughts/upvoteDownvoteQuestion/${id}`;
// 		case "answer":
// 			return `/thoughts/upvoteDownvoteAnswer/${id}/${additionalId}`;
// 		case "comment":
// 			return `/thoughts/upvoteDownvoteComment/${id}/${additionalId}`;
// 		default:
// 			return `/thoughts/upvoteDownvoteQuestion/${id}`;
// 	}
// };

// export const useUpvoteHandler = (baseUrl, type) => {
// 	const storageKey = getStorageKey(type);

// 	const [upvotedIds, setUpvotedIds] = useState(() => {
// 		const stored = localStorage.getItem(storageKey);
// 		if (!stored) return [];
// 		try {
// 			const parsed = JSON.parse(stored);
// 			return parsed.upvote || [];
// 		} catch {
// 			return [];
// 		}
// 	});

// 	const updateLocalStorage = useCallback(
// 		(newUpvotes) => {
// 			try {
// 				const storedData = JSON.parse(
// 					localStorage.getItem(storageKey) || '{"upvote":[]}'
// 				);
// 				storedData.upvote = newUpvotes;
// 				localStorage.setItem(storageKey, JSON.stringify(storedData));
// 			} catch (error) {
// 				console.error("Error updating localStorage:", error);
// 			}
// 		},
// 		[storageKey]
// 	);

// 	const handleUpvote = useCallback(
// 		async (id, additionalId = null) => {
// 			try {
// 				const token = localStorage.getItem("accessToken");
// 				if (!token) {
// 					throw new Error("Authentication required");
// 				}

// 				// For answers and comments, we need both IDs
// 				if ((type === "answer" || type === "comment") && !additionalId) {
// 					throw new Error(`${type} requires both questionId and ${type}Id`);
// 				}

// 				// Use the appropriate ID for localStorage
// 				const storageId = type === "question" ? id : additionalId;

// 				// Optimistic update
// 				setUpvotedIds((prev) => {
// 					const isUpvoted = prev.includes(storageId);
// 					const newUpvotes = isUpvoted
// 						? prev.filter((currId) => currId !== storageId)
// 						: [...prev, storageId];

// 					updateLocalStorage(newUpvotes);
// 					return newUpvotes;
// 				});

// 				// API call with the correct endpoint structure
// 				const response = await fetch(
// 					`${baseUrl}${getEndpoint(type, id, additionalId)}`,
// 					{
// 						method: "PATCH",
// 						headers: {
// 							"Content-Type": "application/json",
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				);

// 				if (!response.ok) {
// 					throw new Error("Failed to update vote");
// 				}

// 				return await response.json();
// 			} catch (error) {
// 				// Revert optimistic update on error
// 				setUpvotedIds((prev) => {
// 					const storageId = type === "question" ? id : additionalId;
// 					const isUpvoted = prev.includes(storageId);
// 					const revertedUpvotes = isUpvoted
// 						? [...prev, storageId]
// 						: prev.filter((currId) => currId !== storageId);

// 					updateLocalStorage(revertedUpvotes);
// 					return revertedUpvotes;
// 				});

// 				console.error("Error handling upvote:", error);
// 				throw error;
// 			}
// 		},
// 		[baseUrl, type, updateLocalStorage]
// 	);

// 	const isUpvoted = useCallback((id) => upvotedIds.includes(id), [upvotedIds]);

// 	return {
// 		upvotedIds,
// 		handleUpvote,
// 		isUpvoted,
// 	};
// };

import { useState, useCallback } from "react";

const getStorageKey = (type) => {
	switch (type) {
		case "question":
			return "question";
		case "answer":
			return "answer";
		case "comment":
			return "comment";
		default:
			return "question";
	}
};

const getEndpoint = (type, id, additionalId, suggestionId) => {
	switch (type) {
		case "question":
			return `/thoughts/upvoteDownvoteQuestion/${id}`;
		case "answer":
			return `/thoughts/upvoteDownvoteAnswer/${id}/${additionalId}`;
		case "comment":
			return `/thoughts/upvoteDownvoteComment/${id}/${additionalId}/${suggestionId}`;
		default:
			return `/thoughts/upvoteDownvoteQuestion/${id}`;
	}
};

export const useUpvoteHandler = (baseUrl, type) => {
	const storageKey = getStorageKey(type);

	const [upvotedIds, setUpvotedIds] = useState(() => {
		const stored = localStorage.getItem(storageKey);
		if (!stored) return [];
		try {
			const parsed = JSON.parse(stored);
			return parsed.upvote || [];
		} catch {
			return [];
		}
	});

	const updateLocalStorage = useCallback(
		(newUpvotes) => {
			try {
				const storedData = JSON.parse(
					localStorage.getItem(storageKey) || '{"upvote":[]}'
				);
				storedData.upvote = newUpvotes;
				localStorage.setItem(storageKey, JSON.stringify(storedData));
			} catch (error) {
				console.error("Error updating localStorage:", error);
			}
		},
		[storageKey]
	);

	const handleUpvote = useCallback(
		async (id, additionalId = null, suggestionId = null) => {
			try {
				const token = localStorage.getItem("accessToken");
				if (!token) {
					throw new Error("Authentication required");
				}

				// Validation for answers and comments
				if (type === "answer" && !additionalId) {
					throw new Error("Answer requires both questionId and answerId");
				}

				if (type === "comment" && (!additionalId || !suggestionId)) {
					throw new Error(
						"Comment requires questionId, answerId, and suggestionId"
					);
				}

				// Use the appropriate ID for localStorage
				const storageId =
					type === "question"
						? id
						: type === "answer"
						? additionalId
						: suggestionId;

				// Optimistic update
				setUpvotedIds((prev) => {
					const isUpvoted = prev.includes(storageId);
					const newUpvotes = isUpvoted
						? prev.filter((currId) => currId !== storageId)
						: [...prev, storageId];

					updateLocalStorage(newUpvotes);
					return newUpvotes;
				});

				// API call with the correct endpoint structure
				const response = await fetch(
					`${baseUrl}${getEndpoint(type, id, additionalId, suggestionId)}`,
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

				return await response.json();
			} catch (error) {
				// Revert optimistic update on error
				setUpvotedIds((prev) => {
					const storageId =
						type === "question"
							? id
							: type === "answer"
							? additionalId
							: suggestionId;

					const isUpvoted = prev.includes(storageId);
					const revertedUpvotes = isUpvoted
						? [...prev, storageId]
						: prev.filter((currId) => currId !== storageId);

					updateLocalStorage(revertedUpvotes);
					return revertedUpvotes;
				});

				console.error("Error handling upvote:", error);
				throw error;
			}
		},
		[baseUrl, type, updateLocalStorage]
	);

	const isUpvoted = useCallback((id) => upvotedIds.includes(id), [upvotedIds]);

	return {
		upvotedIds,
		handleUpvote,
		isUpvoted,
	};
};
