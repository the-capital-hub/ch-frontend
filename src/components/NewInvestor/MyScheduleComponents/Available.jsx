import React from "react";
import { IoIosArrowBack } from "react-icons/io";

const Available = ({ setScreen }) => {
  const availableData = [
    {
      weekName: "Mon",
      time: ["10:00 - 11:00 Am", "11:00 - 12:00 Am"],
    },
    {
      weekName: "Tue",
      time: ["10:00 - 11:00 Am", "12:00 - 01:00 Pm"],
    },
    {
      weekName: "Wed",
      time: ["10:00 - 11:00 Am", "01:00 - 02:00 Pm"],
    },
    {
      weekName: "Thu",
      time: ["10:00 - 11:00 Am", "02:00 - 03:00 Pm"],
    },
    {
      weekName: "Fri",
      time: ["10:00 - 11:00 Am", "03:00 - 04:00 Pm"],
    },
    {
      weekName: "Sat",
      time: ["10:00 - 11:00 Am", "04:00 - 05:00 Pm"],
    },
  ];
  return (
    <div>
      <div className="d-flex" style={{ alignItems: "center" }}>
        <div
          onClick={() => {
            setScreen("");
          }}
        >
          <IoIosArrowBack
            style={{ fontSize: "1.25rem", marginRight: "0.5rem" }}
          />{" "}
        </div>
        Edit Available
      </div>
      <p style={{ fontSize: "12px", paddingTop: "4px" }}>Weekly hours</p>
      <div
        className="rounded-2"
        style={{
          backgroundColor: "var(--white-to-grey)",
          padding: "10px",
          color: "#DDFF71",
          marginTop: "10px",
        }}
      >
        {availableData.map((item, index) => (
          <div
            key={index}
            className="d-flex"
            style={{ marginBottom: "10px", justifyContent: "space-between" }}
          >
            <div className="d-flex" style={{ alignItems: "center" }}>
              <input
                type="radio"
                name="gender"
                style={{ backgroundColor: "#DDFF71" }}
              />
              <p style={{ marginLeft: "4px" }}>{item.weekName}</p>
            </div>
            <div style={{ color: "#fff" }}>
              {item.time.map((i) => (
                <p>{i}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Available;
