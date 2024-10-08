import "./ChatDropDownMenu.scss";
import DownArrow from "../../../../Images/white-down-arrow.png";

import React, { useState } from "react";

function ChatDropDownMenu({ onClicks, id, idBack }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsHovered(!isHovered);
  };
  const handleIdBack = () => {
    idBack(id);
  };

  return (
    <div className="chatDropDownMenu">
      <button className="btn bg-transparent border-0" onClick={handleClick}>
        <img src={DownArrow} alt="dot" className="down-arrow" />
      </button>
      {isHovered && (
        <div className="delete-message border shadow-sm rounded">
          <h1
            onClick={() => {
              onClicks();
              handleIdBack();
            }}
          >
            Delete
          </h1>
        </div>
      )}
    </div>
  );
}

export default ChatDropDownMenu;
