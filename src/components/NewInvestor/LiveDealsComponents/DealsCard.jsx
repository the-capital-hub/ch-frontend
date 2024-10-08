export default function DealsCard({ image, children, isFunds,theme }) {
  return (
    <div
      className="deals__card d-flex gap-2 py-2 px-3 rounded-4"
      style={{ backgroundColor:theme==="dark"?"#000": "#efefef" }}
    >
      <img
        src={image}
        alt=""
        style={
          isFunds
            ? { width: "30px", height: "30px",borderRadius:"15px" }
            : { width: "50px", height: "50px",borderRadius:"25px" }
        }
      />
      <div className="d-flex flex-column justify-content-center">
        {children}
      </div>
    </div>
  );
}
