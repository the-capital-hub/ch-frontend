import React from "react";
import { ModalBsLauncher } from "../../../../../PopUp/ModalBS";
import ExperienceCard from "../ExperienceCard/ExperienceCard";
import { useSelector } from "react-redux";
import { selectUserRecentExperience } from "../../../../../../Store/features/user/userSlice";

export default function RecentExperience() {
  const userRecentExperience = useSelector(selectUserRecentExperience);

  return (
    <>
      {/* Recent Experience */}
      <div className="recent_experience border rounded-4 mx-md-4 shadow-sm">
        <div className="flex-md-row header">
          <h5 className="green_underline h5">Recent Experience</h5>
          <ModalBsLauncher
            id={"experienceModal"}
            className={"btn btn-investor w-auto"}
          >
            <span>Add </span>
            <span className="d-none d-md-inline-block">Experience</span>
          </ModalBsLauncher>
        </div>
        <div className="experience_cards">
          {/* Loop cards here */}
          {userRecentExperience?.map((data, index) => {
            return <ExperienceCard data={data} key={data._id} />;
          })}
        </div>
      </div>
    </>
  );
}
