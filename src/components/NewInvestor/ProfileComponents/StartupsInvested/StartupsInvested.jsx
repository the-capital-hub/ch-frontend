import React, { useEffect, useState } from "react";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
  ModalBsLauncher,
} from "../../../PopUp/ModalBS";
import AddEditModal from "../AddEditModal";
import { useSelector } from "react-redux";
import InvestedCard from "../InvestedCard";
import "./StartupsInvested.scss";
import {
  selectUserInvestor,
  selectUserStartupsInvested,
} from "../../../../Store/features/user/userSlice";
import { getInvestorById } from "../../../../Service/user";

export default function StartupsInvested() {
  // Fetch loggedInUser from global state
  const userStartupsInvested = useSelector(selectUserStartupsInvested);
  const userInvestor = useSelector(selectUserInvestor);

  // States for Invested Startups
  const [investedStartups, setInvestedStartups] =
    useState(userStartupsInvested);

  useEffect(() => {
    if (!userStartupsInvested) {
      getInvestorById(userInvestor)
        .then(({ data }) => {
          setInvestedStartups(data.startupsInvested);
        })
        .catch(() => setInvestedStartups([]));
    } else {
      setInvestedStartups(userStartupsInvested);
    }
  }, [userInvestor, userStartupsInvested]);

  return (
    <>
      <div className="startups_invested border shadow-sm">
        <div className="header border-bottom p-4 ">
          <h2 className="green_underline typography">Startups Invested</h2>
          <div className="">
            {/* {investor?.founderId === loggedInUser._id && ( */}
            <ModalBsLauncher
              id="startupsModal"
              className={"btn btn-investor px-2 px-sm-3 "}
            >
              Add New
            </ModalBsLauncher>
            {/* )} */}
          </div>
        </div>
        {/* Loop cards here */}
        <div className="invested_cards px-3 py-4">
          {investedStartups?.map((startUp, index) => {
            return <InvestedCard startUp={startUp} key={startUp._id} />;
          })}
        </div>
        
        {/* Startups Modal */}
        <ModalBSContainer id="startupsModal" isStatic={false} modalXl>
          <ModalBSHeader
            title="Add/Edit Startups Invested"
            className={"d-l-grey"}
          />
          <ModalBSBody>
            <AddEditModal
              dataArray={investedStartups}
              heading={"Startups Invested"}
              setInvestedStartups={setInvestedStartups}
            />
          </ModalBSBody>
        </ModalBSContainer>
      </div>
    </>
  );
}
