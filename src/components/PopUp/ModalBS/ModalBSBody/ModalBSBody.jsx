import "./ModalBSBody.scss";

function ModalBSBody({ children, className }) {
  return <div className={`modal-body ${className}`}>{children}</div>;
}

export default ModalBSBody;
