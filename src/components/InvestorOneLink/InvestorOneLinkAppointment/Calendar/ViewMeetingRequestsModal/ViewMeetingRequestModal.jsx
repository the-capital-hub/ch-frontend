import React, { useRef, useState, useEffect } from "react";
import "./ViewMeetingRequestModal.scss";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../../PopUp/ModalBS";
// import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
import { getAllMeetingRequests } from "../../../../../Service/user";
import MeetingRequest from "./MeetingRequest/MeetingRequest";

export default function ViewMeetingRequestModal({ setMeetings }) {
  // States for loading and alert
  // const [loading, setLoading] = useState(false);
  // const [alert, setAlert] = useState(null);
  const closeRef = useRef();
  // const [expandedRequest, setExpandedRequest] = useState("null");
  const [meetingRequests, setMeetingRequests] = useState([]);

  useEffect(() => {
    getAllMeetingRequests()
      .then(({ data }) => {
        setMeetingRequests(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const meetingRequests = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     company: "ABC Inc",
  //     agenda: "Discussion",
  //     onelink: "example.com",
  //     phone: "123-456-7890",
  //     email: "john@example.com",
  //     startDate: "2023-10-21 14:30",
  //     endDate: "2023-10-21 16:00"
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     company: "XYZ Corp",
  //     agenda: "Presentation",
  //     onelink: "xyzcorp.com",
  //     phone: "987-654-3210",
  //     email: "jane@xyzcorp.com",
  //     startDate: "2023-10-22 10:00",
  //     endDate: "2023-10-22 12:00"
  //   },
  // ];

  // console.log("Meeting requests", meetingRequests);

  return (
    <div className="view_meeting_modal_wrapper">
      <ModalBSContainer id={"meetingRequestsModal"}>
        <ModalBSHeader title={"Meeting Requests"} closeRef={closeRef} />
        <ModalBSBody>
          {meetingRequests && meetingRequests.length > 0 ? (
            meetingRequests.map((request) => (
              <MeetingRequest
                request={request}
                key={request._id}
                setMeetingRequests={setMeetingRequests}
                setMeetings={setMeetings}
              />
            ))
          ) : (
            <div className="no-requests-found">
              <p>No Request Found</p>
            </div>
          )}
        </ModalBSBody>
      </ModalBSContainer>
    </div>
  );
}
