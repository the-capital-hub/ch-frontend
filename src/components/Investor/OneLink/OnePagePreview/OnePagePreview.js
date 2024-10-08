import React from "react";
import "./OnePagePreview.scss";
import EditIcon from "../../../../Images/WhiteEdit.svg";
import DollarRupeeImage from "../../../../Images/Dollar_rupee.svg";
import PramodSq from "../../../../Images/Pramod.jpeg";
import OnePagePreviewCard from "../../InvestorGlobalCards/OneLink/OnePagePreviewCard/OnePagePreviewCard";
import Table from "../Table/Table";
import TeamCard from "../../InvestorGlobalCards/OneLink/TeamCard/TeamCard";
import FundAsking from "../Table/FundAsking/FundAsking";
import FundDeployment from "../Table/FundDeployment/FundDeployment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getStartupByFounderId } from "../../../../Service/user";

const OnePagePreview = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  // console.log(loggedInUser);

  const userId = loggedInUser._id;
  const [company, setCompany] = useState([]);
  useEffect(() => {
    getStartupByFounderId(userId)
      .then(({ data }) => {
        setCompany(data);
      })
      .catch(() => setCompany([]));
  }, [userId]);

  // console.log("Company:", company);

  return (
    <>
      <div className="onepagepreview_container mt-3">
        <div className="box_container  pb-5">
          <section className="heading_section px-3 px-lg-5 ">
            <h4>One Pager Preview</h4>
            {userId === company?.founderId && (
              <Link to="/onelink/edit">
                <button>
                  Edit &nbsp;
                  <img src={EditIcon} alt="image" />
                </button>
              </Link>
            )}
          </section>
          {/* <hr /> */}
          {/* <section className="dollar_rupree">
            <img src={DollarRupeeImage} alt="image" />
          </section> */}

          <div className="px-3 px-lg-5">
            <section className="company_description">
              <img src={company.logo} alt="image" />
              <div className="company_text">
                <h5>{company?.company || `Enter company description`} </h5>
                <h6 className="mb-0">{company?.tagline}</h6>
                <hr className="my-2" />
                <h6>
                  {company?.description || "Eg: India’s best startup platfrom"}
                </h6>
              </div>
            </section>
          </div>

          <section className="card_section px-3 px-lg-5">
            <OnePagePreviewCard company={company} />
          </section>

          <section className="table_section">
            <div className="px-3 px-lg-5 w-100">
              {/* <Table /> */}
              <div className="dummy_one">
                <h6>Projections</h6>
                <p className="p-3">What are your revenue projections and sales projections for the next three years?</p>
                </div>
            </div>
          </section>

          <div className="px-3 px-lg-5">
            <section className="team_section">
              {/* <TeamCard/> */}
              {company?.team?.map((team, index) => (
                <TeamCard
                  index={index}
                  profile={team?.image}
                  name={team?.name}
                  designation={team?.designation}
                />
              ))}
            </section>
          </div>

          <section className="row fund_asking_deployment px-3 px-lg-5">
            <div className="funding_divider">
              <FundAsking company={company} />
            </div>
            <div className="funding_divider">
              <FundDeployment />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default OnePagePreview;
