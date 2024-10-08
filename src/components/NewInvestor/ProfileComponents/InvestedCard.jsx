import fisdomStartUpIcon from "../../../Images/Investor/Profile/fisdom_startup.png";

export default function InvestedCard({ startUp }) {
  const text =
    "One classical breakdown of economic activity distinguishes three sectors: Primary: involves the retrieval and production of raw-material commodities, such as corn, coal, wood or iron";

  return (
    <div className="invested_card border rounded-4 " id={startUp.id}>
      <div className="card_title">
        <img src={startUp.logo || "https://res.cloudinary.com/drjt9guif/image/upload/v1692264454/TheCapitalHub/users/default-user-avatar_fe2ky5.webp"} alt="startup icon" width={50} />
        <h5 className="green_underline pb-2">{startUp.name}</h5>
      </div>
      <div className="py-2 pe-2 card_text">
        <p className="green_underline mb-1">Sector:</p>
        <p className="mb-0">{startUp.description}</p>
      </div>
      <div className="py-2 pe-2 card_text">
        <p className="green_underline mb-1">Invested:</p>
        <p className="mb-0">{ startUp.investedEquity}%  <strong>Equity</strong></p>
      </div>
    </div>
  );
}
