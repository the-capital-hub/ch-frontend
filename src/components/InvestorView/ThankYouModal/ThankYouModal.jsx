import { tick } from "../../../Images/InvestorsView";
import "./ThankYouModal.scss";

const ThankYouModal = ({ onCancel }) => {
  return (
    <div className="investorPopUp">
      <div className="blackbg" onClick={() => onCancel(false)}></div>
      <div className="containerTwo">
        <div className="wrapperTwo">
          <span>Thank you for Showing Interest!</span>
          <img src={tick} alt="Thank you for Showing Interest!" />
        </div>
      </div>
    </div>
  );
};

export default ThankYouModal;
