import "./ComingSoon.scss";
import comingSoonImg from "../../Images/coming-soon.png";

function ComingSoon({ titleColor }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 rounded-5 shadow mx-lg-2 pt-2 pb-5 coming_soon_container">
      <img src={comingSoonImg} width={"40%"} alt="coming soon" />
      <h1 className={`${titleColor}`}>Coming soon</h1>
      {/* <h4>Are you ready</h4> */}
      {/* <div className="search-container my-3">
        <input type="text" placeholder="Your email" />
        <button className="search-button">Notify Me</button>
      </div> */}
    </div>
  );
}

export default ComingSoon;
