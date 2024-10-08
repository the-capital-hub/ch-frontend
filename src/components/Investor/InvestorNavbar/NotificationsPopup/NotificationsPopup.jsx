import { useEffect, useState } from "react";
import "./NotificationsPopup.scss";
import {
  fetchNotificationsAPI,
  markAllNotificationsReadAPI,
  markNotificationAsReadAPI,
} from "../../../../Service/user";
import { useDispatch, useSelector } from "react-redux";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import TimeAgo from "timeago-react";
import { Link, useNavigate } from "react-router-dom";
import { selectTheme } from "../../../../Store/features/design/designSlice";
import {
  decrementUnreadNotifications,
  selectIsInvestor,
  selectLoggedInUserId,
  setUnreadNotifications,
} from "../../../../Store/features/user/userSlice";

function NotificationsPopup({ toggleVisibility }) {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const isInvestor = useSelector(selectIsInvestor);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetchNotificationsAPI(loggedInUserId);
      setNotifications(res.data.filter(notification => notification.type !== "achievementCompleted"));
    } catch (error) {
      console.log("Error loading notifications: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const displayPost = (post) => {
    return (
      <>
        {post?.image && (
          <>
            <br />
            <img src={post?.image} alt="Post" className="img-fluid" width="100" />
          </>
        )}

        {post?.video && (
          <>
            <br />
            <video width="100">
              <source src={post?.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        )}
      </>
    );
  };

  const notificationType = (type, post, achievementId, notificationId) => {
    const stripHtmlTags = (str) => {
      if (!str) return '';
      return str.replace(/<\/?[^>]+(>|$)/g, '');
    };
    switch (type) {
      case "connectionRequest": {
        return "sent you a connection request";
      }
      case "connectionAccepted": {
        return "accepted your connection request";
      }
      case "postLiked": {
        return (
          <span>
            liked your{" "}
            <Link
              to={isInvestor ? `/investor/post/${post?._id}` : `/posts/${post?._id}`}
              className="fw-bold"
              onClick={() => handleOnClickLink(notificationId)}
            >
              post
            </Link>
            {post?.description && (
              <>
                <br />
                <span className="text-notification" style={{color:theme === "dark" ? "white" : "black"}}>
                  {stripHtmlTags(post?.description)?.length > 100
                    ? `${stripHtmlTags(post?.description)?.slice(0, 100)}...`
                    : stripHtmlTags(post?.description)}
                </span>
              </>
            )}
          </span>
        );
      }
      case "postShared": {
        return (
          <span>
            shared your{" "}
            <Link
              to={isInvestor ? `/investor/post/${post?._id}` : `/posts/${post?._id}`}
              className="fw-bold"
              onClick={() => handleOnClickLink(notificationId)}
            >
              post
            </Link>
            {post?.description && (
              <>
                <br />
                <span className="text-notification" style={{color:theme === "dark" ? "white" : "black"}}>
                  {stripHtmlTags(post?.description)?.length > 100
                    ? `${stripHtmlTags(post?.description)?.slice(0, 100)}...`
                    : stripHtmlTags(post?.description)}
                </span>
              </>
            )}
          </span>
        );
      }
      case "postCommented": {
        return (
          <span>
            commented on your{" "}
            <Link
              to={isInvestor ? `/investor/post/${post?._id}` : `/posts/${post?._id}`}
              className="fw-bold"
              onClick={() => handleOnClickLink(notificationId)}
            >
              post
            </Link>
            {post.description && (
              <>
                <br />
                <span className="text-notification" style={{color:theme === "dark" ? "white" : "black"}}>
                  {stripHtmlTags(post?.description)?.length > 100
                    ? `${stripHtmlTags(post?.description)?.slice(0, 100)}...`
                    : stripHtmlTags(post?.description)}
                </span>
              </>
            )}
          </span>
        );
      }
      case "meetingRequest": {
        return (
          <span>
            You have a new{" "}
            <Link
              to={`/investor/my-schedule?view=true`}
              className="fw-bold"
              onClick={() => handleOnClickLink(notificationId)}
            >
              meeting
            </Link>{" "}
            request
          </span>
        );
      }
      default: {
        return "";
      }
    }
  };

  const handleOnClickLink = async (notificationId) => {
    await markAsRead(notificationId);
    toggleVisibility(false);
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationAsReadAPI(id);
      await fetchNotifications();
      dispatch(decrementUnreadNotifications());
    } catch (error) {
      console.log("Error marking notification as read", error);
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsReadAPI();
      await fetchNotifications();
      dispatch(setUnreadNotifications(0));
    } catch (error) {
      console.log("Error marking all notifications as read: ", error);
    }
  };

  // Handle Notification click
  function handleNotificationClick(e, type, post) {
    // Gaurd clause that checks if event is coming from notification div. If it is not , we do nothing.
    if (e.target.classList.contains("user-name")) {
      return;
    }
    if (type.includes("post")) {
      navigate(isInvestor ? `/investor/post/${post._id}` : `/posts/${post._id}`);
      toggleVisibility(false);
    } else
      if (type.includes("connection")) {
        navigate(isInvestor ? `/investor/connection` : `/connection`);
        toggleVisibility(false);
      } else {
        return;
      }
  }

  return (
    <div className="notifications-popup border shadow-sm rounded-4 ">
      <div className="d-flex justify-content-between align-items-center py-1 border-bottom border-2">
        <span>Notifications</span>
        <button className="btn btn-xs btn-light" onClick={markAllRead}>
          Mark all read
        </button>
      </div>
      {!loading ? (
        notifications?.length ? (
          <>
            {notifications
              ?.slice(0, 5)
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
                  <div
                    className="notification"
                    key={_id}
                    onClick={(e) => handleNotificationClick(e, type, post)}
                  >
                    <div className="content d-flex flex-column gap-2">
                      <p className="m-0">
                        <Link
                          to={
                            isInvestor
                              ? `/investor/user/${sender?.firstName.toLowerCase() + "-" + sender?.lastName.toLowerCase()}/${sender?.oneLinkId}`
                              : `/user/${sender?.firstName.toLowerCase() + "-" + sender?.lastName.toLowerCase()}/${sender?.oneLinkId}`
                          }
                          className="fw-bold user-name"
                          onClick={() => handleOnClickLink(_id)}
                        >
                          {sender?.firstName} {sender?.lastName}
                        </Link>{" "}
                        {notificationType(
                          type,
                          post || connection,
                          null,
                          _id
                        )}
                      </p>
                      <TimeAgo
                        datetime={createdAt}
                        locale=""
                        className="fs-10"
                      />
                    </div>
                    <div className="actions d-flex flex-column gap-1">
                      {/* {!isRead && (
                        <button
                          className="btn btn-light btn-sm"
                          onClick={() => markAsRead(_id)}
                        >
                          <span className="d-none d-md-block fs-xs text-nowrap">
                            Mark as read
                          </span>
                          <span className="d-md-none text-secondary">✔</span>
                        </button>
                      )} */}

                      {post && displayPost(post)}
                    </div>
                  </div>
                )
              )}
            {notifications.length > 5 && (
              <button
                className="btn btn-light btn-sm"
                onClick={() => {
                  toggleVisibility(false);
                  navigate(
                    isInvestor ? `/investor/notifications` : "/notifications"
                  );
                }}
              >
                Show all notifications
              </button>
            )}
          </>
        ) : (
          <p className="text-center m-0">No notifications</p>
        )
      ) : (
        <SpinnerBS
          className="w-100 text-center"
          colorClass="text-secondary"
          spinnerSizeClass="md"
        />
      )}
    </div>
  );
}

export default NotificationsPopup;
