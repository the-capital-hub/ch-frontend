import React, { useState } from "react";
import InvestorInfo from "./InvestorHeader/InvestorInfo";
import InvestorActions from "./InvestorHeader/InvestorAction";
import InvestorAbout from "./InvestorAbout/InvestorAbout";
// import PublicLinks from "../../NewInvestor/CompanyProfileComponents/company-section-two/public-links/PublicLinks";
// import CompanyStats from "../../NewInvestor/CompanyProfileComponents/company-section-one/company-stats/CompanyStats";
import "./InvestorProfile.scss";
import { useSelector } from "react-redux";
// import CompanyDetailsCard from "../../Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateUserById } from '../../../Service/user';
import { FaEdit } from 'react-icons/fa';

export default function InvestorProfile({ theme, short, personData, onInvestorUpdate, isAdmin }) {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editFormData, setEditFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	let profilePicture = personData?.profilePicture;
	let fullName = `${personData?.firstName} ${personData?.lastName}`;
	let designation = personData?.designation;
	let email = personData?.email;
	let phoneNumber = personData?.phoneNumber;
	let bio = personData?.bio;
	let isInvestor = personData?.isInvestor === "true" ? true : false;
	let companyName = personData?.investor?.companyName;
	let location = personData?.investor?.location;
	let lastFunding = personData?.investor?.lastFunding;
	let startedAtDate = personData?.investor?.startedAtDate;
	let socialLinks = personData?.investor?.socialLinks;
	let linkedIn = personData?.linkedin;
	//let colorCard = personData?.investor?.colorCard;
	let investor = personData?.investor;
	let experience = personData?.experience;
	let education = personData?.education;
	let industry = personData?.industry || "N/A";

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await updateUserById(personData?._id, editFormData);
			if (response.status) {
				const updatedInvestor = { ...personData, ...editFormData };
				if (onInvestorUpdate) {
					onInvestorUpdate(updatedInvestor);
				}
				// Force local state update
				fullName = `${editFormData.firstName} ${editFormData.lastName}`;
				designation = editFormData.designation;
				bio = editFormData.bio;
				linkedIn = editFormData.linkedin;
				
				setShowEditModal(false);
				toast.success("Investor profile updated successfully!");
			} else {
				toast.error("Failed to update investor profile");
			}
		} catch (err) {
			console.error(err);
			toast.error("An error occurred while updating investor profile");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className={`person_profile_wrapper shadow-sm ${theme}`}>
				{isAdmin && (
					<Button 
						className="edit-button"
						onClick={() => {
							setEditFormData(personData);
							setShowEditModal(true);
						}}
					>
						<FaEdit />
					</Button>
				)}
				<div className="person__section__one d-flex flex-column gap-1 py-3 px-3 px-lg-3">
					<div className="person__info d-flex flex-column flex-xl-row gap-1 justify-content-between position-relative">
						<InvestorInfo
							fullName={fullName}
							designation={designation}
							profilePicture={profilePicture}
							companyName={companyName}
							location={location}
							foundedYear={new Date(startedAtDate).getFullYear()}
							lastFunding={lastFunding}
							industry={industry}
							userId={personData?._id}
							name={`${personData?.firstName?.toLowerCase()}.${personData?.lastName?.toLowerCase()}`}
							oneLinkId={personData?.oneLinkId}
							isInvestor={loggedInUser?.isInvestor === "true"}
						/>
						<InvestorActions
							person={isInvestor ? "Investor" : "Founder"}
							userId={personData?._id}
							name={`${personData?.firstName?.toLowerCase()}.${personData?.lastName?.toLowerCase()}`}
							oneLinkId={personData?.oneLinkId}
							isInvestor={loggedInUser?.isInvestor === "true"}
						/>
					</div>
					<hr />
					<InvestorAbout
						bio={bio}
						firstName={personData?.firstName}
						lastName={personData?.lastName}
						email={email}
						mobileNumber={phoneNumber}
						investor={investor}
						startUp={personData?.startUp}
						designation={designation}
						experience={experience}
						education={education}
						linkedIn={linkedIn}
					/>
				</div>
				{/* <div style={{ padding: "0 1rem" }}>
					<CompanyDetailsCard userDetails={personData} page="" theme="startup" />
				</div> */}
				{/* <div className="person__section__two d-flex flex-column gap-4 pt-3 pb-5 px-3 px-lg-5">
					{!short && <CompanyStats colorCard={colorCard} />}
					<PublicLinks socialLinks={socialLinks} />
				</div> */}
			</div>

			{/* Edit Modal */}
			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Investor Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleEditSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.firstName || ''}
								onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.lastName || ''}
								onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Designation</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.designation || ''}
								onChange={(e) => setEditFormData({...editFormData, designation: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Bio</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={editFormData.bio || ''}
								onChange={(e) => setEditFormData({...editFormData, bio: e.target.value})}
								placeholder="Enter your bio"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>LinkedIn</Form.Label>
							<Form.Control
								type="url"
								value={editFormData.linkedin || ''}
								onChange={(e) => setEditFormData({...editFormData, linkedin: e.target.value})}
								placeholder="Enter your LinkedIn URL"
							/>
						</Form.Group>

						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Updating...' : 'Update Profile'}
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
