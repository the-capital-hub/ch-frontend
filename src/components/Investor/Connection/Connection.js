import React, { useEffect, useState } from "react";
import "./Connection.scss";
import SmallProfileCard from "../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import {
  acceptConnectionAPI,
  cancelConnectionRequestAPI,
  getSentConnectionsAPI,
  getUserConnections,
  pendingConnectionRequestsAPI,
  rejectConnectionAPI,
  removeConnection,
} from "../../../Service/user";
import TimeAgo from "timeago-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import toast from "react-hot-toast";
import deleteIcon from "../../../Images/post/delete.png";
import achievement from "../../../Images/Investor/Achievements/img_1.png";
// import AchievementToast from "../../Toasts/AchievementToast/AchievementToast";
// import { achievementTypes } from "../../Toasts/AchievementToast/types";

const Connection = () => {
  const [selectedTab, setSelectedTab] = useState("received"); // Default to "received"
  const [receivedConnections, setReceivedConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [getAllConnection, setGetAllConnection] = useState([]); // State for accepted connections
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();

  // Function to handle tab change
  useEffect(() => {
    getUserConnections(loggedInUser._id).then((res) => {
      //("res2-->", res);
      setGetAllConnection(res.data); // Set accepted connections data
    });
  }, []);
  const handleTabChange = (tab) => {
    if (tab === "received") {
      getReceivedConnections();
    } else if (tab === "accepted") {
      getUserConnections(loggedInUser._id).then((res) => {
        //console.log("res-->", res);
        setGetAllConnection(res.data); // Set accepted connections data
      });
    } else {
      getSentConnection();
    }
    setSelectedTab(tab);
  };

  // Function to get received connections
  const getReceivedConnections = () => {
    setLoading(true);
    pendingConnectionRequestsAPI()
      .then(({ data }) => setReceivedConnections(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // Function to get sent connections
  const getSentConnection = () => {
    setLoading(true);
    getSentConnectionsAPI()
      .then(({ data }) => setReceivedConnections(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Connections | The Capital Hub";
    dispatch(setPageTitle("Connections"));
    getReceivedConnections();
  }, [dispatch]);

  // const notify = () =>
  //   toast.custom((t) => (
  //     <AchievementToast type={achievementTypes.pleasureDoingBusiness} />
  //   ));

  // Function to accept a connection
  const acceptConnectionHandler = async (connectionId) => {
    try {
      const response = await acceptConnectionAPI(connectionId);
      if (response.isFirst) {
        // notify();
      }
      getReceivedConnections();
    } catch (error) {
      console.log("Error accepting connection: ", error);
    }
  };

  // Function to reject a connection
  const rejectConnectionHandler = async (connectionId) => {
    try {
      await rejectConnectionAPI(connectionId);
      getReceivedConnections();
    } catch (error) {
      console.log("Error rejecting connection: ", error);
    }
  };

  // Function to cancel a sent connection request
  const cancelConnectionRequest = async (connectionId) => {
    try {
      await cancelConnectionRequestAPI(connectionId);
      getSentConnection();
    } catch (error) {
      console.log("Error cancelling connection: ", error);
    }
  };

  const showRemoveConfirmation = () => {
    return window.confirm("Are you sure you want to remove this connection?");
  };

  // removeConnectionHandler
  const handleRemoveConnection = async (userId) => {
    if (showRemoveConfirmation()) {
      try {
        await removeConnection(userId);
        getUserConnections(loggedInUser._id).then((res) => {
          setGetAllConnection(res.data);
        });
      } catch (error) {
        console.log("Error removing connection: ", error);
      }
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="connection_main_container mb-4">
        <SmallProfileCard text={"Connections"} />
        <section className="content_section">
          <div className="row">
            <div className="col-12 box p-3 p-md-4 ">
              <h4>Manage Connections</h4>
              <nav className="connection_nav">
                <button
                  className={`connection_nav_link fs-6 ${
                    selectedTab === "received" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("received")}
                >
                  Received
                </button>
                <button
                  className={`connection_nav_link fs-6  ${
                    selectedTab === "sent" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("sent")}
                >
                  Sent
                </button>
                <button
                  className={`connection_nav_link fs-6  ${
                    selectedTab === "accepted" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("accepted")}
                >
                  Accepted
                </button>
              </nav>
              <hr />
              <div className="connection_list">
                {loading ? (
                  <h5 className="text-center my-5">
                    <div class="d-flex justify-content-center">
                      <div class="spinner-border text-secondary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </h5>
                ) : selectedTab === "received" ? (
                  receivedConnections.length ? (
                    receivedConnections.map(
                      ({ sender, updatedAt, _id }, index) => (
                        <div
                          key={index}
                          className="connection_item d-flex flex-column flex-md-row justify-content-between "
                        >
                          {/* Render content for received connections here */}
                          <div className="connection_left">
                            <Link to={`/user/${sender?._id}`}>
                              <img
                                src={sender.profilePicture}
                                alt={`${sender.firstName} ${sender.lastName}`}
                                style={{ objectFit: "cover" }}
                              />
                            </Link>
                            <div className="body_container">
                              <p className="connection_name h5">
                                <Link
                                  to={`/user/${sender?._id}`}
                                  className="  text-decoration-none"
                                >
                                  {`${sender.firstName} ${sender.lastName}`}
                                </Link>
                              </p>
                              <p className="connection_designation">
                                {sender.designation}
                              </p>
                              <p>
                                {" "}
                                {sender.startUp?.company
                                  ? sender.startUp?.company
                                  : sender.investor?.company}
                              </p>
                              <p>
                                <TimeAgo
                                  className="connection_time"
                                  datetime={updatedAt}
                                  locale=""
                                />
                              </p>
                            </div>
                            <div className="connection_btn mt-3 mt-md-0  d-flex  d-md-none gap-2">
                              <button
                                onClick={() => rejectConnectionHandler(_id)}
                                className="ignore_button"
                              >
                                Ignore
                              </button>
                              <button
                                onClick={() => acceptConnectionHandler(_id)}
                                className="accept_button"
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                          <div className="connection_right mt-3 mt-md-0 align-items-center justify-content-cente d-none d-md-block">
                            <button
                              onClick={() => rejectConnectionHandler(_id)}
                              className="ignore_button"
                            >
                              Ignore
                            </button>
                            <button
                              onClick={() => acceptConnectionHandler(_id)}
                              className="accept_button"
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <h5 className="text-center my-5 text-secondary">
                      No received connections.
                    </h5>
                  )
                ) : selectedTab === "sent" ? (
                  <div className="sent_placeholder">
                    {receivedConnections.length ? (
                      receivedConnections.map(
                        ({ receiver, updatedAt, _id }, index) => (
                          <div
                            key={index}
                            className="connection_item py-2 d-flex flex-column flex-md-row justify-content-between "
                          >
                            {/* Render content for sent connections here */}
                            <div className="connection_left">
                              <Link to={`/user/${receiver?._id}`}>
                                <img
                                  src={receiver?.profilePicture}
                                  alt={`${receiver?.firstName} ${receiver?.lastName}`}
                                  style={{ objectFit: "cover" }}
                                />
                              </Link>
                              <div className="body_container">
                                <p className="connection_name h5">
                                  <Link
                                    to={`/user/${receiver?._id}`}
                                    className="  text-decoration-none"
                                  >
                                    {`${receiver?.firstName} ${receiver?.lastName}`}
                                  </Link>
                                </p>
                                <p className="connection_designation">
                                  {receiver?.designation}
                                </p>
                                <p>
                                  {" "}
                                  {receiver.startUp?.company
                                    ? receiver.startUp?.company
                                    : receiver.investor?.company}
                                </p>
                                <p>
                                  <TimeAgo
                                    className="connection_time"
                                    datetime={updatedAt}
                                    locale=""
                                  />
                                </p>
                              </div>
                              <div className="connection_right mt-3 mt-md-0  ms-auto my-auto  d-md-none d-block ">
                                <img
                                  src={deleteIcon}
                                  alt={`delete`}
                                  onClick={() => cancelConnectionRequest(_id)}
                                />
                              </div>
                            </div>
                            <div className="connection_right mt-3 mt-md-0 align-items-center justify-content-center d-none d-md-block">
                              <button
                                onClick={() => cancelConnectionRequest(_id)}
                                className="py-2 px-3 rounded-5"
                              >
                                Cancel Request
                              </button>
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <h5 className="text-center my-5 text-secondary">
                        No sent connections.
                      </h5>
                    )}
                  </div>
                ) : selectedTab === "accepted" ? (
                  // Render content for the "Accepted" tab here using getAllConnection
                  getAllConnection.length ? (
                    getAllConnection.map((data, index) => (
                      // console.log("data-->", data)
                      <div
                        key={index}
                        className="connection_item d-flex flex-column flex-md-row justify-content-between"
                      >
                        {/* Render the accepted connection content here */}
                        <div className="connection_left">
                          <Link to={`/user/${data._id}`}>
                            <img
                              src={data.profilePicture}
                              alt={`${data.firstName} ${data.lastname}`}
                              style={{ objectFit: "cover" }}
                            />
                          </Link>
                          <div className="body_container">
                            <p className="connection_name h5">
                              <Link
                                to={`/user/${data._id}`}
                                className="  text-decoration-none"
                              >
                                {`${data.firstName ? data.firstName : "name"} ${
                                  data.lastName ? data.lastName : ""
                                }`}
                              </Link>
                            </p>
                            <p className="connection_designation">
                              {data.designation ? data.designation : ""}
                            </p>
                            <p>
                              {" "}
                              {data.startUp?.company
                                ? data.startUp?.company
                                : data.investor?.company}
                            </p>

                            <p>
                              {/* <TimeAgo
                                className="connection_time"
                                datetime={data.updatedAt ? data.updatedAt : ""}
                                locale=""
                              /> */}
                            </p>
                          </div>
                          <div className="connection_right mt-3 mt-md-0  ms-auto my-auto  d-md-none d-block ">
                            <img
                              src={deleteIcon}
                              alt={`delete`}
                              onClick={() => handleRemoveConnection(data._id)}
                            />
                          </div>
                        </div>
                        <div className="connection_right mt-3 mt-md-0 align-items-center justify-content-center d-none d-md-block">
                          <button
                            onClick={() => handleRemoveConnection(data._id)}
                            className="py-2 px-3 rounded-5"
                          >
                            Remove Connection
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-center my-5 text-secondary">
                      No accepted connections.
                    </h5>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
};

export default Connection;
