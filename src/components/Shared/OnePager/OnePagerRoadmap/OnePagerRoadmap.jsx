import React from "react";
// import IconCalendar from "../../../InvestorOneLink/SvgIcons/IconCalendar";
import { SlCalender } from "react-icons/sl";


export default function OnePagerRoadmap({ companyData }) {

  return (
    <div className="onePager_roadmap">
      <h4 className="main_color">Roadmap</h4>
      <div className="two_col_grid row-gap-4 column-gap-5">
        {companyData?.roadMap.map((roadMap, index) => (
          <React.Fragment key={index}>
            <fieldset>
              <legend className="main_color">Date</legend>
              <div className="onePager_input d-flex justify-content-between align-items-center main_border">
                <input
                  type="text"
                  readOnly
                  value={roadMap?.date || ""}
                  className="date_input border-0 w-100"
                />
                {/* <IconCalendar /> */}
                <SlCalender />

              </div>
            </fieldset>
            <fieldset>
              <legend className="main_color">Milestone {index + 1}</legend>
              <input
                type="text"
                readOnly
                value={roadMap?.milestone || ""}
                className="onePager_input shadow-sm main_border"
              />
            </fieldset>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
