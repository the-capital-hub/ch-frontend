import React, { useEffect } from "react";
import "./BlogDetailed.scss";
import BlogImageOne from "../../../Images/blog/Rectangle 1271.png";
import SearchIcon from "../../../Images/blog/Combined-Shape.svg";
import PopularArticle from "../../Card/PopularArticle/PopularArticle";
import fbIcon from "../../../Images/blog/typcn_social-facebook.svg";
import twIcon from "../../../Images/blog/typcn_social-twitter.svg";
import inIcon from "../../../Images/blog/typcn_social-instagram.svg";

const BlogDetailed = () => {
  useEffect(() => {
    document.title = "Web Development Blog | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container blog_detailed_container">
        <div className="category_section">
          <span className="blog">Blog</span> {"> "}
          <span className="category">Web Development</span>
        </div>
        <hr />

        <div className="row">
          <div className="col-7 seventy ">
            <h1 className="headingOne">Web Development Improving Services</h1>

            <div className="time_icon">
              <span>Published on Monday, August 21st, 2023</span>
              <div className="social_icon_container">
                <img className="social_icon" src={fbIcon} alt="img" />
                <img className="social_icon" src={twIcon} alt="img" />
                <img className="social_icon" src={inIcon} alt="img" />
              </div>
            </div>
            <div className="col-12 image_section">
              <img src={BlogImageOne} alt="img" />
              <p>
                Why are online Web Development courses the talk of the town?
              </p>
              <p>
                Capital HUB is the go-to source for startups when it comes to
                web development, and Android and iOS development services. We
                recognize that building a great startup begins with adapting to
                new technology and evolving as a startup with all new features.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada
                id.Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
              </p>

              <h1 className="inside_seventy_heading">
                How to learn about the Web Development ?
              </h1>
              <p>
                Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada
                id.Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada
                id.Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
              </p>

              <h1 className="inside_seventy_heading">
                Top web development courses in India
              </h1>

              <ol>
                <li>Capital Hub</li>
                <p>
                  Lorem ipsum dolor sit amet consectetur. At consequat purus
                  hendrerit proin risus Sit purus ante dictum in malesuada
                  id.Lorem ipsum dolor sit amet consectetur. At consequat purus
                  hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
                </p>
              </ol>
              <button className="inside_seventy_btn">
                Become a web Developer
              </button>
            </div>
          </div>
          <div className="col-5  thirty">
            <div className="search_bar">
              <div className="search-input-container">
                <img src={SearchIcon} className="search-icon fas fa-search" />
                <input type="search" placeholder="Search" />
              </div>
            </div>

            <div className="subscribe_now">
              <h3>
                More than 2 Lakh investors like you read our newsletter 'The
                Signal'
              </h3>
              <h2>Subscribe now</h2>
              <input type="email" placeholder="Enter Email Id" />
              <button>Subscribe</button>
            </div>

            <div className="popular_article">
              <h1>Popular Articles</h1>
              <PopularArticle image={BlogImageOne} button={"Stock Market"} />
              <PopularArticle image={BlogImageOne} button={"Stock Market"} />
              <PopularArticle image={BlogImageOne} button={"Stock Market"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailed;
