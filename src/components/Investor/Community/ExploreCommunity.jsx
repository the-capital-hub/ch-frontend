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
import PurchasePopup from '../../../components/Shared/PurchasePopup/PurchasePopup';
import { load } from "@cashfreepayments/cashfree-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import communityPlaceholder from "../../../Images/communityPlaceholder.svg";

export default function ExploreCommunities() {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const theme = useSelector(selectTheme);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [joiningCommunityId, setJoiningCommunityId] = useState(null);

  useEffect(() => {
    fetchCommunities();
  }, []);
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const root = document.documentElement;
    
    if (loggedInUser?.isInvestor === "true") {
      root.style.setProperty('--theme-color', '#d3f36b');
      root.style.setProperty('--theme-hover-color', '#bcd95f');
      root.style.setProperty('--current-theme-color', '#d3f36b');
      root.style.setProperty('--current-theme-text-color', '#000000');
    } else {
      root.style.setProperty('--theme-color', '#FF620E');
      root.style.setProperty('--theme-hover-color', '#e55a0d');
      root.style.setProperty('--current-theme-color', '#FF620E');
      root.style.setProperty('--current-theme-text-color', '#FFFFFF');
    }
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

  const CustomToast = ({ message }) => (
    <div className="custom-toast">
      <div className="toast-icon">✓</div>
      <div className="toast-message">{message}</div>
    </div>
  );

  const handleJoinCommunity = async (e, community) => {
    e.stopPropagation();
    
    if (!community.isOpen) {
      toast(<CustomToast message="This community is closed for new members" />, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'custom-toast-container',
      });
      return;
    }

    if (community.subscription === 'paid') {
      setSelectedCommunity(community);
      setShowPaymentModal(true);
      return;
    }

    try {
      setJoiningCommunityId(community._id);
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
      
      toast(<CustomToast message="Successfully joined the community!" />, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'custom-toast-container',
      });
      
      await fetchCommunities();
    } catch (error) {
      console.error('Error joining community:', error);
      toast(<CustomToast message="Failed to join the community" />, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'custom-toast-container error',
      });
    } finally {
      setJoiningCommunityId(null);
    }
  };

  const handleCommunityClick = (community) => {
    navigate(`/community/${community._id}`);
  };

  // Initialize Cashfree SDK
  const initializeCashfree = async () => {
    try {
      return await load({ mode: "production" });
    } catch (error) {
      console.error("Failed to initialize Cashfree:", error);
      throw error;
    }
  };

  const handlePaymentSuccess = async (userDetails) => {
    try {
      const token = localStorage.getItem('accessToken');
      const cashfree = await initializeCashfree();

      const paymentResponse = await axios.post(
        `${environment.baseUrl}/communities/create-payment-session`,
        {
          name: userDetails.name,
          email: userDetails.email,
          mobile: userDetails.mobile,
          amount: selectedCommunity.amount,
          entityId: selectedCommunity._id,
          entityType: 'community'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { order_id, payment_session_id } = paymentResponse.data.data;

      await cashfree.checkout({
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      });

      const verificationResponse = await verifyPayment(order_id, selectedCommunity._id);
      if (verificationResponse) {
        await joinCommunity(selectedCommunity._id);
        await fetchCommunities();
      } else {
        toast.error('Payment verification failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment process failed');
    } finally {
      setShowPaymentModal(false);
    }
  };

  const verifyPayment = async (orderId, entityId) => {
    const token = localStorage.getItem('accessToken');
    try {
      const verificationResponse = await axios.post(
        `${environment.baseUrl}/communities/verify-payment`,
        {
          orderId,
          entityId,
          entityType: 'community'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (verificationResponse.data.data.status === "SUCCESS") {
        toast.success('Payment successful!');
        return true;
      } else {
        toast.error('Payment verification failed');
        return false;
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Payment verification failed');
      return false;
    }
  };

  const joinCommunity = async (communityId) => {
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
      <ToastContainer />
      <InvestorNavbar />

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
                  src={community.image || communityPlaceholder} 
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
                {(!community.members.some(member => member?.member?.toString() === loggedInUserId) && community.isOpen) && community.adminId!==loggedInUserId && (
                  <button 
                    className="join-button" 
                    disabled={joiningCommunityId === community._id}
                    onClick={(e) => handleJoinCommunity(e, community)}
                  >
                    {joiningCommunityId === community._id ? 'Joining...' : 'Join'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPaymentModal && selectedCommunity && (
        <PurchasePopup
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          itemDetails={{
            type: 'community',
            name: selectedCommunity.name,
            description: selectedCommunity.about,
            memberCount: selectedCommunity.members.length + 1,
            isOpen: selectedCommunity.isOpen,
            amount: selectedCommunity.amount,
            is_free: selectedCommunity.subscription === 'free'
          }}
          onProceed={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
