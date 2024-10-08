import { Button, Card } from "react-bootstrap";
import "./CapitalHubQuizIntro.scss";

export default function CapitalHubQuizIntro({ startQuiz }) {
  return (
    <Card className="quiz-card quiz-intro shadow-sm">
      <h4 className="m-0">{"Quiz Intro"}</h4>
      {/* {poster && <Image src={poster} alt="Quiz" fluid />} */}
      <Button
        type="button"
        variant="startup"
        className="px-4 rounded-pill gradient-bg-light"
        onClick={() => startQuiz()}
      >
        Start Quiz
      </Button>
    </Card>
  );
}
