import connection from "../../../Images/StartUp/icons/connection-user.png";
import messageIcon from "../../../Images/StartUp/icons/message.svg";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import "./OtherUserProfile.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { environment } from "../../../environments/environment";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
	getUserAndStartUpByUserIdAPI,
	sentConnectionRequest,
} from "../../../Service/user";
import CompanyDetailsCard from "../../../components/Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
import FeaturedPostsContainer from "../../../components/Investor/InvestorGlobalCards/MilestoneCard/FeaturedPostsContainer";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import AfterSuccessPopup from "../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
	selectTheme,
	setPageTitle,
} from "../../../Store/features/design/designSlice";
import SubcriptionPop from "../../../components/PopUp/SubscriptionPopUp/SubcriptionPop";
import BatchImag from "../../../Images/tick-mark.png";

import { selectUserCompanyData } from "../../../Store/features/user/userSlice";
import StartupsInvested from "../../../components/NewInvestor/ProfileComponents/StartupsInvested/StartupsInvested";

const token = localStorage.getItem("accessToken");

function OtherUserProfile() {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const dispatch = useDispatch();
	const userCompanyData = useSelector(selectUserCompanyData);
	const [userData, setUserData] = useState(null);
	const [popPayOpen, setPopPayOpen] = useState(false);
	const [connectionSent, setConnectionSent] = useState(false);
	const [showEmail, setShowEmail] = useState(false);
	const [email, setEmail] = useState("");
	const theme = useSelector(selectTheme);
	const [subscriptionAlert, setSubscriptionAlert] = useState(false);
	const { userId } = useParams();
	const navigate = useNavigate(); // Import and use useNavigate
	// console.log("environment", environment.baseUrl);

	useEffect(() => {
		window.title = "User Profile | The Capital Hub";
		dispatch(setPageTitle("User Profile"));
	}, [dispatch]);

	useEffect(() => {
		window.scrollTo(0, 0);
		getUserAndStartUpByUserIdAPI(userId)
			.then(({ data }) => setUserData(data))
			.catch((error) => console.error(error.message));
	}, [userId, connectionSent]);

	function formatNumber(value) {
		if (typeof value !== "number") return "NA";
		if (value >= 10000000) {
		  return (value / 10000000).toFixed(2) + " Crore";
		} else if (value >= 100000) {
		  return (value / 100000).toFixed(2) + " Lakh";
		} else if (value >= 1000) {
		  return (value / 1000).toFixed(2) + " K";
		}
		return value.toString();
	  }

	const handleConnect = (userId) => {
		if (canSendRequest()) {
			sentConnectionRequest(loggedInUser._id, userId)
				.then(({ data }) => {
					if (data?.message === "Connection Request Sent") {
						setConnectionSent(true);
						setTimeout(() => {
							setConnectionSent(false);
						}, 2500);
					}
				})
				.catch((error) => console.log(error));
		} else {
			console.log("User not subscribed");
			setPopPayOpen(true);
		}
	};

	const handleMessageButtonClick = () => {
		if (canSendRequest()) {
			console.log("Opening chat...");
			// Add your chat opening logic here
			navigate(`/chats?userId=${userData?._id}`);
		} else {
			console.log("User not subscribed");
			setPopPayOpen(true);
		}
	};

	const canSendRequest = () => {
		const trialPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
		const currentDate = new Date();
		const trialEndDate = new Date(
			new Date(loggedInUser?.trialStartDate).getTime() + trialPeriod
		);

		return (
			loggedInUser?.isSubscribed ||
			(loggedInUser?.trialStartDate && currentDate < trialEndDate)
		);
	};

	const fetchEmailfromServer = async (id) => {
		// console.log("fetching email from server");
		try {
			const response = await fetch(
				`${environment.baseUrl}/users/getUserEmail/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.text();
				try {
					const jsonData = JSON.parse(data);
					return {
						id,
						email: jsonData.email,
						investorIdCount: jsonData.investorIdCount,
					};
				} catch (error) {
					throw new Error("Invalid response type. Expected JSON.");
				}
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateUserToServer = async (id, investorId) => {
		try {
			// console.log("updating user to server");
			const response = await axios.patch(
				`${environment.baseUrl}/users/updateUserById/${id}`,
				{ investorId: investorId },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				console.log("User updated successfully", response.data.data);
				localStorage.setItem(
					"loggedInUser",
					JSON.stringify(response.data.data)
				);
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			if (error.response) {
				console.error("Response error:", error.response.data);
			} else if (error.request) {
				console.error("Request error:", error.request);
			} else {
				console.error("Error message:", error.message);
			}
		}
	};

	(function () {
		if (loggedInUser.isSubscribed) {
			fetchEmailfromServer(loggedInUser?._id).then((emailData) => {
				setEmail(emailData.email);
			});
		} else if (loggedInUser?.investorIdCount?.includes(userData?._id)) {
			fetchEmailfromServer(userData?._id).then((emailData) => {
				setEmail(emailData.email);
			});
		}
	})();

	const handleShowEmail = async () => {
		const data = await fetchEmailfromServer(loggedInUser?._id);
		console.log("investorArray", data.investorIdCount);
		console.log("Count", data.investorIdCount?.length);

		if (data?.investorIdCount?.includes(userData?._id)) {
			fetchEmailfromServer(userData?._id).then((emailData) => {
				setEmail(emailData.email);
			});
			setShowEmail(true);
		} else if (
			data?.investorIdCount?.length < 5 &&
			!data?.investorIdCount?.includes(userData?._id)
		) {
			updateUserToServer(loggedInUser?._id, userData._id);
			fetchEmailfromServer(userData?._id).then((emailData) => {
				setEmail(emailData.email);
			});
			setShowEmail(true);
		} else {
			// alert("Please subscribe to access this feature");
			setSubscriptionAlert(true);
		}
	};

	const recentInvestmentAmount =
    userCompanyData.revenue.length > 0
      ? userCompanyData.revenue[userCompanyData.revenue.length - 1].amount
      : "5";

	return (
		<>
			<MaxWidthWrapper>
				<section className="other_user_profile mx-lg-4 mx-xl-0">
					<SmallProfileCard className="mt-lg-2 mt-xl-0" text="User Details" />
					{userData ? (
						<>
							<div className="row profile rounded-4 border shadow-sm">
								<div className="short_details d-flex flex-column flex-md-row align-items-center justify-content-between">
									<div className="d-flex flex-column w-100 flex-md-row align-items-center justify-content-between ">
										<img
											src={userData.profilePicture}
											width={100}
											height={100}
											alt="profileimage"
											className="rounded-circle"
											style={{ objectFit: "cover" }}
										/>
										<div className="flex-grow-1 left_profile_text mt-2 mt-md-0 me-auto me-md-0 ms-md-4">
											<h3 className="typography h3">
												{userData?.firstName} {userData?.lastName}
												{userData.isSubscribed && (
													<img
														src={BatchImag}
														style={{
															width: "1.2rem",
															height: "1.2rem",
															objectFit: "contain",
														}}
														alt="Batch Icon"
													/>
												)}
											</h3>
											<span className="small_typo">
												{userData?.designation ||
													"Founder & CEO of The Capital Hub"}
											</span>
											<br />
											<span className="small_typo">
												{userData?.location || "Bangalore , India"}
											</span>
										</div>
									</div>

									{/* uncomment below when you want to show message and request button  */}
									{/* {loggedInUser._id !== userData?._id && (
                    <div className="buttons d-flex gap-2 flex-row align-items-md-center">
                      <button
                        onClick={handleMessageButtonClick}
                        className="message btn rounded-pill px-3 py-2"
                      >
                        <img src={messageIcon} width={20} alt="message user" />
                        <span>Message</span>
                      </button>
                      {userData?.connections?.includes(loggedInUser._id) ? (
                        <button className="connection-status  btn rounded-pill px-3 py-2">
                          <span>Connected</span>
                        </button>
                      ) : userData?.connectionsReceived?.includes(
                          loggedInUser._id
                        ) ? (
                        <button className=" connection-status d-flex btn rounded-pill px-3 py-2">
                          <img src={connection} width={20} alt="message user" />
                          <span>Pending</span>
                        </button>
                      ) : (
                        <button className="connection-status d-flex  btn rounded-pill px-3 py-2" onClick={() => handleConnect(userData?._id)}>
                          <img src={connection} width={20} alt="message user" />
                          <span>
                            Connect
                          </span>
                        </button>
                      )}
                    </div>
                  )} */}
								</div>
								<div className="details">
									<div className="single_details row row-cols-1 row-cols-md-2 ">
										{userData?.startUp?.company ||
										userCompanyData?.companyName ? (
											<>
												<span className="col-md-3 label fw-bold">
													Current Company
												</span>
												<span className="col-md-9 value">
													{userData?.startUp?.company ||
														userCompanyData.companyName}
												</span>
											</>
										) : null}
									</div>

									<div className="single_details row row-cols-1 row-cols-md-2 ">
										{userData?.designation ? (
											<>
												<span className="col-md-3 label fw-bold">
													Designation
												</span>
												<span className="col-md-9 value">
													{userData?.designation}
												</span>
											</>
										) : null}
									</div>

									<div className="single_details row row-cols-1 row-cols-md-2 ">
										{userData?.education ? (
											<>
												<span className="col-md-3 label fw-bold">
													Education
												</span>
												<span className="col-md-9 value">
													{userData?.education}
												</span>
											</>
										) : null}
									</div>

									<div className="single_details row row-cols-1 row-cols-md-2 ">
										{userData?.experience ? (
											<>
												<span className="col-md-3 label fw-bold">
													Experience
												</span>
												<span className="col-md-9 value">
													{userData?.experience}
												</span>
											</>
										) : null}
									</div>
								</div>
							</div>
							{loggedInUser?.isSubscribed ||
							loggedInUser?.investorIdCount?.includes(userData?._id) ? (
								<div
									className="email rounded-4 border shadow-sm flex flex-col gap-2 w-full"
									style={{ background: "var(--white-to-grey)" }}
								>
									<>
										<h4 className="label">Email</h4>
										<div className="email-show-btn flex flex-row gap-2 ">
											<h6 className="email_value">{email}</h6>
										</div>
									</>
								</div>
							) : (
								<div
									className="email rounded-4 border shadow-sm flex flex-col gap-2 w-full"
									style={{ background: "var(--white-to-grey)" }}
								>
									<>
										<h4 className="label">Email</h4>

										<div className="email-show-btn flex flex-row gap-2 ">
											{showEmail ? (
												<h6 className="email_value">{email}</h6>
											) : (
												<h6 className="email_value">********@*****.com</h6>
											)}
											{!showEmail && (
												<button
													className="show-email-btn"
													onClick={handleShowEmail}
												>
													Show Email
												</button>
											)}
										</div>
									</>
								</div>
							)}
							<div
  style={{
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  <div
    style={{
      background: theme === "dark" ? "#22262c" : "#f5f5f5",
      padding: "10px",
      borderRadius: "0.37rem",
      maxWidth: "25rem",
      width: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid rgba(211, 243, 107, 1)",
        marginBottom: "5px",
      }}
    >
      <p
        className="typography"
        style={{
          fontWeight: "bold",
          fontSize: "12px",
          marginBottom: "5px",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        Recent Investment
      </p>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p
        style={{
          color: theme === "dark" ? "#fff" : "#000",
          marginBottom: "0",
        }}
      >
        {recentInvestmentAmount !== "NA"
          ? formatNumber(recentInvestmentAmount)
          : "NA"}
      </p>
    </div>
  </div>
  
  <div
    style={{
      background: theme === "dark" ? "#22262c" : "#f5f5f5",
      padding: "10px",
      borderRadius: "0.37rem",
      maxWidth: "25rem",
      width: "100%",
      margin: "0 5px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid rgba(211, 243, 107, 1)",
        marginBottom: "5px",
      }}
    >
      <p
        className="typography"
        style={{
          fontWeight: "bold",
          fontSize: "12px",
          marginBottom: "5px",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        Average Recent Investments
      </p>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <p
        style={{
          color: theme === "dark" ? "#fff" : "#000",
          marginBottom: "0",
        }}
      >
        {userCompanyData.investmentRange || "10 lakhs"}
      </p>
    </div>
  </div>

  <div
    style={{
      background: theme === "dark" ? "#22262c" : "#f5f5f5",
      padding: "10px",
      borderRadius: "0.37rem",
      maxWidth: "25rem",
      width: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px solid rgba(211, 243, 107, 1)",
        marginBottom: "5px",
      }}
    >
      <p
        className="typography"
        style={{
          fontWeight: "bold",
          fontSize: "12px",
          marginBottom: "5px",
          color: theme === "dark" ? "#fff" : "#000",
        }}
      >
        Avg Age of Startup
      </p>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p
        style={{
          color: theme === "dark" ? "#fff" : "#000",
          marginBottom: "0",
        }}
      >
        {userCompanyData.age ? `Age ${userCompanyData.age}` : "5"}
      </p>
    </div>
  </div>
</div>

							<div className="row row-cols-auto row-cols-lg-2 g-0 gx-md-4 two_column_wrapper mb-4">
								<div className="left_container p-0 pe-md-auto d-flex flex-column gap-3 col-12 col-lg-8">
									{userData?.bio ? (
										<div className="bio rounded-4 border shadow-sm profile_container">
											<h4 className="h4">Bio</h4>
											<div className="single_education">
												<h6 className="h6">{userData?.bio}</h6>
											</div>
										</div>
									) : (
										""
									)}
											{userData?.investmentPhilosophy ? (
										<div className="bio rounded-4 border shadow-sm profile_container">
											<h4 className="h4">Investment Philosophy</h4>
											<div className="single_education">
												<h6 className="h6">{userData?.investmentPhilosophy}</h6>
											</div>
										</div>
									) : (
										""
									)}
									{/* <div className="featured_post border rounded-4 shadow-sm d-flex flex-column gap-3 p-4">
                    <div className="d-flex justify-content-between">
                      <h4>Featured Posts</h4>
                    </div>
                    <FeaturedPostsContainer userId={userId} />
                  </div> */}
									<div className="company_details_container shadow-sm rounded-4">
										<CompanyDetailsCard
											className="company_details rounded-4 border profile_container"
											userDetails={userData}
											theme="startup"
										/>
										<br></br>
										<StartupsInvested cannotAdd={true} />
									</div>
								</div>
								<div className="right_container p-0">
									<RecommendationCard />
									<NewsCorner />
								</div>
							</div>
						</>
					) : (
						<h4
							className="h4 w-100 my-5 text-center"
							style={{ minHeight: "90vh" }}
						>
							<div className="d-flex justify-content-center">
								<div className="spinner-border" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
							</div>
						</h4>
					)}
					{connectionSent && (
						<AfterSuccessPopup
							withoutOkButton
							onClose={() => setConnectionSent(!connectionSent)}
							successText="Connection Sent Successfully"
						/>
					)}
				</section>
			</MaxWidthWrapper>
			{popPayOpen && (
				<SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen} />
			)}
			{subscriptionAlert && (
				<SubcriptionPop
					popPayOpen={subscriptionAlert}
					setPopPayOpen={setSubscriptionAlert}
				/>
			)}
		</>
	);
}

export default OtherUserProfile;
