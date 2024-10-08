
  import "./Footer.scss";
    import assets from '../../../../Images/Ecommerace/Footer/index'


  
  function Footer() {
    return (
      <footer>
        <div className="footer-container row row-cols-1 row-cols-lg-auto">
          <p className="short-details col-lg-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nobis
            voluptatem quas recusandae praesentium eius enim delectus architecto
            tempore, illo mollitia
          </p>
          <ul className="general col-lg-1">
            <h5>General</h5>
            <li>About Us</li>
            {/* <li>Pricing</li>
            <li>Contact Us</li>
            <li>Courses</li> */}
          </ul>
          <ul className="policies col-lg-1">
            <h5>Policies</h5>
            <li>Security safeguards</li>
            <li>Terms of service</li>
            <li>Privacy</li>
            <li>Accessibility</li>
          </ul>
          <div className="get-in-touch col-lg-2">
            <h5>Get in touch</h5>
            <p>
            Follow us on social media and stay updated with the latest information about our services
            </p>
            <div className="social-icons">
              <img src={assets.fb} alt="facebook" />
              <img src={assets.twitter} alt="twitter" />
              <img src={assets.instagram} alt="instagram" />
            </div>
          </div>
          {/* <div className="subscribe col-lg-3">
            <h5>Subscribe to our Lorem</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              provident temporibus laborum amet iure quod sequi.
            </p>
            <div className="subscribe-input">
              <input type="text" placeholder="Enter your mail" />
              <button className="btn">Join Now</button>
            </div>
          </div> */}
        </div>
        <p className="rights text-white text-center">
        2022 - @Lorem all right deserved
        </p>
      </footer>
    );
  }
  
  export default Footer;