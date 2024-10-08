import React, { useEffect } from "react";
import Joyride from "react-joyride";
import "./OnBoardUser.scss";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useDispatch, useSelector } from "react-redux";
import { updateUserById, addNotificationAPI } from "../../Service/user";
import { loginSuccess } from "../../Store/features/user/userSlice";
// import AchievementToast from "../Toasts/AchievementToast/AchievementToast";
// import { achievementTypes } from "../Toasts/AchievementToast/types";
//import toast from "react-hot-toast";

function OnBoardUser({
  steps,
  run = true,
  setRun,
  scrollOffset,
  noBodyRoll,
  isChatPage,
  ...props
}) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();

  // Pass in no body roll to disable scroll on body
  useEffect(() => {
    if (noBodyRoll && run) {
      disableBodyScroll(document.body);
    }
  }, [run, noBodyRoll]);
  console.log(setRun)
  const handleTourClose = () => {
    enableBodyScroll(document.body);
    
    setRun(false);

    // achivement for completing the tutorial
    if (!loggedInUser.achievements.includes("658bb9838a18edb75e6f4247")) {
      const achievements = [...loggedInUser.achievements];
      achievements.push("658bb9838a18edb75e6f4247");
      const updatedData = { achievements };
      updateUserById(loggedInUser._id, updatedData)
        .then(({ data }) => {
          dispatch(loginSuccess(data.data));
          const notificationBody = {
            recipient: loggedInUser._id,
            type: "achievementCompleted",
            achievementId: "658bb9838a18edb75e6f4247",
          };
          addNotificationAPI(notificationBody)
            .then((data) => console.log("Added"))
            .catch((error) => console.error(error.message));

          // toast.custom((t) => (
          //   <AchievementToast type={achievementTypes.showMeAround} />
          // ));
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }

  };

  // Action for the current step is triggered on pressing of next button
  const handleAction = (index) => {
    const currentStepData = steps?.[index];
    if (currentStepData?.action) {
      currentStepData.action();
    }
  };

  // Beacon Component
  // const CustomBeaconComponent = ({
  //   ariaLabel,
  //   onClick,
  //   onMouseEnter,
  //   title,
  //   beaconRef,
  // }) => (
  //   <span
  //     className="custom-joyride-beacon"
  //     onClick={onClick}
  //     onMouseEnter={onMouseEnter}
  //     title={title}
  //     aria-label={ariaLabel}
  //     ref={beaconRef}
  //   ></span>
  // );

  const CustomButton = ({ onClick, title, isActive }) => (
    <button
      className={`custom-joyride-button${isActive ? " active" : ""
        } px-3 py-2 d-none d-md-block`}
      onClick={onClick}
      type="button"
    >
      {"Start Tutorial"}
    </button>
  );

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      // beaconComponent={CustomBeaconComponent}
      beaconComponent={CustomButton}
      // scrollToFirstStep
      showProgress
      showBackButton
      // disableOverlayClose
      // hideCloseButton={true}
      callback={({ action, index, lifecycle }) => {
        if (action === "close" || action === "reset") {
          handleTourClose();
        } else if (isChatPage && index === 2 && action === "next") {
          document.querySelector(".user_chat").click();
        } else if (isChatPage && index === 3 && action === "next") {
          document.querySelector(".chat_navbar_container > .left").click();
        } else if (action === "next" && lifecycle === "complete") {
          handleAction(index);
        }
      }}
      //   disableScrolling
      disableScrollParentFix
      scrollOffset={scrollOffset || 100}
      styles={{
        options: {
          primaryColor: "var(--currentTheme)",
        },
      }}
      {...props}
    />
  );
}

export default OnBoardUser;

//   useEffect(() => {
//     if (run) {
//       disableBodyScroll(document.body);
//     }
//   }, [run]);
