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

export default function MyCommunity() {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const loggedInUserId = useSelector(selectLoggedInUserId);

  useEffect(() => {
    fetchCommunities();
  }, []);

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

  return (
    <div className="my-community-page">
      <InvestorNavbar />
      <button className="back-button" onClick={() => navigate(-1)}>
        <BsArrowLeft /> Back
      </button>

      <div className="content-container">
        <h1>My Communities</h1>
        
        <div className="communities-list">
          {communities.map((community) => (
            <div key={community._id} className="community-card" onClick={() => navigate(`/community/${community.name}`)}>
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
    </div>
  );
}
