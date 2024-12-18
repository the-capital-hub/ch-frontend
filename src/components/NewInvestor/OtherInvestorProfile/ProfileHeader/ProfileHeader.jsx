import React from "react";
import IconMessage from "../../SvgIcons/IconMessage";
import { Link } from "react-router-dom";
// import connection from "../../../../Images/StartUp/icons/connection-user.png";
// import messageIcon from "../../../../Images/StartUp/icons/message.svg";
import { sentConnectionRequest } from "../../../../Service/user";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";
import BatchImag from "../../../../Images/tick-mark.png"

export default function ProfileHeader({
  userData,
  loggedInUser,
  setConnectionSent,
}) {
  const theme = useSelector(selectTheme)
  const handleConnect = (userId) => {
    sentConnectionRequest(loggedInUser._id, userId)
      .then(({ data }) => {
        if (data?.message === "Connection Request Sent") {
          setConnectionSent(true); // Set the state to true once
          setTimeout(() => {
            setConnectionSent(false); // Reset the state after a delay
          }, 2500);
        }
      })
      .catch((error) => console.log());
  };

  return (
    <div className="profile rounded-4 border shadow-sm">
      <div className="short_details d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="d-flex flex-column w-100 flex-md-row align-items-center justify-content-between ">
          <img
            src={userData?.profilePicture}
            width={150}
            height={150}
            alt="profile"
            className="rounded-circle object-fit-cover"
          />
          <div className="flex-grow-1 left_profile_text mt-2 mt-md-0 me-auto me-md-0 ms-md-4">
            <h3 className="typography h3">
            {userData?.firstName || "John"} {userData?.lastName || "Doe"}
              {userData.isSubscribed && <img
                src={BatchImag}
                style={{
                  width: "1.2rem",
                  height: "1.2rem",
                  objectFit: "contain",
                }}
                alt="Batch Icon"
              />}            </h3>
            <span className="small_typo">
              {userData?.designation || "designation"}
            </span>
            <br />
            <span className="small_typo">
              {userData?.location || "location"}
            </span>
          </div>
        </div>
        {loggedInUser._id !== userData?._id && (
          <div className="buttons d-flex gap-2 flex-row align-items-md-center">
            <Link
              to={`/chats?userId=${userData?._id}`}
              className="text-decoration-none"
            >
              <button className="message btn rounded-pill px-3 py-2">
                <IconMessage />
                <span>Message</span>
              </button>
            </Link>
            {userData?.connections?.includes(loggedInUser._id) ? (
              <button className="connection-status  btn rounded-pill px-3 py-2">
                <span>Connected</span>
              </button>
            ) : userData?.connectionsReceived?.includes(loggedInUser._id) ? (
              <button className=" connection-status d-flex btn rounded-pill px-3 py-2">
                {/* <img src={connection} width={20} alt="message user" /> */}
                <span>Pending</span>
              </button>
            ) : (
              <button className="connection-status d-flex  btn rounded-pill px-3 py-2">
                {/* <img src={connection} width={20} alt="message user" /> */}
                <span onClick={() => handleConnect(userData?._id)}>
                  Connect
                </span>
              </button>
            )}
          </div>
        )}
      </div>
      <div className="details">
        <div className="single_details row row-cols-1 row-cols-md-2 ">
          <span className="col-md-3 label fw-bold">Current Company</span>
          <span className="col-md-9 value">
            {userData?.startUp?.company ||
              userData?.investor?.companyName ||
              "company"}
          </span>
        </div>
        <div className="single_details row row-cols-1 row-cols-md-2 ">
          <span className="col-md-3 label fw-bold">Designation</span>
          <span className="col-md-9 value">
            {userData?.designation || "designation"}
          </span>
        </div>
        <div className="single_details row row-cols-1 row-cols-md-2 ">
          <span className="col-md-3 label fw-bold">Education</span>
          <span className="col-md-9 value">
            {userData?.education || "education"}
          </span>
        </div>
        <div className="single_details row row-cols-1 row-cols-md-2 ">
          <span className="col-md-3 label fw-bold">Experience</span>
          <span className="col-md-9 value">
            {userData?.experience || "experience"}
          </span>
        </div>
      </div>
    </div>
  );
}
