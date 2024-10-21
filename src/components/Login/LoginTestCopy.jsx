import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import RegisterIcon from "../../Images/Group 21.svg";
import GIcon from "../../Images/Group 22.svg";
import { FcGoogle } from "react-icons/fc";
import FIcon from "../../Images/Group 23.svg";
import { FiEye as Eye } from "react-icons/fi";
import { FiEyeOff as EyeOff } from "react-icons/fi";
import { RiCloseLine as X } from "react-icons/ri";
import indiaFlag from "../../Images/indiaFlag.png";
import otpBanner from "../../Images/otpBanner.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	googleLoginAPI,
	postResetPaswordLink,
	postUserLogin,
	sendOTP,
	verifyOTP,
} from "../../Service/user";
import {
	loginSuccess,
	loginFailure,
} from "../../Store/features/user/userSlice";
import { fetchCompanyData } from "../../Store/features/user/userThunks";
import { fetchAllChats } from "../../Store/features/chat/chatThunks";
import "./loginTest.scss";

function OtpVerificationModal({ isOpen, onClose, onVerify }) {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = React.useRef([]);

	React.useEffect(() => {
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

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
			<div
				className="bg-white rounded-lg shadow-xl p-6 relative flex md:flex-row flex-col"
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
						<button className="text-green-500 hover:underline">
							Send the code again
						</button>
						<button className="text-blue-500 hover:underline">
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

export default function LoginTest() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loginType, setLoginType] = useState("mobile");
	const [showPassword, setShowPassword] = useState(false);
	const [accountType, setAccountType] = useState("startup");
	const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
	const [error, setError] = useState(null);
	const [isLoginSuccessfull, setIsLoginSuccessfull] = useState(false);
	const [isInvestorSelected, setIsInvestorSelected] = useState(false);
	const [userVisitCount, setUserVisitCount] = useState(0);

	const handleGoogleLoginSuccess = (credentialResponse) => {
		googleLoginAPI(credentialResponse.credential).then((response) => {
			if (response.status === 200) {
				console.log("Google Sign-In successful. Response:", response);
				// Redirect to the desired page
				const isInvestorSelected = false;
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
					console.log("response", response);
					if (!isInvestorSelected && response.data.isInvestor === "true") {
						setError("Invalid credentials");
						return;
					}
					if (isInvestorSelected && response.data.isInvestor === "false") {
						setError("Invalid credentials");
						return;
					}

					const storedAccountsKey =
						response.data.isInvestor === "true"
							? "InvestorAccounts"
							: "StartupAccounts";
					const storedAccounts =
						JSON.parse(localStorage.getItem(storedAccountsKey)) || [];
					const isAccountExists = storedAccounts.some(
						(account) => account.data?._id === user?._id
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

						if (!response.data.isInvestor) navigate("/home");
						else navigate("/investor/home");
					}, 2000);

					dispatch(loginSuccess(response?.data));

					console.log("Is Investor:", response?.data?.isInvestor);
					let isInvestor = response?.data?.isInvestor === "true" ? true : false;
					if (isInvestor) {
						dispatch(fetchCompanyData(response?.data?.investor, isInvestor));
					} else {
						dispatch(fetchCompanyData(response?.data?._id, isInvestor));
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

	const handleSendOtp = () => {
		// Add your OTP sending logic here
		setIsOtpModalOpen(true);
	};

	const handleVerifyOtp = (otp) => {
		// Add your OTP verification logic here
		console.log("Verifying OTP:", otp);
		setIsOtpModalOpen(false);
		// Proceed with login or show error
	};

	return (
		<GoogleOAuthProvider
			clientId={
				"1090009111033-oege754cikmlmrf1cgj71t7g2q1ggr47.apps.googleusercontent.com"
			}
		>
			<div className="flex lg:flex-row flex-col overflow-hidden">
				{/* Left Column */}
				<div className="lg:w-1/2 bg-pink-50 flex flex-col items-center justify-center p-5">
					<img
						src={RegisterIcon}
						alt="Rocket illustration"
						width={300}
						height={300}
						className="mb-8"
					/>
					<h2 className="text-4xl font-bold mb-4">New Here ?</h2>
					<p className="text-xl mb-8">Create an account here</p>
					<button
						className="bg-orange-500 text-white py-1 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300"
						style={{ width: 225, height: 41.6 }}
					>
						Create account
					</button>
				</div>

				{/* Right Column */}
				<div className="lg:w-1/2 bg-white flex flex-col p-5">
					<h1 className="text-4xl font-bold mb-6">Login to your account</h1>

					<div className="flex space-x-4 mb-6">
						<button
							className={`flex-1 py-2 px-4 rounded-full font-semibold ${
								accountType === "startup"
									? "bg-orange-500 text-white"
									: "bg-white text-black border border-gray-300"
							}`}
							onClick={() => setAccountType("startup")}
						>
							Start Up
						</button>
						<button
							className={`flex-1 py-2 px-4 rounded-full font-semibold ${
								accountType === "investor"
									? "bg-orange-500 text-white"
									: "bg-white text-black border border-gray-300"
							}`}
							onClick={() => setAccountType("investor")}
						>
							Investor
						</button>
					</div>

					<p className="text-center mb-4">Login using social networks</p>

					<div className="flex justify-center space-x-4 mb-6">
						<GoogleLogin
							onSuccess={handleGoogleLoginSuccess}
							onError={handleGoogleLoginError}
							useOneTap
						/>
						{/* <button className="p-2 bg-white border border-gray-300 rounded-full">
							<img src={FIcon} alt="Facebook" width={24} height={24} />
						</button> */}
					</div>

					{error && <p className="text-red-500 text-center mb-4">{error}</p>}

					<div className="flex items-center mb-6">
						<div className="flex-grow border-t border-gray-300"></div>
						<span className="flex-shrink mx-4 text-gray-600">Or</span>
						<div className="flex-grow border-t border-gray-300"></div>
					</div>

					<button
						className="bg-orange-500 text-white py-2 px-4 rounded-full font-semibold border border-gray-300 mb-6 flex justify-between items-center mx-auto"
						style={{
							width: "225px",
							boxShadow:
								"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
						}}
						onClick={() =>
							setLoginType(loginType === "mobile" ? "email" : "mobile")
						}
					>
						{loginType === "mobile"
							? "Use Email/Username"
							: "Use Mobile Number"}
					</button>

					{loginType === "mobile" ? (
						<div className="space-y-4 mb-8">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<img
										src={indiaFlag}
										alt="India flag"
										width={30}
										height={20}
									/>
								</div>
								<input
									type="tel"
									placeholder="Mobile Number"
									className="w-full pl-12 pr-3 py-3 border border-gray-300 rounded-full"
								/>
							</div>
						</div>
					) : (
						<div className="space-y-4 mb-8">
							<input
								type="text"
								placeholder="Email / Username"
								className="w-full px-4 py-3 border border-gray-300 rounded-full"
							/>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									className="w-full px-4 py-3 border border-gray-300 rounded-full"
								/>
								<button
									className="absolute right-4 top-1/2 transform -translate-y-1/2"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-500" />
									) : (
										<Eye className="h-5 w-5 text-gray-500" />
									)}
								</button>
							</div>
						</div>
					)}

					<div className="flex justify-between items-center mb-8">
						<label className="flex items-center">
							<input type="checkbox" className="mr-2" />
							<span>Stay signed in</span>
						</label>
						{loginType === "email" && (
							<Link to="#" className="text-orange-500 hover:underline">
								Forgot Password?
							</Link>
						)}
					</div>

					<button
						className="bg-orange-500 text-white py-1 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition duration-300 mx-auto"
						style={{ width: "225px", height: "41.6px" }}
						onClick={loginType === "mobile" ? handleSendOtp : null}
					>
						{loginType === "mobile" ? "Send OTP" : "Login"}
					</button>
				</div>

				<OtpVerificationModal
					isOpen={isOtpModalOpen}
					onClose={() => setIsOtpModalOpen(false)}
					onVerify={handleVerifyOtp}
				/>
			</div>
		</GoogleOAuthProvider>
	);
}
