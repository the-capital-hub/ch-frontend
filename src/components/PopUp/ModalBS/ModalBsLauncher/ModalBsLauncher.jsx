import "./ModalBsLauncher.scss";

function ModalBsLauncher({ id, className, children, launchRef }) {
  return (
    <span
      type="button"
      className={`w-100 ${className}`}
      data-bs-toggle="modal"
      data-bs-target={`#${id}`}
      ref={launchRef}
    >
      {children}
    </span>
  );
}

export default ModalBsLauncher;
