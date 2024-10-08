export default function User({
  userImgURL,
  userName,
  userConnections,
  isUserOne,
}) {
  return (
    <div
      className={`user d-flex align-items-center border border-dark-subtle rounded-pill gap-1 user__padding pe-4`}
    >
      <img src={userImgURL} alt="User" className="user__image" />
      <div
        className={`user__details d-flex flex-column justify-content-center`}
      >
        <h6 className="user__name">{userName}</h6>
        <h6 className={`user__connections  ${!isUserOne ? "w-ellipses" : ""}`}>
          {userConnections} Mutual Connections
        </h6>
      </div>
    </div>
  );
}
