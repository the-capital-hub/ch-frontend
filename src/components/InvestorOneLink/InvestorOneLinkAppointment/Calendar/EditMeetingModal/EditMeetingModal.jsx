import React, { useRef, useState } from "react";
import "./EditMeetingModal.scss";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../../PopUp/ModalBS";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
import { deleteMeeting } from "../../../../../Service/user";
import Linkify from "react-linkify";

export default function EditMeetingModal({ selectedMeeting, setMeetings }) {
  // States for loading and alert
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const closeRef = useRef();
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const toggleShowMore = () => {
    setShowMoreDetails(!showMoreDetails);
  };
  //   Handle Edit meeting
  async function handleEditMeeting(e) {
    e.preventDefault();
  }

  //   handle delete meeting
  async function handleDeleteMeeting(e) {
    setLoading(true);

    try {
      const { data } = await deleteMeeting(selectedMeeting._id);
      //   console.log("deleted meeting", data);

      // Revert loading
      setLoading(false);
      setAlert({ success: "Meeting Removed!" });

      // Update calendar Meetings
      setMeetings((prev) => prev.filter((meeting) => meeting._id !== data._id));

      setTimeout(() => {
        closeRef.current.click();
      }, 2000);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    } catch (error) {

      //   Revert Loading
      setLoading(false);
      setAlert({ error: "Error removing Meeting! Please try again." });

      setTimeout(() => {
        closeRef.current.click();
      }, 2000);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    }
  }

  return (
    <div className="edit_meeting_modal_wrapper">
      <ModalBSContainer id={"editMeetingModal"}>
        <ModalBSHeader
          title={"Meeting Detail"}
          closeRef={closeRef}
          className={"d-l-grey"}
        />
        <ModalBSBody className={"d-l-grey"}>
          {!alert ? (
            <form
              onSubmit={handleEditMeeting}
              className="edit_meeting_form d-flex flex-column gap-3 py-3"
            >
              {/* Time */}
              <div className="d-flex justify-content-around gap-3">
                <fieldset className="w-50">
                  <legend>Start Time</legend>
                  <p className="m-0">
                    {selectedMeeting?.start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </fieldset>

                <fieldset className="w-50">
                  <legend>End Time</legend>
                  <p className="m-0">
                    {selectedMeeting?.end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </fieldset>
              </div>

              {/* Date */}
              <fieldset>
                <legend>Date</legend>
                <p className="m-0">
                  {selectedMeeting?.end.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}
                </p>
              </fieldset>

              {/* Title */}
              <fieldset>
                <legend>Title</legend>
                <p className="m-0">{selectedMeeting?.title}</p>
              </fieldset>
              <fieldset>
                <legend>Agenda</legend>
                <p className="m-0">{selectedMeeting?.agenda}</p>
              </fieldset>
              {selectedMeeting?.bookedBy && (
                <fieldset>
                  <legend>Booked By</legend>
                  <div>
                    <p className="m-0">
                      <span className="booked-by-name">
                        {selectedMeeting?.bookedBy.name}
                      </span>
                      {showMoreDetails ? (
                        <span className="view-more" onClick={toggleShowMore}>
                          View Less
                        </span>
                      ) : (
                        <span className="view-more" onClick={toggleShowMore}>
                          View More
                        </span>
                      )}
                    </p>
                    {showMoreDetails && (
                      <div className="booked-by-details">
                        <p>
                          <strong>Company:</strong>{" "}
                          {selectedMeeting?.bookedBy.companyName}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          {selectedMeeting?.bookedBy.email}
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          {selectedMeeting?.bookedBy.phone}
                        </p>
                        <p>
                          <strong>Agenda:</strong>{" "}
                          {selectedMeeting?.bookedBy.description}
                        </p>
                        <p>
                          <strong>OneLink:</strong>
                          <Linkify>{selectedMeeting?.bookedBy.oneLink}</Linkify>
                        </p>
                      </div>
                    )}
                  </div>
                </fieldset>
              )}

              {/* Submit */}
              <div style={{display:"flex"}}>
              <button
                type="button"
                className={`btn btn-danger d-flex justify-content-center align-items-center gap-2 ${
                  loading ? "opacity-50" : ""
                } `}
                disabled={loading}
                onClick={handleDeleteMeeting}
                style={{marginRight:"20px"}}
              >
                {loading ? (
                  <>
                    <SpinnerBS
                      spinnerSizeClass="spinner-border-sm"
                      colorClass={"text-white"}
                    />
                    <span className="text-muted">Please wait</span>
                  </>
                ) : (
                  "Delete"
                )}
              </button>
              <button
                type="button"
                className={`btn btn-danger d-flex justify-content-center align-items-center gap-2 ${
                  loading ? "opacity-50" : ""
                } `}
                disabled={loading}
                onClick={()=>{
                  var win = window.open(selectedMeeting?.meetingLink, '_blank');
                  win.focus();
                }}
                style={{backgroundColor:"rgb(211, 243, 107)",color:"#000",borderColor:"rgb(211,243,107)"}}
              >
                {loading ? (
                  <>
                    <SpinnerBS
                      spinnerSizeClass="spinner-border-sm"
                      colorClass={"text-white"}
                    />
                    <span className="text-muted">Please wait</span>
                  </>
                ) : (
                  "Join"
                )}
              </button>
              </div>
            </form>
          ) : (
            <div className="d-flex p-5 justify-content-center align-items-center grow_in">
              {alert?.success && (
                <h4 className="text-center">{alert.success}</h4>
              )}
              {alert?.error && (
                <h4 className="text-center text-danger">{alert.error}</h4>
              )}
            </div>
          )}
        </ModalBSBody>
      </ModalBSContainer>
    </div>
  );
}
