import React from "react";
import "./NikeLandingPage.scss";
import assets from "../../../../Images/Ecommerace/NikeLandingpage/index";

function NikeLandingPage() {
  return (
    <div className="nilke-landing-page container-fluid">
      <div className="first-section w-100">
        <img src={assets.main} alt="main img" />
      </div>

      <div className="second-section d-flex flex-column  justify-content-evenly flex-md-row p-5">
        <div className="left-section">
          <h1>
            <i>
              BECOME A <br /> MEMBER
            </i>
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur. At consequat purus id. </p>
          <button>Sign up</button>
        </div>
        <div className="right-section">
          <img src={assets.nikelogo} alt="nikelogo" />
        </div>
      </div>

      <div className="third-section d-flex  flex-column  p-3">
        <h1 className="mx-lg-5 mx-auto ">
          Popular <span>Products</span>
        </h1>
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-evenly ">
          <div className="box d-flex flex-column align-items-center">
            <div className="shoe-img  px-auto">
              <img
                className="imgshoe w-100"
                src={assets.whiteBlueOrange}
                alt="shoe "
              />
            </div>
            <div className=" d-flex flex-row  align-self-start">
              <img src={assets.star} alt="star" />
              <span className="mt-2">(4.5)</span>
            </div>
            <div className=" d-flex align-self-start ">
              <h3>Nike Air Sneaker</h3>
              <h4>$20.00</h4>
            </div>
          </div>

          <div className="box d-flex flex-column align-items-center">
            <div className="shoe-img  px-auto">
              <img
                className="imgshoe w-100"
                src={assets.blueYellowOrange}
                alt="shoe "
              />
            </div>
            <div className=" d-flex flex-row  align-self-start">
              <img src={assets.star} alt="star" />
              <span className="mt-2">(4.5)</span>
            </div>
            <div className=" d-flex align-self-start ">
              <h3>Nike Air Sneaker</h3>
              <h4>$70.00</h4>
            </div>
          </div>

          <div className="box d-flex flex-column align-items-center">
            <div className="shoe-img  px-auto">
              <img
                className="imgshoe w-100"
                src={assets.blackOrangeRose}
                alt="shoe "
              />
            </div>
            <div className=" d-flex flex-row  align-self-start">
              <img src={assets.star} alt="star" />
              <span className="mt-2">(4.5)</span>
            </div>
            <div className=" d-flex align-self-start ">
              <h3>Nike Air Sneaker</h3>
              <h4>$20.00</h4>
            </div>
          </div>
        </div>
        <div className="changer d-flex  flex-row align-items-center justify-content-center">
          <hr />
          <hr />
        </div>
      </div>

      <div className="fourth-section  d-flex flex-column  align-items-center   ">
        <h3>About Us</h3>
        <div className="inner-section d-flex flex-column flex-md-row  justify-content-center align-items-center">
          <div className="left-section d-flex flex-column flex-md-row  justify-content-evenly align-items-center ">
            <img
              src={assets.offershoe}
              alt="offershoe "
              className="w-100 pb-5"
            />
          </div>
          <div className="right-section container  ">
            <h1>
              We Provide <span>High Quality </span> Shoes.
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. At consequat purus
              hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. At consequat purus
              hendrerit proin risus Sit purus ante dictum in malesuada id. it
              purus ante dictum in malesuada id.
            </p>
            <button>Explore more</button>
          </div>
        </div>
      </div>

      <div className="fifth-section d-flex flex-column align-items-center p-5  ">
        <div className="innersection d-flex flex-column  justify-content-between flex-md-row">
          <div className="left-section my-auto text-center text-lg-start d-flex flex-column align-items-center align-items-lg-start ">
            <h1>
              Get to Know Our <br /> Feature <span>Products</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. At consequat purus
              hendrerit proin risus Sit purus ante dictum in malesuada id.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. At consequat purus
              hendrerit proin risus Sit purus ante dictum in malesuada id. it
              purus ante dictum in malesuada id.
            </p>
            <button>Explore more</button>
          </div>
          <div className="right-section w-100">
            <div className="img-div">
              <img src={assets.rosewhite} alt="rosewhite" />
            </div>
          </div>
        </div>
        <button>Explore more</button>
      </div>

      <div className="sixth-section d-flex flex-column  justify-content-evenly flex-md-row  ">
        <div className="left-section d-flex flex-column justify-content-center ">
          <h1>
            What our happy <br /> customer says
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. At consequat purus hendrerit
            proin risus Sit purus ante dictum in malesuada id.Lorem .orem ipsum
            dolor sit amet consectetur. At consequat purus hendrerit proin risus
            Sit purus ante dictum in malesuada id.Lorem
          </p>
          <h6>Karthik</h6>
        </div>
        <div className="right-section">
          <img
            src={assets.groupOfPeople}
            alt="Group Of People"
            className="w-100"
          />
        </div>
      </div>

      <div className="last text-center p-5">
        <h1>Subscribe Now</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. At consequat purus hendrerit
          proin risus Sit purus ante dictum in malesuada id.{" "}
        </p>

        <div className=" input-div rounded-pill d-flex  shadow-lg  flex-row mx-md-auto ">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter Your Email "
            className=" flex-grow-1 rounded-pill px-2"
          />
          <button className="rounded-pill">Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default NikeLandingPage;
