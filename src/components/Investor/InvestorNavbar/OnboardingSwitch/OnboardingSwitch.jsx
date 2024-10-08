import React, { useRef, useState } from "react";
import "./OnboardingSwitch.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsMobileView,
  selectShowOnboarding,
  selectTheme,
  setShowOnboarding,
  toggleTheme,
} from "../../../../Store/features/design/designSlice";
import { loginSuccess, selectIsInvestor } from "../../../../Store/features/user/userSlice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { addNotificationAPI, updateUserById } from "../../../../Service/user";
import toast from "react-hot-toast";
// import AchievementToast from "../../../Toasts/AchievementToast/AchievementToast";
// import { achievementTypes } from "../../../Toasts/AchievementToast/types";

export default function OnboardingSwitch() {
  //const showOnboarding = useSelector(selectShowOnboarding);
  const [check, setCheck] = useState(false)
  const isInvestor = useSelector(selectIsInvestor);
  const dispatch = useDispatch();
  //const loggedInUser = useSelector((state) => state.user.loggedInUser);


  const switchRef = useRef();

  function handleSwitchClick(e) {
    const { checked } = e.target;
    dispatch(toggleTheme())
    setCheck(checked)
    // if (!loggedInUser.achievements.includes("658bb96e8a18edb75e6f423f") && theme === 'light') {
    //   const achievements = [...loggedInUser.achievements];
    //   achievements.push("658bb96e8a18edb75e6f423f");
    //   const updatedData = { achievements };
    //   updateUserById(loggedInUser._id, updatedData)
    //     .then(({ data }) => {
    //       dispatch(loginSuccess(data.data));
    //       const notificationBody = {
    //         recipient: loggedInUser._id,
    //         type: "achievementCompleted",
    //         achievementId: "658bb96e8a18edb75e6f423f",
    //       };
    //       addNotificationAPI(notificationBody)
    //         .then((data) => console.log("Added"))
    //         .catch((error) => console.error(error.message));

    //       toast.custom((t) => (
    //         <AchievementToast type={achievementTypes.fallIntoTheDarkSide} />
    //       ));
    //     })
    //     .catch((error) => {
    //       console.error("Error updating user:", error);
    //     });
    // }
    // const { checked } = e.target;

    // if (isMobileView) {
    //   dispatch(setShowOnboarding(false));
    //   switchRef.current.checked = false;
    //   return;
    // }

    // dispatch(setShowOnboarding(checked));
  }

  //Would you like a tour inside Capital Hub?
  const renderTooltip = (props) => (
    <Tooltip id="onboarding-tooltip" {...props}>
     Theme
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="auto"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div className="onboarding_switch_wrapper">
        <div className="form-check form-switch">
          <input
            className={`form-check-input ${isInvestor && "investor"}`}
            type="checkbox"
            role="switch"
            id="onboardingToggle"
            defaultChecked={check}
            checked={check}
            onClick={handleSwitchClick}
            ref={switchRef}
          />
        </div>
      </div>
    </OverlayTrigger>
  );
}
