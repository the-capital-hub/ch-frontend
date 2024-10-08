import React from "react";
import "./OnePagerTeamMember.scss";
import IconCamera from "../../../../InvestorOneLink/SvgIcons/IconCamera";

export default function OnePagerTeamMember({ member }) {
  const { image, name, designation } = member;

  return (
    <div className="onePager_team_member rounded-4 py-3 ps-3 pe-1 border d-flex align-items-center gap-2">
      {/* Image placeholder and ProfilePicture */}
      <div
        className="border rounded bg-light d-flex flex-column justify-content-center align-items-center"
        style={{ width: "125px", height: "125px" }}
      >
        {!image && (
          <>
            <div
              className="bg-white rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "60px", height: "60px" }}
            >
              <IconCamera color="var(--d-l-grey)" />
            </div>
            <small>Photo</small>
          </>
        )}
        {image && (
          <img
            src={image}
            alt={name || "name"}
            className="rounded"
            width={"125px"}
            height={"125px"}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>

      {/* Name and designation */}
      <div className="d-flex flex-column gap-3 flex-grow-1">
        <p className="border-bottom mb-0 small">{name || "Name"}</p>
        <p className="border-bottom mb-0 small">
          {designation || "Designation"}
        </p>
      </div>
    </div>
  );
}
