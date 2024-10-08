import { Star } from "../../../../../Images/Investor/CompanyProfile";

export default function CardHead(props) {
  const { image, name, rating, age,designation } = props;

  return (
    <div className="card__head d-flex gap-2">
      <img
        src={image}
        alt={name}
        style={{ width: "50px", height: "50px" }}
        className="rounded-circle object-fit-cover"
      />
      <div className="">
        <h4 className="card__head__name">{name}</h4>
        <div className="person_text">
        {/*<p className="fw-light" style={{ color: "var(--bs-gray-500)" }}>
          Designation
        </p>*/}
        <h6 className="fw-medium designation">{designation}</h6>
      </div>
        {rating ? (
          <div className="rating d-flex gap-1">
            {/* Have to figure out how to fill svgs according to rating */}
            <img
              src={Star}
              alt="Star icon"
              style={{ width: "10px", height: "10px" }}
            />
            <img
              src={Star}
              alt="Star icon"
              style={{ width: "10px", height: "10px" }}
            />
            <img
              src={Star}
              alt="Star icon"
              style={{ width: "10px", height: "10px" }}
            />
            <img
              src={Star}
              alt="Star icon"
              style={{ width: "10px", height: "10px" }}
            />
            <img
              src={Star}
              alt="Star icon"
              style={{ width: "10px", height: "10px" }}
            />
          </div>
        ) : (
          ""
          // <p className="age">{age} Years</p>
        )}
      </div>
    </div>
  );
}
