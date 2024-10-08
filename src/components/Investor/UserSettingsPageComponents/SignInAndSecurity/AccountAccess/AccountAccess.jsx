import React from "react";
import "./AccountAccess.scss";
import SettingsBar from "../../Shared/SettingsBar/SettingsBar";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { selectIsMobileView } from "../../../../../Store/features/design/designSlice";

export default function AccountAccess({ setActiveTab }) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const isMobileView = useSelector(selectIsMobileView);

  return (
    <div className="account-access-wrapper d-flex flex-column">
      <h3 className="m-0 px-3 py-3 d-flex align-items-center gap-3">
        {isMobileView && (
          <Button
            className="back-button btn-sm rounded-circle border-0 bg-transparent"
            onClick={() => setActiveTab(null)}
          >
            <FaArrowLeft size={15} />
          </Button>
        )}
        Account Access
      </h3>
      <div className="border-top px-3 py-3">
        <SettingsBar
          text={"Email Address"}
          entry={loggedInUser.email}
          link={"manage-email-addresses"}
        />
      </div>

      <div className="border-top px-3 py-3">
        <SettingsBar text={"Phone Number"} link={"phone-number-setting"} />
      </div>

      <div className="border-top px-3 py-3">
        <SettingsBar text={"Change Password"} link={"change-password"}/>
      </div>

      <div className="border-top px-3 py-3">
        <SettingsBar text={"Two-Step Verification"} entry={"On"} link={"two-step-verification"}/>
      </div>
    </div>
  );
}
