import "./NotFound404.scss";

import NotFoundImg from "../../../Images/Error/404/404NotFound.png";
import { useNavigate } from "react-router-dom";

function NotFound404() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <img src={NotFoundImg} alt="Page not found" />
      <h2>Something Went Wrong</h2>
      <h5>Sorry, We can't find the page you're looking for.</h5>

      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-light" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button className="btn btn-light" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </div>
  );
}

export default NotFound404;
