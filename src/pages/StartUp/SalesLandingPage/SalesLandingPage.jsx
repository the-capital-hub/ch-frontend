import React from "react";
import Home from "./COMPONENTS/Home/Home";
import CarouselImage from "./COMPONENTS/ImageCarousel/ImageCarousel";
import ProcessNew from "./COMPONENTS/ProcessNew/ProcessNew";
import HustlersCapitalHub from "./COMPONENTS/WhyJoinHustlers&WhyUseCapitalHub/HustlersCapitalHub";
import EmpowerYourStartup from "./COMPONENTS/EmpowerYourStartup/EmpowerYourStartup";
import Founder from "./COMPONENTS/Founder/founder";
import About from "./COMPONENTS/About/AboutUs";
import "./salesLandingPage.scss";

const StartUpLendingPage = () => {
	return (
		<div className="sales-lending-page-container">
			<Home />
			<CarouselImage />
			<ProcessNew />
			<EmpowerYourStartup />
			<HustlersCapitalHub />
			<Founder />
			<About />
		</div>
	);
};

export default StartUpLendingPage;
