import React from "react";
import "./InvestmentPhilosophy.scss";
import ExperienceModal from "./Modals/ExperienceModal/ExperienceModal";
import EducationModal from "./Modals/EducationModal/EducationModal";
import InvestmentPhilosophyInfo from "./Components/InvestmentPhilosophyInfo/InvestmentPhilosophyInfo";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";

export default function InvestmentPhilosophy() {
  const theme = useSelector(selectTheme)
  return (
    <section className="investment_philosophy shadow-sm rounded-2">
      <h2 className="typography" style={{color:theme === "dark"?"#fff":"black"}}>Investment  Thesis</h2>

      {/* Investment Philosophy Info */}
      <InvestmentPhilosophyInfo />

      {/* Recent Experience */}
      {/*<RecentExperience />*/}

      {/* Education */}
      {/*<Education />*/}

      {/* Investment Details */}
      {/*<InvestmentDetails />*/}
      {/* <button className="green_button btn mx-3">
        Book Your Appointment Now
      </button> */}

      {/* Modals */}
      <ExperienceModal />
      <EducationModal />
    </section>
  );
}
