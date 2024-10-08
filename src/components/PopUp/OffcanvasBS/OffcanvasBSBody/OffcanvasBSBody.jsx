import React from "react";

export default function OffcanvasBSBody({ children, bodyClass }) {
  return <div className={`offcanvas-body ${bodyClass}`}>{children}</div>;
}
