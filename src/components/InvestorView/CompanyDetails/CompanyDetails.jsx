import { camera } from "../../../Images/InvestorsView";
import ImagePlaceholder from "../ImagePlaceholder/ImagePlaceholder";
import "./CompanyDetails.scss";

const CompanyDetails = ({ companyName, description, image, tagline }) => {
  return (
    <div className="companyDetailsContainer">
      {/* <ImagePlaceholder text={"Upload your image"} imageUrl={image} /> */}
      <ImagePlaceholder imageUrl={image} />
      <div className="details">
        <h5>{companyName || `Enter company name`}</h5>
        <p className="mb-0">{tagline || `Enter company tagline`}</p>
        <hr className="my-2" />
        <p className="mt-0">{description || `Eg: India's startup Platform`}</p>
      </div>
    </div>
  );
};

export default CompanyDetails;
