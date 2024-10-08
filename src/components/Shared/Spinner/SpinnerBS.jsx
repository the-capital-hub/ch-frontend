import React from "react";

export default function SpinnerBS({
  colorClass,
  spinnerClass = "spinner-border",
  spinnerSizeClass = " ",
  className,
}) {
  return (
    <div className={className}>
      <div
        className={`${spinnerClass} ${spinnerSizeClass} ${colorClass}`}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
