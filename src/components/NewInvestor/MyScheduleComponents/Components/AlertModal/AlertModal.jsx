import React from "react";
import Modal from "../../../../PopUp/Modal/Modal";

export default function AlertModal({ alertMessage }) {
  return (
    <div className="alert_modal_wrapper">
      <Modal className={"py-5 px-3 px-md-5"}>
        <h4 className="grow_in">{alertMessage}</h4>
      </Modal>
    </div>
  );
}
