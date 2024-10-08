import { Offcanvas } from "react-bootstrap";
import "./AttachmentPreview.scss";
// import SendIcon from "../../../../../../Images/Send.svg";
import { useSelector } from "react-redux";
import { selectIsMobileView } from "../../../../../../Store/features/design/designSlice";
import { useCallback } from "react";
import IconSend from "../../../../SvgIcons/IconSend";

export default function AttachmentPreview({
  children,
  sendText,
  setSendText,
  handleKeyDown,
  handleSend,
  showPreview,
  setShowPreview,
  clearInputs,
}) {
  const isMobileView = useSelector(selectIsMobileView);

  // Handle Close
  const handleClose = useCallback(() => {
    clearInputs();
  }, [clearInputs]);

  const attachmentListRef = useCallback(
    (node) => {
      if (node && node.childNodes.length === 0) {
        handleClose();
        console.log("This is the node.", node);
      }
    },
    [handleClose]
  );

  return (
    <div className="attachment-preview-wrapper">
      <Offcanvas
        show={showPreview}
        onHide={handleClose}
        placement={isMobileView ? "end" : "end"}
        className="attachment-preview"
        key={"attachment-offcanvas"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Attachments</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column gap-3 p-0">
          <div
            className="attachment-list d-flex flex-column justify-content-center h-100 bg-dark"
            ref={attachmentListRef}
          >
            {children}
          </div>

          {/* Send button */}
          <div className="d-flex align-items-center gap-2 py-2 send-container mt-auto mb-2 px-2">
            <input
              type="text"
              className="text-input flex-grow-1"
              name="introductoryMessage"
              placeholder="Your message..."
              onChange={(e) => setSendText(e.target.value)}
              onKeyDown={handleKeyDown}
              value={sendText}
            />
            <button
              className="btn send-btn send-btn"
              onClick={() => handleSend()}
            >
              {/* <img
                className="send-img "
                src={SendIcon}
                alt="Send"
                width={40}
                height={40}
                onClick={() => handleSend()}
              /> */}
              <IconSend width="25 px" height="25px" />
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
