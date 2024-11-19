import React, { useState } from "react";
import "./LatestResources.scss";
import ResourcesPopup from "../ResourcesPopup/ResourcesPopup";

export default function LatestResources() {
  const [showPopup, setShowPopup] = useState(false);

  const handleDismiss = () => {
    localStorage.setItem("resourcesDismissed", "true");
  };

  return (
    <>
      <div className="latest_resources_wrapper bg-black text-white py-3">
        <div className="d-flex align-items-center justify-content-around justify-content-md-between px-md-4 flex-wrap gap-3">
          <p className="m-0 fs-5">Latest Resources</p>

          <div className="d-flex gap-2">
            <button
              onClick={() => setShowPopup(true)}
              className="btn orange_button d-flex align-items-center justify-content-center"
            >
              <span>View</span>
            </button>
            <button
              onClick={handleDismiss}
              className="btn btn-outline-light d-flex align-items-center justify-content-center"
            >
              <span>Dismiss</span>
            </button>
          </div>
        </div>
      </div>

      {showPopup && <ResourcesPopup onClose={() => setShowPopup(false)} />}
    </>
  );
} 