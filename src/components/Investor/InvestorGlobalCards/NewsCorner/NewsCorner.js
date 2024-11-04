import React, { useEffect, useState } from "react";
import "./newscorner.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";
import { environment } from "../../../../environments/environment";
// Dummy image URL
import dummyImageUrl from "../../../../Images/blog/1 AsPGU1Q42C9lsVRoMg91Nw.webp";
const baseUrl = environment.baseUrl;

const NewsCorner = ({ title, btnlink }) => {
	const theme = useSelector(selectTheme);
	const [newsData, setNewsData] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index
	// console.log(newsData);

	// Function to fetch news
	const fetchNews = async () => {
		try {
			const response = await fetch(`${baseUrl}/news/getTodaysNews`);
			const data = await response.json();
			const filteredArticles =
				data?.articles?.filter(
					(article) =>
						article?.author != null && // Check if author is not null or undefined
						article?.title &&
						article?.description &&
						article?.url &&
						article?.urlToImage &&
						article?.publishedAt
				) || [];
			setNewsData(filteredArticles);
		} catch (error) {
			console.error("Error fetching news:", error);
		}
	};

	// Fetch news on component mount
	useEffect(() => {
		fetchNews(); // Initial fetch
	}, []);

	// Set interval to update the current index every 5 minutes
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) => {
				const nextIndex = prevIndex + 5;
				return nextIndex < newsData.length ? nextIndex : 0; // Wrap around if exceeds length
			});
		}, 60000); // 1 minutes in milliseconds

		// Cleanup function to clear the interval
		return () => clearInterval(intervalId);
	}, [newsData.length]); // Depend on the length of newsData

	// Get the current slice of news items
	const newsItems = newsData.slice(currentIndex, currentIndex + 5);

	return (
		<>
			<div className="newscorner_container">
				<div className="col-12 newscorner_card">
					<div className="card mt-2 right_view_profile_card right_view_profile">
						<div className="card-header">
							<div className="title">
								<span>News Corner</span>
							</div>
						</div>
						{newsItems.map((item, index) => (
							<Link
								to={item.url}
								style={{ textDecoration: "none" }}
								target="_blank"
								className="card-body newscorner_card_body"
								key={index}
							>
								<div className="newscorner_card_text d-flex align-items-center gap-2 justify-content-between">
									<h4
										className="smallest_typo"
										style={{
											width: "250px",
											color: theme === "dark" ? "#fff" : "#000",
										}}
									>
										{item.title || "No title available"}
									</h4>
									<div
										className="newsImage__container"
										style={{ marginLeft: "auto" }}
									>
										{" "}
										{/* Align image to the right */}
										<img
											src={item.urlToImage || dummyImageUrl} // Use dummy image if urlToImage is not available
											alt="News"
											onError={(e) => {
												e.target.onerror = null; // Prevents infinite loop in case the dummy image also fails
												e.target.src = dummyImageUrl; // Set to dummy image if the original fails
											}}
											style={{
												width: "100px",
												height: "70px",
												objectFit: "cover",
												borderRadius: "8px",
												marginLeft: "auto",
											}}
										/>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default NewsCorner;

// import React, { useEffect, useState } from "react";
// import "./newscorner.scss";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectTheme } from "../../../../Store/features/design/designSlice";
// import { environment } from "../../../../environments/environment";
// const baseUrl = environment.baseUrl;

// const NewsCorner = ({ title, btnlink }) => {
// 	const theme = useSelector(selectTheme);
// 	const [newsData, setNewsData] = useState([]);
// 	const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index

// 	// Function to fetch news
// 	const fetchNews = async () => {
// 		try {
// 			const response = await fetch(`${baseUrl}/news/getTodaysNews`);
// 			const data = await response.json();
// 			const filteredArticles =
// 				data?.articles?.filter(
// 					(article) =>
// 						article?.author != null && // Check if author is not null or undefined
// 						article?.title &&
// 						article?.description &&
// 						article?.url &&
// 						article?.urlToImage &&
// 						article?.publishedAt
// 				) || [];
// 			setNewsData(filteredArticles);
// 		} catch (error) {
// 			console.error("Error fetching news:", error);
// 		}
// 	};

// 	// Fetch news on component mount
// 	useEffect(() => {
// 		fetchNews(); // Initial fetch
// 	}, []);

// 	// Set interval to update the current index every 5 minutes
// 	useEffect(() => {
// 		const intervalId = setInterval(() => {
// 			setCurrentIndex((prevIndex) => {
// 				const nextIndex = prevIndex + 5;
// 				return nextIndex < newsData.length ? nextIndex : 0; // Wrap around if exceeds length
// 			});
// 		}, 60000); // 1 minutes in milliseconds

// 		// Cleanup function to clear the interval
// 		return () => clearInterval(intervalId);
// 	}, [newsData.length]); // Depend on the length of newsData

// 	// Get the current slice of news items
// 	const newsItems = newsData.slice(currentIndex, currentIndex + 5);

// 	return (
// 		<>
// 			<div className="newscorner_container">
// 				<div className="col-12 newscorner_card">
// 					<div className="card mt-2 right_view_profile_card right_view_profile">
// 						<div className="card-header">
// 							<div className="title">
// 								<span>News Corner</span>
// 							</div>
// 						</div>
// 						{newsItems.map((item, index) => (
// 							<Link
// 								to={item.url}
// 								style={{ textDecoration: "none" }}
// 								target="_blank"
// 								className="card-body newscorner_card_body"
// 								key={index}
// 							>
// 								<div className="newscorner_card_text d-flex align-items-center gap-1">
// 									<h4
// 										className="smallest_typo"
// 										style={{ color: theme === "dark" ? "#fff" : "#000" }}
// 									>
// 										{item.title || "No title available"}
// 									</h4>
// 									<div className="newsImage__container">
// 										<img
// 											src={item.urlToImage}
// 											alt="News"
// 											style={{
// 												width: "100px",
// 												height: "auto",
// 												objectFit: "contain",
// 												borderRadius: "8px",
// 											}}
// 										/>
// 									</div>
// 								</div>
// 							</Link>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default NewsCorner;
