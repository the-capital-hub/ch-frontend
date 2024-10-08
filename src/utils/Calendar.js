import moment from "moment";

export const formatDateTime = (dateTime) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  // Parse the original date
  const originalDate = new Date(dateTime);

  // Format the date
  return originalDate.toLocaleDateString("en-IN", options);
};

// Custom Event component
export const EventComponent = ({ event }) => {
  const { title, start, end, requestedBy, bookedBy } = event;

  const date = moment(start).format("ddd MMM DD");
  const startTime =
    moment(start).minutes() === 0
      ? moment(start).format("ha")
      : moment(start).format("h:ma");
  const endTime =
    moment(end).minutes() === 0
      ? moment(end).format("ha")
      : moment(end).format("h:ma");

  // const dayColors = [
  //   "rgba(81, 81, 81, 1)",
  //   "rgba(255, 144, 84, 1)",
  //   "rgba(173, 133, 238, 1)",
  //   "rgba(131, 188, 187, 1)",
  //   "rgba(65, 140, 253, 1)",
  //   "#ff6600",
  //   "rgba(131, 188, 187, 1)",
  // ];

  const eventBg = {
    booked: "rgba( 86,240,0, 0.75)",
    pending: "rgba( 255,56,56,0.75)",
    available: "rgba(45,204,255, 0.75)",
  };

  const meetingBg = requestedBy?.length
    ? eventBg.pending
    : bookedBy
    ? eventBg.booked
    : eventBg.available;

  let meetingFlag;
  if (moment(start, "day").isBefore(moment(), "day")) {
    meetingFlag = "completed";
  } else if (moment(start, "day").isAfter(moment(), "day")) {
    meetingFlag = "up coming";
  } else if (moment(start, "day").isSame(moment(), "day")) {
    meetingFlag = "today";
  }

  // let statusFlag = bookedBy
  //   ? "Booked"
  //   : requestedBy.length
  //   ? "Pending"
  //   : "Available";

  return (
    <div
      className="custom__event"
      style={{
        backgroundColor: `${meetingBg}`,
        width: "100%",
        height: "100%",
      }}
    >
      <p className="event__text small fw-light lh-base m-0 ">{title}</p>
      <p className="event__text small fw-light lh-base m-0 ">{date}</p>
      <p className="event__text small fw-light lh-base m-0 ">
        {startTime}-{endTime}
      </p>
      <div className="meeting__flag">
        <p className=" small fw-light lh-base text-black m-0 bg-white px-2 rounded-pill text-capitalize">
          {meetingFlag}
        </p>
      </div>
      {/* <div className="meeting__flag">
          <p className=" small fw-light lh-base text-black m-0 bg-white px-2 rounded-pill text-capitalize">
            {statusFlag}
          </p>
        </div> */}
    </div>
  );
};
