import React from "react";
import "./ProfileInformation.scss";
import SettingsBar from "../../Shared/SettingsBar/SettingsBar";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectIsMobileView } from "../../../../../Store/features/design/designSlice";

export default function ProfileInformation({ setActiveTab }) {
  const isMobileView = useSelector(selectIsMobileView);

  return (
    <div className="profile-information-wrapper d-flex flex-column shadow-sm">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-3">
        {isMobileView && (
          <Button
            className="back-button btn-sm rounded-circle border-0 bg-transparent"
            onClick={() => setActiveTab(null)}
          >
            <FaArrowLeft size={15} />
          </Button>
        )}
        Profile Information
      </h4>
      <div className="border-top px-3 py-3">
        <SettingsBar
          text={"Name, Personal Information, Bio"}
          link="profile-information"
        />
      </div>
    </div>
  );
}
