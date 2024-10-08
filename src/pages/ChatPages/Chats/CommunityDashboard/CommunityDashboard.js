import React, { useEffect, useState, useRef } from "react";
import "./CommunityDashboard.scss";
// import sendIcon from "../../../../Images/Send.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageByChatId,
  // addMessage,
  // getStartupByFounderId,
  // getCommunityById,
  deleteMessage,
  markMessagesAsReadInCommunities,
} from "../../../../Service/user";
// import attachmentGreyIcon from "../../../../Images/Chat/attachtment-grey.svg";
// import attachmentOrangeIcon from "../../../../Images/Chat/attachment-orange.svg";
// import imageIcon from "../../../../Images/Chat/image.svg";
// import documentIcon from "../../../../Images/Chat/document.svg";
// import videoIcon from "../../../../Images/Chat/attachVideo.svg";
// import onelinkIcon from "../../../../Images/Chat/Onelink.svg";
// import { getBase64 } from "../../../../utils/getBase64";
// import Linkify from "react-linkify";
import AfterSuccessPopUp from "../../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import ChatDeletePopup from "../ChatDeletePopup/ChatDeletePopup";
// import ChatDropDownMenu from "../ChatDropDownMenu/ChatDropDownMenu";
// import { s3 } from "../../../../Service/awsConfig";
// import { Offcanvas } from "react-bootstrap";
// import AttachmentPreview from "../../../../components/Investor/ChatComponents/ChatInputContainer/ChatAttachments/AttachmentPreview/AttachmentPreview";
// import ImageAttachment from "../../../../components/Investor/ChatComponents/ChatInputContainer/ChatAttachments/ImageAttachment/ImageAttachment";
// import VideoAttachment from "../../../../components/Investor/ChatComponents/ChatInputContainer/ChatAttachments/VideoAttachment/VideoAttachment";
// import DocumentAttachment from "../../../../components/Investor/ChatComponents/ChatInputContainer/ChatAttachments/DocumentAttachment/DocumentAttachment";
import ChatInputContainer from "../../../../components/Investor/ChatComponents/ChatInputContainer/ChatInputContainer";
// import { IoCheckmarkDone } from "react-icons/io5";
import MyMessage from "../../../../components/Investor/ChatComponents/ChatMessages/MyMessage/MyMessage";
import OtherMessage from "../../../../components/Investor/ChatComponents/ChatMessages/OtherMessage/OtherMessage";
import { formatMessages } from "../../../../utils/ChatsHelpers";
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import { updateLastMessage } from "../../../../Store/features/chat/chatSlice";
import TCHLogoLoader from "../../../../components/Shared/TCHLoaders/TCHLogoLoader/TCHLogoLoader";

