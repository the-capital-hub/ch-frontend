import "./meetourteam.scss";
import EmailIcon from "../../../../Images/message.svg";
import LinkedInIcon from "../../../../Images/service/linkedin.svg";
import UpmaImage from "../../../../Images/aboutUs/Upma.jpg";
import PreetiImage from "../../../../Images/aboutUs/Preeti.jpg";
import RaghuImage from "../../../../Images/aboutUs/Raghu.jpeg";
import { Link } from "react-router-dom";

const MeetOurTeam = () => {
  return (
    <>
      <div class="meetourteam_container gap-2">
        <div class="card col-lg-4 col-md-6 col-sm-12">
          <img src={UpmaImage} alt="image" />

          <div class="info">
            <div className="social_icon_list">
              <Link to="mailto:investments@capitalhub.in">
                <img src={EmailIcon} alt="emailicon" />
              </Link>
              <Link to="https://www.linkedin.com/in/upma-singh-bb4b1576/">
                <img src={LinkedInIcon} alt="image" />
              </Link>
            </div>
            <p class="name">Upma Singh</p>
            <p class="designation">Senior Investment Analyst</p>
            <p className="hovering_para">
              A veteran of the venture capital ecosystem, Upma's deep
              understanding of businesses and entrepreneurship lands her as one
              of the most valuable assets for The Capital Hub
            </p>
          </div>
        </div>
        <div class="card col-lg-4 col-md-6 col-sm-12">
          <img src={PreetiImage} alt="image" />

          <div class="info">
            <div className="social_icon_list">
              <Link to="mailto:investments@capitalhub.in">
                <img src={EmailIcon} alt="emailicon" />
              </Link>
              <Link to="https://www.linkedin.com/in/preeti1629/">
                <img src={LinkedInIcon} alt="image" />
              </Link>
            </div>
            <p class="name">Preeti Yadav</p>
            <p class="designation">Senior Investment Analyst</p>
            <p className="hovering_para">
              A seasoned analyst with a keen eye for market trends and
              investment opportunities, Preeti is the steady backbone that
              ensures the success for The Capital Hub's clients.
            </p>
          </div>
        </div>
        <div class="card col-lg-4 col-md-6 col-sm-12">
          <img src={RaghuImage} alt="image" />
          <div class="info">
            <div className="social_icon_list">
              <Link to="mailto:investments@capitalhub.in">
                <img src={EmailIcon} alt="emailicon" />
              </Link>
              <Link to="https://www.linkedin.com/in/raghukrishnan-j/">
                <img src={LinkedInIcon} alt="image" />
              </Link>
            </div>
            <p class="name">Raghukrishnan J</p>
            <p class="designation">Senior Investment Analyst</p>
            <p className="hovering_para">
              A technology enthusiast with a thirst for exponential growth and
              scalability, Raghu's innate curiosity and passion for the Indian
              growth story drives him to be the engine of success for The
              Capital Hub.
            </p>
          </div>
        </div>
        {/* <div class="card">
          <img src={NexusIcon} alt="image" />
          <div class="info">
            <p class="name">Hari</p>
            <p class="designation">UI/UX Designer</p>
          </div>
        </div>
        <div class="card">
          <img src={GIcon} alt="image" />
          <div class="info">
            <p class="name">Raghu</p>
            <p class="designation">Project Manager</p>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MeetOurTeam;
