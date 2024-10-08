import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import {
  InfosysNiceImage,
  HCLNiceImage,
  WiproNiceImage,
} from "../../../Images/Investor/LiveDeals";
import "../Syndicates/Syndicates.scss";
import "./LiveDeals.scss";
import DealsCompany from "../../../components/NewInvestor/LiveDealsComponents/DealsCompany";
//import ComingSoon from "../../../components/ComingSoon/ComingSoon";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setPageTitle } from "../../../Store/features/design/designSlice";
import { addInvestorToLiveDeal, liveDeals } from "../../../Service/user";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";


export default function LiveDeals() {
  const dispatch = useDispatch();

  const [data,setData]= useState([])
  // Fetch companies data here.

  useEffect(() => {
    window.title = "Live Deals | The Capital Hub";
    dispatch(setPageTitle("Live Deals"));
  }, []);

  useEffect(()=>{
    liveDeals().then((res) => {
      setData(res)
    })
    .catch((error) => {
      console.error("Error-->", error);
    });
  },[])

  return (
    <MaxWidthWrapper>
      <div className="liveDeals__container px-3">
        <div className="pb-4 pt-2">
          <SmallProfileCard text="Live Deals" />
        </div>
        {/*<ComingSoon titleColor={"green"} />*/}
        <section className="section__wrapper">
          <div className="deals__company__container d-flex flex-column gap-4">
            {data.map((company) => {
              return <DealsCompany company={company} key={company.name} setData={setData}/>;
            })}
          </div>
        </section> 
      </div>
    </MaxWidthWrapper>
  );
}
