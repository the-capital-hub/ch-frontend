import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import "./SettingsBar.scss";
import { Link } from "react-router-dom";

export default function SettingsBar({ text, entry, link }) {
  return (
    <div className="settings-bar d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between flex-grow-1">
        <p className="m-0">{text}</p>
        <p className="m-0">{entry}</p>
      </div>
      <Link to={link} className="btn border-0 setting-btn">
        <FaArrowRight size={25} />
      </Link>
    </div>
  );
}
