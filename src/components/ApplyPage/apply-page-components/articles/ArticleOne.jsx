import Sidebar from "../sidebar/Sidebar";
import "./ArticleOne.scss";

export default function ArticleOne() {
  return (
    <div className="article__wrapper">
      <Sidebar />

      <div>
        <h1 className="articleOne__heading">
          Join Capital Hub for Your Startup's Web Development and Fundraising
          Needs
        </h1>
        <article className="article__one">
          <p className="article__para">
            Are you a startup looking to supercharge your web development and
            fundraising efforts? Look no further! Capital Hub is here to provide
            you with top-notch solutions to help your startup thrive. Join our
            community of successful founders and access a wealth of resources
            tailored to your needs.
          </p>
          <br />
        </article>
      </div>
    </div>
  );
}
