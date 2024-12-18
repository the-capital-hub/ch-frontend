import React, { useMemo, useEffect, useState } from "react";
import "./ChatSidebar.scss";
import pinIcon from "../../../../Images/Chat/Pin.svg";
import messageIcon from "../../../../Images/Chat/Chat.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserChats,
  togglePinMessage,
  getPinnedChat,
  getLastMessage,
  getUnreadMessageCount
} from "../../../../Service/user";
import {
  setChatId,
  setUserId,
  setIsCommuntySelected,
  selectPinnedChats,
  selectChatsLastMessageDates,
  selectChatsLastMessages,
  selectChatsUnreadMessageCount,
  selectPersonalChats,
  setTotalUnreadCount, // Add this line
} from "../../../../Store/features/chat/chatSlice";
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import IconPin from "../../../../components/Investor/SvgIcons/IconPin";
import { formatTimestamp } from "../../../../utils/ChatsHelpers";
import BatchImag from "../../../../Images/tick-mark.png"
import { createSelector } from 'reselect'; 

// Memoized selector for unread message counts
const selectMemoizedChatsUnreadMessageCount = createSelector(
  [selectChatsUnreadMessageCount],
  (unreadCounts) => unreadCounts
);

// Memoized selector for last messages
const selectMemoizedChatsLastMessages = createSelector(
  [selectChatsLastMessages],
  (lastMessages) => lastMessages
);

// Memoized selector for last message dates
const selectMemoizedChatsLastMessageDates = createSelector(
  [selectChatsLastMessageDates],
  (lastMessageDates) => lastMessageDates
);

