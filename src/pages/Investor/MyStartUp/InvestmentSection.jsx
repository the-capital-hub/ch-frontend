import React from "react";
import MyInvestmentCard from "../InvestorCards/MyInvestmentCard/MyInvestmentCard";
import ModalBsLauncher from "../../../components/PopUp/ModalBS/ModalBsLauncher/ModalBsLauncher";
import ModalBSContainer from "../../../components/PopUp/ModalBS/ModalBSContainer/ModalBSContainer";
import ModalBSHeader from "../../../components/PopUp/ModalBS/ModalBSHeader/ModalBSHeader";
import ModalBSBody from "../../../components/PopUp/ModalBS/ModalBSBody/ModalBSBody";
import AddModalContent from "../../../components/NewInvestor/MyStartupsComponents/AddModalContent";
import EditModalContent from "../../../components/NewInvestor/MyStartupsComponents/EditModalContent";
import './InvestmentSection.scss';

const InvestmentSection = ({ investedStartups, setInvestedStartups }) => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-between"
        id="editInvestments"
      >
        <h4 className="title_h4 m-0 green_underline">My Investments</h4>
        <div className="d-flex flex-column flex-md-row text-center gap-2">
          <ModalBsLauncher id={"myInvestmentsAddModal"} className={"btn btn-myinvestor"}>
            Add
          </ModalBsLauncher>
          <ModalBsLauncher id={"myInvestmentsEditModal"} className={"btn btn-myinvestor"}>
            Edit
          </ModalBsLauncher>
        </div>
      </div>
      <div className="card_container py-3 d-flex gap-3 align-items-center overflow-x-auto" id="myInvestmentsCards">
        {investedStartups?.length > 0
          ? investedStartups.map((company) => <MyInvestmentCard key={company.name} company={company} />)
          : "No Data Found."}
      </div>
      <ModalBSContainer id={"myInvestmentsAddModal"} isStatic={false}>
        <ModalBSHeader title={"Add new Investment"} className={"d-l-grey"} />
        <ModalBSBody className={"d-l-grey"}>
          <AddModalContent setInvestedStartups={setInvestedStartups} />
        </ModalBSBody>
      </ModalBSContainer>
      <ModalBSContainer id={"myInvestmentsEditModal"} isStatic={false} modalXl key={"edit investments"}>
        <ModalBSHeader title={"Edit Investments"} className={"d-l-grey"} />
        <ModalBSBody className={"d-l-grey"}>
          {investedStartups && (
            <EditModalContent
              dataArray={investedStartups}
              setInvestedStartups={setInvestedStartups}
            />
          )}
        </ModalBSBody>
      </ModalBSContainer>
    </>
  );
};

export default InvestmentSection;
