import "./ModalBSFooter.scss";

function ModalBSFooter({ cancel, cancelClass, children }) {
  return (
    <div className="modal-footer">
      {cancel && (
        <button type="button" className={cancelClass} data-bs-dismiss="modal">
          Cancel
        </button>
      )}
      {/* <button type="button" className="btn btn-primary">
        Submit Report
      </button> */}
      {children}
    </div>
  );
}

export default ModalBSFooter;
