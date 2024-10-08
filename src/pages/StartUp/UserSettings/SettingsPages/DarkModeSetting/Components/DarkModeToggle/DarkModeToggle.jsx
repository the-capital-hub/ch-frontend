import React, { useState } from "react";
import "./DarkModeToggle.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTheme,
  toggleTheme,
} from "../../../../../../../Store/features/design/designSlice";
import Form from "react-bootstrap/Form";
import { updateUserById, addNotificationAPI } from "../../../../../../../Service/user";
import { loginSuccess } from "../../../../../../../Store/features/user/userSlice";
import toast from "react-hot-toast";
// import AchievementToast from "../../../../../../../components/Toasts/AchievementToast/AchievementToast";
// import { achievementTypes } from "../../../../../../../components/Toasts/AchievementToast/types";

export default function DarkModeToggle() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const theme = useSelector(selectTheme);
  const [selectedMode, setSelectedMode] = useState(theme);
  const dispatch = useDispatch();

  const handleModeChange = (event) => {
    setSelectedMode(event.target.value);
    dispatch(toggleTheme(event.target.value));

    if (!loggedInUser.achievements.includes("658bb96e8a18edb75e6f423f") && event.target.value === 'dark') {
      const achievements = [...loggedInUser.achievements];
      achievements.push("658bb96e8a18edb75e6f423f");
      const updatedData = { achievements };
      updateUserById(loggedInUser._id, updatedData)
        .then(({ data }) => {
          dispatch(loginSuccess(data.data));
          const notificationBody = {
            recipient: loggedInUser._id,
            type: "achievementCompleted",
            achievementId: "658bb96e8a18edb75e6f423f",
          };
          addNotificationAPI(notificationBody)
            .then((data) => {})
            .catch((error) => console.error(error.message));

          // toast.custom((t) => (
          //   <AchievementToast type={achievementTypes.fallIntoTheDarkSide} />
          // ));
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }

  };

  return (
    <div className="dark-mode-toggle-wrapper">
      <Form>
        <Form.Group controlId="darkModeToggle">
          <Form.Check
            type="radio"
            label="Dark mode"
            value="dark"
            checked={selectedMode === "dark"}
            onChange={handleModeChange}
            id="darkModeRadio"
          />
          <Form.Check
            type="radio"
            label="Light mode"
            value="light"
            checked={selectedMode === "light"}
            onChange={handleModeChange}
            id="lightModeRadio"
          />
        </Form.Group>
      </Form>
      <h6 className="mt-3">
        Current mode:{" "}
        <span className="text-capitalize">{selectedMode} mode</span>
      </h6>
    </div>
  );
}
