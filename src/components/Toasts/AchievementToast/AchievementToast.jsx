import "./AchievementToast.scss";
import silverImage from "../../../Images/Investor/Achievements/silver.png";
import goldImage from "../../../Images/Investor/Achievements/gold.png";
import bronzeImage from "../../../Images/Investor/Achievements/bronze.png";
import logo from "../../../Images/investorIcon/LogoX.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsInvestor } from "../../../Store/features/user/userSlice";
import achievementImage from "../../../Images/Investor/Achievements/img_1.png";

const getImageByType = (badge) => {
  switch (badge) {
    case "bronze":
      return bronzeImage;
    case "silver":
      return silverImage;
    case "gold":
      return goldImage;
    default:
      return achievementImage;
  }
};

const AchievementToast = ({ type }) => {
  const isInvestor = useSelector(selectIsInvestor);

  return (
    <Link
      to={
        isInvestor ? "/investor/profile/achievements" : "/profile/achievements"
      }
      className="achievement-toast text-decoration-none text-black rounded-3 bg-white shadow-lg pointer-events-auto row align-items-center m-0 border"
    >
      <div className="col-3 p-1 badge-img">
        <img src={getImageByType(type?.badge)} alt="badge" className="w-100" />
      </div>
      <div className="col-7 p-2 d-flex flex-column align-items-start gap-2">
        <h6 className="m-0 fs-semibold text-capitalize">
          {type.badge} Achievement!
        </h6>
        <p className="m-0 fs-normal">{type.title}</p>
      </div>
      <div className="col-2">
        <img src={logo} alt="The capital hub" className="w-75" />
      </div>
    </Link>
  );
};

export default AchievementToast;
