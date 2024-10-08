// import React, { useEffect, useRef, useState } from "react";
// import "./login.scss";
// import RegisterIcon from "../../Images/Group 21.svg";
// import GIcon from "../../Images/Group 22.svg";
// import { useLinkedIn } from 'react-linkedin-login-oauth2';
// // import FIcon from "../../Images/Group 23.svg";
// // import AIcon from "../../Images/Group 24.svg";
// import PhoneInput from "react-phone-number-input";
// import { Link, useNavigate } from "react-router-dom";
// import loinkdinLogo from "../../Images/Sign-in-Large---Hover.png"
// import {
//   googleLoginAPI,
//   postUserLogin,
//   sendOTP,
//   verifyOTP,
// } from "../../Service/user";
// import AfterSuccessPopUp from "../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
// import InvestorAfterSuccessPopUp from "../PopUp/InvestorAfterSuccessPopUp/InvestorAfterSuccessPopUp";
// import ErrorPopUp from "../PopUp/ErrorPopUp/ErrorPopUp";
// import { useDispatch, useSelector } from "react-redux";
// // import { loginSuccess, loginFailure } from "../../Store/Action/userAction";
// import {
//   loginSuccess,
//   loginFailure,
// } from "../../Store/features/user/userSlice";
// import backArrow from "../../Images/left-arrow.png";
// import ResetPasswordPopUp from "../PopUp/RequestPasswordPopUp/RequestPasswordPopUp";
// // import { Navigate } from "react-router-dom";
// import SpinnerBS from "../Shared/Spinner/SpinnerBS";
// import { selectIsMobileApp } from "../../Store/features/design/designSlice";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
// import { Form } from "react-bootstrap";
// import { fetchCompanyData } from "../../Store/features/user/userThunks";
// import { fetchAllChats } from "../../Store/features/chat/chatThunks";
// import axios from "axios";

// const Login = () => {
//   // const loggedInUser = useSelector((state) => state.user.loggedInUser);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { linkedInLogin } = useLinkedIn({
//     clientId: process.env.REACT_APP_LINKEDIN_CLIENT_ID,
//     redirectUri: `${window.location.origin}/linkedin`,
//     scope: 'profile email openid w_member_social',
//     onSuccess: (code) => {
//       // Handle the authentication code
//       console.log("Authentication code:", code);

//       // Exchange code for access token
//       //fetchAccessToken(code);
//     },
//     onError: (error) => {
//       // Handle error
//       console.log("Login failed:", error);
//     },
//   });
//   const isMobileApp = useSelector(selectIsMobileApp);

//   useEffect(() => {
//     GoogleAuth.initialize({
//       clientId:
//         "556993160670-mb0ek9ukp41t6402t61vkktpmek415qe.apps.googleusercontent.com",
//       scopes: ["profile", "email"],
//       grantOfflineAccess: true,
//     });
//   });

//   // States for login
//   const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(false);
//   const [isInvestorSelected, setIsInvestorSelected] = useState(false);
//   const [error, setError] = useState(null);
//   const [show, setShow] = useState(false);
//   const [orderId, setOrderId] = useState("");
//   const otpInputRefs = useRef([]);
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [showErrorPopup, setShowErrorPopup] = useState(false);
//   const [showResetPopUp, setShowResetPopUp] = useState(false);
//   const [inputValues, setInputValues] = useState({
//     password: "",
//     phoneNumber: "",
//   });
//   const [staySignedIn, setStaySignedIn] = useState(false);

//   const handleCheckboxChange = () => {
//     setStaySignedIn(!staySignedIn);
//   };
//   const isValidMobileNumber = (phoneNumber) => {
//     // Remove any non-digit characters from the input
//     const cleanedNumber = phoneNumber.replace(/\D/g, "");

