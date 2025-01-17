import React, { useState, useEffect } from "react";
import "./OneLinkRequestsPopup.scss";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
import { getOneLinkRequest, approveOneLinkRequest, rejectOneLinkRequest } from "../../../Service/user";

export default function OneLinkRequestsPopup({ onClose, startUpId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await getOneLinkRequest(startUpId);
      console.log(response);
      if (response.status === 200) {
        setRequests(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      let response;
      
      if (action === "approved") {
        response = await approveOneLinkRequest(startUpId, requestId);
      } else if (action === "rejected") {
        response = await rejectOneLinkRequest(startUpId, requestId);
      }

      if (response.status === 200) {
        // Update local state
        setRequests(requests.map(req => 
          req._id === requestId ? { ...req, status: action } : req
        ));
      }
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div className="onelink-requests-popup">
      <div className="popup-content">
        <div className="popup-header">
          <h5>OneLink Requests</h5>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x-lg">X</i>
          </button>
        </div>

        <div className="requests-container">
          {loading ? (
            <div className="text-center p-4">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="text-center p-4">No pending requests</div>
          ) : (
            requests.map((request) => (
              <div key={request._id} className="request-item">
                <div className="user-info">
                  <img 
                    src={request.userId.profilePicture || DefaultAvatar} 
                    alt={request.userId.firstName}
                    className="profile-picture"
                  />
                  <div className="user-details">
                    <h6>{request.userId.firstName} {request.userId.lastName}</h6>
                    <p>{request.userId.designation} at {request.userId.startUp?.company || request.userId.investor?.companyName || "N/A"}</p>
                  </div>
                </div>

                {request.status === "pending" && (
                  <div className="action-buttons">
                    <button 
                      className="btn-approve"
                      onClick={() => handleAction(request._id, "approved")}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => handleAction(request._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {request.status !== "pending" && (
                  <div className={`status-badge ${request.status}`}>
                    {request.status}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 