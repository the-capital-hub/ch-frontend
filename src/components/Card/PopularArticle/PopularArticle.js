// import React from 'react'
// import './PopularArticle.scss'

// const PopularArticle = () => {
//   return (
//     <div>PopularArticle</div>
//   )
// }

// export default PopularArticle

import React from "react";
import "./PopularArticle.scss";

const PopularArticle = ({ image, button }) => {
  return (
    <div className="article_blog_card">
      <div className="left-column">
        <img className="blog-card-image" src={image} alt="Blog" />
      </div>
      <div className="right-column">
        <button className="blog-card-button">{button}</button>

        <h3 className="blog-card-title">Blog Title</h3>
        <p className="blog-card-date">August 24, 2023</p>
      </div>
    </div>
  );
};

export default PopularArticle;
