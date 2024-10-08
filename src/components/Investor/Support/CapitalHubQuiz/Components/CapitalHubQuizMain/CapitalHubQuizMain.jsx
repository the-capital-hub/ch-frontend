import { Carousel } from "react-bootstrap";
import CapitalHubQuizCard from "../CapitalHubQuizCard/CapitalHubQuizCard";
import "./CapitalHubQuizMain.scss";
import { useRef, useState } from "react";
import CapitalHubQuizResult from "../CapitalHubQuizResult/CapitalHubQuizResult";

export default function CapitalHubQuizMain({ questions, stopQuiz, timerRef }) {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [allAnswered, setAllAnswered] = useState(null);
  const carouselRef = useRef();

  return (
    <>
      <div className="quiz-main mx-auto shadow-lg rounded-4">
        <Carousel
          className="d-flex align-items-center gap-4"
          defaultActiveIndex={0}
          indicators={false}
          controls={false}
          interval={null}
          ref={carouselRef}
          touch={false}
        >
          {questions?.map((question, index) => {
            return (
              <Carousel.Item key={question.questionNumber} className="">
                <CapitalHubQuizCard
                  current={index + 1}
                  total={questions.length}
                  questionText={question.questionText}
                  options={question.options}
                  answer={question.answer}
                  stopQuiz={stopQuiz}
                  carouselRef={carouselRef}
                  setCorrectAnswerCount={setCorrectAnswerCount}
                  setAllAnswered={setAllAnswered}
                  timerRef={timerRef}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>

      {/* Result Modal */}
      <CapitalHubQuizResult
        allAnswered={allAnswered}
        setAllAnswered={setAllAnswered}
        correctAnswerCount={correctAnswerCount}
        total={questions?.length}
        stopQuiz={stopQuiz}
      />
    </>
  );
}
