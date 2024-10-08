import moment from "moment";
import BigCalendar from "./BigCalendar";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarContainer.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import useGetAllMeetings from "../../../pages/InvestorOneLink/InvestorOneLinkAppointment/Hooks/useGetAllMeetings";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import { EventComponent } from "../../../utils/Calendar";

// Props for react-big-calendar
const calendarData = {
  components: {
    event: EventComponent,
  },
  defaultDate: new Date(),
  scrollToTime: new Date(new Date().setHours(new Date().getHours() - 0.5)),
  views: ["day", "week", "month"],
  messages: {
    previous: <FaArrowLeft />,
    next: <FaArrowRight />,
  },
  max: new Date(new Date().setHours(21, 0, 0)),
  min: new Date(new Date().setHours(9, 0, 0)),
  formats: {
    dayFormat: (date) => moment(date).format("ddd D"),
    dayHeaderFormat: (date) => moment(date).format("MMMM, YYYY"),
    dayRangeHeaderFormat: ({ start, end }) =>
      moment(start).format("MMMM, YYYY"),
    timeGutterFormat: (date) => moment(date).format("h a"),
    eventTimeRangeFormat: ({ start, end }) => {
      return `${moment(start).format("ha")}-${moment(end).format("ha")}`;
    },
  },
};
const mlocalizer = momentLocalizer(moment);

// Calendar Container
export default function CalendarContainer({
  view,
  setView,
  investor = true,
  oneLinkId,
  date,
  setDate,
  setScreen,
  setMeeting
}) {
  const { meetingsData, loading } = useGetAllMeetings(oneLinkId);

  if (view === "day") {
    calendarData.formats.dayHeaderFormat = (date) =>
      moment(date).format("MMMM DD, YYYY");
  }

  return (
    <div className="calendar__container">
      {loading ? (
        <SpinnerBS
          className={
            "d-flex w-100 justify-content-center align-items-center py-5"
          }
        />
      ) : (
        <BigCalendar
          calendarData={calendarData}
          localizer={mlocalizer}
          view={view}
          setView={setView}
          meetingsData={meetingsData}
          investor={investor}
          date={date}
          setDate={setDate}
          setScreen={setScreen}
          setMeeting={setMeeting}
        />
      )}
    </div>
  );
}