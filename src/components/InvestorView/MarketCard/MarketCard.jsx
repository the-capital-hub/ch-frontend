import "./MarketCard.scss";

const MarketCard = ({ title, subtitle, amount }) => {
  return (
    <div className="MarketCard">
      <div className="titles">
        <h3>{title}{subtitle}</h3>
      </div>
      <div className="amount">
        <input type="text" placeholder={amount || `Enter Amount`} />
        <span>Cr</span>
      </div>
    </div>
  );
};

export default MarketCard;
