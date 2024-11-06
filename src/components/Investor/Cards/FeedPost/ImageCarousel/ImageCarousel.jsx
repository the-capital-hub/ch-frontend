// ImageCarousel.jsx
import React, { useState, useRef } from "react";
import "./ImageCarousel.scss";

const ImageCarousel = ({ images, repostPreview, handleImageOnClick }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef(null);

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
						className="image-item"
						style={{ width: repostPreview ? "50%" : "100%" }}
						onClick={() => handleImageOnClick?.(index)}
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
	);
};

export default ImageCarousel;
