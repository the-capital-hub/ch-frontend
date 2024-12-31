import React, { useEffect, useState } from "react";
import "./NewYearPopper.scss";
import CompanyLogo from "../../Images/thecapitalhub-logo.png";
import confetti from "canvas-confetti";
import { useSelector, useDispatch } from "react-redux";

const NewYearPopper = () => {
  const [isVisible, setIsVisible] = useState(true);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    // Trigger confetti burst
    function launchConfetti() {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }

    // Launch confetti bursts every second for 5 seconds
    const interval = setInterval(launchConfetti, 1000);
    const timeout = setTimeout(() => {
      setIsVisible(false);
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="new-year-popper">
      {/* Background overlay */}
      <div className="background-overlay" />

      {/* Confetti container */}
      <div className="confetti" id="confetti-container"></div>

      {/* Content */}
      <div className="content">
        <h1>
          Happy New Year{" "}
          <span className="year">
            2
            <span className="logo">
              <img src={CompanyLogo} alt="Logo" />
            </span>
            25
          </span>
        </h1>
        <h1>{loggedInUser?.firstName}</h1>
      </div>
    </div>
  );
};

export default NewYearPopper;
