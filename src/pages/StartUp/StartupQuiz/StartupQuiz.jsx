import CapitalHubQuiz from "../../../components/Investor/Support/CapitalHubQuiz/CapitalHubQuiz";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import "./StartupQuiz.scss";

export default function StartupQuiz() {
  return (
    <div className="quizPage-wrapper">
      <MaxWidthWrapper>
        <CapitalHubQuiz />
      </MaxWidthWrapper>
    </div>
  );
}
