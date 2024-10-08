import React from "react";
import Default from "../../../Images/Investor/searchResult/business-and-trade.png";
import "./ResultBar.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectLoggedInUserId,
  selectUserOneLink,
} from "../../../Store/features/user/userSlice";

export default function ResultBar({
  image,
  name,
  description,
  isCompany,
  param,
  isInvestor = false,
  oneLinkId,
}) {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const userOneLink = useSelector(selectUserOneLink);

  const linkTo = isCompany
    ? `/investor/company-profile/${param}`
    : `/investor/user/${name}/${oneLinkId}`;
  const link = isInvestor ? `${linkTo}?investor=1` : linkTo;

  const disableLink = isCompany
    ? param === userOneLink
    : param === loggedInUserId;

  return (
    <Link
      className="text-decoration-none"
      style={{
        color: "var(d-l-grey)",
        pointerEvents: `${disableLink ? "none" : "all"}`,
      }}
      // to={isCompany ? `/investor/company-profile/${param}` : `/investor/user/${param}`}
      to={link}
    >
      <div className="result__bar d-flex align-items-center gap-3 p-3">
        <img
          src={image || Default}
          alt=""
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
          className="rounded-circle border border-dangers"
        />
        <div className="result__item__text d-flex flex-column d-l-grey">
          <h4>{name || "BondLink"}</h4>
          <p className="m-0 text-secondary">
            {description ||
              "One classical breakdown of economic activity distinguishes three sectors."}
          </p>
        </div>
      </div>
    </Link>
  );
}
