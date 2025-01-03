import { useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import InvestorNavbar from "../InvestorNavbar/InvestorNavbar";
import "./ExploreCommunity.scss";
import { useNavigate } from "react-router-dom";
import { environment } from "../../../environments/environment";
import axios from 'axios';
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from 'moment';
import NewCommunityModal from "../ChatComponents/NewCommunityModal";
import { selectTheme } from "../../../Store/features/design/designSlice";

export default function ExploreCommunities() {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(
        `${environment.baseUrl}/communities/getAllCommunities`,
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

  const handleCommunityClick = async (community) => {
    // Check if user is admin
    if (community.adminId === loggedInUserId) {
      navigate(`/community/${community._id}`);
      return;
    }

    // Check if user is already a member
    if (community.members.includes(loggedInUserId)) {
      navigate(`/community/${community._id}`);
      return;
    }

    // If community is closed, show message and return
    if (!community.isOpen) {
      toast.info('This community is closed for new members');
      return;
    }

    // Attempt to join the community
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${environment.baseUrl}/communities/addMembersToCommunity/${community._id}`,
        {
          memberIds: [loggedInUserId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Successfully joined the community!');
      fetchCommunities(); 
    } catch (error) {
      console.error('Error joining community:', error);
      toast.error('Failed to join the community');
    }
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getThemeStyles = () => ({
    backgroundColor: theme === 'light' ? '#ffffff' : '#060810',
    color: theme === 'light' ? '#000000' : '#FFFFFF'
  });

  const backButtonStyles = {
    color: theme === 'light' ? '#000000' : '#FFFFFF'
  };

  return (
    <div className="my-community-page" style={getThemeStyles()} data-theme={theme}>
      <InvestorNavbar />
      <button className="back-button" style={backButtonStyles} onClick={() => navigate(-1)}>
        <BsArrowLeft /> Back
      </button>

      <div className="content-container">
        <h1>Communities</h1>
        
        <input 
          type="text" 
          placeholder="Search communities by name..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="search-bar"
        />

        <div className="communities-grid">
          {filteredCommunities.map((community) => (
            <div 
              key={community._id} 
              className="community-card" 
              onClick={() => handleCommunityClick(community)}
            >
              <div className="community-image">
                <img 
                  src={community.image || "default-community-image.png"} 
                  alt={community.name} 
                />
              </div>
              <div className="community-info">
                <h3>{community.name}</h3>
                <p className="size">{community.size}</p>
                <div className="stats">
                  <span>{community.members.length + 1}  members</span>
                  <span>•</span>
                  <span>Created {formatTimeAgo(community.createdAt)}</span>
                </div>
                <div className="community-status">
                  {community.adminId === loggedInUserId && (
                    <span className="status owner">Owner</span>
                  )}
                  {community.members.includes(loggedInUserId) && (
                    <span className="status joined">Joined</span>
                  )}
                  {!community.members.includes(loggedInUserId) && (
                    <span className="status join-status">
                      {community.isOpen ? 'Anyone can join' : 'Closed'}
                    </span>
                  )}
                  <span className="subscription">
                    {community.subscription === 'free' 
                      ? 'Free to join' 
                      : `₹ ${community.amount} subscription`}
                  </span>
                </div>
                {(!community.members.some(member => member.member.toString() === loggedInUserId) && community.isOpen) && community.adminId!==loggedInUserId && (
                  <button 
                    className="join-button" 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handleCommunityClick(community);
                    }}
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
