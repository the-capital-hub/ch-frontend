import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../../Store/features/design/designSlice";
import { Link, useNavigate } from "react-router-dom";
import { getInshortsNews } from "../../../../../Service/user";
import "./News.scss";

const NewsCard = () => {
	const theme = useSelector(selectTheme);
	const navigate = useNavigate();
	const [news, setNews] = useState([]);
	const [newsOffset, setNewsOffset] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const newsItemContainerRef = useRef(null);
	let scrollInterval = null;

	// console.log("News", news);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setIsLoading(true);
				const response = await getInshortsNews("en", "startup");
				if (response) {
					setNews(response.posts);
					setNewsOffset(response.news_offset);
					setIsLoading(false);
				}
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		};

		fetchNews();
	}, []);

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

	const fetchMoreNews = async () => {
		try {
			setIsLoading(true);
			const response = await getInshortsNews("en", "startup", newsOffset);
			if (response) {
				setNews((prevNews) => [...prevNews, ...response.posts]);
				setNewsOffset(response.news_offset);
				setIsLoading(false);
			}
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const handleNavigate = (url) => {
		// Open in new window or tab
		window.open(url, "_blank", "noopener,noreferrer");
	};

	// Skeleton Loader Component
	const NewsItemSkeleton = () => (
		<div className="news-item skeleton">
			<div className="news-header">
				<div className="news-profile skeleton-text"></div>
			</div>
			<div className="news-content">
				<div className="skeleton-text skeleton-title"></div>
				<div className="skeleton-text skeleton-description"></div>
				<div className="skeleton-image"></div>
			</div>
		</div>
	);

	return (
		<div
			className={`news-container ${theme === "dark" ? "dark-theme" : ""}`}
			data-bs-theme={theme}
		>
			<div className="news-header">
				<h3>Startup Corner ({news.length})</h3>
				{/* Load More Button */}
				<div className="load-more-container">
					<button
						className="news-cta load-more"
						onClick={fetchMoreNews}
						disabled={isLoading}
					>
						{isLoading ? "Loading..." : "Load More"}
					</button>
				</div>
			</div>

			<div className="news-item-container" ref={newsItemContainerRef}>
				{news.map((newsItem, index) => (
					<div
						key={index}
						className="news-item"
						onClick={() => handleNavigate(newsItem?.sourceURL)}
					>
						<div className="news-header">
							<div className="news-profile">
								<span>{newsItem?.author}</span>
							</div>
						</div>
						<div className="news-content">
							<h3>{newsItem?.title}</h3>
							<p>{newsItem?.content}</p>
							{/* <Link to={newsItem?.sourceURL}> */}
							<img src={newsItem?.image} alt="Join 5,000 Others" />
							{/* </Link> */}
						</div>
					</div>
				))}

				{/* Skeleton Loaders */}
				{isLoading &&
					Array(3)
						.fill()
						.map((_, index) => <NewsItemSkeleton key={`skeleton-${index}`} />)}
			</div>
		</div>
	);
};

export default NewsCard;
