import React, { useEffect, useRef, useState } from "react";
import "./createpostpopup.scss";
import { CiImageOn, CiVideoOn } from "react-icons/ci";
// import { BsLink45Deg } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
	getSinglePostAPI,
	postUserPost,
	updateUserById,
	addNotificationAPI,
	// getStartupByFounderId,
} from "../../../Service/user";
import { getBase64 } from "../../../utils/getBase64";
import FeedPostCard from "../../Investor/Cards/FeedPost/FeedPostCard";
import EasyCrop from "react-easy-crop";
import { s3 } from "../../../Service/awsConfig";
import {
	toggleCreatePostModal,
	selectTheme,
} from "../../../Store/features/design/designSlice";
import toast from "react-hot-toast";
import { loginSuccess } from "../../../Store/features/user/userSlice";
import IconFile from "../../Investor/SvgIcons/IconFile";
import { sharePostLinkedin } from "../../../Service/user";

const IMAGE_MAX_SIZE_MB = 10; // 10MB
const DOCUMENT_MAX_SIZE_MB = 50; // 50MB
const VIDEO_MAX_SIZE_MB = 100; // 100MB

const stripHtmlTags = (html) => {
	const doc = new DOMParser().parseFromString(html, "text/html");
	const textContent = doc.body.textContent || "";
	return `${textContent}
  
          ---posted through TheCapitalHub(TheCapitalHub.in)`;
};

