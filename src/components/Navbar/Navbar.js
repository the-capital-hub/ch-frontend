import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import Logo from "../../Images/Logo.svg";
import { RxCross2 } from "react-icons/rx";
import HambergerIcon from "../../Images/Hamberger.svg";
import { useSelector } from "react-redux";
import { setThemeColor } from "../../utils/setThemeColor";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [selectedLink, setSelectedLink] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);
  //const [hideDropdown, setHideDropDown] = useState(false);

  useEffect(() => {
    setThemeColor();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsScrolling(scrollTop > 0);
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  // const handleMouseOver = () => {
  //   setHideDropDown(true);
  // };

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const isLoggedInLocal = localStorage.getItem("isLoggedIn");

  const navigate = useNavigate();

  const isLoggedIn = () => {
    if (!isLoggedInLocal || !loggedInUser) return navigate("/login");
    if (isLoggedInLocal.isInvestor === "true") {
      return navigate("/investor/home");
    } else {
      return navigate("/home");
    }
  };

  return (
    <div className="nav_bar_container">
      <div className="container nav_container">
        <nav className={`nav ${isScrolling ? "scrolling-nav" : ""}`}>
          <div className="hamberger_logo_login_container">
            <div className="logo_hamberger">
              <div id="mobile" onClick={handleClick}>
                {clicked ? (
                  <RxCross2 size={"2rem"} className="i" />
                ) : (
                  <img src={HambergerIcon} alt="hamberger" />
                )}
              </div>
              <Link to="/" className="logo">
              <img src={Logo} alt="bar" />
              </Link>
            </div>
            <div>
              <li>
                <button
                  // to="/signup"
                  className={"mobile_loginbtn"}
                  onClick={() => {
                    setSelectedLink("login");
                    isLoggedIn();
                  }}
                >
                  {loggedInUser && isLoggedInLocal ? (
                    <>{loggedInUser?.firstName}</>
                  ) : (
                    "Log in"
                  )}
                </button>
              </li>
            </div>
          </div>

          <div className={`navbar-items ${clicked ? "active" : ""}`}>
            <ul id="navbar" className={clicked ? "active" : ""}>
              <li>
                <Link
                  to="/about"
                  className={selectedLink === "about" ? "active" : ""}
                  onClick={() => setSelectedLink("about")}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className={selectedLink === "contactus" ? "active" : ""}
                  onClick={() => setSelectedLink("contactus")}
                >
                  Contact Us
                </Link>
              </li>
              {/*<li className="dropdown">
                <span className="dropdown-label">Service</span>
                {
                  <ul className="dropdown-menu ">
                    <li>
                      <Link
                        to="/fundraising"
                        className={
                          selectedLink === "fundraising" ? "active" : ""
                        }
                        onClick={() => setSelectedLink("fundraising")}
                      >
                        Fundraising
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/financials-document"
                        className={
                          selectedLink === "financials-document" ? "active" : ""
                        }
                        onClick={() => setSelectedLink("financials-document")}
                      >
                        Financials Documentation
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/web-development"
                        className={
                          selectedLink === "web-development" ? "active" : ""
                        }
                        onClick={() => setSelectedLink("web-development")}
                      >
                        Web Development
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/pitch-deck"
                        className={
                          selectedLink === "pitch-deck" ? "active" : ""
                        }
                        onClick={() => setSelectedLink("pitch-deck")}
                      >
                        Pitch Deck
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/sturtup-consulting"
                        className={
                          selectedLink === "sturtup-consulting" ? "active" : ""
                        }
                        onClick={() => setSelectedLink("sturtup-consulting")}
                      >
                        Startup Consulting
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/complience"
                        className={
                          selectedLink === "complience" ? "active" : ""
                        }
                        onClick={() => setSelectedLink("complience")}
                      >
                        Compliance
                      </Link>
                    </li>
                  </ul>
                }
              </li>*/}
              {/*<li>
                <Link
                  to="/our-startup"
                  className={selectedLink === "investor" ? "active" : ""}
                  onClick={() => setSelectedLink("investor")}
                >
                  Startup
                </Link>
              </li>*/}
              <li>
                <Link
                  to="/our-investor"
                  className={selectedLink === "investor" ? "active" : ""}
                  onClick={() => setSelectedLink("investor")}
                >
                  Investor
                </Link>
              </li>
              <li>
                <Link
                  to="/start-up"
                  className={selectedLink === "startup" ? "active" : ""}
                  onClick={() => setSelectedLink("startup")}
                >
                  StartUp
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={selectedLink === "blog" ? "active" : ""}
                  onClick={() => setSelectedLink("blog")}
                >
                  Blog
                </Link>
              </li>
              <li>
                <button
                  className={"loginbtn"}
                  onClick={() => {
                    setSelectedLink("login");
                    isLoggedIn();
                  }}
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {loggedInUser && isLoggedInLocal ? (
                    <>
                      {loggedInUser?.firstName} {loggedInUser?.lastName}
                    </>
                  ) : (
                    "Log in"
                  )}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
