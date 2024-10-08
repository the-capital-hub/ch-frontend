import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import "./InvestmentPhilosophyForm.scss";
import SectorPreferences from "../../ProfileComponents/InvestmentPhilosophy/Components/InvestmentPhilosophyInfo/SectorPreferences/SectorPreferences";
import { PhilosophyQuestions } from "../../../../constants/Investor/ProfilePage";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  selectCompanyAge,
  selectCompanyName,
  selectCompanyRevenue,
  selectCompanyStage,
  selectLoggedInUserId,
  selectUserInvestmentPhilosophy,
  selectUserSectorPreferences,
  updateUserCompany,
} from "../../../../Store/features/user/userSlice";
import { postInvestorData, updateUserAPI } from "../../../../Service/user";
import FormTextArea from "./FormTextArea";
import DividerH from "../../../Shared/DividerH/DividerH";
import toast from "react-hot-toast";

export default function InvestmentPhilosophyForm() {
  const userSectorPreferences = useSelector(selectUserSectorPreferences);
  const userInvestmentPhilosophy = useSelector(selectUserInvestmentPhilosophy);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const companyName = useSelector(selectCompanyName);
  const companyAge = useSelector(selectCompanyAge);
  const companyStage = useSelector(selectCompanyStage);
  const companyRevenue = useSelector(selectCompanyRevenue);

  const [selectedSectors, setSelectedSectors] = useState(userSectorPreferences);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const startupFields = useMemo(
    () => [
      { name: "stage", label: "Stage", defaultValue: companyStage },
      { name: "age", label: "Age", defaultValue: companyAge },
      {
        name: "companyName",
        label: "Founded Startup",
        defaultValue: companyName,
      },
    ],
    [companyName, companyAge, companyStage]
  );

  async function handlePhilosophySubmit(e) {
    e.preventDefault();

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
      stage,
      age,
      companyName,
      revenueYear1,
      revenueAmount1,
      revenueYear2,
      revenueAmount2,
      revenueYear3,
      revenueAmount3,
      revenueYear4,
      revenueAmount4,
      revenueYear5,
      revenueAmount5,
    } = e.target;

    let updatedUserData = {
      philosophy: {
        importanceOfManagement: importanceOfManagement.value,
        roleAsAInvestor: roleAsAInvestor.value,
        founderAlmaMaterMatters: founderAlmaMaterMatters.value,
        riskManagementInInvestments: riskManagementInInvestments.value,
        guideOnSellingInvestments: guideOnSellingInvestments.value,
        timingInInvestmentDecisions: timingInInvestmentDecisions.value,
        macroeconomicFactorsInfluenceInvestments:
          macroeconomicFactorsInfluenceInvestments.value,
        assessCompanyCompetitiveAdvantage:
          assessCompanyCompetitiveAdvantage.value,
        industryTrendsHoldInYourStrategy:
          industryTrendsHoldInYourStrategy.value,
        evaluateCompanyGrowthPotential: evaluateCompanyGrowthPotential.value,
        weightGaveToTechnologicalInnovation:
          weightGaveToTechnologicalInnovation.value,
      },
      sectorPreferences: selectedSectors,
    };

    let revenueData = [
      { year: revenueYear1.value, amount: revenueAmount1.value },
      { year: revenueYear2.value, amount: revenueAmount2.value },
      { year: revenueYear3.value, amount: revenueAmount3.value },
      { year: revenueYear4.value, amount: revenueAmount4.value },
      { year: revenueYear5.value, amount: revenueAmount5.value },
    ];

    let updatedCompanyData = {
      founderId: loggedInUserId,
      stage: stage.value,
      age: age.value,
      companyName: companyName.value,
      revenue: revenueData,
    };

    try {
      const [userResponse, companyResponse] = await Promise.all([
        updateUserAPI(updatedUserData),
        postInvestorData(updatedCompanyData),
      ]);
      // console.log("userResponse", userResponse);
      // console.log("companyResponse", companyResponse);
      dispatch(loginSuccess(userResponse.data.data));
      dispatch(
        updateUserCompany({
          stage: companyResponse.data.stage,
          age: companyResponse.data.age,
          companyName: companyResponse.data.companyName,
          revenue: companyResponse.data.revenue,
        })
      );
      toast.success("Changes Saved");
    } catch (error) {
      console.error("Error saving information", error);
      toast.error("Error saving information. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form
      onSubmit={handlePhilosophySubmit}
      className="investment-philosophy-form px-3 px-lg-4 pb-4"
    >
      {/* Startp information */}
      <div
        className="d-flex align-items-center gap-4 flex-wrap"
        style={{ gridColumn: "1/-1" }}
      >
        {startupFields.map(({ name, label, defaultValue }) => {
          return (
            <Form.Group
              controlId={`onelink-${name}`}
              className="flex-grow-1 form-group"
              key={name}
            >
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type="text"
                name={name}
                defaultValue={defaultValue}
              />
            </Form.Group>
          );
        })}
      </div>

      <DividerH text={"Philosophy"} />

      {/* Select field */}
      <fieldset className="" style={{ gridColumn: "1/-1" }}>
        <legend>What are your Industries of preference?</legend>
        <SectorPreferences
          isEditing={true}
          setSelectedSectors={setSelectedSectors}
        />
      </fieldset>

      {/* Philosophy Questions */}
      {Object.keys(PhilosophyQuestions).map((question) => {
        return (
          <FormTextArea
            key={question}
            defaultValue={
              userInvestmentPhilosophy ? userInvestmentPhilosophy[question] : ""
            }
            label={PhilosophyQuestions[question]}
            name={question}
            controlId={`onelink-${question}`}
            // wordLimit={2}
          />
        );
      })}

      <DividerH text={"Revenue"} />

      {/* Revenue */}
      <div
        className="d-flex flex-column flex-md-row gap-3 flex-wrap"
        style={{ gridColumn: "1/-1" }}
      >
        {Array(5)
          .fill(0)
          .map(({ year, amount }, index) => {
            return (
              <div
                className="revenue-inputs d-flex flex-column align-items-center gap-2 px-3 py-3"
                key={`Slot${index}`}
              >
                <h5 className="align-self-start m-0">
                  Revenue Slot {index + 1}
                </h5>
                <Form.Group
                  controlId={`onelink-revenueYear-${index + 1}`}
                  className="form-group"
                >
                  <Form.Label className="">Year</Form.Label>
                  <Form.Control
                    type="number"
                    min={2010}
                    max={+String(new Date().getFullYear())}
                    name={`revenueYear${index + 1}`}
                    className="revenueYear"
                    defaultValue={
                      companyRevenue ? companyRevenue[index]["year"] : ""
                    }
                  />
                </Form.Group>
                <Form.Group
                  controlId={`onelink-revenueAmount-${index + 1}`}
                  className="form-group"
                >
                  <Form.Label className="">Amount</Form.Label>
                  <InputGroup className="justify-content-center">
                    <InputGroup.Text
                      className="text-bg-dark text-align-center d-block"
                      style={{ flex: "0 0 40px" }}
                    >
                      ₹
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      min={0}
                      name={`revenueAmount${index + 1}`}
                      className="revenueAmount"
                      defaultValue={
                        companyRevenue ? companyRevenue[index]["amount"] : ""
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </div>
            );
          })}
      </div>

      {/* Action button */}
      <div className="d-flex" style={{ gridColumn: "1/-1" }}>
        <Button
          type="submit"
          variant="investor"
          className="ms-auto d-flex align-items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" variant="black" />
              {"Saving..."}
            </>
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </Form>
  );
}
