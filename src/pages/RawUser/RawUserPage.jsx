import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { getRawUserById } from "../../Service/user";
import Register from "../../components/Register/Register";
import "./rawUser.scss";
import { usePaymentFlow } from "../../hooks/usePaymentFlow";
import profile from "../StartUp/SalesLandingPage/COMPONENTS/images/profile.png";
import NotFound404 from "../Error/NotFound404/NotFound404";

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
          <div className="hero-section">
            <div className="user-info">
              <div className="profile-image">
                <img 
                  src={rawUser.profilePicture} 
                  alt={`${rawUser.firstName} ${rawUser.lastName}`} 
                />
              </div>
              <h1>{`${rawUser.firstName} ${rawUser.lastName}`}</h1>
              <button 
                className="claim-profile-btn"
                onClick={() => setShowSignupModal(true)}
              >
                Claim Profile
              </button>
            </div>
          </div>

          <div className="platform-info">
            <h2>Join The Capital Hub Community</h2>
            <div className="features">
              <div className="feature">
                <h3>Connect with Investors</h3>
                <p>Access our network of verified investors and raise funds for your startup.</p>
              </div>
              <div className="feature">
                <h3>Grow Your Network</h3>
                <p>Connect with other founders and expand your professional network.</p>
              </div>
              <div className="feature">
                <h3>Access Resources</h3>
                <p>Get exclusive access to startup resources and mentorship.</p>
              </div>
            </div>
          </div>

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

              <div className="pricing">
                <div className="pricing-details">
                  <h3>Unlock Premium Resources</h3>
                  <h4>
                    INR <span>1,999</span>
                  </h4>
                  <button onClick={() => paymentFlow.setIsModalOpen(true)}>Get Premium</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

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