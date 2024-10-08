import React from "react";

export default function PhilosophyAbout({ companyName }) {
  return (
    <div className="philosophy_about d-flex align-items-center gap-3 flex-wrap">
      <fieldset className="fieldbox border rounded-3 shadow-sm">
        <legend className="px-3 py-1 rounded-pill bg-white">Stage</legend>
        <p className="m-0"></p>
      </fieldset>

      <fieldset className="fieldbox border rounded-3 shadow-sm">
        <legend className="px-3 py-1 rounded-pill bg-white">Age</legend>
        <p className="m-0"></p>
      </fieldset>

      <fieldset className="fieldbox border rounded-3 shadow-sm">
        <legend className="px-3 py-1 rounded-pill bg-white">
          Founded Startup
        </legend>
        <p className="m-0">{companyName}</p>
      </fieldset>
    </div>
  );
}
