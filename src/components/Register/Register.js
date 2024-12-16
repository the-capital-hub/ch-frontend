import React, { useEffect, useRef, useState } from "react";
import "./register.scss";
import RegisterIcon from "../../Images/Group 21.svg";
import { IoCloseSharp } from "react-icons/io5";
// import GIcon from "../../Images/Group 22.svg";
// import FIcon from "../../Images/Group 23.svg";
// import AIcon from "../../Images/Group 24.svg";
import backArrow from "../../Images/left-arrow.png";
import PhoneInput from "react-phone-number-input";
import AfterRegisterPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { Link, useNavigate } from "react-router-dom";
import {
	// getUser,
	postUser,
	sendOTP,
	verifyOTP,
	googleLoginAPI,
	googleRegisterApi,
} from "../../Service/user";
import ErrorPopUp from "../PopUp/ErrorPopUp/ErrorPopUp";
// import { firebase, auth } from "../../firebase";
import SelectWhatYouAre from "../PopUp/SelectWhatYouAre/SelectWhatYouAre";
//import StartUpForm from "../PopUp/StartUpForm/StartUpForm";
import InvestorForm from "../PopUp/InvestorForm/InvestorForm";
import { selectIsMobileApp } from "../../Store/features/design/designSlice";
import { data } from "./data";
import AfterSuccessPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import StartUp from "../RegistrationFrom/StartUp";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// imports for implementing login with google
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { fetchCompanyData } from "../../Store/features/user/userThunks";
import { fetchAllChats } from "../../Store/features/chat/chatThunks";
import { loginSuccess } from "../../Store/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
	const dispatch = useDispatch();
	const [isMobileVerified, setIsMobileVerified] = useState(false);
	// const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const isMobileApp = useSelector(selectIsMobileApp);
	const [open, setOpen] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [showErrorPopup, setShowErrorPopup] = useState(false);
	const [inputValues, setInputValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phoneNumber: "",
		designation: "",
		gender: "",
		linkedin: "",
	});
	const [companyDetail, setCompanyDetail] = useState({
		company: "",
	});
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const otpInputRefs = useRef([]);
	const [show, setshow] = useState(false);
	const [showSelectWhatYouAre, setShowSelectWhatYouAre] = useState(false);
	const [showStartUp, setShowStartUp] = useState(false);
	const [showInvestor, setShowInvestor] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isInvestorSelected, setIsInvestorSelected] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [final, setfinal] = useState("");
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [registerData, setRegisterData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phoneNumber: "",
		designation: "",
		// companyName: "",
	});

	// Sent OTP
	// useEffect(() => {
	//   let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
	// }, []);
	// useEffect(()=>{
	//   const user = JSON.parse(localStorage.getItem("user_data"))
	//   if(user){
	//     setShowStartUp(true)
	//   }
	// },[])

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
		} else if (type === "linkedin") {
			setInputValues({ ...inputValues, linkedin: event.target.value });
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		// if (!isMobileVerified) {
		//   alert("Please verify your Mobile Number");
		//   return;
		// }

		if (!isValidMobileNumber(inputValues.phoneNumber)) {
			setShowErrorPopup(true);
			setTimeout(() => {
				setShowErrorPopup(false);
			}, 2000);

			return;
		}
		try {
			if (!show) {
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
					setshow(true);
					// setTimeout(() => {
					//   let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
					//   auth
					//     .signInWithPhoneNumber(phoneNumber, verify)
					//     .then((result) => {
					//       setfinal(result);
					//       alert("code sent");
					//       setshow(true);
					//     })
					//     .catch((err) => {
					//       alert(err);
					//       window.location.reload();
					//     });
					// }, 500);
					// For example, send a verification code via SMS and wait for user input
					// Once verified, update the isMobileVerified state
				} else {
					// Handle invalid phone number scenario
					console.log("Invalid phone number");
				}
				// const response = await postUser(inputValues, isInvestorSelected);
				// console.log("User data posted successfully:", response);
				// localStorage.setItem("user_data", JSON.stringify(response.data));

				// // setIsSubmitted(true);
				// if (response) {
				//   setShowSelectWhatYouAre(true);
				// }
			} else {
			}
		} catch (error) {
			console.error("Error posting user data:", error.response.data.message);
			setErrorMessage(error.response.data.message);
			setShowErrorPopup(true);

			setTimeout(() => {
				setShowErrorPopup(false);
			}, 2000);
		}
	};

	const handleRegisterInputChange = (e, field) => {
		setRegisterData((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const handleRegisterFormSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted", { ...registerData, ...companyDetail });
		setIsModalOpen(false);
		googleRegisterApi({
			...registerData,
			...companyDetail,
			isInvestor: isInvestorSelected,
		}).then((response) => {
			if (response.status === 200) {
				const user = response.user;
				const token = response.token;
				localStorage.setItem("userVisit", 1);
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

					setTimeout(() => {
						setIsInvestorSelected(false);

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
				console.error("Google Sign-Up failed. Response:", response);
				setError("Google Sign-Up failed. Please try again.");
			}
		});
	};

	const handleClosePopup = () => {
		setIsSubmitted(true);
		navigate("/login");
	};
	const handleBack = () => {
		navigate("/");
	};

	const navigate = useNavigate();
	const isValidMobileNumber = (phoneNumber) => {
		// Remove any non-digit characters from the input
		const cleanedNumber = phoneNumber.replace(/\D/g, "");

		// Check if the cleaned number starts with the country code for India (+91) and has 10 digits
		return /^91\d{10}$/.test(cleanedNumber);
	};

	// const handleVerifyMobile = async (phoneNumber) => {
	//   if (isValidMobileNumber(phoneNumber)) {
	//     // Implement your mobile number verification logic here
	//     if (phoneNumber === "" || phoneNumber.length < 10) return;
	//     const res = await sendOTP(phoneNumber);
	//     setOrderId(res?.orderId);
	//     alert("code sent");
	//     setshow(true);
	//     // setTimeout(() => {
	//     //   let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
	//     //   auth
	//     //     .signInWithPhoneNumber(phoneNumber, verify)
	//     //     .then((result) => {
	//     //       setfinal(result);
	//     //       alert("code sent");
	//     //       setshow(true);
	//     //     })
	//     //     .catch((err) => {
	//     //       alert(err);
	//     //       window.location.reload();
	//     //     });
	//     // }, 500);
	//     // For example, send a verification code via SMS and wait for user input
	//     // Once verified, update the isMobileVerified state
	//   } else {
	//     // Handle invalid phone number scenario
	//     console.log("Invalid phone number");
	//   }
	// };

	// Validate OTP
	const ValidateOtp = async () => {
		try {
			if (otp === null || final === null) return;
			const verificationCode = otp.join(""); // Join the array elements into a string
			const res = await verifyOTP({
				otp: verificationCode,
				orderId,
				phoneNumber: inputValues.phoneNumber,
			});
			if (res.isOTPVerified) {
				const response = await postUser(
					inputValues,
					isInvestorSelected,
					companyDetail
				);
				console.log("User data posted successfully:", response);
				localStorage.setItem("user_data", JSON.stringify(response.data));
				localStorage.setItem("accessToken", response.token);
				//setIsSubmitted(true);
				if (response) {
					setShowStartUp(true);
				}
				setIsMobileVerified(true);
				navigate("/signup");
				setshow(false);
			}
			// final
			//   .confirm(verificationCode)
			//   .then((result) => {
			//     console.log("Verified Success", result);
			//     alert("Mobile Verification Success");

			//     if (result) {
			//       // Set the user's login status in local storage or Redux store
			//       // setShowSelectWhatYouAre(true);
			//       setIsMobileVerified(true);
			//       navigate("/signup");
			//       setshow(false);
			//     }
			//   })
			//   .catch((err) => {
			//     alert("Wrong code");
			// });
		} catch (error) {
			console.error("Error posting user data:", error.response.data.message);
			setErrorMessage(error.response.data.message);
			setShowErrorPopup(true);
			setTimeout(() => {
				setShowErrorPopup(false);
			}, 2000);
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

	// const handleOtpPaste = (event) => {
	//   event.preventDefault();
	//   const pastedText = event.clipboardData.getData("text/plain");
	//   const sanitizedText = pastedText.replace(/[^0-9]/g, "").slice(0, 6);
	//   const updatedOtp = [...otp];
	//   for (let i = 0; i < sanitizedText.length; i++) {
	//     updatedOtp[i] = sanitizedText[i];
	//   }
	//   setOtp(updatedOtp);
	// };

	const handleClick = () => {
		console.log("handle click");
	};

	const handleStartupClick = () => {
		setShowSelectWhatYouAre(false);
		setShowStartUp(true);
	};

	const handleInvestorClick = () => {
		setShowSelectWhatYouAre(false);
		setShowInvestor(true);
	};

	useEffect(() => {
		document.title = "Register | The Capital Hub";
	}, []);

	const handleGoogleLoginSuccess = (credentialResponse) => {
		const decode = jwtDecode(credentialResponse.credential);
		googleLoginAPI(credentialResponse.credential).then((response) => {
			console.log(response);
			if (response.status === 202) {
				setRegisterData({
					...registerData,
					firstName: decode?.given_name,
					lastName: decode?.family_name,
					email: decode?.email,
				});
				setIsModalOpen(true);
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

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
			<div className="register_container">
				{/* <div className="register_container row d-flex m-0"> */}
				{/* Left section */}
				{/* <div className="col-lg-6 col-md-12 register_heading bg-pink-50"> */}
				<div className="register_container_left register_heading">
					<img
						className="backArrow"
						src={backArrow}
						alt="arrow_back"
						onClick={handleBack}
						style={{ cursor: "pointer", width: 40, height: 40 }}
					/>
					<img src={RegisterIcon} alt="Register_image" />
					<h2 className="text-4xl font-bold mb-4">Already have an account ?</h2>
					<p className="text-xl mb-8">Login to your account</p>
					<Link
						className={`register_login_btn ${
							!isInvestorSelected ? "startup" : "investor"
						} `}
						to={"/login"}
					>
						Login
					</Link>
				</div>
				{/* Right section */}
				{/* <div className="col-lg-6 col-md-12 register_heading_right"> */}
				<div
					className="register_container_right register_heading_right"
					style={{ padding: "1rem" }}
				>
					{!isMobileApp && (
						<img
							className="backArrow_mobile"
							src={backArrow}
							alt="arrow_back"
							onClick={handleBack}
						/>
					)}
					<span className="welcome mt-4 ml-auto mr-auto text-2xl">
						Welcome{" "}
					</span>
					<h1>Create your account</h1>
					{/* <h3 className="already_have_account">
          Already have an account? &nbsp;
          <Link to={"/login"} style={{ color: "red" }}>
            Log In
          </Link>
        </h3> */}
					<div className="login_buttons_row d-flex flex-column align-items-center">
						<div className="d-flex flex-row justify-content-between align-items-center gap-4 gap-sm-5">
							<Link to="">
								<button
									className={`login_btn ${
										!isInvestorSelected ? "startup" : ""
									} `}
									onClick={() => setIsInvestorSelected(false)}
									style={{ width: 225, height: 41.6 }}
								>
									Start Up
								</button>
							</Link>
							<Link to="">
								<button
									className={`login_btn ${
										isInvestorSelected ? "investor" : ""
									} `}
									onClick={() => setIsInvestorSelected(true)}
									style={{ width: 225, height: 41.6 }}
								>
									Investor
								</button>
							</Link>
						</div>
					</div>
					<p className="text-center">Create an account using social networks</p>

					<div className="flex justify-center space-x-4">
						<GoogleLogin
							text="Create Account with Google"
							onSuccess={handleGoogleLoginSuccess}
							onError={handleGoogleLoginError}
							useOneTap
						/>
						{/* <button className="p-2 bg-white border border-gray-300 rounded-full">
							<img src={GIcon} alt="Google" width={24} height={24} />
						</button>
						<button className="p-2 bg-white border border-gray-300 rounded-full">
							<img src={FIcon} alt="Facebook" width={24} height={24} />
						</button> */}
					</div>

					<div className="flex items-center">
						<div className="flex-grow border-t border-gray-300"></div>
						<span className="flex-shrink mx-4 text-gray-600">Or</span>
						<div className="flex-grow border-t border-gray-300"></div>
					</div>

					{show ? (
						<div className="verification_container">
							<div className="login_content_main">
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
									<h3>Send the code again</h3>
									<h3>Change phone number</h3>
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
					) : (
						<div className="form-container">
							<form onSubmit={handleFormSubmit}>
								<div className="row">
									<div className="col-lg-6 col-md-12 form-group mb-2">
										{/* <label htmlFor="firstname">First Name</label> */}
										<input
											type="text"
											id="firstname"
											name="firstName"
											className="form-control"
											required
											placeholder="First Name"
											value={inputValues.firstName}
											onChange={(e) => handleInputChange(e, "firstName")}
										/>
									</div>
									<div className="col-lg-6 col-md-12 form-group mb-2">
										{/* <label htmlFor="lastname">Last Name</label> */}
										<input
											type="text"
											id="lastname"
											name="lastName"
											value={inputValues.lastName}
											className="form-control"
											required
											placeholder="Last Name"
											onChange={(e) => handleInputChange(e, "lastName")}
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-lg-6 col-md-12 form-group mb-2">
										{/* <label htmlFor="mobile">Mobile Number</label> */}
										<div className="input-group">
											<PhoneInput
												placeholder="Mobile Number"
												className="form-control plato_form_control rounded-start-3"
												defaultCountry="IN"
												countryCallingCodeEditable={false}
												initialValueFormat="national"
												autoComplete="off"
												onChange={(e) => handleInputChange(e, "phoneNumber")}
												value={inputValues.phoneNumber}
												countrySelectProps={{
													native: "true",
													style: { display: "none" },
												}}
												international={false}
											/>
											{/*<button
                    className="btn btn-light rounded-end-3 otp-verify-btn"
                    onClick={() => handleVerifyMobile(inputValues.phoneNumber)}
                    style={{ zIndex: 0 }}
                  >
                    Verify
                  </button>*/}
										</div>

										{/*{isMobileVerified && (
                  <p className="text-success">Mobile number verified!</p>
                )}
              <div id="recaptcha-container"></div>*/}
									</div>
									<div className="col-lg-6 col-md-12 form-group mb-2">
										{/* <label htmlFor="email">Email</label> */}
										<input
											type="email"
											id="email"
											name="email"
											className="form-control"
											value={inputValues.email}
											required
											placeholder="Email"
											onChange={(e) => handleInputChange(e, "email")}
										/>
									</div>
								</div>
								{/* <div className="row">
              <div className="col-md-12 form-group mb-2">
                <label htmlFor="linkedin">Linkedin</label>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  className="form-control"
                  value={inputValues.linkedin}
                  required
                  placeholder="Linkedin"
                  onChange={(e) => handleInputChange(e, "linkedin")}
                />
              </div>
            </div> */}

								<div className="row">
									<div className="col-lg-6 col-md-12 form-group mb-2">
										{/* <label htmlFor="company">Company</label> */}
										<input
											type="text"
											id="company"
											name="company"
											className="form-control"
											value={companyDetail.company}
											required
											placeholder="Company name"
											onChange={(e) =>
												setCompanyDetail({
													...companyDetail,
													company: e.target.value,
												})
											}
										/>
									</div>
									{isInvestorSelected && (
										<div className="col-lg-6 col-md-12 form-group mb-2">
											{/* <label htmlFor="industry">Industry</label> */}
											<select
												style={{ border: "2px solid" }}
												type="text"
												id="industry"
												name="industry"
												className="form-control"
												value={companyDetail.industry}
												required
												placeholder="Industry"
												onChange={(e) =>
													setCompanyDetail({
														...companyDetail,
														industry: e.target.value,
													})
												}
											>
												{data.map((item, index) => (
													<option value={item} key={index}>
														{item}
													</option>
												))}
											</select>
										</div>
									)}
									{!isInvestorSelected && (
										<div className="col-lg-6 col-md-12 form-group mb-2">
											{/* <label htmlFor="designation">Designation</label> */}
											<input
												type="text"
												id="designation"
												name="designation"
												className="form-control"
												value={companyDetail.designation}
												required
												placeholder="Designation"
												onChange={(e) =>
													setInputValues({
														...inputValues,
														designation: e.target.value,
													})
												}
											/>
										</div>
									)}
								</div>
								<center>
									<div className="submit_btn mt-3">
										<button
											type="submit"
											className="btn btn-primary text-white"
											onClick={handleClick}
											style={{
												width: 225,
												height: 41.6,
												borderRadius: 20,
												fontSize: 16,
												fontWeight: 700,
												color: "#fff",
											}}
										>
											Create Account
										</button>
									</div>
								</center>
								<h3 className="already_have_account_mobile">
									Already have an account? &nbsp;
									<Link to={"/login"} style={{ color: "red" }}>
										Log In
									</Link>
								</h3>
							</form>
						</div>
					)}
					{/* <div className="line-container">
            <hr className="line" />
            <span className="text">Or continue with</span>
            <hr className="line" />
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center login_icons">
              <img src={GIcon} alt="image" />
              <img src={FIcon} alt="image" />
              <img src={AIcon} alt="image" />
            </div>
          </div> */}
				</div>
				{isSubmitted && (
					<AfterRegisterPopUp onClose={handleClosePopup} register={true} />
				)}
				{open && (
					<AfterSuccessPopUp
						withoutOkButton
						onClose={() => setOpen(!open)}
						successText="OTP Send successfully to the mobile"
					/>
				)}
				{showErrorPopup && (
					<ErrorPopUp
						message={
							"Invalid mobile number. Please enter a valid mobile number."
						}
						onClose={() => setShowErrorPopup(false)} // Add a handler to close the error popup
					/>
				)}

				{/*{showStartUp && <StartUpForm />}*/}
				{showStartUp && <StartUp />}
				{showInvestor && <InvestorForm />}
				{showSelectWhatYouAre && (
					<SelectWhatYouAre
						onStartupClick={handleStartupClick}
						onInvestorClick={handleInvestorClick}
					/>
				)}

				{showErrorPopup && (
					<ErrorPopUp
						message={errorMessage}
						onClose={() => setErrorMessage("")} // Clear the error message when closing the popup
					/>
				)}
				{isModalOpen && (
					<div
						className="Modal_Container"
						id="my-modal"
						style={{
							backgroundColor: "#4b5563cc",
							// opacity: "0.8",
						}}
					>
						<div
							className="relative top-40  mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
							style={{
								position: "fixed",
								top: "10%",
								left: "30%",
								width: "40%",
							}}
						>
							<div className="mt-3 text-center">
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									Create Account
								</h3>
								<button
									onClick={() => setIsModalOpen(false)}
									className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
								>
									<IoCloseSharp className="h-6 w-6" />
								</button>
								<form
									onSubmit={handleRegisterFormSubmit}
									className="mt-2 space-y-4"
								>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<input
												type="text"
												id="firstname"
												name="firstName"
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
												required
												placeholder="First Name"
												value={registerData.firstName}
												onChange={(e) =>
													handleRegisterInputChange(e, "firstName")
												}
												disabled={registerData.firstName !== ""} // Disable if there's a value
											/>
										</div>
										<div>
											<input
												type="text"
												id="lastname"
												name="lastName"
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
												required
												placeholder="Last Name"
												value={registerData.lastName}
												onChange={(e) =>
													handleRegisterInputChange(e, "lastName")
												}
												disabled={registerData.lastName !== ""}
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<input
												type="text"
												id="mobile"
												name="phoneNumber"
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
												required
												placeholder="Mobile Number"
												value={registerData.phoneNumber}
												onChange={(e) =>
													handleRegisterInputChange(e, "phoneNumber")
												}
											/>
										</div>

										<div>
											<input
												type="email"
												id="email"
												name="email"
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
												required
												placeholder="Email"
												value={registerData.email}
												onChange={(e) => handleRegisterInputChange(e, "email")}
												disabled={registerData.email !== ""}
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<input
												type="text"
												id="company"
												name="company"
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
												required
												placeholder="Company name"
												value={companyDetail.company}
												onChange={(e) =>
													setCompanyDetail({
														...companyDetail,
														company: e.target.value,
													})
												}
											/>
										</div>
										{isInvestorSelected ? (
											<div>
												<select
													id="industry"
													name="industry"
													className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
													value={companyDetail.industry}
													onChange={(e) =>
														setCompanyDetail({
															...companyDetail,
															industry: e.target.value,
														})
													}
													required
												>
													<option value="">Select Industry</option>
													{data.map((industry, index) => (
														<option value={industry} key={index}>
															{industry}
														</option>
													))}
												</select>
											</div>
										) : (
											<div>
												<input
													type="text"
													id="designation"
													name="designation"
													className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
													required
													placeholder="Designation"
													value={registerData.designation}
													onChange={(e) =>
														handleRegisterInputChange(e, "designation")
													}
												/>
											</div>
										)}
									</div>
									<div className="flex justify-center mt-6">
										<button
											type="submit"
											className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
										>
											Create Account
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</div>
		</GoogleOAuthProvider>
	);
};

export default Register;
