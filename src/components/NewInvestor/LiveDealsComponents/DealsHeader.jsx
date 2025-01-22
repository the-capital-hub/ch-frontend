import SpinnerBS from "../../Shared/Spinner/SpinnerBS";

export default function DealsHeader({
  image,
  name,
  motto,
  theme,
  handelDeals,
  loggedInUserId,
  userInterested,
  handleConnectWithFounder, // Assuming you have a function to handle this action
}) {
  return (
    <div className="deals__header pb-3 d-flex flex-column flex-lg-row justify-content-between align-items-center border-bottom">
      <div className="d-flex gap-2">
        <img
          src={image}
          alt={name}
          style={{ width: "88px", height: "88px", borderRadius: "50%", objectFit: "cover" }}
          className=""
        />
        <div className="d-flex flex-column gap-2 justify-content-center">
          <h3
            className="main__heading fw-semibold"
            style={{ color: theme === "dark" ? "#fff" : "black" }}
          >
            {name}
          </h3>
          <p
            className="company__motto"
            style={{ color: theme === "dark" ? "#fff" : "black" }}
          >
            {motto}
          </p>
        </div>
      </div>
      <div className="d-flex gap-2">
        {userInterested === loggedInUserId ? (
          <button
            type="button"
            className="d-flex align-items-center gap-2 btn btn-danger fw-bold fs-6"
            onClick={handelDeals}
          >
            Mark as not Interested
          </button>
        ) : (
          <button className="d-flex align-items-center gap-2 btn btn-investor fw-bold fs-6" onClick={handelDeals}>
            Show Interest
          </button>
        )}
        <button className="btn btn-primary" onClick={handleConnectWithFounder}>
          Connect with Founder
        </button>
      </div>
    </div>
  );
}
