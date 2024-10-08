import React from "react";
import { Link } from "react-router-dom";
import IconEditCapital from "../../../InvestorOneLink/SvgIcons/IconEditCapital";
// import { FaRegEdit } from "react-icons/fa";

export default function OnePagerCompanyAbout({
  description,
  problem,
  solution,
  marketLandscape,
  showEdit,
  editMode = false,
}) {
  // Handle resize
  function handleResize(e) {
    if (e.target.style.height <= "200px") {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + 2 + "px";
    }
  }

  return (
    <div className="onePager_company_about gap-5 px-3 px-lg-4 py-5  rounded-4 border shadow-sm">
      <fieldset className="span_full">
        <legend className="d-flex align-items-center pb-2">
          <p className="m-0" style={{ flex: "0 0 65%" }}>
            Brief Introduction (Up to 250 characters ){" "}
          </p>
          {showEdit && (
            <Link
              to={"/onelink/edit"}
              className="text-black text-decoration-none fs-5 ms-auto d-flex align-items-center gap-2"
            >
              <IconEditCapital color="var(--d-l-grey)" />
              {/* <FaRegEdit size={20} /> */}

              <span style={{ color: "var(--d-l-grey)" }}>Edit</span>
            </Link>
          )}
        </legend>

        {editMode ? (
          <textarea
            type="text"
            readOnly
            value={description || "Brief Introduction"}
            className="onePager_input about_input shadow-sm"
            onchange={handleResize}
            // autoFocus
          />
        ) : (
          <div className="onePager_input about_input shadow-sm">
            <p className="m-0">{description || "Brief Introduction"}</p>
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend>Problem</legend>
        {editMode ? (
          <textarea
            type="text"
            readOnly
            value={problem || "Problem"}
            className="onePager_input about_input shadow-sm"
            onChange={handleResize}
            // autoFocus
          />
        ) : (
          <div className="onePager_input about_input shadow-sm">
            <p className="m-0">{problem || "Problem"}</p>
          </div>
        )}
      </fieldset>

      <fieldset>
        <legend>Solution</legend>
        {editMode ? (
          <textarea
            type="text"
            readOnly
            value={solution || "Solution"}
            className="onePager_input about_input shadow-sm"
            onChange={handleResize}
            // autoFocus
          />
        ) : (
          <div className="onePager_input about_input shadow-sm">
            <p className="m-0">{solution || "Solution"}</p>
          </div>
        )}
      </fieldset>

      <fieldset className="span_full">
        <legend>Market Landscape</legend>
        {editMode ? (
          <textarea
            type="text"
            readOnly
            value={"Market Landscape"}
            className="onePager_input about_input shadow-sm"
            onChange={handleResize}
            // autoFocus
          />
        ) : (
          <div className="onePager_input about_input shadow-sm">
            <p className="m-0">{marketLandscape || "Market Landscape"}</p>
          </div>
        )}
      </fieldset>
    </div>
  );
}
