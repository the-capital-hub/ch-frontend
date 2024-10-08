import React from "react";
import "./OnePagerTeam.scss";
import OnePagerTeamMember from "./OnePagerTeamMember/OnePagerTeamMember";

export default function OnePagerTeam({ team }) {
  // Mock data array
  // let dataArray = [1, 1, 1, 1, 1, 1, 1];

  return (
    <div className="onePager_Team pb-2">
      <h4 className="main_color">Team</h4>
      <div className="onePager_teamMember_container">
        {/* Loop team members here */}
        {team?.map((member, index) => {
          return (
            <OnePagerTeamMember
              key={`${member.name}${index}`}
              member={member}
            />
          );
        })}
      </div>
    </div>
  );
}
