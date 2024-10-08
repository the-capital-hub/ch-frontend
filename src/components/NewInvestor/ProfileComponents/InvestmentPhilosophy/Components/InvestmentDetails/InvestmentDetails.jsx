import React from "react";
import InvestmentDetailCard from "../../../../InvestmentDetailCard/InvestmentDetailCard";
import avgInvestmentIcon from "../../../../../../Images/Investor/Profile/avg_investment.png";
import noOfInvestmentIcon from "../../../../../../Images/Investor/Profile/num_of_investments.svg";
import ticketSizeIcon from "../../../../../../Images/Investor/Profile/ticket_size.svg";
import seedRoundIcon from "../../../../../../Images/Investor/Profile/seed_round.svg";
import totalInvestmentIcon from "../../../../../../Images/Investor/Profile/total_investment.png";
import { selectColorCardData } from "../../../../../../Store/features/user/userSlice";
import { useSelector } from "react-redux";

export default function InvestmentDetails() {
  const colorCardData = useSelector(selectColorCardData);

  return (
    <>
      <div className="investment_details_cards mx-md-4 row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 border">
        <InvestmentDetailCard
          className="col"
          img={totalInvestmentIcon}
          title="Total Investment"
          amount={colorCardData?.total_investment || "0"}
        />
        <InvestmentDetailCard
          className="col"
          img={avgInvestmentIcon}
          title="Average Investment"
          amount={colorCardData?.averageInvestment || "0"}
        />
        <InvestmentDetailCard
          className="col"
          img={noOfInvestmentIcon}
          title="No.of Investment"
          amount={colorCardData?.no_of_investments || "0"}
        />
        <InvestmentDetailCard
          className="col"
          img={ticketSizeIcon}
          title="Minimum Tickets Size"
          amount={colorCardData?.minimumTicketsSize || "0"}
        />
        <InvestmentDetailCard
          className="col"
          img={ticketSizeIcon}
          title="Maximum Tickets Size"
          amount={colorCardData?.maximumTicketsSize || "0"}
        />
        <InvestmentDetailCard
          className="col"
          img={seedRoundIcon}
          title="Seed Round"
          amount={colorCardData?.seedRound || "0"}
        />
      </div>
    </>
  );
}
