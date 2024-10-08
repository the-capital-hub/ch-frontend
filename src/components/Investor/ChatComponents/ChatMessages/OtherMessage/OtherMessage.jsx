import Linkify from "react-linkify";
import documentIcon from "../../../../../Images/Chat/document.svg";
import "./OtherMessage.scss";
import { formatChatTime } from "../../../../../utils/ChatsHelpers";

export default function OtherMessage({ message, idx, isPersonalChat = false }) {
  return (
    <section className="other_sender">
      {!isPersonalChat && message?.showName && (
        <div className="time_name d-flex align-items-center gap-2 mb-2">
          <img
            className="image_profile"
            src={message.senderId?.profilePicture}
            alt={`${message.senderId?.firstName} ${message.senderId?.lastName}`}
          />
          <h6 className="name_title">
            {message.senderId?.firstName} {message.senderId?.lastName}{" "}
          </h6>
          {/* <h6 className="time">{formatTime(new Date(message.createdAt))}</h6> */}
        </div>
      )}
      <div className="other_messages">
        <div className="message_container">
          {/* Text */}
          {message.text !== "" && (
            <Linkify>
              <p className="m-0 text-break text-start">{message.text}</p>
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
            {formatChatTime(new Date(message.createdAt))}
          </span>
        </div>

        {/* {message?.image && (
          <div className="message_container" data-msg-type="media">
            <img
              src={message.image}
              className="image-message"
              alt="message media"
            />
          </div>
        )}
        {message?.video && (
          <div className="message_container" data-msg-type="media">
            <video controls className="video-message">
              <source src={message?.video} type={"video/mp4"} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {message.documentUrl && (
          <div className="message_container" data-msg-type="doc">
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
          </div>
        )} */}
      </div>
    </section>
  );
}
