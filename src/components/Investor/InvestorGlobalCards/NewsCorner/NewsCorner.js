// import React, { useEffect, useState } from "react";
// import "./newscorner.scss";
// import { Link } from "react-router-dom";
// // import startupOneImage from "../../../../Images/blog/1 AsPGU1Q42C9lsVRoMg91Nw.webp";
// // import startupTwoImage from "../../../../Images/blog/eighttips.webp";
// // import startupThreeImage from "../../../../Images/blog/threefive.webp";
// import { useSelector } from "react-redux";
// import { selectTheme } from "../../../../Store/features/design/designSlice";
// import { environment } from "../../../../environments/environment";
// const baseUrl = environment.baseUrl;

// const NewsCorner = ({ title, btnlink }) => {
// 	const theme = useSelector(selectTheme);
// 	const [newsData, setNewsData] = useState([]);
// 	// console.log("newsData", newsData);

// 	//Fetching NEWS
// 	useEffect(() => {
// 		const fetchNews = async () => {
// 			try {
// 				const response = await fetch(`${baseUrl}/news/getTodaysNews`);
// 				const data = await response.json();
// 				const filteredArticles =
// 					data?.articles?.filter(
// 						(article) =>
// 							article?.author != null && // Check if author is not null or undefined
// 							article?.title &&
// 							article?.description &&
// 							article?.url &&
// 							article?.urlToImage &&
// 							article?.publishedAt
// 					) || [];
// 				setNewsData(filteredArticles);
// 			} catch (error) {
// 				console.error("Error fetching news:", error);
// 			}
// 		};

// 		fetchNews();
// 	}, []);

// 	const newsItems = newsData.slice(0, 5).map((article, index) => ({
// 		title: article.title,
// 		btnlink: article.url,
// 		image: article.urlToImage,
// 		id: index,
// 	}));
// 	// const newsItems = [
// 	// 	{
// 	// 		title:
// 	// 			"Why Mentoring Matters: Why Angel Investors Should Prioritize Mentorship Before Investing in a Startup",
// 	// 		btnlink: "/blog/startupOne",
// 	// 		image: startupOneImage,
// 	// 		id: 1,
// 	// 	},
// 	// 	{
// 	// 		title: "8 Tips to start raising Angel investments for startups",
// 	// 		btnlink: "/blog/startupTwo",
// 	// 		image: startupTwoImage,
// 	// 		id: 2,
// 	// 	},
// 	// 	{
// 	// 		title: "HOW TO BUILD A GREAT STARTUP by Pramod Badiger",
// 	// 		btnlink: "/blog/startupThree",
// 	// 		image: startupThreeImage,
// 	// 		id: 3,
// 	// 	},
// 	// ];

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
// 								to={item.btnlink ? item.btnlink : ""}
// 								style={{ textDecoration: "none" }}
// 								target="_blank"
// 								className="card-body newscorner_card_body "
// 								key={item.id}
// 							>
// 								<div className="newscorner_card_text d-flex align-items-center gap-1">
// 									<h4
// 										className="smallest_typo"
// 										style={{ color: theme === "dark" ? "#fff" : "#000" }}
// 									>
// 										{item.title
// 											? item.title
// 											: " Cellbell startup has raised to $10 million dollor funding"}
// 									</h4>
// 									<div className="newsImage__container">
// 										<img
// 											src={item.image}
// 											alt="News"
// 											style={{
// 												width: "100px",
// 												height: "auto",
// 												objectFit: "contain",
// 												borderRadius: "8px",
// 											}}
// 										/>
// 									</div>
// 									{/* <Link
//                       to={item.btnlink ? item.btnlink : ""}
//                       style={{ textDecoration: "none" }}
//                       target="_blank"
//                       className="d-flex justify-content-center align-items-center mt-1 show__more__link mx-auto"
//                     >
//                       <button className="d-flex align-items-center justify-content-center show__more">
//                         <span className="text-center">Show more</span>
//                       </button>
//                     </Link> */}
// 								</div>
// 							</Link>
// 						))}
// 						{/* <hr className="hr" /> */}
// 						{/* <div className="card-body newscorner_card_body ">
//               <div className="newscorner_card_text">
//                 <h4 className="smallest_typo">
//                   {title
//                     ? title
//                     : " Cellbell startup has raised to $10 million dollor funding"}
//                 </h4>
//                 <Link to={btnlink ? btnlink : ""} style={{textDecoration:"none"}}>
//                   <button>
//                     <span>Show more</span>
//                   </button>
//                 </Link>
//               </div>
//             </div> */}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// export default NewsCorner;

import React, { useEffect, useState } from "react";
import "./newscorner.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";
import { environment } from "../../../../environments/environment";
const baseUrl = environment.baseUrl;

const NewsCorner = ({ title, btnlink }) => {
	const theme = useSelector(selectTheme);
	const [newsData, setNewsData] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0); // State to track the current index

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
		}, 30000); // 5 minutes in milliseconds

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
								<div className="newscorner_card_text d-flex align-items-center gap-1">
									<h4
										className="smallest_typo"
										style={{ color: theme === "dark" ? "#fff" : "#000" }}
									>
										{item.title || "No title available"}
									</h4>
									<div className="newsImage__container">
										<img
											src={item.urlToImage}
											alt="News"
											style={{
												width: "100px",
												height: "auto",
												objectFit: "contain",
												borderRadius: "8px",
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
