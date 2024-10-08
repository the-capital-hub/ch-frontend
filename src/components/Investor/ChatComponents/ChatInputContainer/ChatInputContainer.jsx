import React, { useEffect, useState } from "react";
import AttachmentPreview from "./ChatAttachments/AttachmentPreview/AttachmentPreview";
import ImageAttachment from "./ChatAttachments/ImageAttachment/ImageAttachment";
import VideoAttachment from "./ChatAttachments/VideoAttachment/VideoAttachment";
import DocumentAttachment from "./ChatAttachments/DocumentAttachment/DocumentAttachment";
import {
  addMessage,
  getCommunityById,
  getStartupByFounderId,
  getInvestorById,
  updateUserById,
  addNotificationAPI,
  getUserByIdBody,
  blockUser,
  unblockUser,
} from "../../../../Service/user";
import "./ChatInputContainer.scss";
import { getBase64 } from "../../../../utils/getBase64";
import { useDispatch, useSelector } from "react-redux";
import { s3 } from "../../../../Service/awsConfig";
import AttachmentSelector from "./ChatAttachments/AttachmentSelector/AttachmentSelector";
import IconSend from "../../SvgIcons/IconSend";
import { generateId } from "../../../../utils/ChatsHelpers";
import toast from "react-hot-toast";
import { loginSuccess } from "../../../../Store/features/user/userSlice";
import { blockUserSuccess, unblockUserSuccess, selectBlockedUsers } from "../../../../Store/features/chat/chatSlice";

