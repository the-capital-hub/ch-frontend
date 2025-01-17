import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./footer2.scss";

const Footer = ({ className }) => {
	return (
		<footer className="footer_container">
			<div className="footer_container_top">
				<div>
					<p className="text-sm ">
						Lorem ipsum dolor sit amet consectetur. Magna integer enim vitae
						vulputate eu vitae tristique.
					</p>
				</div>

				<div>
					<h4 className="font-bold text-lg mb-2">General</h4>
					<ul className="flex flex-col lg:flex-row justify-center md:justify-start items-center md:items-start md:gap-3">
						<li>
							<a href="/about" className="hover:text-gray-300">
								About Us
							</a>
						</li>
						<li>
							<a href="/pricing" className="hover:text-gray-300">
								Pricing
							</a>
						</li>
						<li>
							<a href="/contact" className="hover:text-gray-300">
								Contact Us
							</a>
						</li>
						<li>
							<a href="/courses" className="hover:text-gray-300">
								Courses
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h4 className="font-bold text-lg mb-2">Policies</h4>
					<ul className="flex flex-col lg:flex-row justify-center md:justify-start items-center md:items-start md:gap-3">
						<li>
							<a href="/security" className="hover:text-gray-300">
								Security safeguards
							</a>
						</li>
						<li>
							<a href="/terms" className="hover:text-gray-300">
								Terms of service
							</a>
						</li>
						<li>
							<a href="/privacy" className="hover:text-gray-300">
								Privacy
							</a>
						</li>
						<li>
							<a href="/accessibility" className="hover:text-gray-300">
								Accessibility
							</a>
						</li>
					</ul>
				</div>

				<div>
					<h4 className="font-bold text-lg mb-4">Get in touch</h4>
					<p className="text-sm md:mb-4">
						Follow us on social media and stay updated with the latest
						information about our services
					</p>
					<div className="flex justify-center md:justify-start space-x-4">
						<Link to="#" className="footer2-social-icon hover:text-gray-300">
							<FaFacebookF size={24} />
						</Link>
						<Link to="#" className="footer2-social-icon hover:text-gray-300">
							<FaTwitter size={24} />
						</Link>
						<Link to="#" className="footer2-social-icon hover:text-gray-300">
							<FaInstagram size={24} />
						</Link>
						<Link
							to="#"
							className="footer2-social-icon hover:text-gray-300 text-gray-600"
						>
							<FaYoutube size={24} />
						</Link>
					</div>
				</div>

				<div>
					<h4 className="font-bold text-lg mb-4">Subscribe to our Lorem</h4>
					<p className="text-sm mb-4">
						Lorem ipsum dolor sit amet consectetur. Velit enim est urna est
						massa cras.
					</p>
					<form className="flex flex-col sm:flex-row gap-1">
						<input
							type="email"
							placeholder="Enter your email"
							className="flex-grow px-2 py-2 rounded-md sm:rounded-l-md  text-gray-900 mb-2 sm:mb-0 w-full sm:w-full"
						/>
						<button
							type="submit"
							className="bg-orange-500 text-white px-2 py-2 mb-2 rounded-md sm:rounded-r-md  hover:bg-orange-600 transition-colors w-full sm:w-40"
						>
							Join Now
						</button>
					</form>
				</div>
			</div>

			<div className="mt-8 pb-8 text-center text-sm">
				<p>&copy; {new Date().getFullYear()} Lorem all rights reserved</p>
			</div>
		</footer>
	);
};

export default Footer;
