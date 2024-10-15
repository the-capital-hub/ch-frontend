import React, { useEffect, useRef, useState } from "react";
import "./register.scss";
import RegisterIcon from "../../Images/Group 21.svg";
import GIcon from "../../Images/Group 22.svg";
import FIcon from "../../Images/Group 23.svg";
import AIcon from "../../Images/Group 24.svg";
import backArrow from "../../Images/left-arrow.png";
import PhoneInput from "react-phone-number-input";
import AfterRegisterPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { Link, useNavigate } from "react-router-dom";
import { getUser, postUser, sendOTP, verifyOTP } from "../../Service/user";
import ErrorPopUp from "../PopUp/ErrorPopUp/ErrorPopUp";
import { firebase, auth } from "../../firebase";
import SelectWhatYouAre from "../PopUp/SelectWhatYouAre/SelectWhatYouAre";
//import StartUpForm from "../PopUp/StartUpForm/StartUpForm";
import InvestorForm from "../PopUp/InvestorForm/InvestorForm";
import { useSelector } from "react-redux";
import { selectIsMobileApp } from "../../Store/features/design/designSlice";
import { data } from "./data";
import AfterSuccessPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import StartUp from "../RegistrationFrom/StartUp";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const Register = () => {
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

	return (
		<div className="flex lg:flex-row flex-col overflow-hidden register_container">
			{/* <div className="register_container row d-flex m-0"> */}
			{/* Left section */}
			{/* <div className="col-lg-6 col-md-12 register_heading bg-pink-50"> */}
			<div className="lg:w-1/2 bg-pink-50 flex flex-col items-center justify-center p-5 register_heading">
				<img
					className="backArrow"
					src={backArrow}
					alt="arrow_back"
					onClick={handleBack}
					style={{ cursor: "pointer", width: 40, height: 40 }}
				/>
				{/* <h3>
					Start your journey <br />
					with us.
				</h3> */}
				<img src={RegisterIcon} alt="Register_image" />
				<h2 className="text-4xl font-bold mb-4">Already have an account ?</h2>
				<p className="text-xl mb-8">Login to your account</p>
				<Link
					className=" text-white py-1 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 mx-auto flex justify-center items-center"
					to={"/login"}
					style={{
						width: 225,
						height: 41.6,
						textDecoration: "none",
						backgroundColor: "#fd5901",
					}}
				>
					Login
				</Link>
			</div>
			{/* Right section */}
			{/* <div className="col-lg-6 col-md-12 register_heading_right"> */}
			<div
				className="lg:w-1/2 bg-white flex flex-col p-5 register_heading_right"
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
				<span className="welcome mt-4">Welcome </span>
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
				<p className="text-center">Create an account using social networks</p>

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
												native: true,
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
					message={"Invalid mobile number. Please enter a valid mobile number."}
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
		</div>
	);
};

export default Register;
