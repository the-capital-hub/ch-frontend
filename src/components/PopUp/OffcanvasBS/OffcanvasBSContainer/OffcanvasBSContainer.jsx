import React from "react";
import "./OffcanvasBSContainer.scss";

export default function OffcanvasBSContainer({
  id,
  placement = "offcanvas-end",
  children,
  containerClasses,
  showOffcanvas,
}) {
  return (
    // Add these attributes to the triggering "button" or "a" tag
    // data-bs-toggle="offcanvas" data-bs-target="<id>" ariaControls="offcanvasTop"
    <div
      className={`offcanvas ${placement} ${containerClasses}`}
      tabIndex="-1"
      data-bs-backdrop="static"
      id={id}
      aria-labelledby="offcanvasLabel"
    >
      {children}
    </div>
  );
}
