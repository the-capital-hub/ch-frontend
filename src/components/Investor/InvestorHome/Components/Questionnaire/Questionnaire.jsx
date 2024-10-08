import React, { useState } from "react";
import OffcanvasBSContainer from "../../../../PopUp/OffcanvasBS/OffcanvasBSContainer/OffcanvasBSContainer";
import OffcanvasBSHeader from "../../../../PopUp/OffcanvasBS/OffcanvasBSHeader/OffcanvasBSHeader";
import OffcanvasBSBody from "../../../../PopUp/OffcanvasBS/OffcanvasBSBody/OffcanvasBSBody";
import "./Questionnaire.scss";
import Greeting from "./Greeting/Greeting";
import {
  answerQuestionAPI,
  getQuestionsAPI,
} from "../../../../../Service/user";
import UserInput from "./UserInput/UserInput";
import CurrentQuestion from "./CurrentQuestion/CurrentQuestion";
import Categories from "./Categories/Categories";
import History from "./History/History";
import { useDispatch } from "react-redux";
import { updateLoggedInUser } from "../../../../../Store/features/user/userSlice";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";

export const OPTIONS = {
  company: { text: "Company", endpoint: "Startup" },
  personal: { text: "Personal", endpoint: "Personal" },
};

export default function Questionnaire({
  countData,
  setCountData,
  handleRefetch,
  isInvestor,
}) {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);
  // State for company and personal soptions
  const [option, setOption] = useState(null);
  const [alert, setAlert] = useState(null);
  // State for history
  const [history, setHistory] = useState([]);
  // State for loading
  const [loading, setLoading] = useState(false);
  // State for presenting categories
  const [showCategories, setShowCategories] = useState(false);

  //   Fetch Questions
  async function fetchQuestion(query) {
    setLoading(true);

    try {
      const { data, message } = await getQuestionsAPI(query);
      console.log(data, message);
      setQuestion(data);
      setLoading(false);

      if (!data) {
        setAlert(message);
        setTimeout(() => {
          setAlert(null);
          setOption(null);
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching Question:", error);
      setLoading(false);
    }
  }

  //   handle Option
  function handleOptionSelect(e, option) {
    // console.log("selected categry", option);
    let endpoint = "Personal";
    if (option.text === "Company") {
      endpoint = isInvestor ? "Investor" : "Startup"
    }
    setOption(option.text);
    fetchQuestion(endpoint);
    setShowCategories(false);
  }

  // Handle answer change
  function handleAnswerChange(e) {
    // Auto resize text area
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    // Set Answer
    setAnswer(e.target.value);
  }

  // Handle Answer Select
  function handleAnswerSelect(e, option) {
    if (question.isMultipleOption) {
      if (option === "None") {
        // If "None" is selected, clear all other options
        setAnswer(["None"]);
      } else {
        if (answer.includes("None")) {
          // If "None" is already selected, remove it 
          setAnswer([option]);
        } else if (answer.includes(option)) {
          // Deselect answer
          let index = answer.indexOf(option);
          setAnswer((prev) => {
            let copy = [...prev];
            copy.splice(index, 1);
            return [...copy];
          });
        } else {
          // Set Answer
          setAnswer((prev) => {
            let copy = [...prev];
            copy.push(option);
            return [...copy];
          });
        }
      }
    } else {
      // For single-option questions
      setAnswer(option);
    }
  }

  // handle Post Answer
  async function handlePostAnswer(e) {
    e.preventDefault();
    console.log("answer is", answer);

    if (!answer) {
      return;
    }

    // set loading
    setLoading(true);

    const answerObject = {
      questionId: question._id,
      answer: answer,
    };

    try {
      const { data } = await answerQuestionAPI(answerObject);
      console.log("Response from answerPost", data);

      // update history
      setHistory((prev) => {
        let copy = [...prev];
        copy.push({ question: question.question, ...answerObject });
        return [...copy];
      });

      // If personal, update loggedInUser
      if (question.schema === "user") {
        let fieldName = question.fieldName;
        dispatch(updateLoggedInUser({ [fieldName]: answer }));
      }

      // Clear answer
      setAnswer("");
      // Update count
      setCountData((prev) => {
        if (question.type === "Startup") {
          return {
            ...prev,
            companyQuestionCount: countData.companyQuestionCount - 1,
          };
        }

        if (question.type === "Personal") {
          return {
            ...prev,
            personalQuestionCount: countData.personalQuestionCount - 1,
          };
        }
      });
      // fetch next Question
      fetchQuestion(question.type);
    } catch (error) {
      console.error("Error posting Question:", error);
      setLoading(false);
    }
  }

  // Handle Back to categories
  function handleBackToCategories() {
    setQuestion(null);
    setOption(null);
    setAnswer("");
    setShowCategories(true);
  }

  //   clear States
  function clearStates() {
    setAnswer("");
    setQuestion(null);
    setOption(null);
    setAlert(null);
    setHistory([]);
    setShowCategories(false);
    handleRefetch();
  }

  return (
    <div className="questionnaire_wrapper" theme={isInvestor ? "investor" : "startup"}>
      <OffcanvasBSContainer id="questionnaireOffCanvas">
        <OffcanvasBSHeader onClose={clearStates} />
        <OffcanvasBSBody bodyClass="p-0">
          <div className="questionnaire_body_wrapper h-100 pb-4 d-flex flex-column justify-content-end gap-3">
            <div
              className="d-flex flex-column-reverse gap-3 overflow-y-auto chat_col"
              style={{ scrollbarGutter: "stable", overflowAnchor: "none" }}
            >
              {/* Alert */}
              {alert && (
                <div className="chat_box">
                  <em className="">{alert}</em>
                </div>
              )}

              {showCategories && (
                <div className="d-flex flex-column gap-3">
                  <Categories
                    handleOptionSelect={handleOptionSelect}
                    option={option}
                    countData={countData}
                  />
                </div>
              )}

              {/* Current Question */}
              {!loading ? (
                <CurrentQuestion
                  question={question}
                  answer={answer}
                  handleAnswerSelect={handleAnswerSelect}
                  handleBackToCategories={handleBackToCategories}
                  loading={loading}
                  handlePostAnswer={handlePostAnswer}
                />
              ) : (
                <div className="d-flex justify-content-center align-items-center py-3">
                  <SpinnerBS
                    spinnerClass="spinner-grow"
                    colorClass={"color_main"}
                  />
                </div>
              )}

              {/* History */}
              <div className="d-flex flex-column gap-3">
                <History history={history} />
              </div>

              <div className=" d-flex flex-column justify-content-end gap-3 ">
                <Greeting />
                {/* options */}
                <Categories
                  handleOptionSelect={handleOptionSelect}
                  option={option}
                  countData={countData}
                />
              </div>
            </div>

            {/* User Input */}
            <UserInput
              answer={answer}
              question={question}
              handleAnswerChange={handleAnswerChange}
              handlePostAnswer={handlePostAnswer}
            />
          </div>
        </OffcanvasBSBody>
      </OffcanvasBSContainer>
    </div>
  );
}
