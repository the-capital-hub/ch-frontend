import React, { useEffect, useRef, useState } from "react";
import "./investorFeedPostCard.scss";
import fireIcon from "../../../Images/post/like-fire.png";
import TimeAgo from "timeago-react";
import { useSelector } from "react-redux";
import {
	deletePostAPI,
	getPostComment,
	likeUnlikeAPI,
	sendPostComment,
	addToFeaturedPost,
	deleteComment,
	toggleLikeComment,
	unsavePost,
	getLikeCount,
	addToCompanyUpdate,
} from "../../../Service/user";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import SavePostPopUP from "../../../components/PopUp/SavePostPopUP/SavePostPopUP";
import InvestorAfterSuccessPopUp from "../../../components/PopUp/InvestorAfterSuccessPopUp/InvestorAfterSuccessPopUp";
import ModalBSContainer from "../../PopUp/ModalBS/ModalBSContainer/ModalBSContainer";
import ModalBSHeader from "../../PopUp/ModalBS/ModalBSHeader/ModalBSHeader";
import ModalBSFooter from "../../PopUp/ModalBS/ModalBSFooter/ModalBSFooter";
import ModalBSBody from "../../PopUp/ModalBS/ModalBSBody/ModalBSBody";
import IconDelete from "../../Investor/SvgIcons/IconDelete";
import IconComponentAdd from "../../Investor/SvgIcons/IconComponentAdd";
import { FaRegCommentDots, FaCommentDots } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { GoHome } from "react-icons/go";
import BatchImag from "../../../Images/tick-mark.png";
import { PiDotsThreeBold } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { IoMdBookmark } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { BsFire, BsThreeDots } from "react-icons/bs";
import { ImFire } from "react-icons/im";
import { BiRepost } from "react-icons/bi";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import IconReportPost from "../../Investor/SvgIcons/IconReportPost";
import { CiCirclePlus } from "react-icons/ci";
import {
	selectTheme,
	selectVideoAutoplay,
	selectIsMobileView,
} from "../../../Store/features/design/designSlice";
import avatar4 from "../../../Images/avatars/image.png";
import { selectIsInvestor } from "../../../Store/features/user/userSlice";

