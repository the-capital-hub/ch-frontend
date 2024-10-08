import React, { useEffect } from "react";
import "./style.scss";
import BlogImageOne from "../../../Images/blog/Rectangle 1271.png";
import SearchIcon from "../../../Images/blog/Combined-Shape.svg";
import PopularArticle from "../../Card/PopularArticle/PopularArticle";
import fbIcon from "../../../Images/blog/typcn_social-facebook.svg";
import twIcon from "../../../Images/blog/typcn_social-twitter.svg";
import inIcon from "../../../Images/blog/typcn_social-instagram.svg";
import BlogtwoImage from "../../../Images/blog/eighttips.webp";
import Pramod from "../../../Images/aboutUs/Pramod.jpeg";
import { Link } from "react-router-dom";

const StartUpBlogTwo = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  useEffect(() => {
    document.title =
      "8 Tips to start raising Angel investments for startups | The Capital Hub";
  }, []);
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser);
  }
  return (
    <>
      <div className="container blog_detailed_container">
        <div className="category_section">
          <span className="blog">Blog</span> {"> "}
          <span className="category">Start Up</span>
        </div>
        <hr />

        <div className="row">
          <div className="col-lg-12 col-md-12  seventy ">
            <h2 className="headingOne">
              8 Tips to start raising Angel investments for startups
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
            <div className="col-12 image_section">
              <div className="d-flex">
                <img
                  src={BlogtwoImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                Raising angel investments in India can be a challenging task for
                early-stage startups. However, with the right approach and
                mindset, it is possible to secure the funding you need to grow
                your business. Here are some tips on how to raise angel
                investments in India:
              </p>

              <p>
                <b>1.Build a strong team: </b>
                Investors are looking for startups with a strong and capable
                team that can execute on the business plan. Make sure your team
                has the skills and experience needed to build and scale your
                business.
              </p>

              <p>
                <b>2. Develop a compelling value proposition: </b>
                Your startup should have a clear and compelling value
                proposition that addresses a specific problem or need in the
                market. This will help you attract the attention of potential
                investors.
              </p>

              <p>
                <b>3. Conduct market research: </b>
                It’s important to understand the size and potential of the
                market for your product or service, as well as the needs and
                pain points of your target customers. This research will help
                you develop a solid business plan and pitch to investors.
              </p>

              <p>
                <b>4. Network, Network, Network: </b>
                Building a strong network is crucial for raising angel
                investments in India. Attend industry events, join startup
                communities, and connect with potential investors through online
                platforms. Building relationships with angel investors takes
                time and effort, but it can pay off in the long run.
              </p>
              <div className="d-flex">
                <img
                  src="https://res.cloudinary.com/drjt9guif/image/upload/c_scale,q_69,w_600/v1693219264/TheCapitalHub/blogs/2270879_j55xtm.webp"
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                <b>5. Be prepared to pitch: </b>
                When you’re ready to start pitching to investors, make sure you
                have a polished and professional pitch deck that clearly
                communicates your value proposition, market opportunity, and
                team. Practice your pitch and be prepared to answer any
                questions investors might have.
              </p>
              <p>
                <b>6. Look for the right fit: </b>
                Not all investors are the right fit for your startup. Look for
                investors who share your vision and can provide valuable
                resources, expertise and mentorship.
              </p>
              <p>
                <b>7. Be transparent and honest: </b>
                Investors want to know the truth about your startup, the good
                and the bad. Be transparent about your progress, challenges and
                plans for the future. Honesty builds trust and credibility.
              </p>
              <p>
                <b>8. Be patient: </b>
                Raising angel investments in India can be a time-consuming
                process, so be prepared to invest the time and effort it takes
                to secure funding. Don't give up, stay persistent and keep
                networking.
              </p>
              <p>
                By following these tips and staying focused on your goals, you
                can increase your chances of raising angel investments in India.
                Remember that raising angel investments is a numbers game, the
                more investors you talk to, the better your chances of closing a
                round.
              </p>

              <p>
                Remember raising angel round investments is not an easy task. So
                focus on building a great product, have some early traction,
                listen to customer feedback and rebuild your product and make it
                better every single day.
              </p>

              <p>
                If you would like to raise angels investments in India : Send
                your idea to{" "}
                <a href="gmail.com">investments.capitalhub@gmail.com</a>
              </p>
              <br />
              <p>Let’s Build a Valuable venture together.</p>
              <a className="mb-5" href="http://thecapitalhub.in/">
                thecapitalhub.in
              </a>

              <h2 className="inside_seventy_heading mt-3">
                About the author :
              </h2>

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

export default StartUpBlogTwo;
