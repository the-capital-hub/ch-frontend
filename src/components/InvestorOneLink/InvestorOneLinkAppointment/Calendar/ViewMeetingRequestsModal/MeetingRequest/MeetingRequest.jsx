import React, { useState } from "react";
import Linkify from "react-linkify";
import SpinnerBS from "../../../../../Shared/Spinner/SpinnerBS";
import {
  acceptMeetingRequest,
  rejectMeetingRequestAPI,
} from "../../../../../../Service/user";
import { formatDateTime } from "../../../../../../utils/Calendar";

export default function MeetingRequest({
  request,
  setMeetingRequests,
  setMeetings,
}) {
  // States for loading, alert and view more button
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleAccept = async (meetingId, requestId) => {
    setLoading(true);

    try {
      const { data } = await acceptMeetingRequest(meetingId, requestId);
      // console.log("Req accept response", data);

      setLoading(false);
      setAlert({ success: "Request Accepted!" });
      // setTimeout(() => {
      //   closeRef.current.click();
      // }, 2000);
      setTimeout(() => {
        setAlert(null);
        // Set Meeting Requests data
        setMeetingRequests((prev) =>
          prev.filter((request) => request.meetingId !== data._id)
        );
        // Set meetings
        setMeetings((prev) => {
          let copy = prev.map((meeting) => {
            if (meeting._id === data._id) {
              return {
                ...meeting,
                ...data,
                start: new Date(data.start),
                end: new Date(data.end),
              };
            }
            return meeting;
          });

          return copy;
        });
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      setAlert({ error: "Error Accepting Request! Please try again." });
      setLoading(false);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    }
  };

  const handleDecline = async (meetingId, requestId) => {
    setDeleting(true);

    try {
      const { data } = await rejectMeetingRequestAPI(meetingId, requestId);
      console.log("decline response", data);
      setDeleting(false);
      setAlert({ success: "Request Declined!" });
      setTimeout(() => {
        setAlert(null);
        // Set Meeting Requests data
        setMeetingRequests((prev) =>
          prev.filter((request) => request._id !== requestId)
        );
        // Set meetings
        setMeetings((prev) => {
          let copy = prev.map((meeting) => {
            if (meeting._id === data._id) {
              return {
                ...meeting,
                requestedBy: data.requestedBy,
              };
            }
            return meeting;
          });

          return copy;
        });
      }, 2500);
    } catch (error) {
      console.error("Error:", error);
      setAlert({ error: "Error Accepting Request! Please try again." });
      setDeleting(false);
      setTimeout(() => {
        setAlert(null);
      }, 2500);
    }
  };

  return (
    <>
      {!alert ? (
        <div className="meeting-request">
          {/* Request Details */}
          <div className="request-details">
            <h4 className="request-name">{request.name}</h4>
            <div className="request-dates">
              <p>
                <strong>Agenda:</strong> {request.agenda}
              </p>
              <p>
                <strong>Start:</strong> {formatDateTime(request.start)}
              </p>
              <p>
                <strong>End:</strong> {formatDateTime(request.end)}
              </p>
              {expanded && (
                <>
                  <p>
                    <strong>Company:</strong> {request.companyName}
                  </p>
                  <Linkify>
                    <p>
                      <strong>Onelink:</strong> {request.oneLink}
                    </p>
                  </Linkify>
                  <p>
                    <strong>Phone:</strong> {request.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {request.email}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="request-actions">
            <button
              type="button"
              className="view_button"
              onClick={() => setExpanded(!expanded)}
              disabled={loading || deleting}
            >
              {expanded ? "Hide Details" : "View More"}
            </button>
            <button
              type="button"
              className="create_button"
              onClick={() => handleAccept(request.meetingId, request._id)}
              disabled={loading || deleting}
            >
              {loading ? (
                <>
                  <SpinnerBS
                    spinnerSizeClass="spinner-border-sm"
                    colorClass={"text-black"}
                  />
                  <span className="text-muted" style={{ fontSize: "12px" }}>
                    Please wait..
                  </span>
                </>
              ) : (
                "Accept"
              )}
            </button>
            <button
              type="button"
              className="btn btn-danger d-flex align-items-center gap-2"
              style={{ borderRadius: "10px" }}
              onClick={() => handleDecline(request.meetingId, request._id)}
              disabled={loading || deleting}
            >
              {deleting ? (
                <>
                  <SpinnerBS
                    spinnerSizeClass="spinner-border-sm"
                    colorClass={"text-white"}
                  />
                  <span className="text-white-50" style={{ fontSize: "12px" }}>
                    Please wait..
                  </span>
                </>
              ) : (
                "Decline"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex p-5 justify-content-center align-items-center grow_in">
          {alert?.success && <h4 className="text-center">{alert.success}</h4>}
          {alert?.error && (
            <h4 className="text-center text-danger">{alert.error}</h4>
          )}
        </div>
      )}
    </>
  );
}
