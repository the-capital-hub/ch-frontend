import "./ChatDeletePopup.scss";

export default function ChatDeletePopup({ children }) {
  return (
    <div className="ChatDeletePopup">
      <div className="modal-overlay"></div>
      <div className="modal-container">{children}</div>
    </div>
  );
}