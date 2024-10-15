import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import RegisterIcon from "../../Images/Group 21.svg";
import GIcon from "../../Images/Group 22.svg";
import FIcon from "../../Images/Group 23.svg";
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
	verifyOTP,
} from "../../Service/user";
import AfterSuccessPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import InvestorAfterSuccessPopUp from "../PopUp/InvestorAfterSuccessPopUp/InvestorAfterSuccessPopUp";
import ErrorPopUp from "../PopUp/ErrorPopUp/ErrorPopUp";
import { useDispatch, useSelector } from "react-redux";
// import { loginSuccess, loginFailure } from "../../Store/Action/userAction";
import {
	loginSuccess,
	loginFailure,
} from "../../Store/features/user/userSlice";
import backArrow from "../../Images/left-arrow.png";
import ResetPasswordPopUp from "../PopUp/RequestPasswordPopUp/RequestPasswordPopUp";
// import { Navigate } from "react-router-dom";
import SpinnerBS from "../Shared/Spinner/SpinnerBS";
import { selectIsMobileApp } from "../../Store/features/design/designSlice";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Form } from "react-bootstrap";
import { fetchCompanyData } from "../../Store/features/user/userThunks";
import { fetchAllChats } from "../../Store/features/chat/chatThunks";

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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex  items-center justify-center p-4 z-50">
			<div
				className="bg-white rounded-lg shadow-xl p-6  relative flex md:flex-row flex-col"
				style={{ width: "700px" }}
			>
				<div style={{ width: "90%" }}>
					<button
						onClick={onClose}
						className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
					>
						<X size={24} />
					</button>
					<h2 className="text-2xl font-bold mb-4">Enter verification code</h2>
					<p className="text-gray-600 mb-6">
						We have just sent a verification code to your mobile number.
					</p>
					<div className="flex justify-between mb-6">
						{otp.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type="text"
								maxLength="1"
								className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
							/>
						))}
					</div>
					<div className="flex justify-between text-sm mb-6">
						<button
							onClick={handleOtpChange}
							className="text-green-500 hover:underline"
						>
							Send the code again
						</button>
						<button onClick={onClose} className="text-blue-500 hover:underline">
							Change phone number
						</button>
					</div>
					<button
						onClick={handleVerify}
						className="bg-orange-500 text-white py-1 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 mx-auto md:w-56 w-full"
					>
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

	useEffect(() => {
		GoogleAuth.initialize({
			clientId:
				"556993160670-mb0ek9ukp41t6402t61vkktpmek415qe.apps.googleusercontent.com",
			scopes: ["profile", "email"],
			grantOfflineAccess: true,
		});
	});

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

	const googleUserVerifyHandler = async ({ credential }) => {
		try {
			const { data, token } = await googleLoginAPI(credential);
			console.log(data, token);
			localStorage.setItem("accessToken", token);
			localStorage.setItem("isLoggedIn", "true");
			setIsLoginSuccessfull(true);

			setTimeout(() => {
				setIsInvestorSelected(false);
				setIsLoginSuccessfull(false);

				if (!data.investor) navigate("/home");
				else navigate("/investor/home");
			}, 2000);

			dispatch(loginSuccess(data));
		} catch (error) {
			navigate("/signup");
			console.log(error);
		}
	};

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

	useEffect(() => {
		if (window.google && window.google.accounts) {
			const googleAccounts = window.google.accounts;
			googleAccounts.id.initialize({
				client_id: process.env.REACT_APP_GOOGLE_OAUTH_ID,
				callback: googleUserVerifyHandler,
			});

			googleAccounts.id.renderButton(document.getElementById("googlesignin"), {
				ux_mode: "popup",
				size: "large",
			});
		} else {
			console.error("Google Accounts API is not available.");
		}
	}, []);

	// const googleLoginHandle = async () => {
	//   let googleUser = await GoogleAuth.signIn();
	//   const credential = googleUser.authentication.idToken;
	//   googleUserVerifyHandler({ credential });
	// };

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
	return (
		<div className="flex lg:flex-row flex-col overflow-hidden register_container">
			{/* Left side colomn */}
			<div
				className="lg:w-1/2 bg-pink-50 flex flex-col items-center justify-center p-5 register_heading"
				style={{ padding: "1rem" }}
			>
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
					className=" text-white py-1 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 flex justify-center items-center"
					to={"/signup"}
					style={{
						width: 225,
						height: 41.6,
						textDecoration: "none",
						backgroundColor: "#fd5901",
					}}
				>
					Create account
				</Link>
			</div>

			{/* Right side colomn */}
			<div
				className="lg:w-1/2 bg-white flex flex-col p-5 register_heading_right"
				style={{ padding: "1rem" }}
			>
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

				<div className="flex justify-center space-x-4">
					<button className="p-2 bg-white border border-gray-300 rounded-full">
						<img src={GIcon} alt="Google" width={24} height={24} />
					</button>
					<button className="p-2 bg-white border border-gray-300 rounded-full">
						<img src={FIcon} alt="Facebook" width={24} height={24} />
					</button>
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
						className="d-flex flex-column gap-2"
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

						<div className="row mt-2">
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
