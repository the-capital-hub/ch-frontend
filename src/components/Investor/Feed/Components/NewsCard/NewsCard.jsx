import React from 'react';
import './NewsCard.scss'; 

const NewsCard = ({ title, description, url, urlToImage, publishedAt }) => {
    return (
        <div className="news-card">
            <img src={urlToImage} alt={title} className="news-card__image" />
            <h3 className="news-card__title">{title}</h3>
            <p className="news-card__description">{description}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="news-card__link">
                Read more
            </a>
            {/* <span className="news-card__date">{new Date(publishedAt).toLocaleDateString()}</span> */}
        </div>
    );
};

export default NewsCard;
