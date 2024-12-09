import React, { useRef, useEffect, useState } from "react";
import BatchImag from "../../../Images/tick-mark.png";
import { MdBusinessCenter } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { ImFire } from "react-icons/im";
import { BiRepost } from "react-icons/bi";
import { FaShare } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";
import { Link } from "react-router-dom";
import TimeAgo from "timeago-react";
import DOMPurify from "dompurify";
import ImageCarousel from "../../Investor/Cards/FeedPost/ImageCarousel/ImageCarousel";
import "./PostCard.scss";

const PostCard = ({
	firstName,
	lastName,
	profilePicture,
	oneLinkId,
	borderColor,
	isSubscribed,
	investorCompanyName,
	startUpCompanyName,
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
	theme,
}) => {
	const videoRef = useRef(null);
	const [commentToggle, setCommentToggle] = useState(false);
	const [expanded, setExpanded] = useState(false);
	// Initialize localPollOptions with pollOptions
	// const [localPollOptions, setLocalPollOptions] = useState(pollOptions || []);

	const handleBtnClick = (feature) => {
		alert(
			`You need to login first! to use all the features of Capital Hub. Including ${feature} post feature.`
		);
	};
	// console.log("pollOptions", pollOptions);
	const toggleDescription = (e) => {
		e.stopPropagation();
		setExpanded(!expanded);
	};
	return (
		<>
			<div className={`box feedpostcard_container ${theme}`}>
				<div className="feed_header_container pb-2 ">
					<div className="feedpostcard_content">
						<Link
							to={`/user/${
								firstName?.toLowerCase() + "-" + lastName?.toLowerCase()
							}/${oneLinkId}`}
							className="rounded-circle"
						>
							<img
								src={
									profilePicture ||
									"https://res.cloudinary.com/drjt9guif/image/upload/v1692264454/TheCapitalHub/users/default-user-avatar_fe2ky5.webp"
								}
								width={50}
								height={50}
								className="rounded-circle"
								alt="logo"
								style={{
									objectFit: "cover",
									border: `3px solid ${borderColor}`,
								}}
							/>
						</Link>

						<div className="feedpostcart_text_header my-1">
							<Link
								to={`/user/${
									firstName?.toLowerCase() + "-" + lastName?.toLowerCase()
								}/${oneLinkId}`}
								className="text-decoration-none"
								style={{
									fontSize: "18px",
									fontWeight: 600,
									color: "var(--d-l-grey)",
								}}
							>
								{firstName + " " + lastName}
								{isSubscribed && (
									<img
										src={BatchImag}
										style={{
											width: "1.2rem",
											height: "1.2rem",
											objectFit: "contain",
											marginLeft: "4px",
											marginBottom: "4px",
										}}
										alt="Batch Icon"
									/>
								)}
								<button className="btn connect_button_feed d-inline">
									<span>Follow</span>
								</button>
							</Link>

							<div className="info-container">
								<span className="d-flex align-items-center designation-location">
									<span
										className="d-flex align-items-center"
										style={{
											fontSize: "12px",
											fontWeight: 450,
											color: "var(--d-l-grey)",
										}}
									>
										<MdBusinessCenter size={15} />
										&nbsp;{designation} at{" "}
										{investorCompanyName?.companyName
											? investorCompanyName?.companyName
											: startUpCompanyName?.company}
									</span>
									<span
										className="d-flex align-items-center location"
										style={{
											fontSize: "12px",
											fontWeight: 450,
											color: "var(--d-l-grey)",
											marginLeft: "10px",
										}}
									>
										<IoLocationOutline size={13} />
										&nbsp;
										{location ? location : "Bangalore"}
									</span>
								</span>
							</div>

							<span
								style={{
									fontSize: "12px",
									fontWeight: 500,
									color: "var(--d-l-grey)",
								}}
							>
								<TimeAgo
									className="text-secondary fs-xs"
									datetime={createdAt}
									locale=""
								/>
							</span>
						</div>
					</div>
				</div>

				<div className="para_container w-100">
					{/* <div
						className="para_container_text w-100"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(description),
						}}
					></div> */}
					<div
						className="para_container_text w-100"
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(
								expanded ? description : description?.substring(0, 100) + "..."
							),
						}}
					></div>
					{description?.length > 100 && (
						<span
							onClick={toggleDescription}
							className={`read-more-text ${
								expanded ? "expanded" : ""
							} para_container_text w-100`}
						>
							{expanded ? "Read Less" : "Read More"}
						</span>
					)}

					{image && (
						<span className="d-flex">
							<img
								className="mx-auto"
								style={{ objectFit: "cover", maxHeight: "30rem" }}
								width={"100%"}
								src={image}
								alt="Post media"
							/>
						</span>
					)}

					{images && images.length > 0 && <ImageCarousel images={images} />}
					{pollOptions && pollOptions.length > 0 && (
						<div className="poll-section">
							{pollOptions.map((option) => {
								const totalVotes = pollOptions.reduce(
									(sum, opt) => sum + (opt.votes?.length || 0),
									0
								);
								const votePercentage =
									totalVotes > 0
										? Math.round(
												((option.votes?.length || 0) * 100) / totalVotes
										  )
										: 0;

								return (
									<div key={option._id} className="poll-option">
										<div
											className="poll-option-content"
											style={{
												position: "relative",
												overflow: "hidden",
											}}
										>
											<div
												className="progress-bar"
												style={{
													width: `${votePercentage}%`,
													position: "absolute",
													left: 0,
													top: 0,
													height: "100%",
													background: "rgba(253, 89, 1, 0.1)",
													transition: "width 0.3s ease",
												}}
											/>
											<span className="option-text">{option.option}</span>
											<span className="vote-count">
												{option.votes?.length || 0} votes
											</span>
										</div>
										<button
											disabled
											className={`vote-button "votedStartUpThemeColor"`}
											onClick={(e) => {
												e.stopPropagation();
												// handlePollVote(postId, option._id);
											}}
										>
											{"Sign Up to Vote"}
										</button>
									</div>
								);
							})}
						</div>
					)}

					{video && (
						<span className="d-flex">
							<video
								className="mx-auto"
								width={"100%"}
								style={{ maxWidth: "500px" }}
								controls
								ref={videoRef}
							>
								<source alt="post-video" src={video} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</span>
					)}
				</div>

				{likes && (
					<span
						className="px-3 pb-2 pt-2 pe-auto d-flex align-items-center gap-1 border-bottom"
						style={{
							fontSize: "10px",
							cursor: "pointer",
							color: "white",
							fontWeight: "bold",
						}}
					></span>
				)}

				<div className="row feedpostcard_footer">
					<div className="d-flex align-items-center gap-1 justify-content-around pt-2 pb-2">
						<div className="d-flex flex-column align-items-center justify-content-end gap-1">
							<ImFire
								style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
								onClick={() => handleBtnClick("Like")}
							/>
							<p
								style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
								className="m-0"
							>
								Like
							</p>
						</div>

						<div className="d-flex flex-column align-items-center justify-content-end gap-1">
							<div className="d-flex flex-column align-items-center justify-content-end gap-1">
								<FaCommentDots
									size={20}
									style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
									onClick={() => setCommentToggle(!commentToggle)}
								/>
								<p
									style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
									className="m-0"
								>
									Comment
								</p>
							</div>
						</div>

						<div className="d-flex flex-column align-items-center gap-1">
							<FaShare
								size={20}
								style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
								onClick={() => handleBtnClick("Share")}
							/>
							<p
								style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
								className="m-0"
							>
								Share
							</p>
						</div>

						<span className="repost_container rounded-4">
							<div className="d-flex flex-column align-items-center justify-content-end gap-1">
								<BiRepost
									style={{
										cursor: "pointer",
										transform: "rotate(90deg)",
										fill: "var(--d-l-grey)",
									}}
									size={20}
									onClick={() => handleBtnClick("Repost")}
								/>
								<p
									style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
									className="m-0"
								>
									Repost
								</p>
							</div>
						</span>

						<div className="d-flex flex-column align-items-center justify-content-end gap-1">
							<CiBookmark
								size={20}
								style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
								onClick={() => handleBtnClick("Save")}
							/>
							<p
								style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
								className="m-0"
							>
								Save
							</p>
						</div>
					</div>

					<div
						className={`comment-container-wrapper ${
							commentToggle ? "show" : ""
						}`}
					>
						<div className="mt-1">
							{comments?.length ? (
								<span
									className="fs-6 ps-2 mb-2"
									style={{ color: "var(--d-l-grey)" }}
								>
									Comments
								</span>
							) : (
								<span className="fs-6 ps-2 mb-2 w-100 d-flex justify-content-center text-center">
									No comments
								</span>
							)}
							{comments?.map((val) => (
								<section className="single-comment row m-0 mt-2" key={val._id}>
									<div className="col-10 p-0 flex-grow-1">
										<div className="comment-details rounded-3 p-2 p-lg-3 d-flex flex align-items-center">
											<div className="img_container col-2 px-2">
												<Link
													to={`/user/${
														val.user?.firstName?.toLowerCase() +
														"-" +
														val.user?.lastName?.toLowerCase()
													}/${val.user.oneLinkId}`}
												>
													<img
														src={val.user.profilePicture || ""}
														alt="Connection"
														className="w-12 h-12 rounded-circle"
													/>
												</Link>
											</div>
											<div className="d-flex flex-column">
												<header className="d-flex justify-content-between align-items-center p-0">
													<Link
														to={`/user/${
															val.user?.firstName?.toLowerCase() +
															"-" +
															val.user?.lastName?.toLowerCase()
														}/${val.user?.oneLinkId}`}
														className="text-decoration-none fs-sm"
													>
														<h6 className="fs-sm m-0">
															{val.user?.firstName + " " + val.user?.lastName}
														</h6>
													</Link>
													<span className="days_time fs-xs">
														<TimeAgo datetime={val.createdAt} locale="" />
													</span>
												</header>
												<span className="fs-sm m-0">
													{val.user?.designation}
													{" , "}{" "}
													{val.user?.startUp?.company ||
														val.user?.investor?.companyName}
												</span>
												<p className="comment m-0 fs-xs mt-1">{val.text}</p>
											</div>
										</div>
										<div className="actions d-flex gap-2 px-1 align-items-center justify-content-between">
											<div>
												<ImFire
													style={{
														cursor: "pointer",
														fill: "var(--d-l-grey)",
													}}
												/>
												<span className="mx-2 text-secondary fs-sm">
													{val?.likes?.length} likes
												</span>
											</div>
										</div>
									</div>
								</section>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PostCard;
