// import { Button, Form, InputGroup } from "react-bootstrap";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import "./InvestorOneLinkEdit.scss";
import StartupsInvested from "../../../components/NewInvestor/ProfileComponents/StartupsInvested/StartupsInvested";
import ProfileInformationForm from "../../../components/NewInvestor/InvestorOneLinkEditComponents/ProfileInformation/ProfileInformationForm";
import InvestmentPhilosophyForm from "../../../components/NewInvestor/InvestorOneLinkEditComponents/InvestmentPhilosophyForm/InvestmentPhilosophyForm";

export default function InvestorOneLinkEdit() {
  return (
    <div className="oneLink-edit-wrapper mb-3">
      <MaxWidthWrapper>
        <div className="d-flex flex-column gap-3">
          {/* Profile Info */}
          <section className="white-to-grey rounded-4 shadow-sm border">
            <h3 className="px-3 px-lg-4 py-4 border-bottom">
              Profile Information
            </h3>
            <ProfileInformationForm />
          </section>

          {/* Startups Invested */}
          <StartupsInvested />

          {/* Investment Philosophy */}
          <section className="white-to-grey rounded-4 shadow-sm border">
            <h3 className="px-3 px-lg-4 py-4 border-bottom">
              Investment Philosophy
            </h3>
            <InvestmentPhilosophyForm />
          </section>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
