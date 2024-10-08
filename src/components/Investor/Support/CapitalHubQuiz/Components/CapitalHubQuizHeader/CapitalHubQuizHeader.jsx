import { Button, Container } from "react-bootstrap";
import "./CapitalHubQuizHeader.scss";
import { MdOutlineChevronLeft } from "react-icons/md";
import Countdown, { zeroPad } from "react-countdown";
import toast from "react-hot-toast";
import { IoTime } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function CapitalHubQuizHeader({
  ongoing,
  duration = 10,
  stopQuiz,
  timerRef,
}) {
  const navigate = useNavigate();

  function handleTimeOut() {
    stopQuiz();
    toast("Oops! You ran out of time!", {
      duration: 3000,
      position: "top-center",
      icon: <IoTime size={25} color="#ff0000b2" />,
    });
  }

  function handleBackClick() {
    navigate(-1);
  }

  return (
    <header className="quiz-header pb-4">
      <Container className="p-0 d-flex flex-column flex-md-row gap-3 align-items-center justify-content-between">
        <Button
          className="bg-transparent text-startup border-0 fs-4 d-flex align-items-center gap-1"
          onClick={handleBackClick}
        >
          <MdOutlineChevronLeft />
          Back
        </Button>

        <h4 className="m-0 text-startup">Quiz</h4>

        <div className="d-flex flex-column-reverse flex-sm-row align-items-center gap-4 gap-sm-2">
          {ongoing && (
            <Button
              variant="startup"
              className="rounded-pill"
              onClick={() => stopQuiz()}
            >
              Stop Quiz
            </Button>
          )}

          <div className="quiz-timer d-flex align-items-center gap-4 py-2 px-3">
            <p className="m-0">Time Left</p>
            {ongoing ? (
              <Countdown
                date={Date.now() + duration * 60 * 1000}
                renderer={({ minutes, seconds }) => {
                  return (
                    <span
                      className="bg-black text-white py-2 px-2 rounded"
                      style={{ width: "80px" }}
                    >
                      {zeroPad(minutes)} : {zeroPad(seconds)}
                    </span>
                  );
                }}
                zeroPadTime={2}
                onComplete={handleTimeOut}
                ref={timerRef}
              />
            ) : (
              <span
                className="bg-black text-white py-2 px-2 rounded"
                style={{ width: "80px" }}
              >
                {zeroPad(duration)} : 00
              </span>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
