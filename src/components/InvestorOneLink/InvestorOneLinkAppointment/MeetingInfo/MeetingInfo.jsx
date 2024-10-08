import React from "react";
import IconFolder from "../../SvgIcons/IconFolder";
import IconAppointment from "../../SvgIcons/IconAppointment";
import IconFileUpload from "../../SvgIcons/IconFileUpload";

export default function MeetingInfo({ files, setFiles, message, setMessage }) {
  // Handle File change
  function handleFileChange(e) {
    setFiles([...e.target.files]);
  }

  // Handle remove File
  function handleRemoveFile(e, index) {
    const filesCopy = [...files].toSpliced(index, 1);
    setFiles(filesCopy);
  }

  // Handle Agenda message change
  function handleAgendaMessage(e) {
    // console.log(e.target);

    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    setMessage(e.target.value);
  }

  // Render File list
  function RenderFileList({ files }) {
    return (
      <div className="d-flex flex-column gap-2">
        {files
          ? files.map((file, index) => {
              return (
                <div className="border rounded p-2 d-flex justify-content-between align-items-center">
                  <IconFolder />
                  <small className="clip__text">{file.name}</small>
                  <button
                    className="small border border-danger bg-danger text-white rounded px-3"
                    style={{ outline: "none" }}
                    onClick={(e) => handleRemoveFile(e, index)}
                  >
                    Delete
                  </button>
                </div>
              );
            })
          : ""}
      </div>
    );
  }

  return (
    <div className="meeting_info border rounded-4 p-lg-4 p-3 d-flex flex-column gap-4">
      <div className="">
        <h4>Meeting for Startups Invested companie’s.</h4>
        {/* 1 hour */}
        <div className="d-flex gap-2">
          <IconAppointment height="20px" width="20px" />
          <p>1 hour</p>
        </div>
      </div>

      {/* uploaded files list */}
      <RenderFileList files={files} />

      {/* Upload Files */}
      <div className="upload_container d-flex flex-column gap-1">
        <p className="small m-0">Upload Files</p>

        <label htmlFor="meetingFile" className="upload_input">
          <input
            type="file"
            name="meetingFile"
            id="meetingFile"
            onChange={handleFileChange}
            className="visually-hidden"
            multiple
          />
          <IconFileUpload />
          <small>Upload files for meeting</small>
        </label>
      </div>

      {/* Agenda */}
      <div className="meeting_agenda d-flex flex-column gap-1 mt-5">
        <p className="small m-0">Agenda</p>
        <div
          className="text_box border rounded"
          style={{ backgroundColor: "rgba(246, 246, 246, 1)" }}
        >
          <p className="small m-0 p-2">
            The meeting for discussion for the startups invested companie’s and
            also a discuss about the funding and investment
          </p>
        </div>

        <div className="border rounded p-2 d-flex align-items-center">
          <textarea
            type="text"
            id="agendaMessage"
            name="agendaMessage"
            placeholder="Type Message"
            className="small border-0 w-100 agenda_input"
            onChange={handleAgendaMessage}
            value={message}
            rows={1}
          />
        </div>
      </div>

      {/* Meeting Info End */}
    </div>
  );
}
