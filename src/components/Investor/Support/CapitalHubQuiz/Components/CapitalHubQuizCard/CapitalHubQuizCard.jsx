import { Alert, Button, Card } from "react-bootstrap";
import "./CapitalHubQuizCard.scss";
import { useRef, useState } from "react";

export default function CapitalHubQuizCard({
  questionText,
  options,
  current,
  total,
  answer,
  carouselRef,
  setCorrectAnswerCount,
  setAllAnswered,
  timerRef,
}) {
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const cardRef = useRef();

  function handleAnswer() {
    if (!selectedAnswer) {
      return;
    }

    setAnswered(true);
    if (selectedAnswer === answer) {
      setCorrectAnswerCount((prev) => {
        return prev + 1;
      });
    }
  }

  function handleClick() {
    if (current === total) {
      setAllAnswered(true);
      timerRef.current.pause();
    } else {
      carouselRef.current.next();
      cardRef.current.classList.add("opacity-0");
      cardRef.current.parentNode.nextSibling.firstChild.classList.remove(
        "opacity-0"
      );
    }
  }

  function handleBack() {
    carouselRef.current.prev();
    cardRef.current.classList.add("opacity-0");
    cardRef.current.parentNode.previousSibling.firstChild.classList.remove(
      "opacity-0"
    );
  }

  return (
    <Card className="quiz-card border" ref={cardRef}>
      <Card.Header className="py-4" style={{ minHeight: "125px" }}>
        {questionText}
      </Card.Header>
      <Card.Body className="d-flex flex-column gap-4 py-3">
        {options.map((option, index) => {
          return (
            <Alert
              variant={
                !answered
                  ? "primary"
                  : answer === option.optionNumber
                  ? "success"
                  : selectedAnswer === option.optionNumber
                  ? "danger"
                  : "primary"
              }
              className={`option-bar mb-0 ${
                !answered && option.optionNumber === selectedAnswer
                  ? "selected"
                  : ""
              }`}
              key={index}
              data-bs-option={option.optionNumber}
              onClick={() => setSelectedAnswer(option.optionNumber)}
              style={{ pointerEvents: `${answered ? "none" : "all"}` }}
            >
              {option.optionText}
            </Alert>
          );
        })}
      </Card.Body>
      <Card.Footer className="py-4 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <p className="m-0">
          {current} of {total} Questions
        </p>

        <div className="d-flex align-items-center gap-2">
          {current !== 1 && (
            <Button
              type="button"
              variant="startup"
              className="px-4 rounded-pill gradient-bg-light"
              onClick={handleBack}
            >
              {"Back"}
            </Button>
          )}
          <Button
            type="button"
            variant="startup"
            className="px-4 rounded-pill gradient-bg-light"
            onClick={handleAnswer}
          >
            {"Submit"}
          </Button>
          <Button
            type="button"
            variant="startup"
            className="px-4 rounded-pill gradient-bg-light"
            onClick={handleClick}
          >
            {current === total ? "Finish" : "Next"}
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}
