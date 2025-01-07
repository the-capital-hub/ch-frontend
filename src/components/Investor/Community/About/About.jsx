import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import './About.scss';

const About = ({ community }) => {
  const admin = community?.adminId;
  return (
    <div className="about-container">
      <div className="community-banner">
        <img src={community?.image} alt={community?.name} className="community-image" />
        <h1>
          {community?.name}
          {community?.subscription === 'free' ? (
            <span style={{ fontSize: '1rem', fontStyle: 'italic', marginLeft: '8px' }}>Free to Join</span>
          ) : (
            <span style={{ fontSize: '1rem', marginLeft: '8px' }}>Paid Community: ₹{community?.amount}</span>
          )}
        </h1>
      </div>

      <div className="content-section">
        <div className="description-section">
          <h2 className='community-heading'>About Community</h2>
          <p>{community?.description}</p>
          <p>{community?.about}</p>
        </div>

        <div className="admin-section">
          <h2 className='community-heading'>Community Admin</h2>
          {admin && (
            <div className="admin-card">
              <img src={admin.profilePicture} alt={`${admin.firstName} ${admin.lastName}`} />
              <div className="admin-info">
                <h3 style={{ display: 'flex', alignItems: 'center' }}>
                  {admin.firstName} {admin.lastName}
                  {admin.linkedin && (
                    <a 
                      href={admin.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="linkedin-link"
                      style={{ marginLeft: '8px' }}
                    >
                      <FaLinkedin />
                    </a>
                  )}
                </h3>
                
                <p className="company">
                  {admin.startUp?.company || admin.investor?.companyName || 'Company not specified'}
                </p>
                <p className="designation">{admin.designation || 'Designation not specified'}</p>
                <p className="location">{admin.location || 'Location not specified'}</p>
                <p className="bio">{admin.bio || 'No bio available'}</p>
                
              </div>
            </div>
          )}
        </div>

        <div className="terms-section">
          <h2 className='community-heading'>Terms and Conditions</h2>
          {Array.isArray(community?.terms_and_conditions) && community.terms_and_conditions.length > 0 ? (
            <ul>
              {community.terms_and_conditions.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          ) : (
            <p>No terms and conditions available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About; 