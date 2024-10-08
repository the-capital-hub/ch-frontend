import React from 'react';
import './style.scss';
import { selectTheme } from "../../../../Store/features/design/designSlice";
import { useSelector } from "react-redux";


const InvestmentAreas = ({ areas }) => {
  const theme = useSelector(selectTheme);
  return (
    <div className="investment-area">
      <h5 style={{color:theme === "dark"?"#f5f5f5":"#292B33"}}>Prominent Investment Areas</h5>
      <div className="areas">
        {areas?.map((area, index) => (
          <div key={index} className="area" style={{background:theme === "dark"?"#292B33":"#f5f5f5"}}>
            <img src={area.logo} alt={area.name} />
            <span style={{color:theme === "dark"?"#f5f5f5":"#292B33"}}>{area.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentAreas;
