import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import "./FeaturedPostCard.scss";
import TimeAgo from "timeago-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import DOMPurify from "dompurify";  // Import DOMPurify
import IconDeleteFill from "../../SvgIcons/IconDeleteFill";
import { deletePostAPI, userPosts } from "../../../../Service/user";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import avatar from "../../../../Images/avatars/image.png";
import avatar1 from "../../../../Images/avatars/image-1.png";
import avatar2 from "../../../../Images/avatars/image-2.png";
import avatar3 from "../../../../Images/avatars/image-3.png";
import avatar4 from "../../../../Images/avatars/image-4.png";

const MyPostCard = ({
  postId,
  description,
  firstName,
  lastName,
  video,
  image,
  createdAt,
  profilePicture,
  designation,
  userId,
  setIsDeleteSuccessful,
  postDelete,
  setUser,
  setAllPosts,
}) => {
  const [expanded, setExpanded] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRemovePost = async (postId) => {
    setLoading(true);
    const response = await deletePostAPI(postId);
    if (response.status === 200) {
      userPosts().then(({ data }) => {
        setUser(data.userData);
        setAllPosts(data.allPosts);
      });
    } else if (response.status === 500) {
      setError(response.message);
      setLoading(false);
    }
  };

  // Sanitize description for safe rendering
  const sanitizedDescription = DOMPurify.sanitize(description);

  return (
    <>
      <div className="featuredpostcard_main_container mb-2">
        <div className="featuredpostcard_container mt-2 rounded-4 shadow-sm border">
          <div className="feed_header_container p-2 border-bottom">
            <div className="feedpostcard_content w-100" style={{ justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <img
                  src={
                    profilePicture ||
                    avatar2
                  }
                  style={{ width: "50px", height: "50px", objectFit:"cover" }}
                  className="rounded-circle"
                  alt="logo"
                />
                <div className="feedpostcart_text_header my-1">
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var(--d-l-grey)",
                    }}
                  >
                    {firstName + " " + lastName}
                  </span>
                  <span className="d-flex flex-column flex-md-row flex-wrap">
                    <span
                      className="d-flex"
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "var(--d-l-grey)",
                        alignItems: "center",
                      }}
                    >
                      <GoHome size={15} />
                      <p style={{ marginBottom: 0 }}>
                        {designation}, {userId?.startUp?.company}
                      </p>
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "var(--d-l-grey)",
                      }}
                    >
                      <IoLocationOutline size={15} />
                      Bangalore, India
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "var(--d-l-grey)",
                    }}
                  >
                    <TimeAgo datetime={createdAt} locale="" />
                  </span>
                </div>
              </div>

              {userId === loggedInUser._id && postDelete && (
                <div className="align-self-start">
                  <button
                    className="btn_base_sm"
                    onClick={() => handleRemovePost(postId)}
                  >
                    {loading ? (
                      <SpinnerBS
                        colorClass={"text-danger"}
                        spinnerSizeClass="spinner-border-sm"
                      />
                    ) : (
                      <IconDeleteFill height="1.25rem" width="1.25rem" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="para_container w-100 p-2">
            <div className="para_container_text w-100 d-flex flex-column gap-2">
              <p
                style={{
                  fontSize: "13px",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
                className=""
                dangerouslySetInnerHTML={{
                  __html: expanded
                    ? sanitizedDescription
                    : sanitizedDescription.split(" ").slice(0, 15).join(" "),
                }}
              />
              {!expanded && sanitizedDescription.split(" ").length > 15 && (
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setExpanded(!expanded)}
                  className="text-secondary"
                >
                  ...Read more
                </span>
              )}
              {expanded && (
                <span
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => setExpanded(!expanded)}
                  className="text-secondary"
                >
                  ...See Less
                </span>
              )}
              {image && (
                <span className="d-flex" style={{ maxHeight: "250px" }}>
                  <img
                    className="mx-auto rounded-4 my-2"
                    style={{ objectFit: "cover" }}
                    width={"100%"}
                    src={image}
                    alt="post media"
                  />
                </span>
              )}
              {video && (
                <span className="d-flex">
                  <video
                    className="mx-auto my-2"
                    width={"100%"}
                    style={{ maxWidth: "500px" }}
                    controls
                  >
                    <source alt="post-video" src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPostCard;
