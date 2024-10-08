import React from "react";
import "./DarkModeSetting.scss";
import DarkModeToggle from "./Components/DarkModeToggle/DarkModeToggle";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";

function DarkModeSetting() {
  const navigate = useNavigate();
  return (
    <div className="dark-mode-settings">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-2">
        <Button
          className="back-button btn-sm  rounded-circle border-none"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={25} />
        </Button>
        Choose a theme
      </h4>
      <div className="border-top px-3 py-3 d-flex flex-column gap-2">
        <span className="fs-6 text-secondary">
          Choose how your Capital hub experience looks for this device.
        </span>
        <DarkModeToggle />
      </div>
    </div>
  );
}

export default DarkModeSetting;
