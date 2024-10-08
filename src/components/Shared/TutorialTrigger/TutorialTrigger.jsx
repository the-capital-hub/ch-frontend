import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsMobileView,
  selectShowOnboarding,
  setShowOnboarding,
} from "../../../Store/features/design/designSlice";
import OnBoardUser from "../../OnBoardUser/OnBoardUser";
import "./TutorialTrigger.scss";
import { selectIsInvestor } from "../../../Store/features/user/userSlice";

export default function TutorialTrigger({
  steps,
  fromUp,
  isChatPage = false,
  className,
  theme,
}) {
  const showOnboarding = useSelector(selectShowOnboarding);
  const isMobileView = useSelector(selectIsMobileView);
  const isInvestor = useSelector(selectIsInvestor);
  const dispatch = useDispatch();

  const [run, setRun] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);

  useEffect(() => {
    if (showOnboarding) {
      setShowTrigger(true);
    } else if (isChatPage) {
      setShowTrigger(true);
    } else {
      setShowTrigger(false);
    }
  }, [showOnboarding, isChatPage]);

  //   Handle tour start
  function handleStartTour() {
    setRun(true);
  }

  //   Handle dismiss
  function handleDismiss() {
    setShowTrigger(false);
    setRun(false);
    dispatch(setShowOnboarding(false));
  }

  return (
    <>
      {showTrigger && !run && !isMobileView && (
        <div
          className={`tutorial_trigger w-100 rounded-4 py-4 shadow-sm ${className} ${
            isInvestor && !isChatPage ? "border" : ""
          } ${
            fromUp ? "slideDown position-absolute top-0 start-0 z-3" : "slideUp"
          }`}
          style={{ backgroundColor: "var(--white-to-grey)" }}
          data-bs-theme={theme}
        >
          <div
            className="container mx-auto d-flex align-items-center gap-3 justify-content-around"
            style={{ color: "var(--d-l-grey)" }}
          >
            <p className="m-0">
              Welcome User! Would you like us to show you around?
            </p>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <button
                type="button"
                className={`btn ${isInvestor ? "btn-investor" : "btn-startup"}`}
                onClick={handleStartTour}
              >
                Start Tour
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDismiss}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
      {(showOnboarding || (isChatPage && !isMobileView)) && (
        <OnBoardUser
          steps={steps}
          run={run}
          setRun={setRun}
          isChatPage={isChatPage}
        />
      )}
    </>
  );
}
