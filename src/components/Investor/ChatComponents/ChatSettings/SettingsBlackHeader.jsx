import React from "react";

export default function SettingsBlackHeader({ children }) {
  return (
    <div
      className="settings_black_header d-flex align-items-center gap-2 bg-black text-white px-3 py-3"
      style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
    >
      {children}
    </div>
  );
}
