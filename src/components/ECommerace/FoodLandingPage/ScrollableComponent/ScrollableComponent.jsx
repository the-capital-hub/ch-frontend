import React from "react";
import "./ScrollableComponent.scss";
import assets from "../../../../Images/Ecommerace/FoodLandingPage/index";

function ScrollableComponent() {
  const items = [
    {
      img: assets.pizza,
      name: "Pizza",
    },
    {
      img: assets.burger,
      name: "Burger",
    },
    {
      img: assets.chicken,
      name: "Chicken",
    },
    {
      img: assets.icecream,
      name: "Ice Cream",
    },
    {
      img: assets.icecream,
      name: "Ice cream",
    },
  ];
  const rightitems = [
    {
      img: assets.rectanglePizza1,
      name: "Pizza",
      price: 300,
    },
    {
      img: assets.rectanglePizza2,
      name: "Pizza",
      price: 300,
    },
    {
      img: assets.rectanglePizza1,
      name: "Pizza",
      price: 300,
    },
    {
      img: assets.rectanglePizza2,
      name: "Pizza",
      price: 300,
    },
  ];

  return (
    <div className="scrollsection  d-flex flex-column  justify-content-center flex-md-row my-5">
      <div className="left-section">
        {items.map((items, index) => (
          <div key={index} className="items-data d-flex flex-row m-3">
            <img src={items.img} alt="" />
            <h6>{items.name}</h6>
          </div>
        ))}
      </div>
      <div className=" right-section d-flex">
        {rightitems.map((items, index) => (
          <div key={index} className="right-items-data">
            <img src={items.img} alt="" />
            <h6>{items.name}</h6>
            <h5>RS: {items.price}/-</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollableComponent;
