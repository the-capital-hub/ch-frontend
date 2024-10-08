import React from "react";
import "./LattestBlogCard.scss";

const LattestBlogCard = ({ image, button, title, date, onClick }) => {
  return (
    <div className="blog-card col-lg-4 col-md-6 col-sm-12" onClick={onClick}>
      <img className="blog-card-image rounded-3" src={image} alt="Blog" />
      <button className="blog-card-button">{button}</button>
      <div className="blog-card-details">
        <h3 className="blog-card-title">{title}</h3>
        <p className="blog-card-date">{date}</p>
      </div>
    </div>
  );
};

export default LattestBlogCard;
