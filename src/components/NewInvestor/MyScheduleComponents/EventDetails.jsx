import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import meet from "../../../Images/google_meet.png";

const EventDetails = ({ setScreen, meeting }) => {
  console.log(meeting);
  const day = meeting.start.getDate();
  const month = meeting.start.getMonth();
  const year = meeting.start.getFullYear();
  const start = new Date(meeting.start.toString());
  const end = new Date(meeting.end.toString());
 
  // Calculate the difference in milliseconds
  const durationInMillis = end - start;
  console.log(durationInMillis/ (1000 * 60))
  // Convert milliseconds to minutes
  const durationInMinutes = durationInMillis / (1000 * 60);

  // Convert milliseconds to hours and minutes
  const durationInHours = Math.floor(durationInMinutes / 60);

  return (
    <div>
      {" "}
      <div className="d-flex" style={{ alignItems: "center" }}>
        <div
          onClick={() => {
            setScreen("");
          }}
          className="typography"
        >
          <IoIosArrowBack
            style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}
          />{" "}
        </div>
        Event Details
      </div>
      <p style={{ marginTop: "5px" }}>Meeting Title</p>
      <p
        className="typography rounded-2"
        style={{ backgroundColor: "var(--white-to-grey)", padding: "5px" }}
      >
        {meeting.title}
      </p>
      <p style={{ marginTop: "5px" }}>Duration</p>
      <p
        className="typography rounded-2"
        style={{ backgroundColor: "var(--white-to-grey)", padding: "5px" }}
      >
        {durationInMinutes} Mins
      </p>
      <p style={{ marginTop: "5px" }}>Meeting time</p>
      <p
        className="typography rounded-2"
        style={{ backgroundColor: "var(--white-to-grey)", padding: "5px" }}
      >
      {meeting?.start?.toString().split(" ")[4].split(":")[0]}:{meeting?.start?.toString().split(" ")[4].split(":")[1]} - {meeting?.end?.toString().split(" ")[4].split(":")[0]}:{meeting?.end?.toString().split(" ")[4].split(":")[1]} {meeting?.timing}
      </p>
      <p style={{ marginTop: "5px" }}>Date</p>
      <p
        className="typography rounded-2"
        style={{ backgroundColor: "var(--white-to-grey)", padding: "5px" }}
      >
        {day}/{month}/{year}
      </p>
      <p style={{ marginTop: "5px" }}>Location</p>
      <div
        className="typography rounded-2 d-flex"
        style={{ backgroundColor: "var(--white-to-grey)", padding: "5px" }}
      >
        <div
          className="d-flex"
          style={{
            backgroundColor: "#fff",
            borderRadius: "15px",
            width: "25px",
            height: "25px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
          }}
          onClick={()=> window.open(meeting.meetingLink, "_blank")}
        >
          <img src={meet} style={{ width: "20px" }} />
        </div>
        <p>Google Meet</p>
      </div>
      <p style={{ marginTop: "5px" }}>Description</p>
      <p
        className="typography rounded-2"
        style={{
          backgroundColor: "var(--white-to-grey)",
          padding: "5px",
          fontSize: "13px",
        }}
      >
        {meeting.agenda}
      </p>
    </div>
  );
};

export default EventDetails;
