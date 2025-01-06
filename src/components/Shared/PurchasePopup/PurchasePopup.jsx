import React, { useState, useEffect } from "react";
import "./PurchasePopup.scss";

const PurchasePopup = ({
  isOpen,
  onClose,
  itemDetails,
  onProceed,
}) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      userDetails.name.trim() !== "" &&
      userDetails.email.trim() !== "" &&
      /^[0-9]{10}$/.test(userDetails.mobile);

    setIsFormValid(isValid);
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProceed(userDetails);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="purchase-modal-overlay">
      <div className="purchase-modal-content">
        <div className="modal-header">
          <h2>{itemDetails.type === 'community' ? 'Join Community' : 'Purchase Product'}</h2>
          <p>
            Please fill these details for purchase confirmation and further
            communication.
          </p>
        </div>

        <div className="item-details-card">
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{itemDetails.name}</span>
            </div>

            {itemDetails.description && (
              <div className="detail-item">
                <span className="label">Description:</span>
                <span className="value">{itemDetails.description}</span>
              </div>
            )}

            {itemDetails.type === 'community' && (
              <>
                <div className="detail-item">
                  <span className="label">Members:</span>
                  <span className="value">{itemDetails.memberCount || 0}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Type:</span>
                  <span className="value">{itemDetails.isOpen ? 'Open Community' : 'Closed Community'}</span>
                </div>
              </>
            )}

            {itemDetails.type === 'product' && (
              <>
                <div className="detail-item">
                  <span className="label">Resources:</span>
                  <span className="value">{itemDetails.resourceCount || 0} files</span>
                </div>
                <div className="detail-item">
                  <span className="label">Access:</span>
                  <span className="value">Lifetime</span>
                </div>
              </>
            )}

            <div className="detail-item">
              <span className="label">Price:</span>
              <span className="value">
                {itemDetails.is_free ? (
                  'Free'
                ) : (
                  `₹${itemDetails.amount}`
                )}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={userDetails.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              placeholder="Enter your mobile number"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={`proceed-btn ${!isFormValid ? "disabled" : ""}`}
              disabled={!isFormValid}
            >
              {itemDetails.is_free ? 'Join Now' : 'Proceed to Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchasePopup; 