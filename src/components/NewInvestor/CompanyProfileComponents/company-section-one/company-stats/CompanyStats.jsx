import {
  About1,
  About2,
  About3,
  Revenue1,
  Revenue2,
  Revenue3,
} from "../../../../../Images/Investor/CompanyProfile";
import revenue from "../../../../../Images/Investor/CompanyProfile/image 83-1.png";
import revenue1 from "../../../../../Images/Investor/CompanyProfile/image 83-4.png";
import revenue2 from "../../../../../Images/Investor/CompanyProfile/image 83-6.png";
import revenue3 from "../../../../../Images/Investor/CompanyProfile/image 83-5.png";
import revenue4 from "../../../../../Images/Investor/CompanyProfile/image 83.png"
import "./CompanyStats.scss";

export default function CompanyStats({
  colorCard,
  startup,
  tam,
  sam,
  som,
  show,
}) {
  return (
    <div className="company__stats d-flex flex-column gap-4">
      {startup === "true" && <h6 className="div__heading">Market size</h6>}
      {/* TAM */}
      <div className="stat__row d-flex flex-wrap gap-4 gap-lg-5">
        {startup === "true" && (
          <div
            className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
            //style={{ backgroundColor: "rgba(255, 115, 115, 1)" }}
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              {/* <p className="small">Total Secured Loans Available</p> */}
              <p className="small">{"TAM"}</p>
              <p className="fw-semibold">{tam || "NA"}</p>
            </div>
            <div
            style={{
              backgroundColor: "rgba(255, 255, 0, 0.1)",
              borderRadius: "10px",
            }}
          >
            <img src={Revenue3} alt="statistics" style={{ width: "80px" }} />
          </div>
          </div>
        )}

        {/* SAM */}
        {startup === "true" && (
          <div
            className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
            //style={{ backgroundColor: "rgba(218, 193, 145, 1)" }}
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              {/* <p className="small">Total Secured Loans Available</p> */}
              <p className="small">{"SAM"}</p>
              <p className="fw-semibold"> {sam || "NA"}</p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 0, 0.1)",
                borderRadius: "10px",
                padding:"5px"
              }}
            >
              <img src={revenue4} alt="statistics" style={{ width: "70px",height:"70px" }} />
            </div>
          </div>
        )}

        {/* SOM */}
        {startup === "true" && (
          <div
            className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
            //style={{ backgroundColor: "rgba(187, 152, 255, 1)" }}
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              {/* <p className="small">Total Secured Loans Available</p> */}
              <p className="small">{"SOM"}</p>
              <p className="fw-semibold"> {som || "NA"}</p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(45, 143, 136, 0.1)",
                borderRadius: "10px",
                padding:"0 5px"
              }}
            >
              <img src={revenue1} alt="statistics" style={{ width: "70px",height:"80px" }} />
            </div>
          </div>
        )}
      </div>
      <h6 className="div__heading">Current Funding</h6>
      <div className="stat__row d-flex flex-wrap gap-4 gap-lg-5">
        <div
          className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
          //style={{ backgroundColor: "rgba(143, 133, 255, 1)" }}
          style={{
            //backgroundColor: "rgba(255, 115, 115, 1)"
            backgroundColor: "#333333",
          }}
        >
          <div className="d-flex flex-column gap-2 justify-content-center ps-2">
            {/* <p className="small">Total Secured Loans Available</p> */}
            <p className="small">
              {startup === "true" ? "Fund Ask" : "Minimum Tickets Size"}
            </p>
            <p className="fw-semibold">
              {" "}
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
          className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
          //style={{ backgroundColor: "rgba(43, 43, 43, 1)" }}
          style={{
            //backgroundColor: "rgba(255, 115, 115, 1)"
            backgroundColor: "#333333",
          }}
        >
          <div className="d-flex flex-column gap-2 justify-content-center ps-2">
            {/* <p className="small">Revenue</p> */}
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

        {/* <div
        className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
        style={{ backgroundColor: "rgba(255, 115, 115, 1)" }}
      >
        <div className="d-flex flex-column gap-2 justify-content-center ps-2">
          <p className="small">PAT</p>
          <p className="fw-semibold">- 2.1 M</p>
        </div>
        <img src={Revenue2} alt="statistics" style={{ width: "80px" }} />
      </div> */}

        <div
          className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
          //style={{ backgroundColor: "rgba(255, 115, 115, 1)" }}
          style={{
            //backgroundColor: "rgba(255, 115, 115, 1)"
            backgroundColor: "#333333",
          }}
        >
          <div className="d-flex flex-column gap-2 justify-content-center ps-2">
            <p className="small">
              {startup === "true" ? "Funds raised" : "Seed Round"}
            </p>
            <p className="fw-semibold">
              {" "}
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
      {!show && <h6 className="div__heading">Previous funding</h6>}
      {!show && (
        <div className="stat__row d-flex flex-wrap gap-4 gap-lg-5">
          <div
            className="p-2 rounded-3 text-white d-flex flex-row justify-content-between stat__badge"
            //style={{ backgroundColor: "rgba(187, 152, 255, 1)" }}
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              <p className="small">
                {startup === "true" ? "Valuation" : "Average Investment"}
              </p>
              <p className="fw-semibold">
                {" "}
                {startup === "true"
                  ? colorCard?.last_round_investment || "NA"
                  : colorCard?.averageInvestment || "NA"}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <img src={About1} alt="statistics" style={{ width: "80px" }} />
            </div>
          </div>

          <div
            className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
            //style={{ backgroundColor: "rgba(218, 193, 145, 1)" }}
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              <p className="small">Total Investment</p>
              <p className="fw-semibold">
                {" "}
                {colorCard?.total_investment || "NA"}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <img src={About2} alt="statistics" style={{ width: "80px" }} />
            </div>
          </div>

          <div
            className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
            //style={{ backgroundColor: "rgba(170, 173, 185, 1)" }}
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              <p className="small">
                {startup === "true" ? "No. of Investors" : "No. of Investments"}
              </p>
              <p className="fw-semibold">
                {startup === "true"
                  ? colorCard?.no_of_investers || "NA"
                  : ` ${colorCard?.no_of_investments}` || "NA"}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <img src={About3} alt="statistics" style={{ width: "80px" }} />
            </div>
          </div>
        </div>
      )}

      {/* Revenue Statistics */}
      {!show && <h6 className="div__heading">{`Revenue Statistics`}</h6>}
      {!show && (
        <div className="stat__row d-flex flex-wrap gap-4 gap-lg-5">
          <div
            className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
            //style={{ backgroundColor: "rgba(43, 43, 43, 1)" }}
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              {/* <p className="small">Revenue</p> */}
              <p className="small">
                {startup === "true"
                  ? "Last year revenue(FY 23)"
                  : "Maximum Tickets Size"}
              </p>
              <p className="fw-semibold">
                {startup === "true"
                  ? colorCard?.last_year_revenue || "NA"
                  : colorCard?.maximumTicketsSize || "NA"}
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

          {/* <div
          className="p-2 rounded-3 text-white d-flex justify-content-between  stat__badge"
          style={{ backgroundColor: "rgba(255, 115, 115, 1)" }}
        >
          <div className="d-flex flex-column gap-2 justify-content-center ps-2">
            <p className="small">PAT</p>
            <p className="fw-semibold">- 2.1 M</p>
          </div>
          <img src={Revenue2} alt="statistics" style={{ width: "80px" }} />
        </div> */}

          <div
            className="p-2 rounded-3 text-white d-flex  justify-content-between stat__badge"
            style={{
              //backgroundColor: "rgba(255, 115, 115, 1)"
              backgroundColor: "#333333",
            }}
          >
            <div className="d-flex flex-column gap-2 justify-content-center ps-2">
              <p className="small">
                {startup === "true" ? "Target (FY 24)" : "Seed Round"}
              </p>
              <p className="fw-semibold">
                {" "}
                {startup === "true"
                  ? colorCard?.target || "NA"
                  : colorCard?.seedRound || "NA"}
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
      )}
    </div>
  );
}
