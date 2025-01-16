import React, { useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import "./OneLinkRequestsBanner.scss";
import OneLinkRequestsPopup from "../OneLinkRequestsPopup/OneLinkRequestsPopup";

export default function OneLinkRequestsBanner({startUpId}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div className="onelink-requests-banner rounded-2" onClick={() => setShowPopup(true)}>
        <div className="banner-content">
          <div className="icon-container">
            <i className="bi bi-people-fill"><BsLink45Deg size={"25px"} />
            </i>
          </div>
          <div className="text-container">
            <h6 className="mb-0">View OneLink Requests</h6>
            <p className="mb-0">Review and manage access requests for your company profile</p>
          </div>
        </div>
      </div>

      {showPopup && <OneLinkRequestsPopup startUpId={startUpId} onClose={() => setShowPopup(false)} />}
    </>
  );
} 