const CommunityDashboard = ({
  setSendMessage,
  recieveMessage,
  cleared,
  isRead,
  setIsRead,
}) => {
  // Fetch global state
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const chatId = useSelector((state) => state.chat.chatId);
  // const isCommunitySelected = useSelector(
  //   (state) => state.chat.isCommunitySelected
  // );
  const dispatch = useDispatch();

  const [showFeaturedPostSuccess, setShowFeaturedPostSuccess] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [messages, setMessages] = useState([]);
  // const [user, setUser] = useState(null);

  // const [sendText, setSendText] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [msgId, setMsgId] = useState("");
  const [loading, setLoading] = useState(false);
  // const [showPreview, setShowPreview] = useState(false);

  const chatMessagesContainerRef = useRef(null);

  const handleSetDeletePopup = () => {
    setDeletePopup(true);
  };
  const handleIdBack = (data) => {
    setMsgId(data);
  };

  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTop =
        chatMessagesContainerRef.current.scrollHeight;
    }
  }, [messages, recieveMessage]);

  const handleDelete = async () => {
    try {
      const result = await deleteMessage(msgId);
      console.log("delete message Result:", result);
      if (result) {
        setShowFeaturedPostSuccess(true);
        setDeletePopup(false);
      }
    } catch (error) {
      console.error("Error likeDislike comment : ", error);
    }
  };

  useEffect(() => {
    markMessagesAsReadInCommunities(chatId, loggedInUserId)
      .then((response) => {
        console.log(response.message);
        setIsRead(!isRead);
      })
      .catch((error) => {
        console.error("Error marking messages as read:", error);
      });
  }, [chatId, loggedInUserId, recieveMessage]);

  useEffect(() => {
    console.log(recieveMessage);
    if (recieveMessage !== null && recieveMessage?.chatId === chatId) {
      setMessages((prevMessages) => [...prevMessages, recieveMessage]);
      // update last message
      // dispatch(
      //   updateLastMessage({
      //     chatId: recieveMessage.chatId,
      //     text: recieveMessage.text,
      //   })
      // );
    }
  }, [recieveMessage, chatId, dispatch]);

  useEffect(() => {
    setLoading(true);
    getMessageByChatId(chatId)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error-->", error);
        setLoading(false);
      });
  }, [chatId, cleared, isSent, showFeaturedPostSuccess]);

  // const [community, setCommunity] = useState([]);

  // useEffect(() => {
  //   getCommunityById(chatId)
  //     .then((res) => {
  //       setCommunity(res.data);
  //       setUser(null);
  //     })
  //     .catch((error) => {
  //       console.error("Error-->", error);
  //     });
  // }, [chatId, isCommunitySelected]);

  // const groupMessagesByDate = (messages) => {
  //   const groupedMessages = [];
  //   let currentDate = null;

  //   for (const message of messages) {
  //     const messageDate = new Date(message.createdAt);
  //     const today = new Date();

  //     if (
  //       currentDate &&
  //       currentDate.getDate() === messageDate.getDate() &&
  //       currentDate.getMonth() === messageDate.getMonth() &&
  //       currentDate.getFullYear() === messageDate.getFullYear()
  //     ) {
  //       groupedMessages[groupedMessages.length - 1].messages.push(message);
  //     } else if (
  //       currentDate &&
  //       currentDate.getDate() - messageDate.getDate() === 1 &&
  //       currentDate.getMonth() === messageDate.getMonth() &&
  //       currentDate.getFullYear() === messageDate.getFullYear()
  //     ) {
  //       currentDate = messageDate;
  //       groupedMessages.push({ date: "Yesterday", messages: [message] });
  //     } else {
  //       currentDate = messageDate;
  //       const formattedDate = `${messageDate.getDate()}-${
  //         messageDate.getMonth() + 1
  //       }-${messageDate.getFullYear()}`;
  //       groupedMessages.push({
  //         date:
  //           today.getDate() === messageDate.getDate() ? "Today" : formattedDate,
  //         messages: [message],
  //       });
  //     }
  //   }

  //   return groupedMessages;
  // };

  // const groupedMessages = groupMessagesByDate(messages);
  const formattedMessages = formatMessages(messages, loggedInUserId);

  // const handleSend = async () => {
  //   if (
  //     sendText?.trim() === "" &&
  //     selectedImage === null &&
  //     selectedVideo === null &&
  //     selectedDocument === null
  //   )
  //     return;
  //   const message = {
  //     senderId: loggedInUser._id,
  //     text: sendText,
  //     chatId: chatId,
  //   };

  //   if (selectedImage) {
  //     const image = await getBase64(selectedImage);
  //     message.image = image;
  //   }
  //   if (selectedVideo) {
  //     const video = await getBase64(selectedVideo);
  //     message.video = video;
  //   }
  //   if (selectedDocument) {
  //     console.log("doc");
  //     const timestamp = Date.now();
  //     const fileName = `${timestamp}_${selectedDocument.name}`;
  //     const params = {
  //       Bucket: "thecapitalhubdocuments",
  //       Key: `documents/${fileName}`,
  //       Body: selectedDocument,
  //     };
  //     try {
  //       const res = await s3.upload(params).promise();
  //       message.documentName = selectedDocument.name;
  //       message.documentUrl = res.Location;
  //       console.log(res.Location);
  //     } catch (error) {
  //       console.error("Error uploading file to S3:", error);
  //     }
  //   }

  //   addMessage(message)
  //     .then(({ data }) => {
  //       setIsSent(!isSent);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error-->", error);
  //     });
  //   message.senderId = {
  //     _id: loggedInUser._id,
  //     firstName: loggedInUser.fileName,
  //     lastName: loggedInUser.lastName,
  //     profilePicture: loggedInUser.profilePicture,
  //   };
  //   let recieverId = community.members;
  //   recieverId = recieverId.filter((member) => member !== loggedInUser._id);
  //   const createdAt = new Date().toISOString();
  //   setSendMessage({ ...message, recieverId, createdAt });
  //   setSendText("");
  //   setSelectedImage(null);
  //   setSelectedVideo(null);
  //   setSelectedDocument(null);
  //   setShowAttachDocs(false);
  //   setShowPreview(false);
  // };

  // const formatTime = (date) => {
  //   const options = {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   };

  //   return new Intl.DateTimeFormat("en-US", options).format(date);
  // };

  //
  // const [showAttachDocs, setShowAttachDocs] = useState(false);
  // const attachDocContainerRef = useRef();
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedVideo, setSelectedVideo] = useState(null);
  // const [selectedDocument, setSelectedDocument] = useState(null);

  // useEffect(() => {
  //   const outsideClickHandler = (event) => {
  //     if (
  //       attachDocContainerRef.current &&
  //       !attachDocContainerRef.current.contains(event.target)
  //     ) {
  //       setShowAttachDocs(false);
  //     }
  //   };

  //   document.addEventListener("click", outsideClickHandler);

  //   return () => {
  //     document.removeEventListener("click", outsideClickHandler);
  //   };
  // }, []);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (event.target.name === "image" && file.type.includes("image")) {
  //     setSelectedImage(file);
  //   } else if (event.target.name === "video" && file.type.includes("video")) {
  //     setSelectedVideo(file);
  //   } else if (event.target.name === "document") {
  //     setSelectedDocument(file);
  //   }
  //   setShowAttachDocs(false);
  //   setShowPreview(true);
  // };

  // const handleOnelinkClick = () => {
  //   getStartupByFounderId(loggedInUser._id)
  //     .then(({ data }) => {
  //       setSendText(
  //         `https://thecapitalhub.in/onelink/${data.oneLink}/${loggedInUser.oneLinkId}`
  //       );
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const removeSelectedImage = () => {
  //   setSelectedImage(null);
  // };

  // const removeSelectedVideo = () => {
  //   setSelectedVideo(null);
  // };

  // const removeSelectedDocument = () => {
  //   setSelectedDocument(null);
  // };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     handleSend();
  //   }
  // };

  return (
    <div className="community_dashboard_container">
      <div className="chat_messages_group" ref={chatMessagesContainerRef}>
        {loading ? (
          <div className="d-flex h-100 justify-content-center align-items-center">
            <TCHLogoLoader />
          </div>
        ) : (
          formattedMessages.map((group) => (
            <div key={group.date}>
              <h6 className="date_header px-3 py-1 my-2 bg-light rounded shadow-sm">
                {group.date}
              </h6>
              <div className="chat_messages">
                {group.messages.map((message, idx) =>
                  message.senderId._id === loggedInUserId ? (
                    <MyMessage
                      handleIdBack={handleIdBack}
                      handleSetDeletePopup={handleSetDeletePopup}
                      message={message}
                      idx={idx}
                      key={message._id}
                    />
                  ) : (
                    <OtherMessage
                      message={message}
                      idx={idx}
                      key={message._id}
                    />
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input section */}
      <ChatInputContainer
        isSent={isSent}
        setIsSent={setIsSent}
        setMessages={setMessages}
        setSendMessage={setSendMessage}
      />

      {/* Delete Popup */}
      {deletePopup ? (
        <ChatDeletePopup>
          <div className="d-flex flex-column  justify-content-center ">
            <h1>Delete permanently</h1>
            <hr className="p-0 m-1 " />
            <p>This message will be deleted permanently.</p>
            <div className="d-flex flex-column flex-md-row mx-auto">
              <button
                className="popup-close-button bg-secondary"
                onClick={() => setDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="popup-ok_button"
                onClick={() => handleDelete()}
              >
                Confirm
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
  );
};

export default CommunityDashboard;
