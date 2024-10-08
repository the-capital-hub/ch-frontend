import { useDispatch } from "react-redux";
import ComingSoon from "../../../components/ComingSoon/ComingSoon";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import CompanyCardContainer from "../../../components/NewInvestor/SyndicateComponents/CompanyCardContainer";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import "./Syndicates.scss";
import { useEffect } from "react";
import { setPageTitle } from "../../../Store/features/design/designSlice";

export default function Syndicates() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Syndicates | The Capital Hub"));
    window.title = "Syndicates | The Capital Hub";
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="syndicates__container px-3 border-start">
        <div className="pb-4 pt-2">
          <SmallProfileCard text="Syndicates" />
        </div>
        <ComingSoon titleColor={"green"} />
        {/* <section className="section__wrapper bg-white rounded-4 border">
           <div className="companies__container border-bottom ">
            <div className="companies__header py-3 px-4 d-flex flex-column flex-sm-row gap-4 justify-content-between align-items-center border-bottom">
              <h2 className="main__heading div__heading">Companies</h2>
              <div className="main__btn">
                <Button text="Create a Group" />
                <button className="btn-capital ">Create a Group</button>
              </div>
            </div>
            <div className="container__padding py-5 px-3 px-sm-4">
              <CompanyCardContainer key={"companies"} isCompanies />
            </div>
          </div>
          <div className="membership__container mt-4 py-1 px-4 d-flex justify-content-between align-items-center border-bottom">
            <h2 className="main__heading div__heading mb-2">Membership</h2>
          </div>
          <div className="container__padding py-5  px-2 px-sm-4">
            <CompanyCardContainer key={"members"} text={"Membership"} />
          </div>
        </section> */}
      </div>
    </MaxWidthWrapper>
  );
}
