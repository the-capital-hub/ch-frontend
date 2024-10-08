import React, { useState } from "react";
import {
  loginSuccess,
  selectCompanyFounderId,
  selectLoggedInUserId,
  selectUserInvestmentPhilosophy,
  selectUserSectorPreferences,
} from "../../../../../../Store/features/user/userSlice";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
// import { postInvestorData } from "../../../../../../Service/user";
import "./InvestmentPhilosophyInfo.scss";
import InfoField from "./InfoField/InfoField";
import { updateUserAPI } from "../../../../../../Service/user";
import SpinnerBS from "../../../../../Shared/Spinner/SpinnerBS";
import { PhilosophyQuestions } from "../../../../../../constants/Investor/ProfilePage";
import toast from "react-hot-toast";
import { IoIosArrowDown } from "react-icons/io";
import "./investment.scss";

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <IoIosArrowDown className="chevron-down" />
      </>
    }
  />
);

export default function InvestmentPhilosophyInfo() {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const companyFounderId = useSelector(selectCompanyFounderId);
  const userSectorPreferences = useSelector(selectUserSectorPreferences);
  const userInvestmentPhilosophy = useSelector(selectUserInvestmentPhilosophy);
  const [openItems, setOpenItems] = useState([]);
  const dispatch = useDispatch();

  // Local states
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState(userSectorPreferences);
  const [loading, setLoading] = useState(false);

  // Submit investment Philosophy
  const submitInvestmentPhilosophyChange = async (e) => {
    e.preventDefault();

    // Set loading
    setLoading(true);

    const {
      importanceOfManagement,
      roleAsAInvestor,
      founderAlmaMaterMatters,
      riskManagementInInvestments,
      guideOnSellingInvestments,
      timingInInvestmentDecisions,
      macroeconomicFactorsInfluenceInvestments,
      assessCompanyCompetitiveAdvantage,
      industryTrendsHoldInYourStrategy,
      evaluateCompanyGrowthPotential,
      weightGaveToTechnologicalInnovation,
    } = e.target;

    let updatedData = {
      philosophy: {
        importanceOfManagement: importanceOfManagement?.value,
        roleAsAInvestor: roleAsAInvestor?.value,
        founderAlmaMaterMatters: founderAlmaMaterMatters?.value,
        riskManagementInInvestments: riskManagementInInvestments?.value,
        guideOnSellingInvestments: guideOnSellingInvestments?.value,
        timingInInvestmentDecisions: timingInInvestmentDecisions?.value,
        macroeconomicFactorsInfluenceInvestments:
          macroeconomicFactorsInfluenceInvestments?.value,
        assessCompanyCompetitiveAdvantage:
          assessCompanyCompetitiveAdvantage?.value,
        industryTrendsHoldInYourStrategy:
          industryTrendsHoldInYourStrategy?.value,
        evaluateCompanyGrowthPotential: evaluateCompanyGrowthPotential?.value,
        weightGaveToTechnologicalInnovation:
          weightGaveToTechnologicalInnovation?.value,
      },
      sectorPreferences: selectedSectors,
    };

    try {
      const { data } = await updateUserAPI(updatedData);
      dispatch(loginSuccess(data.data));
      toast.success("Changes Saved");
    } catch (error) {
      toast.error("Error saving Investment Philosophy. Please try again.");
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  const handleAccordionChange = (key) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(key)
        ? prevOpenItems.filter((item) => item !== key)
        : [...prevOpenItems, key]
    );
  };

  return (
    <>
      <form
        onSubmit={submitInvestmentPhilosophyChange}
        className="d-flex flex-column gap-2"
      >
        {companyFounderId === loggedInUserId && (
          <span
            className="ms-auto d-flex align-items-center gap-3"
            style={{ marginRight: "30px" }}
          >
            <button
              className="btn edit_button"
              onClick={() => setIsEditing(!isEditing)}
              type="button"
              style={{ border: "none" }}
            >
              <CiEdit color="#d3f36b" />
            </button>
            {isEditing && (
              <button
                className="btn edit_button"
                type="submit"
                style={{ color: "#d3f36b" }}
              >
                {loading ? (
                  <SpinnerBS
                    spinnerSizeClass="spinner-border-sm"
                    className={"mx-auto"}
                  />
                ) : (
                  <>
                    Save <CiSaveUp2 />
                  </>
                )}
              </button>
            )}
          </span>
        )}

        {/* Info */}
        <div className="philosophy_info d-flex flex-column gap-4 w-100 px-4 py-2">
          <Accordion transition transitionTimeout={250}>
            {Object.keys(PhilosophyQuestions).map((question) => {
              return (
                <AccordionItem
                  header={PhilosophyQuestions[question]}
                  key={question}
                  onClick={() => handleAccordionChange(question)}
                  initialEntered={openItems.includes(question)}
                >
                  <InfoField
                    data={
                      userInvestmentPhilosophy
                        ? userInvestmentPhilosophy[question]
                        : null
                    }
                    isEditing={isEditing}
                    legend={PhilosophyQuestions[question]}
                    name={question}
                    key={question}
                    loading={loading}
                  />
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </form>
    </>
  );
}
