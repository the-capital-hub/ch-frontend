import DealsCard from "./DealsCard";


export default function DealsInvestors({ theme, intrustedInvestor }) {
  console.log(intrustedInvestor[0]);
  return (
    <div className="deals__investors d-flex flex-column gap-3">
      <h6
        className="div__heading"
        style={{ color: theme === "dark" ? "#fff" : "black",paddingTop:"10px" }}
      >
        Interested Investors
      </h6>
      <div className="deals__card__container d-flex flex-wrap gap-5">
        {intrustedInvestor.length>0?intrustedInvestor.map((investor, index) => {
          return (
            <DealsCard
              key={`${investor.name}${index}`}
              image={investor.profilePicture}
              theme={theme}
            >
              <p style={{ color: theme === "dark" ? "#fff" : "black" }}>
                {investor.firstName}
                {investor.lastName}
              </p>
              <p
                className={`${
                  theme === "dark" ? "fw-dark" : "fw-lighter"
                } text-black-50 small`}
                style={{ color: theme === "dark" ? "#fff" : "black" }}
              >
                <small style={{ color: theme === "dark" ? "#fff" : "black" }}>
                  {investor.designation}
                </small>
              </p>
            </DealsCard>
          );
        }):<h4 className="typography">No investor interested</h4>}
      </div>
    </div>
  );
}
