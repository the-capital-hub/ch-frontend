import React, { useState, useEffect } from "react";
import "./ResourcesPopup.scss";
import { environment } from "../../../../../environments/environment";
import { useSelector } from "react-redux";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";

export default function ResourcesPopup({ onClose }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showLinks, setShowLinks] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch(`${environment.baseUrl}/resources/getAll`);
      const data = await response.json();
      setResources(data.filter(resource => resource.isActive));
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const handlePayment = async (resourceId) => {
    // Implement payment logic here
    console.log("Processing payment for resource:", resourceId);
  };

  const handleDownload = (links) => {
    setShowLinks(true);
  };

  if (loading) return <SpinnerBS />;

  return (
    <div className="resources-popup-overlay">
      <div className="resources-popup">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {!selectedResource ? (
          <div className="resources-list">
            <h3>Available Resources</h3>
            {resources.map((resource) => (
              <div 
                key={resource._id} 
                className="resource-item"
                onClick={() => handleResourceClick(resource)}
              >
                <h4>{resource.title}</h4>
                <p>₹{resource.amount}</p>
              </div>
            ))}
          </div>
        ) : showLinks ? (
          <div className="resource-links">
            <h3>Download Links</h3>
            {selectedResource.link.map((link, index) => (
              <a 
                key={index} 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="download-link"
              >
                Download File {index + 1}
              </a>
            ))}
            <button onClick={() => setShowLinks(false)}>Back</button>
          </div>
        ) : (
          <div className="resource-details">
            <h3>{selectedResource.title}</h3>
            <p>{selectedResource.description}</p>
            <p>Price: ₹{selectedResource.amount}</p>
            
            {(loggedInUser.isAdmin || selectedResource.purchased_users.includes(loggedInUser._id)) ? (
              <button 
                className="download-btn"
                onClick={() => handleDownload(selectedResource.link)}
              >
                Download
              </button>
            ) : (
              <button 
                className="pay-btn"
                onClick={() => handlePayment(selectedResource._id)}
              >
                Pay to View
              </button>
            )}
            <button onClick={() => setSelectedResource(null)}>Back to List</button>
          </div>
        )}
      </div>
    </div>
  );
} 