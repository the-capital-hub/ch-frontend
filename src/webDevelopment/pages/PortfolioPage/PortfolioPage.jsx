import React from "react";
import "./PortfolioPage.scss";
import assets from "../../../Images/Portfolio/PortfolioPage";
import Header from "../../../components/portfolio/Layout/Header/Header";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";

function PortfolioPage() {
  return (
    <div className="PortfolioPage_page_container">
      <Navbar />
      <Header />
      <div className="PortfolioPage_page px-3">
        <div className="top_section ">
          <Link
            to="http://impactshaala-testsite.tech/"
            className="box box_one "
          >
            <img src={assets.impactshall} alt="impactshall" />
            <p>
              ImpactShala serves as a groundbreaking platform, connecting
              educational institutions with diverse stakeholders such as
              corporates and NGOs. By facilitating collaborations and
              project-building initiatives, it bridges the gap between academia
              and real-world applications. This innovative approach not only
              enriches educational experiences but also fosters impactful
              projects that contribute positively to society.
            </p>
          </Link>
          <Link to="https://thecapitalhub.in/" className="box box_two">
            <img src={assets.capitalHub} alt="Capital Hub" />
            <p>
              The Capital Hub offers a dynamic platform where startup founders
              and investors can seamlessly network, fostering meaningful
              connections in the entrepreneurial ecosystem. As a
              forward-thinking venture capital firm, they not only provide
              funding but also specialize in building cutting-edge technology,
              aiding in business scalability, and offering invaluable
              mentorship. This comprehensive support system empowers startups to
              thrive and innovate in the competitive business landscape.
            </p>
          </Link>
          <Link to="https://yesgobus.com/" className="box box_three ">
            <img src={assets.yesgobus} alt="yesgobus" />
            <p>
              YesGoBus is a leading transportation company that offers a
              seamless platform for booking buses and cabs. Their user-friendly
              interface and wide range of options make traveling convenient and
              hassle-free. With YesGoBus, you can easily plan your journeys with
              confidence.
            </p>
          </Link>
          <Link to="https://mafarmretailer.com/" className="box box_four">
            <img src={assets.circleIcon} alt="circleIcon" />
            <p>
              Mayakshi Farm Retailer is an innovative platform empowering small
              traders in tier 2 cities, enabling them to showcase and sell their
              products. With a commitment to fostering local businesses, they
              bridge the gap between consumers and small-scale entrepreneurs,
              contributing to economic growth. Mayakshi Farm Retailer is a
              catalyst for community-driven commerce.
            </p>
          </Link>
          <Link to="https://uipe.pro/" className="box box_five">
            <img src={assets.uipe_logo} alt="UIPE" />
            <p className="text-dark">
              Experience the ease of managing your finances with our fintech
              solutions. We make EMI and loan payments simple, tailored just for
              you. Say hello to hassle-free, stress-free financial management!
            </p>
          </Link>
          <Link to="https://tiffinbuddy.in/" className="box box_six">
            <img src={assets.tiffinbuddy_logo} alt="tiffinbuddy" />
            <p>
              Tiffin Buddy is your go-to destination for wholesome, home-cooked
              lunchboxes that cater to your health-conscious needs. Enjoy
              delicious, nutritious meals conveniently delivered
              to your Canteen.
            </p>
          </Link>
        </div>
        {/* <div className="botton_section d-flex flex-column justify-content-center  ">
        <h1>
          670 companies. 4,773 jobs.It's <br /> time to build.
        </h1>
        <p>Looking for your next startup adventure?</p>
        <button className="px-3 py-2">Start your search</button>
      </div> */}
      </div>
    </div>
  );
}

export default PortfolioPage;
