import React from "react";
import SettingsBar from "../../Shared/SettingsBar/SettingsBar";
import "./AccountManagement.scss";

export default function AccountManagement() {
  return (
    <div className="account-management-wrapper d-flex flex-column shadow-sm">
      <h4 className="m-0 px-3 py-3">Account Management</h4>
      <div className="border-top px-3 py-3">
        <SettingsBar text={"Close Account"} link={"close-account"} />
      </div>
    </div>
  );
}
