import { useEffect, useRef } from "react";
import { IoDocuments } from "react-icons/io5";
import { IoImageOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoLinkOutline } from "react-icons/io5";
import IconAttach from "../../../../SvgIcons/IconAttach";

export default function AttachmentSelector({
  showAttachDocs,
  setShowAttachDocs,
  handleFileChange,
  handleOnelinkClick,
}) {
  const attachDocContainerRef = useRef();

  // Outside Click Handler
  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (
        attachDocContainerRef.current &&
        !attachDocContainerRef.current.contains(event.target)
      ) {
        setShowAttachDocs(false);
      }
    };

    document.addEventListener("click", outsideClickHandler);

    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [setShowAttachDocs]);

  return (
    <div className="attactment-container" ref={attachDocContainerRef}>
      <button
        className="btn border-0 bg-transparent"
        onClick={() => setShowAttachDocs(!showAttachDocs)}
      >
        <IconAttach
          size={"20px"}
          color={`${showAttachDocs ? "var(--currentTheme)" : "#989898"}`}
        />
      </button>
      {showAttachDocs && (
        <div className="attachment-options shadow-sm">
          <div className="attachment-option">
            <label htmlFor="documentInput" style={{ cursor: "pointer" }}>
              <div className="p-1 rounded-circle">
                <IoDocuments size={24} color="#000" />
              </div>
              <p>Document</p>
            </label>
            <input
              type="file"
              id="documentInput"
              name="document"
              hidden
              onChange={handleFileChange}
            />
          </div>
          <div className="attachment-option">
            <label htmlFor="image" style={{ cursor: "pointer" }}>
              <div className="p-1 rounded-circle">
                <IoImageOutline size={24} color="#000" />
              </div>
              <p>Image</p>
            </label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/svg+xml"
              id="image"
              name="image"
              hidden
              onChange={handleFileChange}
            />
          </div>
          <div className="attachment-option">
            <label htmlFor="video" style={{ cursor: "pointer" }}>
              <div className="p-1 rounded-circle">
                <IoVideocamOutline size={24} color="#000" />
              </div>
              <p>Video</p>
            </label>
            <input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              id="video"
              name="video"
              hidden
              onChange={handleFileChange}
            />
          </div>
          <div className="attachment-option" onClick={handleOnelinkClick}>
            <label htmlFor="onelink" style={{ cursor: "pointer" }}>
              <div className="p-1 rounded-circle">
                <IoLinkOutline size={24} color="#000" />
              </div>
              <p>OneLink</p>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
