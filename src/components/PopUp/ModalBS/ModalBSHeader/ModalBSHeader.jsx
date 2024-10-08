import "./ModalBSHeader.scss";

function ModalBSHeader({ title, label, className, closeRef, closeCallback }) {
  // Callback function when close is clicked
  function handleClose() {
    if (closeCallback) {
      closeCallback(); // If closeCallback exists, call it
    } else {
      // Implement default behavior to close the modal
      console.log("Close functionality not implemented");
    }
  }

  return (
    <div className={`modal-header ${className}`}>
      <h1 className="modal-title fs-5" id={label || "modalLabel"}>
        {title}
      </h1>
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
        ref={closeRef}
        onClick={handleClose}
      ></button>
    </div>
  );
}

export default ModalBSHeader;
