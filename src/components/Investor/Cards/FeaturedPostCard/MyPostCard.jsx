import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import "./FeaturedPostCard.scss";
import TimeAgo from "timeago-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import IconDeleteFill from "../../SvgIcons/IconDeleteFill";
import { deletePostAPI, userPosts } from "../../../../Service/user";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";

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
  // States for handling remove post from featured post
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle remove post from featured posts
  const handleRemovePost = async (postId) => {
    // set loading = true
    setLoading(true);
    const response = await deletePostAPI(postId);
    console.log(response.status);
    if (response.status === 200) {
      userPosts().then(({ data }) => {
        console.log("ft", data);
        setUser(data.userData);
        setAllPosts(data.allPosts);
      });
    } else if (response.status === 500) {
      // Show error message in a toast or tooltip
      setError(response.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="featuredpostcard_main_container mb-2">
        {/* <div className="col-12"> */}
        <div className=" featuredpostcard_container mt-2 rounded-4 shadow-sm border">
          <div className="feed_header_container p-2 border-bottom ">
            <div
              className="feedpostcard_content w-100"
              style={{ justifyContent: "space-between" }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={
                    profilePicture ||
                    "https://res.cloudinary.com/drjt9guif/image/upload/v1692264454/TheCapitalHub/users/default-user-avatar_fe2ky5.webp"
                  }
                  style={{ width: "50px", height: "50px" }}
                  className="rounded-circle"
                  alt="logo"
                />

                <div className="feedpostcart_text_header my-1">
                  {/* Fullname */}
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "var( --d-l-grey)",
                    }}
                  >
                    {firstName + " " + lastName}
                  </span>
                  {/* Details */}
                  <span className="d-flex flex-column flex-md-row flex-wrap">
                    <span
                      className="d-flex"
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "var( --d-l-grey)",
                        alignItems: "center",
                      }}
                    >
                      {/* <img src={HomeIcon} alt="logo" /> */}
                      <GoHome size={15} />
                      <p style={{ marginBottom: 0 }}>
                        {designation}, {userId?.startUp?.company}
                      </p>
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "var( --d-l-grey)",
                      }}
                    >
                      {/* <img src={locationIcon} alt="logo" /> */}
                      <IoLocationOutline size={15} />
                      Bangalore, India
                    </span>
                  </span>
                  {/* Time ago */}
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      color: "var( --d-l-grey)",
                    }}
                  >
                    <TimeAgo datetime={createdAt} locale="" />
                  </span>
                </div>
              </div>

              {/*Show Delete featured post if userId=loggedInUser._id */}
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
          <div className="para_container w-100 p-2 ">
            <div className="para_container_text w-100 d-flex flex-column gap-2 ">
              <p
                style={{
                  fontSize: "13px",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
                className=""
              >
                {expanded
                  ? description
                  : description.split(" ").slice(0, 15).join(" ") }
                {!expanded ?
                  description.split(" ").length > 15 &&
                  !expanded && (
                    <span
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setExpanded(!expanded);
                      }}
                      className="text-secondary"
                    >
                      ...Read more
                    </span>
                  ):(
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setExpanded(!expanded);
                        }}
                        className="text-secondary"
                      >
                        ...See Less
                      </span>
                    )}
              </p>
              {image && (
                <span className="d-flex" style={{ maxHeight: "250px" }}>
                  <img
                    className="mx-auto rounded-4 my-2 "
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

//deletePostAPI
