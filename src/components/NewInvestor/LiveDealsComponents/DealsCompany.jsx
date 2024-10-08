import DealsHeader from "../../../components/NewInvestor/LiveDealsComponents/DealsHeader";
import DealsOverview from "../../../components/NewInvestor/LiveDealsComponents/DealsOverview";
import DealsInvestors from "../../../components/NewInvestor/LiveDealsComponents/DealsInvestors";
import DealsFunds from "../../../components/NewInvestor/LiveDealsComponents/DealsFunds";
import "./DealsCard.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import { addInvestorToLiveDeal } from "../../../Service/user";
import { useEffect, useState } from "react";
import RevenueStatistics from "../../../components/NewInvestor/LiveDealsComponents/RevenueStatistics";
import CurrentFunding from "./CurrentFunding";

export default function DealsCompany({ company, setData }) {
  const theme = useSelector(selectTheme);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const [userInterested, setUserInterested] = useState([]);
  useEffect(() => {
    const isExist = company.intrustedInvestor.filter(
      (item) => item?._id === loggedInUserId
    );
    console.log(isExist);
    if (isExist) {
      setUserInterested(isExist[0]?._id);
    }
  }, [userInterested, company, loggedInUserId]);
  const handelDeals = async () => {
    try {
      if (!company.intrustedInvestor.includes(loggedInUserId)) {
        addInvestorToLiveDeal(company._id)
          .then((res) => {
            console.log(res);
            setData(res);
            // const companyData= res.filter()
            // setUserInterested(true)
          })
          .catch((error) => {
            console.error("Error-->", error);
          });
      }
    } catch (err) {}
  };
  return (
    <div
      className="company__deals  shadow-sm border rounded-4"
      style={{
        background: theme === "dark" ? "#212224" : "#f5f5f5",
        padding: "2rem",
      }}
    >
      <DealsHeader
        image={company.startupId.logo}
        name={company.startupId.company}
        motto={company.startupId.sector}
        theme={theme}
        handelDeals={handelDeals}
        loggedInUserId={loggedInUserId}
        userInterested={userInterested}
      />
      <DealsOverview
        name={company.name}
        about={company.startupId.description}
        theme={theme}
      />
      <DealsInvestors
        theme={theme}
        intrustedInvestor={company.intrustedInvestor}
      />
      {/* <DealsFunds theme={theme} /> */}
      <RevenueStatistics/>
      
      <CurrentFunding/>

    </div>
  );
}
