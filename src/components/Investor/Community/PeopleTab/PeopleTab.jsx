import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PeopleTab.scss";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const PeopleTab = ({ community }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
    navigate(`/${username}/${userId}`);
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
            </div>
            <div className="social-icons">
              <FaWhatsapp className="whatsapp-icon" />
              <FaInstagram className="instagram-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleTab; 