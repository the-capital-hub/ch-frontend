import React from 'react';
import InvestmentAreas from './InvestmentAreas';
import CompaniesInvested from './CompaniesInvested';
//import JointInvestments from './JointInvestments';
import './style.scss';

const ProfileSection = ({ profile }) => {
  return (
    <div className="profile-section">
      {/*<InvestmentAreas areas={profile?.myInterests} />*/}
      <CompaniesInvested companies={profile?.startupsInvested} />
    
    </div>
  );
};

export default ProfileSection;
