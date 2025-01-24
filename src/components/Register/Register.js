import React, { useEffect, useRef, useState } from "react";
import "./register.scss";
import { IoCloseSharp } from "react-icons/io5";
import { getBase64 } from "../../utils/getBase64";
import otpBanner from "../../Images/otpBanner.png";
import { RiCloseLine as X } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
	sendOTP,
	verifyOTP,
	googleRegisterApi,
	postStartUpData,
	postInvestorData,
} from "../../Service/user";

// imports for implementing login with google
import { GoogleOAuthProvider } from "@react-oauth/google";
import { loginSuccess } from "../../Store/features/user/userSlice";
import { useDispatch } from "react-redux";
import CreateCommunityChat from "../../Images/Chat/CreateCommunityChat.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import Avatar1 from '../../Images/avatars/image.png';
import Avatar2 from '../../Images/avatars/image-2.png';
import Avatar3 from '../../Images/avatars/image-3.png';
import Avatar4 from '../../Images/avatars/image-4.png';
import Avatar5 from '../../Images/avatars/image-1.png';
import { environment } from "../../environments/environment";
import { Toaster } from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

// OTP Verification Modal
function OtpVerificationModal({
	isOpen,
	setOpen,
	setShow,
	onClose,
	onVerify,
	inputValues,
	setOrderId,
	signupMethod,
	handleSendEmailOTP
}) {
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const [isVerifying, setIsVerifying] = useState(false);

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

	const handleVerify = async () => {
		if (otp.join("").length === 6) {
			setIsVerifying(true);
			try {
				await onVerify(otp);
			} catch (error) {
				toast.error(error.message || "Failed to verify OTP");
			} finally {
				setIsVerifying(false);
			}
		} else {
			toast.error("Please enter a valid 6-digit OTP");
		}
	};

	if (!isOpen) return null;
	const handleOtpChange = async () => {
		try {
			if(signupMethod === 'phone'){
			const response = await sendOTP(inputValues.phoneNumber);
			setOrderId(response?.orderId);
			setOpen(true);
			setShow(true);
		}
		else if(signupMethod === 'email'){
			await handleSendEmailOTP(inputValues.email);
		}
		} catch (error) {}
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
						We have just sent a verification code to your {signupMethod === 'phone' ? 'mobile number' : 'email'}.
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
						{signupMethod === 'phone' && <button onClick={onClose} className="Change_Number_btn">
							Change phone number
						</button>}
					</div>
					<button onClick={handleVerify} className="Modal_Verify_btn active" disabled={isVerifying}>
						{isVerifying ? (
							<div className="spinner-border spinner-border-sm text-light" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						) : (
							"Verify"
						)}
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

const Register = ({isRawUser = false, setShowSignupModal, rawUser}) => {
	const dispatch = useDispatch();
	const [isMobileVerified, setIsMobileVerified] = useState(false);
	const [inputValues, setInputValues] = useState({
		firstName: rawUser?.firstName || "",
		lastName: rawUser?.lastName || "",
		email: rawUser?.email || "",
		password: "",
		phoneNumber: rawUser?.phoneNumber || "",
		designation: rawUser?.designation || "",
		gender: rawUser?.gender || "",
		linkedin: rawUser?.linkedin || "",
		profilePicture: rawUser?.profilePicture || "",
	});
	const [companyDetail, setCompanyDetail] = useState({
		company: "",
	});
	const [show, setshow] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isInvestorSelected, setIsInvestorSelected] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [previewImageUrl, setPreviewImageUrl] = useState("");
	const [showCompanyPopup, setShowCompanyPopup] = useState(false);
	const [loading, setLoading] = useState(false);
	const [previewLogoUrl, setPreviewLogoUrl] = useState("");
	const [signupMethod, setSignupMethod] = useState('email'); // 'email' or 'phone'
	const [companyDetailsAdded, setCompanyDetailsAdded] = useState(false);
	const [formDetails, setFormDetails] = useState({
		companyName: "",  // For investors
		company: "",      // For startups
		description: "",
		location: "",
		website: "",
		minimumInvest: "",  // Investor-specific
		maximumInvest: "",  // Investor-specific
		sector: "",      // Startup-specific
		fundingStage: "", // Startup-specific
		logo: null,  // Added logo to formDetails
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setInputValues(prev => ({
			...prev,
			firstName: 'Your',
			lastName: 'Name'
		}));
	}, []);

	const handleUserTypeToggle = (type) => {
		setIsInvestorSelected(type === 'investor');
	};

	const handleSignupMethodToggle = (method) => {
		setSignupMethod(method);
	};

	const handleInputChange = (event, type) => {
		const { name, value } = event.target;
		if (name === "phoneNumber") {
			// Remove any non-digit characters
			const cleanedValue = value.replace(/\D/g, '');
			setInputValues({ ...inputValues, [name]: cleanedValue });
		} else {
			setInputValues({ ...inputValues, [name]: value });
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		
		if (signupMethod === 'phone') {
			if (!isValidMobileNumber(inputValues.phoneNumber)) {
				toast.error("Please enter a valid 10-digit mobile number");
				return;
			}
		} else if (signupMethod === 'email') {
			if (!inputValues.email) {
				toast.error("Please enter a valid email");
				return;
			}
		}

		setIsSubmitting(true);
		try {
			if (signupMethod === 'phone') {
				const phoneWithPrefix = `+91${inputValues.phoneNumber}`;
				const res = await sendOTP(phoneWithPrefix);
				if (res?.orderId) {
					setOrderId(res.orderId);
					setIsModalOpen(true);
					setshow(true);
					toast.success("OTP sent successfully");
				}
			} else if (signupMethod === 'email') {
				await handleSendEmailOTP(inputValues.email);
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Error sending OTP");
		} finally {
			setIsSubmitting(false);
		}
	};

	const navigate = useNavigate();
	const isValidMobileNumber = (phoneNumber) => {
		// Remove any non-digit characters and +91 prefix
		const cleanedNumber = phoneNumber.replace(/\D/g, '');
		
		// Check if the number is exactly 10 digits
		return cleanedNumber.length === 10;
	};
	// Validate OTP
	const ValidateOtp = async (otp) => {
		try {
			const verificationCode = otp.join("");
			if (signupMethod === 'phone') {
				const res = await verifyOTP({
					otp: verificationCode,
					orderId,
					phoneNumber: `+91${inputValues.phoneNumber}`,
				});

				if (res.isOTPVerified) {
					const response = await googleRegisterApi({
						...inputValues,
						...formDetails,
						isInvestor: isInvestorSelected,
					});

					if (response.status === 200) {
						const userId = response.user._id;

						if (formDetails.companyName || formDetails.company) {
							if (isInvestorSelected) {
								await postInvestorData(userId, companyDetail);
							} else {
								await postStartUpData(userId, companyDetail);
							}
						}

						dispatch(loginSuccess(response?.user));
						toast.success("Registration successful!");
						navigate(isInvestorSelected ? "/investor/home" : "/home");
						setIsMobileVerified(true);
						setshow(false);
					} else {
						throw new Error("Something went wrong. Please try again.");
					}
				} else {
					throw new Error("Invalid OTP");
				}
			} else if (signupMethod === 'email') {
				const emailOtpResponse = await handleEmailOtpVerify(otp, orderId);
				if(emailOtpResponse.success === true){
					// Create account first
					const response = await googleRegisterApi({
						...inputValues,
						isInvestor: isInvestorSelected,
					});

					if (response.status === 200) {
						const userId = response.user._id; 
						
						if(formDetails.companyName || formDetails.company){
							if (isInvestorSelected) {
								await postInvestorData({...formDetails, founderId: userId});
							} else {
								await postStartUpData({...formDetails, founderId: userId});
							}
						}

						// Log the user in
						dispatch(loginSuccess(response?.user));
						navigate(isInvestorSelected ? "/investor/home" : "/home");
						setIsMobileVerified(true);
						setshow(false);
					}
					else{		
						throw new Error("Something went wrong. Please try again.");
					}
				}	
				else{
					throw new Error("Invalid OTP");
				}
			}
		} catch (error) {
			toast.error(error.message || "Error validating OTP");
			throw error;
		}
	};

	useEffect(() => {
		document.title = "Register | The Capital Hub";
	}, []);


	const handleFileChange = async (event) => {
		const file = event.target.files[0];
		const image = await getBase64(file);
		setInputValues(prev => ({
			...prev,
			profilePicture: image
		}));
		const imageUrl = URL.createObjectURL(file);
		setPreviewImageUrl(imageUrl);
	};

	const handleLogoChange = async (event) => {
		const file = event.target.files[0];
		const image = await getBase64(file);
		setFormDetails(prev => ({
			...prev,
			logo: image
		}));
		const logoUrl = URL.createObjectURL(file);
		setPreviewLogoUrl(logoUrl);
	};

	const handleCompanyDetailsSubmit = async () => {
		try {
			setLoading(true);
			if(formDetails.companyName || formDetails.company ){
			setCompanyDetailsAdded(true); 
			}
			setShowCompanyPopup(false);
		} catch (error) {
			console.error('Error saving company details:', error);
		} finally {
			setLoading(false);
		}
	};

	// Update company details form
	const CompanyDetailsForm = ({ isInvestor, setShowCompanyPopup, formDetails, setFormDetails, handleLogoChange, previewLogoUrl, setPreviewLogoUrl }) => {
		// Add sector and funding stage options
		const sectorOptions = [
			"Fintech",
			"Healthcare",
			"E-commerce",
			"EdTech",
			"AI/ML",
			"SaaS",
			"CleanTech",
			"IoT",
			"Blockchain",
			"Other"
		];

		const fundingStageOptions = [
			"Pre-seed",
			"Seed",
			"Series A",
			"Series B",
			"Series C",
			"Series D+",
			"Growth",
			"IPO Ready"
		];

		const handleInputChange = (e, field) => {
			setFormDetails(prev => ({
				...prev,
				[field]: e.target.value
			}));
		}

		return (
			<div className="company-details-popup">
				<div className="popup-content">
					<button className="close-popup-btn" onClick={() => setShowCompanyPopup(false)}>
						<IoCloseSharp size={24} />
					</button>
					<h3 style={{ color: isInvestor ? '#d3f36b' : '#fd5901' }}>
						{isInvestor ? 'Add Investor Details' : 'Add Startup Details'}
					</h3>

					{/* Logo Upload Section */}
					<div className={previewLogoUrl ? 'logo-preview' : 'image-upload-container'}>
						{previewLogoUrl ? (
							<>
								<img 
									src={previewLogoUrl}
									alt="Company Logo" 
									className="logo-image"
								/>
								<button 
									className="remove-logo"
									onClick={() => {
										setPreviewLogoUrl('');
										setFormDetails(prev => ({
											...prev,
											logo: null
										}));
									}}
								>
									<IoCloseSharp size={16} />
								</button>
							</>
						) : (
							<label htmlFor="companyLogo" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={!isInvestor? "#fd5901" : "#d3f36b"} strokeWidth="2">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
									<polyline points="17 8 12 3 7 8" />
									<line x1="12" y1="3" x2="12" y2="15" />
								</svg>
							</label>
						)}
					</div>
					<input
						type="file"
						id="companyLogo"
						hidden
						onChange={handleLogoChange}
						accept="image/*"
					/>

					{/* Form Fields */}
					<input
						type="text"
						placeholder="Company Name"
						value={isInvestor ? formDetails.companyName : formDetails.company}
						onChange={(e) => handleInputChange(e, isInvestor ? "companyName" : "company")}
					/>

					<input
						type="text"
						placeholder="Location"
						value={formDetails.location}
						onChange={(e) => handleInputChange(e, "location")}
					/>

					<input
						type="text"
						placeholder="Website"
						value={formDetails.website}
						onChange={(e) => handleInputChange(e, "website")}
					/>

					{isInvestor ? (
						<>
							<input
								type="number"
								placeholder="Minimum Investment Amount"
								value={formDetails.minimumInvest}
								onChange={(e) => handleInputChange(e, "minimumInvest")}
							/>
							<input
								type="number"
								placeholder="Maximum Investment Amount"
								value={formDetails.maximumInvest}
								onChange={(e) => handleInputChange(e, "maximumInvest")}
							/>
						</>
					) : (
						<>
							<select
								value={formDetails.sector}
								onChange={(e) => handleInputChange(e, "sector")}
							>
								<option value="">Select Sector</option>
								{sectorOptions.map((sector) => (
									<option key={sector} value={sector}>{sector}</option>
								))}
							</select>

							<select
								value={formDetails.fundingStage}
								onChange={(e) => handleInputChange(e, "fundingStage")}
							>
								<option value="">Select Funding Stage</option>
								{fundingStageOptions.map((stage) => (
									<option key={stage} value={stage}>{stage}</option>
								))}
							</select>
						</>
					)}

					<textarea
						placeholder="Description"
						value={formDetails.description}
						onChange={(e) => handleInputChange(e, "description")}
					/>

					<button 
						className="save-btn" 
						onClick={handleCompanyDetailsSubmit}
					>
						Save Details
					</button>
				</div>
			</div>
		);
	};

	const handleSendEmailOTP = async () => {
		try {
			const response = await axios.post(`${environment.baseUrl}/users/send-mail-otp`, {
				email: inputValues.email
			});
			if (response.data.orderId) {
				setOrderId(response.data.orderId);
				setIsModalOpen(true);
				setshow(true);
				toast.success('OTP sent to your email');
			}
		} catch (error) {
			toast.error('Failed to send OTP');
			console.error('Error sending email OTP:', error);
		}
	};

	const handleEmailOtpVerify = async (otp, orderId) => {
		try {
			const response = await axios.post(`${environment.baseUrl}/users/verify-mail-otp`, {
				otp: otp.join(""),
				orderId: orderId
			});
			if(response.data.success){
				toast.success('Email OTP verified successfully');
				return response.data;
			}
		} catch (error) {
			console.error('Error verifying email OTP:', error);
			return { success: false, message: 'Error verifying email OTP' };
		}
	};

	useEffect(() => {
		document.documentElement.className = isInvestorSelected ? 'investor-theme' : '';
	}, [isInvestorSelected]);

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
			<div className="register_container">
				{isRawUser ? (
					<button className="back-button" onClick={() => setShowSignupModal(false)}>
						<IoCloseCircleOutline />
					</button>
				) : (
					<button className="register-back-button" onClick={handleBack}>
						<IoArrowBack />
						<span>Back</span>
					</button>
				)}
				<Toaster 
					position="top-right"
					toastOptions={{
						duration: 5000,
						style: {
							background: '#363636',
							color: '#fff',
						},
					}}
				/>
				<div className="register_container_left">
					<div className="profile-section">
						<div className="image-upload-container">
							<input
								type="file"
								id="profilePicture"
								hidden
								onChange={handleFileChange}
								accept="image/*"
							/>
							<label htmlFor="profilePicture">
								<img 
									src={previewImageUrl || CreateCommunityChat} 
									alt="Profile" 
								/>
							</label>
						</div>
						
						<div className="avatar-display">
							<img src={Avatar1} alt="Avatar 1" className="avatar-image" />
							<img src={Avatar2} alt="Avatar 2" className="avatar-image" />
							<img src={Avatar3} alt="Avatar 3" className="avatar-image" />
							<img src={Avatar4} alt="Avatar 4" className="avatar-image" />
							<img src={Avatar5} alt="Avatar 5" className="avatar-image" />
						</div>
						
						<p className="community-message">
							Join India's biggest community of startups and investors
						</p>
					</div>
				</div>

				<div className="register_container_right">
					<div className="user-type-toggle">
						<button 
							className={`toggle-btn startup ${!isInvestorSelected ? 'active' : ''}`}
							onClick={() => handleUserTypeToggle('startup')}
						>
							Startup
						</button>
						<button 
							className={`toggle-btn investor ${isInvestorSelected ? 'active' : ''}`}
							onClick={() => handleUserTypeToggle('investor')}
						>
							Investor
						</button>
					</div>

					<div className="signup-method-toggle">
						<button 
							className={`method-btn ${signupMethod === 'email' ? 'active' : ''}`}
							onClick={() => handleSignupMethodToggle('email')}
						>
							Sign up with Email
						</button>
						<button 
							className={`method-btn ${signupMethod === 'phone' ? 'active' : ''}`}
							onClick={() => handleSignupMethodToggle('phone')}
						>
							Sign up with Phone
						</button>
					</div>

					<form onSubmit={handleFormSubmit}>
						<div className="form-group">
							{signupMethod === 'email' ? (
								<input
									type="email"
									name="email"
									placeholder="Email"
									value={inputValues.email}
									onChange={handleInputChange}
								/>
							) : (
								<input
									type="tel"
									name="phoneNumber"
									placeholder="Mobile Number"
									value={inputValues.phoneNumber}
									onChange={handleInputChange}
								/>
							)}
						</div>

						{companyDetailsAdded && (
				<div className="company-details-added">
					{isInvestorSelected ? "Investor details added!" : "Startup details added!"}
				</div>
			)}

						<button 
							type="button"
							className={`add-company-details-btn ${isInvestorSelected ? 'investor' : 'startup'}`}
							onClick={() => setShowCompanyPopup(true)}
						>
							{isInvestorSelected ? 'Add Investor Details' : 'Add Startup Details'}
						</button>

						<button type="submit" className="submit-btn" disabled={isSubmitting}>
							{isSubmitting ? (
								<div className="spinner-border spinner-border-sm text-light" role="status">
									<span className="visually-hidden">Loading...</span>
								</div>
							) : (
								"Create Account"
							)}
						</button>
					</form>

					{!isRawUser && (
						<div className="login-redirect">
							<span>Already have an account?</span>
							<Link to="/login">Login here</Link>
						</div>
					)}
				</div>
			</div>

			{/* Add OTP Modal */}
			<OtpVerificationModal
				isOpen={isModalOpen}
				setOpen={setIsModalOpen}
				setShow={setshow}
				onClose={() => setIsModalOpen(false)}
				onVerify={ValidateOtp}
				inputValues={inputValues}
				setOrderId={setOrderId}
				signupMethod={signupMethod}
				handleSendEmailOTP={handleSendEmailOTP}
			/>

			{/* Company Details Popup */}
			{showCompanyPopup && (
				<CompanyDetailsForm
					isInvestor={isInvestorSelected}
					setShowCompanyPopup={setShowCompanyPopup}
					formDetails={formDetails}
					setFormDetails={setFormDetails}
					handleLogoChange={handleLogoChange}
					previewLogoUrl={previewLogoUrl}
					setPreviewLogoUrl={setPreviewLogoUrl}
				/>
			)}
		</GoogleOAuthProvider>
	);
};

export default Register;
