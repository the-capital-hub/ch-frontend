import "./ModalBSContainer.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";

function ModalBSContainer({
  id,
  label,
  children,
  showModal,
  isStatic = true,
  modalXl = false,
  isFade = true,
}) {
  const theme = useSelector(selectTheme);
  return (
    <div
      className={`modal ${isFade ? " fade " : ""} `}
      // style={{ display: showModal ? "block" : "none" }}
      id={id}
      data-bs-backdrop={`${isStatic ? "static" : " "}`}
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={label || "modalLabel"}
    >
      <div
        className={`modal-dialog modal-dialog-centered modal-dialog-scrollable ${
          modalXl ? "modal-xl" : ""
        } `}
      >
        <div className="modal-content" style={{backgroundColor: theme === "dark" ? "#1E1F24" : "white"}}>{children}</div>
      </div>
    </div>
  );
}

export default ModalBSContainer;
