import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
  ModalBsLauncher,
} from "../../../PopUp/ModalBS";
import SectorCard from "../SectorCard";
import AddEditModal from "../AddEditModal";
import "./SectorsInterested.scss";
import {
  selectUserInvestor,
  selectUserSectorInterested
} from "../../../../Store/features/user/userSlice";
import { getInvestorById } from "../../../../Service/user";

export default function SectorsInterested() {
  // Fetch loggedInUser from global state
  const userSectorInterested = useSelector(selectUserSectorInterested);
  const userInvestor = useSelector(selectUserInvestor);

  // States for sectors Interested
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
    <>
      <div className="sector_interested border shadow-sm">
        <div className="header border-bottom p-4">
          <h2 className="green_underline typography">Sectors Interested</h2>
          {/* <div className="">
            {/* {investor?.founderId === loggedInUser._id && ( 
            <ModalBsLauncher
              id="sectorsModal"
              className={"green_button px-2 px-sm-3 "}
            >
              Add New
            </ModalBsLauncher>
            )} 
          </div>*/}
        </div>
        {/* Loop cards from here onwards */}
        <div className="interested_cards px-3 py-5 ">
          {sectorsData?.map((sector, index) => {
            return <SectorCard key={sector._id} sector={sector} />;
          })}
        </div>
        {/* Sectors Modal */}
        <ModalBSContainer id="sectorsModal" isStatic={false} modalXl>
          <ModalBSHeader
            title={"Add/Edit Sectors interested"}
            className={"d-l-grey"}
          />
          <ModalBSBody>
            <AddEditModal
              dataArray={sectorsData}
              heading={"Sectors Interested"}
              isStartups={false}
              setSectorsData={setSectorsData}
            />
          </ModalBSBody>
        </ModalBSContainer>
      </div>
    </>
  );
}
