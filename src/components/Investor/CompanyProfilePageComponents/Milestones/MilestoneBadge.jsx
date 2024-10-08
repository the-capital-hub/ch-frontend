import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MilestoneBadge.scss";
import IconDeleteFill from "../../SvgIcons/IconDeleteFill";
import { PlusIcon } from "../../../NewInvestor/SvgIcons";
import {
  addMilestoneToUserAPI,
  deleteUserMilestoneAPI,
} from "../../../../Service/user";
import { useSelector } from "react-redux";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";

const DATEOPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function MilestoneBadge({
  isMini,
  theme,
  action,
  setUserMilestones,
  milestone,
  joinedDate,
  companyFoundedDate,
  setAllMilestones,
}) {
  // const { createdAt, oneLinkId } = useSelector(
  //   (state) => state.user.loggedInUser
  // );
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const { badge, text, _id: milestoneId } = milestone;

  // States for loading
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // handle remove milestone
  async function handleRemoveMilestone(e, milestoneId, oneLinkId) {
    setLoading(true);
    try {
      const response = await deleteUserMilestoneAPI(oneLinkId, milestoneId);
      // console.log("response from delete", response);
      setUserMilestones((prev) => {
        return prev.filter((elem) => elem._id !== milestoneId);
      });
      setAllMilestones((prev) => [...prev, milestone]);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting milestone:", error);
      setAlert("Error removing milestone! Please try again.");
      setTimeout(() => {
        setAlert(null);
        setLoading(false);
      }, 2000);
    }
  }

  // handle add milestone
  async function handleAddMilestone(e, milestoneId) {
    setLoading(true);
    try {
      const { data } = await addMilestoneToUserAPI({
        milestoneId: milestoneId,
      });
      // console.log("After add milestone", data);
      setUserMilestones((prev) => [...prev, milestone]);
      setAllMilestones((prev) => {
        return prev.filter((elem) => elem._id !== milestoneId);
      });
      setLoading(false);
    } catch (error) {
      console.error("Error adding milestone to user", error);
      setAlert("Error Adding milestone! Please try again.");
      setTimeout(() => {
        setAlert(null);
        setLoading(false);
      }, 2000);
    }
  }

  return (
    <div
      className={`badge_container p-4 d-flex flex-column align-items-center gap-3 rounded-4 position-relative ${theme}`}
      style={{
        backgroundColor: "var(--bs-light)",
        flex: `0 0 ${isMini ? "200px" : "260px"}`,
      }}
    >
      <div
        className="bg-white p-1 rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: `${isMini ? "80px" : "140px"}`,
          height: `${isMini ? "80px" : "140px"}`,
        }}
      >
        <img
          src={badge}
          alt={"badge"}
          style={{
            width: `${isMini ? "60px" : "120px"}`,
            height: `${isMini ? "60px" : "120px"}`,
          }}
          className="rounded-circle"
        />
      </div>
      <div className="text-center">
        <h5
          className={`text-capitalize ${isMini ? "fs-6" : ""}`}
          style={{ minHeight: `${isMini ? "60px" : "none"}`,color: "var(--d-l-grey)"}}
        >
          {text}
        </h5>
        {isMini ? (
          ""
        ) : (
          <p>
            {text === "Joining Capital HUB"
              ? new Date(joinedDate).toLocaleDateString([], DATEOPTIONS)
              : ""}
            {text === "Founded company"
              ? new Date(companyFoundedDate).toLocaleDateString([], DATEOPTIONS)
              : ""}
          </p>
        )}
      </div>
      {isMini
        ? ""
        : ""
        // <Link className={`see__more orange align-self-end mt-auto ${theme}`}>
        //   See more
        // </Link>
      }
      {isMini && action === "add" && (
        <button
          className={`action_badge btn border-0 ${theme}`}
          onClick={(e) => handleAddMilestone(e, milestoneId)}
        >
          {loading ? (
            <SpinnerBS
              spinnerSizeClass="spinner-border-sm"
              colorClass={`${theme === "investor" ? "text-black" : "text-white"
                }`}
            />
          ) : (
            <PlusIcon height="1.5rem" width="1.5rem" />
          )}
        </button>
      )}
      {isMini && action === "remove" && text !== "Joining Capital HUB" && (
        <button
          className={`action_badge btn border-0 ${theme}`}
          onClick={(e) => handleRemoveMilestone(e, milestoneId, loggedInUser?.oneLinkId)}
          disabled={loading}
        >
          {loading ? (
            <SpinnerBS
              spinnerSizeClass="spinner-border-sm"
              colorClass={`${theme === "investor" ? "text-black" : "text-white"
                }`}
            />
          ) : (
            <IconDeleteFill />
          )}
        </button>
      )}
      {alert && (
        <div className="position-absolute m-2 d-flex justify-content-center align-items-center rounded-4 alert_text small text-danger text-center">
          <em>{alert}</em>
        </div>
      )}
    </div>
  );
}
