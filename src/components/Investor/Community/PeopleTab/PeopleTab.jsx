import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PeopleTab.scss";
import { FaWhatsapp, FaInstagram, FaUserTimes } from "react-icons/fa";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectLoggedInUserId } from "../../../../Store/features/user/userSlice";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { environment } from '../../../../environments/environment';

const PeopleTab = ({ community }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [removeReason, setRemoveReason] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const [isRemoving, setIsRemoving] = useState(false);

  // Combine admin and members into one array and add member status
  const allMembers = [
    ...(community?.members?.map(member => ({
      ...member.member,
      role: "Member",
      joined_date: member.joined_date,
    })) || []),
  ];

  // Filter members based on search query
  const filteredMembers = allMembers.filter(member => 
    `${member?.firstName} ${member?.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Calculate membership duration
  const getMembershipDuration = (joinedDate) => {
    const months = Math.floor((new Date() - new Date(joinedDate)) / (1000 * 60 * 60 * 24 * 30));
  
    // For durations less than 1 month
    if (months < 1) return "Less than a month";
    
    // For 1 month
    if (months === 1) return "1 month";
    
    // For durations more than 1 month but less than 12 months
    if (months < 12) return `${months} months`;
    
    // For durations greater than or equal to 12 months
    const years = Math.floor(months / 12);
    if (years === 1) return "1 year";
    
    return `${years} years`;
  };
  

  const handleUserClick = (username, userId) => {
    navigate(`/user/${username}/${userId}`);
  };

  const handleRemoveMember = async () => {
    if (isRemoving) return;
    setIsRemoving(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(
        `${environment.baseUrl}/communities/removeMember/${community._id}/${selectedMember._id}`,
        { reason: removeReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update the local state by filtering out the removed member
      const updatedMembers = allMembers.filter(member => member._id !== selectedMember._id);
      community.members = community.members.filter(member => member.member._id !== selectedMember._id);
      
      toast.success('Member removed successfully');
      setRemoveDialogOpen(false);
      setSelectedMember(null);
      setRemoveReason('');
    } catch (error) {
      console.error('Error removing member:', error);
      toast.error('Failed to remove member');
    } finally {
      setIsRemoving(false);
    }
  };

  useEffect(()=>{
    console.log(allMembers);
  },[])
  return (
    <div className="people-tab">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="members-grid">
        {filteredMembers.map((member) => (
          <div 
            key={member._id} 
            className="member-card"
            onClick={() => handleUserClick(member.userName, member._id)}
          >
            <div className="member-info">
              <img 
                src={member.profilePicture} 
                alt={`${member.firstName} ${member.lastName}`}
                className="profile-picture"
              />
              <div className="member-details">
                <h3>{`${member.firstName} ${member.lastName}`}</h3>
                <p className="designation">{member.designation}</p>
                <p className="company">
                  {member.startUp?.company || member.investor?.companyName || ""}
                </p>
                <p className="location">{member.location}</p>
                <p className="duration">
                  Member for {getMembershipDuration(member.joined_date)}
                </p>
                {member.role === "Admin" && <span className="admin-badge">Admin</span>}
              </div>
              {community.adminId._id === loggedInUserId && (
                <FaUserTimes 
                  className="remove-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMember(member);
                    setRemoveDialogOpen(true);
                  }}
                />
              )}
            </div>
            <div className="social-icons">
              <FaWhatsapp className="whatsapp-icon" />
              <FaInstagram className="instagram-icon" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Remove Dialog */}
      <Dialog open={removeDialogOpen} onClose={() => setRemoveDialogOpen(false)}>
        <DialogTitle>Remove Member</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to remove this member?</p>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason for removal"
            value={removeReason}
            onChange={(e) => setRemoveReason(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleRemoveMember} 
            color="error"
            disabled={isRemoving}
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PeopleTab; 