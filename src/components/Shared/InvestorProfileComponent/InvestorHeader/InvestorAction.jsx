import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import LinkPop from "../../../../components/PopUp/SubscriptionPopUp/SubcriptionPop";
// import PaymentPage from "../../../../components/PopUp/PaymentPopUp/PaymentPage";
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import "./InvestorActions.scss";
import SubcriptionPop from "../../../PopUp/SubscriptionPopUp/SubcriptionPop";
// import PaymentSuccess from "../../../PopUp/PaymentSuccessForm/PaymentSuccess";

export default function InvestorActions({
  person = "Founder",
  userId,
  name,
  oneLinkId,
  isInvestor,
}) {
  const [popPayOpen, setPopPayOpen] = useState(false);
  const loggedInUserId = useSelector(selectLoggedInUserId);

  const linkTo = isInvestor
    ? `/investor/user/${name}/${oneLinkId}`
    : `/user/${name}/${oneLinkId}`;

  const handleScheduleClick = () => {
    // setPopPayOpen(true);
  };

  //use below code for cross menu
  const handleClosePopup = () => {
    // setPopupOpen(false);
  };

  return (
    <>
    <div className="d-flex flex-column justify-content-center">
      <div className="d-flex flex-column-reverse flex-md-row align-items-start gap-3 mt-3 mb-3 mt-lg-0">
        {loggedInUserId !== userId && (
          <>
            {/* <Link to={linkTo}
              className="btn btn-capital-investor-view actions-btn"
              //onClick={()=>setPopPayOpen(true)}
            >
              Schedule Appointment
            </Link> */}

            <Link to={linkTo}
              className="btn btn-capital-investor-view actions-btn"
            >
              Know More
            </Link>
          </>
        )}
      </div>
    </div>
    {popPayOpen && <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen}/>}
    </>
  );
}
