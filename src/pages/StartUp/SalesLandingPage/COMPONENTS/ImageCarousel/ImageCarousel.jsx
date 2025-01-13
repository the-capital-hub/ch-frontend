import React, { useState, useRef, useEffect } from "react";
import CarouselImg1 from "../imagesNew/CarouselImg1.jpg";
import CarouselImg2 from "../imagesNew/CarouselImg2.jpg";
import CarouselImg3 from "../imagesNew/CarouselImg3.jpg";
import CarouselImg4 from "../imagesNew/CarouselImg4.jpg";
import img from "../imagesNew/CarouselImg.png";
import "./ImageCarousel.scss";

const images = [
	img,
	CarouselImg1,
	CarouselImg2,
	CarouselImg3,
	CarouselImg4,
	img,
];

const ImageCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fade, setFade] = useState(true); // State to control fade effect
	const containerRef = useRef(null);
	const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false); // Start fade out
			setTimeout(() => {
				setCurrentIndex((prevIndex) => {
					const nextIndex = prevIndex + direction;
					if (nextIndex >= images.length) {
						setDirection(-1); // Change direction to backward
						return images.length - 1; // Stay at the last image
					} else if (nextIndex < 0) {
						setDirection(1); // Change direction to forward
						return 0; // Stay at the first image
					}
					return nextIndex;
				});
				setFade(true); // Start fade in
			}, 500); // Duration of fade out
		}, 3000); // Change image every 3 seconds

		return () => clearInterval(interval); // Cleanup on unmount
	}, [direction]);

	useEffect(() => {
		if (containerRef.current) {
			const scrollPosition = currentIndex * containerRef.current.offsetWidth;
			containerRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
		}
	}, [currentIndex]);

	const handleScroll = () => {
		if (containerRef.current) {
			const scrollPosition = containerRef.current.scrollLeft;
			const itemWidth = containerRef.current.offsetWidth;
			const newIndex = Math.round(scrollPosition / itemWidth);
			if (newIndex !== currentIndex) {
				setCurrentIndex(newIndex);
			}
		}
	};

	const handleDotClick = (index, e) => {
		e.stopPropagation();
		if (containerRef.current) {
			const scrollPosition = index * containerRef.current.offsetWidth;
			containerRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
			setCurrentIndex(index);
		}
	};

	return (
		<div className="SLP-Carousel">
			<div className="carousel-container">
				<div
					ref={containerRef}
					className="image-scroll-container"
					onScroll={handleScroll}
				>
					{images.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Slide ${index + 1}`}
							className={`image-item ${fade ? "fade-in" : "fade-out"}`}
						/>
					))}
				</div>

				<div className="carousel-dots">
					{images.map((_, index) => (
						<span
							key={index}
							className={`dot ${index === currentIndex ? "active" : ""}`}
							onClick={(e) => handleDotClick(index, e)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ImageCarousel;
// import React, { useState, useRef, useEffect } from "react";
// import "./ImageCarousel.scss";

// const images = [
// 	img,
// 	CarouselImg1,
// 	CarouselImg2,
// 	CarouselImg3,
// 	CarouselImg4,
// 	img,
// ];

// const ImageCarousel = () => {
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const containerRef = useRef(null);
// 	const [direction, setDirection] = useState(1);

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setCurrentIndex((prevIndex) => {
// 				const nextIndex = prevIndex + direction;
// 				if (nextIndex >= images.length) {
// 					setDirection(-1); // Change direction to backward
// 					return images.length - 1; // Stay at the last image
// 				} else if (nextIndex < 0) {
// 					setDirection(1); // Change direction to forward
// 					return 0; // Stay at the first image
// 				}
// 				return nextIndex;
// 			});
// 		}, 3000); // Change image every 3 seconds

// 		return () => clearInterval(interval); // Cleanup on unmount
// 	}, [direction]);

// 	useEffect(() => {
// 		if (containerRef.current) {
// 			const scrollPosition = currentIndex * containerRef.current.offsetWidth;
// 			containerRef.current.scrollTo({
// 				left: scrollPosition,
// 				behavior: "smooth",
// 			});
// 		}
// 	}, [currentIndex]);

// 	const handleScroll = () => {
// 		if (containerRef.current) {
// 			const scrollPosition = containerRef.current.scrollLeft;
// 			const itemWidth = containerRef.current.offsetWidth;
// 			const newIndex = Math.round(scrollPosition / itemWidth);
// 			if (newIndex !== currentIndex) {
// 				setCurrentIndex(newIndex);
// 			}
// 		}
// 	};

// 	const handleDotClick = (index, e) => {
// 		e.stopPropagation();
// 		if (containerRef.current) {
// 			const scrollPosition = index * containerRef.current.offsetWidth;
// 			containerRef.current.scrollTo({
// 				left: scrollPosition,
// 				behavior: "smooth",
// 			});
// 			setCurrentIndex(index);
// 		}
// 	};

// 	return (
// 		<div className="SLP-Carousel">
// 			<div className="carousel-container">
// 				<div
// 					ref={containerRef}
// 					className="image-scroll-container"
// 					onScroll={handleScroll}
// 				>
// 					{images.map((image, index) => (
// 						<img
// 							key={index}
// 							src={image}
// 							alt={`Slide ${index + 1}`}
// 							className="image-item"
// 						/>
// 					))}
// 				</div>

// 				<div className="carousel-dots">
// 					{images.map((_, index) => (
// 						<span
// 							key={index}
// 							className={`dot ${index === currentIndex ? "active" : ""}`}
// 							onClick={(e) => handleDotClick(index, e)}
// 						/>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default ImageCarousel;