const ChatSidebar = ({ recieveMessage, sendMessage }) => {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const myPinnedChats = useSelector(selectPinnedChats);
  const myPersonalChats = useSelector(selectPersonalChats);
  const chatLastMessages = useSelector(selectMemoizedChatsLastMessages);
  const chatLastMessageDates = useSelector(selectMemoizedChatsLastMessageDates);
  const chatUnreadCounts = useSelector(selectMemoizedChatsUnreadMessageCount);
  const dispatch = useDispatch();

  const [chats, setChats] = useState(myPersonalChats);
  const [pinnedChats, setPinnedChats] = useState(myPinnedChats);
  const [latestMessages, setLatestMessages] = useState(chatLastMessages);
  const [unreadMessageCounts, setUnreadMessageCounts] = useState(chatUnreadCounts);
  const [dates, setDates] = useState(chatLastMessageDates);
  const [selectedUserChat, setSelectedUserChat] = useState(null);
  const [pinnedChat, setPinnedChat] = useState(false);

  // Calculate total unread messages
  useEffect(() => {
    const totalUnread = Object.values(unreadMessageCounts).reduce((total, count) => total + count, 0);
    dispatch(setTotalUnreadCount(totalUnread));
  }, [unreadMessageCounts, dispatch]);

  const handlePinClick = (chatId) => {
    const chatIndex = chats.findIndex((chat) => chat._id === chatId);
    if (chatIndex !== -1) {
      const removedChat = chats[chatIndex];
      const updatedChats = chats.filter((chat) => chat._id !== chatId);
      setChats(updatedChats);
      setPinnedChats([...pinnedChats, removedChat]);
    } else {
      const pinnedChatIndex = pinnedChats.findIndex((chat) => chat._id === chatId);
      if (pinnedChatIndex !== -1) {
        const removedPinnedChat = pinnedChats[pinnedChatIndex];
        const updatedPinnedChats = pinnedChats.filter((chat) => chat._id !== chatId);
        setPinnedChats(updatedPinnedChats);
        setChats([...chats, removedPinnedChat]);
      }
    }

    togglePinMessage(loggedInUserId, chatId)
      .then((res) => {
        setPinnedChat(true);
        setTimeout(() => {
          setPinnedChat(false);
        }, 1000);
      })
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pinnedChatResponse, userChatsResponse] = await Promise.all([
          getPinnedChat(loggedInUserId),
          getUserChats(loggedInUserId),
        ]);

        setPinnedChats(pinnedChatResponse.data);
        pinnedChatResponse.data.forEach((chat) => {
          handleGetMessageByChatId(chat._id);
          handleGetUnreadMessageCount(chat._id);
        });

        setChats(userChatsResponse.data);
        userChatsResponse.data.forEach((chat) => {
          handleGetMessageByChatId(chat._id);
          handleGetUnreadMessageCount(chat._id);
        });
      } catch (error) {
        console.error("Error-->", error);
      }
    };

    fetchData();
  }, [loggedInUserId, sendMessage, recieveMessage, selectedUserChat, pinnedChat]);

  const handleSelectedChat = useMemo(
    () => (chatId, userId) => {
      dispatch(setChatId(chatId));
      dispatch(setUserId(userId));
      dispatch(setIsCommuntySelected(false));
      setSelectedUserChat(userId);
    },
    [dispatch]
  );

  const handleGetMessageByChatId = useMemo(
    () => (chatId) => {
      getLastMessage(chatId)
        .then((res) => {
          const latestMessage = res.data;
          if (latestMessage) {
            let messageText = latestMessage.text;
            if (latestMessage.video) {
              messageText = "video";
            } else if (latestMessage.documents) {
              messageText = "document";
            } else if (latestMessage.images) {
              messageText = "image";
            }
            setLatestMessages((prevLatestMessages) => ({
              ...prevLatestMessages,
              [chatId]: messageText,
            }));
            setDates((prevLatestMessages) => ({
              ...prevLatestMessages,
              [chatId]: latestMessage.createdAt,
            }));
          }
        })
        .catch((error) => {
          console.error("Error-->", error);
        });
    },
    []
  );

  const handleGetUnreadMessageCount = useMemo(
    () => (chatId) => {
      getUnreadMessageCount(chatId, loggedInUserId)
        .then((res) => {
          setUnreadMessageCounts((prevUnreadMessageCounts) => ({
            ...prevUnreadMessageCounts,
            [chatId]: res.data,
          }));
        })
        .catch((error) => {
          console.error("Error-->", error);
        });
    },
    [loggedInUserId]
  );

  return (
    <div className="chatsidebar_main_container" id="sidebarChats">
      <div className="chatsidebar_content pt-2">
        <span className="m-3 mt-1 chat-category">
          <img src={pinIcon} alt="" /> PINNED
        </span>
        <div className="d-flex flex-column" id="pinnedChats">
          {pinnedChats?.map((chat, index) => (
            <div key={index} className="person_wise_chat">
              {chat.members.map((member) => {
                if (member._id !== loggedInUserId) {
                  const inputString = latestMessages[chat._id];
                  const unreadMessageCount = unreadMessageCounts[chat._id];
                  const messageTime = formatTimestamp(dates[chat._id]);
                  const numberOfCharacters = 20;
                  let latestMessage;
                  if (inputString?.length > numberOfCharacters) {
                    latestMessage =
                      inputString.substring(0, numberOfCharacters) + "...";
                  } else {
                    latestMessage = inputString;
                  }
                  return (
                    <section
                      className="user_chat"
                      key={member._id}
                      onClick={() => handleSelectedChat(chat._id, member._id)}
                    >
                      <div className="left d-flex justify-content-between">
                        <img
                          src={member.profilePicture}
                          alt="Profile"
                          className="rounded_img object-fit-cover"
                        />
                        <div className="title_and_message">
                          <h5 className="name_title">
                            {member.firstName} {member.lastName}
                            {member.isSubscribed && <img
              src={BatchImag}
              style={{
                width: "1.2rem",
                height: "1.2rem",
                objectFit: "contain",
                marginLeft: "0.5rem", // Optional: adds space between the name and the icon
              }}
              alt="Batch Icon"
            />}
                          </h5>
                          <h5 className="message_title">
                            {latestMessage || "No messages yet"}
                          </h5>
                        </div>
                      </div>
                      <div className="right">
                        {messageTime !== "Invalid Date" && (
                          <div className="time">{messageTime}</div>
                        )}
                        <span
                          className="pt-1 px-1 ms-auto"
                          onClick={() => handlePinClick(chat._id)}
                          style={{
                            color: "var(--currentTheme)",
                            opacity: "0.75",
                          }}
                        >
                          <IconPin />
                        </span>
                        {unreadMessageCount > 0 && (
                          <div className="notification">
                            {unreadMessageCount}
                          </div>
                        )}
                      </div>
                    </section>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>

        <span className="m-3 chat-category">
          <img src={messageIcon} alt="" /> ALL MESSAGE
        </span>
        <div className="d-flex flex-column" id="normalChats">
          {chats?.map((chat, index) => (
            <div key={index} className="person_wise_chat">
              {chat.members.map((member) => {
                if (member._id !== loggedInUserId) {
                  const inputString = latestMessages[chat._id];
                  const unreadMessageCount = unreadMessageCounts[chat._id];
                  const messageTime = formatTimestamp(dates[chat._id]);
                  const numberOfCharacters = 13;
                  let latestMessage;
                  if (inputString?.length > numberOfCharacters) {
                    latestMessage =
                      inputString.substring(0, numberOfCharacters) + "...";
                  } else {
                    latestMessage = inputString;
                  }
                  return (
                    <section
                      className="user_chat"
                      key={member._id}
                      onClick={() => handleSelectedChat(chat._id, member._id)}
                    >
                      <div className="left">
                        <img
                          src={member.profilePicture}
                          alt="Profile"
                          className="rounded_img object-fit-cover"
                        />
                        <div className="title_and_message">
                          <h5 className="name_title text-capitalize">
                            {member.firstName} {member.lastName}
                            {member.isSubscribed && <img
              src={BatchImag}
              style={{
                width: "1.2rem",
                height: "1.2rem",
                objectFit: "contain",
                marginLeft: "0.5rem", // Optional: adds space between the name and the icon
              }}
              alt="Batch Icon"
            />}
                          </h5>
                          <h5 className="message_title">
                            {latestMessage || "No messages yet"}
                          </h5>
                        </div>
                      </div>
                      <div className="right">
                        {messageTime !== "Invalid Date" && (
                          <div className="time">{messageTime}</div>
                        )}
                        <span
                          className="pt-1 px-1"
                          onClick={() => handlePinClick(chat._id)}
                        >
                          <IconPin color="transparent" stroke="#989898" />
                        </span>
                        {unreadMessageCount > 0 && (
                          <div className="notification">
                            {unreadMessageCount}
                          </div>
                        )}
                      </div>
                    </section>
                  );
                }
                return null;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