export default function ChatInputContainer({
  setSendMessage,
  isSent,
  setMessages,
}) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const loggedInUserId = useSelector((state) => state.user.loggedInUser._id);
  const userFirstName = useSelector((state) => state.user.loggedInUser.firstName);
  const userLastName = useSelector((state) => state.user.loggedInUser.lastName);
  const userProfilePicture = useSelector((state) => state.user.loggedInUser.profilePicture);
  const userOneLink = useSelector((state) => state.user.loggedInUser.oneLink);
  const userOneLinkId = useSelector((state) => state.user.loggedInUser.oneLinkId);
  const chatId = useSelector((state) => state.chat.chatId);
  const userId = useSelector((state) => state.chat.userId);
  const isCommunitySelected = useSelector((state) => state.chat.isCommunitySelected);
  const blockedUsers = useSelector(selectBlockedUsers);
  const dispatch = useDispatch();

  const [sendText, setSendText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showAttachDocs, setShowAttachDocs] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [community, setCommunity] = useState([]);
  
  const isBlocked = blockedUsers.includes(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserByIdBody(userId);
        setInputDisabled(userResponse.data.blockedUsers.includes(loggedInUserId));
      } catch (error) {
        console.error("Error", error.response?.data || error.message);
      }
    };

    fetchData();
  }, [userId, loggedInUserId]);

  useEffect(() => {
    getCommunityById(chatId)
      .then((res) => {
        setCommunity(res.data);
      })
      .catch((error) => {
        console.error("Error-->", error);
      });
  }, [chatId, isCommunitySelected]);

  const handleSend = async () => {
    if (
      sendText?.trim() === "" &&
      selectedImage === null &&
      selectedVideo === null &&
      selectedDocument === null
    )
      return;

    const uniqueId = generateId();

    const message = {
      id: uniqueId,
      senderId: loggedInUserId,
      text: sendText,
      chatId: chatId,
    };

    if (selectedImage) {
      const image = await getBase64(selectedImage);
      message.image = image;
    }
    if (selectedVideo) {
      const video = await getBase64(selectedVideo);
      message.video = video;
    }
    if (selectedDocument) {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${selectedDocument.name}`;
      const params = {
        Bucket: "thecapitalhubwebsitedocuments",
        Key: `documents/${fileName}`,
        Body: selectedDocument,
      };
      try {
        const res = await s3.upload(params).promise();
        message.documentName = selectedDocument.name;
        message.documentUrl = res.Location;
      } catch (error) {
        console.error("Error uploading file to S3:", error);
      }
    }

    addMessage(message)
      .then(({ data }) => {})
      .catch((error) => {
        console.error("Error-->", error);
      });

    message.senderId = {
      _id: loggedInUserId,
      firstName: userFirstName,
      lastName: userLastName,
      profilePicture: userProfilePicture,
    };

    let recieverId;
    if (isCommunitySelected) {
      recieverId = community.members.filter(
        (member) => member !== loggedInUserId
      );
    } else {
      recieverId = [userId];
    }
    const createdAt = new Date().toISOString();
    setSendMessage({ ...message, recieverId, createdAt });
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...message, recieverId, createdAt },
    ]);

    clearInputs();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (event.target.name === "image" && file.type.includes("image")) {
      setSelectedImage(file);
    } else if (event.target.name === "video" && file.type.includes("video")) {
      setSelectedVideo(file);
    } else if (event.target.name === "document") {
      setSelectedDocument(file);
    }
    setShowAttachDocs(false);
    setShowPreview(true);
  };

  const handleOnelinkClick = async () => {
    if (userOneLink) {
      if (loggedInUser.isInvestor === "false") {
        getStartupByFounderId(loggedInUserId)
          .then(({ data }) => {
            setSendText(
              `https://thecapitalhub.in/onelink/${data.oneLink}/${userOneLinkId}`
            );
          })
          .catch((error) => console.log(error));
      } else {
        getInvestorById(loggedInUser.investor)
          .then(({ data }) => {
            setSendText(
              `https://thecapitalhub.in/investor/onelink/${data.oneLink}/${userOneLinkId}`
            );
          })
          .catch((error) => console.log(error));
      }
    } else {
      if (loggedInUser.isInvestor === 'false') {
        setSendText(
          `https://thecapitalhub.in/onelink/${userOneLink}/${userOneLinkId}`
        );

      } else {
        setSendText(
          `https://thecapitalhub.in/investor/onelink/${userOneLink}/${userOneLinkId}`
        );
      }
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const removeSelectedVideo = () => {
    setSelectedVideo(null);
  };

  const removeSelectedDocument = () => {
    setSelectedDocument(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const clearInputs = () => {
    setSendText("");
    setSelectedImage(null);
    setSelectedVideo(null);
    setSelectedDocument(null);
    setShowAttachDocs(false);
    setShowPreview(false);
  };

  const handleBlockUser = () => {
    blockUser(loggedInUser._id, userId)
      .then(() => {
        dispatch(blockUserSuccess(userId));
      })
      .catch((error) => {
        console.error("Error blocking user:", error.response?.data || error.message);
      });
  };

  const handleUnblockUser = () => {
    unblockUser(loggedInUser._id, userId)
      .then(() => {
        dispatch(unblockUserSuccess(userId));
      })
      .catch((error) => {
        console.error("Error unblocking user:", error.response?.data || error.message);
      });
  };

  return (
    <section className="chat_input_section">
      <div className="chat_input_container">
        {/* Preview offcanvas */}
        <AttachmentPreview
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          sendText={sendText}
          setSendText={setSendText}
          handleKeyDown={handleKeyDown}
          handleSend={handleSend}
          clearInputs={clearInputs}
        >
          {/* Image Preview */}
          <ImageAttachment
            selectedImage={selectedImage}
            removeSelectedImage={removeSelectedImage}
          />
          {/* Video Preview */}
          <VideoAttachment
            selectedVideo={selectedVideo}
            removeSelectedVideo={removeSelectedVideo}
          />
          {/* Document Preview */}
          {/* <DocumentAttachment
            selectedDocument={selectedDocument}
            removeSelectedDocument={removeSelectedDocument}
          /> */}
         <ImageAttachment
            selectedImage={selectedDocument}
            removeSelectedImage={removeSelectedDocument}
          />

        </AttachmentPreview>

        {/* Text input */}
        <input
          type="text"
          className="message"
          name="introductoryMessage"
          placeholder={
            isBlocked ? "Unblock to continue the conversation" 
            : inputDisabled? "You cannot reply to this conversation anymore" 
            : "Your Message..."
          }
          onChange={(e) => setSendText(e.target.value)}
          onKeyDown={handleKeyDown}
          value={showPreview ? "" : sendText}
          disabled={isBlocked || inputDisabled}
        />
        <div className="right_icons">
        {( !isBlocked && !inputDisabled ) && <AttachmentSelector
            handleFileChange={handleFileChange}
            handleOnelinkClick={handleOnelinkClick}
            showAttachDocs={showAttachDocs}
            setShowAttachDocs={setShowAttachDocs}
          />}
          <button
            className="btn border-0 send-btn bg-transparent p-0 ps-2"
            onClick={() => handleSend()}
            disabled={isBlocked || inputDisabled}
          >
            <IconSend width="25px" height="25px" />
          </button>
          
        </div>
      </div>
    </section>
  );
}
