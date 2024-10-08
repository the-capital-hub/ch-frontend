import React, { useEffect, useState } from "react";
import "./Milestones.scss";
import { useLocation } from "react-router-dom";
import MilestoneBadge from "./MilestoneBadge";
import MockBadge from "../../../../Images/StartUp/Milestones/MockBadge.svg";
import MockFundsBadge from "../../../../Images/StartUp/Milestones/MockfundsBadge.svg";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
  ModalBsLauncher,
} from "../../../PopUp/ModalBS";
import AddMilestoneModal from "./AddMilestoneModal";
import { useSelector } from "react-redux";
import { getUserMilestonesAPI } from "../../../../Service/user";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";

// Mock data array
const companyMilestones = [
  {
    text: "Founded in",
    badge: MockBadge,
  },
  {
    text: "Achieved First Revenue",
    badge: MockFundsBadge,
  },
];

export default function Milestones({
  headingClass,
  containerClass,
  theme,
  oneLink,
}) {
  let { pathname } = useLocation();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  // const oneLinkId = loggedInUser ? loggedInUser.oneLinkId : oneLink;
  // const { oneLinkId } = useSelector((state) => state.user.loggedInUser) ?? { oneLinkId: oneLink };

  const [userMilestones, setUserMilestones] = useState(null);
  const [joinedDate, setJoinedDate] = useState(null);
  const [companyFoundedDate, setCompanyFoundedDate] = useState(null);

  // fetch user's milestones
  useEffect(() => {
    async function fetchUserMilestones(oneLinkId) {
      try {
        const { data } = await getUserMilestonesAPI(oneLinkId);
        data.milestones = data.milestones.map((milestone) => ({
          ...milestone,
          badge: MockBadge,
        }));
        // console.log("user's milestones", data);
        setUserMilestones(data.milestones);
        setJoinedDate(data.userJoinedDate);
        setCompanyFoundedDate(data.startUpFoundedDate);
      } catch (error) {
        console.log("Error fetching user's milestones:", error);
        setUserMilestones(companyMilestones);
      }
    }

    fetchUserMilestones(oneLink || loggedInUser.oneLinkId);
  }, [loggedInUser?.oneLinkId, oneLink]);

  return (
    <div className={` d-flex flex-column gap-4 ${containerClass} `}>
      <div className="d-flex align-items-center justify-content-between">
        <h2 className={headingClass}>Milestones</h2>
        {/* <Link className={`see__more align-self-end ${theme}`}>See more</Link> */}
      </div>
      <div
        className={`milestone__cards__container d-flex align-items-stretch gap-5 pb-3 ${theme}`}
      >
        {userMilestones ? (
          userMilestones.map((mile, index) => {
            return (
              <MilestoneBadge
                milestone={mile}
                key={`${mile.milestone}${index}`}
                theme={theme}
                joinedDate={joinedDate}
                companyFoundedDate={companyFoundedDate}
              />
            );
          })
        ) : (
          <SpinnerBS
            className={
              "d-flex justify-content-center align-items-center py-5 w-100"
            }
          />
        )}
      </div>
      {/* If authorised show "Add" button that triggers add modal */}
      {!pathname.includes("onelink") ? (
        <div className="align-self-end">
          <ModalBsLauncher
            id={"AddMilestoneModal"}
            className={`orange_button d-flex align-items-center gap-1 w-auto ${theme}`}
          >
            <span>Add</span>
          </ModalBsLauncher>
        </div>
      ) : (
        ""
      )}
      {/* Modal for adding new team member */}
      {!pathname.includes("onelink") ? (
        <div className="addMilestoneModal__container">
          <ModalBSContainer id={"AddMilestoneModal"} modalXl>
            <ModalBSHeader
              title={"Add/Edit Milestone"}
              className={`${theme === "investor" ? "" : "orange__heading"}`}
            />
            <ModalBSBody>
              <AddMilestoneModal
                theme={theme}
                userMilestones={userMilestones}
                setUserMilestones={setUserMilestones}
              />
            </ModalBSBody>
          </ModalBSContainer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
