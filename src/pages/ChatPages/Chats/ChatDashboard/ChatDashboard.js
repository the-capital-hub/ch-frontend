import React, { useEffect, useState, useRef } from "react";
import "./ChatDashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageByChatId,
  markMessagesAsRead,
  deleteMessage,
} from "../../../../Service/user";


import AfterSuccessPopUp from "../../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import ChatDeletePopup from "../ChatDeletePopup/ChatDeletePopup";
import ChatInputContainer from "../../../../components/Investor/ChatComponents/ChatInputContainer/ChatInputContainer";
import MyMessage from "../../../../components/Investor/ChatComponents/ChatMessages/MyMessage/MyMessage";
import OtherMessage from "../../../../components/Investor/ChatComponents/ChatMessages/OtherMessage/OtherMessage";
import { formatMessages } from "../../../../utils/ChatsHelpers";
import TCHLogoLoader from "../../../../components/Shared/TCHLoaders/TCHLogoLoader/TCHLogoLoader";
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import NavBar from "../../../../components/NewInvestor/NavBar/NavBar";
const ChatDashboard = ({ setSendMessage, recieveMessage, cleared }) => {
  // Fetch global state
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const chatId = useSelector((state) => state.chat.chatId);
  const userId = useSelector((state) => state.chat.userId);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const chatMessagesContainerRef = useRef(null);
  const [isSent, setIsSent] = useState(false);

  const [showFeaturedPostSuccess, setShowFeaturedPostSuccess] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [msgId, setMsgId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetDeletePopup = () => {
    setDeletePopup(true);
  };
  const handleIdBack = (data) => {
    setMsgId(data);
  };

  const handleDeleteOk = async () => {
    if (!msgId) {
      return;
    }

    try {
      const result = await deleteMessage(msgId);
      if (result) {
        setShowFeaturedPostSuccess(true);
        setDeletePopup(false);
        setMessages((prev) => {
          return prev.filter((message) => {
            if (message.id) {
              return message.id !== msgId;
            }
            return message;
          });
        });
      }
    } catch (error) {
      console.error("Error likeDislike comment : ", error);
    }
  };

  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTop =
        chatMessagesContainerRef.current.scrollHeight;
    }
  }, [messages, recieveMessage]);

  useEffect(() => {
    markMessagesAsRead(chatId, userId)
      .then((response) => {})
      .catch((error) => {
        console.error("Error marking messages as read:", error);
      });
  }, [chatId, userId, recieveMessage]);

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage?.chatId === chatId) {
      setMessages((prevMessages) => [...prevMessages, recieveMessage]);
    }
  }, [recieveMessage, chatId, dispatch]);

  useEffect(() => {
    setLoading(true);
    getMessageByChatId(chatId, loggedInUserId)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error-->", error);
      });
  }, [chatId, cleared, isSent]);

  const formattedMessages = formatMessages(messages, loggedInUserId);
  return (
    <>
    <div className="chat_dashboard_container">
      <div className="chat_messages_group" ref={chatMessagesContainerRef}>
        {loading ? (
          <div className="d-flex h-100 justify-content-center align-items-center">
            <TCHLogoLoader />
          </div>
        ) : (
          formattedMessages.map((group) => (
            <div key={group.date}>
              <h6 className="date_header px-3 py-1 my-2 bg-light rounded shadow-sm small">
                {group.date}
              </h6>
              <div className="chat_messages">
              {group.messages.map((message, idx) => {
                  const isDeletedByUser = message.deletedBy?.includes(loggedInUserId) ?? false;

                  if (isDeletedByUser) {
                    return (null);
                  }

                  return message.senderId._id === loggedInUserId ? (
                    <MyMessage
                      handleIdBack={handleIdBack}
                      handleSetDeletePopup={handleSetDeletePopup}
                      idx={idx}
                      message={message}
                      key={message._id}
                    />
                  ) : (
                    <OtherMessage
                      message={message}
                      idx={idx}
                      key={message._id}
                      isPersonalChat={true}
                    />
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      <ChatInputContainer
        isSent={isSent}
        // setIsSent={setIsSent}
        setMessages={setMessages}
        setSendMessage={setSendMessage}
      />

      {deletePopup ? (
        <ChatDeletePopup>
          <div className="d-flex flex-column  justify-content-center ">
            <h1>Delete permanently</h1>
            <hr className="p-0 m-1 " />
            <p>This message will be Deleted permeanently </p>
            <div className="d-flex flex-column flex-md-row mx-auto">
              <button
                className="popup-close-button "
                onClick={() => setDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="popup-ok_button"
                onClick={() => handleDeleteOk()}
              >
                Ok
              </button>
            </div>
          </div>
        </ChatDeletePopup>
      ) : (
        ""
      )}

      {showFeaturedPostSuccess ? (
        <AfterSuccessPopUp
          onClose={() => setShowFeaturedPostSuccess(false)}
          successText="The message has been deleted successfully."
        />
      ) : (
        ""
      )}
    </div>
  </>
  );
  
};

export default ChatDashboard;
