import React from "react";
import Home from "./COMPONENTS/Home/Home";
import CarouselImage from "./COMPONENTS/ImageCarousel/ImageCarousel";
import ProcessNew from "./COMPONENTS/ProcessNew/ProcessNew";
import HustlersCapitalHub from "./COMPONENTS/WhyJoinHustlers&WhyUseCapitalHub/HustlersCapitalHub";
import EmpowerYourStartup from "./COMPONENTS/EmpowerYourStartup/EmpowerYourStartup";
import FounderNew from "./COMPONENTS/FounderNew/FounderNew";
import About from "./COMPONENTS/About/AboutUs";

import Footer from "../../../components/Footer/FooterForSalesLanding/Footer2";
import "./salesLandingPage.scss";

const StartUpLendingPage = () => {
	return (
		<div className="sales-lending-page-container">
			<Home />
			<CarouselImage />
			<EmpowerYourStartup />
			<ProcessNew />
			<HustlersCapitalHub />
			<FounderNew />
			<About />
			<Footer />
		</div>
	);
};

export default StartUpLendingPage;
