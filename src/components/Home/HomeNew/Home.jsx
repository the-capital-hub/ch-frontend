import React from "react";
import HeroSection from "./Components/HeroSection/HeroSection";
import WhyChooseUs from "./Components/WhyChooseUs/WhyChooseUs";
import WhyUseCapitalHub from "./Components/WhyUseCapitalHub/WhyUseCapitalHub";
import ClientManagement from "./Components/ClientManagement/ClientManagement";
import About from "./Components/About/About";
import Footer from "../../Footer/FooterForSalesLanding/Footer2";
import "./home.scss";

const Home = () => {
	return (
		<div className="home-container">
			<HeroSection />
			<WhyChooseUs />
			<WhyUseCapitalHub />
			<ClientManagement />
			<About />
			<Footer />
		</div>
	);
};

export default Home;
