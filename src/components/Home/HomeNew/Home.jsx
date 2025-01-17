import React from "react";
import HeroSection from "./Components/HeroSection/HeroSection";
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs";
import WhyUseCapitalHub from "./Components/WhyUseCapitalHub/WhyUseCapitalHub";
import "./home.scss";

const Home = () => {
	return (
		<div className="home-container">
			<HeroSection />
			<WhyChooseUs />
			<WhyUseCapitalHub />
		</div>
	);
};

export default Home;
