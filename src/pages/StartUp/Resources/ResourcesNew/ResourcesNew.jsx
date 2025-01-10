import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./ResourcesNew.scss";
import Picture1 from "./images/Picture1.png";
import Picture2 from "./images/Picture2.png";
import Picture3 from "./images/Picture3.png";
import Picture4 from "./images/Picture4.png";
import Hustler from "./images/hustler.png";
import lock from "./images/lock.png";
import { environment } from "../../../../environments/environment";
import SpinnerBS from "../../../../components/Shared/Spinner/SpinnerBS";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { selectTheme } from "../../../../Store//features/design/designSlice";

const logoMap = {
	gtm: Picture1,
	sales: Picture3,
	pitch: Picture4,
	financial: Picture2
};

const ResourcesNew = () => {
	const [resources, setResources] = useState([]);
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [selectedResource, setSelectedResource] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		logoType: "gtm",
		files: []
	});
	const [isCreating, setIsCreating] = useState(false);

	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const isAdmin = loggedInUser?.isAdmin;

	const theme = useSelector(selectTheme);

	useEffect(() => {
		fetchResources();
		console.log(theme);
	}, [theme]);

	const fetchResources = async () => {
		try {
			const response = await fetch(`${environment.baseUrl}/resources/getAll`);
			const data = await response.json();
			setResources(data);
			console.log(data);
		} catch (error) {
			console.error("Error fetching resources:", error);
		}
	};

	const handleCreateResource = async (e) => {
		e.preventDefault();
		setIsCreating(true);
		const formDataToSend = new FormData();
		formDataToSend.append("title", formData.title);
		formDataToSend.append("description", formData.description);
		formDataToSend.append("logoType", formData.logoType);
		
		formData.files.forEach((fileObj, index) => {
			formDataToSend.append("files", fileObj.file);
			formDataToSend.append("fileNames", fileObj.name || `File ${index + 1}`);
		});

		try {
			const response = await fetch(`${environment.baseUrl}/resources/create`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				body: formDataToSend
			});
			if (response.ok) {
				setShowCreateForm(false);
				fetchResources();
				setFormData({ title: "", description: "", logoType: "gtm", files: [] });
			}
		} catch (error) {
			console.error("Error creating resource:", error);
		} finally {
			setIsCreating(false);
		}
	};

	const handleResourceClick = (resource) => {
		if (loggedInUser.isSubscribed) {
			setSelectedResource(resource);
		}
	};

	// Function to organize resources into rows of 4
	const organizeResources = (resources) => {
		const rows = [];
		for (let i = 0; i < resources.length; i += 4) {
			rows.push(resources.slice(i, i + 4));
		}
		return rows;
	};

	const handleCloseModal = () => {
		setSelectedResource(null);
		setShowCreateForm(false);
	};

	const handleDeleteResource = async (resourceId) => {
		if (window.confirm("Are you sure you want to delete this resource?")) {
			try {
				const response = await fetch(`${environment.baseUrl}/resources/delete/${resourceId}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
				});
				if (response.ok) {
					fetchResources(); // Refresh the resources list
				}
			} catch (error) {
				console.error("Error deleting resource:", error);
			}
		}
	};

	return (
		<div className="resources-new-container">
			<div className="resource-main">
				{isAdmin && (
					<button 
						className={`create-resource-btn ${theme === 'light' ? 'light-mode' : ''}`}
						onClick={() => setShowCreateForm(true)}
						type="button"
					>
						Create Resource
					</button>
				)}
				
				<div className="resource-new-header">
					<div className="hustler-img-text">
						{/* Add the logo image here */}
						<img
							src={Hustler}
							alt="Hustlers Club Logo"
							className="logo-image"
						/>
						<p className="sub-text1">
							{loggedInUser.isSubscribed ? (
								<>
									Welcome to the
									<span className="hustler-text"> Hustlers Club</span>
								</>
							) : (
								`Hey ${loggedInUser.firstName} !`
							)}
						</p>
						<p className="sub-text">
							{loggedInUser.isSubscribed
								? "Hustlers Club gives you all the tools and support you need to take your startup to the next level."
								: "Get Ready with Pitch & GTM plans"}
						</p>
					</div>
					{!loggedInUser.isSubscribed && (
						<div className="pricing">
							<div className="pricing-details">
								<h3>Unlock Premium Resources</h3>
								<h4>
									INR <span>1,999</span>
								</h4>
								<button>Get Premium</button>
							</div>
						</div>
					)}
					{!loggedInUser.isSubscribed && (
						<button className="buy-now-btn">Join Beta Group Now</button>
					)}
				</div>
				<div className="resource-cards-container">
					<div className="resource-access-text">
						{!loggedInUser.isSubscribed ? "Access Now (Locked)" : "Access Now"}
					</div>

					{organizeResources(resources).map((row, rowIndex) => (
						<div key={rowIndex} className="resources-cards">
							{row.map((resource) => (
								<div 
									key={resource._id} 
									className="card"
									onClick={() => handleResourceClick(resource)}
								>
									<div className="resource-card-header">
										<img src={logoMap[resource.logoType]} alt="" />
										{!loggedInUser.isSubscribed && (
											<div className="card-lock-icon">
												locked <img className="lock" src={lock} alt="" />
											</div>
										)}
										{isAdmin && (
											<button
												className="delete-resource-btn"
												onClick={(e) => {
													e.stopPropagation(); // Prevent card click when clicking delete
													handleDeleteResource(resource._id);
												}}
											>
												<IoMdTrash />
											</button>
										)}
									</div>
									<span>{resource.title}</span>
								</div>
							))}
							{/* Add empty placeholders to maintain grid structure */}
							{rowIndex === 0 && row.length < 4 && 
								Array(4 - row.length).fill().map((_, index) => (
									<div key={`empty-${index}`} className="card empty"></div>
								))
							}
						</div>
					))}
				</div>
			</div>

			{/* Create Resource Form Modal */}
			{showCreateForm && (
				<div className="modal-overlay">
					<div className="modal-content">
						{isCreating ? (
							<div className="loader-container">
								<SpinnerBS />
							</div>
						) : (
							<>
								<div className="modal-header">
									<h2>Create New Resource</h2>
									<button className="close-btn" onClick={() => setShowCreateForm(false)}>×</button>
								</div>
								<form onSubmit={handleCreateResource}>
									<div className="form-group">
										<label>Title</label>
										<input
											type="text"
											value={formData.title}
											onChange={(e) => setFormData({ ...formData, title: e.target.value })}
											required
										/>
									</div>
									<div className="form-group">
										<label>Description</label>
										<textarea
											value={formData.description}
											onChange={(e) => setFormData({ ...formData, description: e.target.value })}
											required
										/>
									</div>
									<div className="form-group">
										<label>Logo Type</label>
										<select
											value={formData.logoType}
											onChange={(e) => setFormData({ ...formData, logoType: e.target.value })}
											required
										>
											<option value="gtm">GTM Strategy</option>
											<option value="sales">Sales & Marketing</option>
											<option value="pitch">Pitch Deck</option>
											<option value="financial">Financial Modeling</option>
										</select>
									</div>
									<div className="form-group files-section">
										<label>Upload Files</label>
										<div className="file-upload-container">
											<input
												type="file"
												onChange={(e) => {
													const files = Array.from(e.target.files).map(file => ({
														file,
														name: '' // Initialize with empty name
													}));
													setFormData(prev => ({
														...prev,
														files: [...prev.files, ...files]
													}));
													e.target.value = '';
												}}
											/>
											<button 
												type="button" 
												className="add-file-btn"
												onClick={() => {
													const fileInput = document.querySelector('.file-upload-container input[type="file"]');
													fileInput.click();
												}}
											>
												<IoMdAdd /> Add File
											</button>
										</div>
										
										{/* Display selected files with name input */}
										{formData.files.length > 0 && (
											<div className="selected-files">
												<h4>Selected Files ({formData.files.length})</h4>
												<ul>
													{formData.files.map((fileObj, index) => (
														<li key={index}>
															<div className="file-info">
																<span className="file-icon">📄</span>
																<div className="file-details">
																	<input
																		type="text"
																		placeholder={`File ${index + 1}`}
																		value={fileObj.name}
																		onChange={(e) => {
																			setFormData(prev => ({
																				...prev,
																				files: prev.files.map((f, i) => 
																					i === index ? {...f, name: e.target.value} : f
																				)
																			}));
																		}}
																		className="file-name-input"
																	/>
																	<span className="file-size">
																		{(fileObj.file.size / (1024 * 1024)).toFixed(2)} MB
																	</span>
																</div>
															</div>
															<button
																type="button"
																className="remove-file-btn"
																onClick={() => {
																	setFormData(prev => ({
																		...prev,
																		files: prev.files.filter((_, i) => i !== index)
																	}));
																}}
															>
																×
															</button>
														</li>
													))}
												</ul>
											</div>
										)}
									</div>
									<button type="submit" className="submit-btn" disabled={isCreating}>
										Create Resource
									</button>
								</form>
							</>
						)}
					</div>
				</div>
			)}

			{/* Resource Details Modal */}
			{selectedResource && (
				<div className="modal-overlay">
					<div className="modal-content">
						<div className="modal-header">
							<h2>{selectedResource.title}</h2>
							<button className="close-btn" onClick={() => setSelectedResource(null)}>×</button>
						</div>
						<div className="resource-details">
							<img 
								src={logoMap[selectedResource.logoType]} 
								alt={selectedResource.logoType} 
								className="resource-logo"
							/>
							<p className="description">{selectedResource.description}</p>
							<div className="resource-links">
								<h3>Resource Files</h3>
								{selectedResource.link.map((link, index) => (
									<a 
										key={index} 
										href={link.url} 
										target="_blank" 
										rel="noopener noreferrer"
										className="resource-link"
									>
										{link.name}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ResourcesNew;
