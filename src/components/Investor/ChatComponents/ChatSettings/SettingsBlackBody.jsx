import React from "react";
import "./SettingsBlackBody.scss";

export default function SettingsBlackBody({ children }) {
  return (
    <div
      className="settings_black_body px-2 d-flex flex-column"
      style={{
        borderBottomLeftRadius: "10px",
        borderBottomRightRadius: "10px",
        backgroundColor: "var(--bs-body-bg)",
      }}
    >
      {children}
    </div>
  );
}
