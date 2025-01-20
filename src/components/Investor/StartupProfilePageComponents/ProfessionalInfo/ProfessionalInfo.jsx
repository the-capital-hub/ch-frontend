import React, { useState, useEffect } from "react";
import "./ProfessionalInfo.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	getUserConnections,
	postInvestorData,
	postStartUpData,
	updateUserAPI,
} from "../../../../Service/user";
import {
	selectCompanyName,
	selectIsInvestor,
	loginSuccess,
	updateUserCompany,
} from "../../../../Store/features/user/userSlice";
import ProfessionalInfoDisplay from "./ProfessionalInfoDisplay";
import avatar4 from "../../../../Images/avatars/image-1.png";

export default function ProfessionalInfo({ theme }) {
	// Fetch Global State
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const isInvestor = useSelector(selectIsInvestor);
	const companyName = useSelector(selectCompanyName);
	const [previewImage, setPreviewImage] = useState("");
	const [cropComplete, setCropComplete] = useState(false);
	const [croppedImage, setCroppedImage] = useState(null);
	const [followers, setFollowers] = useState(0);
	const dispatch = useDispatch();

	// console.log("companyName", companyName);

	// State for Professional Data
	const [professionalData, setProfessionalData] = useState({
		designation: loggedInUser?.designation || "",
		education: loggedInUser?.education || "",
		experience: loggedInUser?.experience || "",
		profilePicture: loggedInUser.profilePicture || avatar4,
		fullName: loggedInUser?.firstName + " " + loggedInUser?.lastName || "",
		company: loggedInUser?.companyName || companyName,
		location: loggedInUser?.location || " ",
		industry: loggedInUser?.industry || "Data Not Available",
		isInvestor: loggedInUser?.isInvestor || false,
		followers: loggedInUser?.connections || 0,
		userName: loggedInUser?.userName || " ",
		yearsOfExperience: loggedInUser?.yearsOfExperience || "",
		firstName: loggedInUser?.firstName || "",
		lastName: loggedInUser?.lastName || "",
	});

	// State for isEditing
	const [isEditing, setIsEditing] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);

	// Fetch professional data
	useEffect(() => {
		if (isInvestor) {
			setProfessionalData((prev) => ({ ...prev, company: companyName }));
		} else {
			setProfessionalData((prev) => ({ ...prev, company: companyName }));
		}
		getUserConnections(loggedInUser._id)
			.then((data) => {
				setFollowers(data.data.length);
			})
			.catch((err) => {
				console.log();
			});
	}, [companyName, isInvestor, loggedInUser._id]);

	// Handle Text Change
	function handleTextChange(e) {
		let { name, value } = e.target;
		setProfessionalData((prev) => {
			return { ...prev, [name]: value };
		});
	}

	// Handle File change
	function handleFileChange(e) {
		const file = e.target.files[0];
		const objectUrl = URL.createObjectURL(file);
		setSelectedFile(file);
		setCropComplete(false);
		// if (e.target.name === "image" && file.type.includes("image")) {
		setPreviewImage(objectUrl);
		//
		// }
	}

	// Handle Submit
	async function handleSubmit(e) {
		e.preventDefault();
		setLoading(true);
		console.log("Data", professionalData);

		let editedData = {
			firstName: professionalData.firstName,
			lastName: professionalData.lastName,
			userName: professionalData.userName,
			designation: professionalData.designation,
			education: professionalData.education,
			experience: professionalData.experience,
			industry: professionalData.industry,
		};

		try {
			// if (selectedFile) {
			//   const profilePicture = await getBase64(selectedFile);
			//   editedData = { ...editedData, profilePicture: profilePicture };
			// }
			//console.log(croppedImage);
			if (croppedImage) {
				// const profilePicture = await getBase64(croppedImage);
				const profilePicture = croppedImage;

				editedData = { ...editedData, profilePicture: profilePicture };
			}
			//   console.log("from Submit", editedData, editedCompanyName);
			const {
				data: { data },
			} = await updateUserAPI(editedData);
			// Set new loggedInUser data
			dispatch(loginSuccess(data));
			// Set local state
			setProfessionalData((prev) => ({
				...prev,
				designation: data?.designation,
				education: data?.education,
				experience: data?.experience,
				yearsOfExperience: data?.yearsOfExperience,
				industry: data?.industry,
				profilePicture: data?.profilePicture,
				fullName: data?.firstName + " " + data?.lastName,
				location: data?.location,
				userName: data?.userName,
			}));

			if (isInvestor) {
				let editedCompanyName = {
					founderId: loggedInUser._id,
					companyName: professionalData.company,
				};
				const { data } = await postInvestorData(editedCompanyName);
				// console.log("post Investor", data);
				dispatch(updateUserCompany({ companyName: data.companyName }));
			} else {
				let editedCompanyName = {
					founderId: loggedInUser._id,
					company: professionalData.company,
				};
				const { data } = await postStartUpData(editedCompanyName);
				// console.log("post startup", data.company);
				dispatch(updateUserCompany({ company: data.company }));
			}
		} catch (error) {
			console.log();
		} finally {
			alert("Profile Updated Successfully");
			setIsEditing(false);
			setLoading(false);
			setSelectedFile(null);
			setCropComplete(false);
			setPreviewImage("");
		}
	}

	return (
		<section
			className={`professional_info_section d-flex flex-column gap-3 p-2 px-md-4 py-4  shadow-sm ${
				theme === "investor" ? "rounded-2 border" : "rounded-2"
			}`}
		>
			<ProfessionalInfoDisplay
				theme={theme}
				professionalData={professionalData}
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				selectedFile={selectedFile}
				handleTextChange={handleTextChange}
				handleFileChange={handleFileChange}
				handleSubmit={handleSubmit}
				loading={loading}
				previewImage={previewImage}
				cropComplete={cropComplete}
				setCropComplete={setCropComplete}
				croppedImage={croppedImage}
				setCroppedImage={setCroppedImage}
				detail={false}
				//followers={followers}
			/>
		</section>
	);
}
