import React from "react";
import IconTCH from "../../../Investor/SvgIcons/IconTCH";
import "./TCHLogoLoader.scss";

export default function TCHLogoLoader({ className, type = "colorSpinner" }) {
  return (
    <div className={`logo-spinner-container ${className} `}>
      <span className="tch_svg" data-type={type}>
        <IconTCH />
      </span>
    </div>
  );
}
