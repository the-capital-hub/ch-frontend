import React, { useState } from "react";
import "./OnboardingSwitch.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../Store/features/design/designSlice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function OnboardingSwitch() {
  const [check, setCheck] = useState(false);
  const isInvestor = useSelector((state) => state.user.isInvestor); // Adjust selector if needed
  const dispatch = useDispatch();

  // Handle theme toggle when checkbox is clicked
  function handleSwitchChange(e) {
    const { checked } = e.target;
    dispatch(toggleTheme()); // Toggle theme in Redux
    setCheck(checked); // Update local state for controlled checkbox
  }

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
            checked={check} 
            onChange={handleSwitchChange} 
          />
        </div>
      </div>
    </OverlayTrigger>
  );
}
