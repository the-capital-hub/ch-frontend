import { useState } from "react";
//import { BiChevronDownCircle, BiChevronUpCircle } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import "./Meetings.scss";
import moment from "moment";

export default function Meetings({ meetingType, meetingsData, view,setScreen }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleDetailClick() {
    //setIsOpen(!isOpen);
    setScreen(meetingType)
  }

  const MeetingItem = ({ meeting, isComplete }) => {
    const { title, start, end } = meeting;
    const date = moment(start).format("MMM ddd DD");
    const startTime =
      moment(start).minutes() === 0
        ? moment(start).format("ha")
        : moment(start).format("h:ma");
    const endTime =
      moment(end).minutes() === 0
        ? moment(end).format("ha")
        : moment(end).format("h:ma");

    return (
      <div className="d-flex justify-content-between align-items-center mb-2 ">
        <li
          className={`meeting__list__item text-capitalize fw-lighter text-opacity-75 ${
            isComplete ? "text-white-50 " : "text-white"
          } `}
        >
          {date}, {startTime}-{endTime} Meeting{" "}
        </li>
        <input
          type="checkbox"
          name="meeting"
          id="meeting"
          defaultChecked={false}
          className="checkbox fw-lighter border border-1 border-white bg-primary text-white"
        />
      </div>
    );
  };

  return (
    <details className="border p-2 text-white rounded-3 " style={{backgroundColor:"#22262c"}}>
      <summary
        className={`text-capitalize meeting__header p-1 d-flex justify-content-between align-items-center ${
          isOpen ? "border-bottom border-white" : ""
        } `}
        onClick={handleDetailClick}
      >
        <p className="text-capitalize">{meetingType}</p>
        {/*{isOpen ? (
          <BiChevronUpCircle style={{ fontSize: "1.25rem" }} />
        //) : (*/}
          <IoIosArrowForward style={{ fontSize: "1.25rem" }} />
      </summary>
      <ul className=" list-unstyled pt-2 px-1 ">
        {meetingType.includes(view) &&
          meetingsData.map((meeting, index) => {
            return (
              <MeetingItem
                key={`${meeting.title}${index}`}
                meeting={meeting}
                isComplete={moment(meeting.start, "day").isBefore(
                  moment(),
                  "day"
                )}
              />
            );
          })}
      </ul>
    </details>
  );
}
