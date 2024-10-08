import React, { useEffect, useState } from "react";
import MockBadge from "../../../../Images/StartUp/Milestones/MockBadge.svg";
// import MockFundsBadge from "../../../../Images/StartUp/Milestones/MockfundsBadge.svg";
import MilestoneBadge from "./MilestoneBadge";
import "./AddMilestoneModal.scss";
import { getAllMileStoneAPI } from "../../../../Service/user";

// const allBadges = [
//   {
//     milestone: "Joining Capital HUB",
//     badge: MockBadge,
//   },
//   {
//     milestone: "Founded company",
//     badge: MockBadge,
//   },
//   {
//     milestone: "Earned first revenue",
//     badge: MockFundsBadge,
//   },
//   {
//     milestone: "Hired first full-time team member",
//     badge: MockBadge,
//   },
//   {
//     milestone: "Raised first round of funding",
//     badge: MockFundsBadge,
//   },
//   {
//     milestone: "Got first client",
//     badge: MockBadge,
//   },
// ];

const ACTIONS = { add: "add", remove: "remove" };

export default function AddMilestoneModal({
  theme,
  userMilestones,
  setUserMilestones,
}) {
  const [allMilestones, setAllMilestones] = useState(null);

  // fetch all milestones
  useEffect(() => {
    async function getAllMilestones() {
      try {
        const { data } = await getAllMileStoneAPI();
        let milestones = data.map((milestone) => ({
          ...milestone,
          badge: MockBadge,
        }));

        // console.log("milestones", milestones);
        setAllMilestones(milestones);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    }

    getAllMilestones();
  }, []);

  return (
    <div className="milestone_modal_container d-flex gap-3">
      <div className="d-flex flex-column gap-3">
        <div className=" current_milestone d-flex flex-column gap-3 p-2 px-lg-3  rounded-4">
          <h5>Current Milestones</h5>
          <div
            className={`badges__container d-flex flex-wrap gap-4 p-2 px-lg-3 justify-content-center overflow-x-auto ${theme}`}
          >
            {userMilestones?.map((mile, index) => {
              return (
                <MilestoneBadge
                  milestone={mile}
                  isMini
                  key={`${mile.text}${index}`}
                  theme={theme}
                  action={ACTIONS.remove}
                  setUserMilestones={setUserMilestones}
                  setAllMilestones={setAllMilestones}
                />
              );
            })}
          </div>
        </div>

        <div className="add_milestone d-flex flex-column gap-3 p-2 px-lg-3 rounded-4">
          <h5>Add Milestones</h5>
          <div
            className={`badges__container d-flex flex-wrap gap-4 p-2 px-lg-3 justify-content-center overflow-x-auto ${theme}`}
          >
            {allMilestones?.map((mile, index) => {
              return (
                <MilestoneBadge
                  milestone={mile}
                  isMini
                  key={`${mile.text}${index}`}
                  theme={theme}
                  action={ACTIONS.add}
                  setUserMilestones={setUserMilestones}
                  setAllMilestones={setAllMilestones}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
