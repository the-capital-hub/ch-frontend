import React from "react";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import useGetAllMeetings from "../../../pages/InvestorOneLink/InvestorOneLinkAppointment/Hooks/useGetAllMeetings";

const Events = ({oneLinkId,}) => {
  const { meetingsData, loading } = useGetAllMeetings(oneLinkId);
  
  return (
    <div
      className="rounded-2 mt-4 p-4"
      style={{ backgroundColor: "var(--white-to-grey)",maxWidth:"63.5%",width:"100%",marginLeft:"0.8rem" }}
    >
      <div className="d-flex" style={{ justifyContent: "space-between" }}>
        <h4 className="typography">Events</h4>
        <button
          className="btn btn-investor lh-1 me-2 rounded-5"
          style={{ padding: "10px 20px", fontSize: "12px" }}
        >
          Add Event
        </button>
      </div>
      {loading ? (
        <SpinnerBS
          className={
            "d-flex w-100 justify-content-center align-items-center py-5"
          }
        />
      ) : meetingsData.map((item, index) => {
        const day = item.start.getDate();
        const month = item.start.getMonth();
        const year = item.start.getFullYear()
        return(<div
          className="d-flex"
          key={index}
          style={{
            borderLeft: "2px solid #fd7e14",
            marginBottom: "0.7rem",
            paddingLeft: "5px",
            justifyContent: "space-between",
            alignItems:"center"
          }}
        >
          <p
            className="typography"
            style={{ maxWidth: "170px", fontSize: "16px" }}
          >
            {item?.title}
          </p>
          <p className="typography"
          style={{fontSize: "16px" }}>
            {day}/{month}/{year} | {item?.start?.toString().split(" ")[4].split(":")[0]}:{item?.start?.toString().split(" ")[4].split(":")[1]} {item?.timing}
          </p>
        </div>
        )})}
    </div>
  );
};

export default Events;
