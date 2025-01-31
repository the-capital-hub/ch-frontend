import DealsHeader from "../../../components/NewInvestor/LiveDealsComponents/DealsHeader";
import DealsOverview from "../../../components/NewInvestor/LiveDealsComponents/DealsOverview";
import DealsInvestors from "../../../components/NewInvestor/LiveDealsComponents/DealsInvestors";
import DealsFunds from "../../../components/NewInvestor/LiveDealsComponents/DealsFunds";
import "./DealsCard.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { selectLoggedInUserId, selectIsInvestor } from "../../../Store/features/user/userSlice";
import { addInvestorToLiveDeal, getStartUpById, getUserByIdBody } from "../../../Service/user";
import { useEffect, useState } from "react";
import RevenueStatistics from "../../../components/NewInvestor/LiveDealsComponents/RevenueStatistics";
import CurrentFunding from "./CurrentFunding";

export default function DealsCompany({ company, setData }) {
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const isInvestor = useSelector(selectIsInvestor);
  const [userInterested, setUserInterested] = useState([]);
  const [founderId, setFounderId] = useState({});

  // Extract founderId safely

  const companyId = company?.startupId?._id;

  useEffect(() => {
    const fetchFounderDetails = async () => {
      try {
        const startupResponse = await getStartUpById(companyId);
        const startupData = startupResponse.data.data;
        const founder_id = startupData.founderId.toString();
        const founderResponse = await getUserByIdBody(founder_id);
        setFounderId(founderResponse.data);
      } catch (error) {
        console.error('Error fetching founder details:', error);
      }
    };

    if (companyId) {
      fetchFounderDetails();
    }
  }, [companyId]);
  
  useEffect(() => {
    const isExist = company.intrustedInvestor.filter(
      (item) => item?._id === loggedInUserId
    );
    if (isExist) {
      setUserInterested(isExist[0]?._id);
    }
  }, [userInterested, company, loggedInUserId]);

  const handelDeals = async () => {
    try {
      if (!company.intrustedInvestor.includes(loggedInUserId)) {
        const res = await addInvestorToLiveDeal(company._id);
        setData(res);
      }
    } catch (err) {
      console.error("Error in handelDeals:", err);
    }
  };

  // return (
  //   <div
  //     className="company__deals shadow-sm border rounded-4"
  //     style={{
  //       background: theme === "dark" ? "#212224" : "#f5f5f5",
  //       padding: "2rem",
  //     }}
  //   >
  //     <DealsHeader
  //       image={company.startupId.logo}
  //       name={company.startupId.company}
  //       motto={company.startupId.sector}
  //       theme={theme}
  //       handelDeals={handelDeals}
  //       loggedInUserId={loggedInUserId}
  //       userInterested={userInterested}
  //       companyId={companyId}
  //       founderId={founderId}
  //       isInvestor={isInvestor}
  //     />
  //     <DealsOverview
  //       name={company.name}
  //       about={company.startupId.description}
  //       theme={theme}
  //     />
  //     <DealsInvestors
  //       theme={theme}
  //       intrustedInvestor={company.intrustedInvestor}
  //     />
  //     {/* <DealsFunds theme={theme} /> */}
  //     <RevenueStatistics/>
      
  //     <CurrentFunding/>

    </div>
  );
}
