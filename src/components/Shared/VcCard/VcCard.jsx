import React, { useState } from "react";
import "./VcCard.scss";
import { Modal, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateVcData } from '../../../Service/user';
import { FaEdit } from 'react-icons/fa';

const VcCard = ({ vc, onVcUpdate, isAdmin }) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [editFormData, setEditFormData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			console.log("editFormData", editFormData);
			const response = await updateVcData(editFormData);
			console.log("response", response);
			if (response.status) {
				const updatedVc = {
					...vc,
					...editFormData,
					_id: vc._id
				};
				if (onVcUpdate) {
					onVcUpdate(updatedVc);
				}
				setShowEditModal(false);
				toast.success("VC profile updated successfully!");
			} else {
				toast.error(response.message || "Failed to update VC profile");
			}
		} catch (err) {
			console.error(err);
			toast.error(err.message || "An error occurred while updating VC profile");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="vc-card position-relative">
				{isAdmin && (
					<Button 
						className="edit-button position-absolute"
						style={{ top: '10px', right: '10px', zIndex: 1000 }}
						onClick={(e) => {
							e.stopPropagation(); 
							setEditFormData(vc);
							setShowEditModal(true);
						}}
					>
						<FaEdit />
					</Button>
				)}
				<div className="header">
					{vc.logo ? (
						<img src={vc.logo} alt={`${vc.name} logo`} className="vc-logo" />
					) : (
						<img
							src="https://thecapitalhub.s3.ap-south-1.amazonaws.com/company-dummy.png"
							alt={`${vc.name} logo`}
							className="vc-logo"
						/>
					)}
					<div className="vc-info">
						<h3>{vc.name}</h3>
						<p className="info">
							{vc.location}, {vc.age} years
						</p>
					</div>
					<div className="ticket-size d-none d-sm-block">
						<span>Ticket Size</span>
						{": "}
						{vc.ticket_size
							? `$${vc.ticket_size
									.split("-")
									.map((size) => parseInt(size) / 1000 + "k")
									.join("-")}`
							: "N/A"}
					</div>
					<button className="know-more">Know more</button>
				</div>
				<div className="stage-sector-info">
					<div className="stage-focus">
						<h5>Stage Focus</h5>
						{Array.isArray(vc.stage_focus) &&
							vc.stage_focus.map((stage, index) => (
								<div className="bubble" key={index}>
									{stage}
								</div>
							))}
					</div>
					<div className="sector-focus">
						<h5>Sector Focus</h5>
						{Array.isArray(vc.sector_focus) &&
							vc.sector_focus.map((sector, index) => (
								<div className="bubble" key={index}>
									{sector}
								</div>
							))}
					</div>
					<div className="ticket-size d-block d-sm-none px-3">
						<span>Ticket Size</span>
						{": "}
						{vc.ticket_size
							? `$${vc.ticket_size
									.split("-")
									.map((size) => parseInt(size) / 1000 + "k")
									.join("-")}`
							: "N/A"}
					</div>
				</div>
			</div>

			{/* Edit Modal */}
			<Modal 
				show={showEditModal} 
				onHide={() => setShowEditModal(false)}
				onClick={(e) => e.stopPropagation()} // Prevent card click event
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit VC Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleEditSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.name || ''}
								onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Location</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.location || ''}
								onChange={(e) => setEditFormData({...editFormData, location: e.target.value})}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Ticket Size</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.ticket_size || ''}
								onChange={(e) => setEditFormData({...editFormData, ticket_size: e.target.value})}
								placeholder="e.g., 100000-500000"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Stage Focus (comma-separated)</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.stage_focus?.join(', ') || ''}
								onChange={(e) => setEditFormData({
									...editFormData, 
									stage_focus: e.target.value.split(',').map(item => item.trim())
								})}
								placeholder="e.g., Seed, Series A, Series B"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Sector Focus (comma-separated)</Form.Label>
							<Form.Control
								type="text"
								value={editFormData.sector_focus?.join(', ') || ''}
								onChange={(e) => setEditFormData({
									...editFormData, 
									sector_focus: e.target.value.split(',').map(item => item.trim())
								})}
								placeholder="e.g., Technology, Healthcare, Finance"
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
};

export default VcCard;
