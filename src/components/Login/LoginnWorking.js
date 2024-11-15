import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import RegisterIcon from "../../Images/Group 21.svg";
import GIcon from "../../Images/Group 22.svg";
// import FIcon from "../../Images/Group 23.svg";
// import AIcon from "../../Images/Group 24.svg";
import otpBanner from "../../Images/otpBanner.png";
import { RiCloseLine as X } from "react-icons/ri";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import {
	googleLoginAPI,
	postResetPaswordLink,
	postUserLogin,
	sendOTP,
	// verifyOTP,
} from "../../Service/user";
import AfterSuccessPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import InvestorAfterSuccessPopUp from "../PopUp/InvestorAfterSuccessPopUp/InvestorAfterSuccessPopUp";
import ErrorPopUp from "../PopUp/ErrorPopUp/ErrorPopUp";
import { useDispatch, useSelector } from "react-redux";
// import { loginSuccess, loginFailure } from "../../Store/Action/userAction";
import {
	loginSuccess,
	// loginFailure,
} from "../../Store/features/user/userSlice";
import backArrow from "../../Images/left-arrow.png";
// import ResetPasswordPopUp from "../PopUp/RequestPasswordPopUp/RequestPasswordPopUp";
// import { Navigate } from "react-router-dom";
import SpinnerBS from "../Shared/Spinner/SpinnerBS";
import { selectIsMobileApp } from "../../Store/features/design/designSlice";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
// import { Form } from "react-bootstrap";
import { fetchCompanyData } from "../../Store/features/user/userThunks";
import { fetchAllChats } from "../../Store/features/chat/chatThunks";

// imports fro implementing login with google
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import LinkedInLogin from "./LinkedinLogin/LinkedInLogin";

function OtpVerificationModal({
	isOpen,
	setOpen,
	setShow,
	onClose,
	onVerify,
	inputValues,
	setOrderId,
}) {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);

	useEffect(() => {
		if (isOpen && inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, [isOpen]);

	const handleChange = (index, value) => {
		if (isNaN(value)) return;
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		if (value !== "" && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && index > 0 && otp[index] === "") {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleVerify = () => {
		onVerify(otp.join(""));
	};

	if (!isOpen) return null;
	const handleOtpChange = async () => {
		try {
			const response = await sendOTP(inputValues.phoneNumber);
			setOrderId(response?.orderId);
			setOpen(true);
			setShow(true);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="OtpVerificationModal_container">
			<div
				className="OtpVerificationModal_main_container bg-white rounded-lg shadow-xl p-6  relative flex md:flex-row flex-col"
				style={{ width: "700px" }}
			>
				<div style={{ width: "90%" }}>
					<button onClick={onClose} className="Modal_Close_btn">
						<X size={30} />
					</button>
					<h2 className="enter_verification_code">Enter verification code</h2>
					<p className="Otp_Sent_Msg">
						We have just sent a verification code to your mobile number.
					</p>
					<div
						// className="flex justify-between mb-6"
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "1.5rem",
						}}
					>
						{otp.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength="1"
								className="OTP_Input"
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
							/>
						))}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							marginBottom: "1.5rem",
							fontSize: "14px",
							lineHeight: "20px",
						}}
					>
						<button onClick={handleOtpChange} className="Send_OTP_btn">
							Send the code again
						</button>
						<button onClick={onClose} className="Change_Number_btn">
							Change phone number
						</button>
					</div>
					<button onClick={handleVerify} className="Modal_Verify_btn active">
						Verify
					</button>
				</div>
				<img
					src={otpBanner}
					alt="Verification illustration"
					width={300}
					height={300}
					className="hidden md:block"
				/>
			</div>
		</div>
	);
}

