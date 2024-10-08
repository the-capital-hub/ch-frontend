import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { MdCurrencyRupee } from "react-icons/md";
import { FaStar } from "react-icons/fa"; // Import the star icon
import bg from "../images/Polygon 12.png";
import dot from "../images/Ellipse 9.png";
import blurdot from "../images/Ellipse 12.png";
import small from "../images/Ellipse 20.png";
import "./pricing.scss";
import { subscription } from "./data";
import { useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js"; // Ensure this import exists and points to the Cashfree library
import { subscribe } from "../../../../../Service/user";

const Pricing = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  let cashfree;

  const initializeSDK = async () => {
    cashfree = await load({
      mode: "sandbox",
    });
  };

  useEffect(() => {
    initializeSDK();
  }, []);

  const handlePurchase = async (item) => {
    try {
      const res = await subscribe(item);
      console.log(res);
      // if (res) {
      //   setOrderId(res.order_id);
      //   let checkOutOptions = {
      //     paymentSessionId: res.payment_session_id,
      //     redirectTarget: "_self", // Open in a new tab
      //   };
      //   cashfree
      //     .checkout(checkOutOptions)
      //     .then(() => {
      //       console.log("Payment Success");
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const getColorBySubscriptionType = (type) => {
    switch (type) {
      case "Basic":
        return "white";
      case "Pro":
        return "gold";
      case "Standard":
        return "#adff2f";
      default:
        return "white";
    }
  };

  return (
    <div className="pricing-container">
      <div className="heading">
        <h1>Simple and Affordable</h1>
        <h1>Pricing Plans</h1>
      </div>

      <img src={dot} alt="dot1" className="background-img dot1" />
      <img src={small} alt="small" className="background-img small" />
      <img src={dot} alt="dot2" className="background-img dot2" />
      <img src={blurdot} alt="blur-dot1" className="background-img blur-dot1" />
      <img src={blurdot} alt="blur-dot2" className="background-img blur-dot2" />
      <img src={blurdot} alt="blur-dot3" className="background-img blur-dot3" />
      <img src={bg} alt="background" className="background-img bg" />

      <div className="sub-plans">
        {subscription.map((item, index) => (
          <div className={`plan ${item.subscriptionType.toLowerCase()}`} key={index}>
            <div>
              <h1 className="plan-title" style={{ color: getColorBySubscriptionType(item.subscriptionType) }}>
                {item.subscriptionType}
                {item.subscriptionType !== "Basic" && (
                  <FaStar style={{ marginLeft: "10px", color: getColorBySubscriptionType(item.subscriptionType) }} />
                )}
              </h1>
              <div className="price">
                <MdCurrencyRupee className="currency-icon" />
                <h1>
                  {item.price}
                  <span className="price-unit">/year </span>
                </h1>
              </div>
              <p className="sub-description">{item.description}</p>
              <div className="features">
                <hr />
                <h1>Features</h1>
                <hr />
              </div>
              <div className="feature-list">
                {item.features.map((i, j) => (
                  <div className="feature-item" key={j}>
                    <div className="icon">
                      <TiTick style={{ color: getColorBySubscriptionType(item.subscriptionType) }} />
                    </div>
                    <p style={{ width: "100%", textAlign: "left" }}>{i}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="purchase-button"
              onClick={() => handlePurchase(item)}
            >
              {item.subscriptionType === "Basic" ? "Join for Free!" : "Purchase Now"}
            </button>
          </div>
        ))}
      </div>

      <button className="join-button" onClick={() => navigate("/signup")}>
        GET ACCESS TO OUR PREMIUM FEATURES NOW!
      </button>
    </div>
  );
};

export default Pricing;
