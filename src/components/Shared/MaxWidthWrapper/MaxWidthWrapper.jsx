import React from "react";

export default function MaxWidthWrapper({
  children,
  containerClass = "container",
}) {
  return (
    <div className={`${containerClass} mx-auto px-0 px-xl-3`}>{children}</div>
  );
}