const FeedPostCard = ({
  postId,
  description,
  firstName,
  lastName,
  location,
  oneLinkId,
  video,
  image,
  images,
  documentUrl,
  documentName,
  createdAt,
  profilePicture,
  designation,
  startUpCompanyName,
  investorCompanyName,
  likes,
  userId,
  fetchAllPosts,
  response,
  repostWithToughts,
  repostInstantly,
  repostLoading,
  repostPreview,
  resharedPostId,
  deletePostFilterData,
  isSinglePost = false,
  setPostData,
  isSubscribed,
  pollOptions,
  handlePollVote,
}) => {
  const [showComment, setShowComment] = useState(isSinglePost);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [savedPostId, setSavedPostId] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSavePopUp, setshowSavePopUp] = useState(false);
  const [likedBy, setLikedBy] = useState(null);
  const [likedByUsers, setLikedByUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const isMobileView = useSelector(selectIsMobileView);
  const isInvestor = useSelector(selectIsInvestor);
  const [likeModal, setLikeModal] = useState(false);
  const [activeHeader, setActiveHeader] = useState(true);

  const theme = useSelector(selectTheme);

  const handleShow = () => setLikeModal(true);
  const handleClose = () => setLikeModal(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleCloseSavePopup = () => {
    setshowSavePopUp(false);
  };
  const handleSavePopUp = () => {
    setshowSavePopUp(true);
  };

  const handleUnsavePost = async (e) => {
    receiveUnSavedPostStatus();
    e.preventDefault();
    const requestBody = {
      userId: loggedInUser._id,
      postId: postId,
    };
    try {
      await unsavePost(requestBody);
    } catch (error) {
    }
  };

  const [showUnsaveSuccess, setShowUnsaveSuccess] = useState(false);
  const receiveUnSavedPostStatus = () => {
    const updatedSavedPostId = savedPostId.filter((id) => id !== postId);
    setSavedPostId(updatedSavedPostId);
  };

  const receiveSavedPostStatus = () => {
    setSavedPostId([...savedPostId, postId]);
  };

  const sendComment = async () => {
    try {
      const commentTextTemp = commentText;
      setCommentText("");
      const commentBody = {
        postId: postId,
        user: {
          _id: loggedInUser._id,
          profilePicture: loggedInUser.profilePicture || avatar4,
          firstName: loggedInUser.firstName,
          lastName: loggedInUser.lastName,
          designation: loggedInUser.designation,
        },
        text: commentTextTemp,
      };
      setComments((prev) => [...prev, commentBody]);

      const requestBody = {
        postId: postId,
        userId: loggedInUser._id,
        text: commentTextTemp,
      };
      const response = await sendPostComment(requestBody);

      if (response) {
        await getPostComment({ postId }).then((res) => {
          setComments(res.data.data);
        });
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const [liked, setLiked] = useState(false);

  const commentlikeUnlikeHandler = async (postId, commentId) => {
    try {
      const result = await toggleLikeComment(postId, commentId);
      const response = await getPostComment({ postId });
      setComments(response.data.data);
    } catch (error) {
      console.error("Error likeDislike comment : ", error);
    }
  };

  useEffect(() => {
    if (!repostPreview) {
      getPostComment({ postId }).then((res) => {
        setComments(res.data.data);
      });

      const fetchSavedPostData = async () => {
        try {
          if (response.data && response.data.length > 0) {
            const allSavedPostDataIds = response.data.reduce(
              (acc, collection) => {
                if (collection.posts && Array.isArray(collection.posts)) {
                  acc = acc.concat(collection.posts);
                }
                return acc;
              },
              []
            );
            setSavedPostId(allSavedPostDataIds);
          }
        } catch (error) {
          console.error("Error fetching saved post collections:", error);
        }
      };

      fetchSavedPostData();
      setLiked(likes?.includes(loggedInUser._id) || null);

      getPostComment({ postId }).then((res) => {
        setComments(res.data.data);
      });
    }
    const outsideClickHandler = (event) => {
      if (
        kebabMenuContainerRef.current &&
        !kebabMenuContainerRef.current.contains(event.target)
      ) {
        setKebabMenuVisible(false);
      }

      if (
        repostContainerRef.current &&
        !repostContainerRef.current.contains(event.target)
      ) {
        setShowRepostOptions(false);
      }
    };

    document.addEventListener("click", outsideClickHandler);

    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  const videoRef = useRef(null);
  const isVideoAutoplay = useSelector(selectVideoAutoplay);

  useEffect(() => {
    const video = videoRef.current;
    let playState = null;

    if (video) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            video.pause();
            playState = false;
          } else {
            video.muted = true;

            if (isVideoAutoplay) {
              video
                .play()
                .then(() => {
                  playState = true;
                })
                .catch((error) => {
                  console.error("Auto-play failed:", error);
                });
            }
          }
        });
      }, {});

      observer.observe(video);

      const onVisibilityChange = () => {
        if (document.hidden || !playState) {
          video.pause();
        } else {
          if (isVideoAutoplay) {
            video
              .play()
              .then(() => {
                playState = true;
              })
              .catch((error) => {
                console.error("Auto-play failed:", error);
              });
          }
        }
      };

      document.addEventListener("visibilitychange", onVisibilityChange);

      return () => {
        observer.unobserve(video);
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }
  }, [video, isVideoAutoplay]);

  const likeUnlikeHandler = async () => {
    try {
      liked ? likes.length-- : likes.length++;
      setLiked(!liked);
      await likeUnlikeAPI(postId);
    } catch (error) {
      !liked ? likes.length-- : likes.length++;
      setLiked(!liked);
    }
  };

  const deleteComments = async (postId, commentId) => {
    try {
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentId
      );
      setComments(updatedComments);
      await deleteComment(postId, commentId);
    } catch (error) {
    }
  };

  const [kebabMenuVisible, setKebabMenuVisible] = useState(false);
  const kebabMenuContainerRef = useRef(null);

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      await deletePostAPI(postId);
      if (isSinglePost) {
        loggedInUser.isInvestor === "true"
          ? navigate("/investor/home")
          : navigate("/home");
      } else {
        deletePostFilterData(postId);
      }
      setLoading(false);
    } catch (error) {
    }
  };

  const [reportReason, setReportReason] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [filingReport, setFilingReport] = useState(false);
  const [showRepostOptions, setShowRepostOptions] = useState(false);

  const repostContainerRef = useRef(null);

  const reportSubmitHandler = () => {
    setFilingReport(true);
    setTimeout(() => {
      setFilingReport(false);
      setShowReportModal(false);
    }, 2000);
  };

  const [showFeaturedPostSuccess, setShowFeaturedPostSuccess] = useState(false);
  const [showCompanyUpdateSuccess, setShowCompanyUpdateSuccess] =
    useState(false);
  const handleAddToFeatured = async (postId) => {
    try {
      const response = await addToFeaturedPost(postId);
      if (response.status === 200) {
        setShowFeaturedPostSuccess(true);
      }
    } catch (error) {
    }
  };
  const handleAddToCompanyPost = async (postId) => {
    try {
      const response = await addToCompanyUpdate(postId);
      if (response.status === 200) {
        setShowCompanyUpdateSuccess(true);
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    getLikeCount(postId)
      .then((data) => {
        setLikedBy(data?.data.likedBy);
        setLikedByUser(data?.data.users);
      })
      .catch((error) => console.log());
  }, [postId]);

  const singleClickTimer = useRef(null);
  const [showImgagePopup, setShowImgagePopup] = useState(false);

  const handleImageOnClick = () => {
    if (!singleClickTimer.current) {
      singleClickTimer.current = setTimeout(() => {
        setShowImgagePopup(true);
        setPostData(JSON.parse(localStorage.getItem("postDetail")));
        const PostData = {
            userId,
            designation,
            startUpCompanyName,
            investorCompanyName,
            profilePicture,
            description,
            firstName,
            lastName,
            oneLinkId,
            video,
            image,
            images,
            documentName,
            documentUrl,
            createdAt,
            likes,
            resharedPostId,
            pollOptions,
        }

        localStorage.setItem("postDetail", JSON.stringify(PostData));
        setPostData(JSON.parse(localStorage.getItem("postDetail")));
        navigate("/investor/post_detail/"+postId);
        singleClickTimer.current = null;
      }, 300);
    } else {
      likeUnlikeHandler();
      clearTimeout(singleClickTimer.current);
      singleClickTimer.current = null;
    }
  };

  const handleSingleImage = () => {
    navigate(isInvestor ? `/investor/post/${postId}` : `/posts/${postId}`);
  };

  // Determine border color based on user type
  const borderColor = startUpCompanyName ? "orange" : investorCompanyName ? "#D3F36B" : "transparent";


  const [localPollOptions, setLocalPollOptions] = useState(pollOptions || []);
  const [isVoting, setIsVoting] = useState(false);


  useEffect(() => {
    if (pollOptions && JSON.stringify(pollOptions) !== JSON.stringify(localPollOptions)) {
      setLocalPollOptions(pollOptions);
    }
  }, [pollOptions]);

  const handleVoteClick = async (optionId) => {
    if (isVoting) return;
    
    try {
      setIsVoting(true);
      const hasVoted = localPollOptions.find(opt => 
        opt._id === optionId && opt.votes?.includes(loggedInUser._id)
      );

      // Optimistic update
      setLocalPollOptions(current =>
        current.map(opt => {
          if (opt._id === optionId) {
            const newVotes = hasVoted
              ? opt.votes.filter(id => id !== loggedInUser._id)
              : [...(opt.votes || []), loggedInUser._id];
            return { ...opt, votes: newVotes };
          }
          return opt;
        })
      );

      // Call API
      if (handlePollVote) {
        const updatedPollOptions = await handlePollVote(postId, optionId);
        if (updatedPollOptions) {
          setLocalPollOptions(updatedPollOptions);
        }
      }
    } catch (error) {
      console.error('Error handling vote:', error);
      // Revert to original state on error
      setLocalPollOptions(pollOptions);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <>
      <div className="feedpostcard_main_container mb-2">
        <div
          className={`box feedpostcard_container mt-2 ${
            repostPreview && "rounded-4 shadow-sm border"
          }`}
        >
          {loading && (
            <div className="d-flex justify-content-center my-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div className="feed_header_container pb-2 ">
            <div className="feedpostcard_content">
              <Link 
                to={isInvestor ? `/investor/user/${firstName?.toLowerCase() + "-" + lastName?.toLowerCase()}/${oneLinkId}` : `/user/${firstName?.toLowerCase() + "-" + lastName?.toLowerCase()}/${oneLinkId}`}
                className="rounded-circle"
                style={{
                  pointerEvents: `${loggedInUser._id === userId ? "none" : "all"}`,
                }}
              >
                <img
                  src={
                    profilePicture || avatar4
                  }
                  width={50}
                  height={50}
                  className="rounded-circle"
                  alt="logo"
                  style={{ objectFit: "cover", border: `3px solid ${borderColor}` }}
                />
              </Link>

              <div className="feedpostcart_text_header my-1">
              <Link
                to={`/user/${firstName?.toLowerCase() + "-" + lastName?.toLowerCase()}/${oneLinkId}`}
                className="text-decoration-none"
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var( --d-l-grey)",
                  pointerEvents: `${loggedInUser._id === userId ? "none" : "all"}`,
                }}
              >
                 {firstName + " " + lastName}{isSubscribed && <img
                      src={BatchImag}
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        objectFit: "contain",
                        marginLeft: "4px",
                        marginBottom: "4px"
                      }}
                      alt="Batch Icon"
                    />}

              </Link>

                <span className=" d-flex flex-column flex-md-row justify-content-between">
                  <span
                    className="d-flex align-items-center"
                    style={{
                      fontSize: "12px",
                      fontWeight: 450,
                      color: "var( --d-l-grey)",
                    }}
                  >
                    <GoHome size={13} />{" "}
                    {designation} at {" "}
                    {investorCompanyName?.companyName
                      ? investorCompanyName?.companyName
                      : startUpCompanyName?.company}
                  </span>
                  <span
                   className="d-flex align-items-center"
                    style={{
                      fontSize: "12px",
                      fontWeight: 450,
                      color: "var( --d-l-grey)",
                    }}
                  >
                    <IoLocationOutline size={13} />
                    {location ? location : "India"}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "var( --d-l-grey)",
                  }}
                >
                  {" "}
                  <TimeAgo
                    className="text-secondary fs-xs"
                    datetime={createdAt}
                    locale=""
                  />
                </span>
              </div>
            </div>

            {!repostPreview && (
              <div className="three_dot pe-2 px-md-4">
                <div
                  className="kebab_menu_container"
                  ref={kebabMenuContainerRef}
                >
                  <PiDotsThreeBold
                    size={35}
                    style={{ fill: "var(--d-l-grey)" }}
                    onClick={() => {
                      setKebabMenuVisible(!kebabMenuVisible);
                    }}
                    onBlurCapture={() => {
                      setTimeout(() => {
                        setKebabMenuVisible(false);
                      }, 100);
                    }}
                  />

                  {kebabMenuVisible && (
                    <ul className="kebab_menu border rounded shadow-sm p-3">
                      {userId === loggedInUser?._id && (
                        <li
                          onClick={() => handleAddToFeatured(postId)}
                          className="d-flex align-items-center gap-1"
                          style={{ color: "var(--d-l-grey)" }}
                        >
                          <IconComponentAdd />
                          <span>Featured</span>
                        </li>
                      )}
                      {userId === loggedInUser?._id && (
                        <li
                          onClick={() => deletePost(postId)}
                          className="d-flex align-items-center gap-1"
                          style={{ color: "var(--d-l-grey)" }}
                        >
                          <IconDelete />
                          <span>Delete</span>
                        </li>
                      )}
                      <li
                        data-bs-toggle="modal"
                        data-bs-target="#reportPostModal"
                        className="d-flex align-items-center gap-1"
                        style={{ color: "var(--d-l-grey)" }}
                      >
                        <IconReportPost />
                        <span>Report</span>
                      </li>
                      {userId === loggedInUser?._id && (
                        <li
                          onClick={() => handleAddToCompanyPost(postId)}
                          className="d-flex align-items-center gap-1"
                          style={{ color: "var(--d-l-grey)" }}
                        >
                          <CiCirclePlus />
                          <span>Company</span>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="para_container w-100" onClick={handleImageOnClick}>
            <div
              className="para_container_text w-100"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            ></div>
            {image && (
              <span key={"image"} 
              className="d-flex">
                <img
                  className="mx-auto"
                  style={{ objectFit: "cover", maxHeight: "30rem" }}
                  width={!repostPreview ? "100%" : "50%"}
                  src={image}
                  alt="Post media"
                />
              </span>
            )}
            {video && (
              <span key={"video"} className="d-flex">
                <video
                  className="mx-auto"
                  width={!repostPreview ? "100%" : "100%"}
                  style={{ maxWidth: "500px" }}
                  controls
                  ref={videoRef}
                >
                  <source alt="post-video" src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </span>
            )}
            {resharedPostId && resharedPostId._id  && (
              <FeedPostCard
                key={resharedPostId._id}
                repostPreview
                userId={resharedPostId?.user?._id}
                postId={resharedPostId?._id}
                designation={resharedPostId?.user?.designation}
                profilePicture={resharedPostId?.user?.profilePicture}
                description={resharedPostId?.description}
                firstName={resharedPostId?.user?.firstName}
                lastName={resharedPostId?.user?.lastName}
                oneLinkId={resharedPostId?.user?.oneLinkId}
                video={resharedPostId?.video}
                image={resharedPostId?.image}
                createdAt={resharedPostId?.createdAt}
                likes={resharedPostId?.likes}
                startUpCompanyName={resharedPostId.user?.startUp}
                investorCompanyName={resharedPostId.user?.investor}
              />
            )}
          </div>

          {localPollOptions && localPollOptions.length > 0 && (
            <div className="poll-section">
              {localPollOptions.map((option) => {
                const totalVotes = localPollOptions.reduce((sum, opt) => 
                  sum + (opt.votes?.length || 0), 0
                );
                const votePercentage = totalVotes === 0 
                  ? 0 
                  : Math.round((option.votes?.length || 0) * 100 / totalVotes);
                const hasVoted = option.votes?.includes(loggedInUser._id);

                return (
                  <div className="poll-option" key={option._id}>
                    <div className="poll-option-content">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${votePercentage}%` }} 
                      />
                      <span className="option-text">{option.option}</span>
                      <span className="vote-count">
                        {option.votes?.length || 0} votes ({votePercentage}%)
                      </span>
                    </div>
                    <button
                      className={`vote-button ${hasVoted ? 'votedInvestorThemeColor' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVoteClick(option._id);
                      }}
                      disabled={isVoting}
                    >
                      {hasVoted ? 'Voted' : 'Vote'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {likes && (
            <span
              className="mx-3 pb-2 pt-2 pe-auto d-flex align-items-center gap-1"
              style={{
                fontSize: "10px",
                cursor: "pointer",
                color: theme === "dark" ? "white" : "black",
                fontWeight: "bold",
              }}
              onClick={() => (likedBy ? handleShow() : "")}
            >
              {likedBy ? (
                <>
                  <BsFire style={{ color: "#fd5901", fontSize: "15px" }} /> <span>{likedBy}</span>
                </>
              ) : (
                <>
                  {likes?.length === 1
                    ? `${likes.length} like`
                    : `${likes.length} likes`}
                </>
              )}
            </span>
          )}
          {!repostPreview && (
            <>
              <hr
                className="mt-1 mb-2 hr"
                style={{ background: "var(--bs-light)", height: "3px" }}
              />
              <div className="row feedpostcard_footer">
                <div className="col-6">
                  <div className="feedpostcard_footer_like_comment d-flex justify-content-around gap-2">
                    {liked ? (
                      <div
                        className="d-flex flex-column align-items-center justify-content-end

                       gap-1"
											>
												<img
													src={fireIcon}
													width={20}
													alt="like post"
													onClick={likeUnlikeHandler}
													style={{ cursor: "pointer" }}
												/>
												<p
													style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
													className="m-0"
												>
													Like
												</p>
											</div>
										) : (
											<div
												className="d-flex flex-column align-items-center justify-content-end
                       gap-1"
											>
												<ImFire
													onClick={likeUnlikeHandler}
													style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
												/>
												<p
													style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
													className="m-0"
												>
													Like
												</p>
											</div>
										)}
										{!showComment ? (
											<div
												className="d-flex flex-column align-items-center justify-content-end
                       gap-1"
											>
												<FaRegCommentDots
													size={20}
													onClick={() => setShowComment((prev) => !prev)}
													style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
												/>
												<p
													style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
													className="m-0"
												>
													Comment
												</p>
											</div>
										) : (
											<div
												className="d-flex flex-column align-items-center justify-content-end
                       gap-1"
											>
												<FaCommentDots
													size={20}
													onClick={() => setShowComment((prev) => !prev)}
													style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
												/>
												<p
													style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
													className="m-0"
												>
													Comment
												</p>
											</div>
										)}
									</div>
								</div>

								<div className=" col-6 d-flex align-items-center gap-1 justify-content-around">
									<span
										className={`repost_container rounded-4 ${
											showRepostOptions ? "bg-light" : ""
										}`}
										ref={repostContainerRef}
									>
										<div
											className="d-flex flex-column align-items-center justify-content-end
                       gap-1"
										>
											<BiRepost
												onClick={() => setShowRepostOptions(!showRepostOptions)}
												style={{
													cursor: "pointer",
													transform: "rotate(90deg)",
													fill: "var(--d-l-grey)",
												}}
												size={20}
											/>
											<p
												style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
												className="m-0"
											>
												Repost
											</p>
										</div>
										{showRepostOptions && (
											<span className="repost_options border rounded shadow-sm">
												<button
													className="single_option btn text-start py-1 px-1 rounded border-bottom"
													onClick={() => repostWithToughts(postId)}
												>
													{!repostLoading?.withThoughts ? (
														<FaRegEdit size={20} />
													) : (
														<div
															className="spinner-border text-secondary"
															role="status"
														>
															<span className="visually-hidden">
																Loading...
															</span>
														</div>
													)}
													<div className="d-flex flex-column g-1 ">
														<span className="title">
															Repost with your thoughts
														</span>
														<span className="description">
															Create a new post
														</span>
													</div>
												</button>
												<button
													className="single_option btn text-start py-1 ps-0 rounded border-bottom"
													onClick={() => repostInstantly(postId)}
												>
													{!repostLoading?.instant ? (
														<BiRepost
															size={30}
															style={{ transform: "rotate(90deg)" }}
														/>
													) : (
														<div
															className="spinner-border text-secondary"
															role="status"
														>
															<span className="visually-hidden">
																Loading...
															</span>
														</div>
													)}
													<div className="d-flex flex-column g-1 ">
														<span className="title">Repost Instantly</span>
														<span className="description">
															Instantly bring to other's feed
														</span>
													</div>
												</button>
											</span>
										)}
									</span>
									{savedPostId.includes(postId) ? (
										<div
											className="d-flex flex-column align-items-center justify-content-end
                       gap-1"
										>
											<IoMdBookmark
												size={20}
												onClick={handleUnsavePost}
												style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
											/>
											<p
												style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
												className="m-0"
											>
												Save
											</p>
										</div>
									) : (
										<div
											className="d-flex flex-column align-items-center justify-content-end
                    gap-1"
										>
											<CiBookmark
												size={20}
												onClick={handleSavePopUp}
												style={{ cursor: "pointer", fill: "var(--d-l-grey)" }}
											/>
											<p
												style={{ color: "var(--d-l-grey)", fontSize: "10px" }}
												className="m-0"
											>
												Save
											</p>
										</div>
									)}
								</div>

								{showComment && (
									<div className="border-top mt-1">
										<div className="comment_container mb-1 border-bottom">
											<div className="logo">
												<img
													src={loggedInUser.profilePicture}
													alt="Logo"
													className="border border-light"
												/>
											</div>
											<section className="input_and_logo_section">
												<div className="input_box px-1">
													<input
														type="text"
														placeholder="Add a comment"
														className="fs-14"
														value={commentText}
														onChange={(e) => setCommentText(e.target.value)}
														onKeyDown={(e) => {
															if (e.key === "Enter") {
																e.preventDefault();
																sendComment();
															}
														}}
													/>
												</div>
												<button
													type="button"
													className="btn btn-startup"
													onClick={() => sendComment()}
												>
													Post
												</button>
											</section>
										</div>
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
										{comments.map((val) => (
											<section
												className="single-comment row m-0 mt-2"
												key={val._id}
											>
												<div className="img_container col-2 px-2">
													<Link
														to={`/investor/user/${
															val.user?.firstName?.toLowerCase() +
															"." +
															val.user?.lastName?.toLowerCase()
														}/${val.user.oneLinkId}`}
														style={{
															pointerEvents: `${
																loggedInUser._id === val.user._id
																	? "none"
																	: "all"
															}`,
														}}
													>
														<img
															src={val.user.profilePicture || avatar4}
															alt="Connection"
															className="w-100 rounded-circle border border-light"
														/>
													</Link>
												</div>
												<div className="col-10 p-0 flex-grow-1">
													<div className="comment-details  rounded-3 p-2 p-lg-3 d-flex flex-column">
														<header className="d-flex justify-content-between align-items-center p-0">
															<Link
																to={`/investor/user/${
																	val.user?.firstName.toLowerCase() +
																	"." +
																	val.user?.lastName.toLowerCase()
																}/${val.user.oneLinkId}`}
																className="text-decoration-none  fs-sm"
																style={{
																	pointerEvents: `${
																		loggedInUser._id === val.user._id
																			? "none"
																			: "all"
																	}`,
																}}
															>
																<h6 className="fs-sm m-0">
																	{val.user.firstName + " " + val.user.lastName}
																</h6>
															</Link>
															<span className="days_time fs-xs">
																<TimeAgo datetime={val.createdAt} locale="" />
															</span>
														</header>
														<span className=" fs-xs m-0">
															{val.user?.designation}
															{" , "}{" "}
															{val.user?.startUp?.company ||
																val.user?.investor?.companyName}
														</span>
														<p className="comment m-0 fs-sm mt-1">{val.text}</p>
													</div>
													<div className="actions d-flex gap-2 px-1 align-items-center justify-content-between">
														<div>
															{val?.likes?.includes(loggedInUser._id) ? (
																<img
																	src={fireIcon}
																	width={15}
																	alt="like post"
																	onClick={() =>
																		commentlikeUnlikeHandler(postId, val._id)
																	}
																/>
															) : (
																<ImFire
																	onClick={() =>
																		commentlikeUnlikeHandler(postId, val._id)
																	}
																	style={{
																		cursor: "pointer",
																		fill: "var(--d-l-grey)",
																	}}
																/>
															)}
															<span className="mx-2 text-secondary fs-sm">
																{val?.likes?.length} likes
															</span>
														</div>
														{val.user._id === loggedInUser?._id && (
															<span
																onClick={() => deleteComments(postId, val._id)}
																style={{ cursor: "pointer" }}
															>
																<MdDelete style={{ fill: "var(--d-l-grey)" }} />
															</span>
														)}
													</div>
												</div>
											</section>
										))}
									</div>
								)}
							</div>
						</>
					)}
				</div>

				{showSavePopUp && (
					<SavePostPopUP
						postId={postId}
						savedPostStatus={receiveSavedPostStatus}
						onClose={handleCloseSavePopup}
					/>
				)}
				{showSuccess && (
					<InvestorAfterSuccessPopUp
						withoutOkButton
						onClose={() => setShowSuccess(!showSuccess)}
						successText="Post saved Successfully"
					/>
				)}
				{showUnsaveSuccess && (
					<InvestorAfterSuccessPopUp
						withoutOkButton
						onClose={() => setShowUnsaveSuccess(!showUnsaveSuccess)}
						successText="Post unsaved Successfully"
					/>
				)}
				{showFeaturedPostSuccess && (
					<InvestorAfterSuccessPopUp
						withoutOkButton
						onClose={() => setShowFeaturedPostSuccess(!showFeaturedPostSuccess)}
						successText="The post has been added as a featured post."
					/>
				)}
				{showCompanyUpdateSuccess && (
					<InvestorAfterSuccessPopUp
						withoutOkButton
						onClose={() =>
							setShowCompanyUpdateSuccess(!showCompanyUpdateSuccess)
						}
						successText="The post has been added as a company updates."
					/>
				)}
			</div>

			<Modal
				show={likeModal}
				onHide={handleClose}
				centered
				data-bs-theme={theme}
				id="reactionsModalStartup"
			>
				<Modal.Header closeButton>
					<Modal.Title>Reactions</Modal.Title>
				</Modal.Header>
				<div className=" reactions_investor d-flex gap-4 border-bottom border-1 py-2 px-3">
					<h6
						className={`nav-item m-0 ${
							activeHeader === true ? "active" : "text-secondary"
						}`}
						onClick={() => setActiveHeader(true)}
					>
						All
					</h6>
					<h6
						className={`nav-item m-0 ${
							activeHeader === false ? "active" : "text-secondary"
						}`}
						onClick={() => setActiveHeader(false)}
					>
						Likes
					</h6>
				</div>
				<Modal.Body>
					{likedByUsers?.map((user) => (
						<div
							className="user-list d-flex align-items-center gap-2 p-2 border-bottom border-1"
							key={user._id}
						>
							<img src={user.profilePicture} alt="user" />
							<div>
								<h6 className="m-0">
									{user.firstName} {user.lastName}
								</h6>
								<p className="m-0 text-secondary fs-xs">{user.designation}</p>
							</div>
						</div>
					))}
				</Modal.Body>
			</Modal>

			<ModalBSContainer id="reportPostModal">
				<ModalBSHeader title="Report Post" className={"d-l-grey"} />
				<ModalBSBody className={"d-l-grey"}>
					<h6 className="h6">Select a reason that applies</h6>
					<div className="reasons_container">
						<div className="form-check form-check-inline m-0">
							<input
								className="form-check-input"
								type="radio"
								name="reportReason"
								onChange={({ target }) => setReportReason(target.value)}
								id="inlineRadio1"
								value="Harassment"
								hidden
							/>
							<label
								className={`form-check-label ${
									reportReason === "Harassment" && "bg-secondary text-white"
								}`}
								htmlFor="inlineRadio1"
							>
								Harassment
							</label>
						</div>
						<div className="form-check form-check-inline m-0">
							<input
								className="form-check-input"
								type="radio"
								name="reportReason"
								onChange={({ target }) => setReportReason(target.value)}
								id="inlineRadio2"
								value="Spam"
								hidden
							/>
							<label
								className={`form-check-label ${
									reportReason === "Spam" && "bg-secondary text-white"
								}`}
								htmlFor="inlineRadio2"
							>
								Spam
							</label>
						</div>
						<div className="form-check form-check-inline m-0">
							<input
								className="form-check-input"
								type="radio"
								name="reportReason"
								onChange={({ target }) => setReportReason(target.value)}
								id="inlineRadio3"
								value="Fraud or scam"
								hidden
							/>
							<label
								className={`form-check-label ${
									reportReason === "Fraud or scam" && "bg-secondary text-white"
								}`}
								htmlFor="inlineRadio3"
							>
								Fraud or scam
							</label>
						</div>
						<div className="form-check form-check-inline m-0">
							<input
								className="form-check-input"
								type="radio"
								name="reportReason"
								onChange={({ target }) => setReportReason(target.value)}
								id="inlineRadio4"
								value="Hateful Speech"
								hidden
							/>
							<label
								className={`form-check-label ${
									reportReason === "Hateful Speech" && "bg-secondary text-white"
								}`}
								htmlFor="inlineRadio4"
							>
								Hateful Speech
							</label>
						</div>
					</div>
					<h6 className="h6 mt-3 text-decoration-underline">
						Looking for something else?
					</h6>
					<span>
						Sometimes our members prefer not to see certain kinds of content,
						rather than reporting.
					</span>
				</ModalBSBody>
				<ModalBSFooter cancel cancelClass="cancel_button btn">
					{!filingReport ? (
						<button
							type="submit"
							className="submit_button btn"
							onClick={reportSubmitHandler}
						>
							Submit report
						</button>
					) : (
						<button className="submit_button btn" type="button" disabled>
							<span role="status" className="me-1">
								Submit report
							</span>
							<span
								className="spinner-border spinner-border-sm"
								aria-hidden="true"
							></span>
						</button>
					)}
				</ModalBSFooter>
			</ModalBSContainer>
		</>
	);
};

export default FeedPostCard;
