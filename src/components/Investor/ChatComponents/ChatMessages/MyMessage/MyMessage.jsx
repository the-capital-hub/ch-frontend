// import { useSelector } from "react-redux";
// import {
//   selectUserName,
//   selectUserProfilePicture,
// } from "../../../../../Store/features/user/userSlice";
import ChatDropDownMenu from "../../../../../pages/ChatPages/Chats/ChatDropDownMenu/ChatDropDownMenu";
import Linkify from "react-linkify";
import { IoCheckmarkDone } from "react-icons/io5";
import documentIcon from "../../../../../Images/Chat/document.svg";
import "./MyMessage.scss";
import { formatChatTime } from "../../../../../utils/ChatsHelpers";

export default function MyMessage({
  message,
  idx,
  handleIdBack,
  handleSetDeletePopup,
}) {
  // const userName = useSelector(selectUserName);
  // const userProfilePicture = useSelector(selectUserProfilePicture);

  return (
    <section className="my_message_main">
      <div className="my_messages">
        {/* <div className="time_name_image">
          {!idx && (
            <div className="time_name d-flex gap-2 align-items-center me-2 mb-2">
              <h6 className="name_title">{userName}</h6>
              <img
                className="image_profile"
                src={userProfilePicture}
                alt="user profile"
              />
            </div>
          )}
        </div> */}
        <div className="mymessage_container">
          <ChatDropDownMenu
            onClicks={handleSetDeletePopup}
            idBack={handleIdBack}
            id={message.id}
          />
          {/* Text */}
          {message.text !== "" && (
            <Linkify>
              <p className="text-break text-start m-0 mb-1 me-3">
                {message.text}
              </p>
            </Linkify>
          )}
          {/* Image */}
          {message?.image && (
            <div className="image-message">
              <img
                src={message.image}
                className="rounded"
                alt="message media"
              />
            </div>
          )}
          {/* Video */}
          {message?.video && (
            <div className="video-message">
              <video controls className="rounded">
                <source src={message?.video} type={"video/mp4"} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {/* Document */}
          {message?.documentUrl && (
            <a
              href={message.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="document-message"
            >
              <img
                className="p-1 rounded-circle"
                src={documentIcon}
                alt="upload document"
              />
              <p className="m-0">{message.documentName}</p>
            </a>
          )}

          {/* message time */}
          <span className="msg-time">
            <IoCheckmarkDone
              color={message?.read ? "#009b00" : "var(--currentTheme-text)"}
              size={15}
            />
            {formatChatTime(new Date(message.createdAt))}
          </span>
        </div>

        {/* {message?.image && (
          <div className="mymessage_container" data-msg-type="media">
            <ChatDropDownMenu
              onClicks={handleSetDeletePopup}
              idBack={handleIdBack}
              id={message?._id}
            />
            <img
              src={message.image}
              className="image-message"
              alt="message media"
            />
            <span className="msg-time">
              <IoCheckmarkDone
                color={message?.read ? "#009b00" : "white"}
                size={15}
              />
              {formatTime(new Date(message.createdAt))}
            </span>
          </div>
        )}
        {message?.video && (
          <div className="mymessage_container" data-msg-type="media">
            <ChatDropDownMenu
              onClicks={handleSetDeletePopup}
              idBack={handleIdBack}
              id={message?._id}
            />
            <video controls className="video-message">
              <source src={message?.video} type={"video/mp4"} />
              Your browser does not support the video tag.
            </video>
            <span className="msg-time">
              <IoCheckmarkDone
                color={message?.read ? "#009b00" : "white"}
                size={15}
              />
              {formatTime(new Date(message.createdAt))}
            </span>
          </div>
        )}
        {message.documentUrl && (
          <div className="mymessage_container" data-msg-type="doc">
            <ChatDropDownMenu
              onClicks={handleSetDeletePopup}
              idBack={handleIdBack}
              id={message?._id}
            />
            <a
              href={message.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="p-1 rounded-circle"
                src={documentIcon}
                alt="upload document"
              />
              <p>{message.documentName}</p>
            </a>
            <span className="msg-time">
              <IoCheckmarkDone
                color={message?.read ? "#009b00" : "white"}
                size={15}
              />
              {formatTime(new Date(message.createdAt))}
            </span>
          </div>
        )} */}
      </div>
    </section>
  );
}
