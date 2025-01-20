import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../../Store/features/design/designSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { environment } from "../../../../../environments/environment";
import "./Communities.scss";
import CommunityTag from "../../../../../Images/Newscard.svg";
import defaultCommunityImage from "../../../../../Images/blog/1 AsPGU1Q42C9lsVRoMg91Nw.webp";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CommunitiesHorizontal = () => {
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const communitiesContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          `${environment.baseUrl}/communities/getAllCommunities`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedCommunities = response.data.data
          .sort((a, b) => (b.members.length + 1) - (a.members.length + 1))
          .slice(0, 5);
        setCommunities(sortedCommunities);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching communities:', error);
        setIsLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const handleScroll = () => {
    const container = communitiesContainerRef.current;
    if (container) {
      const hasScrolledLeft = container.scrollLeft > 0;
      const hasMoreRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 1);
      
      setShowLeftArrow(hasScrolledLeft);
      setShowRightArrow(hasMoreRight);
    }
  };

  useEffect(() => {
    const container = communitiesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction) => {
    const container = communitiesContainerRef.current;
    if (container) {
      const cardWidth = 316; // card width + gap
      const currentScroll = container.scrollLeft;
      const newScroll = direction === 'left' 
        ? Math.max(0, currentScroll - cardWidth)
        : Math.min(container.scrollWidth - container.clientWidth, currentScroll + cardWidth);
      
      container.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  const CommunityItemSkeleton = () => (
    <div className="news-item skeleton">
      <div className="news-header">
        <div className="skeleton-text skeleton-title"></div>
        <div className="skeleton-text skeleton-description"></div>
      </div>
      <div className="skeleton-image"></div>
      <div className="skeleton-text skeleton-stats"></div>
    </div>
  );

  return (
    <div className={`communities-container`}>
    <div className={`news-container ${theme === "dark" ? "dark-theme" : ""}`}>
      <div className="news-header">
        <h3>Communities Corner ({communities.length})</h3>
        <div className="load-more-container">
          <button
            className="news-cta load-more"
            onClick={() => navigate('/explore-communities')}
          >
            View All
          </button>
        </div>
      </div>

      <div className="communities-scroll-container">
        {showLeftArrow && (
          <button 
            className="scroll-arrow left" 
            onClick={() => scroll('left')}
          >
            <IoIosArrowBack />
          </button>
        )}
        
        <div className="news-item-container" ref={communitiesContainerRef}>
          {communities.map((community) => (
            <div
              key={community._id}
              className="news-item"
              onClick={() => navigate(`/community/${community._id}`)}
            >
              <img
                src={community.image || defaultCommunityImage}
                alt={community.name}
                className="community-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultCommunityImage;
                }}
              />
              <div className="community-content">
                <h3>{community.name}</h3>
                <p>{community.description || "Join our vibrant community!"}</p>
                <div className="community-stats">
                  <span>{community.members.length + 1} members</span>
                  <span className="subscription-info">
                    {community.subscription === 'free' 
                      ? 'Free to join' 
                      : `₹${community.amount} subscription`}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {isLoading &&
            Array(3)
              .fill()
              .map((_, index) => <CommunityItemSkeleton key={`skeleton-${index}`} />)}
        </div>

        {showRightArrow && (
          <button 
            className="scroll-arrow right" 
            onClick={() => scroll('right')}
          >
            <IoIosArrowForward />
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default CommunitiesHorizontal; 