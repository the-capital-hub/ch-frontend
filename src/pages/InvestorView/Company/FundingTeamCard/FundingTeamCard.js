import React from "react";
import "./FundingTeamCard.scss";
import ConnectBtn from "../../../../Images/investorView/Add-User.svg";

const FundingTeamCard = ({ image, name, age, paragraph ,designation}) => {
  return (
    <div className="col-4 fundingteamcard_component">
      <div className="card-header">
        <div className="header-left">
          <img src={image} alt="Profile" />
        </div>
        <div className="header-right">
          <h2 className="name">{name}</h2>
          <div className="feedback">
            {/* <p className="age">{age} years</p> */}
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="designation_connect">
          <div className="designation">
            <h1>Designation</h1>
            <h3>{designation}</h3>
          </div>
          <div className="connect_button">
            <button>
              <span>
                <img src={ConnectBtn} alt="connect" />
              </span>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingTeamCard;
