import React, { useState, useEffect } from "react";
import "./CoreTeam.scss";
import CoreTeamCard from "./CoreTeamCard";
// import RaghuImage from "../../../../Images/aboutUs/Raghu.jpeg";
// import { Link } from "react-router-dom";
import {
  ModalBSBody,
  ModalBSContainer,
  // ModalBSFooter,
  ModalBSHeader,
  ModalBsLauncher,
} from "../../../PopUp/ModalBS";
import AddTeamMemberModal from "./AddTeamMemberModal";

export default function CoreTeam({ companyData, setCompanyData, theme }) {
  const [team, setTeam] = useState(companyData?.team);
  useEffect(() => {
    setTeam(companyData?.team);
  }, [companyData]);

  return (
    <div className=" d-flex flex-column gap-4">
      <div
        className="d-flex align-items-center justify-content-between"
        style={{ color: "var(--d-l-grey)" }}
      >
        <h2>Core Team</h2>
        {/* <Link className="see__more align-self-end">See more</Link> */}
      </div>
      <div
        className={`team__cards__container d-flex align-items-center gap-5 pb-3 ${theme} `}
      >
        {team && team.length > 0 ? (
          team?.map((member, index) => (
            <CoreTeamCard
              key={index}
              image={member.image}
              name={member.name}
              designation={member.designation}
            />
          ))
        ) : (
          <p>Click Add to add team members</p>
        )}
      </div>
      {/* If authorised show "Add" button that triggers add modal */}
      {
        <div className="align-self-end">
          <ModalBsLauncher
            id={"AddTeamMemberModal"}
            className={`add_button d-flex align-items-center gap-1 w-auto ${theme} `}
          >
            <span>Add</span>
          </ModalBsLauncher>
        </div>
      }
      {/* Modal for adding new team member */}
      <div className="addCoreTeamModal__container">
        <ModalBSContainer id={"AddTeamMemberModal"} modalXl>
          <ModalBSHeader
            title={"Add Team Member"}
            className={`orange__heading ${theme}`}
          />
          <ModalBSBody>
            <AddTeamMemberModal
              setCompanyData={setCompanyData}
              companyData={companyData}
              theme={theme}
            />
          </ModalBSBody>
        </ModalBSContainer>
      </div>
    </div>
  );
}
