// import { Button, Card, Container } from "react-bootstrap";
import "./CapitalHubQuiz.scss";
import CapitalHubQuizIntro from "./Components/CapitalHubQuizIntro/CapitalHubQuizIntro";
import { useEffect, useRef, useState } from "react";
import CapitalHubQuizHeader from "./Components/CapitalHubQuizHeader/CapitalHubQuizHeader";
import { Spinner } from "react-bootstrap";
import CapitalHubQuizMain from "./Components/CapitalHubQuizMain/CapitalHubQuizMain";

const mockQuiz = {
  message: "Quiz details fetched successfully.",
  data: {
    title: "Introductive Quiz",
    poster:
      "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    duration: 20,
    questions: [
      {
        questionNumber: "1",
        answer: "a",
        questionText:
          "What is the primary purpose of venture capitalist firms?",
        options: [
          { optionNumber: "a", optionText: "Providing free business advice" },
          {
            optionNumber: "b",
            optionText: "Offering mentorship to established companies",
          },
          {
            optionNumber: "c",
            optionText: "Providing funding in exchange for equity",
          },
          {
            optionNumber: "d",
            optionText: "Offering loans at low interest rates",
          },
        ],
      },
      {
        questionNumber: "2",
        answer: "b",
        questionText:
          "What role does mentorship play in the venture capitalist ecosystem?",
        options: [
          {
            optionNumber: "a",
            optionText: "It's irrelevant for startup success",
          },
          {
            optionNumber: "b",
            optionText: "Offers guidance and expertise to entrepreneurs",
          },
          {
            optionNumber: "c",
            optionText: "Only helps in securing more funding",
          },
          {
            optionNumber: "d",
            optionText: "Provides legal advice to new businesses",
          },
        ],
      },
      {
        questionNumber: "3",
        answer: "c",
        questionText:
          "What are some criteria venture capitalists use to assess potential investments?",
        options: [
          {
            optionNumber: "a",
            optionText: "Size of the entrepreneur's network",
          },
          {
            optionNumber: "b",
            optionText:
              "Unique value proposition, market potential, team strength",
          },
          {
            optionNumber: "c",
            optionText: "Number of patents held by the company",
          },
          {
            optionNumber: "d",
            optionText: "Amount of revenue generated in the first year",
          },
        ],
      },
      {
        questionNumber: "4",
        answer: "d",
        questionText:
          "What risks might entrepreneurs face when seeking funding from venture capitalists?",
        options: [
          { optionNumber: "a", optionText: "Reduced expectations for growth" },
          {
            optionNumber: "b",
            optionText: "Complete control over business decisions",
          },
          {
            optionNumber: "c",
            optionText: "Giving up a portion of ownership/control",
          },
          {
            optionNumber: "d",
            optionText: "No risks involved in such funding",
          },
        ],
      },
      {
        questionNumber: "5",
        answer: "a",
        questionText:
          "What do venture capitalist firms typically provide in exchange for funding?",
        options: [
          { optionNumber: "a", optionText: "Collateral" },
          { optionNumber: "b", optionText: "Shares or equity" },
          { optionNumber: "c", optionText: "Loan with high-interest rates" },
          { optionNumber: "d", optionText: "Intellectual property rights" },
        ],
      },
      {
        questionNumber: "6",
        answer: "b",
        questionText:
          "Apart from funding, what other support do venture capitalists offer to startups?",
        options: [
          { optionNumber: "a", optionText: "Tax exemptions" },
          { optionNumber: "b", optionText: "Mentorship and guidance" },
          { optionNumber: "c", optionText: "Legal advice only" },
          { optionNumber: "d", optionText: "Public relations services" },
        ],
      },
      {
        questionNumber: "7",
        answer: "c",
        questionText:
          "How do venture capitalists benefit from their investments in startups?",
        options: [
          { optionNumber: "a", optionText: "Guaranteed fixed returns" },
          {
            optionNumber: "b",
            optionText: "Immediate repayment of the invested amount",
          },
          {
            optionNumber: "c",
            optionText: "Dividends from the company's profits",
          },
          {
            optionNumber: "d",
            optionText: "Selling their equity at a higher value later",
          },
        ],
      },
      {
        questionNumber: "8",
        answer: "d",
        questionText:
          "What role does mentorship play in the relationship between venture capitalists and startups?",
        options: [
          {
            optionNumber: "a",
            optionText: "It's optional and rarely provided",
          },
          { optionNumber: "b", optionText: "Helps in advertising the startup" },
          {
            optionNumber: "c",
            optionText: "Offers guidance and business insights",
          },
          {
            optionNumber: "d",
            optionText: "Solely focused on financial planning",
          },
        ],
      },
      {
        questionNumber: "9",
        answer: "a",
        questionText:
          "What is the primary reason venture capitalists invest in startups?",
        options: [
          { optionNumber: "a", optionText: "Guaranteed short-term profits" },
          {
            optionNumber: "b",
            optionText: "To support innovative ideas and businesses",
          },
          {
            optionNumber: "c",
            optionText: "To gain control over the startup's operations",
          },
          {
            optionNumber: "d",
            optionText: "To eliminate competition in the market",
          },
        ],
      },
      {
        questionNumber: "10",
        answer: "b",
        questionText:
          "What is the typical nature of the funding relationship between venture capitalists and startups?",
        options: [
          { optionNumber: "a", optionText: "Long-term partnership" },
          {
            optionNumber: "b",
            optionText: "One-time transaction without any follow-ups",
          },
          {
            optionNumber: "c",
            optionText: "Interference-free financial support",
          },
          { optionNumber: "d", optionText: "Short-term, high-interest loan" },
        ],
      },
    ],
  },
};

export default function CapitalHubQuiz() {
  const [ongoing, setOngoing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const timerRef = useRef();

  useEffect(() => {
    // const fetchQuiz = async () => {
    //   setLoading(true);
    //   try {
    //     const { data } = await getAllQuizzes();
    //     console.log("All Quizzes", data);
    //     setQuiz(data[0]);
    //   } catch (error) {
    //     console.error("Error fetching Quiz", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchQuiz();
    setLoading(false);
    setQuiz(mockQuiz.data);
  }, []);

  function startQuiz() {
    setOngoing(true);
  }

  function stopQuiz() {
    setOngoing(false);
  }

  return (
    <div className="quiz-wrapper w-100 ">
      {/* Header */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <Spinner variant="startup" />
        </div>
      ) : (
        <>
          <CapitalHubQuizHeader
            duration={quiz?.duration || 10}
            ongoing={ongoing}
            stopQuiz={stopQuiz}
            timerRef={timerRef}
          />

          {/* Quiz */}
          <div className="quiz-container container p-0 mx-auto ">
            <>
              {ongoing ? (
                <CapitalHubQuizMain
                  questions={quiz?.questions}
                  stopQuiz={stopQuiz}
                  timerRef={timerRef}
                />
              ) : (
                <CapitalHubQuizIntro
                  poster={quiz?.poster}
                  startQuiz={startQuiz}
                />
              )}
            </>
          </div>
        </>
      )}
    </div>
  );
}
