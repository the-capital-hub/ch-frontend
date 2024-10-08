import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
import Logo from "../../../../Images/Logo.svg";

function Header() {
  return (
    <header className="container">
      <nav>
        <div className="nav justify-content-center align-items-center">
          {/* <NavLink to="/"> */}
          <NavLink to={"/"}>
            <img src={Logo} alt="Logo" />
          </NavLink>
          {/* <NavLink to="/contactus " className='d-none d-md-flex'>Contact Us</NavLink> */}
          {/* <NavLink to="/about " className='d-none d-md-flex'>About Us</NavLink> */}
        </div>
      </nav>
      <a href="#contact-us">
        <button className="btn login-btn px-3 py-md-1">Contact Us</button>
      </a>
    </header>
  );
}

export default Header;
