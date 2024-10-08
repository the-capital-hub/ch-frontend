import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectUserInvestor,
  selectUserRecentExperience,
} from "../../../Store/features/user/userSlice";
import { getInvestorById } from "../../../Service/user";
import SectorCard from "../ProfileComponents/SectorCard";

const RecentExperience = () => {
  const userSectorInterested = useSelector(selectUserRecentExperience);
  const userInvestor = useSelector(selectUserInvestor);
  const [sectorsData, setSectorsData] = useState(userSectorInterested);

  useEffect(() => {
    if (!userSectorInterested) {
      getInvestorById(userInvestor)
        .then(({ data }) => {
          setSectorsData(data.sectorInterested);
        })
        .catch(() => setSectorsData([]));
    } else {
      setSectorsData(userSectorInterested);
    }
  }, [userInvestor, userSectorInterested]);

  return (
    <div className="sector_interested border shadow-sm">
      <div className="header  p-4">
        <h2 className="green_underline typography">Recent Experience</h2>
      </div>
      <div className="interested_cards px-3 py-2 ">
        {sectorsData?.map((sector, index) => {
          return (
            <div
              key={index}
              className="border-bottom"
              style={{ width: "100%", padding: "10px 0" }}
            >
            <div className="d-flex">
              <img
                src={sector.logo}
                alt={sector.logo}
                style={{ width: "50px", height: "50px", borderRadius: "25px" }}
              />
              <div>
              <p className="typography" style={{fontSize:"15px"}}>{sector?.companyName}</p>
              <p className="typography"></p>
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentExperience;
