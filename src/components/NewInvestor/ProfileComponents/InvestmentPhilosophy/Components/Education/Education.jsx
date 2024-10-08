import React from "react";
import { ModalBsLauncher } from "../../../../../PopUp/ModalBS";
import ExperienceCard from "../ExperienceCard/ExperienceCard";
import { useSelector } from "react-redux";
import { selectUserRecentEducation } from "../../../../../../Store/features/user/userSlice";

export default function Education() {
  const userRecentEducation = useSelector(selectUserRecentEducation);

  return (
    <>
      {/* Education */}
      <div className="education border rounded-4 mx-md-4 shadow-sm">
        <div className="flex-md-row header">
          <h5 className="green_underline h5">Education</h5>

          <ModalBsLauncher
            className={"btn btn-investor w-auto"}
            id={"educationModal"}
          >
            <span>Add </span>
            <span className="d-none d-md-inline-block">Education</span>
          </ModalBsLauncher>
        </div>
        <div className="experience_cards">
          {/* loop cards here */}
          {userRecentEducation.map((data, index) => {
            return (
              <ExperienceCard isExperience={false} data={data} key={data._id} />
            );
          })}
        </div>
      </div>
    </>
  );
}
