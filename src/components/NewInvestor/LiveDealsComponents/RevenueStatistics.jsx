import React from 'react';
import Revenue1 from "../../../Images/Investor/CompanyProfile/image 83-1.png";
import Revenue2 from "../../../Images/Investor/CompanyProfile/image 83-6.png";
// import "./revenueStatistics.scss";

const RevenueStatistics = ({ startup, colorCard }) => {
  return (
    <>
      <h6 className="div__heading text-white mt-3">{`Revenue Statistics`}</h6>
      <div className="stat__row mt-3 text-white d-flex flex-wrap gap-4 gap-lg-5">
        <div
          className="p-2 rounded-3 text-white d-flex justify-content-between stat__badge"
          style={{
            backgroundColor: "#333333",
          }}
        >
          <div className="d-flex flex-column gap-2 justify-content-center ps-2">
            <p className="small">
              {startup === "true" ? "Last year revenue(FY 23)" : "Maximum Tickets Size"}
            </p>
            <p className="fw-semibold">
              {startup === "true" ? colorCard?.last_year_revenue || "NA" : colorCard?.maximumTicketsSize || "NA"}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <img src={Revenue1} alt="statistics" style={{ width: "80px" }} />
          </div>
        </div>

        <div
          className="p-2 rounded-3 text-white d-flex justify-content-between stat__badge"
          style={{
            backgroundColor: "#333333",
          }}
        >
          <div className="d-flex flex-column gap-2 justify-content-center ps-2">
            <p className="small">
              {startup === "true" ? "Target (FY 24)" : "Seed Round"}
            </p>
            <p className="fw-semibold">
              {startup === "true" ? colorCard?.target || "NA" : colorCard?.seedRound || "NA"}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <img src={Revenue2} alt="statistics" style={{ width: "80px" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenueStatistics;
