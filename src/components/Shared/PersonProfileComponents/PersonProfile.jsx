import React, { useState } from "react";
import PersonInfo from "./PersonHeader/PersonInfo";
import PersonActions from "./PersonHeader/PersonActions";
import PersonAbout from "./PersonAbout/PersonAbout";
import PublicLinks from "../../NewInvestor/CompanyProfileComponents/company-section-two/public-links/PublicLinks";
import CompanyStats from "../../NewInvestor/CompanyProfileComponents/company-section-one/company-stats/CompanyStats";
import "./PersonProfile.scss";
import { useSelector } from "react-redux";
import CompanyDetailsCard from "../../Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateUserById } from '../../../Service/user';
import { FaEdit } from 'react-icons/fa';

const PERSON = {
	profilePicture: "",
	firstName: "FirstName",
	lastName: "LastName",
	designation: "Founder",
	email: "example@xyz.com",
	mobileNumber: "+91 9876543210",
	companyName: "Company Name",
	location: " ",
	foundedYear: " ",
	lastFunding: " ",
	about:
		"Man's all about building great start-ups from a simple idea to an elegant reality. Humbled and honored to have worked with Angels and VC's across the globe to support and grow the startup culture.With the vision of make in India for the world, they design and build augmented reality glasses for Defence, Enterprise, and Training sectors. In addition to hardware, they also provide their clients with end-to-end AR/VR/MR solutions that are tailored to their business needs.",
};

export default function PersonProfile({ theme, short, personData, onFounderUpdate, isAdmin }) {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editFormData, setEditFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	let profilePicture;
	let firstName;
	let lastName;
	let designation;
	let email;
	let phoneNumber;
	let bio;
	let isInvestor;
	let location;
	let lastFunding;
	let startedAtDate;
	let companyName;
	let socialLinks;
	let linkedin;
	let colorCard;
	let investor;
	let startUp;
	let experience;
	let education;
	let industry;
	let isSubscribed;

	if (personData?.startUp) {
		profilePicture = personData?.profilePicture;
		firstName = personData?.firstName;
		lastName = personData?.lastName;
		isSubscribed = personData?.isSubscribed;
		designation = personData?.designation;
		email = personData?.email;
		phoneNumber = personData?.phoneNumber;
		bio = personData?.bio;
		linkedin = personData?.linkedin;
		isInvestor = personData?.isInvestor === "true" ? true : false;
		location = personData?.startUp.location;
		lastFunding = personData?.startUp.lastFunding;
		startedAtDate = personData?.startUp.startedAtDate;
		socialLinks = personData?.startUp.socialLinks;
		colorCard = personData?.startUp.colorCard;
		startUp = personData?.startUp;
		companyName = personData?.startup.company || "Data Not Available";
		experience = personData?.yearsOfExperience || "Data Not Available";
		education =
			personData?.recentEducation?.map((edu) => edu.course).join(", ") ||
			"Data Not Available";
		industry = personData?.industry || "Nun";
	} else {
		profilePicture = personData?.profilePicture;
		firstName = personData?.firstName;
		lastName = personData?.lastName;
		isSubscribed = personData?.isSubscribed;
		designation = personData?.designation;
		email = personData?.email;
		phoneNumber = personData?.phoneNumber;
		bio = personData?.bio;
		linkedin = personData?.linkedin;
		isInvestor = personData?.isInvestor === "true" ? true : false;
		companyName = personData?.investor?.companyName;
		location = personData?.investor?.location;
		lastFunding = personData?.investor?.lastFunding;
		startedAtDate = personData?.investor?.startedAtDate;
		socialLinks = personData?.investor?.socialLinks;
		colorCard = personData?.investor?.colorCard;
		investor = personData?.investor;
		experience = personData?.experience;
		education = personData?.education;
		industry = personData?.industry || "Nun";
	}


	const handleEditSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const response = await updateUserById(personData?._id, editFormData);
			if (response.status) {
				const updatedFounder = { ...personData, ...editFormData };
				if (onFounderUpdate) {
					onFounderUpdate(updatedFounder);
				}
				setShowEditModal(false);
				toast.success("Founder profile updated successfully!");
			} else {
				toast.error("Failed to update founder profile");
			}
		} catch (err) {
			console.error(err);
			toast.error("An error occurred while updating founder profile");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className={`person_profile_wrapper  shadow-sm ${theme}`}>
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
				<div className="person__section__one d-flex flex-column gap-2 md:gap-4 py-3 md:py-5 px-3 px-lg-4 ">
					{/* Profile header */}
					<div className="person__info d-flex flex-column flex-xl-row gap-2 md:gap-4 justify-content-between position-relative pb-xl-3 border-bottom">
						<PersonInfo
							fullName={`${firstName} ${lastName}`}
							designation={designation}
							profilePicture={profilePicture}
							companyName={companyName || PERSON.companyName}
							location={location}
							foundedYear={
								new Date(startedAtDate).getFullYear() || PERSON.foundedYear
							}
							lastFunding={lastFunding || PERSON.lastFunding}
							industry={industry || "Nun"}
							isSubscribed={isSubscribed}
							linkedin={linkedin}
						/>
						<PersonActions
							person={`${isInvestor ? "Investor" : "Founder"}`}
							userId={personData?._id}
							name={
								personData.firstName?.toLowerCase() +
								"." +
								personData.lastName?.toLowerCase()
							}
							oneLinkId={personData?.oneLinkId}
							isInvestor={loggedInUser?.isInvestor === "true"}
						/>
					</div>

					{/* Profile About */}
					<PersonAbout
						bio={bio}
						firstName={firstName}
						lastName={lastName}
						email={email}
						mobileNumber={phoneNumber}
						investor={investor}
						startUp={startUp}
						designation={designation}
						experience={experience}
						education={education}
						companyName={companyName || PERSON.companyName}
					/>
					<PublicLinks socialLinks={socialLinks} />
				</div>

				{/* <div className="" style={{ padding: "0 1rem" }}>
					<CompanyDetailsCard className="" userDetails={personData} page={""} theme="startup"/>
				</div> */}
				{/* <div className="person__section__two d-flex flex-column gap-4 pt-3 pb-5 px-3 px-lg-5">
					{/* <PublicLinks socialLinks={socialLinks} /> */}
				{/* Have to make this component reusable. Right now color card title is hard coded */}
				{/* {!short && <CompanyStats colorCard={colorCard} />} */}
				{/* </div> */}
			</div>

			{/* Edit Modal */}
			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Founder Profile</Modal.Title>
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
							<Form.Label>Company Name</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.companyName || ''}
								onChange={(e) => setEditFormData({...editFormData, companyName: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Bio</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								value={editFormData.bio || ''}
								onChange={(e) => setEditFormData({...editFormData, bio: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								value={editFormData.email || ''}
								onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								type="tel"
								value={editFormData.phoneNumber || ''}
								onChange={(e) => setEditFormData({...editFormData, phoneNumber: e.target.value})}
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
