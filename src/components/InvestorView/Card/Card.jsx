import "./Card.scss";
// import { threeblackdots } from "../../../Images/InvestorsView";

const Card = ({ text, onClicked, image }) => {
  let folderName;

  switch (text) {
    case "pitchdeck":
      folderName = "Pitch Deck";
      break;
    case "business":
      folderName = "Business";
      break;
    case "kycdetails":
      folderName = "KYC Details";
      break;
    case "legal and compliance":
      folderName = "Legal And Compliance";
      break;
    default:
      folderName = text;
  }
  return (
    <div
      onClick={onClicked}
      className="investorsCard"
      id={text.split(" ").join("_")}
    >
      <div className="folder_container">
        <img
          src={image}
          alt={text}
          style={{ objectFit: "cover", height: "auto", width: "180px" }}
          className="align-self-center"
        />
        {/* <img src={threeblackdots} alt="" /> */}
        <div className="folder_footer">
          <hr />
          <p>{folderName}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
