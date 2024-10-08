import React, { useEffect, useRef, useState } from "react";
import "./InvestorOneLinkAppointment.scss";
import { IoTimeOutline } from "react-icons/io5";
import { TbFileUpload } from "react-icons/tb";
import AfterSuccessPopUp from "../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { HiOutlineFolderMinus } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsMobileView,
  selectTheme,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
import moment from "moment";
import {
  addMessage,
  addNotificationAPI,
  createChat,
  createMeetingAPI,
  createMeetingLink,
} from "../../../Service/user";
import { setChatId } from "../../../Store/features/chat/chatSlice";
import { generateId } from "../../../utils/ChatsHelpers";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import Calendar from "../../../components/InvestorOneLink/InvestorOneLinkAppointment/Calendar/Calendar";
import { getBase64 } from "../../../utils/getBase64";

const times = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
];

export default function InvestorOneLinkAppointment() {
  const { userId } = useParams();
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [open, setOpen] = useState(false);
  const [fromTime, setFromTime] = useState("10:00");
  const [toTime, setToTime] = useState("10:30");
  const [agenda, setAgenda] = useState("");
  const [timing, setTiming] = useState("AM");
  const [title, setTitle] = useState("");
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    document.title = "Appointment | The Capital Hub";
    dispatch(setPageTitle("Appointment"));
  }, [dispatch]);

  const handleProfileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFiles(file);
  };

  const handelAppointment = async () => {
    try {
      if (loggedInUserId === userId) {
        alert("Same user cannot book a meeting");
        return;
      }
      let doc = "";
      if (selectedFiles) {
        doc = await getBase64(selectedFiles);
      }

      const newMeetingData = {
        start: fromTime,
        end: toTime,
        title,
        agenda,
        oneLinkId: userId,
        doc: doc,
        timing,
      };

      if (!loggedInUser.meetingToken) {
        const response = await createMeetingLink(window.location.href);
        window.location.href = response.data;
      } else {
        const { data } = await createMeetingAPI({ ...newMeetingData });
        if (data) {
          const notificationBody = {
            recipient: userId,
            type: "onlinkRequest",
            achievementId: "658bb97a8a18edb75e6f4243",
          };
          setOpen(true);
          const schuldedUserId = data.userId;
          await createChat(schuldedUserId, loggedInUserId)
            .then(async (res) => {
              if (res.message === "Chat already exists") {
                await addNotificationAPI(notificationBody);
                const message = {
                  id: generateId(),
                  senderId: loggedInUserId,
                  text: `${loggedInUser.firstName} ${loggedInUser.lastName} has scheduled a meeting with you on ${date} at ${fromTime} ${timing}`,
                  chatId: res?.data?._id,
                };
                await addMessage(message);
                return;
              }
              await addNotificationAPI(notificationBody);
              dispatch(setChatId(res?.data._id));
              const message = {
                id: generateId(),
                senderId: loggedInUserId,
                text: `${loggedInUser.firstName} ${loggedInUser.lastName} has scheduled a meeting with you on ${date} at ${fromTime} ${timing}`,
                chatId: res?.data?._id,
              };
              await addMessage(message);
            })
            .catch((error) => {
              console.error("Error creating chat-->", error);
            });
        }
      }
    } catch (error) {
      console.error("Create meeting error:", error);
    }
  };

  return (
    <div className="appointment_wrapper mb-5">
      <h2 className="mb-3 px-3 px-xxl-0 fw-bold page_heading">
        Schedule an appointment
      </h2>
      <section className="appointment_section py-4 rounded-4 border d-flex flex-column gap-4">
        <h4 className="div__heading px-3 px-lg-4">Select Date & Time</h4>
        <div className="two_col_container">
          <div
            className="calendar d-flex"
            style={{
              padding: "2rem",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <div
              className="calender__div"
              style={{
                maxWidth: "600px",
                width: "100%",
              }}
            >
              <div
                className="calender rounded-2"
                style={{ width: "600px", background: "#212224" }}
              >
                <Calendar setDate={setDate} date={date} />
              </div>
              <p style={{ paddingTop: "1rem" }}>Time</p>
              <div style={{ display: "flex" }}>
                <div>
                  <p style={{ marginBottom: 0 }}>From</p>
                  <div
                    style={{
                      display: "flex",
                      background: "#3c3e45",
                      maxWidth: "100px",
                      padding: "10px",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <IoTimeOutline />
                    <select
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                      onChange={(e) => {
                        setFromTime(e.target.value);
                      }}
                    >
                      {times.map((item) => (
                        <option key={item} value={item} style={{ color: "#000" }}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ marginLeft: "1rem" }}>
                  <p style={{ marginBottom: 0 }}>To</p>
                  <div
                    style={{
                      display: "flex",
                      background: "#3c3e45",
                      maxWidth: "100px",
                      padding: "10px",
                      alignItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <IoTimeOutline />
                    <select
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                      onChange={(e) => {
                        setToTime(e.target.value);
                      }}
                    >
                      {times.map((item) => (
                        <option key={item} value={item} style={{ color: "#000" }}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ marginLeft: "2rem" }}>
                  <p style={{ marginBottom: 0 }}>Time</p>
                  <div
                    style={{
                      display: "flex",
                      background: "#3c3e45",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      style={{
                        background: timing === "AM" ? "#DDFF71" : "transparent",
                        color: timing === "AM" ? "#000" : "#fff",
                        padding: "10px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setTiming("AM");
                      }}
                    >
                      AM
                    </div>
                    <div
                      style={{
                        background: timing === "PM" ? "#DDFF71" : "transparent",
                        color: timing === "PM" ? "#000" : "#fff",
                        padding: "10px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setTiming("PM");
                      }}
                    >
                      PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="rounded-2"
              style={{
                background: theme === "dark" ? "#212224" : "#f5f5f5",
                maxWidth: "600px",
                width: "100%",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <label>Meeting Title</label>
                <input
                  className="profile_edit_field w-100"
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px",
                    background: "#35363A",
                  }}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div style={{ paddingTop: "0.5rem" }}>
                <p style={{ marginBottom: 0 }}>Meeting Duration</p>
                <p>
                  <IoTimeOutline /> 1 hour
                </p>
              </div>
              <div
                style={{
                  margin: "0.3rem 0 0.5rem",
                  width: "100%",
                }}
              >
                {selectedFiles ? (
                  <div
                    style={{
                      color: "#fff",
                      background: "#2D2D2D",
                      marginBottom: "0.4rem",
                      borderRadius: "10px",
                      padding: "1rem 0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <HiOutlineFolderMinus color="#8C5AC9" size={30} />
                    <p style={{ marginBottom: 0 }}>{selectedFiles.name}</p>
                    <button
                      style={{
                        padding: "0px 20px",
                        border: "none",
                        background: "#FF6C6C",
                        borderRadius: "5px",
                      }}
                      onClick={() => {
                        setSelectedFiles(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      background: "rgba(140, 90, 201, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "1rem 0",
                      borderRadius: "5px",
                      border: "2px dotted",
                      color: "#8C5AC9",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={handleProfileClick}
                  >
                    <TbFileUpload color="#8C5AC9" size={55} />
                    <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                      Upload files for meeting
                    </p>
                    <input
                      id="file-input"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
              <div>
                <label>Agenda</label>
                <textarea
                  className="profile_edit_field w-100"
                  style={{
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px",
                    background: "#35363A",
                    minHeight: "100px",
                  }}
                  value={agenda}
                  onChange={(e) => {
                    setAgenda(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: "0 2rem",
            }}
          >
            <button
              style={{
                background: "#ff0000",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                marginRight: "15px",
                maxWidth: "150px",
                width: "100%",
              }}
            >
              Cancel
            </button>
            <button
              style={{
                background: "#DDFF71",
                border: "none",
                padding: "10px 20px",
                borderRadius: "25px",
                color: "black",
                maxWidth: "200px",
                width: "100%",
              }}
              onClick={handelAppointment}
            >
              Create a schedule
            </button>
          </div>
        </div>
      </section>
      {open && (
        <AfterSuccessPopUp
          withoutOkButton
          onClose={() => setOpen(!open)}
          successText="Authentication with Google completed"
        />
      )}
    </div>
  );
}
