import React, { useEffect, useState } from "react";
import "./Blog.scss";
import ImageBlog1 from "../../Images/blog/blog-Telemedicine.jpg";
import ImageBlog2 from "../../Images/blog/Rectangle 1273.png";
import ImageBlog3 from "../../Images/blog/lucas-vasques-9vnACvX2748-unsplash.jpg";
import SearchIcon from "../../Images/blog/Combined-Shape.svg";
import LattestBlogCard from "../Card/LattestBlogCard/LattestBlogCard";
import BlogoneImage from "../../Images/blog/1 AsPGU1Q42C9lsVRoMg91Nw.webp";
import BlogtwoImage from "../../Images/blog/eighttips.webp";
import BlogthreeImage from "../../Images/blog/BlogthreeImage.webp";
import UXImage from "../../Images/blog/UXBlog/i1.png";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    navigate(route);
  };

  useEffect(() => {
    document.title = "Blogs | The Capital Hub";
  }, []);

  return (
    <>
      <div className="container-fluid blog_container">
        <div className="container search_blog_container">
          <div className="col-md-6">
            <h1 className="blog_title">Blog</h1>
          </div>
          {/* <div className="col-md-6 search_bar">
            <div className="search-input-container">
              <img src={SearchIcon} className="search-icon fas fa-search" />
              <input type="search" placeholder="Search" />
            </div>
          </div> */}
        </div>
        {/* <div className="row navbar_black">
          <ul className="navbar_list">
            <li> </li>
            <li className="active">All</li>
            <li>BestOffer</li>
            <li>Investments</li>
            <li>Web Development</li>
            <li>Fundrasing</li>
            <li>Pitch Deck</li>
            <li>Income Tax</li>
            <li>Investors</li>
            <li>></li>
          </ul>
        </div> */}
        {/* <div className="container main_blog_container">
          <section className="row main_blog_section">
            <div className="col-lg-5 col-md-12 image_section_left">
              <img src={ImageBlog1} alt="img" />
            </div>
            <div className="col-lg-7 col-md-12 right_content_section">
              <div className="button_and_text">
                <button>Web Development</button>
                <span>Published on Monday, August 21st, 2023</span>
              </div>
              <h1 className="title_text_blog">
                Web Development Improving Services
              </h1>
              <p className="para_blog">
                Capital HUB is the go-to source for startups when it comes to
                web development, and Android and iOS development services. We
                recognize that building a great startup begins with adapting to
                new technology and evolving as a startup with all new features.
              </p>
              <button className="read_full_button">Read full blog</button>
            </div>
          </section>
        </div>
        <hr /> */}
        <div className="container lattest_blog_container">
          <h1>Latest Blogs</h1>
          <section className="row justify-content-around">
            <LattestBlogCard
              image={UXImage}
              button={"Startup"}
              date={"Sept 28 2023"}
              title={
                "User Experience (UX): How it can be a differentiator in a crowded marketplace"
              }
              onClick={() =>
                handleCardClick(
                  "/blog/ux-how-it-can-be-a-differentiator-in-a-crowded-marketplace"
                )
              }
            />

            <LattestBlogCard
              image="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              button={"Startup"}
              date={"Sept 20 2023"}
              title={"Meesho: Revolutionising E-Commerce for Entrepreneurs"}
              onClick={() =>
                handleCardClick(
                  "/blog/meesho-revolutionising-e-commerce-for-entrepreneurs"
                )
              }
            />
            <LattestBlogCard
              image="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&q=80"
              button={"FoodTech"}
              date={"Sept 20 2023"}
              title={
                "A Sustainable Alternative to Traditional Meat Products: GoodDot as an Example"
              }
              onClick={() =>
                handleCardClick(
                  "/blog/sustainable-alternative-to-traditional-meat-products-gooddot-as-example"
                )
              }
            />
            <LattestBlogCard
              image="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
              button={"HealthTech"}
              date={"Sept 20 2023"}
              title={
                "Empowering Patient Care: Mykare Health's Innovative Approach to HealthTech"
              }
              onClick={() =>
                handleCardClick(
                  "/blog/empowering-patient-care-mykare-health-innovative-approach-to-healthtech"
                )
              }
            />
            <LattestBlogCard
              image="https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              button={"HealthTech"}
              date={"Sept 20 2023"}
              title={
                "Telemedicine: A Health Revolution at Your Fingertips - MedTel Health Care Company Leading the Way"
              }
              onClick={() =>
                handleCardClick(
                  "/blog/telemedicine-health-revolution-at-your-fingertips-medtel-health-care-company-leading-the-way"
                )
              }
            />
            <LattestBlogCard
              image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              button={"FoodTech"}
              date={"Sept 20 2023"}
              title={
                "How Zomato is Revolutionising the Food Supply Chain Through Food Technology"
              }
              onClick={() =>
                handleCardClick(
                  "/blog/how-zomato-is-revolutionising-the-food-supply-chain-through-food-technology"
                )
              }
            />
            <LattestBlogCard
              image={BlogoneImage}
              button={"Startup"}
              date={"May 1 2023"}
              title={
                "Why Mentoring Matters: Why Angel Investors Should Prioritize Mentorship Before Investing in a Startup"
              }
              onClick={() => handleCardClick("/blog/startupOne")}
            />

            <LattestBlogCard
              image={BlogtwoImage}
              button={"Startup"}
              date={"Jan 21 2023"}
              title={"8 Tips to start raising Angel investments for startups"}
              onClick={() => handleCardClick("/blog/startupTwo")}
            />

            <LattestBlogCard
              image={BlogthreeImage}
              button={"Startup"}
              date={"Jan 21 2023"}
              title={"HOW TO BUILD A GREAT STARTUP by Pramod Badiger"}
              onClick={() => handleCardClick("/blog/startupThree")}
            />

            {/* 
            <LattestBlogCard
              image={ImageBlog1}
              button={"Startup"}
              date={"Sep 20 2023"}
              title={
                "Telemedicine: A Health Revolution at Your Fingertips - MedTel Health Care Company Leading the Way"
              }
              onClick={() => handleCardClick("/blog/startupfour")}
            />
            <LattestBlogCard
              image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              button={"Startup"}
              date={"Sep 20 2023"}
              title={
                "  How Zomato is Revolutionising the Food Supply Chain Through Food Technology                "
              }
              onClick={() => handleCardClick("/blog/startupFive")}
            />
            {/* <LattestBlogCard
              image={ImageBlog1}
              button={"Startup"}
              date={"May 1 2023"}
              title={
                "Why Mentoring Matters: Why Angel Investors Should Prioritize Mentorship Before Investing in a Startup"
              }
            /> */}
          </section>
        </div>
        <div className="container pagination_container_section">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* <div className="subscribe_container_section">
          <h2>Get exclusive content and expert advice</h2>
          <div className="subscribe-input-container">
            <input
              type="search"
              className="subscribe-input"
              placeholder="Enter your email"
            />
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Blog;
