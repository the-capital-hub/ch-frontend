import React, { useState, useEffect } from "react";
import "./subscriptionPop.scss";
import { CiCircleCheck } from "react-icons/ci";
import { IoSparkles } from "react-icons/io5";
import { subscribe, updateTrialStartDate } from "../../../Service/user"; // Correct import
import { useNavigate } from "react-router-dom";
import { subscription, contactPrice } from "./data";
import { load } from "@cashfreepayments/cashfree-js";
import { useSelector, useDispatch } from "react-redux";

const SubcriptionPop = ({ popPayOpen, setPopPayOpen }) => {
	const [orderId, setOrderId] = useState("");
	const [showFreePlanModal, setShowFreePlanModal] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	let cashfree;

	useEffect(() => {
		const insitialzeSDK = async () => {
			cashfree = await load({ mode: "production" });
		};
		insitialzeSDK();
	}, []);

	useEffect(() => {
		if (showFreePlanModal) {
			const timer = setTimeout(() => {
				setShowFreePlanModal(false);
				navigate("/");
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [showFreePlanModal, navigate]);

	const handleCloseBar = () => {
		setPopPayOpen(false);
	};

	const handlePurchase = async (item) => {
		try {
			if (item.subscriptionType === "Basic") {
				if (loggedInUser.trialStartDate) {
					console.log("Trial already done");
					alert("Trial already taken");
				} else {
					const res = await subscribe({ subscriptionType: "Basic" });
					if (res.message === "Trial started") {
						const currentDate = new Date();
						dispatch({
							type: "user/updateTrialStartDate",
							payload: currentDate,
						});
						setPopPayOpen(false);
						setShowFreePlanModal(true);
					}
				}
			} else {
				const res = await subscribe(item);
				if (res) {
					setOrderId(res.order_id);
					let checkOutOptions = {
						paymentSessionId: res.payment_session_id,
						redirectTrarget: "_modal",
					};
					cashfree
						.checkout(checkOutOptions)
						.then(() => {
							console.log("Payment Success");
						})
						.catch((error) => {
							console.log(error);
						});
				}
			}
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
      case "Pro Basic":
        return "gold";
			default:
				return "white";
		}
	};

	return (
		<>
			{popPayOpen && (
				<div
					className="subscriber-background-overlay"
					onClick={() => setPopPayOpen(false)}
				></div>
			)}
			<div
				className={`subscriber_post_modal rounded-4 p-md-2 ${
					popPayOpen ? "d-block" : ""
				}`}
				tabIndex="-1"
				role="dialog"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="subscriber_modal-header w-80">
							<div className="createpostpopup">
								<div className="subscription_head">
									<span>
										<h2 style={{ border: "none" }}>
											Simple and Affordable <br /> Pricing Plans
										</h2>
										{/* <h6>
											Choose your subscription plan that’s suits you and your
											business best.
										</h6> */}
									</span>
								</div>
							</div>
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
							<div className="pricing_plans">
								{contactPrice
									.filter((item) => item.subscriptionType !== "Standard")
									.map((item, index) => (
										<div
											className="plan"
											key={index}
											style={{
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
												border:
													item.subscriptionType === "Pro"
														? "2px solid gold"
														: "none",
											}}
										>
											<div>
												<h3
													className="headingContent"
													style={{
														color: getColorBySubscriptionType(
															item.subscriptionType
														),
													}}
												>
													{item.subscriptionType}
													{item.subscriptionType !== "Basic" && (
														<IoSparkles
															style={{
																marginLeft: "10px",
																color: getColorBySubscriptionType(
																	item.subscriptionType
																),
															}}
														/>
													)}
												</h3>
												<p className="price">
													₹{item.price} <span>/year</span>
													{/* <span>1999/year</span> */}
												</p>
												<p
													className="description"
													style={{
														border: "none",
														marginBottom: 0,
														fontSize: "12px",
													}}
												>
													{item.description}
												</p>
											</div>
											<hr />
											<div className="features" style={{ height: "70%" }}>
												{item.features.map((i, j) => (
													<p
														key={j}
														style={{ marginBottom: 0, fontSize: "13px" }}
													>
														<CiCircleCheck
															color={getColorBySubscriptionType(
																item.subscriptionType
															)}
														/>{" "}
														{i}
													</p>
												))}
											</div>
											<button
												className="purchase_button"
												onClick={() => handlePurchase(item)}
											>
												{item.subscriptionType === "Basic"
													? "Join for Free!"
													: "Purchase Now"}
											</button>
										</div>
									))}
							</div>
							{/* <button className="upgrade_button">Upgrade Now</button> */}
						</div>
					</div>
				</div>
			</div>

			{showFreePlanModal && (
				<div className="free-plan-modal">
					<div className="free-plan-modal-content">
						Subscribed for Free Plan
					</div>
				</div>
			)}
		</>
	);
};

export default SubcriptionPop;
