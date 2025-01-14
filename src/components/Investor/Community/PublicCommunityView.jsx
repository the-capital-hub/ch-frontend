import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { selectLoggedInUserId } from '../../../Store/features/user/userSlice';
import About from './About/About';
import { toast } from 'react-hot-toast';
import "./PublicCommunityView.scss"
import PostCard from "../../PublicPostPage/PostCard/PostCard";
import { getAllPostsAPI } from "../../../Service/user";
import Modal from 'react-modal';
import { sendOTP, verifyOTP, postUserLogin } from "../../../Service/user";
import { loginSuccess } from '../../../Store/features/user/userSlice';

Modal.setAppElement('#root');

const PublicCommunityView = () => {
  const { communityId } = useParams();
  const [community, setCommunity] = useState(null);
  const navigate = useNavigate();
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const [adminPosts, setAdminPosts] = useState([]);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    userType: "startup founder",
    registeredFrom: "community-page"
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCommunityDetails();
    console.log(community);
  }, [communityId]);

  useEffect(() => {
   if(community){
      fetchAdminPosts();
      console.log(adminPosts);
   }
  }, [community]);

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

  const fetchAdminPosts = async () => {
    try {
      const response = await getAllPostsAPI(1);  
      const postsData = Array.isArray(response.data) ? response.data : 
                       Array.isArray(response.data?.data) ? response.data.data : [];  
      const communityPosts = postsData.filter(
        (item) => 
          item.postType === "community" && 
          item.communityId === community._id &&
          item.user._id === community?.adminId._id
      ).slice(0, 3);
      setAdminPosts(communityPosts);
    } catch (error) {
      console.error("Error fetching admin posts:", error);
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

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const phoneNumberWithPrefix = `+91${formData.phoneNumber}`;
      const response = await sendOTP(phoneNumberWithPrefix);
      setOrderId(response?.orderId);
      setShowOtpModal(true);
      setShowSignupModal(false);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleOtpVerify = async () => {
    setIsVerifyingOtp(true);
    try {
      const verificationCode = otp.join("");
      
      const otpResponse = await verifyOTP({
        otp: verificationCode,
        orderId,
        phoneNumber: `+91${formData.phoneNumber}`,
      });

      if (otpResponse.isOTPVerified) {
        console.log("OTP verified successfully, proceeding with registration...");
        
        // First register the user
        const registrationData = {
          ...formData,
          isInvestor: formData.userType === "investor",
          registeredFrom: "community-page",
        };
        console.log("Registration data:", registrationData);
        
        const registrationResponse = await axios.post(
          `${environment.baseUrl}/users/registerUser`,
          registrationData
        );
        console.log("Registration response:", registrationResponse);

        // Then login the user
        const loginResponse = await postUserLogin({
          phoneNumber: formData.phoneNumber,
        });
        console.log("Login response:", loginResponse);

        if (loginResponse?.user && loginResponse?.token) {
          const { user, token } = loginResponse;
          
          // Store user data
          localStorage.setItem("accessToken", token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(user));
          
          // Update Redux state
          dispatch(loginSuccess(user));
          
          // Close modals
          setShowOtpModal(false);
          setShowSignupModal(false);
          
          toast.success('Successfully registered and logged in!');
          
          // Join community
          console.log("Attempting to join community...");
          await handleJoinCommunity();
        } else {
          console.error("Login response missing user or token:", loginResponse);
          toast.error("Login failed after registration");
        }
      } else {
        console.error("OTP verification failed:", otpResponse);
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in handleOtpVerify:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsVerifyingOtp(false);
      setOtp(["", "", "", "", "", ""]); // Reset OTP input
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }
  };

  const renderSignupModal = () => (
    <Modal
      isOpen={showSignupModal}
      onRequestClose={() => setShowSignupModal(false)}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2>Create Account</h2>
        <button onClick={() => setShowSignupModal(false)}>×</button>
      </div>
      <form onSubmit={handleSignupSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
        <div className="phone-input-container">
          <span className="country-code">+91</span>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.phoneNumber}
            onChange={(e) => {
              setFormData(prev => ({...prev, phoneNumber: e.target.value}))
            }}
            pattern="[0-9]{10}"
            required
          />
        </div>
        <select
          value={formData.userType}
          onChange={(e) => setFormData({...formData, userType: e.target.value})}
          required
        >
          <option value="startup founder">Startup Founder</option>
          <option value="startup employee">Startup Employee</option>
          <option value="investor">Investor</option>
          <option value="vc">VC</option>
          <option value="student">Student</option>
        </select>
        <button type="submit">Send OTP</button>
      </form>
    </Modal>
  );

  const renderOtpModal = () => (
    <Modal
      isOpen={showOtpModal}
      onRequestClose={() => {
        setShowOtpModal(false);
        setOtp(["", "", "", "", "", ""]);
      }}
      className="modal-content"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={!isVerifyingOtp}
    >
      <div className="modal-header">
        <h2>Enter verification code</h2>
        <button 
          onClick={() => {
            setShowOtpModal(false);
            setOtp(["", "", "", "", "", ""]);
          }}
          disabled={isVerifyingOtp}
        >
          ×
        </button>
      </div>
      <p>We have just sent a verification code to your mobile number.</p>
      <div className="otp-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={isVerifyingOtp}
          />
        ))}
      </div>
      <button 
        onClick={handleOtpVerify} 
        disabled={isVerifyingOtp || otp.join("").length !== 6}
      >
        {isVerifyingOtp ? "Verifying..." : "Verify"}
      </button>
    </Modal>
  );

  return (
    <div className="public-community-view">
      <About community={community} />
      
      {/* Replace admin posts section */}
      {adminPosts.length > 0 && (
        <div className="admin-posts-container">
          <h3>Recent Posts from Admin</h3>
          <div className="admin-posts-content">
            {adminPosts.map(post => (
              <PostCard
                key={post._id}
                firstName={post.user.firstName}
                lastName={post.user.lastName}
                profilePicture={post.user.profilePicture}
                oneLinkId={post.user.oneLinkId}
                isSubscribed={false}
                startUpCompanyName={post.user.startUp}
                investorCompanyName={post.user.investor}
                designation={post.user.designation}
                location={post.user.location}
                description={post.description}
                video={post.video}
                image={post.image}
                images={post.images}
                createdAt={post.createdAt}
                likes={post.likes}
                comments={post.comments}
                pollOptions={post.pollOptions}
              />
            ))}
          </div>
        </div>
      )}

      {community?.isOpen && (
        <div className="join-banner">
          {loggedInUserId ? (
            <button onClick={handleJoinCommunity} className="join-button">
              Join Community
            </button>
          ) : (
            <button
              className="join-button"
              onClick={() => setShowSignupModal(true)}
            >
              Signup to join this community
            </button>
          )}
        </div>
      )}

      {renderSignupModal()}
      {renderOtpModal()}
    </div>
  );
};

export default PublicCommunityView; 