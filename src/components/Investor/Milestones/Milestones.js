import React from "react";
import success from "../../../Images/industryImage/CRM/image 79.png";
import building from "../../../Images/industryImage/CRM/image 79-1.png";
import graph from "../../../Images/industryImage/CRM/image 79-2.png";
import tech from "../../../Images/industryImage/CRM/image 79-3.png";
import { Link } from "react-router-dom";
import "./milestones.scss";
import UserMilestones, { companyRequiredFields, userRequiredFields, oneLinkRequiredFields, documentRequiredFields } from "./UserMilestones";

const Milestones = ({ pageTheme }) => {
  const data = [
    {
      para: "Your Profile is successfully created, please complete the remaining profile",
      image: success,
      link: "User profile",
      linkTo: "/profile",
      component: <UserMilestones pageTheme={pageTheme} requiredFields={userRequiredFields} />,
    },
    {
      para: "Company Profile is successfully created, please complete the remaining details",
      image: building,
      link: "Company profile",
      linkTo: "/company-profile",
      component: <UserMilestones pageTheme={"company"} requiredFields={companyRequiredFields} />,
    },
    {
      para: "Fill all details to complete Onelink profile.",
      image: tech,
      link: "One link",
      linkTo: "/onelink",
      component: <UserMilestones pageTheme={"company"} requiredFields={oneLinkRequiredFields} />,
    },
    {
      para: "Upload your business related documents to get your Onelink profile ready to share",
      image: graph,
      link: "Document upload",
      linkTo: "/documentation",
      component: <UserMilestones pageTheme={"documents"} requiredFields={documentRequiredFields} />,
    },
    {
      para: "Hola! Create your first post to share your experience with Capital Hub.",
      image: building,
      link: "Create your first post",
      linkTo: "/home",
      component: <UserMilestones pageTheme={"posts"} requiredFields={userRequiredFields} />,
    },
  ];

  return (
    <div className="ConnectionCard_container m-3 pb-2 d-flex flex-md-row justify-content-start gap-4">
      {" "}
      <>
        {data.map((item, index) => (
          <div className="milestone-card " key={index}>
            <div
              className="d-flex flex-column align-items-center h-100 text-decoration-none"
              style={{ color: "inherit" }}
            >
              <img src={item?.image} alt="" />
              {item.component}
              <p className="m-0" style={{ paddingBottom: "10px" }}>
                {item?.para}
              </p>
              <Link
                to={item.linkTo}
                className="text-decoration-none"
              >
                <button
                  className="message btn rounded-pill px-3"
                  style={{
                    backgroundColor: pageTheme === "investor" ? "rgba(211, 243, 107, 1)" : "#fd5901",
                  }}
                >
                  <span style={{ fontSize: "14px", marginLeft: "2px", color: pageTheme === "investor" ? "#000" : "#fff" }}>
                    {item.link}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default Milestones;
