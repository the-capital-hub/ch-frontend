import React, { useEffect, useRef, useState } from "react";
// import ThreeDot from "../../../../Images/VerticalBlackThreeDots.svg";
import { Link, useLocation } from "react-router-dom";
import IconKebabMenu from "../../SvgIcons/IconKebabMenu";
import IconDeleteFill from "../../SvgIcons/IconDeleteFill";
import { useSelector } from "react-redux";
import { unsavePost } from "../../../../Service/user";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import avatar4 from "../../../../Images/avatars/image.png";

const SavedPostSmallCard = ({
  activeHeader,
  description,
  firstName,
  lastName,
  oneLinkId,
  profilePicture,
  designation,
  image,
  userId,
  postId,
  allPosts,
  setAllPosts,
  resharedPostId,
}) => {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const { pathname } = useLocation();
  const linkPrefix = pathname.includes("/investor") ? "/investor" : "";

  // State for KebabMenu
  const [showKebabMenu, setShowKebabMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const kebabMenuContainerRef = useRef(null);

  // Handle outside Click
  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (
        kebabMenuContainerRef.current &&
        !kebabMenuContainerRef.current.contains(event.target)
      ) {
        setShowKebabMenu(false);
      }
    };

    document.addEventListener("click", outsideClickHandler);

    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  // Handle Remove from saved
  async function handleRemoveFromSaved(e) {
    setLoading(true);

    const requestBody = {
      userId: loggedInUserId,
      postId: postId,
    };

    try {
      const response = await unsavePost(requestBody);

      // Set allPosts
      // setShowKebabMenu(false);

      const updatedSavedPosts = allPosts.filter(({ _id }) => _id !== postId);
      setAllPosts(updatedSavedPosts);
      setLoading(false);
    } catch (error) {
      console.log();
      setShowKebabMenu(false);
      setLoading(false);
    }
  }

  return (
    <>
      {/* <div className="card-viewer"> */}
      <div  className="card border rounded-4 p-3 ">
        {/* Card Header */}
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex">
            <Link
              to={`${linkPrefix}/user/${
                firstName.toLowerCase() + "-" + lastName.toLowerCase()
              }/${oneLinkId}`}
              className="img-fluid mr-2"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                pointerEvents: `${loggedInUserId === userId ? "none" : "all"}`,
              }}
            >
              <img
                src={profilePicture || avatar4}
                alt="Profile"
                className="img-fluid mr-2"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                }}
              />
            </Link>
            <div>
              <span className="card_heading">
                {firstName} {lastName}
              </span>
              <span className="card_heading">{designation}</span>
            </div>
          </div>

          {/* Kebab menu */}
          <div
            className="kebabMenu_container position-relative"
            ref={kebabMenuContainerRef}
            style={{marginTop:"-1.2rem"}}
          >
            {/* <img
              src={ThreeDot}
              alt="Three Dot"
              className="img-fluid"
              style={{ width: "20px", height: "20px" }}
            /> */}
            <button
              className="btn border-0 p-0 m-0"
              onClick={handleRemoveFromSaved}
       
            >
              <IconDeleteFill height="1.3rem" width="1.3rem" color="#8b1f1f" />
            </button>
            {/*{showKebabMenu && (
              <div className="kebab_menu border rounded shadow-sm p-2">
                <button
                  className="btn border-0 p-0 m-0 d-flex align-items-center gap-2 shadow-none "
                  onClick={handleRemoveFromSaved}
                >
                  {!loading ? (
                    <>
                      <IconDeleteFill
                        height="1rem"
                        width="1rem"
                        color="#8b1f1f"
                  />
                      <span className="" style={{ fontSize: "14px" }}>
                        Remove
                      </span>
                    </>
                  ) : (
                    <>
                      <SpinnerBS spinnerSizeClass="spinner-border-sm" />
                      <span style={{ fontSize: "12px" }}>Removing</span>
                    </>
                  )}
                </button>
              </div>
            )} */}
          </div>
        </div>
        {image ? (
          <img
            src={image}
            alt="Post"
            className="img-fluid mb-2 rounded-4"
            style={{ width: "18rem", maxHeight: "18rem", objectFit: "contain" }}
          />
        ) : resharedPostId?.image ? (
          <>
            <div  className="card border rounded-4 p-3 ">
              <div className="d-flex pb-3">
                <Link
                  to={`${linkPrefix}/user/${
                    firstName.toLowerCase() + "-" + lastName.toLowerCase()
                  }/${oneLinkId}`}
                  className="img-fluid mr-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    pointerEvents: `${
                      loggedInUserId === userId ? "none" : "all"
                    }`,
                  }}
                >
                  <img
                    src={profilePicture || avatar4}
                    alt="Profile"
                    className="img-fluid mr-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
                <div>
                  <span className="card_heading">
                    {firstName} {lastName}
                  </span>
                  <span className="card_heading">{designation}</span>
                </div>
              </div>
              <img
                src={resharedPostId.image}
                alt="Post"
                className="img-fluid mb-2 rounded-4"
                style={{
                  width: "18rem",
                  maxHeight: "18rem",
                  objectFit: "contain",
                }}
              />
            </div>
          </>
        ) : (
          ""
        )}
        {description ? (
         // <p className="savedPost__text mt-2">{description}</p>
         <div className="savedPost__text mt-2"
         dangerouslySetInnerHTML={{ __html: description }}
       />
        ) : resharedPostId?.description ? (
          <div
            
            className="card border rounded-4 p-3"
            style={{
              // flex: 'none',
              flex: window.innerWidth <= 767 ? "none" : "0 0 20rem",
            }}
          >
            {" "}
            <div className="d-flex pb-3">
              <Link
                to={`${linkPrefix}/user/${
                  firstName.toLowerCase() + "-" + lastName.toLowerCase()
                }/${oneLinkId}`}
                className="img-fluid mr-2"
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  pointerEvents: `${
                    loggedInUserId === userId ? "none" : "all"
                  }`,
                }}
              >
                <img
                  src={profilePicture || avatar4}
                  alt="Profile"
                  className="img-fluid mr-2"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                  }}
                />
              </Link>
              <div>
                <span className="card_heading">
                  {firstName} {lastName}
                </span>
                <span className="card_heading">{designation}</span>
              </div>
            </div>
            <div className="d-block">
              <p>{resharedPostId.description}</p>
            </div>
          </div>
        ) : (
          ""
        )}{" "}
      </div>
      {/* </div> */}
    </>
  );
};

export default SavedPostSmallCard;
