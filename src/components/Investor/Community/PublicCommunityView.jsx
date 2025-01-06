import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { selectLoggedInUserId } from '../../../Store/features/user/userSlice';
import About from './About/About';
import { toast } from 'react-hot-toast';
import "./PublicCommunityView.scss"

const PublicCommunityView = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const navigate = useNavigate();
  const loggedInUserId = useSelector(selectLoggedInUserId);

  useEffect(() => {
    fetchCommunityDetails();
  }, [communityId]);

  const fetchCommunityDetails = async () => {
    try {
      const response = await axios.get(
        `${environment.baseUrl}/communities/getCommunityById/${communityId}`
      );
      setCommunity(response.data.data);
    } catch (error) {
      console.error("Error fetching community:", error);
    }
  };

  const handleJoinCommunity = async () => {
    if (!community.isOpen) {
      toast.error('This community is closed for new members');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${environment.baseUrl}/communities/addMembersToCommunity/${communityId}`,
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
      navigate(`/community/${communityId}`);
    } catch (error) {
      console.error('Error joining community:', error);
      toast.error('Failed to join the community');
    }
  };

  return (
    <div className="public-community-view">
      <About community={community} />
      {community?.isOpen && (
        <div className="join-banner">
         {loggedInUserId ? 
         <button onClick={handleJoinCommunity} className="join-button">
            Join Community
          </button>
        : (
            <button
            className="join-button"
            onClick={() => window.location.href = `https://thecapitalhub.in/login`}
          >
            Login to join this community
          </button>
          
            )  
        
        }
        </div>
      )}
    </div>
  );
};

export default PublicCommunityView; 