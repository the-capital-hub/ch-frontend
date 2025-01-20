import { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import InvestorNavbar from "../InvestorNavbar/InvestorNavbar";
import "./MyCommunity.scss";
import { useNavigate } from "react-router-dom";
import { environment } from "../../../environments/environment";
import axios from 'axios';
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from 'moment';
import NewCommunityModal from "../ChatComponents/NewCommunityModal";
import { selectTheme } from "../../../Store/features/design/designSlice";
import {  FaShareAlt, FaSignOutAlt } from "react-icons/fa";
import SharePopup from "../../PopUp/SocialSharePopup/SharePopup";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

export default function MyCommunity() {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const theme = useSelector(selectTheme);
  const [sharePopupOpen, setSharePopupOpen] = useState(false);
  const [communityUrl, setCommunityUrl] = useState('');  
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [leaveReason, setLeaveReason] = useState('');
  const [selectedCommunityForLeave, setSelectedCommunityForLeave] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleOpenSocialShare = (communityId) => {
    const baseUrl = window.location.origin;
    const communityUrl = `${baseUrl}/community/${encodeURIComponent(communityId)}`;
    
    setCommunityUrl(communityUrl);  
    setSharePopupOpen(true);  
  };

  const fetchCommunities = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${environment.baseUrl}/communities/getAllCommunitiesByUserId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommunities(response.data.data);
    } catch (error) {
      console.error('Error fetching communities:', error);
      toast.error('Failed to fetch communities');
    }
  };

  const formatTimeAgo = (date) => {
    return moment(date).fromNow();
  };

  const getThemeStyles = () => ({
    backgroundColor: theme === 'light' ? '#ffffff' : '#060810',
    color: theme === 'light' ? '#000000' : '#FFFFFF'
  });

  const backButtonStyles = {
    color: theme === 'light' ? '#000000' : '#FFFFFF'
  };

  const handleLeaveCommunity = async () => {
    if (isLeaving) return;
    setIsLeaving(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${environment.baseUrl}/communities/leaveCommunity/${selectedCommunityForLeave._id}`,
        { reason: leaveReason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Successfully left the community');
      fetchCommunities();
      setLeaveDialogOpen(false);
      setSelectedCommunityForLeave(null);
      setLeaveReason('');
    } catch (error) {
      console.error('Error leaving community:', error);
      toast.error('Failed to leave the community');
    } finally {
      setIsLeaving(false);
    }
  };

  return (
    <div className="my-community-page" style={getThemeStyles()} data-theme={theme}>
      <InvestorNavbar />
    

      <div className="content-container">
        <h1>My Communities</h1>
        
        <div className="communities-list">
          {communities.map((community) => (
            <div key={community._id} className="community-card" onClick={() => navigate(`/community/${community._id}`)}>
              <div className="community-image">
                <img 
                  src={community.image || "default-community-image.png"} 
                  alt={community.name} 
                />
              </div>
              <div className="community-info" style={{flexDirection: "column"}}>
                <div className="name-and-role">
                  <h3>{community.name}</h3>
                  <span className={`status ${community.adminId === loggedInUserId ? 'owner' : 'joined'}`}>
                    {community.adminId === loggedInUserId ? 'Owner' : 'Member'}
                  </span>
                </div>
                <div className="community-size-and-share">
                  <p className="size">{community.size}</p>
                  <div className="action-buttons">
                    {community.adminId !== loggedInUserId && (
                      <FaSignOutAlt 
                        className="leave-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCommunityForLeave(community);
                          setLeaveDialogOpen(true);
                        }}
                      />
                    )}
                    <FaShareAlt 
                      className="share-icon"  
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSocialShare(community._id);
                      }}
                    />
                  </div>
                </div>
                <div className="stats">
                  <span>{community.members.length + 1} members</span>
                  <span>•</span>
                  <span>Created {formatTimeAgo(community.createdAt)}</span>
                </div>
                {/* <p className="subscription">
                  {community.subscription === 'free' 
                    ? 'Free to join' 
                    : `$${community.amount} subscription`}
                </p> */}
              </div>
            </div>
          ))}
        </div>

        <button 
          className="create-community-button"
          onClick={() => navigate("/CreateCommunity")}
        >
          Create New Community
        </button>
      </div>
      <SharePopup 
        url={communityUrl} 
        isOpen={sharePopupOpen} 
        setIsOpen={setSharePopupOpen} 
      />

      <Dialog open={leaveDialogOpen} onClose={() => setLeaveDialogOpen(false)}>
        <DialogTitle>Leave Community</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to leave this community?</p>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason for leaving"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLeaveDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleLeaveCommunity} 
            color="error" 
            disabled={isLeaving}
          >
            {isLeaving ? 'Leaving...' : 'Leave'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
