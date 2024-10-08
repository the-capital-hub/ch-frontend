import React from "react";
import ArrowIcon from "../../../../Images/investorIcon/Arrow.svg";
import "./SmallProfileCard.scss";
import { useSelector } from "react-redux";

const SmallProfileCard = ({ className, text, width }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  const formattedDate = formatDate(new Date().toDateString());

  return (
    <>
      {/* <div className={`container-fluid small_card_container ${className}`}>
        <div
          className="d-flex flex-column flex-md-row align-items-center gap-1 gap-md-5 small_card_row"
          style={{ width: width ? width : "100%" }}
        >
          <div className="">
            <div className="box boxOne flex_content">
              <h2 className="typography">Hello, {loggedInUser?.firstName}</h2>
              <span className="smallest_typo">{formattedDate}</span>
            </div>
          </div>
          <div className="">
            <div className="box boxTwo flex_content">
              <img src={ArrowIcon} alt="arrow" />
              <h2 className="typography">{text ? text : "My Profile"}</h2>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default SmallProfileCard;
