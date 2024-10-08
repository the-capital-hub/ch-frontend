import React, { useState } from "react";
import IconEdit from "../../../../../Investor/SvgIcons/IconEdit";
import SpinnerBS from "../../../../../Shared/Spinner/SpinnerBS";
import IconDeleteFill from "../../../../../Investor/SvgIcons/IconDeleteFill";
import { deleteRecentEducation } from "../../../../../../Service/user";
import { updateLoggedInUser } from "../../../../../../Store/features/user/userSlice";
import { useDispatch } from "react-redux";
import Modal from "../../../../../PopUp/Modal/Modal";

export default function CurrentEducation({
  data,
  loading,
  handleEditClick,
  clearStates,
}) {
  const dispatch = useDispatch();

  const [deleting, setDeleting] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  // Handle delete click
  async function handleDeleteClick(e, data) {
    // let confirmed = window.confirm(
    //   `Are you sure you want to delete - "${data.schoolName}"?`
    // );
    if (data) {
      // Set deleting
      setDeleting(true);
      try {
        const response = await deleteRecentEducation(data._id);
        // console.log("del response", response);
        dispatch(updateLoggedInUser({ recentEducation: response.data }));
      } catch (error) {
        console.error("Error deleting Education:", error);
      } finally {
        setDeleting(false);
        clearStates();
      }
    } else {
      return;
    }
  }

  return (
    <div className="border rounded-4 p-2 d-flex align-items-center justify-content-between">
      {/* <img
        src={data.logo}
        alt="Institution logo"
        height={"40px"}
        width={"40px"}
        className="rounded-circle"
        style={{ objectFit: "cover" }}
      /> */}

      <h6 className="m-0">{data.course}</h6>

      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-investor px-3 d-flex align-items-center justify-content-center"
          onClick={(e) => handleEditClick(e, data)}
          disabled={loading}
        >
          <IconEdit height="1.125rem" width="1.125rem" />
        </button>
        <button
          type="button"
          className="btn btn-danger d-flex align-items-center justify-content-center"
          onClick={() => setConfirmModal(true)}
          disabled={loading}
        >
          {deleting ? (
            <SpinnerBS spinnerSizeClass="spinner-border-sm" />
          ) : (
            <IconDeleteFill height="1.125rem" width="1.125rem" />
          )}
        </button>
      </div>
      {confirmModal && (
        <Modal>
          <div className="py-3">
            <h4> Are you sure you want to delete - {data.schoolName}?</h4>
            <div className="d-flex justify-content-center  gap-2 mx-auto py-2">
              <button
                className="btn btn-danger"
                onClick={(e) => handleDeleteClick(e, data)}
              >
                Ok
              </button>
              <button
                className="btn"
                style={{ backgroundColor: "#d3f36b" }}
                onClick={() => setConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