const Login = () => {
	// const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const isMobileApp = useSelector(selectIsMobileApp);

	// States for login
	const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(false);
	const [isInvestorSelected, setIsInvestorSelected] = useState(false);
	const [error, setError] = useState(null);
	const [show, setShow] = useState(false);
	const [orderId, setOrderId] = useState("");
	const userVisitCount = localStorage.getItem("userVisit");
	const [isMobileLogin, setIsMobileLogin] = useState(true);
	const otpInputRefs = useRef([]);
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [showResetPopUp, setShowResetPopUp] = useState(false);
	const [inputValues, setInputValues] = useState({
		password: "",
		usernameOrEmail: "",
		phoneNumber: "",
	});
	const [staySignedIn, setStaySignedIn] = useState(false);

	// useEffect(() => {
	// 	const params = new URLSearchParams(window.location.search);
	// 	const code = params.get("code");

	// 	if (code) {
	// 		// Exchange the authorization code for tokens
	// 		exchangeCodeForTokens(code);
	// 	}
	// }, []);

	// const exchangeCodeForTokens = async (code) => {
	// 	try {
	// 		const response = await fetch("https://oauth2.googleapis.com/token", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/x-www-form-urlencoded",
	// 			},
	// 			body: new URLSearchParams({
	// 				code: code,
	// 				client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
	// 				client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
	// 				redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
	// 				grant_type: "authorization_code",
	// 			}),
	// 		});

	// 		const data = await response.json();
	// 		if (response.ok) {
	// 			console.log("Access Token:", data.access_token);
	// 			console.log("Refresh Token:", data.refresh_token);
	// 			// Store tokens securely (e.g., in local storage or state)
	// 		} else {
	// 			console.error("Error exchanging code for tokens:", data);
	// 		}
	// 	} catch (error) {
	// 		console.error("Error during token exchange:", error);
	// 	}
	// };

	const handleCheckboxChange = () => {
		setStaySignedIn(!staySignedIn);
	};

	const isValidMobileNumber = (phoneNumber) => {
		// Remove any non-digit characters from the input
		const cleanedNumber = phoneNumber.replace(/\D/g, "");

		// Check if the cleaned number starts with the country code for India (+91) and has 10 digits
		return /^91\d{10}$/.test(cleanedNumber);
	};

	// Handle Input change
	const handleInputChange = (event, type) => {
		if (type !== "country" && type !== "state" && type !== "phoneNumber") {
			const { name, value } = event.target;
			setInputValues({ ...inputValues, [name]: value });
		} else if (type === "country") {
			setInputValues({ ...inputValues, country: event });
		} else if (type === "state") {
			setInputValues({ ...inputValues, state: event });
		} else if (type === "phoneNumber") {
			setInputValues({ ...inputValues, phoneNumber: event });
		}
	};

	const toggleLoginMethod = () => {
		setIsMobileLogin(!isMobileLogin);
		setShow(false);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		if (isMobileLogin && !isValidMobileNumber(inputValues.phoneNumber)) {
			setShowErrorPopup(true);
			setTimeout(() => {
				setShowErrorPopup(false);
			}, 2000);

			return;
		}
		try {
			if (isMobileLogin) {
				if (isValidMobileNumber(inputValues.phoneNumber)) {
					// Implement your mobile number verification logic here
					if (
						inputValues.phoneNumber === "" ||
						inputValues.phoneNumber.length < 10
					)
						return;
					const res = await sendOTP(inputValues.phoneNumber);
					setOrderId(res?.orderId);
					setOpen(true);
					setShow(true);
				} else {
					// Handle invalid phone number scenario
					console.log("Invalid phone number");
				}
			} else {
				const response = await postUserLogin({
					phoneNumber: inputValues.usernameOrEmail,
					password: inputValues.password,
				});
				const user = response.user;
				const token = response.token;
				if (!userVisitCount) {
					localStorage.setItem("userVisit", 1);
				} else {
					localStorage.setItem("userVisit", 2);
				}
				localStorage.setItem("accessToken", token);
				localStorage.setItem("isLoggedIn", "true");
				if (response) {
					if (!isInvestorSelected && user.isInvestor === "true") {
						setError("Invalid credentials");
						return;
					}
					if (isInvestorSelected && user.isInvestor === "false") {
						setError("Invalid credentials");
						return;
					}

					const storedAccountsKey =
						user.isInvestor === "true" ? "InvestorAccounts" : "StartupAccounts";
					const storedAccounts =
						JSON.parse(localStorage.getItem(storedAccountsKey)) || [];
					const isAccountExists = storedAccounts.some(
						(account) => account.user?._id === user?._id
					);

					if (!isAccountExists) {
						storedAccounts.push(response);
						localStorage.setItem(
							storedAccountsKey,
							JSON.stringify(storedAccounts)
						);
					}

					setIsLoginSuccessfull(true);

					setTimeout(() => {
						setIsInvestorSelected(false);
						setIsLoginSuccessfull(false);

						if (!user.investor) navigate("/home");
						else navigate("/investor/home");
					}, 2000);

					dispatch(loginSuccess(response?.user));

					let isInvestor = response?.user?.isInvestor === "true" ? true : false;
					if (isInvestor) {
						dispatch(fetchCompanyData(response?.user?.investor, isInvestor));
					} else {
						dispatch(fetchCompanyData(response?.user?._id, isInvestor));
					}

					dispatch(fetchAllChats());
				}
			}
		} catch (error) {
			console.log(error);
			//setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const ValidateOtp = async () => {
		setLoading(true);
		try {
			// const verificationCode = otp.join(""); // Join the array elements into a string
			// const res = await verifyOTP({
			//   otp: verificationCode,
			//   orderId,
			//   phoneNumber: inputValues.phoneNumber,
			// });
			// if (res.isOTPVerified) {
			setLoading(true);
			const response = await postUserLogin(inputValues);
			const user = response.user;
			const token = response.token;
			if (!userVisitCount) {
				localStorage.setItem("userVisit", 1);
			} else {
				localStorage.setItem("userVisit", 2);
			}
			localStorage.setItem("accessToken", token);
			localStorage.setItem("isLoggedIn", "true");
			if (response) {
				if (!isInvestorSelected && user.isInvestor === "true") {
					setError("Invalid credentials");
					return;
				}
				if (isInvestorSelected && user.isInvestor === "false") {
					setError("Invalid credentials");
					return;
				}

				const storedAccountsKey =
					user.isInvestor === "true" ? "InvestorAccounts" : "StartupAccounts";

				const storedAccounts =
					JSON.parse(localStorage.getItem(storedAccountsKey)) || [];
				const isAccountExists = storedAccounts.some(
					(account) => account?.user?._id === user?._id
				);

				if (!isAccountExists) {
					storedAccounts.push(response);
					localStorage.setItem(
						storedAccountsKey,
						JSON.stringify(storedAccounts)
					);
				}

				setIsLoginSuccessfull(true);

				setTimeout(() => {
					setIsInvestorSelected(false);
					setIsLoginSuccessfull(false);

					if (!user.investor) navigate("/home");
					else navigate("/investor/home");
				}, 2000);

				dispatch(loginSuccess(response.user));
				let isInvestor = response.user.isInvestor === "true" ? true : false;
				if (isInvestor) {
					dispatch(fetchCompanyData(response.user.investor, isInvestor));
				} else {
					dispatch(fetchCompanyData(response.user._id, isInvestor));
				}

				dispatch(fetchAllChats());
			}
			//}
		} catch (error) {
			console.log(error);
			console.error("Login failed:", error.response.data.message);
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const handleClosePopup = () => {
		if (!isInvestorSelected) {
			navigate("/home");
		} else if (isInvestorSelected) {
			navigate("/investor/home");
		}
	};

	// const handleCloseResetPopup = () => {
	//   setShowResetPopUp(false);
	//   navigate("/login");
	// };

	useEffect(() => {
		document.title = "Log In | The Capital Hub";
	}, []);

	const handleOtpChange = (event, index) => {
		const value = event.target.value;
		const updatedOtp = [...otp];
		updatedOtp[index] = value;
		setOtp(updatedOtp);
		if (value !== "" && index < otp.length - 1) {
			otpInputRefs.current[index + 1].focus();
		}
	};

	const handleOtpKeyDown = (event, index) => {
		if (event.key === "Backspace" && index > 0 && otp[index] === "") {
			const updatedOtp = [...otp];
			updatedOtp[index - 1] = "";
			setOtp(updatedOtp);
			otpInputRefs.current[index - 1].focus();
		}
	};

	const restPassword = async () => {
		try {
			const response = await postResetPaswordLink(inputValues);
			if (response.status === "200") {
				console.log("response1", response);

				setLoading(true);
				setShowResetPopUp(false);
				setInputValues();
			} else {
				alert("Something went wrong while sending Email");
			}
		} catch (error) {
			console.log(error);
			console.error("Login failed:", error.response.data.message);
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Function to validate password for spaces
	const validatePassword = (password) => {
		return !/\s/.test(password);
	};

	const handleGoogleLoginSuccess = (credentialResponse) => {
		// console.log("Google Sign-In successful. Credential:", credentialResponse);
		googleLoginAPI(credentialResponse.credential).then((response) => {
			if (response.status === 200) {
				// console.log("Google Sign-In successful. Response:", response);
				// Redirect to the desired page
				// const isInvestorSelected = false;
				const user = response.user;
				const token = response.token;
				if (!userVisitCount) {
					localStorage.setItem("userVisit", 1);
				} else {
					localStorage.setItem("userVisit", 2);
				}
				localStorage.setItem("accessToken", token);
				localStorage.setItem("isLoggedIn", "true");
				if (response) {
					// console.log("response", response);
					if (!isInvestorSelected && response.user.isInvestor === "true") {
						setError("Invalid credentials");
						return;
					}
					if (isInvestorSelected && response.user.isInvestor === "false") {
						setError("Invalid credentials");
						return;
					}

					const storedAccountsKey =
						response.user.isInvestor === "true"
							? "InvestorAccounts"
							: "StartupAccounts";
					const storedAccounts =
						JSON.parse(localStorage.getItem(storedAccountsKey)) || [];
					const isAccountExists = storedAccounts.some(
						(account) => account.user?._id === user?._id
					);

					if (!isAccountExists) {
						storedAccounts.push(response);
						localStorage.setItem(
							storedAccountsKey,
							JSON.stringify(storedAccounts)
						);
					}

					setIsLoginSuccessfull(true);

					setTimeout(() => {
						setIsInvestorSelected(false);
						setIsLoginSuccessfull(false);

						if (!response.user.isInvestor) navigate("/home");
						else navigate("/investor/home");
					}, 2000);

					dispatch(loginSuccess(response?.user));

					// console.log("Is Investor:", response?.data?.isInvestor);
					let isInvestor = response?.user?.isInvestor === "true" ? true : false;
					if (isInvestor) {
						dispatch(fetchCompanyData(response?.user?.investor, isInvestor));
					} else {
						dispatch(fetchCompanyData(response?.user?._id, isInvestor));
					}

					dispatch(fetchAllChats());
				}
			} else {
				console.error("Google Sign-In failed. Response:", response);
				setError("Google Sign-In failed. Please try again.");
			}
		});
	};

	const handleGoogleLoginError = () => {
		console.error("Google Sign-In failed");
		setError("Google Sign-In failed. Please try again.");
	};
	// const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
	// if (!clientId) {
	// 	console.error("Google OAuth Client ID is not set.");
	// } else {
	// 	console.log("Google OAuth Client ID:", clientId);
	// }

	const handleGoogleLogin = async () => {
		try {
			const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
			const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

			// Check if the client ID is set
			if (!clientId) {
				console.error("Google OAuth Client ID is not set.");
				return; // Exit the function if the client ID is not available
			}

			console.log("Google OAuth Client ID:", clientId);

			// Construct the Google OAuth login URL
			const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
				redirect_uri
			)}&scope=${encodeURIComponent(
				"https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
			)}&access_type=offline&prompt=consent`;

			// Redirect the user to the Google OAuth login page
			window.location.href = googleLoginUrl;
		} catch (error) {
			console.error("Error logging in with Google:", error);
		}
	};

	if (isLoginSuccessfull) {
	}
	return (
		<div className="register_container">
			{/* Left side colomn */}
			<div className="register_container_left register_heading">
				<Link to="/">
					<img
						className="backArrow"
						src={backArrow}
						style={{ cursor: "pointer", height: 40, width: 40 }}
						alt="arrow_back"
					/>
				</Link>
				<img
					src={RegisterIcon}
					alt="register"
					className="img-fluid"
					loading="eager"
				/>
				<h2 className="text-4xl font-bold mb-4">New Here ?</h2>
				<p className="text-xl mb-8">Create a account here</p>
				<Link
					// className="create_account_btn"
					className={`create_account_btn ${
						!isInvestorSelected ? "startup" : "investor"
					} `}
					to={"/signup"}
				>
					Create account
				</Link>
			</div>

			{/* Right side colomn */}
			<div className="register_container_right register_heading_right">
				{!isMobileApp && (
					<Link className="d-md-none" to="/">
						<img className="backArrow" src={backArrow} alt="arrow_back" />
					</Link>
				)}
				<span className="welcome w-100 text-center">Welcome back!</span>

				<div className="login_buttons_row d-flex flex-column align-items-center gap-3">
					<h1 className="mt-5">Login to your account</h1>
					<div className="d-flex flex-row justify-content-between align-items-center gap-4 gap-sm-5">
						<Link to="">
							<button
								className={`login_btn ${!isInvestorSelected ? "startup" : ""} `}
								onClick={() => setIsInvestorSelected(false)}
								style={{ width: 225, height: 41.6 }}
							>
								Start Up
							</button>
						</Link>
						<Link to="">
							<button
								className={`login_btn ${isInvestorSelected ? "investor" : ""} `}
								onClick={() => setIsInvestorSelected(true)}
								style={{ width: 225, height: 41.6 }}
							>
								Investor
							</button>
						</Link>
					</div>
				</div>

				{/* <h3 className="already_have_account" style={{ paddingTop: "0.5rem" }}>
						Don't have an account?{" "}
						<Link
							to={"/signup"}
							className={isInvestorSelected ? "green" : "orange"}
						>
							Create account
						</Link>
					</h3> */}
				<p className="text-center">Login using social networks</p>

				<div
					className="flex justify-center space-x-4"
					style={{ display: "flex", gap: 10 }}
				>
					<GoogleLogin
						onSuccess={handleGoogleLoginSuccess}
						onError={handleGoogleLoginError}
						useOneTap
					/>
					<LinkedInLogin
						isInvestorSelected={isInvestorSelected}
						setIsLoginSuccessfull={setIsLoginSuccessfull}
						setIsInvestorSelected={setIsInvestorSelected}
						setError={setError}
					/>
					{/* <button
						className="p-2 bg-white border border-gray-300 rounded-full"
						onClick={handleGoogleLogin}
					>
						<img src={GIcon} alt="Google" width={24} height={24} />
					</button> */}
					{/* <button className="p-2 bg-white border border-gray-300 rounded-full">
							<img src={FIcon} alt="Facebook" width={24} height={24} />
						</button> */}
				</div>

				<div className="flex items-center">
					<div className="flex-grow border-t border-gray-300"></div>
					<span className="flex-shrink mx-4 text-gray-600">Or</span>
					<div className="flex-grow border-t border-gray-300"></div>
				</div>

				<div className="d-flex justify-content-center mb-3">
					<button className="login_btn" onClick={toggleLoginMethod}>
						{isMobileLogin ? "Use Username/Email" : "Use Mobile Number"}
					</button>
				</div>

				{!show && (
					<form
						onSubmit={handleFormSubmit}
						className="d-flex flex-column gap-2 login-form-mobile"
						// style={{ width: "60%" }}
					>
						{isMobileLogin ? (
							<div className="row">
								<div className="col-md-12 col input-container">
									<label htmlFor="mobile">Mobile Number</label>
									<PhoneInput
										placeholder="Mobile Number"
										className="form-control plato_form_control rounded-3"
										defaultCountry="IN"
										countryCallingCodeEditable={false}
										initialValueFormat="national"
										autoComplete="off"
										onChange={(e) => {
											handleInputChange(e, "phoneNumber");
										}}
										value={inputValues.phoneNumber}
										countrySelectProps={{
											native: true,
											style: { display: "none" },
										}}
										international={false}
									/>
								</div>
							</div>
						) : (
							<>
								{showResetPopUp ? (
									<div>
										<div className="row">
											<div className="col-md-12 col input-container">
												{/* <label htmlFor="text">Username/Email</label> */}
												<input
													type="text"
													className="form-control mb-3"
													placeholder="Enter your email"
													value={inputValues.usernameOrEmail}
													onChange={(e) => {
														const email = e.target.value;
														setInputValues((prev) => ({
															...prev,
															usernameOrEmail: email,
														}));
													}}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12 col input-container">
												{/* <label htmlFor="password">Password</label> */}
												<input
													type="password"
													className="form-control mb-3"
													placeholder="Enter your new password"
													value={inputValues.password}
													onChange={(e) => {
														const password = e.target.value;
														setInputValues((prev) => ({
															...prev,
															password: password,
														}));
														if (!validatePassword(password)) {
															setError(
																"Invalid Password. Password cannot contain spaces"
															);
														} else {
															setError("");
														}
													}}
												/>
											</div>
										</div>
										<div
											className="d-flex"
											style={{
												alignItems: "center",
												justifyContent: "center",
												width: "100%",
											}}
										>
											<div
												style={{
													background:
														isInvestorSelected === "investor"
															? "#d3f36b"
															: "#fd5901",
													border: "none",
													padding: "5px 10px",
													borderRadius: "15px",
													color: "#fff",
													cursor: "pointer",
												}}
												onClick={restPassword}
											>
												Reset Password
											</div>
										</div>
									</div>
								) : (
									<>
										<div className="row">
											<div className="col-md-12 col input-container">
												{/* <label htmlFor="text">Username/Email</label> */}
												<input
													placeholder="Username or Email"
													className="form-control plato_form_control rounded-3"
													onChange={(e) => {
														const email = e.target.value;
														setInputValues((prev) => ({
															...prev,
															usernameOrEmail: email,
														}));
													}}
													value={inputValues?.usernameOrEmail}
													name="phoneNumber"
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												{/* <label htmlFor="password">Password</label> */}
												<input
													type="password"
													id="password"
													name="password"
													className="form-control rounded-3"
													required
													placeholder="Password"
													onChange={(e) => {
														const password = e.target.value;
														setInputValues((prev) => ({
															...prev,
															password: password,
														}));
														if (!validatePassword(password)) {
															setError(
																"Invalid Password. Password cannot contain spaces"
															);
														} else {
															setError("");
														}
													}}
													value={inputValues?.password}
												/>
											</div>
										</div>
									</>
								)}
							</>
						)}

						<div className="row mt-2 staySignedIn-fp">
							<div className="d-flex gap-2 p-2">
								<input
									type="checkbox"
									id="staySignedInCheckbox"
									checked={staySignedIn}
									onChange={handleCheckboxChange}
								/>
								<label htmlFor="staySignedInCheckbox">Stay signed in</label>
							</div>
							{!isMobileLogin && (
								<div className="col-md-12">
									<Link to={""} onClick={() => setShowResetPopUp(true)}>
										Forgot Password?
									</Link>
								</div>
							)}
						</div>

						<div className="submit_btn mt-3">
							<button
								type="submit"
								className={` ${isInvestorSelected ? "investor" : "startup"}`}
								style={{
									width: 225,
									height: 41.6,
									borderRadius: 20,
									fontSize: 16,
									fontWeight: 700,
									color: "#fff",
								}}
							>
								{loading ? (
									<SpinnerBS spinnerSizeClass="spinner-border-sm"></SpinnerBS>
								) : isMobileLogin ? (
									"Send OTP"
								) : (
									"Login"
								)}
							</button>
						</div>

						<h3 className="already_have_account_mobile">
							I don't have an account? &nbsp;
							<Link to={"/signup"} style={{ color: "red" }}>
								Create account
							</Link>
						</h3>
					</form>
				)}

				<OtpVerificationModal
					isOpen={show}
					setOpen={setShow}
					onClose={() => setShow(false)}
					onVerify={ValidateOtp}
					phoneNumber={inputValues.phoneNumber}
					sendOTP={sendOTP}
					inputValues={inputValues}
					setOrderId={setOrderId}
				/>
				{/* {show && (
					<div
						className="verification_container"
						style={{
							height: "300px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginTop: "2rem",
						}}
					>
						<div className="login_content_main" style={{ boxShadow: "none" }}>
							<div className="login_content">
								<h2>Enter verification code</h2>
								<h6>
									We have just sent a verification code to your mobile number
								</h6>
								<div className="otp-container">
									{otp.map((value, index) => (
										<input
											key={index}
											type="text"
											value={value}
											onChange={(event) => handleOtpChange(event, index)}
											onKeyDown={(event) => handleOtpKeyDown(event, index)}
											className={`otp-box ${value !== "" ? "has-value" : ""}`}
											maxLength={1}
											ref={(inputRef) => {
												otpInputRefs.current[index] = inputRef;
											}}
										/>
									))}
								</div>
								<div
									onClick={async () => {
										const res = await sendOTP(inputValues.phoneNumber);
										setOrderId(res?.orderId);
										setOpen(true);
										setShow(true);
									}}
									style={{ cursor: "pointer" }}
								>
									<h3>Send the code again</h3>
								</div>
								<div
									onClick={() => {
										setShow(false);
									}}
									style={{ cursor: "pointer" }}
								>
									<h3>Change phone number</h3>
								</div>
								<div className="submit_btn mt-3">
									<button
										type="submit"
										className="btn btn-primary text-white"
										onClick={ValidateOtp}
									>
										Verify
									</button>
								</div>
							</div>
						</div>
					</div>
				)} */}

				{/*<div className="line-container m-auto">
            <hr className="line" />
            <span className="text mx-2">OR</span>
            <hr className="line" />
          </div>*/}
				{/*<div className="social-login-container d-flex flex-column justify-content-center">
            {isMobileApp ? (
              <img src={GIcon} alt="Google logo" onClick={googleLoginHandle} />
            ) : (
              <div id="googlesignin" className="mx-auto"></div>
            )}
          </div>*/}
			</div>
			{isLoginSuccessfull && !isInvestorSelected && (
				<AfterSuccessPopUp onClose={handleClosePopup} login={true} />
			)}
			{open && (
				<AfterSuccessPopUp
					withoutOkButton
					onClose={() => setOpen(!open)}
					successText="OTP Send successfully to the mobile"
				/>
			)}
			{isLoginSuccessfull && isInvestorSelected && (
				<InvestorAfterSuccessPopUp onClose={handleClosePopup} login={true} />
			)}

			{error && <ErrorPopUp message={error} onClose={() => setError(null)} />}

			{/*{showResetPopUp && (
          <ResetPasswordPopUp onClose={handleCloseResetPopup} />
        )}*/}
			{showErrorPopup && (
				<ErrorPopUp
					message={"Invalid mobile number. Please enter a valid mobile number."}
					onClose={() => setShowErrorPopup(false)} // Add a handler to close the error popup
				/>
			)}
		</div>
	);
};

export default Login;
