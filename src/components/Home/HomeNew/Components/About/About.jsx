import React, { useState } from "react";
import ComaImg from "../../Images/Picture1.png";
import ComaImg2 from "../../Images/Picture2.png";
import Pic1 from "../../Images/Picture3.png";
import Pic2 from "../../Images/Picture4.png";
import Pic3 from "../../Images/Picture5.png";
import Pic4 from "../../Images/Picture6.png";
import Pic5 from "../../Images/Picture7.png";
import Pic6 from "../../Images/Picture8.png";
import Pic7 from "../../Images/Picture9.png";
import Pic8 from "../../Images/Picture10.png";
import "./About.scss";

const AboutUs = () => {
	const [email, setEmail] = useState("");

	const handleSubscribe = (e) => {
		e.preventDefault();
		// Handle subscription logic here
		setEmail("");
	};
	return (
		<div className="aboutus-container">
			<div className="aboutus-title">
				<h1>
					<span>What </span>our customer
				</h1>
				<h1>say about us</h1>
			</div>
			<div className="aboutus-content">
				<p>
					<img src={ComaImg} alt="ComaImg" />
					Elementum delivered the site with inthe timeline as they requested.
					Inthe end, the client found a 50% increase in traffic with in days
					since its launch. They also had an impressive ability to use
					technologies that the company hasn`t used, which have also proved to
					be easy to use and reliable
					<img src={ComaImg2} alt="ComaImg2" />
				</p>
			</div>
			<div className="aboutus-images">
				<img className="pic1" src={Pic1} alt="Pic1" />
				<img className="pic2" src={Pic2} alt="Pic2" />
				<img className="pic3" src={Pic3} alt="Pic3" />
				<img className="pic4" src={Pic4} alt="Pic4" />
				<img className="pic5" src={Pic5} alt="Pic5" />
				<img className="pic6" src={Pic6} alt="Pic6" />
				<img className="pic7" src={Pic7} alt="Pic7" />
				<img className="pic8" src={Pic8} alt="Pic8" />
			</div>
			<div className="aboutus-images1">
				<img className="pic" src={Pic1} alt="Pic1" />
				<img className="pic" src={Pic2} alt="Pic2" />
				<img className="pic" src={Pic3} alt="Pic3" />
				<img className="pic" src={Pic4} alt="Pic4" />
				<img className="pic" src={Pic5} alt="Pic5" />
				<img className="pic" src={Pic6} alt="Pic6" />
				<img className="pic" src={Pic7} alt="Pic7" />
				<img className="pic" src={Pic8} alt="Pic8" />
			</div>

			<div className="subscribe-container text-center">
				<h2 className="text-3xl font-bold mb-4">Subscribe Now</h2>
				<p className="mb-6 max-w-2xl mx-auto">
					Lorem ipsum dolor sit amet consectetur. At consequat purus hendrerit
					proin risus Sit purus ante dictum in malesuada id.
				</p>
				<form
					onSubmit={handleSubscribe}
					className="flex flex-col sm:flex-row max-w-md mx-auto"
				>
					<input
						type="email"
						placeholder="Enter Your Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="px-4 py-2 text-white  flex-grow"
						id="email-input"
						required
						// style={{ borderRadius: "20px 0 0 20px" }}
					/>
					<button
						type="submit"
						className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white transition duration-300"
						id="subscribe-btn"
						// style={{ borderRadius: "0 20px 20px 0" }}
					>
						Subscribe
					</button>
				</form>
			</div>
		</div>
	);
};

export default AboutUs;
