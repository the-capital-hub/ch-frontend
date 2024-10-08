import { useMemo, useCallback, useRef, useState } from "react";
import { Calendar } from "react-big-calendar";
import { ModalBsLauncher } from "../../PopUp/ModalBS";
import CreateMeetingModal from "../../InvestorOneLink/InvestorOneLinkAppointment/Calendar/CreateMeetingModal/CreateMeetingModal";
import moment from "moment";
import RequestMeetingModal from "../../InvestorOneLink/InvestorOneLinkAppointment/Calendar/RequestMeetingModal/RequestMeetingModal";
import AlertModal from "./Components/AlertModal/AlertModal";
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'; 
import { EventComponent } from "../../../utils/Calendar";

export default function BigCalendar({
  calendarData,
  localizer,
  view,
  setView,
  meetingsData,
  investor,
  date,
  setDate,
  setScreen,
  setMeeting
}) {
  // States for meetings
  const [meetings, setMeetings] = useState(meetingsData);
  const [newMeeting, setNewMeeting] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [alert, setAlert] = useState(null);
  const createRef = useRef();
  const editRef = useRef();
  const requestRef = useRef();

  const {
    defaultDate,
    formats,
    max,
    min,
    messages,
    scrollToTime,
    views,
    components,
  } = useMemo(() => calendarData, [calendarData]);

  // handle Navigate
  const handleNavigate = useCallback((newDate) => setDate(newDate), [setDate]);

  // Handle Slot Select
  const handleSelectSlot = useCallback(({ start, end }) => {
    // Check if selected slot is in the past
    if (moment(start, "min").isBefore(moment(), "min")) {
      // window.alert("Unable to travel to past!");
      setAlert("Unable to travel to past!");
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      return;
    }
    // console.log("start", start, "end", end);
    setNewMeeting({ start, end, title: "" });
    createRef.current.click();
  }, []);

  // Handle Select event
  const handleSelectEvent = useCallback(
    (meeting) => {
      setScreen("Event Details")
      setMeeting(meeting);
    },
    []
  );
  //console.log(selectedMeeting)
  const CustomToolbar = ({ label, onNavigate }) => {
    return (
      <div className="rbc-toolbar">
        <div className="rbc-btn" style={{border:"none",outline:"none"}} onClick={() => onNavigate('PREV')}>
          <FaArrowLeftLong />
        </div>
        <span className="rbc-toolbar-label">{label}</span>
        <div className="rbc-btn" style={{border:"none",outline:"none"}} onClick={() => onNavigate('NEXT')}>
          <FaArrowRightLong />
        </div>
      </div>
    );
  };
  return (
    <>
      <Calendar
      components={{
        toolbar: CustomToolbar, // Use the custom toolbar
        event: EventComponent, // Use the custom event component
      }}
        defaultDate={defaultDate}
        date={date}
        onNavigate={handleNavigate}
        events={meetings}
        localizer={localizer}
        max={max}
        min={min}
        showMultiDayTimes={false}
        step={15}
        timeslots={4}
        //defaultView="week"
        view={view}
        onView={(newView) => setView(newView)}
        views={views}
        selectable={investor}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        scrollToTime={scrollToTime}
        formats={formats}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
      />

      <ModalBsLauncher id={"createMeetingModal"} launchRef={createRef} />
      <ModalBsLauncher id={"editMeetingModal"} launchRef={editRef} />
      <ModalBsLauncher id={"requestMeetingModal"} launchRef={requestRef} />

      {/*Create Meeting Modal */}
      <CreateMeetingModal
        meetings={meetings}
        newMeeting={newMeeting}
        setMeetings={setMeetings}
      />
      
      {/* Request Meeting Modal */}
      <RequestMeetingModal
        selectedMeeting={selectedMeeting}
        setMeetings={setMeetings}
      />

      {/* Alert Modal */}
      {alert && <AlertModal alertMessage={alert} />}
    </>
  );
}
