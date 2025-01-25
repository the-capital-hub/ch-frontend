import React, { useState } from "react";
import CompanyInfo from "./company-section-one/company-info/CompanyInfo";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
import CompanyActions from "./company-section-one/company-actions/CompanyActions";
import CompanyStats from "./company-section-one/company-stats/CompanyStats";
import PublicLinks from "./company-section-two/public-links/PublicLinks";
import FoundingTeam from "./company-section-two/founding-team/FoundingTeam";
import KeyFocus from "./company-section-two/key-focus/KeyFocus";
import CompanyAbout from "./company-section-one/company-about/CompanyAbout";
import "./CompanyProfile.scss";
import SelectCommitmentModal from "../MyStartupsComponents/SelectCommitmentModal/SelectCommitmentModal";
import {
	useLocation,
} from "react-router-dom";
import { deleteStartUp, updateStartUpData } from "../../../Service/user";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import PasswordModal from "../MyStartupsComponents/DeleteModal";
import { postUserLogin } from "../../../Service/user";
import API from "../../../api";
import { Button, Form } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

export default function CompanyProfile({
	isOnelink,
	companyData,
	investorData,
	startup = "false",
	short,
	isStartup = "true",
	pageName,
	show,
	theme,
	setCompanyData,
	companyDelete,
	isAdmin,
	onCompanyUpdate,
}) {
	const { pathname } = useLocation();
	const [open, setOpen] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [password, setPassword] = useState("");
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editFormData, setEditFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Fetch Company Data here
	let name = "NA";
	let logo = DefaultAvatar;
	let location = "NA";
	let description = "No description";
	let socialLinks = {
		website: "",
		facebook: "",
		twitter: "",
		linkedin: "",
	};
	let colorCard = "";
	let foundedIn = "NA";
	let vision = "";
	let mission = "";
	let noOfEmployees = "";
	let team = [];
	let tags = [];
	let tagline = "";
	let tam = "";
	let sam = "";
	let som = "";
	let founderId = "";
	let industry = "";
	let lastFunding = "";
	let stage = "";
	let sector = "";

	// Interests Data
	let interestData = {
		logo: "",
		name: "",
		ask: "",
		commitment: "",
		investedEquity: "",
		companyId: "",
		companyOnelink: "",
	};

	if (companyData) {
		name = companyData.company || name;
		logo = companyData.logo || logo;
		location = companyData.location || location;
		description = companyData.description || description;
		socialLinks = companyData.socialLinks || socialLinks;
		colorCard = companyData.colorCard || colorCard;
		foundedIn = companyData.startedAtDate || foundedIn;
		vision = companyData.vision || vision;
		mission = companyData.mission || mission;
		noOfEmployees = companyData.noOfEmployees || noOfEmployees;
		team = companyData.team || team;
		tags = companyData.keyFocus?.split(",").map((tag) => tag.trim()) || tags;
		tagline = companyData.tagline || tagline;
		tam = companyData.TAM || "";
		sam = companyData.SAM || "";
		som = companyData.SOM || "";
		founderId = companyData.founderId || "";
		lastFunding = companyData?.lastFunding || "";
		stage = companyData?.stage || "";
		sector = companyData?.sector || "";
		industry = companyData?.industryType || "";

		interestData = {
			logo: companyData?.logo,
			name: companyData?.company,
			ask: companyData?.colorCard?.fund_ask,
			commitment: "",
			investedEquity: "",
			companyId: companyData?._id,
			companyOnelink: companyData?.oneLink,
		};
	}
	if (investorData) {
		name = investorData.companyName || name;
		logo = investorData.logo || logo;
		location = investorData.location || location;
		description = investorData.description || description;
		socialLinks = investorData.socialLinks || socialLinks;
		colorCard = investorData.colorCard || colorCard;
		foundedIn = investorData.startedAtDate || foundedIn;
		vision = investorData.vision || vision;
		mission = investorData.mission || mission;
		noOfEmployees = investorData.noOfEmployees || noOfEmployees;
		team = investorData.team || team;
		tags = investorData.keyFocus?.split(",").map((tag) => tag.trim()) || tags;
		tagline = investorData.tagline || tagline;
		founderId = investorData?.founderId || "";
		industry = investorData?.industry || "";
		lastFunding = investorData?.lastFunding || "";
		stage = investorData?.stage || "";
		sector = companyData?.sector || "";
	}

	const deleteCompany = async () => {
		try {
			const response = await deleteStartUp(companyData?._id);
			if (response.delete_status) {
				setCompanyData({});
			}
		} catch (err) {
			console.log();
		}
	};

	const handleDeleteCompany = () => {
		setIsModalOpen(true);
	};

	const handleConfirmPassword = async (enteredPassword) => {
		try {
			setPassword(enteredPassword);
			const response = await fetch(API.loginUser, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phoneNumber: loggedInUser.email,
					password: enteredPassword,
				}),
			});

			if (response.ok) {
				deleteCompany();
				setIsModalOpen(false); // Close the modal
			} else {
				alert("Incorrect Password, Try again");
			}
		} catch (err) {
			console.log();
		}
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await updateStartUpData(editFormData);
			if (response.status) {
				const updatedCompany = { ...companyData, ...editFormData };
				
				if (onCompanyUpdate) {
					onCompanyUpdate(updatedCompany);
				}
				
				setShowEditModal(false);
				toast.success("Startup updated successfully!");
			} else {
				toast.error("Failed to update startup");
			}
		} catch (err) {
			console.error(err);
			toast.error("An error occurred while updating startup");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="company__profile  shadow-sm" startup={startup}>
				{isAdmin && (
					<Button 
						className="edit-button"
						onClick={() => {
							setEditFormData(companyData);
							setShowEditModal(true);
						}}
					>
						<FaEdit />
					</Button>
				)}
				<div className="company__section__one border-bottom d-flex flex-column gap-4 p-3 p-md-5">
					{/* <h5 className="ms-auto m-0 p-0 " onClick={() => navigate(isInvestor === "true" ? "/investor/home" : "/home")
          }
          >x</h5> */}
					<div
						className="company__info d-flex flex-column flex-xl-row gap-4 justify-content-between pb-xl-4
          border-bottom position-relative"
					>
						<CompanyInfo
							name={name}
							logo={logo}
							tagline={tagline}
							location={location}
							foundedYear={new Date(foundedIn).getFullYear()}
							industry={industry}
							lastFunding={lastFunding}
							stage={stage}
							sector={sector}
							deleteCompany={handleDeleteCompany}
							companyDelete={companyDelete}
							userId={loggedInUser?._id || null}
							founderId={founderId}
						/>
						<CompanyActions
							isOnelink={isOnelink}
							founderId={founderId}
							companyId={interestData?.companyId}
						/>
					</div>
					<CompanyAbout
						about={description}
						vision={!short && vision}
						mission={!short && mission}
						noOfEmployees={noOfEmployees}
					/>

					{theme !== "investor" && (
						<CompanyStats
							colorCard={colorCard}
							startup={isStartup}
							sam={sam}
							tam={tam}
							som={som}
							show={show}
						/>
					)}
				</div>
				{pageName && (
					<div
						className="company__section__one border-bottom d-flex flex-column gap-4"
						style={{ padding: "1rem 3rem" }}
					>
						<PublicLinks socialLinks={socialLinks} />
						<KeyFocus tags={tags} />
					</div>
				)}
				{!pageName ? (
					<div className="company__section__two d-flex flex-column gap-4 pt-3 pb-5 px-3 px-md-5">
						{!pageName && <PublicLinks socialLinks={socialLinks} />}

						{!short && <FoundingTeam isOnelink={isOnelink} team={team} />}
						{!short && <KeyFocus tags={tags} />}
					</div>
				) : (
					<div
						className="company__section__two d-flex flex-column gap-4 pt-3 pb-3 px-3 px-md-5"
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
					</div>
				)}
			</div>

			{/* Select Commitment Modal */}
			{!(pathname === "/investor/company-profile") && (
				<SelectCommitmentModal
					interestData={interestData}
					founderId={founderId}
				/>
			)}

			<PasswordModal
				isOpen={isModalOpen} // Added PasswordModal component
				onClose={() => setIsModalOpen(false)} // Handler to close the modal
				onConfirm={handleConfirmPassword} // Handler to confirm password
			/>

			{/* Add Edit Modal */}
			<Modal
				isOpen={showEditModal}
				onRequestClose={() => setShowEditModal(false)}
				className="modal-dialog"
				overlayClassName="modal-overlay"
				id="company-profile-modal"
			>
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit Startup Details</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => setShowEditModal(false)}
						></button>
					</div>
					<div className="modal-body">
						<Form onSubmit={handleEditSubmit}>
							<Form.Group className="mb-3">
								<Form.Label>Company Name</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.company || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, company: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Tagline</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.tagline || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, tagline: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									value={editFormData.description || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, description: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Location</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.location || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, location: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Industry Type</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.industryType || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, industryType: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Vision</Form.Label>
								<Form.Control
									as="textarea"
									rows={2}
									value={editFormData.vision || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, vision: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Mission</Form.Label>
								<Form.Control
									as="textarea"
									rows={2}
									value={editFormData.mission || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, mission: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Number of Employees</Form.Label>
								<Form.Control
									type="number"
									value={editFormData.noOfEmployees || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, noOfEmployees: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Key Focus Areas</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.keyFocus || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, keyFocus: e.target.value })
									}
									placeholder="Separate with commas"
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Stage</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.stage || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, stage: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Sector</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.sector || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, sector: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>TAM (Total Addressable Market)</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.TAM || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, TAM: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>SAM (Serviceable Addressable Market)</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.SAM || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, SAM: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>SOM (Serviceable Obtainable Market)</Form.Label>
								<Form.Control
									type="text"
									value={editFormData.SOM || ""}
									onChange={(e) =>
										setEditFormData({ ...editFormData, SOM: e.target.value })
									}
								/>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Social Links</Form.Label>
								<Form.Control
									type="text"
									placeholder="Website"
									value={editFormData.socialLinks?.website || ""}
									onChange={(e) =>
										setEditFormData({
											...editFormData,
											socialLinks: {
												...editFormData.socialLinks,
												website: e.target.value,
											},
										})
									}
								/>
								<Form.Control
									type="text"
									placeholder="LinkedIn"
									className="mt-2"
									value={editFormData.socialLinks?.linkedin || ""}
									onChange={(e) =>
										setEditFormData({
											...editFormData,
											socialLinks: {
												...editFormData.socialLinks,
												linkedin: e.target.value,
											},
										})
									}
								/>
								<Form.Control
									type="text"
									placeholder="Twitter"
									className="mt-2"
									value={editFormData.socialLinks?.twitter || ""}
									onChange={(e) =>
										setEditFormData({
											...editFormData,
											socialLinks: {
												...editFormData.socialLinks,
												twitter: e.target.value,
											},
										})
									}
								/>
								<Form.Control
									type="text"
									placeholder="Facebook"
									className="mt-2"
									value={editFormData.socialLinks?.facebook || ""}
									onChange={(e) =>
										setEditFormData({
											...editFormData,
											socialLinks: {
												...editFormData.socialLinks,
												facebook: e.target.value,
											},
										})
									}
								/>
							</Form.Group>

							<div className="modal-footer">
								<Button variant="secondary" onClick={() => setShowEditModal(false)}>
									Cancel
								</Button>
								<Button 
									variant="primary" 
									type="submit"
									disabled={isSubmitting}
								>
									{isSubmitting ? (
										'Saving...'
									) : (
										'Save Changes'
									)}
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</Modal>
		</>
	);
}
