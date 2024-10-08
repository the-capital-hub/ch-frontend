import React from "react";
import { useSelector } from "react-redux";
import ChartComponent from "./ChartComponent";
import PostInvestmentCard from "../InvestorCards/PostInvestmentCard/PostInvestmentCard";
import ModalBsLauncher from "../../../components/PopUp/ModalBS/ModalBsLauncher/ModalBsLauncher";
import ModalBSContainer from "../../../components/PopUp/ModalBS/ModalBSContainer/ModalBSContainer";
import ModalBSHeader from "../../../components/PopUp/ModalBS/ModalBSHeader/ModalBSHeader";
import ModalBSBody from "../../../components/PopUp/ModalBS/ModalBSBody/ModalBSBody";
import AddModalContent from "../../../components/NewInvestor/MyStartupsComponents/AddModalContent";
import EditModalContent from "../../../components/NewInvestor/MyStartupsComponents/EditModalContent";
import { selectTheme } from "../../../Store/features/design/designSlice";
import './InvestmentSection.scss';


const SummarySection = ({ pastInvestment, setPastInvestment }) => {
const theme = useSelector(selectTheme);
  return (
    <div className="row g-1 mt-5 big_card_container d-flex flex-column flex-md-row mx-auto">
      <div className="col-12 col-md-6 left_container" style={{backgroundColor: theme==="dark"?"#18181899":"#b1b0b04d"}}>
        <h4 className="title_h4 border-bottom pb-2">Summary</h4>
        <div className="chart_container">
          <ChartComponent />
        </div>
      </div>
      <div className="col-6 right_container" style={{backgroundColor: theme==="dark"?"#18181899":"#b1b0b04d", height: 500}}>
      <div className="d-flex justify-content-between border-bottom align-items-center">
        <h4 className="title_h4 ">Past Investments</h4>
        <div className="buttonsContainer gap-2 d-flex">
          <ModalBsLauncher id={"myPastInvestmentsModal"} className={"btn-myinvestor px-3 py-1 mb-2"}>
            Add
          </ModalBsLauncher>
          <ModalBsLauncher id={"myPastInvestmentsEditModal"} className={"btn-myinvestor px-3 py-1 mb-2"}>
            Edit
          </ModalBsLauncher>
        </div>
      </div>
        <div className="d-flex flex-column flex-md-row text-center gap-2">
          
        </div>
        <div className="two_by_two_card_container flex-column flex-md-row">
          {pastInvestment?.length > 0
            ? pastInvestment.map((company, index) => (
                <PostInvestmentCard
                  key={index}
                  logo={company.logo}
                  text={company.name}
                  para={company.description}
                />
              ))
            : "No Data Found."}
        </div>
      </div>
      <ModalBSContainer id={"myPastInvestmentsModal"} isStatic={false}>
        <ModalBSHeader title={"Add Past Investment"} className={"d-l-grey"} />
        <ModalBSBody className={"d-l-grey"}>
          <AddModalContent isPastInvestments setPastInvestments={setPastInvestment} />
        </ModalBSBody>
      </ModalBSContainer>
      <ModalBSContainer id={"myPastInvestmentsEditModal"} isStatic={false} modalXl key={"edit past investments"}>
        <ModalBSHeader title={"Edit Past Investments"} className={"d-l-grey"} />
        <ModalBSBody className={"d-l-grey"}>
          {pastInvestment && (
            <EditModalContent
              dataArray={pastInvestment}
              isPastInvestments
              setPastInvestments={setPastInvestment}
            />
          )}
        </ModalBSBody>
      </ModalBSContainer>
    </div>
  );
};

export default SummarySection;
