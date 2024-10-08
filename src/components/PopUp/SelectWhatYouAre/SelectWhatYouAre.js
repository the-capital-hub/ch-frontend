import "./SelectWhatYouAre.scss";
import StartUpIcon from "../../../Images/start_up.png";
import InvestorIcon from "../../../Images/investor_popup.png";
import { Link } from "react-router-dom";

const SelectWhatYouAre = ({ onStartupClick, onInvestorClick }) => {
  const openStartUp = () => {
    onStartupClick();
  };
  const openInvestor = () => {
    onInvestorClick();
  };

  return (
    <>
      <div className="slection_container">
        <div className="popup-container">
          <div className="popup">
            <div className="back_and_home">
              <span>← Back</span>
              <Link href="/signup">Home</Link>
            </div>
            <h2>Select One what you are</h2>
            <div className="inside_popup">
              <div className="card">
                <img src={StartUpIcon} alt="Card 1" />
                <button onClick={openStartUp}>Startup</button>
              </div>
              <div className="card">
                <img src={InvestorIcon} alt="Card 2" />
                <button onClick={openInvestor}>Investor</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectWhatYouAre;
