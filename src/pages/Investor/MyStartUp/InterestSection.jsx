import React, { useEffect, useState } from "react";
import MyInvestmentCard from "../InvestorCards/MyInvestmentCard/MyInvestmentCard";
import ModalBsLauncher from "../../../components/PopUp/ModalBS/ModalBsLauncher/ModalBsLauncher";
import ModalBSContainer from "../../../components/PopUp/ModalBS/ModalBSContainer/ModalBSContainer";
import ModalBSHeader from "../../../components/PopUp/ModalBS/ModalBSHeader/ModalBSHeader";
import ModalBSBody from "../../../components/PopUp/ModalBS/ModalBSBody/ModalBSBody";
import EditModalContent from "../../../components/NewInvestor/MyStartupsComponents/EditModalContent";
import { getStartUpById } from "../../../Service/user";
import './InvestmentSection.scss';

const InterestSection = ({ myInterests, setMyInterests }) => {
  const [interestsData, setInterestsData] = useState([]);

  useEffect(() => {
    const fetchInterestsData = async () => {
      try {
        const data = await Promise.all(
          myInterests.map(async (interest) => {
            const response = await getStartUpById(interest.companyId);
            return response.data;
          })
        );
        setInterestsData(data);
      } catch (error) {
        console.error("Error fetching interests data:", error);
      }
    };

    if (myInterests.length > 0) {
      fetchInterestsData();
    }
  }, [myInterests]);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between py-3 "
        id="editInterests"
      >
        <h4 className="title_h4 m-0 green_underline">My Interests</h4>
        <div className="d-flex flex-column flex-md-row text-center gap-2">
          <ModalBsLauncher id={"myInterestsEditModal"} className={"btn btn-myinvestor"}>
            Edit
          </ModalBsLauncher>
        </div>
      </div>
      <div className="card_container d-flex gap-3 overflow-x-auto" id="myInterestsCards">
        {interestsData.length > 0
          ? interestsData.map((data, index) => (
              <MyInvestmentCard key={index} company={data} isInterests={true} />
            ))
          : "No Data Found."}
      </div>
      <ModalBSContainer id={"myInterestsEditModal"} isStatic={false} modalXl key={"edit interests"}>
        <ModalBSHeader title={"Edit Interests"} className={"d-l-grey"} />
        <ModalBSBody className={"d-l-grey"}>
          {myInterests && (
            <EditModalContent
              dataArray={interestsData}
              isInterests
              setMyInterests={setMyInterests}
            />
          )}
        </ModalBSBody>
      </ModalBSContainer>
    </>
  );
};

export default InterestSection;
