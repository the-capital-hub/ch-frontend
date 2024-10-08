import React from "react";
import { Link } from "react-router-dom";
import IconEditCapital from "../../../InvestorOneLink/SvgIcons/IconEditCapital";
// import { FaRegEdit } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

export default function OnePagerCompanyInfo({
  company,
  location,
  startedAtDate,
  keyFocus,
  socialLinks,
  showEdit,
}) {
  const { website, ...otherLinks } = socialLinks || {};
  const links = Object.values(otherLinks);
  const tags = keyFocus ? keyFocus.split(",") : [];
  // console.log(links);

  return (
    <div className="onePager_company_info d-flex flex-column gap-4 px-3 px-lg-4 py-5  rounded-4 border shadow-sm">
      {/* Startup Name */}
      <fieldset>
        <legend className="d-flex align-items-center pb-2">
          Startup Name
          {showEdit && (
            <Link
              to={"/onelink/edit"}
              className="text-black text-decoration-none fs-5 ms-auto d-flex align-items-center gap-2"
              id="oneLinkEdit"
            >
              <IconEditCapital color="var(--d-l-grey)" />
              {/* <FaRegEdit  size={20}/> */}

              <span style={{ color: "var(--d-l-grey)" }}>Edit</span>
            </Link>
          )}
        </legend>
        <input
          type="text"
          readOnly
          value={company}
          className="onePager_input shadow-sm"
        />
      </fieldset>

      {/* location and date */}
      <div className="d-flex flex-column flex-md-row align-items-center gap-4">
        <fieldset className="w-100">
          <legend>City, Country</legend>
          <input
            type="text"
            readOnly
            value={location}
            className="onePager_input shadow-sm"
          />
        </fieldset>
        <fieldset className="w-100">
          <legend>Founded Date</legend>
          <div className="onePager_input d-flex justify-content-between align-items-center shadow-sm">
            <input
              type="text"
              readOnly
              value={startedAtDate}
              className="date_input border-0 w-100"
            />
            {/* <IconCalendar /> */}
            <SlCalender />
          </div>
        </fieldset>
      </div>

      {/* Tags */}
      <fieldset>
        <legend>Tags</legend>
        {/* <input
          type="text"
          readOnly
          value={keyFocus}
          className="onePager_input shadow-sm"
        /> */}
        <div className="onePager_input d-flex gap-3 align-items-center shadow-sm flex-wrap">
          {tags.map((tag, index) => {
            return (
              <div
                className="rounded d-flex align-items-center justify-content-center flex-wrap px-3 py-2 tag"
                key={tag}
              >
                <p className="m-0 small">{tag}</p>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Website Link */}
      <fieldset>
        <legend>Website Link</legend>
        {/* <input
          type="url"
          readOnly
          value={website}
          className="onePager_input shadow-sm text-break"
        /> */}

        <div className="onePager_input d-flex justify-content-between align-items-center shadow-sm visit_link">
          <input
            type="text"
            readOnly
            value={website}
            className="border-0 w-75 text-break fs-5 link__text__clip"
            style={{ outline: "none" }}
          />
          <a
            href={website}
            target="_blank"
            className="btn-capital px-4 text-decoration-none visit_btn"
            rel="noreferrer"
          >
            Visit
          </a>
        </div>
      </fieldset>

      {/* Social Links */}
      <fieldset className="">
        <legend>Social Links</legend>

        <div className="d-flex align-items-center gap-3 flex-wrap">
          {links.map((link, index) => {
            return (
              <div
                className="onePager_input d-flex justify-content-between align-items-center shadow-sm visit_link"
                key={`${index}`}
              >
                <input
                  type="text"
                  readOnly
                  value={link}
                  className="border-0 w-75 text-break link__text__clip"
                  style={{ outline: "none" }}
                />
                <a
                  href={link}
                  target="_blank"
                  className="btn-capital px-4 text-decoration-none visit_btn"
                  rel="noreferrer"
                >
                  Visit
                </a>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
