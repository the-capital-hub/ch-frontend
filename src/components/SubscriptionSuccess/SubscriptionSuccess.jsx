import React, { useEffect, useState } from "react";
import "./subscriptionSuccess.scss";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { getSubscriptionUrl } from "../../Service/user";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../Store/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SubscriptionSuccess = () => {
  const [popPaySuccessOpen, setPopPaySuccessOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({});
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  // Get the order_id from the query parameters
  const query = useQuery();
  const orderId = query.get("order_id");
  useEffect(() => {
    const getPaymentStatus = async () => {
      try {
        const response = await getSubscriptionUrl(orderId);
        dispatch(loginSuccess(response.user));
        setPaymentData(response?.paymentData);
        setUserName(`${response?.user.fistName} ${response?.user.lastName}`);
        setPaymentStatus(response.paymentData.payment_status);
      } catch (err) {
        throw err;
      }
    };
    getPaymentStatus();
  }, []);
  const handleCloseBar = () => {
    try {
      loggedInUser.isInvestor === "true"
        ? navigate("/investor/home")
        : navigate("/home");
    } catch (err) {
      console.log();
    }
  };

  function formatDateTime(dateTimeString) {
    // Create a new Date object from the ISO string
    const date = new Date(dateTimeString);

    // Extract the date components
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Extract the time components
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date and time in the desired format
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `${formattedDate}, ${formattedTime}`;
  }
  return (
    <>
      {popPaySuccessOpen && (
        <div className="subscriber-background-overlay"></div>
      )}
      <div
        className={`payment_post_modal rounded-4 p-md-2 ${
          popPaySuccessOpen ? "d-block" : ""
        }`}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="subscriber_modal-header w-80">
              <div className="createpostpopup"></div>
              <button
                type="button"
                className="closebar d-flex justify-content-end"
                onClick={handleCloseBar}
                style={{ background: "transparent", border: "none" }}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="payment_success_plans">
                {/* test  */}

                <div className="payment-success">
                  <div className="icon-container">
                    {paymentStatus === "SUCCESS" ? (
                      <FaCheckCircle className="icon" />
                    ) : (
                      <MdCancel className="icon fail" />
                    )}
                  </div>
                  <h2 className="headSuccess">Payment {paymentStatus}!</h2>
                  {paymentStatus === "SUCCESS" ? (
                    <p>Your payment has been successfully done.</p>
                  ) : (
                    <p>Your payment has been failed</p>
                  )}
                  <hr />
                  <div className="detail-total">
                    <span>Total Payment</span>
                    <br />
                    <strong>₹ {paymentData?.payment_amount}</strong>
                  </div>
                  <div className="payment-details">
                    <div className="detail-item">
                      <div className="detail-head">
                        <span>Ref Number</span>
                      </div>
                      <div className="detail-value">
                        <strong>{paymentData.cf_payment_id}</strong>
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-head">
                        <span>Payment Time</span>
                      </div>
                      <div className="detail-value">
                        <strong>
                          {formatDateTime(paymentData?.payment_completion_time)}
                        </strong>
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-head">
                        <span>Payment Method</span>
                      </div>
                      <div
                        className="detail-value"
                        style={{ textTransform: "capitalize" }}
                      >
                        <strong>
                          {paymentData?.payment_group?.split("_").join(" ")}
                        </strong>
                      </div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-head">
                        <span>Sender Name</span>
                      </div>
                      <div className="detail-value">
                        <strong>{userName}</strong>
                      </div>
                    </div>
                  </div>

                  <button className="pdf-button">
                    <AiOutlineCloudDownload size={"1.8rem"} /> Get PDF Receipt
                  </button>
                </div>

                {/* test ends  */}
              </div>
            </div>
            <button onClick={handleCloseBar} className="done_button">
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionSuccess;
