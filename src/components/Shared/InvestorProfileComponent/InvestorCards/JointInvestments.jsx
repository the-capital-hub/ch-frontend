import React from 'react';
import './style.scss';
import { selectTheme } from "../../../../Store/features/design/designSlice";
import { useSelector } from "react-redux";

const JointInvestments = ({ partners }) => {
  const theme = useSelector(selectTheme);
  return (
    <div className="joint-investments">
      <h5 style={{color:theme === "dark"?"#f5f5f5":"#292B33"}}>Previously Anupam Mittal has invested jointly with</h5>
      <div className="partners" >
        {partners.map((partner, index) => (
          <div key={index} className="partner" style={{background:theme === "dark"?"#292B33":"#f5f5f5"}}>
            <img src={partner.photo} alt={partner.name} />
            <span style={{color:theme === "dark"?"#f5f5f5":"#292B33"}}>{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JointInvestments;
