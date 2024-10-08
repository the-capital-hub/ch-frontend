import React from "react";
import SettingsBar from "../../Shared/SettingsBar/SettingsBar";
import "./Display.scss";

export default function Display() {
  return (
    <div className="display-wrapper d-flex flex-column shadow-sm">
      <h4 className="m-0 px-3 py-3">Display</h4>
      <div className="border-top px-3 py-3">
        <SettingsBar text={"Dark Mode"} link={"dark-mode"} />
      </div>
    </div>
  );
}
