import React from "react";
import "./foodLandingPage.scss";
import assets from "../../../../Images/Ecommerace/FoodLandingPage/index";
// import Reviewcarousel from "../../../../components/ECommerace/FoodLandingPage/ReviewCarousel/Reviewcarousel";
// import ScrollableComponent from "../../../../components/ECommerace/FoodLandingPage/ScrollableComponent/ScrollableComponent";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
import ContactForm from "../../../Components/Shared/ContactForm/ContactForm";
import ServiceStats from "../../../Components/Shared/ServiceStats/ServiceStats";
import OurClients from "../../../Components/Shared/OurClients/OurClients";
import DevelopmentFee from "../../../Components/Shared/DevelopmentFee/DevelopmentFee";
import ConsultingServices from "../../../Components/Shared/ConsultingServices/ConsultingServices";
import Expert from "../../../Components/Shared/Expert/Expert";
import FoodSmoothInterface from "./Components/FoodSmoothInterface/FoodSmoothInterface";
import FoodBestFeatures from "./Components/FoodBestFeatures/FoodBestFeatures";
import FoodHero from "./Components/FoodHero/FoodHero";

function FoodLandingPage() {
  // const reviews = [
  //   {
  //     text: "Our dining experience at The Capital Hub was exceptional. Delicious food beautifully presented with fresh, high-quality ingredients. Impeccable service and a cozy, welcoming atmosphere. We'll be back for more!",
  //     star: 1,
  //     img: assets.JackSon,
  //     name: "Jack Son",
  //     work: "UI Designer",
  //   },
  //   {
  //     text: "We were delighted with our recent food order from The Capital Hub! Exquisite flavors, top-notch presentation, and prompt, hot, and fresh delivery. Thank you for consistently delivering such delicious meals to our doorstep. We'll definitely be ordering again!",
  //     star: 2,
  //     img: assets.JackSon,
  //     name: "Jack Son",
  //     work: "UI Designer",
  //   },
  //   {
  //     text: "Our dining experience at The Capital Hub was exceptional. Delicious food beautifully presented with fresh, high-quality ingredients. Impeccable service and a cozy, welcoming atmosphere. We'll be back for more!",
  //     star: 3,
  //     img: assets.JackSon,
  //     name: "Jack Son",
  //     work: "UI Designer",
  //   },
  //   {
  //     text: "We were delighted with our recent food order from The Capital Hub! Exquisite flavors, top-notch presentation, and prompt, hot, and fresh delivery. Thank you for consistently delivering such delicious meals to our doorstep. We'll definitely be ordering again!",
  //     star: 4,
  //     img: assets.JackSon,
  //     name: "Jack Son",
  //     work: "UI Designer",
  //   },
  //   {
  //     text: "Our dining experience at The Capital Hub was exceptional. Delicious food beautifully presented with fresh, high-quality ingredients. Impeccable service and a cozy, welcoming atmosphere. We'll be back for more!",
  //     star: 5,
  //     img: assets.JackSon,
  //     name: "Jack Son",
  //     work: "UI Designer",
  //   },
  //   {
  //     text: "We were delighted with our recent food order from The Capital Hub! Exquisite flavors, top-notch presentation, and prompt, hot, and fresh delivery. Thank you for consistently delivering such delicious meals to our doorstep. We'll definitely be ordering again!",
  //     star: 0,
  //     img: assets.JackSon,
  //     name: "Jack Son",
  //     work: "UI Designer",
  //   },
  // ];

  return (
    <div className="food_landing-page_Container container-fluid">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Build your food delivery application with Capital HUB!</title>
        <meta
          name="description"
          content="Discover a world of culinary convenience with our food tech platform.
Order delicious meals, reserve tables, connect with fellow foodies, and track your orders
seamlessly. Get up to 50% off during the festival season. Prioritize your well-being with our
high-quality, delicious, and fresh ingredients. Join our satisfied customers who have
experienced exceptional dining and food delivery. Order from The Capital Hub today!"
        />
      </Helmet>

      {/* First section */}
      <FoodHero downArrow={assets.downArrow} twoMobile={assets.twoMobile} />

      {/* Service Stats */}
      <ServiceStats />

      {/* Development fee */}
      <div className="py-5">
        <DevelopmentFee />
      </div>

      {/* Best Features */}
      <FoodBestFeatures image={assets.halfMobile} />

      {/* Smooth Interface */}
      <FoodSmoothInterface image={assets.sinfleMobile} />
      {/* <div className=" two-scroll-section  ">
        <h1>
          Menu That Always Make <br /> You Fall In Love
        </h1>
        <ScrollableComponent />
        <div className=" d-flex justify-content-center  my-3">
        <Link to="/web-development" className="LinkBtn">Taking Us</Link>
        </div>
      </div> */}

      {/* Consulting services */}
      <ConsultingServices />

      {/* <div className="card_bg p-md-5 py-2 mb-4">
        <div className="join-us-card rounded-4 mx-auto ">
          <img
            className="rounded "
            src={pramodImg}
            width={351}
            alt="Cost Savings"
          />
          <div className="p-3  mx-auto text-center">
            <h6 className="mx-auto">Pramod Badiger</h6>
            <p className="fs-14 mx-auto">Connect with our expert</p>
            <Link
              to="https://www.linkedin.com/in/pramod-badiger-a3226618b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="LinkBtn btn btn-primary rounded-pill text-white px-4 py-1 fs-12 mx-auto"
            >
              Connect
            </Link>
          </div>
        </div>
      </div> */}

      {/* Expert */}
      <div className="py-4">
        <Expert />
      </div>

      {/* OurClients */}
      <OurClients />

      {/* Contact form */}
      <div className="container mx-auto">
        <ContactForm className="col-12 col-md-8 mx-auto" page={"food"} />
      </div>

      {/* <div className="fifth-section">
        <h1>See What Our Lovely</h1>
        <h1>
          <span>Customer</span> Says About Us
        </h1>
        <Reviewcarousel reviews={reviews} />
      </div> */}
      {/* <div className="last text-center m-5">
        <h1>Subscribe Now</h1> */}
      {/* <p>
          Lorem ipsum dolor sit amet consectetur. At consequat purus hendrerit
          proin risus Sit purus ante dictum in malesuada id.{" "}
        </p> */}

      {/* <div className=" input-div rounded-pill d-flex justify-content-center  shadow-lg  flex-row mx-md-auto ">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter Your Email "
            className=" flex-grow-1 rounded-pill px-2"
          />
          <button className="rounded-pill">Subscribe</button>
        </div>
      </div> */}
    </div>
  );
}

export default FoodLandingPage;
