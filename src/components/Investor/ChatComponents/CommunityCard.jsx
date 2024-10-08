import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  selectCommunitiesLastMessageDates,
  selectCommunitiesLastMessages,
  selectCommunitiesUnreadMessageCount,
  setChatId,
  setIsCommuntySelected,
} from "../../../Store/features/chat/chatSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  // getMessageByChatId,
  getUnreadMessageCountInCommunities,
  getLastMessage,
} from "../../../Service/user";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import { formatTimestamp } from "../../../utils/ChatsHelpers";

export default function CommunityCard({
  community,
  recieveMessage,
  sendMessage,
  isRead,
}) {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const communitiesLastMessages = useSelector(selectCommunitiesLastMessages);
  const communitiesLastMessageDates = useSelector(
    selectCommunitiesLastMessageDates
  );
  const communitiesUnreadCounts = useSelector(
    selectCommunitiesUnreadMessageCount
  );

  const dispatch = useDispatch();
  // console.log(community);
  // Handle community click
  function handleCommunityClick(communityId) {
    dispatch(setChatId(communityId));
    dispatch(setIsCommuntySelected(true));
  }

  const [latestMessages, setLatestMessages] = useState(communitiesLastMessages);
  const [latestMsgSentetName, setLatestMsgSentetName] = useState("");
  const [dates, setDates] = useState(communitiesLastMessageDates);
  const [unreadMessageCount, setUnreadMessageCounts] = useState(
    communitiesUnreadCounts[community._id]
  );

  // const formatTimestamp = (timestamp) => {
  //   const messageDate = new Date(timestamp);
  //   const currentDate = new Date();
  //   const isToday =
  //     messageDate.getDate() === currentDate.getDate() &&
  //     messageDate.getMonth() === currentDate.getMonth() &&
  //     messageDate.getFullYear() === currentDate.getFullYear();
  //   const isYesterday =
  //     messageDate.getDate() === currentDate.getDate() - 1 &&
  //     messageDate.getMonth() === currentDate.getMonth() &&
  //     messageDate.getFullYear() === currentDate.getFullYear();
  //   if (isToday) {
  //     const hours = messageDate.getHours();
  //     const minutes = messageDate.getMinutes();
  //     return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  //   } else if (isYesterday) {
  //     return "Yesterday";
  //   } else {
  //     const options = { year: "numeric", month: "short", day: "numeric" };
  //     return messageDate.toLocaleDateString(undefined, options);
  //   }
  // };

  useEffect(() => {
    getLastMessage(community._id)
      .then((res) => {
        const latestMessage = res.data;
        setLatestMsgSentetName(
          latestMessage.senderId.firstName,
          latestMessage.senderId.lastName
        );
        setLatestMessages((prevLatestMessages) => ({
          ...prevLatestMessages,
          [community._id]: latestMessage ? latestMessage.text : "",
        }));
        setDates((prevLatestMessages) => ({
          ...prevLatestMessages,
          [community._id]: latestMessage ? latestMessage.createdAt : "",
        }));
      })
      .catch((error) => {
        console.error("Error-->", error);
      });

    getUnreadMessageCountInCommunities(community._id, loggedInUserId)
      .then((res) => {
        setUnreadMessageCounts(res.data);
      })
      .catch((error) => {
        console.error("Error-->", error);
      });
  }, [community._id, sendMessage, recieveMessage, isRead, loggedInUserId]);

  const messageTime = formatTimestamp(dates[community._id]);
  const inputString = latestMessages[community._id];
  // console.log(latestMessages);
  const numberOfCharacters = 20;
  let latestMessage;
  if (inputString?.length > numberOfCharacters) {
    latestMessage = inputString.substring(0, numberOfCharacters) + "...";
  } else {
    latestMessage = inputString;
  }

  return (
    <div
      className="community__card d-flex align-items-center gap-2 py-1 px-2"
      key={community._id}
      onClick={() => handleCommunityClick(community._id)}
    >
      <span className="p-2 position-relative">
        {community.profileImage ? (
          <img
            src={community.profileImage}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50%",
            }}
            alt="Company Profile"
            className="object-fit-cover"
          />
        ) : (
          <HiOutlineUserGroup
            style={{
              height: "50px",
              width: "50px",
              color: " rgba(159, 159, 159, 1)",
            }}
            className=""
          />
        )}
      </span>
      <div className="d-flex justify-content-between w-100">
        <div className="d-flex flex-column justify-content-between gap-1">
          <h5
            className="m-0 text-capitalize text__clip--15"
            style={{ color: "var(--currentTheme-dark)" }}
          >
            {community?.communityName}
          </h5>
          <p className="m-0 text__clip " style={{ fontSize: "0.8rem" }}>
            {latestMsgSentetName ? latestMsgSentetName : ""}
            {latestMsgSentetName ? ":" : ""}{" "}
            {latestMessage || "No messages yet"}
          </p>
        </div>
        <div className="d-flex flex-column justify-content-between">
          {messageTime !== "Invalid Date" && (
            <div className="time__stamp m-0">{messageTime}</div>
          )}
          {unreadMessageCount > 0 && (
            <div className="notification">{unreadMessageCount}</div>
          )}
        </div>
      </div>
    </div>
  );
}
