import React, { useRef, useEffect } from "react";
// import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../../Store/features/design/designSlice";
import { Link } from "react-router-dom";

import "./News.scss";

const NewsCard = ({ newsData }) => {
	const theme = useSelector(selectTheme);
	const newsItemContainerRef = useRef(null);
	let scrollInterval = null;
	// console.log("newsData", newsData);

	useEffect(() => {
		const newsItemContainer = newsItemContainerRef.current;

		const handleScroll = () => {
			if (
				newsItemContainer.scrollLeft + newsItemContainer.clientWidth >=
				newsItemContainer.scrollWidth
			) {
				newsItemContainer.scrollLeft = 0;
			} else {
				newsItemContainer.scrollLeft += 1;
			}
		};

		scrollInterval = setInterval(handleScroll, 25);

		const handleMouseEnter = () => {
			clearInterval(scrollInterval);
		};

		const handleMouseLeave = () => {
			scrollInterval = setInterval(handleScroll, 25);
		};

		newsItemContainer.addEventListener("mouseenter", handleMouseEnter);
		newsItemContainer.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			clearInterval(scrollInterval);
			newsItemContainer.removeEventListener("mouseenter", handleMouseEnter);
			newsItemContainer.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, []);

	return (
		<div
			className={`news-container ${theme === "dark" ? "dark-theme" : ""}`}
			data-bs-theme={theme}
		>
			<h3>Latest News</h3>
			<div className="news-item-container" ref={newsItemContainerRef}>
				{newsData.map((newsItem, index) => (
					<div key={index} className="news-item">
						<div className="news-header">
							<div className="news-profile">
								{/* <img src="fintech-news-profile.png" alt="Fintech News" /> */}
								<span>{newsItem?.source?.name}</span>
							</div>
							{/* <button className="news-menu">
								<FiMoreVertical />
                </button> */}
						</div>
						<div className="news-content">
							<h3>{newsItem?.title}</h3>
							<p>{newsItem?.description}</p>
							<Link to={newsItem?.url}>
								<img src={newsItem?.urlToImage} alt="Join 5,000 Others" />
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NewsCard;
