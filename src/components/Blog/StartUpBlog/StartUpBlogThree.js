import React, { useEffect } from "react";
import "./style.scss";
import BlogImageOne from "../../../Images/blog/Rectangle 1271.png";
import SearchIcon from "../../../Images/blog/Combined-Shape.svg";
import PopularArticle from "../../Card/PopularArticle/PopularArticle";
import fbIcon from "../../../Images/blog/typcn_social-facebook.svg";
import twIcon from "../../../Images/blog/typcn_social-twitter.svg";
import inIcon from "../../../Images/blog/typcn_social-instagram.svg";
import BlogthreeImage from "../../../Images/blog/BlogthreeImage.webp";
import threeTwoImage from "../../../Images/blog/threetwo.webp";
import threeThreeImage from "../../../Images/blog/threethree.webp";
import threeFourImage from "../../../Images/blog/threefour.webp";
import threeFiveImage from "../../../Images/blog/threefive.webp";
import threeSixImage from "../../../Images/blog/threesix.webp";
import threeSevenImage from "../../../Images/blog/threeseven.webp";
import threeEightImage from "../../../Images/blog/threeeight.webp";
import { Link } from "react-router-dom";
import Pramod from "../../../Images/aboutUs/Pramod.jpeg";

const StartUpBlogThree = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  useEffect(() => {
    document.title =
      "HOW TO BUILD A GREAT STARTUP by Pramod Badiger | The Capital Hub";
  }, []);
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser);
  }
  return (
    <>
      <div className="container blog_detailed_container">
        <div className="category_section">
          <span className="blog">Blog</span> >{" "}
          <span className="category">Start Up</span>
        </div>
        <hr />

        <div className="row">
          <div className="col-lg-12 col-md-12  seventy ">
            <h2 className="headingOne">
              HOW TO BUILD A GREAT STARTUP by Pramod Badiger
            </h2>

            <div className="time_icon w-">
              <div className="d-flex flex-row align-items-center">
                <Link
                  to={
                    loggedInUser
                      ? loggedInUser?.isInvestor === "true"
                        ? "/investor/user/pramod-badiger/184455"
                        : "/user/pramod-badiger/184455"
                      : "/author-profile/pramod-badiger/184455"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark text-decoration-none"
                >
                  <img
                    className="user rounded-pill mx-2 object-fit-cover"
                    src={Pramod}
                    alt="img"
                    width={60}
                    height={60}
                  />
                </Link>
                <div className="py-2">
                  <Link
                    to={
                      loggedInUser
                        ? loggedInUser?.isInvestor === "true"
                          ? "/investor/user/pramod-badiger/184455"
                          : "/user/pramod-badiger/184455"
                        : "/author-profile/pramod-badiger/184455"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark text-decoration-none"
                  >
                    <p className="m-0">
                      <b>Pramod Badiger</b>
                    </p>
                  </Link>
                  <span>Published on Jan 21, 2023</span>
                </div>
              </div>

              <div className="social_icon_container d-flex flex-row justify-content-end">
                <img className="social_icon" src={fbIcon} alt="img" />
                <img className="social_icon" src={twIcon} alt="img" />
                <img className="social_icon" src={inIcon} alt="img" />
              </div>
            </div>
            <div className="col-12 image_section mt-5">
              <p>
                Building a great startup requires a combination of passion,
                creativity, and hard work. Here are some key steps that can help
                you get started:
              </p>

              <p>
                <b>Identify a problem: </b>
                The first step in building a great startup is to identify a
                problem that you are passionate about solving. This problem
                could be something that you have personally experienced or
                something that you have observed in the market. By focusing on a
                specific problem, you can develop a clear and compelling value
                proposition for your startup.
              </p>
              <div className="d-flex">
                <img
                  src={BlogthreeImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>

              <p>
                <b>Conduct market research: </b>
                Once you have identified a problem, it is important to conduct
                market research to understand the size and potential of the
                market, as well as the needs and pain points of your target
                customers. This research will help you identify the key features
                and benefits of your product or service, and will also help you
                understand the competitive landscape.
              </p>
              <div className="d-flex">
                <img
                  src={threeTwoImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                <b>Build a team: </b>A great startup requires a great team.
                Building a team of people who share your vision and are
                passionate about solving the problem you have identified is
                crucial. It is important to look for people with complementary
                skills, who can work well together, and who have a track record
                of success.
              </p>
              <div className="d-flex">
                <img
                  src={threeThreeImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                <b>Develop a business plan: </b>A business plan is a critical
                tool that will help you define your startup’s objectives,
                strategies, and tactics. It will also help you identify
                potential challenges and risks, and will provide a roadmap for
                growth.{" "}
              </p>
              <div className="d-flex">
                <img
                  src={threeFourImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                <b>Create a Minimum Viable Product (MVP): </b>Once you have a
                solid business plan, it is important to develop a Minimum Viable
                Product (MVP) that you can test with customers. This MVP should
                have the core features and functionality that your customers
                need, but it does not need to be fully polished.
              </p>
              <div className="d-flex">
                <img
                  src={threeFiveImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                <b>Test and iterate: </b>
                Once you have an MVP, it is important to test it with customers
                and gather feedback. This feedback will help you identify areas
                for improvement and will also give you insight into what
                features and functionality your customers value most.
              </p>
              <div className="d-flex">
                <img
                  src={threeSixImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                <b>Raise funding: </b>
                To scale your startup and grow it, you will need to raise
                funding. This can come from angel investors, venture
                capitalists, or crowdfunding platforms. It’s important to have a
                solid pitch and a clear plan for how you will use the funding to
                grow your business.
              </p>
              <div className="d-flex">
                <img
                  src={threeSevenImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                <b>Scale and grow: </b>
                Once you have a solid product, a great team, and funding in
                place, it’s time to focus on scaling and growing your startup.
                This will require a combination of strategies and tactics, such
                as expanding your customer base, developing new features and
                functionality, and building strategic partnerships.
              </p>
              <div className="d-flex">
                <img
                  src={threeEightImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                Starting a successful startup is a challenging and complex
                process, but by following these steps and staying focused on
                solving a specific problem, you can build a great startup that
                delivers value to customers and creates long-term success.
              </p>
              <br />
              <p>
                Follow Pramod Badiger at :{" "}
                <a href="https://www.linkedin.com/in/pramod-badiger-a3226618b">
                  Linkedin
                </a>
              </p>
              <p>Let’s Build a Valuable venture together.</p>
              <a className="mb-5" href="http://thecapitalhub.in/">
                thecapitalhub.in
              </a>

              <h2 className="inside_seventy_heading">About the author :</h2>

              <p>
                <b>Pramod Badiger</b> is a dynamic entrepreneur and the{" "}
                <b>founder and CEO of The Capital HUB.</b> The Capital HUB is a
                company that helps startups raise angel investments and helps
                investors invest in high-growth startups. As a founder, Pramod
                is passionate about connecting startups with potential investors
                and providing them with the resources and support they need to
                succeed. He is also building an angel networking platform to
                bridge the gap between startups and angel investors, making it
                easier for them to connect and collaborate. With his deep
                understanding of the startup ecosystem and his ability to
                identify and capitalize on new opportunities, Pramod is
                well-positioned to lead Capital HUB to success.
              </p>
            </div>
          </div>
          {/* <div className="col-lg-5 col-md-12  thirty">
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default StartUpBlogThree;
