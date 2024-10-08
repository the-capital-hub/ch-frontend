import React, { useRef, useState } from "react";
import "./CreateMeetingModal.scss";
import {
  ModalBSContainer,
  ModalBSHeader,
  ModalBSBody,
  // ModalBSFooter,
} from "../../../../PopUp/ModalBS";
// import { useSelector } from "react-redux";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
import { createMeetingAPI } from "../../../../../Service/user";

export default function CreateMeetingModal({
  meetings,
  newMeeting,
  setMeetings,
}) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [title, setTitle] = useState("");
  const closeRef = useRef();

  // Handle create Meeting
  async function handleCreateMeeting(e) {
    e.preventDefault();
    // console.log("submitted");

    const newMeetingData = {
      start: newMeeting.start,
      end: newMeeting.end,
      title: title,
    };

    // Start loading
    setLoading(true);

    // API call
    try {
      const { data } = await createMeetingAPI(newMeetingData);
      // console.log("created", data);

      // Revert loading and title
      setLoading(false);
      setTitle("");

      // set success alert
      setAlert({ success: "Meeting Created!" });
      // Update Calender meetings
      setMeetings((prev) => {
        return [
          ...prev,
          {
            ...data,
            start: new Date(data.start),
            end: new Date(data.end),
          },
        ];
      });
      setTimeout(() => {
        closeRef.current.click();
      }, 2000);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    } catch (error) {
      console.log("Create meeting error:", error);

      // Revert loading and title
      setLoading(false);
      setTitle("");

      // set Error alert
      setAlert({ error: "Error creating a meeting! Please try again." });
      setTimeout(() => {
        closeRef.current.click();
      }, 2000);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    }
  }

  // Handle title
  function handleTitle(e) {
    setTitle(e.target.value);
  }

  return (
    <div className="create_meeting_modal_wrapper">
      <ModalBSContainer id={"createMeetingModal"}>
        <ModalBSHeader title={"Create Meeting"} closeRef={closeRef} />
        <ModalBSBody>
          {!alert ? (
            <form
              onSubmit={handleCreateMeeting}
              className="newMeeting_form d-flex flex-column gap-3 py-3"
            >
              {/* Time */}
              <div className="d-flex justify-content-around gap-3">
                <fieldset className="w-50">
                  <legend>Start Time</legend>
                  <p className="m-0">
                    {newMeeting?.start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </fieldset>

                <fieldset className="w-50">
                  <legend>End Time</legend>
                  <p className="m-0">
                    {newMeeting?.end.toLocaleTimeString([], {
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
                  {newMeeting?.end.toLocaleDateString("en-IN", {
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
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="meeting_input bg-transparent"
                  placeholder="Enter Title"
                  onChange={handleTitle}
                  value={title}
                  required
                />
              </fieldset>

              {/* Submit */}
              <button
                type="submit"
                className={`btn btn-investor w-100 d-flex justify-content-center align-items-center gap-2 ${
                  loading ? "opacity-50" : ""
                } `}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <SpinnerBS spinnerSizeClass="spinner-border-sm" />
                    <span className="text-muted">Please wait</span>
                  </>
                ) : (
                  "Create"
                )}
              </button>
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