//     // Check if the cleaned number starts with the country code for India (+91) and has 10 digits
//     return /^91\d{10}$/.test(cleanedNumber);
//   };
//   // Handle Input change
//   const handleInputChange = (event, type) => {
//     if (type !== "country" && type !== "state" && type !== "phoneNumber") {
//       const { name, value } = event.target;
//       setInputValues({ ...inputValues, [name]: value });
//     } else if (type === "country") {
//       setInputValues({ ...inputValues, country: event });
//     } else if (type === "state") {
//       setInputValues({ ...inputValues, state: event });
//     } else if (type === "phoneNumber") {
//       setInputValues({ ...inputValues, phoneNumber: event });
//     }
//   };
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     if (!isValidMobileNumber(inputValues.phoneNumber)) {
//       setShowErrorPopup(true);
//       setTimeout(() => {
//         setShowErrorPopup(false);
//       }, 2000);

//       return;
//     }
//     try {
//       if (!show) {
//         if (isValidMobileNumber(inputValues.phoneNumber)) {
//           // Implement your mobile number verification logic here
//           if (
//             inputValues.phoneNumber === "" ||
//             inputValues.phoneNumber.length < 10
//           )
//             return;
//           const res = await sendOTP(inputValues.phoneNumber);
//           setOrderId(res?.orderId);
//           setOpen(true);
//           setShow(true);
//         } else {
//           // Handle invalid phone number scenario
//           console.log("Invalid phone number");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       console.error("Login failed:", error.response.data.message);
//       setError(error.response.data.message);
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const ValidateOtp = async () => {
//     setLoading(true);
//     try {
//       // if (otp === null) return;
//       // const verificationCode = otp.join(""); // Join the array elements into a string
//       // const res = await verifyOTP({
//       //   otp: verificationCode,
//       //   orderId,
//       //   phoneNumber: inputValues.phoneNumber,
//       // });
//       // if (res.isOTPVerified) {
//         setLoading(true);
//         const response = await postUserLogin(inputValues);
//         console.log("response-->", response);

//         const user = response.user;
//         const token = response.token;
//         localStorage.setItem("accessToken", token);
//         localStorage.setItem("isLoggedIn", "true");
//         console.log(user, token);
//         if (response) {
//           console.log("response--->", response);
//           // (startup is selected)Investor is not selected and user is investor
//           if (!isInvestorSelected) {
//             if (user.isInvestor === "true") {
//               setError("Invalid credentials");
//               return;
//             }
//           }
//           // Investor is selected and user is not investor(user is startup)
//           if (isInvestorSelected) {
//             if (user.isInvestor === "false") {
//               setError("Invalid credentials");
//               return;
//             }
//           }

//           const storedAccountsKey =
//             user.isInvestor === "true" ? "InvestorAccounts" : "StartupAccounts";

//           const storedAccounts =
//             JSON.parse(localStorage.getItem(storedAccountsKey)) || [];
//           const isAccountExists = storedAccounts.some(
//             (account) => account?.user?._id === user?._id
//           );

//           if (!isAccountExists) {
//             storedAccounts.push(response);
//             localStorage.setItem(
//               storedAccountsKey,
//               JSON.stringify(storedAccounts)
//             );
//           }

//           // No errors, Set loginsuccessfull to true
//           setIsLoginSuccessfull(true);

//           setTimeout(() => {
//             // Reset states
//             setIsInvestorSelected(false);
//             setIsLoginSuccessfull(false);

//             if (!user.investor) navigate("/home");
//             else navigate("/investor/home");
//           }, 2000);

//           dispatch(loginSuccess(response.user));
//           // Fetch company data asynchronously
//           let isInvestor = response.user.isInvestor === "true" ? true : false;
//           if (isInvestor) {
//             dispatch(fetchCompanyData(response.user.investor, isInvestor));
//           } else {
//             dispatch(fetchCompanyData(response.user._id, isInvestor));
//           }

//           // Fetch all Chat data
//           dispatch(fetchAllChats());
//         }

//         console.log("JWT Token:", token);
//       //}
//     } catch (error) {
//       console.log(error);
//       console.error("Login failed:", error.response.data.message);
//       setError(error.response.data.message);

//       // dispatch(loginFailure(error.response.data.error));
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Handle close of login successful popup
//   const handleClosePopup = () => {
//     if (!isInvestorSelected) {
//       navigate("/home");
//     } else if (isInvestorSelected) {
//       navigate("/investor/home");
//     }
//   };

//   // Handle close of reset password popup
//   const handleCloseResetPopup = () => {
//     setShowResetPopUp(false);
//     navigate("/login");
//   };

//   useEffect(() => {
//     document.title = "Log In | The Capital Hub";
//   }, []);

//   // Google sign in
//   const googleUserVerifyHandler = async ({ credential }) => {
//     try {
//       const { data, token } = await googleLoginAPI(credential);
//       console.log(data, token);
//       localStorage.setItem("accessToken", token);
//       localStorage.setItem("isLoggedIn", "true");
//       // if (!isInvestorSelected) {
//       //   if (data.isInvestor === "true") {
//       //     setError("Invalid credentials");
//       //     return;
//       //   }
//       // }
//       // if (isInvestorSelected) {
//       //   if (data.isInvestor === "false") {
//       //     setError("Invalid credentials");
//       //     return;
//       //   }
//       // }
//       setIsLoginSuccessfull(true);

//       setTimeout(() => {
//         setIsInvestorSelected(false);
//         setIsLoginSuccessfull(false);

//         if (!data.investor) navigate("/home");
//         else navigate("/investor/home");
//       }, 2000);

//       dispatch(loginSuccess(data));
//     } catch (error) {
//       navigate("/signup");
//       console.log(error);
//     }
//   };
//   const handleOtpChange = (event, index) => {
//     const value = event.target.value;
//     console.log(value);
//     const updatedOtp = [...otp];
//     updatedOtp[index] = value;
//     setOtp(updatedOtp);
//     if (value !== "" && index < otp.length - 1) {
//       otpInputRefs.current[index + 1].focus();
//     }
//   };

//   const handleOtpKeyDown = (event, index) => {
//     if (event.key === "Backspace" && index > 0 && otp[index] === "") {
//       const updatedOtp = [...otp];
//       updatedOtp[index - 1] = "";
//       setOtp(updatedOtp);
//       otpInputRefs.current[index - 1].focus();
//     }
//   };
//   useEffect(() => {
//     if (window.google && window.google.accounts) {
//       const googleAccounts = window.google.accounts;
//       googleAccounts.id.initialize({
//         client_id: process.env.REACT_APP_GOOGLE_OAUTH_ID,
//         callback: googleUserVerifyHandler,
//       });

//       googleAccounts.id.renderButton(document.getElementById("googlesignin"), {
//         // theme: "filled_blue",
//         // shape: "circle",
//         ux_mode: "popup",
//         // text: "continue_with",
//         size: "large",
//       });
//     } else {
//       console.error("Google Accounts API is not available.");
//     }
//   }, []);

//   const googleLoginHandle = async () => {
//     let googleUser = await GoogleAuth.signIn();
//     console.log(googleUser.authentication.idToken);
//     const credential = googleUser.authentication.idToken;
//     googleUserVerifyHandler({ credential });
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-start py-md-5 min-vh-100">
//       <div className="row d-flex register_container w-100 ">
//         {/* Leftside heading and hero image */}
//         <div className="col-lg-6 col-md-12 register_heading mb-auto">
//           <Link to="/">
//             <img className="backArrow" src={backArrow} alt="arrow_back" />
//           </Link>
//           <h3>Welcome back!</h3>
//           <img
//             src={RegisterIcon}
//             alt="register"
//             className="img-fluid"
//             loading="eager"
//           />
//         </div>

//         {/* Right side form */}
//         <div className="col-lg-6 col-md-12 register_heading_right">
//           {!isMobileApp && (
//             <Link className="d-lg-none" to="/">
//               <img className="backArrow" src={backArrow} alt="arrow_back" />
//             </Link>
//           )}
//           <span className="welcome w-100 text-center">Welcome back!</span>

//           <div className="login_buttons_row d-flex flex-column align-items-center gap-3">
//             <h1 className="mt-5">Login</h1>
//             <div className="d-flex flex-row justify-content-between align-items-center gap-4 gap-sm-5">
//               <Link to="">
//                 <button
//                   className={`login_btn ${
//                     !isInvestorSelected ? "startup" : ""
//                   } `}
//                   onClick={() => setIsInvestorSelected(false)}
//                 >
//                   Start Up
//                 </button>
//               </Link>
//               <Link to="">
//                 <button
//                   className={`login_btn ${
//                     isInvestorSelected ? "investor" : ""
//                   } `}
//                   onClick={() => setIsInvestorSelected(true)}
//                 >
//                   Investor
//                 </button>
//               </Link>
//             </div>
//           </div>

//           <h3 className="already_have_account" style={{ paddingTop: "0.5rem" }}>
//             Don't have an account?{" "}
//             <Link
//               to={"/signup"}
//               className={isInvestorSelected ? "green" : "orange"}
//             >
//               Create account
//             </Link>
//           </h3>

//           {show ? (
//             <div
//               className="verification_container"
//               style={{
//                 height: "300px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 marginTop: "2rem",
//               }}
//             >
//               <div className="login_content_main" style={{ boxShadow: "none" }}>
//                 <div className="login_content">
//                   <h2>Enter verification code</h2>
//                   <h6>
//                     We have just sent a verification code to your mobile number
//                   </h6>
//                   <div className="otp-container">
//                     {otp.map((value, index) => (
//                       <input
//                         key={index}
//                         type="text"
//                         value={value}
//                         onChange={(event) => handleOtpChange(event, index)}
//                         onKeyDown={(event) => handleOtpKeyDown(event, index)}
//                         className={`otp-box ${value !== "" ? "has-value" : ""}`}
//                         maxLength={1}
//                         ref={(inputRef) => {
//                           otpInputRefs.current[index] = inputRef;
//                         }}
//                       />
//                     ))}
//                   </div>
//                   <div
//                     onClick={async () => {
//                       const res = await sendOTP(inputValues.phoneNumber);
//                       setOrderId(res?.orderId);
//                       setOpen(true);
//                       setShow(true);
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <h3>Send the code again</h3>
//                   </div>
//                   <div
//                     onClick={() => {
//                       setShow(!show);
//                     }}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <h3>Change phone number</h3>
//                   </div>
//                   <div className="submit_btn mt-3">
//                     <button
//                       type="submit"
//                       className="btn btn-primary text-white"
//                       onClick={ValidateOtp}
//                     >
//                       Verify
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <form
//               onSubmit={handleFormSubmit}
//               className="d-flex flex-column gap-2"
//             >
//               <div className="row">
//                 <div className="col-md-12 col input-container">
//                   <label htmlFor="mobile">Mobile Number</label>
//                   <PhoneInput
//                     placeholder="Mobile Number"
//                     className="form-control plato_form_control rounded-3"
//                     defaultCountry="IN"
//                     countryCallingCodeEditable={false}
//                     initialValueFormat="national"
//                     autoComplete="off"
//                     onChange={(e) => handleInputChange(e, "phoneNumber")}
//                     value={inputValues.phoneNumber}
//                     countrySelectProps={{
//                       native: true,
//                       style: { display: "none" },
//                     }}
//                     international={false}
//                   />
//                 </div>
//               </div>

//               {/*<div className="row">
//               <div className="col-md-12">
//                 <label for="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="form-control rounded-3"
//                   required
//                   placeholder="Password"
//                   onChange={(e) => handleInputChange(e, "password")}
//                   value={inputValues.password}
//                 />
//               </div>
//                 </div>*/}
//               <div className="row mt-2">
//                 <div className="d-flex gap-2 p-2">
//                   <input
//                     type="checkbox"
//                     id="staySignedInCheckbox"
//                     checked={staySignedIn}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="staySignedInCheckbox">Stay signed in</label>
//                 </div>
//                 {/*<div className="col-md-12">
//                 <Link to={""} onClick={() => setShowResetPopUp(true)}>
//                   Forgot Password?
//                 </Link>
//               </div>*/}
//               </div>

//               {/* <div className="form-check">
//               <input
//                 type="checkbox"
//                 id="terms"
//                 name="terms"
//                 className="form-check-input"
//                 required
//               />
//               <label for="terms" className="form-check-label">
//                 I agree to the terms and conditions
//               </label>
//             </div> */}
//               <div className="submit_btn mt-3">
//                 <button
//                   type="submit"
//                   className={` ${isInvestorSelected ? "investor" : "startup"}`}
//                 >
//                   {loading ? (
//                     <SpinnerBS spinnerSizeClass="spinner-border-sm"></SpinnerBS>
//                   ) : (
//                     "Send OTP"
//                   )}
//                 </button>
//               </div>

//               <h3 className="already_have_account_mobile">
//                 I don't have an account? &nbsp;
//                 <Link to={"/signup"} style={{ color: "red" }}>
//                   Create account
//                 </Link>
//               </h3>
//             </form>
//           )}

//           <div className="line-container m-auto">
//             <hr className="line" />
//             <span className="text mx-2">OR</span>
//             <hr className="line" />
//           </div>
//           <div className="social-login-container d-flex flex-column justify-content-center">
//             {isMobileApp ? (
//               <img src={GIcon} alt="Google logo" onClick={googleLoginHandle} />
//             ) : (
//               <div id="googlesignin" className="mx-auto"></div>
//             )}
//             <button onClick={linkedInLogin} style={{border:"none",outline:"none"}}><img src={loinkdinLogo} alt="/"/></button>
//           </div>
//           {/* <div className="row">
//             <div className="col d-flex justify-content-center align-items-center login_icons">
//               <img src={GIcon} alt="image" />
//               <img src={FIcon} alt="image" />
//               <img src={AIcon} alt="image" />
//             </div>
//           </div> */}
//         </div>
//         {isLoginSuccessfull && !isInvestorSelected && (
//           <AfterSuccessPopUp onClose={handleClosePopup} login={true} />
//         )}
//         {open && (
//           <AfterSuccessPopUp
//             withoutOkButton
//             onClose={() => setOpen(!open)}
//             successText="OTP Send successfully to the mobile"
//           />
//         )}
//         {isLoginSuccessfull && isInvestorSelected && (
//           <InvestorAfterSuccessPopUp onClose={handleClosePopup} login={true} />
//         )}

//         {error && (
//           <ErrorPopUp
//             message={error}
//             onClose={setTimeout(() => {
//               setError(false);
//             }, 1000)}
//           />
//         )}

//         {showResetPopUp && (
//           <ResetPasswordPopUp onClose={handleCloseResetPopup} />
//         )}
//         {showErrorPopup && (
//           <ErrorPopUp
//             message={
//               "Invalid mobile number. Please enter a valid mobile number."
//             }
//             onClose={() => setShowErrorPopup(false)} // Add a handler to close the error popup
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import RegisterIcon from "../../Images/Group 21.svg";
import GIcon from "../../Images/Group 22.svg";
// import FIcon from "../../Images/Group 23.svg";
// import AIcon from "../../Images/Group 24.svg";
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
  const userVisitCount = localStorage.getItem("userVisit")
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
        if(!userVisitCount){
         localStorage.setItem("userVisit",1)
        }else{
          localStorage.setItem("userVisit",2)
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
      if(!userVisitCount){
        localStorage.setItem("userVisit",1)
       }else{
        localStorage.setItem("userVisit",2)
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
    <div className="container d-flex justify-content-center align-items-start py-md-5 min-vh-100">
      <div className="row d-flex register_container w-100 ">
        {/* Leftside heading and hero image */}
        <div className="col-lg-6 col-md-12 register_heading mb-auto">
          <Link to="/">
            <img className="backArrow" src={backArrow} alt="arrow_back" />
          </Link>
          <h3>Welcome back!</h3>
          <img
            src={RegisterIcon}
            alt="register"
            className="img-fluid"
            loading="eager"
          />
        </div>

        {/* Right side form */}
        <div className="col-lg-6 col-md-12 register_heading_right">
          {!isMobileApp && (
            <Link className="d-lg-none" to="/">
              <img className="backArrow" src={backArrow} alt="arrow_back" />
            </Link>
          )}
          <span className="welcome w-100 text-center">Welcome back!</span>

          <div className="login_buttons_row d-flex flex-column align-items-center gap-3">
            <h1 className="mt-5">Login</h1>
            <div className="d-flex flex-row justify-content-between align-items-center gap-4 gap-sm-5">
              <Link to="">
                <button
                  className={`login_btn ${
                    !isInvestorSelected ? "startup" : ""
                  } `}
                  onClick={() => setIsInvestorSelected(false)}
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
                >
                  Investor
                </button>
              </Link>
            </div>
          </div>

          <h3 className="already_have_account" style={{ paddingTop: "0.5rem" }}>
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className={isInvestorSelected ? "green" : "orange"}
            >
              Create account
            </Link>
          </h3>

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
                          <label htmlFor="text">Username/Email</label>
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
                          <label htmlFor="password">Password</label>
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
                          <label htmlFor="text">Username/Email</label>
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
                          <label htmlFor="password">Password</label>
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

          {show && (
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
          )}

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
            message={
              "Invalid mobile number. Please enter a valid mobile number."
            }
            onClose={() => setShowErrorPopup(false)} // Add a handler to close the error popup
          />
        )}
      </div>
    </div>
  );
};

export default Login;
