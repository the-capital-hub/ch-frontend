import { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import InvestorNavbar from "../../Investor/InvestorNavbar/InvestorNavbar";
import CreateCommunityChat from "../../../Images/Chat/CreateCommunityChat.png";
import "./NewCommunityMod.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { environment } from "../../../environments/environment";
import axios from 'axios';
import { getBase64 } from "../../../utils/getBase64";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { selectTheme } from "../../../Store/features/design/designSlice";
import communityPlaceholder from "../../../Images/communityPlaceholder.svg";

export default function NewCommunityModal() {

	const [selectedFile, setSelectedFile] = useState(null);
	const [previewImageUrl, setPreviewImageUrl] = useState("");
	const [communityName, setCommunityName] = useState("");
	const [communitySize, setCommunitySize] = useState("");
	const [isFree, setIsFree] = useState(true);
	const [subscriptionAmount, setSubscriptionAmount] = useState("");
	const baseUrl = environment.baseUrl;
	const loggedInUserId = useSelector(selectLoggedInUserId);
	const [isSuccess, setIsSuccess] = useState(false);
	const [communityUrl, setCommunityUrl] = useState("");
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const theme = useSelector(selectTheme);

	useEffect(() => {
		const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
		const root = document.documentElement;
		
		if (loggedInUser?.isInvestor) {
		  root.style.setProperty('--theme-color', '#d3f36b');
		  root.style.setProperty('--theme-hover-color', '#bcd95f');
		  root.style.setProperty('--current-theme-color', '#d3f36b');
		  root.style.setProperty('--current-theme-text-color', '#000000');
		} else {
		  root.style.setProperty('--theme-color', '#FF620E');
		  root.style.setProperty('--theme-hover-color', '#e55a0d');
		  root.style.setProperty('--current-theme-color', '#FF620E');
		  root.style.setProperty('--current-theme-text-color', '#FFFFFF');
		}
	  }, []);

	const getThemeStyles = () => ({
		backgroundColor: theme === 'light' ? '#ffffff' : '#060810',
		color: theme === 'light' ? '#000000' : '#FFFFFF'
	});

	const backButtonStyles = {
		color: theme === 'light' ? '#000000' : '#FFFFFF'
	};

	const svgStyles = {
		stroke: theme === 'light' ? '#000000' : '#FFFFFF'
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
		const imageUrl = URL.createObjectURL(file);
		setPreviewImageUrl(imageUrl);
	};

	const communitySizeOptions = [
		"Less than 100k",
		"100k-200k",
		"200k-500k",
		"500k+"
	];

	const handleCreateCommunity = async () => {
		if (!communityName || !communitySize) {
			toast.error('Please fill in all required fields');
			return;
		}

		setIsLoading(true);
		const communityData = {
			name: communityName,
			size: communitySize,
			subscription: isFree ? 'free' : 'paid',
			amount: isFree ? null : subscriptionAmount,
			adminId: loggedInUserId
		};

		if (selectedFile) {
			communityData.image = await getBase64(selectedFile);
		}

		const token = localStorage.getItem('accessToken');

		try {
			const response = await axios.post(
				`${baseUrl}/communities/createCommunity`,
				communityData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setCommunityUrl(`/community/${response.data.data._id}`);
			setIsSuccess(true);
			toast.success('Community created successfully!');
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed to create community');
		} finally {
			setIsLoading(false);
		}
	};

	if (isSuccess) {
		return (
			<div className="community-creation-page" style={{maxHeight: "80vh", ...getThemeStyles()}} data-theme={theme}>
				<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
				<InvestorNavbar />
				<div className="content-container">
					<div className="left-section">
						<div className="community-preview">
							<img 
								src={previewImageUrl || communityPlaceholder} 
								alt="Community" 
								className="community-image"
							/>
							<h2>{communityName}</h2>
							<div className="divider-line"></div>
							<p>
								{isFree 
									? "Any one can join for free" 
									: `Subscription: $${subscriptionAmount}`
								}
							</p>
						</div>
					</div>

					<div className="right-section success-content">
						<h1>Congrats! {communityName} is live!</h1>
						<div className="community-url-section">
							<label>Community Page URL</label>
							<span>{window.location.origin + communityUrl}</span>
							<button 
								className="continue-button"
								onClick={() => navigate(`${communityUrl}`)}
							>
								Continue
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="community-creation-page" style={{maxHeight: "80vh", marginTop:"3rem", ...getThemeStyles()}} data-theme={theme}>
			<ToastContainer 
				position="top-right" 
				autoClose={5000} 
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={theme}
			/>
			<InvestorNavbar />
			{/* <button className="back-button" style={backButtonStyles} data-bs-dismiss="modal">
				<BsArrowLeft style={svgStyles} /> Back
			</button> */}

			<div className="content-container">
				<div className="left-section">
					<input
						type="file"
						id="communityImage"
						hidden
						onChange={handleFileChange}
						accept="image/*"
					/>
					<label htmlFor="communityImage" className="image-upload-container">
						<img 
							src={previewImageUrl || communityPlaceholder} 
							alt="Community" 
						/>
					</label>
					<p className="business-text">Start Building Your Business</p>
				</div>

				<div className="right-section">
					<div className="question-block">
						<h3>What is the name of your community?</h3>
						<input
							type="text"
							className="modal__input p-2 rounded-2 w-100"
							value={communityName}
							onChange={(e) => setCommunityName(e.target.value)}
							placeholder="Community Name"
						/>
					</div>

					<div className="question-block">
						<h3>How big is your community?</h3>
						<div className="community-size-options">
							{communitySizeOptions.map((size) => (
								<div
									key={size}
									className={`size-option ${communitySize === size ? 'selected' : ''}`}
									onClick={() => setCommunitySize(size)}
								>
									{size}
								</div>
							))}
						</div>
					</div>

					<div className="question-block">
						<div className="subscription-container">
							<div className="checkbox-wrapper">
								<input
									type="checkbox"
									id="freeCommunity"
									checked={isFree}
									onChange={(e) => setIsFree(e.target.checked)}
								/>
								<label htmlFor="freeCommunity">Free Community</label>
							</div>

							{!isFree && (
								<div className="subscription-input">
									<span>Subscription Amount:</span>
									<input
										type="number"
										value={subscriptionAmount}
										onChange={(e) => setSubscriptionAmount(e.target.value)}
										placeholder="Enter amount"
									/>
								</div>
							)}
						</div>
					</div>

					<button 
						className="create-community-button" 
						onClick={handleCreateCommunity}
						disabled={isLoading}
					>
						{isLoading ? 'Creating...' : 'Create Community'}
					</button>
				</div>
			</div>
		</div>
	);
}
