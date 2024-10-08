import React from 'react';
import revenue2 from "../../../Images/Investor/CompanyProfile/image 83-6.png";
import revenue from "../../../Images/Investor/CompanyProfile/image 83-1.png";
import revenue3 from "../../../Images/Investor/CompanyProfile/image 83-5.png";

const CurrentFunding = ({ startup, colorCard }) => {
  return (
    <>
      <h6 className="div__heading text-white mt-3">Current Funding</h6>
      <div className="stat__row mt-3 d-flex flex-wrap gap-4 gap-lg-5">
        <div
          className="p-2 rounded-3 text-white d-flex justify-content-between stat__badge"
          style={{
            backgroundColor: "#333333",
          }}
        >
          <div className="d-flex flex-column gap-2 justify-content-center ps-2">
            <p className="small">
              {startup === "true" ? "Fund Ask" : "Minimum Tickets Size"}
            </p>
            <p className="fw-semibold">
              {startup === "true"
                ? colorCard?.fund_ask || "NA"
                : colorCard?.minimumTicketsSize || "NA"}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(23, 204, 153, 0.1)",
              borderRadius: "10px",
            }}
          >
            <img src={revenue2} alt="statistics" style={{ width: "80px" }} />
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
              {startup === "true" ? "Valuation" : "Maximum Tickets Size"}
            </p>
            <p className="fw-semibold">
              {startup === "true"
                ? colorCard?.valuation || "NA"
                : colorCard?.maximumTicketsSize || "NA"}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(78, 181, 96, 0.1)",
              borderRadius: "10px",
            }}
          >
            <img src={revenue} alt="statistics" style={{ width: "80px" }} />
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
              {startup === "true" ? "Funds raised" : "Seed Round"}
            </p>
            <p className="fw-semibold">
              {startup === "true"
                ? colorCard?.raised_funds || "NA"
                : colorCard?.seedRound || "NA"}
            </p>
          </div>
          <div
            style={{
              backgroundColor: "rgba(138, 214, 121, 0.1)",
              borderRadius: "10px",
            }}
          >
            <img src={revenue3} alt="statistics" style={{ width: "80px" }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentFunding;
