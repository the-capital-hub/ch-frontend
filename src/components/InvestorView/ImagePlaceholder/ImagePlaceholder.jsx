import "./ImagePlaceholder.scss";
import { camera } from "../../../Images/InvestorsView";

const ImagePlaceholder = ({ text, imageUrl }) => {
  return (
    <div className="pfp">
      <img
        src={imageUrl || camera}
        alt="camera"
        style={{ width: "155px", height: "auto", maxHeight: "100%" }}
      />
      {text && <p>{text}</p>}
    </div>
  );
};

export default ImagePlaceholder;
