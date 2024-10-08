import React from "react";
import "./VcCard.scss";

const VcCard = ({ vc }) => {
  return (
    <div className="vc-card">
      <div className="header">
        {vc.logo && <img src={vc.logo} alt={`${vc.name} logo`} className="vc-logo" />}
        <div className="vc-info">
          <h5>{vc.name}</h5>
          <p className="info">{vc.location}, {vc.age} years</p>
        </div>
        <p className="ticket-size"><h6>Ticket Size</h6> {vc.ticket_size}</p>
      </div>
      <div className="stage-sector-info">
        <div className="stage-focus">
          <h5>Stage Focus</h5>
          {Array.isArray(vc.stage_focus) && vc.stage_focus.map((stage, index) => (
            <div className="bubble" key={index}>
              {stage}
            </div>
          ))}
        </div>
        <div className="sector-focus">
          <h5>Sector Focus</h5>
          {Array.isArray(vc.sector_focus) && vc.sector_focus.map((sector, index) => (
            <div className="bubble" key={index}>
              {sector}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VcCard;
