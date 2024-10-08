import { useEffect, useState } from "react";
import "./Notifications.scss";
// import ComingSoon from "../../../components/ComingSoon/ComingSoon";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { useDispatch, useSelector } from "react-redux";
// import ThreeODotIcon from "../../../Images/ThreeDotIcon.svg";
import {
  fetchNotificationsAPI,
  // markAllNotificationsReadAPI,
  // markNotificationAsReadAPI,
} from "../../../Service/user";
import {
  selectIsInvestor,
  selectLoggedInUserId,
} from "../../../Store/features/user/userSlice";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import { Link } from "react-router-dom";
import { PiDotsThreeBold } from "react-icons/pi";

function Notifications() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("All"); // Default to "received"
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const isInvestor = useSelector(selectIsInvestor);
  // const isInvestor = loggedInUser.isInvestor === "true";

  useEffect(() => {
    document.title = "Notifications | The Capital Hub";
    dispatch(setPageTitle("Notifications"));
  }, [dispatch]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetchNotificationsAPI(loggedInUserId);
      // console.log(loggedInUser?._id);
      setNotifications(res.data);
    } catch (error) {
      console.log("Error loading notifications: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const notificationType = (type, _id) => {
    switch (type) {
      case "connectionRequest": {
        return "sent you a connection request";
      }
      case "connectionAccepted": {
        return "accepted your connection request";
      }
      case "postLiked": {
        return (
          <span className="notif-link">
            liked your{" "}
            <Link
              to={isInvestor ? `/investor/post/${_id}` : `/posts/${_id}`}
              className="fw-bold"
            >
              post
            </Link>
          </span>
        );
      }
      case "postShared": {
        return (
          <span className="notif-link">
            shared your{" "}
            <Link
              to={isInvestor ? `/investor/post/${_id}` : `/posts/${_id}`}
              className="fw-bold"
            >
              post
            </Link>
          </span>
        );
      }
      case "postCommented": {
        return (
          <span className="notif-link">
            commented on your{" "}
            <Link
              to={isInvestor ? `/investor/post/${_id}` : `/posts/${_id}`}
              className="fw-bold"
            >
              post
            </Link>
          </span>
        );
      }
      case "meetingRequest": {
        return (
          <span className="notif-link">
            You have a new
            <Link to={`/investor/my-schedule?view=true`} className="fw-bold">
              meeting
            </Link>
            request
          </span>
        );
      }
      default: {
        return "";
      }
    }
  };
  return (
    <MaxWidthWrapper>
      <div className="notificaitons_container">
        {/* <ComingSoon /> */}
        {/* <div className="d-flex gap-md-3 gap-2 py-4  px-2 mt-3 data_selector">
          <button
            className={`fs-6 rounded-pill py-md-3 px-md-5 py-2 px-4 ${
              selectedTab === "All"
                ? `active${isInvestor ? "investors" : "startup"}`
                : ""
            } `}
            onClick={() => handleTabChange("All")}
          >
            All
          </button>
          <button
            className={` fs-6  rounded-pill py-md-3 px-md-5 py-2 px-4 ${
              selectedTab === "MY Post"
                ? `active${isInvestor ? "investors" : "startup"}`
                : ""
            }`}
            onClick={() => handleTabChange("MY Post")}
          >
            MY Post
          </button>
        </div> */}
        <div className="message_section px-xxl-4 rounded-4 px-3">
          <div className="row p-0">
            <div className="col-12 mt-2 box p-0">
              {!loading ? (
                notifications.length ? (
                  <>
                    {notifications
                      // .slice(0, 5)
                      .map(
                        ({
                          _id,
                          sender,
                          type,
                          createdAt,
                          isRead,
                          post,
                          connection,
                        }) => (
                          <div className="people_container d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-between align-items-center">
                            <div className="short_desc d-flex align-items-center w-100 my-3 mx-5 p-0">
                              <img
                                src={sender?.profilePicture}
                                className="people_img rounded-circle"
                                alt="user Profile"
                                width={50}
                                height={50}
                              />
                              <div className="d-flex flex-column justify-content-center px-2">
                                <h5>
                                  <Link
                                    to={
                                      isInvestor
                                        ? `/investor/user/${
                                            sender?.firstName.toLowerCase() +
                                            "-" +
                                            sender?.lastName.toLowerCase()
                                          }/${sender?.oneLinkId}`
                                        : `/user/${
                                            sender?.firstName.toLowerCase() +
                                            "-" +
                                            sender?.lastName.toLowerCase()
                                          }/${sender?.oneLinkId}`
                                    }
                                    className="fw-bold"
                                  >
                                    {sender?.firstName} {sender?.lastName}
                                  </Link>{" "}
                                </h5>
                                <p className="m-0 text-secondary">
                                  {notificationType(type, post || connection)}
                                </p>
                              </div>
                              {/* <img
                                src={ThreeODotIcon}
                                alt="ThreeODotIcon"
                                className="ms-auto px-2 "
                              /> */}
                              <PiDotsThreeBold
                                size={35}
                                style={{ fill: "var(--d-l-grey)" }}
                                className="ms-auto"
                              />
                            </div>
                          </div>
                        )
                      )}
                  </>
                ) : (
                  <p className="text-center m-0">No notifications</p>
                )
              ) : (
                <SpinnerBS
                  className="w-100 text-center py-5"
                  colorClass="d-l-grey"
                  spinnerSizeClass="md"
                />
              )}
            </div>
          </div>{" "}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default Notifications;
