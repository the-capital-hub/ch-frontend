import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { getRawUserById } from "../../Service/user";
import Register from "../../components/Register/Register";
import "./rawUser.scss";
import { usePaymentFlow } from "../../hooks/usePaymentFlow";
import profile from "../StartUp/SalesLandingPage/COMPONENTS/images/profile.png";
import NotFound404 from "../Error/NotFound404/NotFound404";
import Home from "./components/Home/Home";
import Footer from "../../components/Footer/FooterForSalesLanding/Footer2";
import InvestorCards from "./components/InvestorCards/InvestorCards";

const RawUserPage = () => {
  const { userId } = useParams();
  const [rawUser, setRawUser] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const paymentFlow = usePaymentFlow();

  useEffect(() => {
    const fetchRawUser = async () => {
      try {
        const response = await getRawUserById(userId);
        setRawUser(response);
      } catch (error) {
        console.error("Error fetching raw user:", error);
      }
    };

    fetchRawUser();
  }, [userId]);

  return (
    <div className="raw-user-page">
      {rawUser && (
        <>
          <Home 
            rawUser={rawUser} 
            onClaimProfile={() => setShowSignupModal(true)} 
          />
          <InvestorCards />
          <div className="founder-section">
            <div className="heading">
              <h1>Meet the Visionary Behind It All</h1>
            </div>
            
            <div className="founder-content">
              <div className="founder-info">
                <div className="founder-img">
                  <img src={profile} alt="Pramod Badiger" />
                </div>
                <div className="founder-text">
                  <h1>Pramod Badiger</h1>
                  <h4>
                    <span>The Force Behind Capital Hub</span>
                  </h4>
                  <p>
                    With a decade of experience in guiding startups, Pramod Badiger,
                    Founder & CEO of Capital HUB, has a clear mission: to build India's
                    largest platform for startup founders and investors. Pramod is known
                    for combining structured processes with innovative strategies that
                    empower founders to take control of their growth journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />

      <Modal
        isOpen={showSignupModal}
        onRequestClose={() => setShowSignupModal(false)}
        className="signup-modal"
        overlayClassName="signup-modal-overlay"
      >
        <Register isRawUser={true} setShowSignupModal={setShowSignupModal} rawUser={rawUser} />
      </Modal>

      <Modal
        isOpen={paymentFlow.isModalOpen}
        onRequestClose={() => paymentFlow.setIsModalOpen(false)}
        className="subscription-modal"
        overlayClassName="subscription-modal-overlay"
      >
        {paymentFlow.renderSubscriptionModal()}
      </Modal>

      <Modal
        isOpen={paymentFlow.showOtpModal}
        onRequestClose={() => paymentFlow.setShowOtpModal(false)}
        className="otp-modal"
        overlayClassName="otp-modal-overlay"
      >
        {paymentFlow.renderOtpModal()}
      </Modal>

      {paymentFlow.isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p className="loader-text">Processing payment...</p>
        </div>
      )}
    </div>
  );
};

export default RawUserPage; 