const CreatePostPopUp = ({
	setPopupOpen,
	popupOpen,
	setNewPost,
	respostingPostId,
	appendDataToAllPosts,
}) => {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [postText, setPostText] = useState("");
	const [category, setCategory] = useState("");
	const [shareOnLinkedIn, setShareOnLinkedIn] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const [selectedDocument, setSelectedDocument] = useState(null);
	const [posting, setPosting] = useState(false);
	const [postType, setPostType] = useState("public");
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	// const [croppedImage, setCroppedImage] = useState(null);
	const [pdfThumbnail, setPdfThumbnail] = useState(null);

	// for multiple images
	const [selectedImages, setSelectedImages] = useState([]);
	const [previewImages, setPreviewImages] = useState([]);
	const [currentCropIndex, setCurrentCropIndex] = useState(0);
	const [croppedImages, setCroppedImages] = useState([]);

	const dispatch = useDispatch();
	const theme = useSelector(selectTheme);
	const linkedinToken = localStorage.getItem("linkedinToken");
	const token = localStorage.getItem("accessToken");
	const handleClose = () => {
		setPopupOpen(false);
		dispatch(toggleCreatePostModal());
	};

	const galleryInputRef = useRef(null);
	const documentInputRef = useRef(null);
	const cameraInputRef = useRef(null);

	const handleGalleryButtonClick = () => {
		galleryInputRef.current.click();
	};

	const handleDocumentButtonClick = () => {
		documentInputRef.current.click();
	};

	const handleCameraButtonClick = () => {
		cameraInputRef.current.click();
	};

	const [cropComplete, setCropComplete] = useState(false);
	const [previewVideo, setPreviewVideo] = useState("");
	const [previewVideoType, setPreviewVideoType] = useState("");

	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		const objectUrl = URL.createObjectURL(file);

		// Check file size and type
		const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB

		const files = Array.from(event.target.files);
		if (event.target.name === "image") {
			// Check if adding new images would exceed the limit
			if (selectedImages.length + files.length > 5) {
				alert("You can only upload up to 5 images");
				return;
			}

			// Validate each image file
			const validImages = files.filter((file) => {
				const fileSizeInMB = file.size / (1024 * 1024);
				if (fileSizeInMB > IMAGE_MAX_SIZE_MB) {
					alert(
						`Image ${file.name} exceeds the maximum allowed size of ${IMAGE_MAX_SIZE_MB}MB.`
					);
					return false;
				}
				return file.type.includes("image");
			});

			if (validImages.length === 0) return;

			// Create object URLs for previews
			const newPreviewImages = validImages.map((file) =>
				URL.createObjectURL(file)
			);

			setSelectedImages((prev) => [...prev, ...validImages]);
			setPreviewImages((prev) => [...prev, ...newPreviewImages]);
			setSelectedVideo(null);
			setCroppedImages((prev) => [
				...prev,
				...Array(validImages.length).fill(null),
			]);

			// Start cropping from the first new image
			setCurrentCropIndex(selectedImages.length);
		} else if (event.target.name === "video" && file.type.includes("video")) {
			if (fileSizeInMB > VIDEO_MAX_SIZE_MB) {
				alert(
					`Video size exceeds the maximum allowed size of ${VIDEO_MAX_SIZE_MB}MB.`
				);
				return;
			}
			setPreviewVideoType(file.type);
			setPreviewVideo(objectUrl);
			setSelectedVideo(file);
			setSelectedImage(null);
			// setPdfThumbnail(null);
		} else if (event.target.name === "document") {
			if (fileSizeInMB > DOCUMENT_MAX_SIZE_MB) {
				alert(
					`Document size exceeds the maximum allowed size of ${DOCUMENT_MAX_SIZE_MB}MB.`
				);
				return;
			}
			setSelectedDocument(file);
			setSelectedImage(null);
			setSelectedVideo(null);
			// await renderPdfThumbnail(file);
		}
	};

	const handleQuillChange = (value) => {
		setPostText(value);
	};

	const getCroppedImg = async (imageSrc, crop) => {
		const image = new Image();
		image.src = imageSrc;
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		canvas.width = crop.width;
		canvas.height = crop.height;
		ctx.drawImage(
			image,
			crop.x,
			crop.y,
			crop.width,
			crop.height,
			0,
			0,
			crop.width,
			crop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob(
				(blob) => {
					if (!blob) {
						reject(new Error("Failed to crop image"));
						return;
					}

					const reader = new FileReader();
					reader.readAsDataURL(blob);
					reader.onloadend = () => {
						resolve(reader.result);
					};
				},
				"image/jpeg",
				1
			);
		});
	};

	const onCropComplete = async (croppedArea, croppedAreaPixels) => {
		if (currentCropIndex !== null) {
			const croppedImg = await getCroppedImg(
				previewImages[currentCropIndex],
				croppedAreaPixels
			);
			setCroppedImages((prev) => {
				const newCroppedImages = [...prev];
				newCroppedImages[currentCropIndex] = croppedImg;
				return newCroppedImages;
			});
		}
	};

	const handleNextCrop = () => {
		if (currentCropIndex < selectedImages.length - 1) {
			setCurrentCropIndex((prev) => prev + 1);
		} else {
			setCurrentCropIndex(null);
			setCropComplete(true);
		}
	};

	// Function to remove an image
	const handleRemoveImage = (indexToRemove) => {
		setSelectedImages((prev) => prev.filter((_, i) => i !== indexToRemove));
		setPreviewImages((prev) => {
			// Revoke the URL to prevent memory leaks
			URL.revokeObjectURL(prev[indexToRemove]);
			return prev.filter((_, i) => i !== indexToRemove);
		});
		setCroppedImages((prev) => prev.filter((_, i) => i !== indexToRemove));

		// Adjust currentCropIndex if necessary
		if (currentCropIndex !== null) {
			if (indexToRemove === currentCropIndex) {
				// If we're removing the current image being cropped
				if (currentCropIndex >= selectedImages.length - 1) {
					// If it's the last image, complete cropping
					setCurrentCropIndex(null);
					setCropComplete(true);
				}
				// Otherwise keep the same index as it will now point to the next image
			} else if (indexToRemove < currentCropIndex) {
				// If we're removing an image before the current one, adjust the index
				setCurrentCropIndex((prev) => prev - 1);
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setPosting(true);

		if (!selectedImages.length && !selectedVideo && !selectedDocument) {
			if (!respostingPostId && !postText) {
				return setPosting(false);
			}
		}

		try {
			const postData = new FormData();
			if (respostingPostId) {
				postData.append("resharedPostId", respostingPostId);
			}
			postData.append("description", postText);
			postData.append("category", category);

			if (croppedImages.length === 1) {
				postData.append("image", croppedImages[0]);
			}
			if (croppedImages.length > 1) {
				croppedImages.forEach((image, index) => {
					if (image) {
						postData.append(`images[${index}]`, image);
					}
				});
			}

			if (selectedVideo) {
				const video = await getBase64(selectedVideo);
				postData.append("video", video);
			}

			if (selectedDocument) {
				const timestamp = Date.now();
				const fileName = `${timestamp}_${selectedDocument.name}`;
				const params = {
					Bucket: "thecapitalhubwebsitedocuments",
					Key: `documents/${fileName}`,
					Body: selectedDocument,
				};
				const res = await s3.upload(params).promise();
				postData.append("documentUrl", res.Location);
				postData.append("documentName", selectedDocument.name);
				postData.append("image", res.Location);
			}

			postData.append("postType", postType);

			const response = await postUserPost(postData);
			console.log("Response from postUser Post:", response);
			const newPosts = Array.isArray(response.data)
				? response.data
				: [response.data];
			appendDataToAllPosts(response.data);
			const s3ImageUrl = response.data.image;

			const linkedinText = stripHtmlTags(postText);

			// Check if sharing on LinkedIn
			if (shareOnLinkedIn) {
				const linkedInApiData = {
					owner: `urn:li:person:${loggedInUser.linkedinId}`,
					text: {
						text: linkedinText,
					},
					s3ImageUrl: s3ImageUrl,
					linkedInPostData: {
						owner: `urn:li:person:${loggedInUser.linkedinId}`,
						text: {
							text: linkedinText,
						},
					},
					token: linkedinToken,
				};

				// LinkedIn API call
				await sharePostLinkedin(linkedInApiData);
			}

			// Reset all states
			setPostText("");
			setSelectedImages([]);
			setPreviewImages([]);
			setCroppedImages([]);
			setSelectedVideo(null);
			setSelectedDocument(null);
			setCropComplete(false);
			setCurrentCropIndex(null);
			setNewPost(Math.random());
			handleClose();

			// Handle achievements
			if (!loggedInUser.achievements.includes("6564684649186bca517cd0c9")) {
				const achievements = [...loggedInUser.achievements];
				achievements.push("6564684649186bca517cd0c9");
				const updatedData = { achievements };
				const { data } = await updateUserById(loggedInUser._id, updatedData);
				dispatch(loginSuccess(data.data));
				const notificationBody = {
					recipient: loggedInUser._id,
					type: "achievementCompleted",
					achievementId: "6564684649186bca517cd0c9",
				};
				await addNotificationAPI(notificationBody);
			}
		} catch (error) {
			console.error("Error submitting post:", error);
			toast.error("Error creating post. Please try again.");
		} finally {
			setPosting(false);
		}
	};

	const [repostingPostData, setRepostingPostData] = useState(null);
	const [loadingRepostData, setLoadingRepostData] = useState(false);

	useEffect(() => {
		if (respostingPostId) {
			setLoadingRepostData(true);
			getSinglePostAPI(respostingPostId)
				.then(({ data }) => {
					setRepostingPostData(data);
					setLoadingRepostData(false);
				})
				.catch(() => handleClose());
		}
	}, [respostingPostId]);

	return (
		<>
			{popupOpen && <div className="createpost-background-overlay"></div>}
			<div
				className={`create_post_modal rounded-4 p-md-2 ${
					popupOpen ? "d-block" : ""
				}`}
				tabIndex="-1"
				role="dialog"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="createpost_modal-header">
							<div className="createpostpopup">
								<div className="ceatepost_img_name">
									<img
										src={loggedInUser.profilePicture}
										width={50}
										height={50}
										style={{ objectFit: "cover" }}
										className="rounded-circle"
										alt="profile pic"
									/>
									<span>
										<h2>
											{loggedInUser?.firstName} {loggedInUser.lastName}
										</h2>
										<div
											style={{
												display: "flex",
												width: "110px",
												justifyContent: "space-between",
											}}
										>
											<h6
												className=""
												style={{
													backgroundColor: postType === "public" && "#fd5901",
													color: postType === "public" ? "#fff" : "grey",
													padding: "1px 2px",
													borderRadius: "2px",
													cursor: "pointer",
												}}
												onClick={() => setPostType("public")}
											>
												Public
											</h6>
											<h6
												style={{
													backgroundColor:
														postType === "company" && "rgb(211, 243, 107)",
													color: postType === "company" ? "#000" : "grey",
													padding: "1px 2px",
													borderRadius: "2px",
													cursor: "pointer",
												}}
												onClick={() => setPostType("company")}
											>
												Company
											</h6>
										</div>
									</span>
								</div>
							</div>
							<div>
								<button
									type="button"
									className="close d-flex justify-content-end"
									onClick={handleClose}
									style={{ background: "transparent", border: "none" }}
								>
									<h3 aria-hidden="true" className="m-3">
										&times;
									</h3>
								</button>
							</div>
						</div>

						<div className="modal-body">
							<div className="createpost_text_area">
								<ReactQuill
									value={postText}
									onChange={handleQuillChange}
									placeholder="What would you like to converse about? Write a post..."
									modules={{ toolbar: false }} // Hide the toolbar
									formats={[
										"header",
										"bold",
										"italic",
										"underline",
										"strike",
										"list",
										"bullet",
										"link",
										"image",
										"video",
									]}
									style={{
										height: respostingPostId ? "100px" : "200px",
										color: theme === "dark" ? "white" : "black",
										border: "none",
										overflowY: "auto",
									}}
									className="custom-scrollbar"
								/>

								{loggedInUser.linkedinId && (
									<div className="share-linkedin">
										<input
											type="checkbox"
											id="shareLinkedIn"
											checked={shareOnLinkedIn}
											onChange={() => setShareOnLinkedIn((prev) => !prev)}
										/>
										<label htmlFor="shareLinkedIn">Share on LinkedIn</label>
									</div>
								)}

								{respostingPostId &&
									(loadingRepostData ? (
										<div className="d-flex justify-content-center my-4">
											<h6 className="h6 me-4">Loading post...</h6>
											<div className="spinner-border" role="status">
												<span className="visually-hidden">Loading...</span>
											</div>
										</div>
									) : (
										<FeedPostCard
											repostPreview
											userId={repostingPostData?.user?._id}
											postId={repostingPostData?._id}
											designation={repostingPostData?.user?.designation}
											profilePicture={repostingPostData?.user?.profilePicture}
											description={repostingPostData?.description}
											firstName={repostingPostData?.user?.firstName}
											lastName={repostingPostData?.user?.lastName}
											video={repostingPostData?.video}
											image={repostingPostData?.image}
											createdAt={repostingPostData?.createdAt}
											likes={repostingPostData?.likes}
										/>
									))}
							</div>
						</div>

						{previewImages.length > 0 && currentCropIndex !== null && (
							<div className="d-flex flex-column justify-content-center gap-2">
								<div className="image-cropper">
									<EasyCrop
										image={previewImages[currentCropIndex]}
										crop={crop}
										zoom={zoom}
										onCropChange={setCrop}
										onZoomChange={setZoom}
										onCropComplete={onCropComplete}
									/>
								</div>
								<div className="d-flex justify-content-between align-items-center px-3">
									<span>
										Image {currentCropIndex + 1} of {selectedImages.length}
									</span>
									<button
										className="btn btn-primary btn-sm"
										onClick={handleNextCrop}
									>
										{currentCropIndex < selectedImages.length - 1
											? "Next Image"
											: "Finish Cropping"}
									</button>
								</div>
							</div>
						)}

						{cropComplete && (
							<div className="image-preview-grid">
								{croppedImages.map((img, index) => (
									<div key={index} className="image-preview-item">
										<img
											src={img}
											alt={`preview ${index + 1}`}
											style={{
												maxHeight: selectedImages.length > 1 ? "15vh" : "15vh",
												width: "auto",
												objectFit: "contain",
											}}
										/>
										<button
											className="remove-image-btn"
											onClick={() => handleRemoveImage(index)}
										>
											×
										</button>
									</div>
								))}
							</div>
						)}

						{previewVideo && (
							<video
								key={selectedVideo ? selectedVideo.name : ""}
								controls
								width={"100%"}
							>
								<source src={previewVideo} type={previewVideoType} />
								Your browser does not support the video tag.
							</video>
						)}

						{pdfThumbnail && (
							<div className="pdf-thumbnail">
								<img
									src={pdfThumbnail}
									alt="PDF Thumbnail"
									style={{ maxHeight: "30vh", width: "auto" }}
								/>
							</div>
						)}

						{selectedDocument && !pdfThumbnail && (
							<p>Selected File: {selectedDocument.name}</p>
						)}

						<div className="createpost_modal_footer">
							<div className="modal_footer_container mt-4 mb-3">
								<div className="left_buttons">
									<input
										type="file"
										name="image"
										style={{ display: "none" }}
										ref={galleryInputRef}
										onChange={handleFileChange}
										accept="image/*"
									/>
									<button
										className="white_button hover-text"
										onClick={handleGalleryButtonClick}
									>
										<CiImageOn size={25} style={{ color: "var(--d-l-grey)" }} />
										<span className="tooltip-text top">images</span>
									</button>

									<input
										type="file"
										name="video"
										style={{ display: "none" }}
										ref={cameraInputRef}
										onChange={handleFileChange}
										accept="video/*"
									/>
									<button
										className="white_button hover-text"
										onClick={handleCameraButtonClick}
									>
										<CiVideoOn size={25} style={{ color: "var(--d-l-grey)" }} />
										<span className="tooltip-text top1">video</span>
									</button>

									<input
										type="file"
										name="document"
										style={{ display: "none" }}
										ref={documentInputRef}
										onChange={handleFileChange}
									/>
									<button
										className="white_button hover-text"
										onClick={handleDocumentButtonClick}
									>
										<IconFile
											width="16px"
											height="16px"
											style={{ color: "var(--d-l-grey)" }}
										/>
										<span className="tooltip-text top2">doc</span>
									</button>
								</div>
								<div className="post_button_container">
									{posting ? (
										<button className="post_button" disabled>
											Posting...
										</button>
									) : (
										<button
											className="post_button"
											onClick={handleSubmit}
											disabled={posting}
										>
											Post
										</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CreatePostPopUp;
