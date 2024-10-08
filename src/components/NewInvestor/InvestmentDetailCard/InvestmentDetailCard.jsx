import "./InvestmentDetailCard.scss";

function InvestmentDetailCard({ className, img, title, amount }) {
  return (
    <div className={className}>
      <div className={`investment_card rounded-4 border p-2`}>
        <img src={img} width={50} height={50} alt="investment icon" />
        <p className="my-auto flex-grow-1">{title}</p>
        <p className="rounded border px-2 py-1 my-auto">{amount}</p>
      </div>
    </div>
  );
}

export default InvestmentDetailCard;
