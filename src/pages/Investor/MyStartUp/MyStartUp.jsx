import React, { useState, useEffect } from "react";
import "./MyStartUp.scss";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import { getInvestorById } from "../../../Service/user";
import { useDispatch, useSelector } from "react-redux";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";
import {
  selectMyInterests,
  selectUserInvestor,
  selectUserStartupsInvested,
  selectMyPastInvestments,
} from "../../../Store/features/user/userSlice";
import InvestmentSection from "./InvestmentSection";
import InterestSection from "./InterestSection";
import SummarySection from "./SummarySection";

const MyStartUp = () => {
  const userInvestor = useSelector(selectUserInvestor);
  const userStartupsInvested = useSelector(selectUserStartupsInvested);
  const userMyInterests = useSelector(selectMyInterests);
  const pastInvestments = useSelector(selectMyPastInvestments);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "My Startups | Investors - The Capital Hub";
    dispatch(setPageTitle("My Startups"));
  }, [dispatch]);

  const [investedStartups, setInvestedStartups] = useState(userStartupsInvested);
  const [myInterests, setMyInterests] = useState(userMyInterests);
  const [pastInvestment, setPastInvestment] = useState(pastInvestments);

  useEffect(() => {
    if (!userMyInterests || !userStartupsInvested || !pastInvestment) {
      getInvestorById(userInvestor)
        .then(({ data }) => {
          setInvestedStartups(data?.startupsInvested);
          setMyInterests(data?.myInterests);
          setPastInvestment(data?.pastInvestments);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userInvestor, userStartupsInvested, userMyInterests]);

  return (
    <MaxWidthWrapper>
      <div className="container-fluid mystartup_main_container">
        <SmallProfileCard text={"My Startup"} />

        {/* Onboarding popup */}
        <TutorialTrigger
          steps={investorOnboardingSteps.myStartupsPage}
          className={"mb-3"}
        />

        <div className="startup_container p-0">
          
          <InvestmentSection
            investedStartups={investedStartups}
            setInvestedStartups={setInvestedStartups}
          />

          
          <InterestSection
            myInterests={myInterests}
            setMyInterests={setMyInterests}
          />
        </div> 
        
          {/* Summary and Past Investments */}
          <SummarySection
            pastInvestment={pastInvestment}
            setPastInvestment={setPastInvestment}
          />
      </div>
    </MaxWidthWrapper>
  );
};

export default MyStartUp;
