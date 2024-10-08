import React from "react";
import "./Achievements.scss";
import img_1 from "../../../Images/Investor/Achievements/img_1.png";
import img_2 from "../../../Images/Investor/Achievements/img_2.png";
import img_3 from "../../../Images/Investor/Achievements/img_3.png";
import rectangle from "../../../Images/Investor/Achievements/Rectangle.png";

function Achievements() {
  const achievements1 = [
    {
      image: img_1,
      h1: "Welcome !",
      p: "Priyanka Nelson",
    },
    {
      image: img_3,
      h1: "Yoyager !",
      p: "First Post",
    },
    {
      image: img_2,
      h1: "On Fire !",
      p: "Every day Posted",
    },
    {
      image: img_3,
      h1: "Yoyager !",
      p: "First Post",
    },
    {
      image: img_2,
      h1: "On Fire !",
      p: "Every day Posted",
    },
  ];
  const achievements2 = [
    {
      image: img_3,
      h1: "Employer",
      p: "Selected a  company in company profile page",
    },
    {
      image: img_3,
      h1: "Founder ",
      p: " Created a company in company profile page ",
    },
    {
      image: img_3,
      h1: "One-Stop Shop",
      p: " Edited and opened your one-link for the first time",
    },
    {
      image: img_2,
      h1: " It's just paperwork ",
      p: " Added some documentation to the folders",
    },
  ];

  const user_data = [
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      h1: "Gold",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      h1: "Silver",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      h1: "Silver",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      h1: "Bronze",
    },
    {
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      h1: "Bronze",
    },
  ];
  return (
    <section className="investor_achievements_section d-flex flex-column align-items-evenly    py-2 my-5 my-md-3 mx-2 mx-md-5 bg-white shadow-sm rounded-4   ">
        <div className="achievements_users  d-flex flex-md-row  gap-4 mx-auto  ">
          {user_data.map((item, index) => (
            <div
              key={index}
              className=" single-card d-flex flex-md-row  align-items-center gap-2 "
            >
              <img
                src={item.image}
                alt="image"
                width={55}
                height={55}
                className="rounded-pill"
              />
              <h5>{item.h1}</h5>
            </div>
          ))}
        </div>
        <hr className="hr" />

        <div className="Achievements   d-flex flex-md-row  gap-4 mx-auto ">
          {achievements1.map((item, index) => (
            <div className="single-card  " key={index}>
              <img src={item.image} alt="achievement" />
              <div className="image_text">
                <img src={rectangle} alt="rectangle" />
                <div className="text py-2 w-75">
                  <h6>{item.h1}</h6>
                  <p className="m-0">{item.p}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="Achievements   d-flex flex-md-row  gap-4  mx-auto ">
          {achievements2.map((item, index) => (
            <div className="single-card  " key={index}>
              <img src={item.image} alt="achievement" />
              <div className="image_text">
                <img src={rectangle} alt="rectangle" />
                <div className="text w-75 py-2">
                  <h6>{item.h1}</h6>
                  <p className="m-0">{item.p}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}

export default Achievements;
