import React from "react";
import "./NewsCard.scss";
import Newscard from "../../../../../Images/Newscard.svg";
import dummyImageUrl from "../../../../../Images/blog/1 AsPGU1Q42C9lsVRoMg91Nw.webp";

const NewsCard = ({ title, description, url, urlToImage, publishedAt }) => {
	return (
		<div className="news-card">
			{/* <div className="news-card-tag">News</div> */}
			<img
				src={Newscard}
				alt="News Tag"
				className="news-card-tag"
				style={{ width: "80px" }}
			/>
			<img
				src={urlToImage || dummyImageUrl}
				alt={title}
				onError={(e) => {
					e.target.onerror = null; // Prevents infinite loop in case the dummy image also fails
					e.target.src = dummyImageUrl; // Set to dummy image if the original fails
				}}
				className="news-card__image"
			/>
			<h3 className="news-card__title">{title}</h3>
			<p className="news-card__description">{description}</p>
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className="news-card__link"
			>
				Read more
			</a>
			{/* <span className="news-card__date">{new Date(publishedAt).toLocaleDateString()}</span> */}
		</div>
	);
};

export default NewsCard;
