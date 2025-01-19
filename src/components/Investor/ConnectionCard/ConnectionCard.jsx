import React, { useEffect, useState } from "react";
import "./ConnectionCard.scss";
import { getUserConnections } from "../../../Service/user";
import { Link } from "react-router-dom";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import { useSelector } from "react-redux";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import messageIcon from "../../../Images/StartUp/icons/message.svg";
import { selectTheme } from "../../../Store/features/design/designSlice";
import avatar4 from "../../../Images/avatars/image-1.png";

function ConnectionCard({ userIdData, theme }) {
  // Fetch from store
  const userId = useSelector(selectLoggedInUserId);
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUserConnections(userId || userIdData)
      .then((data) => {
        setConnections(data.data);
        setLoading(false);
      })
      .catch((err) => {
        //console.log();
        setLoading(false);
      });
  }, [userId, userIdData]);

  return (
    <div className="ConnectionCard_container m-3 pb-2 d-flex flex-md-row justify-content-start gap-4 rounded-2">
      {loading ? (
        <SpinnerBS
          className={
            "d-flex justify-content-center align-items-center w-100 py-5"
          }
          colorClass={"d-l-grey"}
        />
      ) : connections.length > 0 ? (
        <>
          {connections.map((item, index) => (
            <div className="single-card " key={index} >
              <div
                className="d-flex flex-column align-items-center h-100 text-decoration-none"
                // to={`/user/${
                //   item?.firstName.toLowerCase() +
                //   "-" +
                //   item?.lastName.toLowerCase()
                // }/${item.oneLinkId}`}
                style={{ color: "inherit" }}
              >
                <img
                  src={item?.profilePicture || avatar4}
                  alt=""
                  className="rounded-pill"
                  style={{borderColor:theme==="investor"? "#DDFF71"
                    : "rgba(253, 89, 1, 0.8)"}}
                />
                <h6 className="m-0" style={{ padding: "5px" }}>
                  {item?.firstName} {item?.lastName}
                </h6>
                <p
                  className="m-0"
                  style={{ paddingBottom: "10px", fontSize: "14px" }}
                >
                  {item?.designation}
                </p>
                <Link
                  to={`/chats?userId=${item?._id}`}
                  className="text-decoration-none"
                  style={{}}
                >
                  <button
                    className="message btn rounded-pill px-3"
                    style={{
                      background:
                        theme === "investor"
                          ? "#DDFF71"
                          : "#fd5901",
                      color: theme === "investor" ? "#000" : "#fff",
                    }}
                  >
                    {/*<img
                    src={messageIcon}
                    width={10}
                    alt="message user"
                    style={{width:"14px",height:"14px",}}
                  />*/}
                    <span
                      style={{
                        fontSize: "14px",
                        marginLeft: "2px",
                      }}
                    >
                      Message
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-secondary">No connections found.</p>
      )}
    </div>
  );
}

export default ConnectionCard;
