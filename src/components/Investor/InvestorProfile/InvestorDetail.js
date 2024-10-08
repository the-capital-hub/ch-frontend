import React from "react";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";

const InvestorDetail = ({
  professionalData,
  detail,
}) => {
  return (
    <>
      {/* header */}
      {!detail && (
        <header className="professional_info_display p-0 d-flex flex-column gap-3 flex-md-row align-items-center justify-content-between">
          {/* profile picture and name */}
          <div className="d-flex gap-4" style={{ width: "100%" }}>
            <img
              src={professionalData.profilePicture || DefaultAvatar}
              alt={professionalData.fullName}
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
              className="rounded-circle"
            />
            <div className="d-flex flex-column justify-content-center gap-1 ">
              <h5 className="m-0 fw-semibold">{professionalData.fullName}</h5>

              <h6 className="m-0 fw-semibold">
                {professionalData.userName || ""}
              </h6>
              <p className="m-0"><span style={{color:"#c5c5c6"}}>Designation : </span>{professionalData.designation}</p>
              <p><span style={{color:"#c5c5c6"}}>Location : </span>{professionalData.location}</p>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default InvestorDetail;
