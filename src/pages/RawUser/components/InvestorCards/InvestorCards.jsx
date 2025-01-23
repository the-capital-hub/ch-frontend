import React from "react";
import "./investorCards.scss";
import profile1 from "../../../../Images/avatars/image.png";
import profile2 from "../../../../Images/avatars/image-1.png";
import profile3 from "../../../../Images/avatars/image-2.png";

const InvestorCards = () => {
  const investors = [
    {
      name: "Karthik Kumar",
      location: "Bengaluru · 28 years",
      role: "Founder & CEO of capital Hub",
      description: "A little about myself: Dejection is a sign of failure but it becomes the cause of success. I wrote this when I was 16 years old and that's exactly what I believe in."
    },
    {
      name: "Samantha Li",
      location: "Los Angeles · 30 years",
      role: "UX Designer at Tech Innovations",
      description: "I believe in the power of creativity and innovation. Embracing challenges has always been my mantra. I strive to push boundaries and redefine possibilities."
    },
    {
      name: "Ahmed Hassan",
      location: "Dubai · 35 years",
      role: "Lead Software Engineer at Global Tech",
      description: "My passion for coding drives me to create solutions that make a difference. I enjoy collaborating with diverse teams to tackle complex problems."
    }
  ];

  return (
    <div className="investors-section">
      <h2 className="section-title main-title">Investors</h2>
      <h4 className="section-title sub-title">Who Recently Invested In Your Category!</h4>
      <div className="investor-cards">
        {investors.map((investor, index) => (
          <div key={index} className="investor-card">
            <div className="investor-image">
              <img 
                src={index === 0 ? profile1 : index === 1 ? profile2 : profile3} 
                alt={investor.name} 
              />
            </div>
            <div className="investor-info">
              <h3>{investor.name}</h3>
              <p className="location">{investor.location}</p>
              <p className="role">{investor.role}</p>
              <div className="divider"></div>
              <p className="description">{investor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorCards; 