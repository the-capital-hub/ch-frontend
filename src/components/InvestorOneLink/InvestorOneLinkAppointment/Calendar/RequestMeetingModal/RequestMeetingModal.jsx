import React, { useRef, useState } from "react";
// import IconFolder from "../../../SvgIcons/IconFolder";
// import IconAppointment from "../../../SvgIcons/IconAppointment";
// import IconFileUpload from "../../../SvgIcons/IconFileUpload";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../../PopUp/ModalBS";
import "./RequestMeetingModal.scss";
import { requestMeetingAPI } from "../../../../../Service/user";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
// import Modal from "../../../../PopUp/Modal/Modal";

const REQUEST = {
  name: "",
  companyName: "",
  email: "",
  phone: "",
  description: "",
  oneLink: "",
};

export default function RequestMeetingModal({ selectedMeeting, setMeetings }) {
  //   const [files, setFiles] = useState(null);
  const closeRef = useRef();
  const [requestData, setRequestData] = useState(REQUEST);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //   Handle input change
  function handleInputChange(e) {
    const { value, name } = e.target;

    if (name === "agenda") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }

    setRequestData((prev) => ({ ...prev, [name]: value }));
  }

  //   handle request submit
  async function handleRequestSubmit(e) {
    e.preventDefault();
    console.log("meetRequest", requestData);

    // Set loading
    setLoading(true);

    try {
      const { data } = await requestMeetingAPI(
        selectedMeeting._id,
        requestData
      );
      // console.log("response", data);

      // Set Meetings data
      setMeetings((prev) => {
        let copy = [...prev];
        copy.forEach((meeting) => {
          if (meeting._id === data._id) {
            meeting.requestedBy = data.requestedBy;
          }
        });

        return [...copy];
      });

      // Revert loading and request data
      setLoading(false);
      setRequestData(REQUEST);

      // set success alert
      setAlert({ success: "Meeting Request Successfull!" });
      setTimeout(() => {
        closeRef.current.click();
      }, 2000);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    } catch (error) {
      console.log("Error requesting meeting:", error);

      // Revert loading
      setLoading(false);

      // set Error alert
      setAlert({ error: "Error Requesting a Meeting! Please try again." });
      setTimeout(() => {
        closeRef.current.click();
      }, 2000);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    }
  }

  return (
    <div className="request_meeting_modal_wrapper">
      <ModalBSContainer id={"requestMeetingModal"}>
        <ModalBSHeader
          title={"Request Meeting"}
          closeRef={closeRef}
          className={"d-l-grey"}
        />
        <ModalBSBody className={"modal_tall d-l-grey"}>
          {!alert ? (
            <form
              onSubmit={handleRequestSubmit}
              className="request_meeting_form d-flex flex-column gap-3 py-3 px-lg-4 px-3"
            >
              {/* Name */}
              <fieldset>
                <legend className="">Name</legend>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="meeting_input"
                  onChange={handleInputChange}
                  value={requestData.name}
                  required
                />
              </fieldset>

              {/* companyName */}
              <fieldset>
                <legend className="">Company Name</legend>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="meeting_input"
                  onChange={handleInputChange}
                  value={requestData.companyName}
                  required
                />
              </fieldset>

              {/* Email */}
              <fieldset>
                <legend className="">Email</legend>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="meeting_input"
                  onChange={handleInputChange}
                  value={requestData.email}
                  required
                />
              </fieldset>

              {/* Phone */}
              <fieldset>
                <legend className="">Phone Number</legend>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="meeting_input"
                  onChange={handleInputChange}
                  value={requestData.phone}
                  required
                />
              </fieldset>

              {/* Agenda */}
              <fieldset>
                <legend className="">Agenda</legend>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  className="meeting_input"
                  onChange={handleInputChange}
                  value={requestData.description}
                  rows={4}
                  required
                />
              </fieldset>

              {/* OneLink */}
              <fieldset>
                <legend className="">OneLink</legend>
                <input
                  type="text"
                  id="oneLink"
                  name="oneLink"
                  className="meeting_input text-break"
                  onChange={handleInputChange}
                  value={requestData.oneLink}
                />
              </fieldset>

              {/* Action Buttons */}
              <div className="action_buttons d-flex gap-3">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="bg-transparent border fs-6 py-3 rounded-4 w-50"
                  onClick={() => setRequestData(REQUEST)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn-capital fs-6 py-3 w-50 rounded-4 d-flex justify-content-center align-items-center gap-2 ${
                    loading ? "opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <SpinnerBS spinnerSizeClass="spinner-border-sm" />
                      <span className="text-muted">Please wait</span>
                    </>
                  ) : (
                    "Request Meeting"
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
