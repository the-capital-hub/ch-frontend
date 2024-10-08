// import IconTCH from "../Investor/SvgIcons/IconTCH";
import "./SuspenseLoader.scss";

function SuspenseLoader() {
  return (
    <div className="suspense-loader">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {/* <span className="tch_svg">
        <IconTCH />
      </span> */}
    </div>
  );
}

export default SuspenseLoader;
