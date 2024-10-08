import React from "react";
import ProfileInformation from "./ProfileInformation/ProfileInformation";
import Display from "./Display/Display";
import GeneralPreferences from "./GeneralPreferences/GeneralPreferences";
import AccountManagement from "./AccountManagement/AccountManagement";

export default function Account({ setActiveTab }) {
  return (
    <div className="account-wrapper d-flex flex-column gap-2">
      <ProfileInformation setActiveTab={setActiveTab} />

      <Display />

      <GeneralPreferences />

      <AccountManagement />
    </div>
  );
}
