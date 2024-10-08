import React from "react";
import IconCamera from "../../../InvestorOneLink/SvgIcons/IconCamera";

export default function OnePagerCompanyLogo({ image }) {
  return (
    <div
      className="onePager_company_logo rounded-4 py-5 d-flex flex-column gap-3 justify-content-center align-items-center text-white"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
    >
      {image && (
        <>
          <img
            src={image || ""}
            alt={"company name"}
            width={"75px"}
            height={"75px"}
            className="rounded-circle"
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
          {/* Space for tagline if needed */}
        </>
      )}
      {!image && (
        <div
          className="rounded-circle bg-white d-flex justify-content-center align-items-center"
          style={{ width: "75px", height: "75px" }}
        >
          <IconCamera />
        </div>
      )}
      {!image && <p className="m-0 small">Upload Company Logo</p>}
    </div>
  );
}
